const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const db = require('../db/db');

function getConfig() {
  return db.prepare('SELECT * FROM git_config ORDER BY id DESC LIMIT 1').get();
}

async function initRepo(repoPath) {
  if (!fs.existsSync(repoPath)) {
    fs.mkdirSync(repoPath, { recursive: true });
  }
  const git = simpleGit(repoPath);
  const isRepo = await git.checkIsRepo().catch(() => false);
  if (!isRepo) {
    await git.init();
  }
  return git;
}

async function commitComponents(components, message) {
  const config = getConfig();
  if (!config || !config.repo_path) {
    throw new Error('Git repository path not configured');
  }
  const repoPath = config.repo_path;
  const git = await initRepo(repoPath);

  const exportDir = path.join(repoPath, 'components');
  if (!fs.existsSync(exportDir)) fs.mkdirSync(exportDir, { recursive: true });

  for (const comp of components) {
    const compDir = path.join(exportDir, comp.name.toLowerCase().replace(/\s+/g, '-'));
    if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });
    fs.writeFileSync(path.join(compDir, 'index.html'), comp.html || '');
    fs.writeFileSync(path.join(compDir, 'style.css'), comp.css || '');
    fs.writeFileSync(path.join(compDir, 'script.js'), comp.js || '');
    fs.writeFileSync(path.join(compDir, 'README.md'), generateReadme(comp));
  }

  await git.add('.');
  const result = await git.commit(message || `Update components [${new Date().toISOString()}]`);
  return result.commit;
}

async function pushToRemote() {
  const config = getConfig();
  if (!config || !config.repo_path) throw new Error('Git not configured');
  const git = simpleGit(config.repo_path);
  const branch = config.branch || 'main';
  if (config.remote_url) {
    const remotes = await git.getRemotes();
    if (!remotes.find(r => r.name === 'origin')) {
      await git.addRemote('origin', config.remote_url);
    }
  }
  return git.push('origin', branch);
}

async function getLog(n = 20) {
  const config = getConfig();
  if (!config || !config.repo_path || !fs.existsSync(config.repo_path)) return [];
  const git = simpleGit(config.repo_path);
  try {
    const isRepo = await git.checkIsRepo();
    if (!isRepo) return [];
    const log = await git.log(['--max-count', String(n)]);
    return log.all;
  } catch {
    return [];
  }
}

async function getStatus() {
  const config = getConfig();
  if (!config || !config.repo_path || !fs.existsSync(config.repo_path)) return null;
  const git = simpleGit(config.repo_path);
  try {
    return await git.status();
  } catch {
    return null;
  }
}

function generateReadme(comp) {
  const tags = (() => { try { return JSON.parse(comp.tags || '[]').join(', '); } catch { return ''; } })();
  return `# ${comp.name}

${comp.description || ''}

**Category:** ${comp.category || 'General'}
**Tags:** ${tags}

## Usage

\`\`\`html
${comp.html || '<!-- no HTML -->'}
\`\`\`

## Styles

Include \`style.css\` in your project.

## Scripts

Include \`script.js\` if required.
`;
}

module.exports = { getConfig, initRepo, commitComponents, pushToRemote, getLog, getStatus };
