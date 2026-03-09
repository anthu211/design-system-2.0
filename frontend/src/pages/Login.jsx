import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { login as apiLogin } from '../utils/api';
import toast from 'react-hot-toast';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await apiLogin(form);
      login(data.token, data.user);
      toast.success(`Welcome, ${data.user.username}!`);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-shell-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-10 h-10 bg-accent rounded-xl grid place-items-center mb-4">
            <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L1 4.5V9.5L7 13L13 9.5V4.5L7 1Z" fill="white" opacity="0.85"/>
              <circle cx="7" cy="7" r="2.2" fill="#6360D8"/>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-shell-text">Prevalent AI</h1>
          <p className="text-xs text-shell-muted mt-1">Component Library Platform</p>
        </div>

        {/* Card */}
        <div className="card p-6 shadow-modal">
          <h2 className="text-sm font-semibold text-shell-text mb-5">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Username</label>
              <input
                type="text"
                className="input"
                placeholder="admin"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                autoFocus
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            {error && (
              <div className="text-xs text-status-red bg-status-red/10 border border-status-red/20 rounded-md px-3 py-2">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? (
                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                  <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
                </svg>
              ) : null}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="text-center text-2xs text-shell-muted mt-4">
          Default credentials: <span className="font-mono text-accent-light">admin / admin123</span>
        </p>
      </div>
    </div>
  );
}
