import JSZip from 'jszip';

export async function exportComponentAsZip(component) {
  const zip = new JSZip();
  const slug = component.name.toLowerCase().replace(/\s+/g, '-');
  const folder = zip.folder(slug);
  const tags = Array.isArray(component.tags) ? component.tags.join(', ') : '';

  // Standalone index.html
  folder.file('index.html', buildStandaloneHtml(component));

  // Separate files
  folder.file('style.css', component.css || '/* No styles */');
  folder.file('script.js', component.js || '// No scripts');

  // README
  folder.file('README.md', buildReadme(component, tags));

  const blob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(blob, `${slug}.zip`);
}

function buildStandaloneHtml(comp) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${comp.name}</title>
  <style>
${comp.css || ''}
  </style>
</head>
<body>
${comp.html || ''}
  <script>
${comp.js || ''}
  </script>
</body>
</html>`;
}

function buildReadme(comp, tags) {
  return `# ${comp.name}

${comp.description || ''}

**Category:** ${comp.category || 'General'}
**Tags:** ${tags}

## Usage

\`\`\`html
${comp.html || '<!-- no HTML -->'}
\`\`\`

## Styles

Include \`style.css\` in your project, or copy the contents into your stylesheet.

## Scripts

Include \`script.js\` if required by the component.

## Standalone

Open \`index.html\` directly in a browser to preview the component.
`;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
