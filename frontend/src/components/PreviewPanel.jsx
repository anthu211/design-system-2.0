import { useState, useEffect, useRef } from 'react';

const WIDTHS = {
  desktop: '100%',
  tablet:  '768px',
  mobile:  '375px',
};

export default function PreviewPanel({ html, css, js }) {
  const iframeRef = useRef(null);
  const [viewport, setViewport] = useState('desktop');

  const srcDoc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#0E0E0E;color:#F9F9F9;font-family:Inter,-apple-system,sans-serif;font-size:13px;padding:16px;min-height:100vh;}
    ${css || ''}
  </style></head><body>${html || ''}<script>${js || ''}</script></body></html>`;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-shell-border bg-shell-input flex-shrink-0">
        <span className="text-xs text-shell-muted mr-2">Viewport</span>
        {Object.keys(WIDTHS).map(v => (
          <button
            key={v}
            onClick={() => setViewport(v)}
            className={`px-2 py-1 rounded text-xs capitalize transition-colors ${
              viewport === v ? 'bg-accent text-white' : 'text-shell-muted hover:text-shell-text hover:bg-shell-hover'
            }`}
          >
            {v}
          </button>
        ))}
        <div className="flex-1" />
        <span className="text-2xs text-shell-muted font-mono">{WIDTHS[viewport]}</span>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto bg-shell-bg flex items-start justify-center p-4">
        <div
          className="h-full transition-all duration-200 bg-shell-bg rounded-lg overflow-hidden border border-shell-border"
          style={{ width: WIDTHS[viewport], minHeight: '200px' }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            className="w-full h-full border-none"
            style={{ minHeight: '400px' }}
            title="Component preview"
          />
        </div>
      </div>
    </div>
  );
}
