export const PERMISSIONS = {
  super_admin: ['view', 'edit', 'create', 'delete', 'export', 'manage_users', 'view_audit', 'git_config'],
  designer:    ['view', 'edit', 'create', 'export'],
  developer:   ['view', 'export'],
  qa:          ['view'],
};

export function can(role, permission) {
  return (PERMISSIONS[role] || []).includes(permission);
}

export function getRoleBadgeClass(role) {
  const map = {
    super_admin: 'badge-accent',
    designer:    'badge-green',
    developer:   'badge-yellow',
    qa:          'badge-orange',
  };
  return map[role] || 'badge-accent';
}
