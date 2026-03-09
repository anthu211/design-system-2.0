const db = require('../db/db');

function log(userId, action, entityType, entityId, details, ipAddress) {
  try {
    db.prepare(`
      INSERT INTO audit_log (user_id, action, entity_type, entity_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      userId || null,
      action,
      entityType || null,
      entityId || null,
      details ? JSON.stringify(details) : null,
      ipAddress || null
    );
  } catch (err) {
    console.error('Audit log error:', err.message);
  }
}

module.exports = { log };
