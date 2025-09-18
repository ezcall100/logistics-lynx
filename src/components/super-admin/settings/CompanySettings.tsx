import React, { useState, useCallback, useRef } from 'react';
import { Building2, Save, Globe, Phone, MapPin, Users, Shield } from 'lucide-react';

// Custom UI Components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>{children}</div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  className?: string; 
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantClasses = 'bg-primary text-primary-foreground hover:bg-primary/90';
  const sizeClasses = 'h-10 px-4 py-2';
  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <button 
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
     aria-label="Button">
      {children}
    </button>
  );
};

const Input: React.FC<{ 
  id?: string;
  value?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}> = ({ id, value, onChange, placeholder, type = 'text', className = '' }) => (
  <input 
    id={id}
    type={type}
    value={value} 
    onChange={onChange}
    placeholder={placeholder}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

const Label: React.FC<{ 
  children: React.ReactNode; 
  htmlFor?: string;
  className?: string; 
}> = ({ children, htmlFor, className = '' }) => (
  <label 
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
);

const CompanySettings: React.FC = () => {
  const [companyData, setCompanyData] = useState({
    name: 'TransBot Logistics',
    address: '123 Enterprise Drive, Suite 100, San Francisco, CA 94105',
    phone: '+1 (555) 123-4567',
    email: 'contact@transbot.ai',
    website: 'https://transbot.ai',
    industry: 'Logistics & Transportation',
    founded: '2020',
    employees: '50-100',
    timezone: 'America/Los_Angeles'
  });

  const [activeTab, setActiveTab] = useState('basic');

  const handleSave = () => {
    console.log('Saving company settings:', companyData);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Building2 },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'business', label: 'Business', icon: Users },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Company Settings</h1>
          <p className="text-gray-600 mt-1 responsive-container sm:flex-col md:flex-row lg:grid">
            Manage your company information and configuration
          </p>
        </div>
        <div className="flex items-center gap-3 responsive-container sm:flex-col md:flex-row lg:grid">
          <Button 
            onClick={handleSave} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white responsive-container sm:flex-col md:flex-row lg:grid"
          >
            <Save className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid">
        <nav className="-mb-px flex space-x-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
            aria-label="Button"
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6 responsive-container sm:flex-col md:flex-row lg:grid">
        {activeTab === 'basic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Building2 className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Company Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyData.name}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={companyData.industry}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      industry: e.target.value
                    }))}
                    placeholder="Enter industry"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Label htmlFor="founded">Founded</Label>
                    <Input
                      id="founded"
                      value={companyData.founded}
                      onChange={(e) => setCompanyData(prev => ({
                        ...prev,
                        founded: e.target.value
                      }))}
                      placeholder="2020"
                    />
                  </div>
                  <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Label htmlFor="employees">Employees</Label>
                    <Input
                      id="employees"
                      value={companyData.employees}
                      onChange={(e) => setCompanyData(prev => ({
                        ...prev,
                        employees: e.target.value
                      }))}
                      placeholder="50-100"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <MapPin className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Location & Timezone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={companyData.address}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      address: e.target.value
                    }))}
                    placeholder="Enter company address"
                  />
                </div>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={companyData.timezone}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      timezone: e.target.value
                    }))}
                    placeholder="America/Los_Angeles"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Phone className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      phone: e.target.value
                    }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    placeholder="contact@company.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Globe className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                  Web Presence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => setCompanyData(prev => ({
                      ...prev,
                      website: e.target.value
                    }))}
                    placeholder="https://company.com"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'business' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Users className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                Business Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50 responsive-container sm:flex-col md:flex-row lg:grid" />
                <p>Business settings and configurations will be available here.</p>
                <p className="text-sm mt-2 responsive-container sm:flex-col md:flex-row lg:grid">This section is under development.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'security' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Shield className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500 responsive-container sm:flex-col md:flex-row lg:grid">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50 responsive-container sm:flex-col md:flex-row lg:grid" />
                <p>Security settings and access controls will be available here.</p>
                <p className="text-sm mt-2 responsive-container sm:flex-col md:flex-row lg:grid">This section is under development.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CompanySettings;
