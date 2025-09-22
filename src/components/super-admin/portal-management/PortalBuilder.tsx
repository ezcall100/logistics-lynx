import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Truck,
  Package,
  User,
  Building,
  DollarSign,
  Users,
  Globe,
  Calculator,
  Search,
  Warehouse,
  Ship,
  Shield,
  Wrench,
  Cpu,
  Briefcase,
  CreditCard,
  Grid3X3,
  Server,
  Car,
  Fuel,
  GraduationCap,
  Award,
  Route,
  BarChart3,
  Leaf,
  Brain,
  Link,
  Wifi,
  MapPin,
  Plane,
  Clipboard,
  Settings,
  Eye,
  Edit,
  Save,
  X,
  Layout,
  Smartphone,
  Monitor,
  Tablet,
  Target,
  Bell,
  MessageSquare,
  FileText,
  MoreVertical,
  Trash2,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from "lucide-react";

// Types
interface PortalTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  status: 'active' | 'beta' | 'coming-soon';
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
  isCustom?: boolean;
  author?: string;
  version?: string;
  tags?: string[];
  previewImage?: string;
}

interface PortalConfig {
  name: string;
  theme: string;
  layout: string;
  features: string[];
  branding: {
    logo: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

const PortalBuilder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<PortalTemplate | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [portalConfig, setPortalConfig] = useState<PortalConfig>({
    name: '',
    theme: 'blue',
    layout: 'modern',
    features: [],
    branding: {
      logo: '',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF'
    }
  });

  // CRUD Modal States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<PortalTemplate | null>(null);
  const [viewingTemplate, setViewingTemplate] = useState<PortalTemplate | null>(null);
  const [deletingTemplateId, setDeletingTemplateId] = useState<string | null>(null);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<{ id: string; type: string; title: string; message: string; timestamp: string }[]>([]);

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'logistics', name: 'Logistics' },
    { id: 'operations', name: 'Operations' },
    { id: 'finance', name: 'Finance' },
    { id: 'marketplace', name: 'Marketplace' },
    { id: 'technology', name: 'Technology' },
    { id: 'sales', name: 'Sales' },
    { id: 'services', name: 'Services' },
    { id: 'compliance', name: 'Compliance' },
    { id: 'training', name: 'Training' },
    { id: 'sustainability', name: 'Sustainability' }
  ];

  // Notification system
  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string): void => {
    const notification = {
      id: Date.now().toString(), type, title, message, timestamp: new Date().toISOString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== notification.id)), 5000);
  };

  // CRUD Functions for Portal Templates
  const handleCreateTemplate = (data: Partial<PortalTemplate>) => {
    const newTemplate: PortalTemplate = {
      id: `template-${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      icon: data.icon || Settings,
      category: data.category || 'logistics',
      status: 'active',
      features: data.features || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCustom: true,
      author: 'Current User',
      version: '1.0.0',
      tags: data.tags || [],
      previewImage: data.previewImage || ''
    };
    // In a real app, this would update the templates array
    addNotification('success', 'Template Created', `${newTemplate.name} has been successfully created`);
    setShowCreateModal(false);
  };

  const handleEditTemplate = (template: PortalTemplate) => {
    setEditingTemplate(template);
    setShowEditModal(true);
  };

  const handleUpdateTemplate = (data: Partial<PortalTemplate>) => {
    if (!editingTemplate) return;
    const updatedTemplate = {
      ...editingTemplate,
      ...data,
      updatedAt: new Date().toISOString()
    };
    // In a real app, this would update the templates array
    addNotification('success', 'Template Updated', `${updatedTemplate.name} has been successfully updated`);
    setShowEditModal(false);
    setEditingTemplate(null);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = portalTemplates.find(t => t.id === templateId);
    if (!template) return;
    setDeletingTemplateId(templateId);
    setShowDeleteModal(true);
  };

  const confirmDeleteTemplate = () => {
    if (!deletingTemplateId) return;
    const template = portalTemplates.find(t => t.id === deletingTemplateId);
    if (template) {
      // In a real app, this would remove from templates array
      addNotification('success', 'Template Deleted', `${template.name} has been successfully deleted`);
    }
    setShowDeleteModal(false);
    setDeletingTemplateId(null);
  };

  const handleViewTemplate = (template: PortalTemplate) => {
    setViewingTemplate(template);
    setShowViewModal(true);
  };

  // Action Menu Functions
  const toggleActionMenu = (templateId: string) => {
    setShowActionMenu(showActionMenu === templateId ? null : templateId);
  };

  const handleCreateClick = () => {
    setEditingTemplate(null);
    setShowCreateModal(true);
  };

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.action-menu')) {
        setShowActionMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const portalTemplates: PortalTemplate[] = [
    // Core Logistics Portals
    {
      id: 'broker',
      name: 'Broker Portal',
      description: 'Comprehensive freight brokerage management system',
      icon: Building,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'shipper',
      name: 'Shipper Portal',
      description: 'Advanced shipping and logistics coordination platform',
      icon: Package,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'carrier',
      name: 'Carrier Portal',
      description: 'Fleet management and load optimization system',
      icon: Truck,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'driver',
      name: 'Driver Portal',
      description: 'Mobile-first driver experience and trip management',
      icon: User,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'owner-operator',
      name: 'Owner Operator Portal',
      description: 'Business management for independent truck owners',
      icon: Car,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'yms',
      name: 'YMS (Yard Management)',
      description: 'Comprehensive yard and dock management system',
      icon: Warehouse,
      category: 'operations',
      status: 'active'
    },
    {
      id: 'rates',
      name: 'Rates Management',
      description: 'Dynamic pricing and rate optimization platform',
      icon: DollarSign,
      category: 'finance',
      status: 'active'
    },
    {
      id: 'marketplace',
      name: 'Marketplace Portal',
      description: 'Digital freight marketplace and load board',
      icon: Globe,
      category: 'marketplace',
      status: 'active'
    },
    {
      id: 'edi',
      name: 'EDI Integration Portal',
      description: 'Electronic data interchange and automation hub',
      icon: Server,
      category: 'technology',
      status: 'active'
    },
    {
      id: 'financials',
      name: 'Financial Management',
      description: 'Comprehensive financial tracking and accounting',
      icon: Calculator,
      category: 'finance',
      status: 'active'
    },
    {
      id: 'crm',
      name: 'CRM Portal',
      description: 'Customer relationship management for logistics',
      icon: Users,
      category: 'sales',
      status: 'active'
    },
    {
      id: 'load-board',
      name: 'Load Board Portal',
      description: 'Digital load board for freight matching',
      icon: Grid3X3,
      category: 'marketplace',
      status: 'active'
    },
    {
      id: 'factoring',
      name: 'Factoring Portal',
      description: 'Invoice factoring and cash flow management',
      icon: CreditCard,
      category: 'finance',
      status: 'active'
    },
    {
      id: 'autonomous',
      name: 'Autonomous Fleet Portal',
      description: 'Management system for autonomous vehicles',
      icon: Cpu,
      category: 'technology',
      status: 'beta'
    },
    // Extended Service Portals
    {
      id: 'warehousing-3pl',
      name: 'Warehousing & 3PL Portal',
      description: 'Third-party logistics and warehouse management',
      icon: Warehouse,
      category: 'services',
      status: 'active'
    },
    {
      id: 'freight-forwarding',
      name: 'Freight Forwarding Portal',
      description: 'International freight forwarding and customs',
      icon: Ship,
      category: 'services',
      status: 'active'
    },
    {
      id: 'insurance-services',
      name: 'Insurance Services Portal',
      description: 'Transportation insurance and risk management',
      icon: Shield,
      category: 'services',
      status: 'active'
    },
    {
      id: 'fleet-services',
      name: 'Fleet Services Portal',
      description: 'Comprehensive fleet maintenance and management',
      icon: Wrench,
      category: 'services',
      status: 'active'
    },
    {
      id: 'technology-solutions',
      name: 'Technology Solutions Portal',
      description: 'IT and technology services for logistics companies',
      icon: Cpu,
      category: 'technology',
      status: 'active'
    },
    {
      id: 'consulting-services',
      name: 'Consulting Services Portal',
      description: 'Logistics consulting and advisory services',
      icon: Briefcase,
      category: 'services',
      status: 'active'
    },
    {
      id: 'customs-brokerage',
      name: 'Customs Brokerage Portal',
      description: 'Customs clearance and international trade compliance',
      icon: Clipboard,
      category: 'compliance',
      status: 'active'
    },
    {
      id: 'truck-maintenance',
      name: 'Truck Maintenance & Repair Portal',
      description: 'Specialized truck maintenance and repair services',
      icon: Settings,
      category: 'services',
      status: 'active'
    },
    // Creative Additions
    {
      id: 'fuel-management',
      name: 'Fuel Management Portal',
      description: 'Fuel procurement, tracking, and optimization',
      icon: Fuel,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'driver-training',
      name: 'Driver Training Portal',
      description: 'Driver education, certification, and compliance',
      icon: GraduationCap,
      category: 'training',
      status: 'active'
    },
    {
      id: 'safety-compliance',
      name: 'Safety & Compliance Portal',
      description: 'Safety management and regulatory compliance',
      icon: Award,
      category: 'compliance',
      status: 'active'
    },
    {
      id: 'route-optimization',
      name: 'Route Optimization Portal',
      description: 'Advanced route planning and optimization platform',
      icon: Route,
      category: 'technology',
      status: 'active'
    },
    {
      id: 'supply-chain-visibility',
      name: 'Supply Chain Visibility Portal',
      description: 'End-to-end supply chain tracking and visibility',
      icon: BarChart3,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'carbon-footprint',
      name: 'Carbon Footprint Portal',
      description: 'Environmental impact tracking and sustainability',
      icon: Leaf,
      category: 'sustainability',
      status: 'active'
    },
    {
      id: 'predictive-analytics',
      name: 'Predictive Analytics Portal',
      description: 'AI-powered predictive analytics for logistics',
      icon: Brain,
      category: 'technology',
      status: 'beta'
    },
    {
      id: 'blockchain-logistics',
      name: 'Blockchain Logistics Portal',
      description: 'Blockchain-based supply chain transparency',
      icon: Link,
      category: 'technology',
      status: 'beta'
    },
    {
      id: 'iot-fleet-monitoring',
      name: 'IoT Fleet Monitoring Portal',
      description: 'Internet of Things fleet monitoring and management',
      icon: Wifi,
      category: 'technology',
      status: 'active'
    },
    {
      id: 'last-mile-delivery',
      name: 'Last Mile Delivery Portal',
      description: 'Optimized last-mile delivery and customer experience',
      icon: MapPin,
      category: 'logistics',
      status: 'active'
    },
    {
      id: 'cross-border-logistics',
      name: 'Cross-Border Logistics Portal',
      description: 'International shipping and cross-border logistics',
      icon: Plane,
      category: 'logistics',
      status: 'active'
    }
  ];

  const filteredTemplates = portalTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: PortalTemplate) => {
    setSelectedTemplate(template);
    setPortalConfig(prev => ({
      ...prev,
      name: template.name,
      features: template.features || []
    }));
    setShowSetup(true);
  };

  const handlePreview = (template: PortalTemplate) => {
    setSelectedTemplate(template);
    setShowPreview(true);
  };

  const handleCustomize = (template: PortalTemplate) => {
    setSelectedTemplate(template);
    setPortalConfig(prev => ({
      ...prev,
      name: template.name,
      features: template.features || []
    }));
    setShowSetup(true);
  };

  const handleSavePortal = () => {
    // Save portal configuration
    console.log('Saving portal:', portalConfig);
    setShowSetup(false);
    // Show success message
  };

  const renderPreviewFrame = () => {
    const previewSizes: Record<string, string> = {
      desktop: 'w-full h-[700px]',
      tablet: 'w-[768px] h-[700px] mx-auto',
      mobile: 'w-[375px] h-[700px] mx-auto'
    };

    const IconComponent = selectedTemplate?.icon;
    const themeColors = {
      blue: 'bg-blue-600',
      green: 'bg-green-600',
      purple: 'bg-purple-600',
      red: 'bg-red-600',
      orange: 'bg-orange-600',
      gray: 'bg-gray-600'
    };

    const headerColor = themeColors[portalConfig.theme as keyof typeof themeColors] || 'bg-blue-600';

    return (
      <div className={`bg-gray-800 rounded-lg p-4 ${previewSizes[previewMode]}`}>
        <div className="bg-gray-900 rounded-lg h-full overflow-hidden shadow-2xl border border-gray-700">
          {/* Mock Header - Super Admin Style */}
          <div className={`${headerColor} text-white p-4 flex items-center justify-between border-b border-gray-700`}>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                {IconComponent && <IconComponent className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedTemplate?.name}</h3>
                <p className="text-white/80 text-sm">Portal Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold">U</span>
              </div>
            </div>
          </div>
          
          {/* Mock Sidebar */}
          <div className="flex h-full">
            <div className="w-64 bg-gray-800 border-r border-gray-700 p-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-purple-600 text-white">
                  <div className="w-4 h-4 bg-white/20 rounded"></div>
                  <span className="text-sm font-medium">Dashboard</span>
                </div>
                {['Analytics', 'Reports', 'Settings', 'Users'].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-lg text-gray-300 hover:bg-gray-700">
                    <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mock Content Area */}
            <div className="flex-1 p-6">
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="w-16 h-4 bg-gray-600 rounded mb-2"></div>
                          <div className="w-12 h-3 bg-gray-600 rounded"></div>
                        </div>
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="w-24 h-4 bg-gray-600 rounded mb-4"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                          <div className="w-6 h-6 bg-gray-600 rounded"></div>
                          <div className="flex-1">
                            <div className="w-20 h-3 bg-gray-600 rounded mb-1"></div>
                            <div className="w-16 h-2 bg-gray-600 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <div className="w-20 h-4 bg-gray-600 rounded mb-4"></div>
                    <div className="space-y-2">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex items-center justify-between p-2 bg-gray-700 rounded">
                          <div className="w-16 h-3 bg-gray-600 rounded"></div>
                          <div className="w-8 h-3 bg-gray-600 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portal Builder</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Create and customize portal templates with live preview</p>
        </div>
        <button 
          onClick={handleCreateClick}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Create Template</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search portal templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{template.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      template.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      template.status === 'beta' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {template.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{template.description}</p>
              
              <div className="space-y-2">
                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Category</h4>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                  {categories.find(cat => cat.id === template.category)?.name || template.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2 flex-1">
                  <button
                    onClick={() => handleViewTemplate(template)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                </div>
                
                {/* Three-dot menu */}
                <div className="relative action-menu ml-2">
                  <button
                    onClick={() => toggleActionMenu(template.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    title="More Actions"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                  {showActionMenu === template.id && (
                    <div className="absolute right-0 top-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-10 min-w-40">
                      <button
                        onClick={() => {
                          handleViewTemplate(template);
                          setShowActionMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => {
                          handleEditTemplate(template);
                          setShowActionMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Template</span>
                      </button>
                      <button
                        onClick={() => handlePreview(template)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </button>
                      <button
                        onClick={() => handleTemplateSelect(template)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Use Template</span>
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={() => {
                          handleDeleteTemplate(template.id);
                          setShowActionMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No templates found</h3>
          <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    {selectedTemplate?.icon && <selectedTemplate.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedTemplate?.name} Preview</h2>
                    <p className="text-gray-600 dark:text-gray-400">Live preview with responsive design</p>
                  </div>
                </div>
                
                {/* Preview Controls */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setPreviewMode('desktop')}
                      className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('tablet')}
                      className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                    >
                      <Tablet className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewMode('mobile')}
                      className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="p-6 h-full overflow-auto">
                {renderPreviewFrame()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Setup Modal */}
      <AnimatePresence>
        {showSetup && selectedTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSetup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Setup Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      {selectedTemplate?.icon && <selectedTemplate.icon className="w-8 h-8" />}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Setup {selectedTemplate?.name}</h2>
                      <p className="text-purple-100 text-lg">Configure your portal with custom settings</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSetup(false)}
                    className="p-3 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Setup Content */}
              <div className="p-8 space-y-8 max-h-[65vh] overflow-auto">
                {/* Portal Name */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Portal Name</label>
                  <input
                    type="text"
                    value={portalConfig.name}
                    onChange={(e) => setPortalConfig(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter portal name"
                  />
                </div>

                {/* Theme Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Theme</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['blue', 'green', 'purple', 'red', 'orange', 'gray'].map((theme) => (
                      <button
                        key={theme}
                        onClick={() => setPortalConfig(prev => ({ ...prev, theme }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          portalConfig.theme === theme
                            ? 'border-purple-500 bg-purple-600/20'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <div className={`w-full h-10 rounded ${theme === 'blue' ? 'bg-blue-500' : theme === 'green' ? 'bg-green-500' : theme === 'purple' ? 'bg-purple-500' : theme === 'red' ? 'bg-red-500' : theme === 'orange' ? 'bg-orange-500' : 'bg-gray-500'}`}></div>
                        <p className="text-sm mt-3 capitalize text-gray-300 font-medium">{theme}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layout Selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Layout Style</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'modern', name: 'Modern', icon: Layout },
                      { id: 'classic', name: 'Classic', icon: Grid3X3 },
                      { id: 'minimal', name: 'Minimal', icon: Target },
                      { id: 'dashboard', name: 'Dashboard', icon: BarChart3 }
                    ].map((layout) => (
                      <button
                        key={layout.id}
                        onClick={() => setPortalConfig(prev => ({ ...prev, layout: layout.id }))}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          portalConfig.layout === layout.id
                            ? 'border-purple-500 bg-purple-600/20'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <layout.icon className="w-6 h-6 text-gray-300 mb-3" />
                        <p className="font-medium text-white">{layout.name}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">Enable Features</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'analytics', name: 'Analytics Dashboard', icon: BarChart3 },
                      { id: 'notifications', name: 'Real-time Notifications', icon: Bell },
                      { id: 'messaging', name: 'Internal Messaging', icon: MessageSquare },
                      { id: 'reports', name: 'Advanced Reports', icon: FileText },
                      { id: 'integrations', name: 'Third-party Integrations', icon: Link },
                      { id: 'mobile', name: 'Mobile App', icon: Smartphone }
                    ].map((feature) => (
                      <label key={feature.id} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors">
                        <input
                          type="checkbox"
                          checked={portalConfig.features.includes(feature.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setPortalConfig(prev => ({ ...prev, features: [...prev.features, feature.id] }));
                            } else {
                              setPortalConfig(prev => ({ ...prev, features: prev.features.filter(f => f !== feature.id) }));
                            }
                          }}
                          className="rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-gray-800"
                        />
                        <feature.icon className="w-5 h-5 text-gray-300" />
                        <span className="text-sm text-gray-300">{feature.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Setup Footer */}
              <div className="bg-gray-800 border-t border-gray-700 p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowSetup(false)}
                    className="px-6 py-3 text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handlePreview(selectedTemplate)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={handleSavePortal}
                    className="flex items-center space-x-2 px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <Save className="w-5 h-5" />
                    <span>Create Portal</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Template</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <CreateTemplateForm 
                onSubmit={handleCreateTemplate}
                onCancel={() => setShowCreateModal(false)}
                categories={categories}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl mx-4"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Template</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <EditTemplateForm 
                template={editingTemplate}
                onSubmit={handleUpdateTemplate}
                onCancel={() => setShowEditModal(false)}
                categories={categories}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && viewingTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl mx-4"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Template Details</h3>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <ViewTemplateForm 
                template={viewingTemplate}
                onClose={() => setShowViewModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && deletingTemplateId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md mx-4"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Deletion</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this template? This action cannot be undone.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeleteTemplate}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="fixed bottom-6 right-6 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
                notification.type === 'success' ? 'bg-green-500 text-white' :
                notification.type === 'error' ? 'bg-red-500 text-white' :
                notification.type === 'info' ? 'bg-blue-500 text-white' :
                'bg-yellow-500 text-white'
              }`}
            >
              {notification.type === 'success' && <CheckCircle className="w-5 h-5" />}
              {notification.type === 'error' && <AlertTriangle className="w-5 h-5" />}
              {notification.type === 'info' && <Bell className="w-5 h-5" />}
              {notification.type === 'warning' && <AlertTriangle className="w-5 h-5" />}
              <div>
                <h4 className="font-semibold">{notification.title}</h4>
                <p className="text-sm">{notification.message}</p>
              </div>
              <button onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}>
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Form Components
const CreateTemplateForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
  categories: any[];
}> = ({ onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template Name</label>
          <input
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter template name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            value={formData.category || 'logistics'}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter template description"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
        <select
          value={formData.status || 'active'}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="active">Active</option>
          <option value="beta">Beta</option>
          <option value="coming-soon">Coming Soon</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Create Template
        </button>
      </div>
    </form>
  );
};

const EditTemplateForm: React.FC<{
  template: PortalTemplate;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  categories: any[];
}> = ({ template, onSubmit, onCancel, categories }) => {
  const [formData, setFormData] = useState<any>(template);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Template Name</label>
          <input
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
          <select
            value={formData.category || 'logistics'}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.filter(cat => cat.id !== 'all').map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
        <select
          value={formData.status || 'active'}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="active">Active</option>
          <option value="beta">Beta</option>
          <option value="coming-soon">Coming Soon</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Save className="w-4 h-4 mr-2" />
          Update Template
        </button>
      </div>
    </form>
  );
};

const ViewTemplateForm: React.FC<{
  template: PortalTemplate;
  onClose: () => void;
}> = ({ template, onClose }) => {
  if (!template) return null;

  const IconComponent = template.icon;

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
            <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{template.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{template.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
            <p className="text-gray-900 dark:text-white capitalize">{template.category}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              template.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
              template.status === 'beta' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
              'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}>
              {template.status.replace('-', ' ')}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author</label>
            <p className="text-gray-900 dark:text-white">{template.author || 'System'}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Version</label>
            <p className="text-gray-900 dark:text-white">{template.version || '1.0.0'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</label>
            <p className="text-gray-900 dark:text-white">
              {template.createdAt ? new Date(template.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Updated</label>
            <p className="text-gray-900 dark:text-white">
              {template.updatedAt ? new Date(template.updatedAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {template.features && template.features.length > 0 && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features</label>
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature, index) => (
              <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded-full">
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PortalBuilder;
