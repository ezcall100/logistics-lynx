import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  MapPin, 
  Users, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Upload,
  CheckCircle,
  Truck,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UnifiedPortalLayout from '../../components/portals/UnifiedPortalLayout';

const CompanyProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: user?.company || 'DEMO / PLACEHOLDER Company',
    industry: 'Transportation & Logistics',
    companySize: '50-200 employees',
    founded: '2015',
    headquarters: 'DEMO / PLACEHOLDER City, State',
    website: 'https://www.democompany.com',
    email: 'contact@democompany.com',
    phone: '+1 (555) 123-4567',
    description: 'Leading transportation and logistics company specializing in freight management, fleet operations, and supply chain optimization.',
    services: [
      'Freight Transportation',
      'Fleet Management',
      'Supply Chain Optimization',
      'Warehouse Management',
      'Last Mile Delivery'
    ],
    certifications: [
      'ISO 9001:2015',
      'DOT Certified',
      'C-TPAT Certified',
      'FMCSA Licensed'
    ],
    fleetSize: '89 vehicles',
    annualRevenue: '$25M',
    coverageArea: '48 states',
    customerCount: '1,247 active customers'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData(prev => ({
      ...prev,
      services: newServices
    }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, '']
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update user context
    updateUser({
      company: formData.companyName
    });
    
    setIsLoading(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      companyName: user?.company || 'DEMO / PLACEHOLDER Company',
      industry: 'Transportation & Logistics',
      companySize: '50-200 employees',
      founded: '2015',
      headquarters: 'DEMO / PLACEHOLDER City, State',
      website: 'https://www.democompany.com',
      email: 'contact@democompany.com',
      phone: '+1 (555) 123-4567',
      description: 'Leading transportation and logistics company specializing in freight management, fleet operations, and supply chain optimization.',
      services: [
        'Freight Transportation',
        'Fleet Management',
        'Supply Chain Optimization',
        'Warehouse Management',
        'Last Mile Delivery'
      ],
      certifications: [
        'ISO 9001:2015',
        'DOT Certified',
        'C-TPAT Certified',
        'FMCSA Licensed'
      ],
      fleetSize: '89 vehicles',
      annualRevenue: '$25M',
      coverageArea: '48 states',
      customerCount: '1,247 active customers'
    });
    setIsEditing(false);
  };

  const companyStats = [
    { label: 'Fleet Size', value: formData.fleetSize, icon: Truck, color: 'from-blue-500 to-indigo-500' },
    { label: 'Annual Revenue', value: formData.annualRevenue, icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Coverage Area', value: formData.coverageArea, icon: MapPin, color: 'from-purple-500 to-violet-500' },
    { label: 'Active Customers', value: formData.customerCount, icon: Users, color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <UnifiedPortalLayout>
      <div className="max-w-6xl mx-auto space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Company Profile</h1>
              <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Manage your company information and business details</p>
            </div>
            <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <X className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin responsive-container sm:flex-col md:flex-row lg:grid"></div>
                    ) : (
                      <Save className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                    <span>{isLoading ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
            aria-label="Button"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                >
                  <Edit className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Edit Company</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 responsive-container sm:flex-col md:flex-row lg:grid"
        >
          {companyStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
          {/* Company Logo & Basic Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="relative inline-block responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Building className="w-12 h-12 text-white responsive-container sm:flex-col md:flex-row lg:grid" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid" aria-label="Button">
                    <Upload className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  </button>
                )}
              </div>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">{formData.companyName}</h2>
              <p className="text-gray-600 mb-1 responsive-container sm:flex-col md:flex-row lg:grid">{formData.industry}</p>
              <p className="text-sm text-gray-500 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">{formData.companySize}</p>
              
              <div className="space-y-2 text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Calendar className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>Founded {formData.founded}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <MapPin className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                  <span>{formData.headquarters}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid"
          >
            {/* Basic Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Company Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  ) : (
                    <p className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{formData.companyName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Industry</label>
                  {isEditing ? (
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <option value="Transportation & Logistics">Transportation & Logistics</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Technology">Technology</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{formData.industry}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Company Size</label>
                  {isEditing ? (
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="50-200 employees">50-200 employees</option>
                      <option value="200-1000 employees">200-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{formData.companySize}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Founded</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="founded"
                      value={formData.founded}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  ) : (
                    <p className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{formData.founded}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  ) : (
                    <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 responsive-container sm:flex-col md:flex-row lg:grid">
                      {formData.website}
                    </a>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Contact Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                    />
                  ) : (
                    <p className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{formData.email}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <label className="block text-sm font-medium text-gray-700 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Company Description</label>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                  />
                ) : (
                  <p className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{formData.description}</p>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <h3 className="text-lg font-semibold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Services</h3>
                {isEditing && (
                  <button
                    onClick={addService}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                   aria-label="Button">
                    <span>Add Service</span>
                  </button>
                )}
              </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                {formData.services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => handleServiceChange(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent responsive-container sm:flex-col md:flex-row lg:grid"
                        />
                        <button
                          onClick={() => removeService(index)}
            aria-label="Button"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          <X className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 responsive-container sm:flex-col md:flex-row lg:grid">
                        <CheckCircle className="w-4 h-4 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                        <span className="text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">{service}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container sm:flex-col md:flex-row lg:grid">Certifications & Licenses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Shield className="w-5 h-5 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    <span className="text-green-800 font-medium responsive-container sm:flex-col md:flex-row lg:grid">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </UnifiedPortalLayout>
  );
};

export default CompanyProfile;
}