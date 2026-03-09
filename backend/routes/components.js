const express = require('express');
const { body } = require('express-validator');
const db = require('../db/db');
const authMiddleware = require('../middleware/auth');
const { can } = require('../middleware/rbac');
const validate = require('../middleware/validate');
const audit = require('../services/auditService');
const versionService = require('../services/versionService');
const gitService = require('../services/gitService');

const router = express.Router();

// GET /api/components
router.get('/', authMiddleware, can('view'), (req, res) => {
  try {
    const { search, category, tag, sort = 'updated_at', order = 'desc' } = req.query;
    const allowedSorts = ['name', 'category', 'updated_at', 'created_at'];
    const sortCol = allowedSorts.includes(sort) ? sort : 'updated_at';
    const sortDir = order === 'asc' ? 'ASC' : 'DESC';

    let query = `
      SELECT c.*, u1.username as created_by_username, u2.username as updated_by_username
      FROM components c
      LEFT JOIN users u1 ON c.created_by = u1.id
      LEFT JOIN users u2 ON c.updated_by = u2.id
      WHERE c.is_deleted = 0
    `;
    const params = [];
    if (search) { query += ' AND (c.name LIKE ? OR c.description LIKE ?)'; params.push(`%${search}%`, `%${search}%`); }
    if (category) { query += ' AND c.category = ?'; params.push(category); }
    query += ` ORDER BY c.${sortCol} ${sortDir}`;

    let components = db.prepare(query).all(...params);

    if (tag) {
      components = components.filter(c => {
        try { return JSON.parse(c.tags || '[]').includes(tag); } catch { return false; }
      });
    }

    components = components.map(c => ({ ...c, tags: parseJSON(c.tags, []) }));
    res.json(components);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/components/:id
router.get('/:id', authMiddleware, can('view'), (req, res) => {
  try {
    const comp = db.prepare(`
      SELECT c.*, u1.username as created_by_username, u2.username as updated_by_username
      FROM components c
      LEFT JOIN users u1 ON c.created_by = u1.id
      LEFT JOIN users u2 ON c.updated_by = u2.id
      WHERE c.id = ? AND c.is_deleted = 0
    `).get(req.params.id);
    if (!comp) return res.status(404).json({ error: 'Component not found' });
    res.json({ ...comp, tags: parseJSON(comp.tags, []) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/components
router.post('/',
  authMiddleware, can('create'),
  body('name').trim().notEmpty().withMessage('Name required'),
  body('category').optional().trim(),
  validate,
  (req, res) => {
    try {
      const { name, description, category, tags, html, css, js } = req.body;
      const info = db.prepare(`
        INSERT INTO components (name, description, category, tags, html, css, js, created_by, updated_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        name, description || '', category || 'General',
        JSON.stringify(Array.isArray(tags) ? tags : []),
        html || '', css || '', js || '',
        req.user.id, req.user.id
      );
      const id = info.lastInsertRowid;
      versionService.createVersion(id, { html: html || '', css: css || '', js: js || '' }, req.user.id, 'Initial version');
      audit.log(req.user.id, 'component_created', 'component', id, { name }, req.ip);
      const comp = db.prepare('SELECT * FROM components WHERE id = ?').get(id);
      res.status(201).json({ ...comp, tags: parseJSON(comp.tags, []) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// PUT /api/components/:id
router.put('/:id',
  authMiddleware, can('edit'),
  body('name').optional().trim().notEmpty(),
  validate,
  async (req, res) => {
    try {
      const id = req.params.id;
      const existing = db.prepare('SELECT * FROM components WHERE id = ? AND is_deleted = 0').get(id);
      if (!existing) return res.status(404).json({ error: 'Component not found' });

      const { name, description, category, tags, html, css, js, commit_message } = req.body;
      db.prepare(`
        UPDATE components SET
          name = ?, description = ?, category = ?, tags = ?,
          html = ?, css = ?, js = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        name ?? existing.name,
        description ?? existing.description,
        category ?? existing.category,
        JSON.stringify(Array.isArray(tags) ? tags : parseJSON(existing.tags, [])),
        html ?? existing.html,
        css ?? existing.css,
        js ?? existing.js,
        req.user.id,
        id
      );

      const version = versionService.createVersion(
        id,
        { html: html ?? existing.html, css: css ?? existing.css, js: js ?? existing.js },
        req.user.id,
        commit_message || null
      );

      // Auto-commit if configured
      const gitConfig = gitService.getConfig();
      let gitHash = null;
      if (gitConfig && gitConfig.auto_commit && gitConfig.repo_path) {
        try {
          const allComps = db.prepare('SELECT * FROM components WHERE is_deleted = 0').all();
          gitHash = await gitService.commitComponents(allComps, commit_message || `Update ${name ?? existing.name}`);
          db.prepare('UPDATE component_versions SET git_hash = ? WHERE id = ?').run(gitHash, version.id);
        } catch (gitErr) {
          console.error('Auto-commit failed:', gitErr.message);
        }
      }

      audit.log(req.user.id, 'component_updated', 'component', id, { name: name ?? existing.name, version: version.version_number }, req.ip);
      const updated = db.prepare('SELECT * FROM components WHERE id = ?').get(id);
      res.json({ ...updated, tags: parseJSON(updated.tags, []) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE /api/components/:id (soft delete)
router.delete('/:id', authMiddleware, can('delete'), (req, res) => {
  try {
    const comp = db.prepare('SELECT * FROM components WHERE id = ? AND is_deleted = 0').get(req.params.id);
    if (!comp) return res.status(404).json({ error: 'Component not found' });
    db.prepare('UPDATE components SET is_deleted = 1 WHERE id = ?').run(req.params.id);
    audit.log(req.user.id, 'component_deleted', 'component', req.params.id, { name: comp.name }, req.ip);
    res.json({ message: 'Component deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/components/categories/list
router.get('/meta/categories', authMiddleware, can('view'), (req, res) => {
  try {
    const rows = db.prepare('SELECT DISTINCT category FROM components WHERE is_deleted = 0 ORDER BY category').all();
    res.json(rows.map(r => r.category));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/components/meta/tags
router.get('/meta/tags', authMiddleware, can('view'), (req, res) => {
  try {
    const rows = db.prepare('SELECT tags FROM components WHERE is_deleted = 0').all();
    const tagSet = new Set();
    rows.forEach(r => { try { JSON.parse(r.tags || '[]').forEach(t => tagSet.add(t)); } catch {} });
    res.json(Array.from(tagSet).sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function parseJSON(val, fallback) {
  try { return JSON.parse(val); } catch { return fallback; }
}

module.exports = router;
