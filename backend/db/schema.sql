CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK(role IN ('super_admin','designer','developer','qa')) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS components (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  tags TEXT DEFAULT '[]',
  html TEXT DEFAULT '',
  css TEXT DEFAULT '',
  js TEXT DEFAULT '',
  created_by INTEGER REFERENCES users(id),
  updated_by INTEGER REFERENCES users(id),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_deleted INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS component_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  component_id INTEGER REFERENCES components(id),
  version_number INTEGER NOT NULL,
  html TEXT,
  css TEXT,
  js TEXT,
  saved_by INTEGER REFERENCES users(id),
  commit_message TEXT,
  git_hash TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id INTEGER,
  details TEXT,
  ip_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS git_config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  repo_path TEXT,
  remote_url TEXT,
  branch TEXT DEFAULT 'main',
  auto_commit INTEGER DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
