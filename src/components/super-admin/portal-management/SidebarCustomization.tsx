import { useState } from 'react';
import { 
  Save, 
  Eye, 
  BarChart3, 
  Users, 
  Shield, 
  Database, 
  Globe, 
  Brain, 
  Rocket, 
  Building
} from 'lucide-react';

const SidebarCustomization = () => {
  const [sidebarConfig, setSidebarConfig] = useState({
    layout: 'collapsible',
    position: 'left',
    size: 'medium',
    theme: 'modern',
    logo: {
      enabled: true,
      text: 'TransBot AI',
      icon: 'Brain'
    },
    menuItems: [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, enabled: true },
      { id: 'users', name: 'Users & Access', icon: Users, enabled: true },
      { id: 'portal-management', name: 'Portal Management', icon: Globe, enabled: true },
      { id: 'system', name: 'System Health', icon: Database, enabled: true },
      { id: 'security', name: 'Security', icon: Shield, enabled: true },
      { id: 'ai-agents', name: 'AI Agents', icon: Brain, enabled: true },
      { id: 'deployment', name: 'Deployment', icon: Rocket, enabled: true },
      { id: 'company-settings', name: 'Company Settings', icon: Building, enabled: true },
    ],
    footer: {
      enabled: true,
      text: '© 2024 TransBot AI',
      version: '1.0.0'
    },
    styling: {
      background: 'bg-white',
      textColor: 'text-gray-800',
      accentColor: 'text-blue-600',
      hoverBg: 'hover:bg-gray-100',
      activeBg: 'bg-blue-50',
      shadow: 'shadow-lg'
    }
  });

  const handleConfigChange = (key: string, value: string | boolean | number) => {
    setSidebarConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNestedConfigChange = (section: string, key: string, value: string | boolean | number) => {
    setSidebarConfig(prev => {
      const prevSection = (prev as Record<string, unknown>)[section] as Record<string, unknown> | undefined;
      
      return {
        ...prev,
        [section]: {
          ...(prevSection || {}),
          [key]: value
        }
      };
    });
  };

  const handleMenuItemToggle = (itemId: string) => {
    setSidebarConfig(prev => ({
      ...prev,
      menuItems: prev.menuItems.map(item =>
        item.id === itemId ? { ...item, enabled: !item.enabled } : item
      )
    }));
  };

  const enabledMenuItems = sidebarConfig.menuItems.filter(item => item.enabled);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sidebar Customization</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Customize sidebar layout, menu items, and styling</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            <Eye className="h-4 w-4" />
            <span>Preview</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Configuration</h2>
            
            {/* Layout Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Layout Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Layout Type</label>
                  <select
                    value={sidebarConfig.layout}
                    onChange={(e) => handleConfigChange('layout', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="collapsible">Collapsible</option>
                    <option value="fixed">Fixed</option>
                    <option value="overlay">Overlay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Position</label>
                  <select
                    value={sidebarConfig.position}
                    onChange={(e) => handleConfigChange('position', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
                  <select
                    value={sidebarConfig.size}
                    onChange={(e) => handleConfigChange('size', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Logo Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Logo Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sidebarConfig.logo.enabled}
                    onChange={(e) => handleNestedConfigChange('logo', 'enabled', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Logo</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Logo Text</label>
                  <input
                    type="text"
                    value={sidebarConfig.logo.text}
                    onChange={(e) => handleNestedConfigChange('logo', 'text', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Footer Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Footer Settings</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sidebarConfig.footer.enabled}
                    onChange={(e) => handleNestedConfigChange('footer', 'enabled', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enable Footer</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Footer Text</label>
                  <input
                    type="text"
                    value={sidebarConfig.footer.text}
                    onChange={(e) => handleNestedConfigChange('footer', 'text', e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items Configuration */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Menu Items</h2>
            <div className="space-y-2">
              {sidebarConfig.menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.enabled}
                        onChange={() => handleMenuItemToggle(item.id)}
                        className="mr-2"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {item.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Live Preview</h2>
            
            {/* Sidebar Preview */}
            <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${
                sidebarConfig.size === 'small' ? 'w-48' : sidebarConfig.size === 'medium' ? 'w-64' : 'w-80'
              }`}>
                {/* Logo */}
                {sidebarConfig.logo.enabled && (
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{sidebarConfig.logo.text}</span>
                    </div>
                  </div>
                )}

                {/* Menu Items */}
                <div className="p-2">
                  {enabledMenuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                {sidebarConfig.footer.enabled && (
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      {sidebarConfig.footer.text}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-1">
                      v{sidebarConfig.footer.version}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Configuration Summary */}
            <div className="mt-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Summary</h3>
              <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <div>Layout: {sidebarConfig.layout}</div>
                <div>Position: {sidebarConfig.position}</div>
                <div>Size: {sidebarConfig.size}</div>
                <div>Menu Items: {enabledMenuItems.length}/{sidebarConfig.menuItems.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sidebar Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Layout Options</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">Collapsible, Fixed, and Overlay layouts.</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Menu Management</h3>
            <p className="text-sm text-green-600 dark:text-green-400">Enable/disable menu items dynamically.</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-700 dark:text-purple-300">Logo & Footer</h3>
            <p className="text-sm text-purple-600 dark:text-purple-400">Customize branding and footer content.</p>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-700 dark:text-yellow-300">Size Control</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">Small, Medium, and Large size options.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCustomization;
