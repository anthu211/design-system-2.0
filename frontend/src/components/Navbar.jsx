import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { getRoleBadgeClass } from '../utils/permissions';

export default function Navbar({ onToggleSidebar, darkMode, onToggleDark }) {
  const { user, logout } = useAuth();
  const { can } = usePermissions();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="h-[52px] bg-shell-sidebar border-b border-shell-border flex items-center px-4 gap-3 flex-shrink-0 sticky top-0 z-50">
      {/* Sidebar toggle */}
      <button
        onClick={onToggleSidebar}
        className="p-1.5 rounded hover:bg-shell-hover text-shell-muted hover:text-shell-text transition-colors"
        title="Toggle sidebar"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 4h12M2 8h12M2 12h8"/>
        </svg>
      </button>

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-6 h-6 bg-accent rounded-md grid place-items-center flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1L1 4.5V9.5L7 13L13 9.5V4.5L7 1Z" fill="white" opacity="0.85"/>
            <circle cx="7" cy="7" r="2.2" fill="#6360D8"/>
          </svg>
        </div>
        <span className="text-sm font-semibold text-shell-text hidden sm:block">Prevalent AI</span>
        <div className="w-px h-4 bg-shell-border hidden sm:block" />
        <span className="text-xs text-shell-muted hidden sm:block">Component Library</span>
      </Link>

      <div className="flex-1" />

      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-1">
        <Link to="/" className="px-3 py-1.5 text-xs text-shell-muted hover:text-shell-text hover:bg-shell-hover rounded-md transition-colors">
          Dashboard
        </Link>
        {can('manage_users') && (
          <Link to="/users" className="px-3 py-1.5 text-xs text-shell-muted hover:text-shell-text hover:bg-shell-hover rounded-md transition-colors">
            Users
          </Link>
        )}
        {can('view_audit') && (
          <Link to="/audit" className="px-3 py-1.5 text-xs text-shell-muted hover:text-shell-text hover:bg-shell-hover rounded-md transition-colors">
            Audit
          </Link>
        )}
      </nav>

      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className="p-1.5 rounded hover:bg-shell-hover text-shell-muted hover:text-shell-text transition-colors"
        title="Toggle dark mode"
      >
        {darkMode ? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="3.5"/>
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"/>
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13.5 9.5A6 6 0 016.5 2.5a6 6 0 100 11 6 6 0 007-4z"/>
          </svg>
        )}
      </button>

      {/* User pill */}
      {user && (
        <div className="flex items-center gap-2">
          <span className={`badge ${getRoleBadgeClass(user.role)}`}>{user.role.replace('_', ' ')}</span>
          <span className="text-xs text-shell-subtle">{user.username}</span>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 3h3v10h-3M7 11l4-3-4-3M1 8h8"/>
            </svg>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
