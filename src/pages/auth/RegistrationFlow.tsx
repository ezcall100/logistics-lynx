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

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Truck,
  Package,
  Users,
  DollarSign,
  Clock,
  UserCheck,
  RefreshCw,
  MessageSquare,
  BarChart3,
  Calculator,
  ShoppingCart,
  Link,
  ClipboardList,
  CreditCard,
  Ship,
  Package2,
  Car as CarIcon,
  Train,
} from 'lucide-react';

// Registration Steps
type RegistrationStep =
  | 'welcome'
  | 'service-provider-welcome'
  | 'company-info'
  | 'user-details'
  | 'role-selection'
  | 'lines-of-business'
  | 'subscription'
  | 'verification'
  | 'approval-pending';

// User Role Types
type UserRole = 'shipper' | 'broker' | 'carrier' | 'owner_operator' | 'driver';

// Subscription Types
type SubscriptionType = 'free' | 'professional' | 'enterprise' | 'custom';

// Registration Data Interface
interface RegistrationData {
  // Company Information
  companyName: string;
  companyType: 'shipper' | 'broker' | 'carrier' | 'owner_operator' | 'service_provider';
  industry: string;
  companySize: '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
  website: string;
  subdomain: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;

  // User Information
  firstName: string;
  lastName: string;
  email: string;
  userPhone: string;
  jobTitle: string;
  department: string;

  // Role and Access
  primaryRole: UserRole;
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

  // Subscription
  subscriptionType: SubscriptionType;
  billingCycle: 'monthly' | 'yearly';
  paymentMethod: 'credit_card' | 'bank_transfer' | 'invoice';

  // Verification
  emailVerified: boolean;
  phoneVerified: boolean;
  documentsUploaded: boolean;
  complianceChecked: boolean;

  // Status
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'active';
  approvalNotes: string;
  approvedBy: string;
  approvedAt: string;
}

function RegistrationFlow() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('welcome');
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    companyName: '',
    companyType: 'shipper',
    industry: '',
    companySize: '1-10',
    website: '',
    subdomain: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    firstName: '',
    lastName: '',
    email: '',
    userPhone: '',
    jobTitle: '',
    department: '',
    primaryRole: 'shipper' as UserRole,
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
    subscriptionType: 'professional',
    billingCycle: 'monthly',
    paymentMethod: 'credit_card',
    emailVerified: false,
    phoneVerified: false,
    documentsUploaded: false,
    complianceChecked: false,
    status: 'pending',
    approvalNotes: '',
    approvedBy: '',
    approvedAt: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  // Auto-set primary role based on company type
  useEffect(() => {
    setRegistrationData(prev => ({
      ...prev,
      primaryRole: prev.companyType as UserRole,
    }));
  }, [registrationData.companyType]);

  // Get industry options based on company type
  const getIndustryOptions = (companyType: string) => {
    const industryMap = {
      shipper: [
        'Retail & E-commerce',
        'Manufacturing',
        'Food & Beverage',
        'Automotive',
        'Electronics',
        'Pharmaceuticals',
        'Textiles & Apparel',
        'Construction Materials',
        'Agricultural Products',
        'Other',
      ],
      broker: [
        'Freight Brokerage',
        'Logistics Services',
        'Supply Chain Management',
        'International Trade',
        'Customs Brokerage',
        'Warehousing & Distribution',
        'Transportation Consulting',
        'Other',
      ],
      carrier: [
        'Trucking & Transportation',
        'Logistics & Supply Chain',
        'Freight Services',
        'Intermodal Transportation',
        'Specialized Transport',
        'Fleet Management',
        'Other',
      ],
      owner_operator: [
        'Independent Trucking',
        'Specialized Transport',
        'Local Delivery',
        'Long Haul Transportation',
        'Construction Transport',
        'Agricultural Transport',
        'Other',
      ],
      service_provider: [
        'Warehousing & 3PL',
        'Freight Forwarding',
        'Customs Brokerage',
        'Insurance Services',
        'Fuel & Fleet Services',
        'Truck Maintenance & Repair',
        'Technology Solutions',
        'Consulting Services',
        'Other',
      ],
    };
    return industryMap[companyType as keyof typeof industryMap] || [];
  };

  // Step Configuration
  const steps = [
    { id: 'welcome', title: 'Welcome', description: 'Get started with TMS' },
    {
      id: 'service-provider-welcome',
      title: 'Service Provider Welcome',
      description: 'Specialized registration for service providers',
    },
    { id: 'company-info', title: 'Company Info', description: 'Tell us about your company' },
    { id: 'user-details', title: 'User Details', description: 'Your personal information' },
    {
      id: 'role-selection',
      title: 'Role Selection',
      description: 'Choose your role and functions',
    },
    {
      id: 'lines-of-business',
      title: 'Lines of Business',
      description: 'Select your transportation services',
    },
    { id: 'subscription', title: 'Subscription', description: 'Select your plan' },
    { id: 'verification', title: 'Verification', description: 'Verify your information' },
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
      // Submit registration data to backend
      const response = await fetch('/api/registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });

      if (response.ok) {
        setCurrentStep('approval-pending');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render Welcome Step
  const renderWelcomeStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
        <Truck className="w-10 h-10 text-white" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to TMS</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">Transportation Management System</p>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What is TMS?</h3>
        <p className="text-blue-800 dark:text-blue-200 text-sm">
          TMS is a comprehensive transportation management system that helps shippers, brokers,
          carriers, and owner operators manage their logistics operations efficiently.
        </p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Who Can Use TMS?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Shipper</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Companies that ship goods</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Broker</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Freight brokers connecting shippers and carriers
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Carrier</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Trucking companies with large fleets
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Owner Operator</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Small fleet owners (1-5 trucks)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-4">
          Service Providers
        </h3>
        <p className="text-purple-800 dark:text-purple-200 text-sm mb-4">
          Companies that provide support services to the transportation industry
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
              <Package className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">Warehousing & 3PL</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <Ship className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">Freight Forwarding</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center">
              <CreditCard className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">Insurance Services</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
              <Truck className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">Fleet Services</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
              <BarChart3 className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">
              Technology Solutions
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-500 rounded flex items-center justify-center">
              <Users className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">
              Consulting Services
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-teal-500 rounded flex items-center justify-center">
              <Link className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">Customs Brokerage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
              <CarIcon className="w-2 h-2 text-white" />
            </div>
            <span className="text-sm text-purple-800 dark:text-purple-200">
              Truck Maintenance & Repair
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border">
          <Package className="w-8 h-8 text-blue-500" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Load Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Track and manage shipments</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border">
          <Truck className="w-8 h-8 text-green-500" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Fleet Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage vehicles and drivers</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border">
          <DollarSign className="w-8 h-8 text-purple-500" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Financial Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Handle billing and payments</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg border">
          <Users className="w-8 h-8 text-orange-500" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Network Management</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Connect with partners</p>
          </div>
        </div>
      </div>

      {/* Service Provider Notice */}
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
              Are you a Service Provider?
            </h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
              If you provide support services to the transportation industry (warehousing,
              insurance, maintenance, etc.), we have a specialized registration process for you.
            </p>
            <button
              onClick={() => setCurrentStep('service-provider-welcome')}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
            >
              Continue as Service Provider →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Service Provider Welcome Step
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
          {registrationData.serviceProviderServices.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {registrationData.serviceProviderServices.map(service => (
                <span
                  key={service}
                  className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded text-xs"
                >
                  {
                    [
                      { id: 'warehousing_3pl', name: '3PL' },
                      { id: 'freight_forwarding', name: 'Forwarding' },
                      { id: 'insurance_services', name: 'Insurance' },
                      { id: 'fleet_services', name: 'Fleet' },
                      { id: 'technology_solutions', name: 'Tech' },
                      { id: 'consulting_services', name: 'Consulting' },
                      { id: 'customs_brokerage', name: 'Customs' },
                      { id: 'truck_maintenance', name: 'Maintenance' },
                    ].find(s => s.id === service)?.name
                  }
                </span>
              ))}
            </div>
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Company Information
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your company to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            value={registrationData.companyName}
            onChange={e => setRegistrationData(prev => ({ ...prev, companyName: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Type *
          </label>
          <select
            value={registrationData.companyType}
            onChange={e =>
              setRegistrationData(prev => ({
                ...prev,
                companyType: e.target.value as
                  | 'shipper'
                  | 'broker'
                  | 'carrier'
                  | 'owner_operator'
                  | 'service_provider',
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="shipper">Shipper - Companies that ship goods</option>
            <option value="broker">
              Broker - Freight brokers connecting shippers and carriers
            </option>
            <option value="carrier">Carrier - Trucking companies with large fleets</option>
            <option value="owner_operator">Owner Operator - Small fleet owners (1-5 trucks)</option>
            <option value="service_provider">
              Service Provider - Support services for transportation industry
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Industry
          </label>
          <select
            value={registrationData.industry}
            onChange={e => setRegistrationData(prev => ({ ...prev, industry: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select industry</option>
            {getIndustryOptions(registrationData.companyType).map(industry => (
              <option key={industry} value={industry.toLowerCase().replace(/[^a-z0-9]/g, '_')}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Size
          </label>
          <select
            value={registrationData.companySize}
            onChange={e =>
              setRegistrationData(prev => ({
                ...prev,
                companySize: e.target.value as '1-10' | '11-50' | '51-200' | '201-1000' | '1000+',
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-1000">201-1000 employees</option>
            <option value="1000+">1000+ employees</option>
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://yourcompany.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subdomain
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg dark:bg-gray-600 dark:text-gray-400">
              https://
            </span>
            <input
              type="text"
              value={registrationData.subdomain}
              onChange={e =>
                setRegistrationData(prev => ({
                  ...prev,
                  subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''),
                }))
              }
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="yourcompany"
            />
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-lg dark:bg-gray-600 dark:text-gray-400">
              .transbotai.com
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Choose a unique subdomain for your TMS portal (letters, numbers, and hyphens only)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={registrationData.phone}
            onChange={e => setRegistrationData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Address *
        </label>
        <input
          type="text"
          value={registrationData.address}
          onChange={e => setRegistrationData(prev => ({ ...prev, address: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="123 Main Street"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={registrationData.city}
            onChange={e => setRegistrationData(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            State *
          </label>
          <input
            type="text"
            value={registrationData.state}
            onChange={e => setRegistrationData(prev => ({ ...prev, state: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ZIP Code *
          </label>
          <input
            type="text"
            value={registrationData.zipCode}
            onChange={e => setRegistrationData(prev => ({ ...prev, zipCode: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="12345"
          />
        </div>
      </div>

      {/* Company Type Specific Fields */}
      {(registrationData.companyType === 'carrier' ||
        registrationData.companyType === 'broker') && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Regulatory Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                MC Number
              </label>
              <input
                type="text"
                value={registrationData.mcNumber}
                onChange={e => setRegistrationData(prev => ({ ...prev, mcNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., MC-123456"
              />
            </div>

            {registrationData.companyType === 'carrier' && (
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
                  className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 123456"
                />
              </div>
            )}

            {registrationData.companyType === 'broker' && (
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
                  className="w-full px-3 py-2 border border-blue-300 dark:border-blue-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., BL-123456"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {(registrationData.companyType === 'carrier' ||
        registrationData.companyType === 'owner_operator') && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
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
                className="w-full px-3 py-2 border border-green-300 dark:border-green-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select fleet size</option>
                {registrationData.companyType === 'owner_operator' ? (
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
                className="w-full px-3 py-2 border border-green-300 dark:border-green-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
        <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
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
                value={registrationData.mcNumber}
                onChange={e => setRegistrationData(prev => ({ ...prev, mcNumber: e.target.value }))}
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., SL-123456"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Years in Business
              </label>
              <select
                value={registrationData.fleetSize}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, fleetSize: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                value={registrationData.operatingRadius}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, operatingRadius: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select coverage area</option>
                <option value="local">Local (within 100 miles)</option>
                <option value="regional">Regional (100-500 miles)</option>
                <option value="national">National (500+ miles)</option>
                <option value="international">International</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                Number of Clients
              </label>
              <select
                value={registrationData.dotNumber}
                onChange={e =>
                  setRegistrationData(prev => ({ ...prev, dotNumber: e.target.value }))
                }
                className="w-full px-3 py-2 border border-purple-300 dark:border-purple-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
    </div>
  );

  // Render Role Selection Step
  const renderRoleSelectionStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Role Selection</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Your role is automatically set based on your company type
        </p>
      </div>

      {/* Auto-selected Role based on Company Type */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              {registrationData.companyType === 'service_provider'
                ? 'Service Provider'
                : registrationData.companyType
                    .replace('_', ' ')
                    .replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              {registrationData.companyType === 'service_provider'
                ? (() => {
                    const serviceName = registrationData.primaryServiceProviderService
                      ? [
                          { id: 'warehousing_3pl', name: 'Warehousing & 3PL' },
                          { id: 'freight_forwarding', name: 'Freight Forwarding' },
                          { id: 'insurance_services', name: 'Insurance Services' },
                          { id: 'fleet_services', name: 'Fleet Services' },
                          { id: 'technology_solutions', name: 'Technology Solutions' },
                          { id: 'consulting_services', name: 'Consulting Services' },
                          { id: 'customs_brokerage', name: 'Customs Brokerage' },
                          { id: 'truck_maintenance', name: 'Truck Maintenance & Repair' },
                        ].find(s => s.id === registrationData.primaryServiceProviderService)
                          ?.name || 'Not selected'
                      : 'Not selected';
                    return `Primary Service: ${serviceName}`;
                  })()
                : `Role automatically selected based on your company type: ${registrationData.companyName}`}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Required Functions
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Choose the TMS functions you need for your business operations. You can change these later
          in settings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'load_management',
              name: 'Load Management',
              description: 'Track and manage shipments, loads, and deliveries',
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
              description: 'Handle billing, invoicing, and financial tracking',
              icon: DollarSign,
              recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
            },
            {
              id: 'communication_hub',
              name: 'Communication Hub',
              description: 'Centralized messaging and communication tools',
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
              description: 'Network with other logistics companies',
              icon: Users,
              recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
            },
            {
              id: 'rate_management',
              name: 'Rate Management',
              description: 'Manage pricing, rates, and cost calculations',
              icon: Calculator,
              recommended: ['broker', 'carrier', 'owner_operator', 'service_provider'],
            },
            {
              id: 'freight_marketplace',
              name: 'Freight Marketplace',
              description: 'Buy and sell freight capacity',
              icon: ShoppingCart,
              recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
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
              description: 'CRM tools for managing customer relationships',
              icon: UserCheck,
              recommended: ['shipper', 'broker', 'carrier', 'owner_operator', 'service_provider'],
            },
            {
              id: 'load_board',
              name: 'Load Board',
              description: 'Find and post available loads',
              icon: ClipboardList,
              recommended: ['broker', 'carrier', 'owner_operator', 'service_provider'],
            },
            {
              id: 'factoring_services',
              name: 'Factoring Services',
              description: 'Invoice factoring and cash flow management',
              icon: CreditCard,
              recommended: ['carrier', 'owner_operator', 'service_provider'],
            },
            {
              id: 'service_provider_tools',
              name: 'Service Provider Tools',
              description: 'Specialized tools for service providers and business directory',
              icon: Users,
              recommended: ['service_provider'],
            },
            {
              id: 'client_management',
              name: 'Client Management',
              description: 'Manage relationships with transportation companies',
              icon: UserCheck,
              recommended: ['service_provider'],
            },
            {
              id: 'service_catalog',
              name: 'Service Catalog',
              description: 'Showcase and manage your service offerings',
              icon: Package,
              recommended: ['service_provider'],
            },
          ].map(functionItem => {
            const isRecommended = functionItem.recommended.includes(registrationData.companyType);
            const isSelected = registrationData.requestedFunctions.includes(functionItem.id);

            return (
              <label
                key={functionItem.id}
                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={e => {
                    if (e.target.checked) {
                      setRegistrationData(prev => ({
                        ...prev,
                        requestedFunctions: [...prev.requestedFunctions, functionItem.id],
                      }));
                    } else {
                      setRegistrationData(prev => ({
                        ...prev,
                        requestedFunctions: prev.requestedFunctions.filter(
                          f => f !== functionItem.id
                        ),
                      }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <functionItem.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {functionItem.name}
                    </span>
                    {isRecommended && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {functionItem.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Selected Functions:</strong> {registrationData.requestedFunctions.length} of 15
            functions selected
          </p>
          {registrationData.requestedFunctions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {registrationData.requestedFunctions.map(func => (
                <span
                  key={func}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                >
                  {func.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Approval Pending Step
  const renderApprovalPendingStep = () => (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto">
        <Clock className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Approval Pending</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Your registration is under review
        </p>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
          What happens next?
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              Our team reviews your company information
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              We verify your business credentials
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <p className="text-yellow-800 dark:text-yellow-200 text-sm">
              You receive an approval email with login credentials
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Registration Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Company:</strong> {registrationData.companyName}
            </p>
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Role:</strong> {registrationData.primaryRole.replace('_', ' ')}
            </p>
          </div>
          <div>
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Email:</strong> {registrationData.email}
            </p>
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Functions:</strong> {registrationData.requestedFunctions.length} selected
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Website
        </a>
      </div>
    </div>
  );

  // Render User Details Step
  const renderUserDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">User Details</h2>
        <p className="text-gray-600 dark:text-gray-400">Tell us about yourself</p>
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your first name"
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your last name"
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            value={registrationData.userPhone}
            onChange={e => setRegistrationData(prev => ({ ...prev, userPhone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Title
          </label>
          <input
            type="text"
            value={registrationData.jobTitle}
            onChange={e => setRegistrationData(prev => ({ ...prev, jobTitle: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Logistics Manager, Operations Director"
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
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Operations, Sales, IT"
          />
        </div>
      </div>
    </div>
  );

  // Render Lines of Business Step
  const renderLinesOfBusinessStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Lines of Business</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select the transportation services your company provides
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Select Your Transportation Services
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Choose all the services you offer. You can select multiple services and designate one as
          primary.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              id: 'ftl',
              name: 'Full Truckload (FTL)',
              description: 'Complete truckload shipments for single customers',
              icon: Truck,
              recommended: ['carrier', 'owner_operator'],
            },
            {
              id: 'ltl',
              name: 'Less Than Truckload (LTL)',
              description: 'Partial truckload shipments combining multiple customers',
              icon: Package,
              recommended: ['carrier', 'broker'],
            },
            {
              id: 'intermodal',
              name: 'Intermodal',
              description: 'Multi-modal transportation using containers',
              icon: Train,
              recommended: ['carrier', 'broker'],
            },
            {
              id: 'drayage',
              name: 'Drayage',
              description: 'Short-distance container transport to/from ports',
              icon: CarIcon,
              recommended: ['carrier', 'owner_operator'],
            },
            {
              id: 'ocean_freight',
              name: 'Ocean Freight',
              description: 'International shipping via ocean vessels',
              icon: Ship,
              recommended: ['broker', 'carrier'],
            },
            {
              id: 'parcel_courier',
              name: 'Parcel / Courier Shipping',
              description: 'Small package and document delivery services',
              icon: Package2,
              recommended: ['carrier', 'broker'],
            },
            {
              id: 'vehicle_transport',
              name: 'Vehicle Transport (Auto Hauling)',
              description: 'Specialized transport of vehicles and automobiles',
              icon: CarIcon,
              recommended: ['carrier', 'owner_operator'],
            },
          ].map(service => {
            const isRecommended = service.recommended.includes(registrationData.companyType);
            const isSelected = registrationData.linesOfBusiness.includes(service.id);
            const isPrimary = registrationData.primaryLineOfBusiness === service.id;

            return (
              <label
                key={service.id}
                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
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
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <service.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </span>
                    {isRecommended && (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                        Recommended
                      </span>
                    )}
                    {isPrimary && (
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {service.description}
                  </p>
                  {isSelected && (
                    <button
                      type="button"
                      onClick={e => {
                        e.preventDefault();
                        setRegistrationData(prev => ({
                          ...prev,
                          primaryLineOfBusiness:
                            prev.primaryLineOfBusiness === service.id ? '' : service.id,
                        }));
                      }}
                      className={`text-xs px-2 py-1 rounded transition-colors ${
                        isPrimary
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-blue-100 hover:text-blue-800'
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

        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Selected Services:</strong> {registrationData.linesOfBusiness.length} of 7
            services selected
          </p>
          {registrationData.primaryLineOfBusiness && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              <strong>Primary Service:</strong>{' '}
              {
                [
                  { id: 'ftl', name: 'Full Truckload (FTL)' },
                  { id: 'ltl', name: 'Less Than Truckload (LTL)' },
                  { id: 'intermodal', name: 'Intermodal' },
                  { id: 'drayage', name: 'Drayage' },
                  { id: 'ocean_freight', name: 'Ocean Freight' },
                  { id: 'parcel_courier', name: 'Parcel / Courier Shipping' },
                  { id: 'vehicle_transport', name: 'Vehicle Transport (Auto Hauling)' },
                ].find(s => s.id === registrationData.primaryLineOfBusiness)?.name
              }
            </p>
          )}
          {registrationData.linesOfBusiness.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {registrationData.linesOfBusiness.map(service => (
                <span
                  key={service}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs"
                >
                  {
                    [
                      { id: 'ftl', name: 'FTL' },
                      { id: 'ltl', name: 'LTL' },
                      { id: 'intermodal', name: 'Intermodal' },
                      { id: 'drayage', name: 'Drayage' },
                      { id: 'ocean_freight', name: 'Ocean' },
                      { id: 'parcel_courier', name: 'Parcel' },
                      { id: 'vehicle_transport', name: 'Auto Haul' },
                    ].find(s => s.id === service)?.name
                  }
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render Subscription Step
  const renderSubscriptionStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Choose Your Plan</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Select the subscription plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            id: 'free',
            name: 'Free',
            price: '$0',
            period: 'month',
            description: 'Perfect for small businesses getting started',
            features: [
              'Up to 5 users',
              'Basic load management',
              'Email support',
              'Standard reporting',
            ],
            popular: false,
          },
          {
            id: 'professional',
            name: 'Professional',
            price: '$99',
            period: 'month',
            description: 'Ideal for growing logistics companies',
            features: [
              'Up to 25 users',
              'Advanced load management',
              'Fleet tracking',
              'Priority support',
              'Custom reporting',
              'API access',
            ],
            popular: true,
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            price: '$299',
            period: 'month',
            description: 'For large organizations with complex needs',
            features: [
              'Unlimited users',
              'Full TMS suite',
              'Advanced analytics',
              '24/7 support',
              'Custom integrations',
              'Dedicated account manager',
            ],
            popular: false,
          },
          {
            id: 'custom',
            name: 'Custom',
            price: 'Contact',
            period: 'us',
            description: 'Tailored solutions for unique requirements',
            features: [
              'Custom features',
              'On-premise deployment',
              'White-label options',
              'Dedicated support team',
              'Custom training',
              'SLA guarantees',
            ],
            popular: false,
          },
        ].map(plan => (
          <button
            key={plan.id}
            onClick={() =>
              setRegistrationData(prev => ({
                ...prev,
                subscriptionType: plan.id as SubscriptionType,
              }))
            }
            className={`relative p-6 border rounded-lg text-left transition-all ${
              registrationData.subscriptionType === plan.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            } ${plan.popular ? 'ring-2 ring-yellow-400' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 text-xs font-medium rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-gray-600 dark:text-gray-400 ml-1">/{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{plan.description}</p>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Billing Cycle
          </label>
          <select
            value={registrationData.billingCycle}
            onChange={e =>
              setRegistrationData(prev => ({
                ...prev,
                billingCycle: e.target.value as 'monthly' | 'yearly',
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly (Save 20%)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Payment Method
          </label>
          <select
            value={registrationData.paymentMethod}
            onChange={e =>
              setRegistrationData(prev => ({
                ...prev,
                paymentMethod: e.target.value as 'credit_card' | 'bank_transfer' | 'invoice',
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="invoice">Invoice</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Render Verification Step
  const renderVerificationStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verification</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Verify your information and complete the registration
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
          Registration Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              Company Information
            </h4>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <p>
                <strong>Company:</strong> {registrationData.companyName}
              </p>
              <p>
                <strong>Type:</strong> {registrationData.companyType.replace('_', ' ')}
              </p>
              <p>
                <strong>Industry:</strong> {registrationData.industry || 'Not specified'}
              </p>
              <p>
                <strong>Size:</strong> {registrationData.companySize} employees
              </p>
              <p>
                <strong>Website:</strong> {registrationData.website || 'Not provided'}
              </p>
              <p>
                <strong>Subdomain:</strong>{' '}
                {registrationData.subdomain
                  ? `https://${registrationData.subdomain}.transbotai.com`
                  : 'Not provided'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">User Information</h4>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <p>
                <strong>Name:</strong> {registrationData.firstName} {registrationData.lastName}
              </p>
              <p>
                <strong>Email:</strong> {registrationData.email}
              </p>
              <p>
                <strong>Phone:</strong> {registrationData.userPhone}
              </p>
              <p>
                <strong>Job Title:</strong> {registrationData.jobTitle || 'Not specified'}
              </p>
              <p>
                <strong>Department:</strong> {registrationData.department || 'Not specified'}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Role & Functions</h4>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <p>
                <strong>Primary Role:</strong> {registrationData.primaryRole.replace('_', ' ')}
              </p>
              <p>
                <strong>Functions:</strong> {registrationData.requestedFunctions.length} selected
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                {registrationData.requestedFunctions.map(func => (
                  <span
                    key={func}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs"
                  >
                    {func.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {registrationData.companyType === 'service_provider' ? (
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Service Provider Services
              </h4>
              <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <p>
                  <strong>Services:</strong> {registrationData.serviceProviderServices.length}{' '}
                  selected
                </p>
                {registrationData.primaryServiceProviderService && (
                  <p>
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
                <div className="flex flex-wrap gap-1 mt-1">
                  {registrationData.serviceProviderServices.map(service => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded text-xs"
                    >
                      {
                        [
                          { id: 'warehousing_3pl', name: '3PL' },
                          { id: 'freight_forwarding', name: 'Forwarding' },
                          { id: 'insurance_services', name: 'Insurance' },
                          { id: 'fleet_services', name: 'Fleet' },
                          { id: 'technology_solutions', name: 'Tech' },
                          { id: 'consulting_services', name: 'Consulting' },
                          { id: 'customs_brokerage', name: 'Customs' },
                          { id: 'truck_maintenance', name: 'Maintenance' },
                        ].find(s => s.id === service)?.name
                      }
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                Lines of Business
              </h4>
              <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <p>
                  <strong>Services:</strong> {registrationData.linesOfBusiness.length} selected
                </p>
                {registrationData.primaryLineOfBusiness && (
                  <p>
                    <strong>Primary Service:</strong>{' '}
                    {
                      [
                        { id: 'ftl', name: 'Full Truckload (FTL)' },
                        { id: 'ltl', name: 'Less Than Truckload (LTL)' },
                        { id: 'intermodal', name: 'Intermodal' },
                        { id: 'drayage', name: 'Drayage' },
                        { id: 'ocean_freight', name: 'Ocean Freight' },
                        { id: 'parcel_courier', name: 'Parcel / Courier Shipping' },
                        { id: 'vehicle_transport', name: 'Vehicle Transport (Auto Hauling)' },
                      ].find(s => s.id === registrationData.primaryLineOfBusiness)?.name
                    }
                  </p>
                )}
                <div className="flex flex-wrap gap-1 mt-1">
                  {registrationData.linesOfBusiness.map(service => (
                    <span
                      key={service}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded text-xs"
                    >
                      {
                        [
                          { id: 'ftl', name: 'FTL' },
                          { id: 'ltl', name: 'LTL' },
                          { id: 'intermodal', name: 'Intermodal' },
                          { id: 'drayage', name: 'Drayage' },
                          { id: 'ocean_freight', name: 'Ocean' },
                          { id: 'parcel_courier', name: 'Parcel' },
                          { id: 'vehicle_transport', name: 'Auto Haul' },
                        ].find(s => s.id === service)?.name
                      }
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Subscription</h4>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <p>
                <strong>Plan:</strong> {registrationData.subscriptionType}
              </p>
              <p>
                <strong>Billing:</strong> {registrationData.billingCycle}
              </p>
              <p>
                <strong>Payment:</strong> {registrationData.paymentMethod.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Verification Checklist
        </h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={registrationData.emailVerified}
              onChange={e =>
                setRegistrationData(prev => ({ ...prev, emailVerified: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I confirm that my email address is correct and I will receive notifications
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={registrationData.phoneVerified}
              onChange={e =>
                setRegistrationData(prev => ({ ...prev, phoneVerified: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I confirm that my phone number is correct and I can be reached
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={registrationData.documentsUploaded}
              onChange={e =>
                setRegistrationData(prev => ({ ...prev, documentsUploaded: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I will provide required business documents during the approval process
            </span>
          </label>

          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={registrationData.complianceChecked}
              onChange={e =>
                setRegistrationData(prev => ({ ...prev, complianceChecked: e.target.checked }))
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              I agree to comply with all applicable regulations and terms of service
            </span>
          </label>
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
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Step {currentStep} is under development.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  TMS Registration
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get started with TMS</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
              <a
                href="/"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                ← Back to Website
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStepIndex
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
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
        {currentStep !== 'approval-pending' && (
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-3">
              {currentStep === 'verification' ? (
                <button
                  onClick={handleSubmit}
                  disabled={
                    isLoading ||
                    !registrationData.emailVerified ||
                    !registrationData.phoneVerified ||
                    !registrationData.documentsUploaded ||
                    !registrationData.complianceChecked
                  }
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span>Submit Registration</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default RegistrationFlow;
