const express = require('express');
const db = require('../db/db');
const authMiddleware = require('../middleware/auth');
const { can } = require('../middleware/rbac');

const router = express.Router();

// GET /api/audit
router.get('/', authMiddleware, can('view_audit'), (req, res) => {
  try {
    const { entity_type, user_id, from, to, limit = 50, offset = 0 } = req.query;
    let query = `
      SELECT a.*, u.username
      FROM audit_log a
      LEFT JOIN users u ON a.user_id = u.id
      WHERE 1=1
    `;
    const params = [];
    if (entity_type) { query += ' AND a.entity_type = ?'; params.push(entity_type); }
    if (user_id) { query += ' AND a.user_id = ?'; params.push(user_id); }
    if (from) { query += ' AND a.created_at >= ?'; params.push(from); }
    if (to) { query += ' AND a.created_at <= ?'; params.push(to); }
    query += ' ORDER BY a.created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const logs = db.prepare(query).all(...params);
    const total = db.prepare(`SELECT COUNT(*) as count FROM audit_log WHERE 1=1
      ${entity_type ? ' AND entity_type = ?' : ''}
      ${user_id ? ' AND user_id = ?' : ''}
    `).get(...params.slice(0, params.length - 2));

    res.json({ logs: logs.map(l => ({ ...l, details: safeParseJSON(l.details) })), total: total.count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function safeParseJSON(val) {
  try { return JSON.parse(val); } catch { return val; }
}

module.exports = router;
