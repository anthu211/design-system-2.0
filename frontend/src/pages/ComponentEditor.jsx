import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Navigate, useBlocker } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import PreviewPanel from '../components/PreviewPanel';
import VersionHistory from '../components/VersionHistory';
import { useComponent } from '../hooks/useComponents';
import { usePermissions } from '../hooks/usePermissions';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debouncedValue;
}

export default function ComponentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { can } = usePermissions();
  const { component, loading, refetch } = useComponent(id);
  const [meta, setMeta] = useState({ name: '', description: '', category: '', tags: '', commit_message: '' });
  const [code, setCode] = useState({ html: '', css: '', js: '' });
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [gitConfig, setGitConfig] = useState(null);
  const originalCode = useRef({});

  if (!can('edit')) return <Navigate to="/" replace />;

  useEffect(() => {
    if (component) {
      const c = { html: component.html || '', css: component.css || '', js: component.js || '' };
      setCode(c);
      originalCode.current = c;
      setMeta({
        name: component.name || '',
        description: component.description || '',
        category: component.category || 'General',
        tags: Array.isArray(component.tags) ? component.tags.join(', ') : '',
        commit_message: '',
      });
    }
  }, [component]);

  useEffect(() => {
    if (can('git_config')) api.getGitConfig().then(setGitConfig).catch(() => {});
  }, []);

  // Track unsaved changes
  useEffect(() => {
    if (!component) return;
    const changed = code.html !== originalCode.current.html || code.css !== originalCode.current.css || code.js !== originalCode.current.js;
    setDirty(changed);
  }, [code, component]);

  // Ctrl+S / Cmd+S shortcut
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave(); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [code, meta]);

  // Unsaved changes blocker
  useBlocker(({ currentLocation, nextLocation }) =>
    dirty && currentLocation.pathname !== nextLocation.pathname
    ? !window.confirm('You have unsaved changes. Leave anyway?')
    : false
  );

  const debouncedCode = useDebounce(code, 500);

  async function handleSave(withCommit = false) {
    if (saving) return;
    setSaving(true);
    try {
      const tags = meta.tags.split(',').map(t => t.trim()).filter(Boolean);
      const updated = await api.updateComponent(id, {
        name: meta.name,
        description: meta.description,
        category: meta.category,
        tags,
        html: code.html,
        css: code.css,
        js: code.js,
        commit_message: meta.commit_message || (withCommit ? `Update ${meta.name}` : undefined),
      });
      originalCode.current = { html: code.html, css: code.css, js: code.js };
      setDirty(false);
      setMeta(m => ({ ...m, commit_message: '' }));
      toast.success(withCommit ? 'Saved & committed' : 'Saved');
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  function handleRestoreVersion(comp) {
    const c = { html: comp.html || '', css: comp.css || '', js: comp.js || '' };
    setCode(c);
    originalCode.current = c;
    setDirty(false);
    refetch();
  }

  if (loading) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-xs text-shell-muted">Loading component…</div>
    </div>
  );

  if (!component) return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-sm text-status-red">Component not found.</div>
    </div>
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left: Metadata panel */}
      <div className="w-64 flex-shrink-0 bg-shell-sidebar border-r border-shell-border flex flex-col overflow-y-auto">
        <div className="p-4 border-b border-shell-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold text-shell-muted uppercase tracking-widest">Metadata</h2>
            <button onClick={() => navigate(-1)} className="text-shell-muted hover:text-shell-text transition-colors">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M10 3L5 8l5 5"/>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 space-y-4 flex-1">
          <div>
            <label className="label">Name</label>
            <input className="input text-xs" value={meta.name} onChange={e => setMeta(m => ({ ...m, name: e.target.value }))} />
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input text-xs resize-none h-20" value={meta.description} onChange={e => setMeta(m => ({ ...m, description: e.target.value }))} />
          </div>
          <div>
            <label className="label">Category</label>
            <input className="input text-xs" value={meta.category} onChange={e => setMeta(m => ({ ...m, category: e.target.value }))} placeholder="e.g. Forms, Feedback" />
          </div>
          <div>
            <label className="label">Tags (comma-separated)</label>
            <input className="input text-xs" value={meta.tags} onChange={e => setMeta(m => ({ ...m, tags: e.target.value }))} placeholder="button, primary, cta" />
          </div>
          <div>
            <label className="label">Commit message</label>
            <input className="input text-xs" value={meta.commit_message} onChange={e => setMeta(m => ({ ...m, commit_message: e.target.value }))} placeholder="What changed?" />
          </div>
        </div>

        {/* Save buttons */}
        <div className="p-4 border-t border-shell-border space-y-2">
          {dirty && <p className="text-2xs text-status-orange text-center">Unsaved changes</p>}
          <button onClick={() => handleSave(false)} disabled={saving} className="btn-primary w-full justify-center text-xs">
            {saving ? 'Saving…' : 'Save'} <span className="text-2xs opacity-60 ml-1">⌘S</span>
          </button>
          {gitConfig?.repo_path && (
            <button onClick={() => handleSave(true)} disabled={saving} className="btn btn-ghost w-full justify-center text-xs">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="5" cy="5" r="2"/><circle cx="11" cy="11" r="2"/><path d="M7 5h2a2 2 0 012 2v2"/>
              </svg>
              Save & Commit
            </button>
          )}
          <button onClick={() => setHistoryOpen(h => !h)} className="btn btn-ghost w-full justify-center text-xs">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
            </svg>
            {historyOpen ? 'Hide' : 'Show'} History
          </button>
        </div>
      </div>

      {/* Center: Monaco Editor */}
      <div className={`${historyOpen ? 'flex-[2]' : 'flex-[3]'} flex flex-col overflow-hidden`}>
        <CodeEditor value={code} onChange={setCode} />
      </div>

      {/* Right: Preview */}
      <div className="flex-[2] border-l border-shell-border flex flex-col overflow-hidden">
        <PreviewPanel html={debouncedCode.html} css={debouncedCode.css} js={debouncedCode.js} />
      </div>

      {/* Version history drawer */}
      {historyOpen && (
        <div className="w-56 flex-shrink-0 border-l border-shell-border flex flex-col overflow-hidden">
          <VersionHistory componentId={id} currentCode={code} onRestore={handleRestoreVersion} />
        </div>
      )}
    </div>
  );
}
