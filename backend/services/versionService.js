const db = require('../db/db');

function createVersion(componentId, { html, css, js }, savedBy, commitMessage, gitHash) {
  const last = db.prepare(
    'SELECT MAX(version_number) as max_v FROM component_versions WHERE component_id = ?'
  ).get(componentId);
  const nextVersion = (last.max_v || 0) + 1;

  const stmt = db.prepare(`
    INSERT INTO component_versions (component_id, version_number, html, css, js, saved_by, commit_message, git_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(componentId, nextVersion, html || '', css || '', js || '', savedBy, commitMessage || null, gitHash || null);
  return { id: info.lastInsertRowid, version_number: nextVersion };
}

function getVersions(componentId) {
  return db.prepare(`
    SELECT cv.*, u.username as saved_by_username
    FROM component_versions cv
    LEFT JOIN users u ON cv.saved_by = u.id
    WHERE cv.component_id = ?
    ORDER BY cv.version_number DESC
  `).all(componentId);
}

function getVersion(componentId, versionId) {
  return db.prepare(`
    SELECT cv.*, u.username as saved_by_username
    FROM component_versions cv
    LEFT JOIN users u ON cv.saved_by = u.id
    WHERE cv.id = ? AND cv.component_id = ?
  `).get(versionId, componentId);
}

module.exports = { createVersion, getVersions, getVersion };
