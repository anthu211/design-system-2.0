import { NavLink, useLocation } from 'react-router-dom';

const NAV_SECTIONS = [
  {
    label: 'Platform',
    items: [
      { label: 'Dashboard', to: '/', icon: 'grid' },
      { label: 'Users', to: '/users', icon: 'users' },
      { label: 'Audit Log', to: '/audit', icon: 'clipboard' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Buttons & Toggles', to: '/components/buttons', icon: 'cursor' },
      { label: 'Form Controls', to: '/components/forms', icon: 'form' },
      { label: 'Charts', to: '/components/charts', icon: 'chart' },
      { label: 'Icons', to: '/components/icons', icon: 'star' },
    ],
  },
];

const ICONS = {
  grid: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  users: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/>
      <path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  clipboard: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  ),
  cursor: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
      <path d="M13 13l6 6"/>
    </svg>
  ),
  form: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  chart: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
  star: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

export default function NavSidebar({ collapsed = false }) {
  const location = useLocation();

  if (collapsed) return null;

  return (
    <nav
      style={{
        width: 200,
        flexShrink: 0,
        background: '#131313',
        borderRight: '1px solid #272727',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        padding: '12px 0',
        fontFamily: 'Inter, sans-serif',
      }}
      aria-label="Main navigation"
    >
      {NAV_SECTIONS.map(section => (
        <div key={section.label} style={{ marginBottom: 8 }}>
          <div style={{
            fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: '#5a5a5a', padding: '8px 16px 4px',
          }}>
            {section.label}
          </div>
          {section.items.map(item => {
            // Exact match for '/', prefix match for others
            const isActive = item.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: '7px 16px',
                  fontSize: '13px',
                  textDecoration: 'none',
                  color: isActive ? '#f9f9f9' : '#8a8a8a',
                  background: isActive ? '#1e1e1e' : 'transparent',
                  borderLeft: `3px solid ${isActive ? '#6760d8' : 'transparent'}`,
                  transition: 'all 120ms',
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#d0d0d0'; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#8a8a8a'; }}
              >
                <span style={{ flexShrink: 0, color: isActive ? '#6760d8' : 'inherit' }}>
                  {ICONS[item.icon]}
                </span>
                {item.label}
              </NavLink>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
