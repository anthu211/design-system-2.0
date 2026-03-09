require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/components', require('./routes/components'));
app.use('/api/components/:id/versions', require('./routes/versions'));
app.use('/api/users',      require('./routes/users'));
app.use('/api/audit',      require('./routes/audit'));
app.use('/api/git',        require('./routes/git'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// 404
app.use('/api/*', (req, res) => res.status(404).json({ error: 'Not found' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n  Backend running on http://localhost:${PORT}`);
  console.log(`  Health: http://localhost:${PORT}/api/health\n`);
  // Auto-seed on first run
  try { require('./db/seed'); } catch {}
});
