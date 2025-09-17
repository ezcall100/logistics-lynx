import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role:
    | 'admin'
    | 'shipper'
    | 'carrier'
    | 'broker'
    | 'driver'
    | 'owner-operator'
    | 'viewer'
    | 'superadmin'
    | 'warehousing'
    | 'freight-forwarding'
    | 'insurance'
    | 'fleet-services'
    | 'technology'
    | 'consulting'
    | 'customs-brokerage'
    | 'maintenance';
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
  firstName: string;
  lastName: string;
  phone?: string;
  jobTitle?: string;
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
    company: 'Trans Bot AI',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    permissions: ['*'],
    subdomain: 'admin',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    email: 'shipper@acmecorp.com',
    name: 'John Smith',
    role: 'shipper',
    company: 'ACME Corporation',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    permissions: ['shipper:read', 'shipper:write', 'loads:create', 'loads:view'],
    subdomain: 'acmecorp',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    email: 'carrier@fleetmax.com',
    name: 'Sarah Johnson',
    role: 'carrier',
    company: 'FleetMax Transport',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    permissions: ['carrier:read', 'carrier:write', 'fleet:manage', 'loads:accept'],
    subdomain: 'fleetmax',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-20T00:00:00Z',
  },
  {
    id: '4',
    email: 'broker@freightpro.com',
    name: 'Mike Wilson',
    role: 'broker',
    company: 'FreightPro Logistics',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    permissions: ['broker:read', 'broker:write', 'loads:manage', 'rates:manage'],
    subdomain: 'freightpro',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-02-01T00:00:00Z',
  },
  {
    id: '5',
    email: 'driver@fleetmax.com',
    name: 'Robert Davis',
    role: 'driver',
    company: 'FleetMax Transport',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    permissions: ['driver:read', 'loads:view', 'routes:view', 'documents:upload'],
    subdomain: 'fleetmax',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-02-10T00:00:00Z',
  },
  {
    id: '6',
    email: 'superadmin@logisticslynx.com',
    name: 'Super Administrator',
    role: 'superadmin',
    company: 'Trans Bot AI',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    permissions: ['*'],
    subdomain: 'superadmin',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
  },
  // DEMO / PLACEHOLDER Users - New Demo Users for Each Role
  {
    id: '7',
    email: 'demo.shipper@logisticslynx.com',
    name: 'DEMO Shipper User',
    role: 'shipper',
    company: 'DEMO Shipping Corp',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    permissions: ['shipper:read', 'shipper:write', 'loads:create', 'loads:view', 'carriers:view'],
    subdomain: 'demo-shipping',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '8',
    email: 'demo.broker@logisticslynx.com',
    name: 'DEMO Broker User',
    role: 'broker',
    company: 'DEMO Brokerage LLC',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    permissions: ['broker:read', 'broker:write', 'loads:manage', 'rates:manage', 'carriers:manage'],
    subdomain: 'demo-brokerage',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '9',
    email: 'demo.carrier@logisticslynx.com',
    name: 'DEMO Carrier User',
    role: 'carrier',
    company: 'DEMO Transport Inc',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'carrier:read',
      'carrier:write',
      'fleet:manage',
      'loads:accept',
      'drivers:manage',
    ],
    subdomain: 'demo-transport',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '10',
    email: 'demo.owneroperator@logisticslynx.com',
    name: 'DEMO Owner Operator',
    role: 'owner-operator',
    company: 'DEMO Independent Trucking',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    permissions: ['owner:read', 'owner:write', 'loads:manage', 'expenses:manage'],
    subdomain: 'demo-independent',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  // DEMO / PLACEHOLDER Service Provider Companies
  {
    id: '11',
    email: 'demo.warehousing@logisticslynx.com',
    name: 'DEMO Warehousing Manager',
    role: 'warehousing',
    company: 'DEMO Storage Solutions Inc',
    avatar:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'warehousing:read',
      'warehousing:write',
      'storage:manage',
      'fulfillment:manage',
      'distribution:manage',
    ],
    subdomain: 'demo-storage',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '12',
    email: 'demo.freightforwarding@logisticslynx.com',
    name: 'DEMO Freight Forwarder',
    role: 'freight-forwarding',
    company: 'DEMO Global Freight Solutions',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'freight:read',
      'freight:write',
      'international:manage',
      'customs:manage',
      'shipping:manage',
    ],
    subdomain: 'demo-global-freight',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '13',
    email: 'demo.insurance@logisticslynx.com',
    name: 'DEMO Insurance Agent',
    role: 'insurance',
    company: 'DEMO Transport Insurance Group',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'insurance:read',
      'insurance:write',
      'cargo:manage',
      'liability:manage',
      'claims:manage',
    ],
    subdomain: 'demo-transport-insurance',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '14',
    email: 'demo.fleetservices@logisticslynx.com',
    name: 'DEMO Fleet Services Manager',
    role: 'fleet-services',
    company: 'DEMO Fleet Solutions LLC',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'fleet:read',
      'fleet:write',
      'fuel:manage',
      'maintenance:manage',
      'repair:manage',
    ],
    subdomain: 'demo-fleet-solutions',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '15',
    email: 'demo.technology@logisticslynx.com',
    name: 'DEMO Technology Director',
    role: 'technology',
    company: 'DEMO Logistics Tech Corp',
    avatar:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'technology:read',
      'technology:write',
      'software:manage',
      'apps:manage',
      'digital:manage',
    ],
    subdomain: 'demo-logistics-tech',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '16',
    email: 'demo.consulting@logisticslynx.com',
    name: 'DEMO Logistics Consultant',
    role: 'consulting',
    company: 'DEMO Strategic Logistics Consulting',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'consulting:read',
      'consulting:write',
      'optimization:manage',
      'strategy:manage',
      'analysis:manage',
    ],
    subdomain: 'demo-strategic-logistics',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '17',
    email: 'demo.customs@logisticslynx.com',
    name: 'DEMO Customs Broker',
    role: 'customs-brokerage',
    company: 'DEMO Customs Clearance Services',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'customs:read',
      'customs:write',
      'clearance:manage',
      'import:manage',
      'export:manage',
    ],
    subdomain: 'demo-customs-clearance',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: '18',
    email: 'demo.maintenance@logisticslynx.com',
    name: 'DEMO Maintenance Manager',
    role: 'maintenance',
    company: 'DEMO Truck Service Center',
    avatar:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    permissions: [
      'maintenance:read',
      'maintenance:write',
      'repair:manage',
      'service:manage',
      'parts:manage',
    ],
    subdomain: 'demo-truck-service',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
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

    if (foundUser && password === 'password123') {
      // Simple password for demo
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
      name: `${userData.firstName} ${userData.lastName}`,
      role: userData.role,
      company: userData.company,
      permissions: getDefaultPermissions(userData.role),
      subdomain: userData.subdomain || userData.company.toLowerCase().replace(/\s+/g, ''),
      isActive: true,
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
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
      admin: ['*'],
      shipper: ['shipper:read', 'shipper:write', 'loads:create', 'loads:view', 'carriers:view'],
      carrier: ['carrier:read', 'carrier:write', 'fleet:manage', 'loads:accept', 'drivers:manage'],
      broker: ['broker:read', 'broker:write', 'loads:manage', 'rates:manage', 'carriers:manage'],
      driver: ['driver:read', 'loads:view', 'routes:view', 'documents:upload'],
      'owner-operator': ['owner:read', 'owner:write', 'loads:manage', 'expenses:manage'],
      viewer: ['view:read'],
      superadmin: ['*'],
      // Service Provider Roles
      warehousing: [
        'warehousing:read',
        'warehousing:write',
        'storage:manage',
        'fulfillment:manage',
        'distribution:manage',
      ],
      'freight-forwarding': [
        'freight:read',
        'freight:write',
        'international:manage',
        'customs:manage',
        'shipping:manage',
      ],
      insurance: [
        'insurance:read',
        'insurance:write',
        'cargo:manage',
        'liability:manage',
        'claims:manage',
      ],
      'fleet-services': [
        'fleet:read',
        'fleet:write',
        'fuel:manage',
        'maintenance:manage',
        'repair:manage',
      ],
      technology: [
        'technology:read',
        'technology:write',
        'software:manage',
        'apps:manage',
        'digital:manage',
      ],
      consulting: [
        'consulting:read',
        'consulting:write',
        'optimization:manage',
        'strategy:manage',
        'analysis:manage',
      ],
      'customs-brokerage': [
        'customs:read',
        'customs:write',
        'clearance:manage',
        'import:manage',
        'export:manage',
      ],
      maintenance: [
        'maintenance:read',
        'maintenance:write',
        'repair:manage',
        'service:manage',
        'parts:manage',
      ],
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
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
