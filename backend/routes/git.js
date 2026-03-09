const express = require('express');
const { body } = require('express-validator');
const db = require('../db/db');
const authMiddleware = require('../middleware/auth');
const { can } = require('../middleware/rbac');
const validate = require('../middleware/validate');
const gitService = require('../services/gitService');
const audit = require('../services/auditService');

const router = express.Router();

// GET /api/git/config
router.get('/config', authMiddleware, can('git_config'), (req, res) => {
  try {
    const config = gitService.getConfig();
    res.json(config || { repo_path: '', remote_url: '', branch: 'main', auto_commit: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/git/config
router.post('/config',
  authMiddleware, can('git_config'),
  body('repo_path').trim().notEmpty().withMessage('Repo path required'),
  validate,
  (req, res) => {
    try {
      const { repo_path, remote_url, branch, auto_commit } = req.body;
      const existing = db.prepare('SELECT id FROM git_config LIMIT 1').get();
      if (existing) {
        db.prepare(`
          UPDATE git_config SET repo_path = ?, remote_url = ?, branch = ?, auto_commit = ?, updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).run(repo_path, remote_url || '', branch || 'main', auto_commit ? 1 : 0, existing.id);
      } else {
        db.prepare(
          'INSERT INTO git_config (repo_path, remote_url, branch, auto_commit) VALUES (?, ?, ?, ?)'
        ).run(repo_path, remote_url || '', branch || 'main', auto_commit ? 1 : 0);
      }
      audit.log(req.user.id, 'git_config_updated', 'git_config', null, { repo_path, branch }, req.ip);
      res.json({ message: 'Git config saved' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// POST /api/git/commit
router.post('/commit', authMiddleware, can('git_config'), async (req, res) => {
  try {
    const { message } = req.body;
    const components = db.prepare('SELECT * FROM components WHERE is_deleted = 0').all();
    const hash = await gitService.commitComponents(components, message || 'Manual commit from Component Library');
    audit.log(req.user.id, 'git_commit', 'git', null, { hash, message }, req.ip);
    res.json({ hash, message: 'Committed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/git/log
router.get('/log', authMiddleware, can('git_config'), async (req, res) => {
  try {
    const log = await gitService.getLog(Number(req.query.n) || 20);
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/git/push
router.post('/push', authMiddleware, can('git_config'), async (req, res) => {
  try {
    await gitService.pushToRemote();
    audit.log(req.user.id, 'git_push', 'git', null, {}, req.ip);
    res.json({ message: 'Pushed to remote successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
