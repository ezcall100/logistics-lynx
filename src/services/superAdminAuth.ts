import { supabase } from './supabase';

// Types for Super Admin Authentication
export interface SuperAdminUser {
  id: number;
  uuid: string;
  auth_user_id?: string;
  company_id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  permissions: string[];
  two_factor_enabled: boolean;
  last_login?: string;
  avatar_url?: string;
  timezone: string;
  language: string;
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface Role {
  name: string;
  permissions: Permission[];
  level: number;
}

// Role definitions with hierarchical permissions
export const ROLES: Record<string, Role> = {
  'Super Admin': {
    name: 'Super Admin',
    level: 10,
    permissions: [
      { resource: '*', actions: ['*'] } // Full access to everything
    ]
  },
  'Admin': {
    name: 'Admin',
    level: 8,
    permissions: [
      { resource: 'users', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'companies', actions: ['read', 'update', 'manage'] },
      { resource: 'portals', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'ai_agents', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'system', actions: ['read', 'monitor', 'manage'] },
      { resource: 'security', actions: ['read', 'monitor', 'manage'] },
      { resource: 'api_keys', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'tickets', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'crm', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'communication', actions: ['read', 'create', 'update', 'delete', 'manage'] },
      { resource: 'deployment', actions: ['read', 'monitor'] },
      { resource: 'audit_logs', actions: ['read', 'export'] }
    ]
  },
  'Manager': {
    name: 'Manager',
    level: 6,
    permissions: [
      { resource: 'users', actions: ['read', 'update'] },
      { resource: 'companies', actions: ['read'] },
      { resource: 'portals', actions: ['read', 'update'] },
      { resource: 'ai_agents', actions: ['read', 'update'] },
      { resource: 'system', actions: ['read', 'monitor'] },
      { resource: 'tickets', actions: ['read', 'create', 'update'] },
      { resource: 'crm', actions: ['read', 'create', 'update', 'delete'] },
      { resource: 'communication', actions: ['read', 'create', 'update'] }
    ]
  },
  'User': {
    name: 'User',
    level: 4,
    permissions: [
      { resource: 'users', actions: ['read'] },
      { resource: 'portals', actions: ['read'] },
      { resource: 'tickets', actions: ['read', 'create'] },
      { resource: 'communication', actions: ['read', 'create'] }
    ]
  },
  'Viewer': {
    name: 'Viewer',
    level: 2,
    permissions: [
      { resource: 'users', actions: ['read'] },
      { resource: 'portals', actions: ['read'] },
      { resource: 'system', actions: ['read'] }
    ]
  }
};

// Super Admin Authentication Service
export class SuperAdminAuth {
  private static currentUser: SuperAdminUser | null = null;
  private static userPermissions: string[] = [];

  // Initialize authentication
  static async initialize(): Promise<SuperAdminUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        this.currentUser = null;
        this.userPermissions = [];
        return null;
      }

      // Get user details from our users table
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('auth_user_id', user.id)
        .single();

      if (error || !userData) {
        console.error('Error fetching user data:', error);
        return null;
      }

      // Check if user has super admin access
      if (!this.isSuperAdminRole(userData.role)) {
        console.warn('User does not have super admin access');
        return null;
      }

      // Check if user is active
      if (userData.status !== 'Active') {
        console.warn('User account is not active');
        return null;
      }

      this.currentUser = userData;
      this.userPermissions = this.getUserPermissions(userData);
      
      // Update last login
      await this.updateLastLogin(userData.id);

      // Log successful login
      await this.logSecurityEvent({
        event_type: 'Login',
        severity: 'LOW',
        description: `Super admin user ${userData.email} logged in successfully`,
        user_id: userData.id,
        company_id: userData.company_id,
        metadata: {
          ip_address: null, // Will be set by database function
          user_agent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      });

      return userData;
    } catch (error) {
      console.error('Error initializing super admin auth:', error);
      return null;
    }
  }

  // Check if role has super admin access
  static isSuperAdminRole(role: string): boolean {
    const superAdminRoles = ['Super Admin', 'Admin', 'Manager'];
    return superAdminRoles.includes(role);
  }

  // Get user permissions based on role
  static getUserPermissions(user: SuperAdminUser): string[] {
    const role = ROLES[user.role];
    if (!role) return [];

    const permissions: string[] = [];
    
    // Add explicit permissions from user record
    if (user.permissions && user.permissions.length > 0) {
      permissions.push(...user.permissions);
    }

    // Add role-based permissions
    role.permissions.forEach(permission => {
      if (permission.resource === '*') {
        permissions.push('*');
      } else {
        permission.actions.forEach(action => {
          if (action === '*') {
            permissions.push(`${permission.resource}:*`);
          } else {
            permissions.push(`${permission.resource}:${action}`);
          }
        });
      }
    });

    return [...new Set(permissions)]; // Remove duplicates
  }

  // Check if user has specific permission
  static hasPermission(resource: string, action: string): boolean {
    if (!this.currentUser) return false;

    // Super Admin has all permissions
    if (this.userPermissions.includes('*')) return true;

    // Check specific permission
    const permission = `${resource}:${action}`;
    if (this.userPermissions.includes(permission)) return true;

    // Check wildcard permission for resource
    if (this.userPermissions.includes(`${resource}:*`)) return true;

    return false;
  }

  // Check if user can access a specific route/page
  static canAccess(route: string): boolean {
    if (!this.currentUser) return false;

    // Super Admin can access everything
    if (this.currentUser.role === 'Super Admin') return true;

    // Define route permissions
    const routePermissions: Record<string, string[]> = {
      '/super-admin': ['dashboard:read'],
      '/super-admin/users': ['users:read'],
      '/super-admin/users/create': ['users:create'],
      '/super-admin/users/edit': ['users:update'],
      '/super-admin/users/delete': ['users:delete'],
      '/super-admin/companies': ['companies:read'],
      '/super-admin/companies/edit': ['companies:update'],
      '/super-admin/portals': ['portals:read'],
      '/super-admin/portals/create': ['portals:create'],
      '/super-admin/portals/edit': ['portals:update'],
      '/super-admin/portals/delete': ['portals:delete'],
      '/super-admin/ai-agents': ['ai_agents:read'],
      '/super-admin/ai-agents/create': ['ai_agents:create'],
      '/super-admin/ai-agents/edit': ['ai_agents:update'],
      '/super-admin/ai-agents/delete': ['ai_agents:delete'],
      '/super-admin/system': ['system:read'],
      '/super-admin/system/monitor': ['system:monitor'],
      '/super-admin/security': ['security:read'],
      '/super-admin/security/manage': ['security:manage'],
      '/super-admin/api-keys': ['api_keys:read'],
      '/super-admin/api-keys/create': ['api_keys:create'],
      '/super-admin/api-keys/delete': ['api_keys:delete'],
      '/super-admin/tickets': ['tickets:read'],
      '/super-admin/tickets/manage': ['tickets:manage'],
      '/super-admin/crm': ['crm:read'],
      '/super-admin/crm/manage': ['crm:manage'],
      '/super-admin/communication': ['communication:read'],
      '/super-admin/communication/manage': ['communication:manage'],
      '/super-admin/deployment': ['deployment:read'],
      '/super-admin/audit-logs': ['audit_logs:read']
    };

    const requiredPermissions = routePermissions[route];
    if (!requiredPermissions) return true; // Allow access if no specific permissions defined

    return requiredPermissions.every(permission => {
      const [resource, action] = permission.split(':');
      return this.hasPermission(resource, action);
    });
  }

  // Check if user can perform action on specific resource
  static canPerformAction(resource: string, action: string, resourceId?: string): boolean {
    if (!this.currentUser) return false;

    // Check basic permission
    if (!this.hasPermission(resource, action)) return false;

    // Additional checks based on resource ownership
    if (resourceId) {
      // For now, allow access - implement ownership checks as needed
      return true;
    }

    return true;
  }

  // Get current user
  static getCurrentUser(): SuperAdminUser | null {
    return this.currentUser;
  }

  // Get user permissions
  static getPermissions(): string[] {
    return [...this.userPermissions];
  }

  // Check if user is super admin
  static isSuperAdmin(): boolean {
    return this.currentUser?.role === 'Super Admin';
  }

  // Check if user is admin or higher
  static isAdminOrHigher(): boolean {
    if (!this.currentUser) return false;
    const adminRoles = ['Super Admin', 'Admin'];
    return adminRoles.includes(this.currentUser.role);
  }

  // Check if user is manager or higher
  static isManagerOrHigher(): boolean {
    if (!this.currentUser) return false;
    const managerRoles = ['Super Admin', 'Admin', 'Manager'];
    return managerRoles.includes(this.currentUser.role);
  }

  // Impersonate another user (Super Admin only)
  static async impersonateUser(targetUserId: number, reason: string): Promise<boolean> {
    if (!this.isSuperAdmin()) {
      throw new Error('Only Super Admins can impersonate users');
    }

    try {
      // Get target user data
      const { data: targetUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error || !targetUser) {
        throw new Error('Target user not found');
      }

      // Check if target user has super admin access
      if (!this.isSuperAdminRole(targetUser.role)) {
        throw new Error('Cannot impersonate non-super admin users');
      }

      // Log impersonation event
      await this.logSecurityEvent({
        event_type: 'Permission Change',
        severity: 'HIGH',
        description: `Super admin ${this.currentUser?.email} impersonated user ${targetUser.email}. Reason: ${reason}`,
        user_id: this.currentUser?.id,
        company_id: this.currentUser?.company_id,
        metadata: {
          target_user_id: targetUserId,
          target_user_email: targetUser.email,
          reason: reason,
          timestamp: new Date().toISOString()
        }
      });

      // Switch to target user
      this.currentUser = targetUser;
      this.userPermissions = this.getUserPermissions(targetUser);

      return true;
    } catch (error) {
      console.error('Error impersonating user:', error);
      throw error;
    }
  }

  // Stop impersonation and return to original user
  static async stopImpersonation(): Promise<void> {
    if (!this.isSuperAdmin()) {
      throw new Error('Not currently impersonating a user');
    }

    // Re-initialize to get back to original user
    await this.initialize();
  }

  // Update user permissions
  static async updateUserPermissions(userId: number, permissions: string[]): Promise<void> {
    if (!this.hasPermission('users', 'manage')) {
      throw new Error('Insufficient permissions to update user permissions');
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ permissions })
        .eq('id', userId);

      if (error) throw error;

      // Log permission change
      await this.logSecurityEvent({
        event_type: 'Permission Change',
        severity: 'MEDIUM',
        description: `User permissions updated for user ID ${userId}`,
        user_id: this.currentUser?.id,
        company_id: this.currentUser?.company_id,
        metadata: {
          target_user_id: userId,
          new_permissions: permissions,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error updating user permissions:', error);
      throw error;
    }
  }

  // Enable/disable two-factor authentication
  static async toggleTwoFactor(userId: number, enabled: boolean): Promise<void> {
    if (!this.hasPermission('users', 'manage') && this.currentUser?.id !== userId) {
      throw new Error('Insufficient permissions to modify two-factor authentication');
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ two_factor_enabled: enabled })
        .eq('id', userId);

      if (error) throw error;

      // Log 2FA change
      await this.logSecurityEvent({
        event_type: 'Permission Change',
        severity: 'MEDIUM',
        description: `Two-factor authentication ${enabled ? 'enabled' : 'disabled'} for user ID ${userId}`,
        user_id: this.currentUser?.id,
        company_id: this.currentUser?.company_id,
        metadata: {
          target_user_id: userId,
          two_factor_enabled: enabled,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error toggling two-factor authentication:', error);
      throw error;
    }
  }

  // Suspend/activate user account
  static async toggleUserStatus(userId: number, status: 'Active' | 'Suspended' | 'Inactive'): Promise<void> {
    if (!this.hasPermission('users', 'manage')) {
      throw new Error('Insufficient permissions to change user status');
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ status })
        .eq('id', userId);

      if (error) throw error;

      // Log status change
      await this.logSecurityEvent({
        event_type: 'Permission Change',
        severity: 'HIGH',
        description: `User status changed to ${status} for user ID ${userId}`,
        user_id: this.currentUser?.id,
        company_id: this.currentUser?.company_id,
        metadata: {
          target_user_id: userId,
          new_status: status,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error('Error changing user status:', error);
      throw error;
    }
  }

  // Logout
  static async logout(): Promise<void> {
    if (!this.currentUser) return;

    try {
      // Log logout event
      await this.logSecurityEvent({
        event_type: 'Logout',
        severity: 'LOW',
        description: `Super admin user ${this.currentUser.email} logged out`,
        user_id: this.currentUser.id,
        company_id: this.currentUser.company_id,
        metadata: {
          timestamp: new Date().toISOString()
        }
      });

      // Clear local state
      this.currentUser = null;
      this.userPermissions = [];

      // Sign out from Supabase
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  // Private helper methods
  private static async updateLastLogin(userId: number): Promise<void> {
    try {
      await supabase
        .from('users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId);
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }

  private static async logSecurityEvent(event: {
    event_type: string;
    severity: string;
    description: string;
    user_id?: number;
    company_id?: number;
    metadata?: any;
  }): Promise<void> {
    try {
      await supabase
        .from('security_events')
        .insert({
          event_type: event.event_type,
          severity: event.severity,
          description: event.description,
          user_id: event.user_id,
          company_id: event.company_id,
          metadata: event.metadata,
          ip_address: null, // Will be set by database function
          user_agent: navigator.userAgent
        });
    } catch (error) {
      console.error('Error logging security event:', error);
    }
  }

  // Utility method to check multiple permissions at once
  static hasAnyPermission(permissions: Array<{ resource: string; action: string }>): boolean {
    return permissions.some(({ resource, action }) => this.hasPermission(resource, action));
  }

  // Utility method to check all permissions
  static hasAllPermissions(permissions: Array<{ resource: string; action: string }>): boolean {
    return permissions.every(({ resource, action }) => this.hasPermission(resource, action));
  }

  // Get user's accessible routes
  static getAccessibleRoutes(): string[] {
    const allRoutes = [
      '/super-admin',
      '/super-admin/users',
      '/super-admin/users/create',
      '/super-admin/users/edit',
      '/super-admin/users/delete',
      '/super-admin/companies',
      '/super-admin/companies/edit',
      '/super-admin/portals',
      '/super-admin/portals/create',
      '/super-admin/portals/edit',
      '/super-admin/portals/delete',
      '/super-admin/ai-agents',
      '/super-admin/ai-agents/create',
      '/super-admin/ai-agents/edit',
      '/super-admin/ai-agents/delete',
      '/super-admin/system',
      '/super-admin/system/monitor',
      '/super-admin/security',
      '/super-admin/security/manage',
      '/super-admin/api-keys',
      '/super-admin/api-keys/create',
      '/super-admin/api-keys/delete',
      '/super-admin/tickets',
      '/super-admin/tickets/manage',
      '/super-admin/crm',
      '/super-admin/crm/manage',
      '/super-admin/communication',
      '/super-admin/communication/manage',
      '/super-admin/deployment',
      '/super-admin/audit-logs'
    ];

    return allRoutes.filter(route => this.canAccess(route));
  }

  // Refresh user data (useful when permissions are updated)
  static async refreshUser(): Promise<SuperAdminUser | null> {
    return await this.initialize();
  }
}

export default SuperAdminAuth;
