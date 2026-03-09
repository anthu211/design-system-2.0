const express = require('express');
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');
const db = require('../db/db');
const authMiddleware = require('../middleware/auth');
const { can } = require('../middleware/rbac');
const validate = require('../middleware/validate');
const audit = require('../services/auditService');

const router = express.Router();

// GET /api/users
router.get('/', authMiddleware, can('manage_users'), (req, res) => {
  try {
    const users = db.prepare(
      'SELECT id, username, email, role, is_active, created_at FROM users ORDER BY created_at DESC'
    ).all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/users
router.post('/',
  authMiddleware, can('manage_users'),
  body('username').trim().notEmpty().isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['super_admin', 'designer', 'developer', 'qa']),
  validate,
  (req, res) => {
    try {
      const { username, email, password, role } = req.body;
      const exists = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(username, email);
      if (exists) return res.status(409).json({ error: 'Username or email already exists' });
      const hash = bcrypt.hashSync(password, 10);
      const info = db.prepare(
        'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)'
      ).run(username, email, hash, role);
      audit.log(req.user.id, 'user_created', 'user', info.lastInsertRowid, { username, role }, req.ip);
      res.status(201).json({ id: info.lastInsertRowid, username, email, role, is_active: 1 });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// PUT /api/users/:id
router.put('/:id',
  authMiddleware, can('manage_users'),
  body('role').optional().isIn(['super_admin', 'designer', 'developer', 'qa']),
  body('is_active').optional().isInt({ min: 0, max: 1 }),
  validate,
  (req, res) => {
    try {
      const { role, is_active, password } = req.body;
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
      if (!user) return res.status(404).json({ error: 'User not found' });

      const updates = [];
      const params = [];
      if (role !== undefined) { updates.push('role = ?'); params.push(role); }
      if (is_active !== undefined) { updates.push('is_active = ?'); params.push(is_active); }
      if (password) { updates.push('password_hash = ?'); params.push(bcrypt.hashSync(password, 10)); }

      if (updates.length === 0) return res.status(400).json({ error: 'Nothing to update' });
      params.push(req.params.id);
      db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...params);
      audit.log(req.user.id, 'user_updated', 'user', req.params.id, { role, is_active }, req.ip);
      const updated = db.prepare('SELECT id, username, email, role, is_active, created_at FROM users WHERE id = ?').get(req.params.id);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// DELETE /api/users/:id
router.delete('/:id', authMiddleware, can('manage_users'), (req, res) => {
  try {
    if (Number(req.params.id) === req.user.id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    db.prepare('UPDATE users SET is_active = 0 WHERE id = ?').run(req.params.id);
    audit.log(req.user.id, 'user_deleted', 'user', req.params.id, { username: user.username }, req.ip);
    res.json({ message: 'User deactivated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
