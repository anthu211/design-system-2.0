import { useState } from 'react';
import { getRoleBadgeClass } from '../utils/permissions';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

const ROLES = ['super_admin', 'designer', 'developer', 'qa'];

export default function UserManager({ users, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [deletingId, setDeletingId] = useState(null);
  const [sortCol, setSortCol] = useState('created_at');
  const [sortDir, setSortDir] = useState('desc');

  function handleSort(col) {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
  }

  const sorted = [...users].sort((a, b) => {
    const av = a[sortCol] ?? ''; const bv = b[sortCol] ?? '';
    const cmp = String(av).localeCompare(String(bv));
    return sortDir === 'asc' ? cmp : -cmp;
  });

  function startEdit(user) {
    setEditingId(user.id);
    setEditValues({ role: user.role, is_active: user.is_active });
  }

  async function saveEdit(id) {
    try {
      await api.updateUser(id, editValues);
      toast.success('User updated');
      setEditingId(null);
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  }

  async function handleDelete(id) {
    if (deletingId !== id) { setDeletingId(id); return; }
    try {
      await api.deleteUser(id);
      toast.success('User deactivated');
      setDeletingId(null);
      onRefresh();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
      setDeletingId(null);
    }
  }

  function SortIcon({ col }) {
    if (sortCol !== col) return <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="opacity-30"><path d="M4 0l2 3H2zm0 8L2 5h4z"/></svg>;
    return sortDir === 'asc'
      ? <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><path d="M4 0L2 3h4z"/></svg>
      : <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><path d="M4 8L2 5h4z"/></svg>;
  }

  return (
    <div className="card overflow-hidden">
      <table className="data-table">
        <thead>
          <tr>
            {[['username','Username'],['email','Email'],['role','Role'],['is_active','Status'],['created_at','Created']].map(([col, label]) => (
              <th key={col} className="cursor-pointer select-none" onClick={() => handleSort(col)}>
                <span className="flex items-center gap-1">{label} <SortIcon col={col} /></span>
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(user => (
            <tr key={user.id}>
              <td className="font-medium text-shell-text">{user.username}</td>
              <td className="text-shell-muted">{user.email}</td>
              <td>
                {editingId === user.id ? (
                  <select
                    className="input py-0.5 text-xs"
                    value={editValues.role}
                    onChange={e => setEditValues(v => ({ ...v, role: e.target.value }))}
                  >
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                ) : (
                  <span className={`badge ${getRoleBadgeClass(user.role)}`}>{user.role.replace('_', ' ')}</span>
                )}
              </td>
              <td>
                {editingId === user.id ? (
                  <select
                    className="input py-0.5 text-xs"
                    value={editValues.is_active}
                    onChange={e => setEditValues(v => ({ ...v, is_active: Number(e.target.value) }))}
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                ) : (
                  <span className={`badge ${user.is_active ? 'badge-green' : 'badge-red'}`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                )}
              </td>
              <td className="text-shell-muted text-2xs">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td>
                <div className="flex items-center gap-1">
                  {editingId === user.id ? (
                    <>
                      <button onClick={() => saveEdit(user.id)} className="btn-primary btn-sm text-2xs">Save</button>
                      <button onClick={() => setEditingId(null)} className="btn btn-ghost btn-sm text-2xs">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(user)} className="btn btn-ghost btn-sm text-2xs">Edit</button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className={`btn btn-sm text-2xs ${deletingId === user.id ? 'btn-danger' : 'btn-ghost hover:text-status-red'}`}
                      >
                        {deletingId === user.id ? 'Confirm' : 'Deactivate'}
                      </button>
                      {deletingId === user.id && (
                        <button onClick={() => setDeletingId(null)} className="btn btn-ghost btn-sm text-2xs">Cancel</button>
                      )}
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
