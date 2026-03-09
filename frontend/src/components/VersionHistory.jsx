import { useState, useEffect } from 'react';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

export default function VersionHistory({ componentId, currentCode, onRestore }) {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(null);

  useEffect(() => {
    if (!componentId) return;
    api.getVersions(componentId)
      .then(setVersions)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [componentId]);

  async function handleRestore(version) {
    if (confirming !== version.id) { setConfirming(version.id); return; }
    try {
      const result = await api.restoreVersion(componentId, version.id);
      toast.success(`Restored to v${version.version_number}`);
      onRestore(result.component);
      setConfirming(null);
      // Refresh list
      const fresh = await api.getVersions(componentId);
      setVersions(fresh);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Restore failed');
      setConfirming(null);
    }
  }

  if (loading) return (
    <div className="p-4 space-y-2">
      {[1,2,3].map(i => <div key={i} className="skeleton h-10 rounded" />)}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-shell-border">
        <h3 className="text-xs font-semibold text-shell-muted uppercase tracking-widest">Version History</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {versions.length === 0 && (
          <p className="p-4 text-xs text-shell-muted text-center">No versions yet</p>
        )}
        {versions.map(v => (
          <div
            key={v.id}
            onClick={() => setSelected(selected?.id === v.id ? null : v)}
            className={`p-3 border-b border-shell-border/50 cursor-pointer hover:bg-shell-hover transition-colors ${
              selected?.id === v.id ? 'bg-shell-active border-l-2 border-accent' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-accent-light">v{v.version_number}</span>
              <span className="text-2xs text-shell-muted">
                {new Date(v.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <p className="text-2xs text-shell-muted">by {v.saved_by_username || 'unknown'}</p>
            {v.commit_message && (
              <p className="text-2xs text-shell-subtle mt-1 italic truncate">{v.commit_message}</p>
            )}

            {/* Expanded actions */}
            {selected?.id === v.id && (
              <div className="mt-2 pt-2 border-t border-shell-border/50" onClick={e => e.stopPropagation()}>
                {confirming === v.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => handleRestore(v)} className="btn-primary btn-sm flex-1 justify-center text-2xs">
                      Confirm restore
                    </button>
                    <button onClick={() => setConfirming(null)} className="btn btn-ghost btn-sm text-2xs">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button onClick={() => handleRestore(v)} className="btn btn-ghost btn-sm w-full justify-center text-2xs">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M2 8a6 6 0 016-6 6 6 0 014.24 1.76L14 6M2 2v4h4"/>
                    </svg>
                    Restore this version
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
