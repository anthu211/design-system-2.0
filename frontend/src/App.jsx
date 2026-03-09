import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/Navbar';
import NavSidebar from './components/NavSidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComponentEditor from './pages/ComponentEditor';
import ComponentViewer from './pages/ComponentViewer';
import UserManagement from './pages/UserManagement';
import AuditLog from './pages/AuditLog';
import ButtonsDemo from './pages/demo/ButtonsDemo';
import FormsDemo from './pages/demo/FormsDemo';
import ChartsDemo from './pages/demo/ChartsDemo';
import IconsDemo from './pages/demo/IconsDemo';

function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen bg-shell-bg flex items-center justify-center">
      <svg className="animate-spin text-accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
        <path d="M12 2a10 10 0 0110 10" strokeLinecap="round"/>
      </svg>
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function NotFound() {
  return (
    <div className="min-h-screen bg-shell-bg flex items-center justify-center flex-col gap-4">
      <div className="text-6xl font-bold text-shell-border">404</div>
      <p className="text-shell-muted text-sm">Page not found</p>
      <a href="/" className="btn-primary btn-sm">Go home</a>
    </div>
  );
}

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('cl_dark');
    return stored !== null ? stored === 'true' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('cl_dark', String(darkMode));
  }, [darkMode]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route
          element={
            <div className="flex flex-col h-screen overflow-hidden">
              <Navbar
                onToggleSidebar={() => setSidebarCollapsed(c => !c)}
                darkMode={darkMode}
                onToggleDark={() => setDarkMode(d => !d)}
              />
              <div className="flex flex-1 overflow-hidden">
                <NavSidebar collapsed={sidebarCollapsed} />
                <div className="flex-1 overflow-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          }
        >
          <Route path="/" element={<Dashboard sidebarCollapsed={sidebarCollapsed} />} />
          {/* Design system demo routes — must come before :id */}
          <Route path="/components/buttons" element={<ButtonsDemo />} />
          <Route path="/components/forms" element={<FormsDemo />} />
          <Route path="/components/charts" element={<ChartsDemo />} />
          <Route path="/components/icons" element={<IconsDemo />} />
          {/* Component library routes */}
          <Route path="/components/:id" element={<ComponentViewer />} />
          <Route path="/components/:id/edit" element={<ComponentEditor />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/audit" element={<AuditLog />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
