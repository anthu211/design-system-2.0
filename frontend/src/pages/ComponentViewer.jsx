import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import PreviewPanel from '../components/PreviewPanel';
import ExportModal from '../components/ExportModal';
import { useComponent } from '../hooks/useComponents';
import { usePermissions } from '../hooks/usePermissions';
import toast from 'react-hot-toast';

export default function ComponentViewer() {
  const { id } = useParams();
  const { can } = usePermissions();
  const { component, loading } = useComponent(id);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState('');

  function copyCode(type) {
    const text = component?.[type] || '';
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      toast.success(`${type.toUpperCase()} copied`);
      setTimeout(() => setCopied(''), 2000);
    });
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-xs text-shell-muted">Loading…</div>
    </div>
  );

  if (!component) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-sm text-status-red">Component not found.</div>
    </div>
  );

  const tags = Array.isArray(component.tags) ? component.tags : [];

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar info */}
      <div className="w-64 flex-shrink-0 bg-shell-sidebar border-r border-shell-border flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-shell-border">
          <Link to="/" className="text-2xs text-shell-muted hover:text-shell-text flex items-center gap-1 mb-3">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 3L5 8l5 5"/></svg>
            Back to Dashboard
          </Link>
          <h1 className="text-md font-semibold text-shell-text">{component.name}</h1>
          <span className="badge badge-accent mt-1">{component.category}</span>
        </div>
        <div className="p-4 space-y-4">
          {component.description && (
            <div>
              <p className="label mb-1">Description</p>
              <p className="text-xs text-shell-muted leading-relaxed">{component.description}</p>
            </div>
          )}
          {tags.length > 0 && (
            <div>
              <p className="label mb-1">Tags</p>
              <div className="flex flex-wrap gap-1">
                {tags.map(t => (
                  <span key={t} className="px-1.5 py-0.5 bg-shell-input border border-shell-border rounded text-2xs text-shell-muted">{t}</span>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="label mb-1">Last updated</p>
            <p className="text-xs text-shell-muted">{new Date(component.updated_at).toLocaleString()}</p>
          </div>
          {component.updated_by_username && (
            <div>
              <p className="label mb-1">Updated by</p>
              <p className="text-xs text-shell-muted">{component.updated_by_username}</p>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-shell-border space-y-2 mt-auto">
          {can('edit') && (
            <Link to={`/components/${id}/edit`} className="btn-primary w-full justify-center text-xs">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M11 2l3 3-9 9H2v-3L11 2z"/>
              </svg>
              Edit Component
            </Link>
          )}
          {can('export') && (
            <button onClick={() => setShowExport(true)} className="btn btn-ghost w-full justify-center text-xs">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 2v8M5 8l3 3 3-3M2 13h12"/>
              </svg>
              Export ZIP
            </button>
          )}
        </div>
      </div>

      {/* Center: Read-only code with copy buttons */}
      <div className="flex-[2] border-r border-shell-border flex flex-col overflow-hidden relative">
        <div className="absolute top-2 right-2 z-10 flex gap-1">
          {['html','css','js'].map(type => (
            <button
              key={type}
              onClick={() => copyCode(type)}
              className={`px-2 py-1 rounded text-2xs uppercase font-mono transition-colors ${
                copied === type ? 'bg-status-green text-white' : 'bg-shell-input border border-shell-border text-shell-muted hover:text-shell-text'
              }`}
            >
              {copied === type ? '✓' : 'Copy'} {type.toUpperCase()}
            </button>
          ))}
        </div>
        <CodeEditor
          value={{ html: component.html || '', css: component.css || '', js: component.js || '' }}
          onChange={() => {}}
          readOnly
        />
      </div>

      {/* Right: Preview */}
      <div className="flex-[2] flex flex-col overflow-hidden">
        <PreviewPanel html={component.html} css={component.css} js={component.js} />
      </div>

      {showExport && <ExportModal component={component} onClose={() => setShowExport(false)} />}
    </div>
  );
}
