import React from 'react';
import { Navigate } from 'react-router-dom';
import SuperAdminAuth from '../../services/superAdminAuth';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission?: { resource: string; action: string };
  requiredRole?: string;
  requiredRoles?: string[];
  requireAll?: boolean; // If true, user must have ALL required roles, otherwise ANY
  fallback?: React.ReactNode;
  showError?: boolean;
  errorMessage?: string;
}

const SuperAdminPermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermission,
  requiredRole,
  requiredRoles,
  requireAll = false,
  fallback = <Navigate to="/super-admin" replace />,
  showError = false,
  errorMessage = "You don't have permission to access this resource."
}) => {
  const currentUser = SuperAdminAuth.getCurrentUser();

  // Check if user is authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is active
  if (currentUser.status !== 'Active') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Account Suspended</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Your account is currently {currentUser.status.toLowerCase()}. Please contact your administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Check role requirements
  if (requiredRole && currentUser.role !== requiredRole) {
    return showError ? (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
              <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Insufficient Role</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This resource requires {requiredRole} role. Your current role is {currentUser.role}.
            </p>
          </div>
        </div>
      </div>
    ) : fallback;
  }

  // Check multiple roles requirement
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requireAll
      ? requiredRoles.every(role => currentUser.role === role)
      : requiredRoles.includes(currentUser.role);

    if (!hasRequiredRole) {
      return showError ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20">
                <svg className="h-6 w-6 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Insufficient Role</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                This resource requires {requireAll ? 'all of' : 'one of'} the following roles: {requiredRoles.join(', ')}. 
                Your current role is {currentUser.role}.
              </p>
            </div>
          </div>
        </div>
      ) : fallback;
    }
  }

  // Check permission requirements
  if (requiredPermission && !SuperAdminAuth.hasPermission(requiredPermission.resource, requiredPermission.action)) {
    return showError ? (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Access Denied</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {errorMessage}
            </p>
            <div className="mt-3 text-xs text-gray-400 dark:text-gray-500">
              Required permission: {requiredPermission.resource}:{requiredPermission.action}
            </div>
          </div>
        </div>
      </div>
    ) : fallback;
  }

  // All checks passed, render children
  return <>{children}</>;
};

export default SuperAdminPermissionGuard;
