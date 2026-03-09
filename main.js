// ─── Color data ───
const COLORS = {
  text: [
    { token: 'text-primary',      light: '101010', dark: 'F9F9F9', usage: 'Body text, headings' },
    { token: 'text-secondary',    light: '6E6E6E', dark: 'D1D1D1', usage: 'Labels, metadata, captions' },
    { token: 'text-disabled',     light: 'A3A5AF', dark: '696969', usage: 'Disabled state text' },
    { token: 'text-red-critical', light: 'D12329', dark: 'D12329', usage: 'Critical alerts, errors' },
    { token: 'text-red',          light: 'E15252', dark: 'E15252', usage: 'Warning text, risk indicators' },
    { token: 'text-green',        light: '31A56D', dark: '31A56D', usage: 'Success, resolved, active' },
    { token: 'text-dark-green',   light: '1A7D4D', dark: '1A7D4D', usage: 'Confirmed safe, passed' },
    { token: 'text-orange',       light: 'D98B1D', dark: 'D98B1D', usage: 'Medium risk, warnings' },
    { token: 'text-yellow',       light: 'CDB900', dark: 'CDB900', usage: 'Caution, informational' },
  ],
  bg: [
    { token: 'color-primary-bg',    light: 'F7F9FC', dark: '0E0E0E', usage: 'App background' },
    { token: 'color-secondary-bg',  light: 'FFFFFF', dark: '131313', usage: 'Card, sidebar background' },
    { token: 'color-table-header',  light: 'F5F5F5', dark: '1F1F1F', usage: 'Table header rows' },
    { token: 'color-header-bar',    light: '131313', dark: '131313', usage: 'Top navigation bar' },
  ],
  stroke: [
    { token: 'color-stroke-1', light: 'E6E6E6', dark: '272727', usage: 'Primary dividers, card borders' },
    { token: 'color-stroke-2', light: 'D8D9DD', dark: '3B3A3A', usage: 'Subtle borders, input outlines' },
  ],
  cta: [
    { token: 'color-cta-primary',  light: '6360D8', dark: '6360D8', usage: 'Primary buttons, links, focus rings' },
  ],
  tags: [
    { token: 'color-tag-bg-green',  light: 'EFF7ED', dark: '192C15', usage: 'Success / Active tag bg' },
    { token: 'color-tag-bg-yellow', light: 'F2EDDB', dark: '2C2613', usage: 'Warning tag background' },
    { token: 'color-tag-bg-red',    light: 'F9EEEE', dark: '260808', usage: 'Critical / Error tag bg' },
    { token: 'color-tag-bg-orange', light: 'F7F6EB', dark: '514B09', usage: 'Medium risk tag bg' },
  ],
  mono: [
    { token: 'color-mono-white', light: 'FFFFFF', dark: '000000', usage: 'Pure white / inverted surface' },
    { token: 'color-mono-black', light: '000000', dark: 'FFFFFF', usage: 'Pure black / inverted text' },
  ],
};

let currentTheme = 'dark';

function luminance(hex) {
  const r = parseInt(hex.slice(0,2),16)/255;
  const g = parseInt(hex.slice(2,4),16)/255;
  const b = parseInt(hex.slice(4,6),16)/255;
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

function renderColorGrid(containerId, tokens) {
  const el = document.getElementById(containerId);
  el.innerHTML = tokens.map(t => {
    const hex = currentTheme === 'dark' ? t.dark : t.light;
    const lum = luminance(hex);
    const isTransparent = hex.toLowerCase() === (currentTheme === 'dark' ? '0e0e0e' : 'f7f9fc');
    const needsCheck = hex.toLowerCase() === 'ffffff' || hex.toLowerCase() === '000000' || hex.toLowerCase() === 'f7f9fc';
    return `
      <div class="color-card">
        <div class="color-swatch${needsCheck ? ' checkered' : ''}">
          <div class="swatch-inner" style="background:#${hex};"></div>
        </div>
        <div class="color-info">
          <div class="color-token">--${t.token}</div>
          <div class="color-hex">#${hex}</div>
          <div class="color-usage">${t.usage}</div>
        </div>
      </div>`;
  }).join('');
}

function renderAll() {
  renderColorGrid('color-grid-text',   COLORS.text);
  renderColorGrid('color-grid-bg',     COLORS.bg);
  renderColorGrid('color-grid-stroke', COLORS.stroke);
  renderColorGrid('color-grid-cta',    COLORS.cta);
  renderColorGrid('color-grid-tags',   COLORS.tags);
  renderColorGrid('color-grid-mono',   COLORS.mono);

  // Tag previews
  document.getElementById('tag-preview-dark').style.display  = currentTheme === 'dark'  ? 'flex' : 'none';
  document.getElementById('tag-preview-light').style.display = currentTheme === 'light' ? 'flex' : 'none';
}

// Build grid preview
function buildGridPreview() {
  const el = document.getElementById('grid-preview-12');
  el.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const col = document.createElement('div');
    col.className = 'grid-col';
    el.appendChild(col);
  }
}

// Theme toggle
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentTheme = btn.dataset.theme;
    renderAll();
  });
});

// Page nav
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    item.classList.add('active');
    document.getElementById('page-' + item.dataset.page).classList.add('active');
  });
});

// Init
renderAll();
buildGridPreview();
