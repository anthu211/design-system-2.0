require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const bcrypt = require('bcryptjs');
const db = require('./db');

function seed() {
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  if (existing) {
    console.log('Seed already applied — admin user exists.');
    return;
  }

  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare(
    'INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)'
  ).run('admin', 'admin@prevalentai.com', hash, 'super_admin');

  // Seed a sample component
  const adminUser = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  db.prepare(`
    INSERT INTO components (name, description, category, tags, html, css, js, created_by, updated_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'Alert Banner',
    'Contextual alert banner for status messages',
    'Feedback',
    JSON.stringify(['alert', 'banner', 'notification']),
    `<div class="alert alert--info">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/>
    <path d="M8 5v3M8 10v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <span>This is an informational alert message.</span>
</div>`,
    `.alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 13px;
  border-left: 3px solid;
}
.alert--info {
  background: rgba(99,96,216,0.08);
  border-color: #6360D8;
  color: #D1D1D1;
}`,
    '',
    adminUser.id,
    adminUser.id
  );

  // Create initial version for seed component
  const comp = db.prepare('SELECT id FROM components WHERE name = ?').get('Alert Banner');
  db.prepare(`
    INSERT INTO component_versions (component_id, version_number, html, css, js, saved_by, commit_message)
    VALUES (?, 1, ?, ?, ?, ?, ?)
  `).run(comp.id, `<div class="alert alert--info">...</div>`, `.alert { ... }`, '', adminUser.id, 'Initial version');

  // Insert initial git_config row
  db.prepare('INSERT INTO git_config (repo_path, remote_url, branch, auto_commit) VALUES (?, ?, ?, ?)').run('', '', 'main', 0);

  console.log('Seed complete. Login: admin / admin123');
}

seed();
