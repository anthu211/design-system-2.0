const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const db = require('../db/db');
const authMiddleware = require('../middleware/auth');
const { can } = require('../middleware/rbac');
const validate = require('../middleware/validate');
const audit = require('../services/auditService');

const router = express.Router();

// POST /api/auth/login
router.post('/login',
  body('username').trim().notEmpty().withMessage('Username required'),
  body('password').notEmpty().withMessage('Password required'),
  validate,
  (req, res) => {
    try {
      const { username, password } = req.body;
      const user = db.prepare('SELECT * FROM users WHERE username = ? AND is_active = 1').get(username);
      if (!user || !bcrypt.compareSync(password, user.password_hash)) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      audit.log(user.id, 'login', 'user', user.id, { username: user.username }, req.ip);
      res.json({
        token,
        user: { id: user.id, username: user.username, email: user.email, role: user.role }
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// POST /api/auth/register (super_admin only)
router.post('/register',
  authMiddleware,
  can('manage_users'),
  body('username').trim().notEmpty().isLength({ min: 3 }).withMessage('Username min 3 chars'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('role').isIn(['super_admin', 'designer', 'developer', 'qa']).withMessage('Invalid role'),
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
      res.status(201).json({ id: info.lastInsertRowid, username, email, role });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, email: req.user.email, role: req.user.role });
});

module.exports = router;
