import { Link } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import { exportComponentAsZip } from '../utils/exportUtils';
import toast from 'react-hot-toast';

function buildPreviewDoc(html, css, js) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0E0E0E;color:#F9F9F9;font-family:Inter,-apple-system,sans-serif;font-size:13px;padding:12px;min-height:100vh;display:flex;align-items:center;justify-content:center;}
    ${css || ''}
  </style></head><body>${html || ''}<script>${js || ''}</script></body></html>`;
}

export default function ComponentCard({ component, onDelete }) {
  const { can } = usePermissions();
  const tags = Array.isArray(component.tags) ? component.tags : [];
  const updated = new Date(component.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  async function handleExport(e) {
    e.preventDefault();
    try {
      await exportComponentAsZip(component);
      toast.success('Exported successfully');
    } catch {
      toast.error('Export failed');
    }
  }

  return (
    <div className="card flex flex-col overflow-hidden hover:border-shell-border2 transition-colors group">
      {/* Preview iframe */}
      <div className="h-36 bg-shell-bg border-b border-shell-border overflow-hidden relative flex-shrink-0">
        <iframe
          srcDoc={buildPreviewDoc(component.html, component.css, component.js)}
          title={component.name}
          sandbox="allow-scripts"
          className="w-full h-full border-none pointer-events-none"
          style={{ transform: 'scale(0.75)', transformOrigin: 'top left', width: '133%', height: '133%' }}
        />
        {/* Overlay actions on hover */}
        <div className="absolute inset-0 bg-shell-bg/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Link to={`/components/${component.id}`} className="btn btn-ghost btn-sm">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/><circle cx="8" cy="8" r="2"/>
            </svg>
            View
          </Link>
          {can('edit') && (
            <Link to={`/components/${component.id}/edit`} className="btn-primary btn-sm">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 2l3 3-9 9H2v-3L11 2z"/>
              </svg>
              Edit
            </Link>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-shell-text leading-tight line-clamp-1">{component.name}</h3>
          <span className="badge badge-accent flex-shrink-0">{component.category}</span>
        </div>

        {component.description && (
          <p className="text-xs text-shell-muted line-clamp-2 leading-relaxed">{component.description}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map(t => (
              <span key={t} className="px-1.5 py-0.5 bg-shell-input border border-shell-border rounded text-2xs text-shell-muted">{t}</span>
            ))}
            {tags.length > 3 && <span className="text-2xs text-shell-muted">+{tags.length - 3}</span>}
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-shell-border/50">
          <span className="text-2xs text-shell-muted">Updated {updated}</span>
          <div className="flex items-center gap-1">
            {can('export') && (
              <button onClick={handleExport} title="Export ZIP" className="btn btn-ghost btn-sm p-1">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M8 2v8M5 8l3 3 3-3M2 13h12"/>
                </svg>
              </button>
            )}
            {can('delete') && (
              <button onClick={() => onDelete(component)} title="Delete" className="btn btn-ghost btn-sm p-1 hover:text-status-red">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 10h8l1-10"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
