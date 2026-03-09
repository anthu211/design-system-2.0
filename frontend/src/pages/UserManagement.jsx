import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserManager from '../components/UserManager';
import { usePermissions } from '../hooks/usePermissions';
import * as api from '../utils/api';
import toast from 'react-hot-toast';

const ROLES = ['super_admin', 'designer', 'developer', 'qa'];

export default function UserManagement() {
  const { can } = usePermissions();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'developer' });
  const [creating, setCreating] = useState(false);

  if (!can('manage_users')) return <Navigate to="/" replace />;

  function fetchUsers() {
    setLoading(true);
    api.getUsers()
      .then(setUsers)
      .catch(err => toast.error(err.response?.data?.error || 'Failed to load users'))
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchUsers(); }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    try {
      await api.createUser(form);
      toast.success(`User "${form.username}" created`);
      setShowCreate(false);
      setForm({ username: '', email: '', password: '', role: 'developer' });
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Create failed');
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-shell-text">User Management</h1>
          <p className="text-xs text-shell-muted mt-1">{users.length} user{users.length !== 1 ? 's' : ''} registered</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 2v12M2 8h12"/>
          </svg>
          Add User
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4].map(i => <div key={i} className="skeleton h-12 rounded-lg" />)}
        </div>
      ) : (
        <UserManager users={users} onRefresh={fetchUsers} />
      )}

      {/* Create user modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="card w-full max-w-md shadow-modal">
            <div className="flex items-center justify-between p-5 border-b border-shell-border">
              <h2 className="text-md font-semibold text-shell-text">Create User</h2>
              <button onClick={() => setShowCreate(false)} className="p-1 rounded hover:bg-shell-hover text-shell-muted">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 2l12 12M14 2L2 14"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5 space-y-4">
              <div>
                <label className="label">Username</label>
                <input className="input" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required minLength={3} />
              </div>
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
              </div>
              <div>
                <label className="label">Password</label>
                <input type="password" className="input" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required minLength={6} />
              </div>
              <div>
                <label className="label">Role</label>
                <select className="input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                  {ROLES.map(r => <option key={r} value={r}>{r.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowCreate(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" disabled={creating} className="btn-primary">
                  {creating ? 'Creating…' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
