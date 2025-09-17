/**
 * TMS Registration Flow - Complete User Onboarding System
 * Comprehensive Registration with Full Logic Flow A-Z
 *
 * FLOW STRUCTURE:
 * 1. Welcome & Company Type Selection
 * 2. Service Provider Welcome (if applicable)
 * 3. Company Information (dynamic based on type)
 * 4. User Details
 * 5. Role & Function Selection (dynamic based on type)
 * 6. Lines of Business (for transportation companies)
 * 7. Subscription Selection
 * 8. Verification & Summary
 * 9. Approval Pending
 *
 * Created: 2025-01-15T10:00:00.000Z
 * Last Updated: 2025-01-15T11:00:00.000Z
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Truck,
  Package,
  Users,
  DollarSign,
  MessageSquare,
  BarChart3,
  Calculator,
  ShoppingCart,
  Link,
  ClipboardList,
  CreditCard,
  Ship,
  Car as CarIcon,
  Building,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Loader2,
  UserCheck,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';

// Types and Interfaces
type CompanyType = 'shipper' | 'broker' | 'carrier' | 'owner_operator' | 'service_provider';
type UserRole = 'shipper' | 'broker' | 'carrier' | 'owner_operator' | 'service_provider';
type RegistrationStep =
  | 'welcome'
  | 'service-provider-welcome'
  | 'primary-role-selection'
  | 'company-info'
  | 'user-details'
  | 'role-selection'
  | 'lines-of-business'
  | 'subscription'
  | 'verification'
  | 'approval-pending';

interface RegistrationData {
  // Company Information
  companyName: string;
  companyType: CompanyType;
  companyTypes: CompanyType[]; // Multiple company types
  primaryRole: CompanyType | null; // Primary role for multi-company types
  industry: string;
  companySize: string;
  companyAddress: string;
  website: string;
  subdomain: string;

  // User Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;

  // Role and Access
  secondaryRoles: UserRole[];
  requestedFunctions: string[];

  // Lines of Business
  linesOfBusiness: string[];
  primaryLineOfBusiness: string;

  // Service Provider Specific
  serviceProviderServices: string[];
  primaryServiceProviderService: string;

  // Company Type Specific Fields
  mcNumber: string; // For carriers and brokers
  dotNumber: string; // For carriers
  brokerLicense: string; // For brokers
  fleetSize: string; // For carriers and owner operators
  operatingRadius: string; // For carriers and owner operators

  // Service Provider Specific Fields
  serviceLicense: string; // For service providers
  yearsInBusiness: string; // For service providers
  coverageArea: string; // For service providers
  numberOfClients: string; // For service providers

  // Subscription
  subscriptionPlan: string;

  // Verification
  agreedToTerms: boolean;
}

interface Step {
  id: RegistrationStep;
  title: string;
  description: string;
}

function RegistrationFlowNew() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    companyName: '',
    companyType: 'shipper',
    companyTypes: [],
    primaryRole: null,
    industry: '',
    companySize: '',
    companyAddress: '',
    website: '',
    subdomain: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    department: '',
    secondaryRoles: [],
    requestedFunctions: [],
    linesOfBusiness: [],
    primaryLineOfBusiness: '',
    serviceProviderServices: [],
    primaryServiceProviderService: '',
    mcNumber: '',
    dotNumber: '',
    brokerLicense: '',
    fleetSize: '',
    operatingRadius: '',
    serviceLicense: '',
    yearsInBusiness: '',
    coverageArea: '',
    numberOfClients: '',
    subscriptionPlan: '',
    agreedToTerms: false,
  });

  // Step Configuration
  const steps: Step[] = [
    { id: 'welcome', title: 'Welcome', description: 'Choose your company type' },
    {
      id: 'service-provider-welcome',
      title: 'Service Provider Welcome',
      description: 'Select your services',
    },
    { id: 'company-info', title: 'Company Info', description: 'Tell us about your company' },
    { id: 'user-details', title: 'User Details', description: 'Your personal information' },
    {
      id: 'role-selection',
      title: 'Role & Functions',
      description: 'Choose your role and functions',
    },
    { id: 'lines-of-business', title: 'Lines of Business', description: 'Select your services' },
    { id: 'subscription', title: 'Subscription', description: 'Select your plan' },
    { id: 'verification', title: 'Verification', description: 'Review and submit' },
    { id: 'approval-pending', title: 'Approval Pending', description: 'Waiting for approval' },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  // Event Handlers
  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id as RegistrationStep);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id as RegistrationStep);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCurrentStep('approval-pending');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic Industry Options based on Company Type
  const getIndustryOptions = (companyType: CompanyType): string[] => {
    const industryMap: Record<CompanyType, string[]> = {
      shipper: [
        'Manufacturing',
        'Retail & E-commerce',
        'Food & Beverage',
        'Automotive',
        'Electronics',
        'Pharmaceuticals',
        'Textiles & Apparel',
        'Construction Materials',
        'Other',
      ],
      broker: [
        'Freight Brokerage',
        'Logistics Services',
        'Supply Chain Management',
        'Transportation Consulting',
        'Other',
      ],
      carrier: [
        'Trucking & Transportation',
        'Logistics & Freight',
        'Intermodal Transportation',
        'Specialized Transport',
        'Fleet Management',
        'Other',
      ],
      owner_operator: [
        'Independent Trucking',
        'Small Fleet Operations',
        'Specialized Transport',
        'Local Delivery',
        'Other',
      ],
      service_provider: [
        'Warehousing & 3PL',
        'Freight Forwarding',
        'Insurance Services',
        'Fleet Services',
        'Technology Solutions',
        'Consulting Services',
        'Customs Brokerage',
        'Maintenance & Repair',
        'Other',
      ],
    };
    return industryMap[companyType] || [];
  };

  const getAvailableRoles = (companyType: CompanyType): UserRole[] => {
    const roleMap: Record<CompanyType, UserRole[]> = {
      shipper: ['shipper'],
      broker: ['broker'],
      carrier: ['carrier'],
      owner_operator: ['owner_operator'],
      service_provider: ['service_provider'],
    };
    return roleMap[companyType] || [];
  };

  const getRoleDescription = (role: UserRole): string => {
    const descriptions: Record<UserRole, string> = {
      shipper: 'Manage shipments and logistics operations',
      broker: 'Connect shippers with carriers and manage freight',
      carrier: 'Operate fleet and manage transportation services',
      owner_operator: 'Manage small fleet operations independently',
      service_provider: 'Provide support services to transportation industry',
    };
    return descriptions[role] || '';
  };

  const getAvailableFunctions = (companyType: CompanyType) => {
    const allFunctions = [
      {
        id: 'load_management',
        name: 'Load Management',
        description: 'Manage shipments, routes, and delivery schedules',
        icon: Package,
        recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'fleet_management',
        name: 'Fleet Management',
        description: 'Manage vehicles, drivers, and fleet operations',
        icon: Truck,
        recommended: ['carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'financial_management',
        name: 'Financial Management',
        description: 'Track expenses, revenue, and financial reporting',
        icon: DollarSign,
        recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'communication_hub',
        name: 'Communication Hub',
        description: 'Centralized messaging and notifications',
        icon: MessageSquare,
        recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'analytics_reports',
        name: 'Analytics & Reports',
        description: 'Business intelligence and performance analytics',
        icon: BarChart3,
        recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'business_directory',
        name: 'Business Directory',
        description: 'Network of partners and service providers',
        icon: Building,
        recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'rate_management',
        name: 'Rate Management',
        description: 'Manage pricing and rate structures',
        icon: Calculator,
        recommended: ['broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'freight_marketplace',
        name: 'Freight Marketplace',
        description: 'Connect with loads and available capacity',
        icon: ShoppingCart,
        recommended: ['broker', 'carrier', 'owner_operator'],
      },
      {
        id: 'edi_integration',
        name: 'EDI Integration',
        description: 'Electronic data interchange with partners',
        icon: Link,
        recommended: ['shipper', 'broker', 'carrier', 'service_provider'],
      },
      {
        id: 'customer_relationship',
        name: 'Customer Relationship',
        description: 'Manage customer relationships and support',
        icon: Users,
        recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
      },
      {
        id: 'load_board',
        name: 'Load Board',
        description: 'Access to freight opportunities',
        icon: ClipboardList,
        recommended: ['broker', 'carrier', 'owner_operator'],
      },
      {
        id: 'factoring_services',
        name: 'Factoring Services',
        description: 'Invoice factoring and payment solutions',
        icon: CreditCard,
        recommended: ['carrier', 'owner_operator', 'broker'],
      },
    ];

    return allFunctions.filter(func => func.recommended.includes(companyType));
  };

  const getServiceProviderFunctions = () => [
    {
      id: 'service_provider_tools',
      name: 'Service Provider Tools',
      description: 'Specialized tools for service providers',
      icon: Building,
    },
    {
      id: 'client_management',
      name: 'Client Management',
      description: 'Manage client relationships and services',
      icon: Users,
    },
    {
      id: 'service_catalog',
      name: 'Service Catalog',
      description: 'Manage service offerings and pricing',
      icon: ClipboardList,
    },
  ];

  const getCompanyTypeDisplay = (type: CompanyType): string => {
    switch (type) {
      case 'shipper':
        return 'Shipper';
      case 'broker':
        return 'Broker';
      case 'carrier':
        return 'Carrier';
      case 'owner_operator':
        return 'Owner Operator';
      case 'service_provider':
        return 'Service Provider';
      default:
        return type;
    }
  };

  // Render Welcome Step - Complete Company Type Selection
  const renderWelcomeStep = () => (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          className="w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          <Truck className="w-16 h-16 text-white drop-shadow-lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to TMS
          </h1>
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-3 font-medium">
            Transportation Management System
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Complete logistics management for the modern transportation industry
          </p>
        </motion.div>
      </div>

      {/* TMS Overview */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-10 border border-blue-200/50 dark:border-blue-800/50 shadow-xl backdrop-blur-sm"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">What is TMS?</h2>
          <p className="text-blue-800 dark:text-blue-200 text-xl leading-relaxed max-w-3xl mx-auto">
            TMS is a comprehensive transportation management system that streamlines logistics
            operations, connects industry partners, and provides powerful tools for managing
            shipments, fleets, and business relationships.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
              Load Management
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Track shipments end-to-end
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Truck className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
              Fleet Management
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Optimize vehicle operations
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">
              Financial Control
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Manage billing & payments
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-center group"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">Network Hub</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Connect with partners
            </p>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12"
      >
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Transportation Companies
        </h3>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Select all company types that apply to your business
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.label
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-6 text-left border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group shadow-lg hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={registrationData.companyTypes.includes('shipper')}
                onChange={e => {
                  if (e.target.checked) {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: [...prev.companyTypes, 'shipper'],
                      companyType: prev.companyTypes.length === 0 ? 'shipper' : prev.companyType,
                    }));
                  } else {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: prev.companyTypes.filter(type => type !== 'shipper'),
                    }));
                  }
                }}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Shipper</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Companies that ship goods
                </p>
              </div>
            </div>
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-6 text-left border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group shadow-lg hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={registrationData.companyTypes.includes('broker')}
                onChange={e => {
                  if (e.target.checked) {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: [...prev.companyTypes, 'broker'],
                      companyType: prev.companyTypes.length === 0 ? 'broker' : prev.companyType,
                    }));
                  } else {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: prev.companyTypes.filter(type => type !== 'broker'),
                    }));
                  }
                }}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Broker</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Freight brokers connecting shippers and carriers
                </p>
              </div>
            </div>
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-6 text-left border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group shadow-lg hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={registrationData.companyTypes.includes('carrier')}
                onChange={e => {
                  if (e.target.checked) {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: [...prev.companyTypes, 'carrier'],
                      companyType: prev.companyTypes.length === 0 ? 'carrier' : prev.companyType,
                    }));
                  } else {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: prev.companyTypes.filter(type => type !== 'carrier'),
                    }));
                  }
                }}
                className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Carrier</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Trucking companies with large fleets
                </p>
              </div>
            </div>
          </motion.label>

          <motion.label
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-6 text-left border-2 border-gray-200 dark:border-gray-600 rounded-2xl hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all group shadow-lg hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={registrationData.companyTypes.includes('owner_operator')}
                onChange={e => {
                  if (e.target.checked) {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: [...prev.companyTypes, 'owner_operator'],
                      companyType:
                        prev.companyTypes.length === 0 ? 'owner_operator' : prev.companyType,
                    }));
                  } else {
                    setRegistrationData(prev => ({
                      ...prev,
                      companyTypes: prev.companyTypes.filter(type => type !== 'owner_operator'),
                    }));
                  }
                }}
                className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-lg">Owner Operator</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Small fleet owners (1-5 trucks)
                </p>
              </div>
            </div>
          </motion.label>
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (registrationData.companyTypes.length > 1) {
                setCurrentStep('primary-role-selection');
              } else {
                setCurrentStep('company-info');
              }
            }}
            disabled={registrationData.companyTypes.length === 0}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue as Service User →
          </motion.button>
          {registrationData.companyTypes.length === 0 && (
            <p className="text-sm text-red-500 mt-2">Please select at least one company type</p>
          )}
        </div>
      </motion.div>

      {/* Support Service Companies */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Support Service Companies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Companies that provide services to the transportation industry
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-indigo-900/20 rounded-2xl p-10 border border-purple-200 dark:border-purple-800 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Warehousing & 3PL
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Freight Forwarding
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Insurance Services
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Fleet Services
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Technology Solutions
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Consulting Services
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Customs Brokerage
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg shadow-sm"></div>
              <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                Truck Maintenance
              </span>
            </motion.div>
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep('service-provider-welcome')}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Continue as Service Provider →
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Render Service Provider Welcome Step
  const renderPrimaryRoleSelectionStep = () => {
    // Smart role priority logic based on business complexity
    const getRolePriority = (companyTypes: CompanyType[]): CompanyType[] => {
      const priorityOrder: CompanyType[] = ['carrier', 'broker', 'shipper', 'owner_operator'];
      return priorityOrder.filter(type => companyTypes.includes(type));
    };

    const suggestedRoles = getRolePriority(registrationData.companyTypes);

    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
          >
            <UserCheck className="w-12 h-12 text-white drop-shadow-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Select Your Primary Role
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Since you selected multiple company types, please choose your primary role. This will
              determine your main dashboard and default permissions.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-10 border border-gray-200 dark:border-gray-700 shadow-xl"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Your Selected Company Types
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {registrationData.companyTypes.map(type => (
                <span
                  key={type}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700"
                >
                  {getCompanyTypeDisplay(type)}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Choose Your Primary Role
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Select the role that best represents your primary business focus
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {registrationData.companyTypes.map(type => {
                const isRecommended = suggestedRoles[0] === type;
                const isSelected = registrationData.primaryRole === type;

                return (
                  <motion.label
                    key={type}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className={`p-6 text-left border-2 rounded-2xl transition-all group shadow-lg hover:shadow-xl cursor-pointer ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/10'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="primaryRole"
                        value={type}
                        checked={isSelected}
                        onChange={e =>
                          setRegistrationData(prev => ({
                            ...prev,
                            primaryRole: e.target.value as CompanyType,
                          }))
                        }
                        className="w-5 h-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${
                          type === 'shipper'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                            : type === 'broker'
                              ? 'bg-gradient-to-br from-green-500 to-green-600'
                              : type === 'carrier'
                                ? 'bg-gradient-to-br from-purple-500 to-purple-600'
                                : 'bg-gradient-to-br from-orange-500 to-orange-600'
                        }`}
                      >
                        {type === 'shipper' ? (
                          <Package className="w-7 h-7 text-white" />
                        ) : type === 'broker' ? (
                          <Users className="w-7 h-7 text-white" />
                        ) : type === 'carrier' ? (
                          <Truck className="w-7 h-7 text-white" />
                        ) : (
                          <User className="w-7 h-7 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                            {getCompanyTypeDisplay(type)}
                          </h4>
                          {isRecommended && (
                            <span className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {type === 'shipper'
                            ? 'Primary focus on shipping goods and managing shipments'
                            : type === 'broker'
                              ? 'Primary focus on connecting shippers with carriers'
                              : type === 'carrier'
                                ? 'Primary focus on fleet operations and transportation'
                                : 'Primary focus on independent trucking operations'}
                        </p>
                      </div>
                    </div>
                  </motion.label>
                );
              })}
            </div>
          </div>

          {suggestedRoles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-800"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                    Smart Recommendation
                  </h4>
                  <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                    Based on your selected company types, we recommend{' '}
                    <strong>{getCompanyTypeDisplay(suggestedRoles[0])}</strong> as your primary
                    role. This typically provides the most comprehensive access to TMS features for
                    your business model.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  };

  const renderServiceProviderWelcomeStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Service Provider Registration
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Specialized registration for transportation industry service providers
        </p>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">
          What Services Do You Provide?
        </h3>
        <p className="text-sm text-purple-800 dark:text-purple-200 mb-4">
          Select all the services you offer. You can choose multiple services and designate one as
          primary.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'warehousing_3pl',
              title: 'Warehousing & 3PL',
              description: 'Storage, fulfillment, and distribution services',
              icon: Package,
              color: 'bg-blue-500',
            },
            {
              id: 'freight_forwarding',
              title: 'Freight Forwarding',
              description: 'International shipping and customs clearance',
              icon: Ship,
              color: 'bg-green-500',
            },
            {
              id: 'insurance_services',
              title: 'Insurance Services',
              description: 'Transportation and cargo insurance',
              icon: CreditCard,
              color: 'bg-purple-500',
            },
            {
              id: 'fleet_services',
              title: 'Fleet Services',
              description: 'Fuel cards, maintenance, and repair services',
              icon: Truck,
              color: 'bg-orange-500',
            },
            {
              id: 'technology_solutions',
              title: 'Technology Solutions',
              description: 'Software, apps, and digital tools for logistics',
              icon: BarChart3,
              color: 'bg-red-500',
            },
            {
              id: 'consulting_services',
              title: 'Consulting Services',
              description: 'Logistics consulting and optimization',
              icon: Users,
              color: 'bg-indigo-500',
            },
            {
              id: 'customs_brokerage',
              title: 'Customs Brokerage',
              description: 'Customs clearance and import/export services',
              icon: Link,
              color: 'bg-teal-500',
            },
            {
              id: 'truck_maintenance',
              title: 'Truck Maintenance & Repair',
              description: 'Vehicle maintenance and repair services',
              icon: CarIcon,
              color: 'bg-yellow-500',
            },
          ].map(service => {
            const isSelected = registrationData.serviceProviderServices.includes(service.id);
            const isPrimary = registrationData.primaryServiceProviderService === service.id;

            return (
              <label
                key={service.id}
                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                } ${isPrimary ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={e => {
                    if (e.target.checked) {
                      setRegistrationData(prev => ({
                        ...prev,
                        serviceProviderServices: [...prev.serviceProviderServices, service.id],
                      }));
                    } else {
                      setRegistrationData(prev => ({
                        ...prev,
                        serviceProviderServices: prev.serviceProviderServices.filter(
                          s => s !== service.id
                        ),
                        primaryServiceProviderService:
                          prev.primaryServiceProviderService === service.id
                            ? ''
                            : prev.primaryServiceProviderService,
                      }));
                    }
                  }}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div
                      className={`w-6 h-6 ${service.color} rounded flex items-center justify-center`}
                    >
                      <service.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {service.title}
                    </span>
                    {isPrimary && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {service.description}
                  </p>
                  {isSelected && (
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        setRegistrationData(prev => ({
                          ...prev,
                          primaryServiceProviderService:
                            prev.primaryServiceProviderService === service.id ? '' : service.id,
                        }));
                      }}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        isPrimary
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-green-100 hover:text-green-800'
                      }`}
                    >
                      {isPrimary ? 'Primary Service' : 'Set as Primary'}
                    </button>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Selected Services:</strong> {registrationData.serviceProviderServices.length} of
            8 services selected
          </p>
          {registrationData.primaryServiceProviderService && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              <strong>Primary Service:</strong>{' '}
              {
                [
                  { id: 'warehousing_3pl', name: 'Warehousing & 3PL' },
                  { id: 'freight_forwarding', name: 'Freight Forwarding' },
                  { id: 'insurance_services', name: 'Insurance Services' },
                  { id: 'fleet_services', name: 'Fleet Services' },
                  { id: 'technology_solutions', name: 'Technology Solutions' },
                  { id: 'consulting_services', name: 'Consulting Services' },
                  { id: 'customs_brokerage', name: 'Customs Brokerage' },
                  { id: 'truck_maintenance', name: 'Truck Maintenance & Repair' },
                ].find(s => s.id === registrationData.primaryServiceProviderService)?.name
              }
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Why Register as a Service Provider?
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Access to our Business Directory to connect with transportation companies</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Specialized tools and features for service providers</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Integration capabilities with TMS systems</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span>Marketing opportunities to reach potential clients</span>
          </li>
        </ul>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setCurrentStep('welcome')}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          ← Back to Main Registration
        </button>
        <button
          onClick={() => {
            setRegistrationData(prev => ({ ...prev, companyType: 'service_provider' }));
            setCurrentStep('company-info');
          }}
          disabled={registrationData.serviceProviderServices.length === 0}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue as Service Provider →
        </button>
      </div>
    </div>
  );

  // Render Company Info Step
  const renderCompanyInfoStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <Building className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Company Information
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tell us about your{' '}
          {registrationData.companyTypes.length > 0
            ? registrationData.companyTypes.map(type => type.replace('_', ' ')).join(', ')
            : registrationData.companyType.replace('_', ' ')}{' '}
          company
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Company Name *
          </label>
          <input
            type="text"
            value={registrationData.companyName}
            onChange={e => setRegistrationData(prev => ({ ...prev, companyName: e.target.value }))}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            placeholder="Enter your company name"
            required
          />
        </motion.div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry *
          </label>
          <select
            value={registrationData.industry}
            onChange={e => setRegistrationData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select your industry</option>
            {getIndustryOptions(registrationData.companyType).map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Size *
          </label>
          <select
            value={registrationData.companySize}
            onChange={e => setRegistrationData(prev => ({ ...prev, companySize: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select company size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website
          </label>
          <input
            type="url"
            value={registrationData.website}
            onChange={e => setRegistrationData(prev => ({ ...prev, website: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            TMS Subdomain *
          </label>
          <div className="flex">
            <input
              type="text"
              value={registrationData.subdomain}
              onChange={e =>
                setRegistrationData(prev => ({
                  ...prev,
                  subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                }))
              }
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="yourcompany"
              required
            />
            <span className="px-3 py-2 bg-gray-100 dark:bg-gray-600 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg text-gray-500 dark:text-gray-400">
              .transbotai.com
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Choose a unique subdomain for your TMS portal (letters, numbers, and hyphens only)
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Address *
          </label>
          <textarea
            value={registrationData.companyAddress}
            onChange={e =>
              setRegistrationData(prev => ({ ...prev, companyAddress: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            rows={3}
            placeholder="Enter your company address"
            required
          />
        </div>
      </div>

      {/* Company Type Specific Fields */}
      {(registrationData.companyTypes.includes('carrier') ||
        registrationData.companyTypes.includes('broker') ||
        registrationData.companyType === 'carrier' ||
        registrationData.companyType === 'broker') && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Regulatory Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(registrationData.companyTypes.includes('carrier') ||
              registrationData.companyType === 'carrier') && (
              <div>
                <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  DOT Number
                </label>
                <input
                  type="text"
                  value={registrationData.dotNumber}
                  onChange={e =>
                    setRegistrationData(prev => ({ ...prev, dotNumber: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-blue-800/50 dark:text-white"
                  placeholder="Enter DOT number"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                MC Number
              </label>
              <input
                type="text"
                value={registrationData.mcNumber}
                onChange={e => setRegistrationData(prev => ({ ...prev, mcNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-blue-800/50 dark:text-white"
                placeholder="Enter MC number"
              />
            </div>
            {(registrationData.companyTypes.includes('broker') ||
              registrationData.companyType === 'broker') && (
              <div>
                <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                  Broker License
                </label>
                <input
                  type="text"
                  value={registrationData.brokerLicense}
                  onChange={e =>
                    setRegistrationData(prev => ({ ...prev, brokerLicense: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-blue-800/50 dark:text-white"
                  placeholder="Enter broker license number"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {(registrationData.companyTypes.includes('carrier') ||
        registrationData.companyTypes.includes('owner_operator') ||
        registrationData.companyType === 'carrier' ||
        registrationData.companyType === 'owner_operator') && (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
            Fleet Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                Fleet Size
              </label>
              <select
                value={registrationData.fleetSize}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, fleetSize: e.target.value }))
                }
                className="w-full px-3 py-2 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-800/50 dark:text-white"
              >
                <option value="">Select fleet size</option>
                {registrationData.companyTypes.includes('owner_operator') ||
                registrationData.companyType === 'owner_operator' ? (
                  <>
                    <option value="1">1 truck</option>
                    <option value="2">2 trucks</option>
                    <option value="3">3 trucks</option>
                    <option value="4">4 trucks</option>
                    <option value="5">5 trucks</option>
                  </>
                ) : (
                  <>
                    <option value="6-10">6-10 trucks</option>
                    <option value="11-25">11-25 trucks</option>
                    <option value="26-50">26-50 trucks</option>
                    <option value="51-100">51-100 trucks</option>
                    <option value="100+">100+ trucks</option>
                  </>
                )}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                Operating Radius
              </label>
              <select
                value={registrationData.operatingRadius}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, operatingRadius: e.target.value }))
                }
                className="w-full px-3 py-2 border border-green-300 dark:border-green-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-green-800/50 dark:text-white"
              >
                <option value="">Select operating radius</option>
                <option value="local">Local (within 100 miles)</option>
                <option value="regional">Regional (100-500 miles)</option>
                <option value="national">National (500+ miles)</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {registrationData.companyType === 'service_provider' && (
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
            Service Provider Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Service License Number
              </label>
              <input
                type="text"
                value={registrationData.serviceLicense}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, serviceLicense: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-800/50 dark:text-white"
                placeholder="Enter service license number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Years in Business
              </label>
              <select
                value={registrationData.yearsInBusiness}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, yearsInBusiness: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-800/50 dark:text-white"
              >
                <option value="">Select years in business</option>
                <option value="0-1">0-1 years</option>
                <option value="2-5">2-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="11-20">11-20 years</option>
                <option value="20+">20+ years</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Service Coverage Area
              </label>
              <select
                value={registrationData.coverageArea}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, coverageArea: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-800/50 dark:text-white"
              >
                <option value="">Select coverage area</option>
                <option value="local">Local</option>
                <option value="regional">Regional</option>
                <option value="national">National</option>
                <option value="international">International</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Number of Clients
              </label>
              <select
                value={registrationData.numberOfClients}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, numberOfClients: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-purple-800/50 dark:text-white"
              >
                <option value="">Select number of clients</option>
                <option value="1-10">1-10 clients</option>
                <option value="11-50">11-50 clients</option>
                <option value="51-100">51-100 clients</option>
                <option value="100+">100+ clients</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );

  // Render User Details Step
  const renderUserDetailsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Details</h2>
        <p className="text-gray-600 dark:text-gray-400">Your personal information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={registrationData.firstName}
            onChange={e => setRegistrationData(prev => ({ ...prev, firstName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={registrationData.lastName}
            onChange={e => setRegistrationData(prev => ({ ...prev, lastName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            value={registrationData.email}
            onChange={e => setRegistrationData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={registrationData.phone}
            onChange={e => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Title *
          </label>
          <input
            type="text"
            value={registrationData.jobTitle}
            onChange={e => setRegistrationData(prev => ({ ...prev, jobTitle: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your job title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Department
          </label>
          <input
            type="text"
            value={registrationData.department}
            onChange={e => setRegistrationData(prev => ({ ...prev, department: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your department"
          />
        </div>
      </div>
    </div>
  );

  // Render Role & Function Selection Step
  const renderRoleSelectionStep = () => {
    const availableFunctions = getAvailableFunctions(registrationData.companyType);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Role & Function Selection
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Choose your primary role and required TMS functions
          </p>
        </div>

        {/* Primary Role Selection */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Primary Role
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getAvailableRoles(registrationData.companyType).map(role => (
              <button
                key={role}
                onClick={() =>
                  setRegistrationData(prev => ({ ...prev, primaryRole: role as CompanyType }))
                }
                className={`p-4 text-left border-2 rounded-lg transition-all ${
                  registrationData.primaryRole === role
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-800/50'
                    : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      registrationData.primaryRole === role
                        ? 'bg-blue-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    {registrationData.primaryRole === role && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                      {role.replace('_', ' ')}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getRoleDescription(role)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Function Selection */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Required TMS Functions
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Select the functions you need for your business operations
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableFunctions.map(func => (
              <label
                key={func.id}
                className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={registrationData.requestedFunctions.includes(func.id)}
                  onChange={e => {
                    if (e.target.checked) {
                      setRegistrationData(prev => ({
                        ...prev,
                        requestedFunctions: [...prev.requestedFunctions, func.id],
                      }));
                    } else {
                      setRegistrationData(prev => ({
                        ...prev,
                        requestedFunctions: prev.requestedFunctions.filter(f => f !== func.id),
                      }));
                    }
                  }}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <func.icon className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900 dark:text-white">{func.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{func.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Service Provider Specific Functions */}
        {registrationData.companyType === 'service_provider' && (
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
              Service Provider Functions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getServiceProviderFunctions().map(func => (
                <label
                  key={func.id}
                  className="flex items-start space-x-3 p-4 border border-purple-200 dark:border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-800/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={registrationData.requestedFunctions.includes(func.id)}
                    onChange={e => {
                      if (e.target.checked) {
                        setRegistrationData(prev => ({
                          ...prev,
                          requestedFunctions: [...prev.requestedFunctions, func.id],
                        }));
                      } else {
                        setRegistrationData(prev => ({
                          ...prev,
                          requestedFunctions: prev.requestedFunctions.filter(f => f !== func.id),
                        }));
                      }
                    }}
                    className="mt-1 w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <func.icon className="w-4 h-4 text-purple-600" />
                      <span className="font-medium text-gray-900 dark:text-white">{func.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{func.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Lines of Business Step
  const renderLinesOfBusinessStep = () => {
    const linesOfBusiness = [
      {
        id: 'ftl',
        name: 'Full Truckload (FTL)',
        description: 'Complete truckload shipments',
        icon: Truck,
      },
      {
        id: 'ltl',
        name: 'Less Than Truckload (LTL)',
        description: 'Partial truckload shipments',
        icon: Package,
      },
      {
        id: 'intermodal',
        name: 'Intermodal',
        description: 'Multi-modal transportation',
        icon: Ship,
      },
      {
        id: 'drayage',
        name: 'Drayage',
        description: 'Short-haul container transport',
        icon: CarIcon,
      },
      {
        id: 'ocean_freight',
        name: 'Ocean Freight',
        description: 'International ocean shipping',
        icon: Ship,
      },
      {
        id: 'parcel',
        name: 'Parcel / Courier Shipping',
        description: 'Small package delivery',
        icon: Package,
      },
      {
        id: 'vehicle_transport',
        name: 'Vehicle Transport (Auto Hauling)',
        description: 'Automobile transportation',
        icon: CarIcon,
      },
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Lines of Business
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select the transportation services you provide or use
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Select Your Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {linesOfBusiness.map(service => (
              <label
                key={service.id}
                className="flex items-start space-x-3 p-4 border border-blue-200 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-800/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={registrationData.linesOfBusiness.includes(service.id)}
                  onChange={e => {
                    if (e.target.checked) {
                      setRegistrationData(prev => ({
                        ...prev,
                        linesOfBusiness: [...prev.linesOfBusiness, service.id],
                      }));
                    } else {
                      setRegistrationData(prev => ({
                        ...prev,
                        linesOfBusiness: prev.linesOfBusiness.filter(s => s !== service.id),
                        primaryLineOfBusiness:
                          prev.primaryLineOfBusiness === service.id
                            ? ''
                            : prev.primaryLineOfBusiness,
                      }));
                    }
                  }}
                  className="mt-1 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <service.icon className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {registrationData.linesOfBusiness.length > 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
              Primary Line of Business
            </h3>
            <p className="text-sm text-green-800 dark:text-green-200 mb-4">
              Select your main service offering
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {registrationData.linesOfBusiness.map(serviceId => {
                const service = linesOfBusiness.find(s => s.id === serviceId);
                if (!service) return null;

                return (
                  <label
                    key={serviceId}
                    className="flex items-center space-x-3 p-3 border border-green-200 dark:border-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-800/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="primaryLineOfBusiness"
                      value={serviceId}
                      checked={registrationData.primaryLineOfBusiness === serviceId}
                      onChange={e =>
                        setRegistrationData(prev => ({
                          ...prev,
                          primaryLineOfBusiness: e.target.value,
                        }))
                      }
                      className="w-4 h-4 text-green-600 border-green-300 focus:ring-green-500"
                    />
                    <div className="flex items-center space-x-2">
                      <service.icon className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Subscription Selection Step
  const renderSubscriptionStep = () => {
    const subscriptionPlans = [
      {
        id: 'starter',
        name: 'Starter',
        price: '$99',
        period: '/month',
        description: 'Perfect for small businesses getting started',
        features: [
          'Up to 5 users',
          'Basic load management',
          'Standard reporting',
          'Email support',
          'Mobile app access',
        ],
        recommended: false,
      },
      {
        id: 'professional',
        name: 'Professional',
        price: '$299',
        period: '/month',
        description: 'Ideal for growing transportation companies',
        features: [
          'Up to 25 users',
          'Advanced load management',
          'Fleet management',
          'Financial tracking',
          'API access',
          'Priority support',
          'Custom integrations',
        ],
        recommended: true,
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$599',
        period: '/month',
        description: 'Complete solution for large operations',
        features: [
          'Unlimited users',
          'Full TMS suite',
          'Advanced analytics',
          'EDI integration',
          'Custom development',
          'Dedicated support',
          'White-label options',
        ],
        recommended: false,
      },
    ];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Select the subscription plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map(plan => (
            <div
              key={plan.id}
              className={`relative p-6 border-2 rounded-xl transition-all cursor-pointer ${
                registrationData.subscriptionPlan === plan.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
              }`}
              onClick={() => setRegistrationData(prev => ({ ...prev, subscriptionPlan: plan.id }))}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-blue-600">{plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <div
                  className={`w-6 h-6 rounded-full border-2 mx-auto ${
                    registrationData.subscriptionPlan === plan.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {registrationData.subscriptionPlan === plan.id && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Need a Custom Solution?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Contact our sales team for enterprise pricing and custom features tailored to your
            specific needs.
          </p>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setRegistrationData(prev => ({ ...prev, subscriptionPlan: 'custom' }))}
          >
            Contact Sales
          </button>
        </div>
      </div>
    );
  };

  // Render Verification & Summary Step
  const renderVerificationStep = () => {
    const getCompanyTypeDisplay = (type: CompanyType) => {
      const displayMap: Record<CompanyType, string> = {
        shipper: 'Shipper',
        broker: 'Broker',
        carrier: 'Carrier',
        owner_operator: 'Owner Operator',
        service_provider: 'Service Provider',
      };
      return displayMap[type] || type;
    };

    const getSubscriptionPlanDisplay = (plan: string) => {
      const planMap: Record<string, string> = {
        starter: 'Starter Plan - $99/month',
        professional: 'Professional Plan - $299/month',
        enterprise: 'Enterprise Plan - $599/month',
        custom: 'Custom Plan - Contact Sales',
      };
      return planMap[plan] || plan;
    };

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Review & Submit</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please review your information before submitting your registration
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-600" />
              Company Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Company Name:
                </span>
                <p className="text-gray-900 dark:text-white">{registrationData.companyName}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Company Type(s):
                </span>
                <div className="mt-2">
                  {registrationData.companyTypes.length > 0 ? (
                    registrationData.companyTypes.map(type => (
                      <span
                        key={type}
                        className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                      >
                        {getCompanyTypeDisplay(type)}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-900 dark:text-white">
                      {getCompanyTypeDisplay(registrationData.companyType)}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Industry:
                </span>
                <p className="text-gray-900 dark:text-white">{registrationData.industry}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Company Size:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {registrationData.companySize} employees
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  TMS Subdomain:
                </span>
                <p className="text-gray-900 dark:text-white">
                  {registrationData.subdomain}.transbotai.com
                </p>
              </div>
              {registrationData.website && (
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Website:
                  </span>
                  <p className="text-gray-900 dark:text-white">{registrationData.website}</p>
                </div>
              )}
            </div>
          </div>

          {/* User Information */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              User Information
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name:</span>
                <p className="text-gray-900 dark:text-white">
                  {registrationData.firstName} {registrationData.lastName}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email:</span>
                <p className="text-gray-900 dark:text-white">{registrationData.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone:</span>
                <p className="text-gray-900 dark:text-white">{registrationData.phone}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Job Title:
                </span>
                <p className="text-gray-900 dark:text-white">{registrationData.jobTitle}</p>
              </div>
              {registrationData.department && (
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Department:
                  </span>
                  <p className="text-gray-900 dark:text-white">{registrationData.department}</p>
                </div>
              )}
            </div>
          </div>

          {/* Role & Functions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-purple-600" />
              Role & Functions
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Primary Role:
                </span>
                <p className="text-gray-900 dark:text-white capitalize">
                  {registrationData.primaryRole
                    ? registrationData.primaryRole.replace('_', ' ')
                    : 'Not selected'}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Requested Functions:
                </span>
                <div className="mt-2">
                  {registrationData.requestedFunctions.map(func => (
                    <span
                      key={func}
                      className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                    >
                      {func.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lines of Business / Services */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Truck className="w-5 h-5 mr-2 text-orange-600" />
              {registrationData.companyType === 'service_provider'
                ? 'Services'
                : 'Lines of Business'}
            </h3>
            <div className="space-y-3">
              {registrationData.companyType === 'service_provider' ? (
                <>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Services:
                    </span>
                    <div className="mt-2">
                      {registrationData.serviceProviderServices.map(service => (
                        <span
                          key={service}
                          className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  {registrationData.primaryServiceProviderService && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Primary Service:
                      </span>
                      <p className="text-gray-900 dark:text-white">
                        {registrationData.primaryServiceProviderService}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Services:
                    </span>
                    <div className="mt-2">
                      {registrationData.linesOfBusiness.map(service => (
                        <span
                          key={service}
                          className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                        >
                          {service.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                  {registrationData.primaryLineOfBusiness && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Primary Service:
                      </span>
                      <p className="text-gray-900 dark:text-white">
                        {registrationData.primaryLineOfBusiness.toUpperCase()}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Subscription Plan */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              Subscription Plan
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 dark:text-white font-medium">
                  {getSubscriptionPlanDisplay(registrationData.subscriptionPlan)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Billed monthly • Cancel anytime
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">30-day free trial</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">No setup fees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              checked={registrationData.agreedToTerms}
              onChange={e =>
                setRegistrationData(prev => ({ ...prev, agreedToTerms: e.target.checked }))
              }
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-700 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                Privacy Policy
              </a>
              . I understand that my registration will be reviewed and approved by our team.
            </label>
          </div>
        </div>
      </div>
    );
  };

  // Render Approval Pending Step
  const renderApprovalPendingStep = () => (
    <div className="text-center py-12">
      <div className="w-24 h-24 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <RefreshCw className="w-12 h-12 text-yellow-600 animate-spin" />
      </div>

      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Registration Submitted Successfully!
      </h2>

      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
        Thank you for registering with TMS. Your application is now under review by our team. We'll
        get back to you within 24-48 hours with next steps.
      </p>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
          What happens next?
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Application Review</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Our team will review your company information and requirements
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">2</span>
            </div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Account Setup</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                We'll configure your TMS portal with your selected functions
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">3</span>
            </div>
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Welcome & Onboarding</p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                You'll receive login credentials and onboarding guidance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Registration Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Company:</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {registrationData.companyName}
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Subdomain:</span>
            <p className="font-medium text-gray-900 dark:text-white">
              {registrationData.subdomain}.transbotai.com
            </p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Contact:</span>
            <p className="font-medium text-gray-900 dark:text-white">{registrationData.email}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Plan:</span>
            <p className="font-medium text-gray-900 dark:text-white capitalize">
              {registrationData.subscriptionPlan}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Questions? Contact our support team at{' '}
          <a
            href="mailto:support@transbotai.com"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            support@transbotai.com
          </a>
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Website
          </button>
          <button
            onClick={() => (window.location.href = '/login')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return renderWelcomeStep();
      case 'service-provider-welcome':
        return renderServiceProviderWelcomeStep();
      case 'primary-role-selection':
        return renderPrimaryRoleSelectionStep();
      case 'company-info':
        return renderCompanyInfoStep();
      case 'user-details':
        return renderUserDetailsStep();
      case 'role-selection':
        return renderRoleSelectionStep();
      case 'lines-of-business':
        return renderLinesOfBusinessStep();
      case 'subscription':
        return renderSubscriptionStep();
      case 'verification':
        return renderVerificationStep();
      case 'approval-pending':
        return renderApprovalPendingStep();
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Step: {steps[currentStepIndex]?.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">This step is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  TMS Registration
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get started with TMS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Back to Website
              </a>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {currentStep !== 'approval-pending' && currentStep !== 'welcome' && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex space-x-3">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                        index <= currentStepIndex
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      {index <= currentStepIndex && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="absolute inset-0 rounded-full bg-white/30"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {currentStep === 'verification' ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    <span className="font-semibold">
                      {isLoading ? 'Submitting...' : 'Submit Registration'}
                    </span>
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <span className="font-semibold">Next</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationFlowNew;
