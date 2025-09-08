import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'shipper' | 'carrier' | 'broker' | 'driver' | 'owner-operator' | 'viewer' | 'superadmin';
  company: string;
  avatar?: string;
  permissions: string[];
  subdomain?: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<boolean>;
  isLoading: boolean;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => void;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  company: string;
  role: User['role'];
  subdomain?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@logisticslynx.com',
    name: 'System Administrator',
    role: 'admin',
    company: 'Logistics Lynx',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    permissions: ['*'],
    subdomain: 'admin',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'shipper@acmecorp.com',
    name: 'John Smith',
    role: 'shipper',
    company: 'ACME Corporation',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    permissions: ['shipper:read', 'shipper:write', 'loads:create', 'loads:view'],
    subdomain: 'acmecorp',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    email: 'carrier@fleetmax.com',
    name: 'Sarah Johnson',
    role: 'carrier',
    company: 'FleetMax Transport',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    permissions: ['carrier:read', 'carrier:write', 'fleet:manage', 'loads:accept'],
    subdomain: 'fleetmax',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '4',
    email: 'broker@freightpro.com',
    name: 'Mike Wilson',
    role: 'broker',
    company: 'FreightPro Logistics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    permissions: ['broker:read', 'broker:write', 'loads:manage', 'rates:manage'],
    subdomain: 'freightpro',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: '5',
    email: 'driver@fleetmax.com',
    name: 'Robert Davis',
    role: 'driver',
    company: 'FleetMax Transport',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    permissions: ['driver:read', 'loads:view', 'routes:view', 'documents:upload'],
    subdomain: 'fleetmax',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-02-10T00:00:00Z'
  },
  {
    id: '6',
    email: 'superadmin@logisticslynx.com',
    name: 'Super Administrator',
    role: 'superadmin',
    company: 'Logistics Lynx',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    permissions: ['*'],
    subdomain: 'superadmin',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z'
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') { // Simple password for demo
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      company: userData.company,
      permissions: getDefaultPermissions(userData.role),
      subdomain: userData.subdomain || userData.company.toLowerCase().replace(/\s+/g, ''),
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const getDefaultPermissions = (role: User['role']): string[] => {
    const rolePermissions: Record<User['role'], string[]> = {
      'admin': ['*'],
      'shipper': ['shipper:read', 'shipper:write', 'loads:create', 'loads:view', 'carriers:view'],
      'carrier': ['carrier:read', 'carrier:write', 'fleet:manage', 'loads:accept', 'drivers:manage'],
      'broker': ['broker:read', 'broker:write', 'loads:manage', 'rates:manage', 'carriers:manage'],
      'driver': ['driver:read', 'loads:view', 'routes:view', 'documents:upload'],
      'owner-operator': ['owner:read', 'owner:write', 'loads:manage', 'expenses:manage'],
      'viewer': ['view:read'],
      'superadmin': ['*']
    };
    
    return rolePermissions[role] || [];
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    isLoading,
    isAuthenticated: !!user,
    updateUser,
    hasPermission,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};