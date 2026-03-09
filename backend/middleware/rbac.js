const PERMISSIONS = {
  super_admin: ['view', 'edit', 'create', 'delete', 'export', 'manage_users', 'view_audit', 'git_config'],
  designer:    ['view', 'edit', 'create', 'export'],
  developer:   ['view', 'export'],
  qa:          ['view'],
};

function can(permission) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }
    const userPerms = PERMISSIONS[req.user.role] || [];
    if (!userPerms.includes(permission)) {
      return res.status(403).json({ error: `Forbidden: requires '${permission}' permission` });
    }
    next();
  };
}

module.exports = { can, PERMISSIONS };
