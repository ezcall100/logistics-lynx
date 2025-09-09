// Core Types for Trans Bot AI Super Admin Portal

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'user';
  company?: string;
  avatar?: string;
  permissions?: string[];
  subdomain?: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

export interface Company {
  id: string;
  name: string;
  subdomain: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'suspended' | 'trial';
  users: number;
  portals: string[];
  revenue: number;
  createdAt: string;
  lastActivity: string;
  logo?: string;
  industry?: string;
  location?: string;
  growth?: number;
  health?: 'excellent' | 'good' | 'warning' | 'critical';
  aiScore?: number;
  automation?: number;
  subscription?: {
    plan: string;
    startDate: string;
    endDate: string;
    paymentMethod: string;
    amount: number;
  };
}

export interface Portal {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'business' | 'admin' | 'specialized';
  status: 'active' | 'inactive' | 'maintenance';
  assignedCompanies: string[];
  features: string[];
  pricing: {
    basic: number;
    professional: number;
    enterprise: number;
  };
  usage: {
    totalUsers: number;
    activeUsers: number;
    monthlyRequests: number;
  };
}

export interface Subscription {
  id: string;
  companyId: string;
  plan: 'basic' | 'professional' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'trial';
  startDate: string;
  endDate: string;
  paymentMethod: string;
  amount: number;
  portals: string[];
  features: string[];
  autoRenew: boolean;
}

export interface SystemAnalytics {
  totalCompanies: number;
  totalUsers: number;
  totalRevenue: number;
  activePortals: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  uptime: number;
  responseTime: number;
  errorRate: number;
  monthlyGrowth: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    url: string;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  children?: MenuItem[];
  badge?: string;
  disabled?: boolean;
}

export interface FABAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  color?: string;
}
