const express = require('express');
const db = require('../db/db');
const authMiddleware = require('../middleware/auth');
const { can } = require('../middleware/rbac');
const versionService = require('../services/versionService');
const audit = require('../services/auditService');

const router = express.Router({ mergeParams: true });

// GET /api/components/:id/versions
router.get('/', authMiddleware, can('view'), (req, res) => {
  try {
    const comp = db.prepare('SELECT id FROM components WHERE id = ? AND is_deleted = 0').get(req.params.id);
    if (!comp) return res.status(404).json({ error: 'Component not found' });
    const versions = versionService.getVersions(req.params.id);
    res.json(versions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/components/:id/versions/:vid
router.get('/:vid', authMiddleware, can('view'), (req, res) => {
  try {
    const version = versionService.getVersion(req.params.id, req.params.vid);
    if (!version) return res.status(404).json({ error: 'Version not found' });
    res.json(version);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/components/:id/versions/:vid/restore
router.post('/:vid/restore', authMiddleware, can('edit'), (req, res) => {
  try {
    const version = versionService.getVersion(req.params.id, req.params.vid);
    if (!version) return res.status(404).json({ error: 'Version not found' });

    const comp = db.prepare('SELECT * FROM components WHERE id = ? AND is_deleted = 0').get(req.params.id);
    if (!comp) return res.status(404).json({ error: 'Component not found' });

    db.prepare(`
      UPDATE components SET html = ?, css = ?, js = ?, updated_by = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(version.html, version.css, version.js, req.user.id, req.params.id);

    const newVersion = versionService.createVersion(
      req.params.id,
      { html: version.html, css: version.css, js: version.js },
      req.user.id,
      `Restored from v${version.version_number}`
    );

    audit.log(
      req.user.id, 'version_restored', 'component', req.params.id,
      { restored_from_version: version.version_number, new_version: newVersion.version_number },
      req.ip
    );

    const updated = db.prepare('SELECT * FROM components WHERE id = ?').get(req.params.id);
    res.json({ component: updated, version: newVersion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
