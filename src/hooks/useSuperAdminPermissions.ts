import { useState, useEffect } from 'react';
import SuperAdminAuth from '../services/superAdminAuth';

export interface PermissionCheck {
  resource: string;
  action: string;
}

export interface RoleCheck {
  role: string;
}

export const useSuperAdminPermissions = () => {
  const [currentUser, setCurrentUser] = useState(SuperAdminAuth.getCurrentUser());
  const [permissions, setPermissions] = useState<string[]>(SuperAdminAuth.getPermissions());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const user = await SuperAdminAuth.initialize();
        setCurrentUser(user);
        setPermissions(SuperAdminAuth.getPermissions());
      } catch (error) {
        console.error('Error initializing super admin auth:', error);
        setCurrentUser(null);
        setPermissions([]);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Permission checking functions
  const hasPermission = (resource: string, action: string): boolean => {
    return SuperAdminAuth.hasPermission(resource, action);
  };

  const hasAnyPermission = (permissionChecks: PermissionCheck[]): boolean => {
    return SuperAdminAuth.hasAnyPermission(permissionChecks);
  };

  const hasAllPermissions = (permissionChecks: PermissionCheck[]): boolean => {
    return SuperAdminAuth.hasAllPermissions(permissionChecks);
  };

  // Role checking functions
  const hasRole = (role: string): boolean => {
    return currentUser?.role === role;
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.includes(currentUser?.role || '');
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => currentUser?.role === role);
  };

  const isSuperAdmin = (): boolean => {
    return SuperAdminAuth.isSuperAdmin();
  };

  const isAdminOrHigher = (): boolean => {
    return SuperAdminAuth.isAdminOrHigher();
  };

  const isManagerOrHigher = (): boolean => {
    return SuperAdminAuth.isManagerOrHigher();
  };

  // Access checking functions
  const canAccess = (route: string): boolean => {
    return SuperAdminAuth.canAccess(route);
  };

  const canPerformAction = (resource: string, action: string, resourceId?: string): boolean => {
    return SuperAdminAuth.canPerformAction(resource, action, resourceId);
  };

  // Get accessible routes
  const getAccessibleRoutes = (): string[] => {
    return SuperAdminAuth.getAccessibleRoutes();
  };

  // Utility functions
  const getRoleLevel = (role: string): number => {
    const roleLevels: Record<string, number> = {
      'Super Admin': 10,
      'Admin': 8,
      'Manager': 6,
      'User': 4,
      'Viewer': 2
    };
    return roleLevels[role] || 0;
  };

  const canAccessUserData = (targetUserId?: number, targetCompanyId?: number): boolean => {
    if (!currentUser) return false;

    // Super Admin can access all user data
    if (isSuperAdmin()) return true;

    // Admin can access users in their company
    if (isAdminOrHigher() && targetCompanyId === currentUser.company_id) return true;

    // Users can access their own data
    if (targetUserId === currentUser.id) return true;

    return false;
  };

  const canManageCompany = (targetCompanyId?: number): boolean => {
    if (!currentUser) return false;

    // Super Admin can manage all companies
    if (isSuperAdmin()) return true;

    // Admin can manage their own company
    if (isAdminOrHigher() && targetCompanyId === currentUser.company_id) return true;

    return false;
  };

  const canImpersonateUser = (targetUserId: number): boolean => {
    if (!currentUser) return false;

    // Only Super Admin can impersonate
    if (!isSuperAdmin()) return false;

    // Cannot impersonate yourself
    if (targetUserId === currentUser.id) return false;

    return true;
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const user = await SuperAdminAuth.refreshUser();
      setCurrentUser(user);
      setPermissions(SuperAdminAuth.getPermissions());
    } catch (error) {
      console.error('Error refreshing user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    await SuperAdminAuth.logout();
    setCurrentUser(null);
    setPermissions([]);
  };

  return {
    // State
    currentUser,
    permissions,
    isLoading,

    // Permission checks
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,

    // Role checks
    hasRole,
    hasAnyRole,
    hasAllRoles,
    isSuperAdmin,
    isAdminOrHigher,
    isManagerOrHigher,

    // Access checks
    canAccess,
    canPerformAction,
    getAccessibleRoutes,

    // Utility functions
    getRoleLevel,
    canAccessUserData,
    canManageCompany,
    canImpersonateUser,

    // Actions
    refreshUser,
    logout
  };
};

export default useSuperAdminPermissions;
