import { Company, Portal, Subscription, SystemAnalytics, Notification, User } from '../types';

// Mock Companies Data
export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'LogiFlow Solutions',
    subdomain: 'logiflow',
    plan: 'enterprise',
    status: 'active',
    users: 45,
    portals: ['broker', 'carrier', 'shipper', 'financials'],
    revenue: 12500,
    createdAt: '2024-01-15',
    lastActivity: '2024-12-19T10:30:00Z',
    logo: '/logos/logiflow.png',
    industry: 'Logistics',
    location: 'Chicago, IL',
    growth: 15.2,
    health: 'excellent',
    aiScore: 94,
    automation: 87,
    subscription: {
      plan: 'enterprise',
      startDate: '2024-01-15',
      endDate: '2025-01-15',
      paymentMethod: 'Credit Card',
      amount: 12500
    }
  },
  {
    id: '2',
    name: 'FleetMax Transport',
    subdomain: 'fleetmax',
    plan: 'professional',
    status: 'active',
    users: 28,
    portals: ['carrier', 'fleet', 'maintenance'],
    revenue: 8500,
    createdAt: '2024-03-22',
    lastActivity: '2024-12-19T09:15:00Z',
    logo: '/logos/fleetmax.png',
    industry: 'Transportation',
    location: 'Dallas, TX',
    growth: 8.7,
    health: 'good',
    aiScore: 78,
    automation: 65,
    subscription: {
      plan: 'professional',
      startDate: '2024-03-22',
      endDate: '2025-03-22',
      paymentMethod: 'Bank Transfer',
      amount: 8500
    }
  },
  {
    id: '3',
    name: 'CargoConnect Inc',
    subdomain: 'cargoconnect',
    plan: 'basic',
    status: 'trial',
    users: 12,
    portals: ['broker', 'loadboard'],
    revenue: 2500,
    createdAt: '2024-11-10',
    lastActivity: '2024-12-18T16:45:00Z',
    logo: '/logos/cargoconnect.png',
    industry: 'Freight',
    location: 'Miami, FL',
    growth: 22.1,
    health: 'warning',
    aiScore: 62,
    automation: 45,
    subscription: {
      plan: 'basic',
      startDate: '2024-11-10',
      endDate: '2024-12-10',
      paymentMethod: 'Trial',
      amount: 0
    }
  },
  {
    id: '4',
    name: 'SmartLogistics Pro',
    subdomain: 'smartlogistics',
    plan: 'enterprise',
    status: 'active',
    users: 67,
    portals: ['broker', 'carrier', 'shipper', 'financials', 'crm', 'edi'],
    revenue: 18900,
    createdAt: '2023-08-05',
    lastActivity: '2024-12-19T11:20:00Z',
    logo: '/logos/smartlogistics.png',
    industry: 'Supply Chain',
    location: 'Los Angeles, CA',
    growth: 12.3,
    health: 'excellent',
    aiScore: 96,
    automation: 92,
    subscription: {
      plan: 'enterprise',
      startDate: '2023-08-05',
      endDate: '2025-08-05',
      paymentMethod: 'Credit Card',
      amount: 18900
    }
  }
];

// Mock Portals Data
export const mockPortals: Portal[] = [
  {
    id: 'broker',
    name: 'Broker Portal',
    description: 'Freight broker operations and load management',
    category: 'core',
    status: 'active',
    assignedCompanies: ['1', '2', '3', '4'],
    features: ['Load Management', 'Carrier Network', 'Rate Negotiation', 'Documentation'],
    pricing: { basic: 299, professional: 599, enterprise: 999 },
    usage: { totalUsers: 89, activeUsers: 76, monthlyRequests: 15420 }
  },
  {
    id: 'carrier',
    name: 'Carrier Portal',
    description: 'Fleet management and driver operations',
    category: 'core',
    status: 'active',
    assignedCompanies: ['1', '2', '4'],
    features: ['Fleet Tracking', 'Driver Management', 'Route Optimization', 'Maintenance'],
    pricing: { basic: 399, professional: 799, enterprise: 1299 },
    usage: { totalUsers: 67, activeUsers: 58, monthlyRequests: 12350 }
  },
  {
    id: 'shipper',
    name: 'Shipper Portal',
    description: 'Shipment creation and carrier search',
    category: 'core',
    status: 'active',
    assignedCompanies: ['1', '4'],
    features: ['Shipment Creation', 'Carrier Search', 'Tracking', 'Billing'],
    pricing: { basic: 199, professional: 399, enterprise: 699 },
    usage: { totalUsers: 34, activeUsers: 29, monthlyRequests: 8750 }
  },
  {
    id: 'financials',
    name: 'Financials Portal',
    description: 'Financial management and accounting',
    category: 'business',
    status: 'active',
    assignedCompanies: ['1', '4'],
    features: ['Invoicing', 'Payments', 'Reporting', 'Analytics'],
    pricing: { basic: 249, professional: 499, enterprise: 899 },
    usage: { totalUsers: 23, activeUsers: 21, monthlyRequests: 5420 }
  },
  {
    id: 'crm',
    name: 'CRM Portal',
    description: 'Customer relationship management',
    category: 'business',
    status: 'active',
    assignedCompanies: ['4'],
    features: ['Lead Management', 'Customer Database', 'Communication', 'Sales Pipeline'],
    pricing: { basic: 199, professional: 399, enterprise: 699 },
    usage: { totalUsers: 15, activeUsers: 13, monthlyRequests: 3210 }
  }
];

// Mock Subscriptions Data
export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub1',
    companyId: '1',
    plan: 'enterprise',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    paymentMethod: 'Credit Card',
    amount: 12500,
    portals: ['broker', 'carrier', 'shipper', 'financials'],
    features: ['Unlimited Users', 'API Access', 'Priority Support', 'Custom Integrations'],
    autoRenew: true
  },
  {
    id: 'sub2',
    companyId: '2',
    plan: 'professional',
    status: 'active',
    startDate: '2024-03-22',
    endDate: '2025-03-22',
    paymentMethod: 'Bank Transfer',
    amount: 8500,
    portals: ['carrier', 'fleet', 'maintenance'],
    features: ['Up to 50 Users', 'API Access', 'Email Support'],
    autoRenew: true
  },
  {
    id: 'sub3',
    companyId: '3',
    plan: 'basic',
    status: 'trial',
    startDate: '2024-11-10',
    endDate: '2024-12-10',
    paymentMethod: 'Trial',
    amount: 0,
    portals: ['broker', 'loadboard'],
    features: ['Up to 10 Users', 'Basic Support'],
    autoRenew: false
  }
];

// Mock System Analytics
export const mockSystemAnalytics: SystemAnalytics = {
  totalCompanies: 4,
  totalUsers: 152,
  totalRevenue: 42400,
  activePortals: 5,
  systemHealth: 'excellent',
  uptime: 99.9,
  responseTime: 145,
  errorRate: 0.02,
  monthlyGrowth: 18.5
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Company Registration',
    message: 'CargoConnect Inc has completed their trial setup',
    timestamp: '2024-12-19T10:30:00Z',
    read: false,
    action: { label: 'View Company', url: '/companies/3' }
  },
  {
    id: '2',
    type: 'warning',
    title: 'Subscription Expiring',
    message: 'FleetMax Transport subscription expires in 3 days',
    timestamp: '2024-12-19T09:15:00Z',
    read: false,
    action: { label: 'Renew Now', url: '/billing/subscriptions/2' }
  },
  {
    id: '3',
    type: 'success',
    title: 'System Update Complete',
    message: 'Portal v2.1.3 has been successfully deployed',
    timestamp: '2024-12-19T08:00:00Z',
    read: true
  },
  {
    id: '4',
    type: 'error',
    title: 'API Rate Limit Exceeded',
    message: 'SmartLogistics Pro has exceeded their API quota',
    timestamp: '2024-12-18T16:45:00Z',
    read: false,
    action: { label: 'Adjust Limits', url: '/settings/api-limits' }
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@logiflow.com',
    role: 'admin',
    company: 'LogiFlow Solutions',
    avatar: '/avatars/john.jpg',
    permissions: ['company:read', 'company:write', 'users:manage'],
    subdomain: 'logiflow',
    isActive: true,
    lastLogin: '2024-12-19T10:30:00Z',
    createdAt: '2024-01-15T08:00:00Z',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@fleetmax.com',
    role: 'admin',
    company: 'FleetMax Transport',
    avatar: '/avatars/sarah.jpg',
    permissions: ['company:read', 'users:manage'],
    subdomain: 'fleetmax',
    isActive: true,
    lastLogin: '2024-12-19T09:15:00Z',
    createdAt: '2024-03-22T10:00:00Z',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike@cargoconnect.com',
    role: 'user',
    company: 'CargoConnect Inc',
    avatar: '/avatars/mike.jpg',
    permissions: ['company:read'],
    subdomain: 'cargoconnect',
    isActive: true,
    lastLogin: '2024-12-18T16:45:00Z',
    createdAt: '2024-11-10T12:00:00Z',
    status: 'active'
  }
];