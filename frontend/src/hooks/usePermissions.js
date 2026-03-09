import { useAuth } from './useAuth';
import { can } from '../utils/permissions';

export function usePermissions() {
  const { user } = useAuth();
  return {
    can: (permission) => user ? can(user.role, permission) : false,
    role: user?.role,
  };
}
