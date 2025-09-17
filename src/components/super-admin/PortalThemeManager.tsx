import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Palette,
  Monitor,
  Smartphone,
  Globe,
  Save,
  Eye,
  RefreshCw,
  CheckCircle,
  Settings,
} from 'lucide-react';

interface PortalTheme {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'business' | 'operations' | 'admin';
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    borderColor: string;
  };
  layout: {
    headerStyle: 'minimal' | 'detailed' | 'dashboard';
    sidebarStyle: 'collapsible' | 'fixed' | 'floating';
    navigationStyle: 'tabs' | 'breadcrumbs' | 'menu';
    footerStyle: 'minimal' | 'detailed' | 'none';
  };
  components: {
    buttonStyle: 'rounded' | 'square' | 'pill';
    cardStyle: 'elevated' | 'flat' | 'outlined';
    inputStyle: 'filled' | 'outlined' | 'underlined';
    tableStyle: 'striped' | 'bordered' | 'minimal';
  };
  branding: {
    logo: string;
    favicon: string;
    companyName: string;
    tagline: string;
    customCSS?: string;
  };
  domainConfig: {
    subdomain: string;
    customDomains: string[];
    sslEnabled: boolean;
    cdnEnabled: boolean;
  };
  accessControl: {
    roles: string[];
    permissions: string[];
    features: string[];
  };
  status: 'active' | 'draft' | 'archived';
  lastModified: string;
  version: string;
}

interface PortalThemeManagerProps {
  onThemeUpdate?: (theme: PortalTheme) => void;
  onDomainUpdate?: (domainConfig: unknown) => void;
}

export function PortalThemeManager({ onThemeUpdate, onDomainUpdate }: PortalThemeManagerProps) {
  const [selectedPortal, setSelectedPortal] = useState<string>('customer');
  const [activeTab, setActiveTab] = useState<'design' | 'domain' | 'access' | 'preview'>('design');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Portal themes data
  const [portalThemes, setPortalThemes] = useState<PortalTheme[]>([
    {
      id: 'customer',
      name: 'Customer Portal',
      description: 'Customer self-service platform for account management',
      category: 'core',
      theme: {
        primaryColor: '#8B5CF6',
        secondaryColor: '#7C3AED',
        accentColor: '#A78BFA',
        backgroundColor: '#FAF5FF',
        textColor: '#4C1D95',
        borderColor: '#DDD6FE',
      },
      layout: {
        headerStyle: 'minimal',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'outlined',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/customer-logo.svg',
        favicon: '/favicons/customer-favicon.ico',
        companyName: 'CustomerHub',
        tagline: 'Self-Service Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'customer.transbot.ai',
        customDomains: ['portal.customer.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['customer-user', 'customer-admin'],
        permissions: ['account_management', 'service_requests', 'billing_history'],
        features: ['account_dashboard', 'service_tickets', 'payment_history'],
      },
      status: 'active',
      lastModified: '2024-01-15T11:00:00Z',
      version: '2.1.0',
    },
    {
      id: 'broker',
      name: 'Broker Portal',
      description: 'Advanced load brokerage and relationship management platform',
      category: 'core',
      theme: {
        primaryColor: '#2563EB',
        secondaryColor: '#1E40AF',
        accentColor: '#3B82F6',
        backgroundColor: '#F8FAFC',
        textColor: '#1E293B',
        borderColor: '#E2E8F0',
      },
      layout: {
        headerStyle: 'detailed',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'outlined',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/broker-logo.svg',
        favicon: '/favicons/broker-favicon.ico',
        companyName: 'BrokerPro',
        tagline: 'Advanced Load Management',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'broker.transbot.ai',
        customDomains: ['broker.acmelogistics.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['broker-manager', 'broker-user', 'broker-admin'],
        permissions: ['load_management', 'carrier_matching', 'rate_optimization'],
        features: ['load_board', 'carrier_network', 'rate_management'],
      },
      status: 'active',
      lastModified: '2024-01-15T10:30:00Z',
      version: '2.1.0',
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      description: 'Comprehensive fleet management and load optimization system',
      category: 'core',
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#047857',
        accentColor: '#10B981',
        backgroundColor: '#F0FDF4',
        textColor: '#064E3B',
        borderColor: '#BBF7D0',
      },
      layout: {
        headerStyle: 'dashboard',
        sidebarStyle: 'fixed',
        navigationStyle: 'menu',
        footerStyle: 'minimal',
      },
      components: {
        buttonStyle: 'square',
        cardStyle: 'flat',
        inputStyle: 'filled',
        tableStyle: 'bordered',
      },
      branding: {
        logo: '/logos/carrier-logo.svg',
        favicon: '/favicons/carrier-favicon.ico',
        companyName: 'FleetMaster',
        tagline: 'Complete Fleet Management',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'carrier.transbot.ai',
        customDomains: ['fleet.fleetmasters.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['carrier-manager', 'carrier-user', 'carrier-admin'],
        permissions: ['fleet_management', 'driver_dispatch', 'route_planning'],
        features: ['fleet_tracking', 'driver_management', 'route_optimization'],
      },
      status: 'active',
      lastModified: '2024-01-15T09:15:00Z',
      version: '2.1.0',
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      description: 'Complete shipping management platform for businesses of all sizes',
      category: 'core',
      theme: {
        primaryColor: '#7C3AED',
        secondaryColor: '#6D28D9',
        accentColor: '#8B5CF6',
        backgroundColor: '#FAF5FF',
        textColor: '#4C1D95',
        borderColor: '#DDD6FE',
      },
      layout: {
        headerStyle: 'minimal',
        sidebarStyle: 'floating',
        navigationStyle: 'breadcrumbs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'pill',
        cardStyle: 'outlined',
        inputStyle: 'underlined',
        tableStyle: 'minimal',
      },
      branding: {
        logo: '/logos/shipper-logo.svg',
        favicon: '/favicons/shipper-favicon.ico',
        companyName: 'ShipSmart',
        tagline: 'Intelligent Shipping Solutions',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'shipper.transbot.ai',
        customDomains: ['ship.smartlogistics.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['shipper-manager', 'shipper-user', 'shipper-admin'],
        permissions: ['shipment_booking', 'carrier_search', 'tracking'],
        features: ['load_planning', 'carrier_selection', 'real_time_tracking'],
      },
      status: 'active',
      lastModified: '2024-01-15T08:45:00Z',
      version: '2.1.0',
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      description: 'Mobile-first driver experience with comprehensive tools',
      category: 'core',
      theme: {
        primaryColor: '#EA580C',
        secondaryColor: '#C2410C',
        accentColor: '#FB923C',
        backgroundColor: '#FFF7ED',
        textColor: '#9A3412',
        borderColor: '#FED7AA',
      },
      layout: {
        headerStyle: 'minimal',
        sidebarStyle: 'floating',
        navigationStyle: 'tabs',
        footerStyle: 'none',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'filled',
        tableStyle: 'minimal',
      },
      branding: {
        logo: '/logos/driver-logo.svg',
        favicon: '/favicons/driver-favicon.ico',
        companyName: 'DrivePro',
        tagline: 'Mobile Driver Experience',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'driver.transbot.ai',
        customDomains: ['mobile.driverapp.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['driver', 'driver-supervisor'],
        permissions: ['load_viewing', 'route_navigation', 'document_upload'],
        features: ['load_details', 'route_maps', 'documentation'],
      },
      status: 'active',
      lastModified: '2024-01-15T07:30:00Z',
      version: '2.1.0',
    },
    {
      id: 'autonomous',
      name: 'Autonomous Portal',
      description: 'AI-powered autonomous operations and decision making',
      category: 'core',
      theme: {
        primaryColor: '#10B981',
        secondaryColor: '#059669',
        accentColor: '#34D399',
        backgroundColor: '#ECFDF5',
        textColor: '#064E3B',
        borderColor: '#A7F3D0',
      },
      layout: {
        headerStyle: 'dashboard',
        sidebarStyle: 'fixed',
        navigationStyle: 'menu',
        footerStyle: 'minimal',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'filled',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/autonomous-logo.svg',
        favicon: '/favicons/autonomous-favicon.ico',
        companyName: 'AutoDrive',
        tagline: 'AI-Powered Operations',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'autonomous.transbot.ai',
        customDomains: ['ai.autodrive.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['ai-engineer', 'autonomous-manager', 'ai-admin'],
        permissions: ['ai_management', 'autonomous_operations', 'ml_training'],
        features: ['ai_agents', 'automated_decisions', 'machine_learning'],
      },
      status: 'active',
      lastModified: '2024-01-15T06:45:00Z',
      version: '2.1.0',
    },
    {
      id: 'yard',
      name: 'Yard Management Portal',
      description: 'Yard management system for efficient terminal operations',
      category: 'core',
      theme: {
        primaryColor: '#F59E0B',
        secondaryColor: '#D97706',
        accentColor: '#FBBF24',
        backgroundColor: '#FFFBEB',
        textColor: '#92400E',
        borderColor: '#FDE68A',
      },
      layout: {
        headerStyle: 'detailed',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'square',
        cardStyle: 'flat',
        inputStyle: 'outlined',
        tableStyle: 'bordered',
      },
      branding: {
        logo: '/logos/yard-logo.svg',
        favicon: '/favicons/yard-favicon.ico',
        companyName: 'YardMaster',
        tagline: 'Terminal Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'yard.transbot.ai',
        customDomains: ['yard.terminal.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['yard-manager', 'yard-operator', 'yard-admin'],
        permissions: ['yard_planning', 'gate_management', 'trailer_tracking'],
        features: ['yard_planning', 'gate_management', 'trailer_tracking'],
      },
      status: 'active',
      lastModified: '2024-01-15T05:30:00Z',
      version: '2.1.0',
    },
    {
      id: 'financial',
      name: 'Financial Portal',
      description: 'Comprehensive financial management and accounting suite',
      category: 'business',
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#047857',
        accentColor: '#10B981',
        backgroundColor: '#F0FDF4',
        textColor: '#064E3B',
        borderColor: '#BBF7D0',
      },
      layout: {
        headerStyle: 'dashboard',
        sidebarStyle: 'fixed',
        navigationStyle: 'menu',
        footerStyle: 'minimal',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'outlined',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/financial-logo.svg',
        favicon: '/favicons/financial-favicon.ico',
        companyName: 'FinancePro',
        tagline: 'Financial Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'financial.transbot.ai',
        customDomains: ['finance.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['finance-manager', 'accountant', 'finance-admin'],
        permissions: ['invoice_management', 'payment_processing', 'financial_reporting'],
        features: ['invoice_management', 'payment_processing', 'financial_reporting'],
      },
      status: 'active',
      lastModified: '2024-01-15T04:15:00Z',
      version: '2.1.0',
    },
    {
      id: 'partner',
      name: 'Partner Portal',
      description: 'Strategic partner collaboration and management system',
      category: 'business',
      theme: {
        primaryColor: '#7C3AED',
        secondaryColor: '#6D28D9',
        accentColor: '#8B5CF6',
        backgroundColor: '#FAF5FF',
        textColor: '#4C1D95',
        borderColor: '#DDD6FE',
      },
      layout: {
        headerStyle: 'minimal',
        sidebarStyle: 'floating',
        navigationStyle: 'breadcrumbs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'pill',
        cardStyle: 'outlined',
        inputStyle: 'underlined',
        tableStyle: 'minimal',
      },
      branding: {
        logo: '/logos/partner-logo.svg',
        favicon: '/favicons/partner-favicon.ico',
        companyName: 'PartnerHub',
        tagline: 'Collaboration Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'partner.transbot.ai',
        customDomains: ['partners.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['partner-manager', 'partner-user', 'partner-admin'],
        permissions: ['partner_directory', 'collaboration_tools', 'performance_tracking'],
        features: ['partner_directory', 'collaboration_tools', 'performance_tracking'],
      },
      status: 'active',
      lastModified: '2024-01-15T03:00:00Z',
      version: '2.1.0',
    },
    {
      id: 'developer',
      name: 'Developer Portal',
      description: 'Comprehensive API access and integration development tools',
      category: 'business',
      theme: {
        primaryColor: '#1F2937',
        secondaryColor: '#111827',
        accentColor: '#374151',
        backgroundColor: '#F9FAFB',
        textColor: '#111827',
        borderColor: '#E5E7EB',
      },
      layout: {
        headerStyle: 'minimal',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'square',
        cardStyle: 'flat',
        inputStyle: 'outlined',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/developer-logo.svg',
        favicon: '/favicons/developer-favicon.ico',
        companyName: 'DevHub',
        tagline: 'API Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'developer.transbot.ai',
        customDomains: ['api.developer.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['developer', 'api-user', 'developer-admin'],
        permissions: ['api_documentation', 'sdk_access', 'sandbox_environment'],
        features: ['api_documentation', 'sdk_access', 'sandbox_environment'],
      },
      status: 'active',
      lastModified: '2024-01-15T02:30:00Z',
      version: '2.1.0',
    },
    {
      id: 'warehouse',
      name: 'Warehouse Portal',
      description: 'Comprehensive warehouse management and inventory control',
      category: 'business',
      theme: {
        primaryColor: '#DC2626',
        secondaryColor: '#B91C1C',
        accentColor: '#EF4444',
        backgroundColor: '#FEF2F2',
        textColor: '#991B1B',
        borderColor: '#FECACA',
      },
      layout: {
        headerStyle: 'dashboard',
        sidebarStyle: 'fixed',
        navigationStyle: 'menu',
        footerStyle: 'minimal',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'filled',
        tableStyle: 'bordered',
      },
      branding: {
        logo: '/logos/warehouse-logo.svg',
        favicon: '/favicons/warehouse-favicon.ico',
        companyName: 'WarehousePro',
        tagline: 'Inventory Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'warehouse.transbot.ai',
        customDomains: ['warehouse.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['warehouse-manager', 'warehouse-operator', 'warehouse-admin'],
        permissions: ['inventory_management', 'order_processing', 'shipping_coordination'],
        features: ['inventory_management', 'order_processing', 'shipping_coordination'],
      },
      status: 'active',
      lastModified: '2024-01-15T01:45:00Z',
      version: '2.1.0',
    },
    {
      id: 'fleet',
      name: 'Fleet Portal',
      description: 'Complete fleet management and vehicle tracking system',
      category: 'business',
      theme: {
        primaryColor: '#0891B2',
        secondaryColor: '#0E7490',
        accentColor: '#06B6D4',
        backgroundColor: '#F0F9FF',
        textColor: '#164E63',
        borderColor: '#BAE6FD',
      },
      layout: {
        headerStyle: 'detailed',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'outlined',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/fleet-logo.svg',
        favicon: '/favicons/fleet-favicon.ico',
        companyName: 'FleetMaster',
        tagline: 'Fleet Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'fleet.transbot.ai',
        customDomains: ['fleet.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['fleet-manager', 'fleet-operator', 'fleet-admin'],
        permissions: ['vehicle_tracking', 'driver_management', 'route_optimization'],
        features: ['vehicle_tracking', 'driver_management', 'route_optimization'],
      },
      status: 'active',
      lastModified: '2024-01-15T01:00:00Z',
      version: '2.1.0',
    },
    {
      id: 'dispatch',
      name: 'Dispatch Portal',
      description: 'Real-time load dispatch and driver coordination system',
      category: 'business',
      theme: {
        primaryColor: '#EA580C',
        secondaryColor: '#C2410C',
        accentColor: '#FB923C',
        backgroundColor: '#FFF7ED',
        textColor: '#9A3412',
        borderColor: '#FED7AA',
      },
      layout: {
        headerStyle: 'dashboard',
        sidebarStyle: 'fixed',
        navigationStyle: 'menu',
        footerStyle: 'minimal',
      },
      components: {
        buttonStyle: 'square',
        cardStyle: 'flat',
        inputStyle: 'filled',
        tableStyle: 'bordered',
      },
      branding: {
        logo: '/logos/dispatch-logo.svg',
        favicon: '/favicons/dispatch-favicon.ico',
        companyName: 'DispatchPro',
        tagline: 'Real-time Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'dispatch.transbot.ai',
        customDomains: ['dispatch.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['dispatcher', 'dispatch-manager', 'dispatch-admin'],
        permissions: ['load_assignment', 'driver_coordination', 'real_time_tracking'],
        features: ['load_assignment', 'driver_coordination', 'real_time_tracking'],
      },
      status: 'active',
      lastModified: '2024-01-15T00:30:00Z',
      version: '2.1.0',
    },
    {
      id: 'maintenance',
      name: 'Maintenance Portal',
      description: 'Comprehensive vehicle maintenance and service management',
      category: 'business',
      theme: {
        primaryColor: '#7C2D12',
        secondaryColor: '#A16207',
        accentColor: '#D97706',
        backgroundColor: '#FFFBEB',
        textColor: '#92400E',
        borderColor: '#FDE68A',
      },
      layout: {
        headerStyle: 'detailed',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'outlined',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/maintenance-logo.svg',
        favicon: '/favicons/maintenance-favicon.ico',
        companyName: 'MaintenancePro',
        tagline: 'Service Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'maintenance.transbot.ai',
        customDomains: ['maintenance.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['maintenance-manager', 'technician', 'maintenance-admin'],
        permissions: ['service_scheduling', 'parts_management', 'technician_coordination'],
        features: ['service_scheduling', 'parts_management', 'technician_coordination'],
      },
      status: 'active',
      lastModified: '2024-01-14T23:45:00Z',
      version: '2.1.0',
    },
    {
      id: 'fuel',
      name: 'Fuel Portal',
      description: 'Fuel management and efficiency optimization system',
      category: 'business',
      theme: {
        primaryColor: '#B45309',
        secondaryColor: '#A16207',
        accentColor: '#D97706',
        backgroundColor: '#FFFBEB',
        textColor: '#92400E',
        borderColor: '#FDE68A',
      },
      layout: {
        headerStyle: 'minimal',
        sidebarStyle: 'floating',
        navigationStyle: 'breadcrumbs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'pill',
        cardStyle: 'outlined',
        inputStyle: 'underlined',
        tableStyle: 'minimal',
      },
      branding: {
        logo: '/logos/fuel-logo.svg',
        favicon: '/favicons/fuel-favicon.ico',
        companyName: 'FuelMaster',
        tagline: 'Efficiency Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'fuel.transbot.ai',
        customDomains: ['fuel.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['fuel-manager', 'fuel-analyst', 'fuel-admin'],
        permissions: ['fuel_tracking', 'efficiency_analytics', 'cost_management'],
        features: ['fuel_tracking', 'efficiency_analytics', 'cost_management'],
      },
      status: 'active',
      lastModified: '2024-01-14T23:00:00Z',
      version: '2.1.0',
    },
    {
      id: 'insurance',
      name: 'Insurance Portal',
      description: 'Comprehensive insurance management and claims processing',
      category: 'business',
      theme: {
        primaryColor: '#1E40AF',
        secondaryColor: '#1E3A8A',
        accentColor: '#3B82F6',
        backgroundColor: '#EFF6FF',
        textColor: '#1E3A8A',
        borderColor: '#BFDBFE',
      },
      layout: {
        headerStyle: 'dashboard',
        sidebarStyle: 'fixed',
        navigationStyle: 'menu',
        footerStyle: 'minimal',
      },
      components: {
        buttonStyle: 'rounded',
        cardStyle: 'elevated',
        inputStyle: 'filled',
        tableStyle: 'striped',
      },
      branding: {
        logo: '/logos/insurance-logo.svg',
        favicon: '/favicons/insurance-favicon.ico',
        companyName: 'InsurancePro',
        tagline: 'Protection Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'insurance.transbot.ai',
        customDomains: ['insurance.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['insurance-manager', 'claims-processor', 'insurance-admin'],
        permissions: ['policy_management', 'claims_processing', 'coverage_tracking'],
        features: ['policy_management', 'claims_processing', 'coverage_tracking'],
      },
      status: 'active',
      lastModified: '2024-01-14T22:15:00Z',
      version: '2.1.0',
    },
    {
      id: 'compliance',
      name: 'Compliance Portal',
      description: 'Regulatory compliance monitoring and management system',
      category: 'business',
      theme: {
        primaryColor: '#059669',
        secondaryColor: '#047857',
        accentColor: '#10B981',
        backgroundColor: '#F0FDF4',
        textColor: '#064E3B',
        borderColor: '#BBF7D0',
      },
      layout: {
        headerStyle: 'detailed',
        sidebarStyle: 'collapsible',
        navigationStyle: 'tabs',
        footerStyle: 'detailed',
      },
      components: {
        buttonStyle: 'square',
        cardStyle: 'flat',
        inputStyle: 'outlined',
        tableStyle: 'bordered',
      },
      branding: {
        logo: '/logos/compliance-logo.svg',
        favicon: '/favicons/compliance-favicon.ico',
        companyName: 'CompliancePro',
        tagline: 'Regulatory Excellence',
        customCSS: '',
      },
      domainConfig: {
        subdomain: 'compliance.transbot.ai',
        customDomains: ['compliance.company.com'],
        sslEnabled: true,
        cdnEnabled: true,
      },
      accessControl: {
        roles: ['compliance-manager', 'compliance-officer', 'compliance-admin'],
        permissions: ['regulatory_tracking', 'audit_management', 'violation_monitoring'],
        features: ['regulatory_tracking', 'audit_management', 'violation_monitoring'],
      },
      status: 'active',
      lastModified: '2024-01-14T21:30:00Z',
      version: '2.1.0',
    },
  ]);

  const [currentTheme, setCurrentTheme] = useState<PortalTheme>(
    portalThemes.find(p => p.id === selectedPortal) || portalThemes[0]
  );

  const [themeChanges, setThemeChanges] = useState<Partial<PortalTheme>>({});

  // Update current theme when selected portal changes
  useEffect(() => {
    const theme = portalThemes.find(p => p.id === selectedPortal);
    if (theme) {
      setCurrentTheme(theme);
      setThemeChanges({});
    }
  }, [selectedPortal, portalThemes]);

  const handleThemeChange = (path: string, value: unknown) => {
    setThemeChanges(prev => ({
      ...prev,
      [path]: value,
    }));
  };

  const handleSaveTheme = async () => {
    setIsSaving(true);
    try {
      const updatedTheme = { ...currentTheme, ...themeChanges };
      setPortalThemes(prev => prev.map(p => (p.id === selectedPortal ? updatedTheme : p)));
      setCurrentTheme(updatedTheme);
      setThemeChanges({});

      if (onThemeUpdate) {
        onThemeUpdate(updatedTheme);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to save theme:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDomainUpdate = async (domainConfig: unknown) => {
    try {
      const updatedTheme = {
        ...currentTheme,
        domainConfig: {
          ...currentTheme.domainConfig,
          ...(domainConfig as Record<string, unknown>),
        },
      };
      setPortalThemes(prev => prev.map(p => (p.id === selectedPortal ? updatedTheme : p)));
      setCurrentTheme(updatedTheme);

      if (onDomainUpdate) {
        onDomainUpdate(domainConfig);
      }
    } catch (error) {
      console.error('Failed to update domain:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="max-w-7xl mx-auto responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Portal Theme Manager</h1>
              <p className="text-gray-300 text-lg responsive-container sm:flex-col md:flex-row lg:grid">
                Design unique UI experiences for each portal with custom branding and domain
                management
              </p>
            </div>
            <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <button
                onClick={() = aria-label="Button"> setIsPreviewMode(!isPreviewMode)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  isPreviewMode
                    ? 'bg-green-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                <span>Preview Mode</span>
              </button>
              <button
                onClick={handleSaveTheme}
                disabled={isSaving || Object.keys(themeChanges).length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
               aria-label="Button">
                {isSaving ? (
                  <RefreshCw className="w-4 h-4 animate-spin responsive-container sm:flex-col md:flex-row lg:grid" />
                ) : (
                  <Save className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                )}
                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Portal Selector */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-white font-semibold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Select Portal</h3>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {portalThemes.map(portal => (
                  <button
                    key={portal.id}
                    onClick={() = aria-label="Button"> setSelectedPortal(portal.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedPortal === portal.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    <div className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{portal.name}</div>
                    <div className="text-sm opacity-75 responsive-container sm:flex-col md:flex-row lg:grid">{portal.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden responsive-container sm:flex-col md:flex-row lg:grid">
              {/* Tab Navigation */}
              <div className="border-b border-white/20 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex responsive-container sm:flex-col md:flex-row lg:grid">
                  {[
                    { id: 'design', label: 'Design', icon: Palette },
                    { id: 'domain', label: 'Domain', icon: Globe },
                    { id: 'access', label: 'Access', icon: Settings },
                    { id: 'preview', label: 'Preview', icon: Monitor },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() = aria-label="Button">
                        setActiveTab(tab.id as 'domain' | 'design' | 'access' | 'preview')
                      }
                      className={`flex items-center space-x-2 px-6 py-4 transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <AnimatePresence mode="wait">
                  {activeTab === 'design' && (
                    <motion.div
                      key="design"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <DesignTab
                        theme={currentTheme as unknown as Record<string, unknown>}
                        changes={themeChanges}
                        onThemeChange={handleThemeChange}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'domain' && (
                    <motion.div
                      key="domain"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <DomainTab
                        domainConfig={currentTheme.domainConfig}
                        onDomainUpdate={handleDomainUpdate}
                      />
                    </motion.div>
                  )}

                  {activeTab === 'access' && (
                    <motion.div
                      key="access"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <AccessTab accessControl={currentTheme.accessControl} />
                    </motion.div>
                  )}

                  {activeTab === 'preview' && (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <PreviewTab theme={{ ...currentTheme, ...themeChanges }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Design Tab Component
function DesignTab({
  theme,
  changes,
  onThemeChange,
}: {
  theme: Record<string, unknown>;
  changes: Record<string, unknown>;
  onThemeChange: (path: string, value: string) => void;
}) {
  const currentTheme = { ...theme, ...changes };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-8 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Color Palette */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {[
            { key: 'primaryColor', label: 'Primary', description: 'Main brand color' },
            { key: 'secondaryColor', label: 'Secondary', description: 'Supporting color' },
            { key: 'accentColor', label: 'Accent', description: 'Highlight color' },
            { key: 'backgroundColor', label: 'Background', description: 'Page background' },
            { key: 'textColor', label: 'Text', description: 'Primary text color' },
            { key: 'borderColor', label: 'Border', description: 'Border color' },
          ].map(color => (
            <div key={color.key} className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <label className="text-sm font-medium text-gray-300 responsive-container sm:flex-col md:flex-row lg:grid">{color.label}</label>
              <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                <input
                  type="color"
                  value={(currentTheme.theme as Record<string, string>)[color.key]}
                  onChange={e => onThemeChange(`theme.${color.key}`, e.target.value)}
                  className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer responsive-container sm:flex-col md:flex-row lg:grid"
                />
                <input
                  type="text"
                  value={(currentTheme.theme as Record<string, string>)[color.key]}
                  onChange={e => onThemeChange(`theme.${color.key}`, e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                  placeholder={color.description}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Settings */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Layout Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Header Style</label>
              <select
                value={(currentTheme.layout as Record<string, string>).headerStyle}
                onChange={e => onThemeChange('layout.headerStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="minimal">Minimal</option>
                <option value="detailed">Detailed</option>
                <option value="dashboard">Dashboard</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Sidebar Style</label>
              <select
                value={(currentTheme.layout as Record<string, string>).sidebarStyle}
                onChange={e => onThemeChange('layout.sidebarStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="collapsible">Collapsible</option>
                <option value="fixed">Fixed</option>
                <option value="floating">Floating</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">
                Navigation Style
              </label>
              <select
                value={(currentTheme.layout as Record<string, string>).navigationStyle}
                onChange={e => onThemeChange('layout.navigationStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="tabs">Tabs</option>
                <option value="breadcrumbs">Breadcrumbs</option>
                <option value="menu">Menu</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Footer Style</label>
              <select
                value={(currentTheme.layout as Record<string, string>).footerStyle}
                onChange={e => onThemeChange('layout.footerStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="minimal">Minimal</option>
                <option value="detailed">Detailed</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Component Styles */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Component Styles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Button Style</label>
              <select
                value={(currentTheme.components as Record<string, string>).buttonStyle}
                onChange={e => onThemeChange('components.buttonStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="rounded">Rounded</option>
                <option value="square">Square</option>
                <option value="pill">Pill</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Card Style</label>
              <select
                value={(currentTheme.components as Record<string, string>).cardStyle}
                onChange={e => onThemeChange('components.cardStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="elevated">Elevated</option>
                <option value="flat">Flat</option>
                <option value="outlined">Outlined</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Input Style</label>
              <select
                value={(currentTheme.components as Record<string, string>).inputStyle}
                onChange={e => onThemeChange('components.inputStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="filled">Filled</option>
                <option value="outlined">Outlined</option>
                <option value="underlined">Underlined</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Table Style</label>
              <select
                value={(currentTheme.components as Record<string, string>).tableStyle}
                onChange={e => onThemeChange('components.tableStyle', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
              >
                <option value="striped">Striped</option>
                <option value="bordered">Bordered</option>
                <option value="minimal">Minimal</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Branding</h3>
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Company Name</label>
              <input
                type="text"
                value={(currentTheme.branding as Record<string, string>).companyName}
                onChange={e => onThemeChange('branding.companyName', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Tagline</label>
              <input
                type="text"
                value={(currentTheme.branding as Record<string, string>).tagline}
                onChange={e => onThemeChange('branding.tagline', e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
                placeholder="Enter tagline"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block responsive-container sm:flex-col md:flex-row lg:grid">Custom CSS</label>
            <textarea
              value={(currentTheme.branding as Record<string, string>).customCSS || ''}
              onChange={e => onThemeChange('branding.customCSS', e.target.value)}
              rows={6}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm responsive-container sm:flex-col md:flex-row lg:grid"
              placeholder="/* Custom CSS styles */"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Domain Tab Component
function DomainTab({ domainConfig, onDomainUpdate }: { domainConfig: unknown; onDomainUpdate: unknown }) {
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = () => {
    if (newDomain && !domainConfig.customDomains.includes(newDomain)) {
      onDomainUpdate({
        customDomains: [...domainConfig.customDomains, newDomain],
      });
      setNewDomain('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    onDomainUpdate({
      customDomains: domainConfig.customDomains.filter((d: string) => d !== domain),
    });
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Subdomain */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Subdomain Configuration</h3>
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <div className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{domainConfig.subdomain}</div>
              <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Primary subdomain for this portal</div>
            </div>
            <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <CheckCircle className="w-5 h-5 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
              <span className="text-green-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Domains */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Custom Domains</h3>
        <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          {domainConfig.customDomains.map((domain: string, index: number) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <div className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{domain}</div>
                  <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">Custom domain</div>
                </div>
                <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <CheckCircle className="w-5 h-5 text-green-400 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <button
                    onClick={() = aria-label="Button"> handleRemoveDomain(domain)}
                    className="text-red-400 hover:text-red-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <input
              type="text"
              value={newDomain}
              onChange={e => setNewDomain(e.target.value)}
              placeholder="Enter custom domain (e.g., portal.company.com)"
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 responsive-container sm:flex-col md:flex-row lg:grid"
            />
            <button
              onClick={handleAddDomain}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
             aria-label="Button">
              Add Domain
            </button>
          </div>
        </div>
      </div>

      {/* SSL & CDN */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Security & Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">SSL Certificate</span>
              <div
                className={`w-3 h-3 rounded-full ${domainConfig.sslEnabled ? 'bg-green-400' : 'bg-red-400'}`}
              />
            </div>
            <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
              {domainConfig.sslEnabled ? 'SSL enabled' : 'SSL disabled'}
            </div>
            <button
              onClick={() = aria-label="Button"> onDomainUpdate({ sslEnabled: !domainConfig.sslEnabled })}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {domainConfig.sslEnabled ? 'Disable' : 'Enable'} SSL
            </button>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between mb-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <span className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">CDN</span>
              <div
                className={`w-3 h-3 rounded-full ${domainConfig.cdnEnabled ? 'bg-green-400' : 'bg-red-400'}`}
              />
            </div>
            <div className="text-gray-400 text-sm responsive-container sm:flex-col md:flex-row lg:grid">
              {domainConfig.cdnEnabled ? 'CDN enabled' : 'CDN disabled'}
            </div>
            <button
              onClick={() = aria-label="Button"> onDomainUpdate({ cdnEnabled: !domainConfig.cdnEnabled })}
              className="mt-2 text-blue-400 hover:text-blue-300 text-sm responsive-container sm:flex-col md:flex-row lg:grid"
            >
              {domainConfig.cdnEnabled ? 'Disable' : 'Enable'} CDN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Access Tab Component
function AccessTab({
  accessControl,
}: {
  accessControl: {
    roles: string[];
    permissions: string[];
    features: string[];
  };
}) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Roles */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">User Roles</h3>
        <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {accessControl.roles.map((role: string, index: number) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {accessControl.permissions.map((permission: string, index: number) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{permission}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Available Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          {accessControl.features.map((feature: string, index: number) => (
            <div key={index} className="bg-white/5 rounded-lg p-3 border border-white/10 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="text-white font-medium responsive-container sm:flex-col md:flex-row lg:grid">{feature}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Preview Tab Component
function PreviewTab({ theme }: { theme: PortalTheme }) {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <h3 className="text-xl font-semibold text-white responsive-container sm:flex-col md:flex-row lg:grid">Live Preview</h3>
        <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Monitor className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
          <Smartphone className="w-4 h-4 text-gray-400 responsive-container sm:flex-col md:flex-row lg:grid" />
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-2xl responsive-container sm:flex-col md:flex-row lg:grid">
        <div
          className="p-6 responsive-container sm:flex-col md:flex-row lg:grid"
          style={{
            backgroundColor: theme.theme.backgroundColor,
            color: theme.theme.textColor,
          }}
        >
          {/* Header Preview */}
          <div
            className="mb-6 p-4 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
            style={{
              backgroundColor: theme.theme.primaryColor,
              color: 'white',
            }}
          >
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
              <div>
                <h1 className="text-xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">{theme.branding.companyName}</h1>
                <p className="text-sm opacity-90 responsive-container sm:flex-col md:flex-row lg:grid">{theme.branding.tagline}</p>
              </div>
              <div className="flex items-center space-x-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid"
                  style={{
                    backgroundColor: theme.theme.accentColor,
                    color: 'white',
                  }}
                 aria-label="Button">
                  Dashboard
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: `1px solid ${theme.theme.borderColor}`,
                  }}
                 aria-label="Button">
                  Settings
                </button>
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <div
              className="p-4 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
              style={{
                backgroundColor: 'white',
                border: `1px solid ${theme.theme.borderColor}`,
              }}
            >
              <h3 className="font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid" style={{ color: theme.theme.textColor }}>
                Sample Card
              </h3>
              <p className="text-sm mb-4 responsive-container sm:flex-col md:flex-row lg:grid" style={{ color: theme.theme.textColor }}>
                This is a preview of how your portal will look with the selected theme.
              </p>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid"
                style={{
                  backgroundColor: theme.theme.primaryColor,
                  color: 'white',
                }}
               aria-label="Button">
                Action Button
              </button>
            </div>

            <div
              className="p-4 rounded-lg responsive-container sm:flex-col md:flex-row lg:grid"
              style={{
                backgroundColor: 'white',
                border: `1px solid ${theme.theme.borderColor}`,
              }}
            >
              <h3 className="font-semibold mb-2 responsive-container sm:flex-col md:flex-row lg:grid" style={{ color: theme.theme.textColor }}>
                Another Card
              </h3>
              <p className="text-sm mb-4 responsive-container sm:flex-col md:flex-row lg:grid" style={{ color: theme.theme.textColor }}>
                All components will use your custom color scheme and styling.
              </p>
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium responsive-container sm:flex-col md:flex-row lg:grid"
                style={{
                  backgroundColor: theme.theme.secondaryColor,
                  color: 'white',
                }}
               aria-label="Button">
                Secondary Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
