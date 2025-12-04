import React from 'react';

export type UserRole = 'Owner' | 'Admin' | 'Editor' | 'Viewer';

interface RBACWrapperProps {
  allowedRoles: UserRole[];
  userRole: UserRole;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RBACWrapper: React.FC<RBACWrapperProps> = ({ 
  allowedRoles, 
  userRole, 
  children, 
  fallback = null 
}) => {
  if (allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
};

// Helper for filtering arrays (like menu items)
export const hasPermission = (userRole: UserRole, allowedRoles: UserRole[]) => {
  return allowedRoles.includes(userRole);
};
