import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { usePermissions } from '../hooks/usePermissions';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

const PAGE_SIZE = 50;

const ACTION_COLORS = {
  login: 'badge-green',
  component_created: 'badge-accent',
  component_updated: 'badge-yellow',
  component_deleted: 'badge-red',
  user_created: 'badge-accent',
  user_updated: 'badge-yellow',
  user_deleted: 'badge-red',
  version_restored: 'badge-orange',
  git_commit: 'badge-green',
  git_push: 'badge-green',
};

export default function AuditLog() {
  const { can } = usePermissions();
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState({ entity_type: '', user_id: '', from: '', to: '' });
  const [users, setUsers] = useState([]);
  const [sortCol, setSortCol] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');

  if (!can('view_audit')) return <Navigate to="/" replace />;

  function fetchLogs() {
    setLoading(true);
    api.getAuditLog({ ...Object.fromEntries(Object.entries(filters).filter(([,v])=>v)), limit: PAGE_SIZE, offset: page * PAGE_SIZE })
      .then(data => { setLogs(data.logs); setTotal(data.total); })
      .catch(err => toast.error(err.response?.data?.error || 'Failed to load audit log'))
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchLogs(); }, [page, filters]);
  useEffect(() => { api.getUsers().then(setUsers).catch(() => {}); }, []);

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }

  const sorted = [...logs].sort((a, b) => {
    const av = a[sortCol] ?? ''; const bv = b[sortCol] ?? '';
    const cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function SortIcon({ col }) {
    if (sortCol !== col) return <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="opacity-30"><path d="M4 0l2 3H2zm0 8L2 5h4z"/></svg>;
    return sortDir === 'asc'
      ? <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><path d="M4 0L2 3h4z"/></svg>
      : <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><path d="M4 8L2 5h4z"/></svg>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-shell-text">Audit Log</h1>
        <p className="text-xs text-shell-muted mt-1">{total} total event{total !== 1 ? 's' : ''}</p>
      </div>

      {/* Filters */}
      <div className="card p-4 mb-4 flex flex-wrap gap-3 items-end">
        <div>
          <label className="label">User</label>
          <select className="input text-xs py-1" value={filters.user_id} onChange={e => { setFilters(f=>({...f, user_id: e.target.value})); setPage(0); }}>
            <option value="">All users</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.username}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Entity type</label>
          <select className="input text-xs py-1" value={filters.entity_type} onChange={e => { setFilters(f=>({...f, entity_type: e.target.value})); setPage(0); }}>
            <option value="">All types</option>
            {['component','user','git_config','git'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label">From</label>
          <input type="date" className="input text-xs py-1" value={filters.from} onChange={e => { setFilters(f=>({...f, from: e.target.value})); setPage(0); }} />
        </div>
        <div>
          <label className="label">To</label>
          <input type="date" className="input text-xs py-1" value={filters.to} onChange={e => { setFilters(f=>({...f, to: e.target.value})); setPage(0); }} />
        </div>
        <button onClick={() => { setFilters({ entity_type: '', user_id: '', from: '', to: '' }); setPage(0); }} className="btn btn-ghost btn-sm text-xs">
          Clear filters
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="skeleton h-10 rounded" />)}</div>
      ) : (
        <>
          <div className="card overflow-hidden mb-4">
            <table className="data-table">
              <thead>
                <tr>
                  {[['created_at','Timestamp'],['username','User'],['action','Action'],['entity_type','Entity'],['entity_id','ID'],['ip_address','IP']].map(([col,label]) => (
                    <th key={col} className="cursor-pointer select-none" onClick={() => handleSort(col)}>
                      <span className="flex items-center gap-1">{label} <SortIcon col={col} /></span>
                    </th>
                  ))}
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {sorted.length === 0 && (
                  <tr><td colSpan={7} className="text-center text-shell-muted py-6 text-xs">No events found</td></tr>
                )}
                {sorted.map(log => (
                  <tr key={log.id}>
                    <td className="text-2xs font-mono text-shell-muted whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="text-xs font-medium text-shell-subtle">{log.username || '—'}</td>
                    <td>
                      <span className={`badge ${ACTION_COLORS[log.action] || 'badge-accent'}`}>
                        {log.action.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="text-xs text-shell-muted">{log.entity_type || '—'}</td>
                    <td className="text-2xs font-mono text-shell-muted">{log.entity_id ?? '—'}</td>
                    <td className="text-2xs font-mono text-shell-muted">{log.ip_address || '—'}</td>
                    <td className="text-2xs text-shell-muted max-w-[200px] truncate" title={JSON.stringify(log.details)}>
                      {log.details ? JSON.stringify(log.details) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <span className="text-xs text-shell-muted">
                Page {page + 1} of {totalPages} ({total} total)
              </span>
              <div className="flex gap-1">
                <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="btn btn-ghost btn-sm">Previous</button>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i).map(i => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={`btn btn-sm ${page === i ? 'btn-primary' : 'btn-ghost'}`}
                  >{i + 1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="btn btn-ghost btn-sm">Next</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
