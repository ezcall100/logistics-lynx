/**
 * MCP Agents - Modern Profile Settings Component
 * Clean, professional profile settings with sophisticated design
 */

import React, { useState, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Key,
  Bell,
  Globe,
  Save,
  Upload,
  Camera,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../design-system/components/Card';
import { Button } from '../../design-system/components/Button';
import { Input } from '../../design-system/components/Input';
import { Form, FormField, FormGroup } from '../../design-system/components/Form';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  timezone: string;
  language: string;
  avatar?: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  passwordLastChanged: string;
  loginNotifications: boolean;
  sessionTimeout: number;
}

const ProfileSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'security' | 'notifications' | 'preferences'
  >('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Super',
    lastName: 'Administrator',
    email: 'superadmin@transbotai.com',
    phone: '+1 (555) 123-4567',
    role: 'Super Administrator',
    department: 'IT Administration',
    location: 'San Francisco, CA',
    timezone: 'Pacific Standard Time',
    language: 'English',
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: true,
    passwordLastChanged: '2024-01-15',
    loginNotifications: true,
    sessionTimeout: 30,
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const handleAvatarUpload = () => {
    // Handle avatar upload
    console.log('Avatar upload');
  };

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Profile & Settings</h1>
          <p className="text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Manage your account settings and preferences</p>
        </div>
        <Button onClick={handleSave} loading={loading}>
          <Save className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
          Save Changes
        </Button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b border-gray-200 responsive-container sm:flex-col md:flex-row lg:grid"
      >
        <nav className="flex space-x-8 responsive-container sm:flex-col md:flex-row lg:grid">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'profile' | 'security' | 'notifications' | 'preferences')
              }
            aria-label="Button"
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-slate-600 text-slate-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <tab.icon className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
              {tab.label}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            {/* Avatar Section */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="relative inline-block responsive-container sm:flex-col md:flex-row lg:grid">
                    <div className="w-24 h-24 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 responsive-container sm:flex-col md:flex-row lg:grid">
                      {profileData.firstName[0]}
                      {profileData.lastName[0]}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -bottom-2 -right-2 w-8 h-8 responsive-container sm:flex-col md:flex-row lg:grid"
                      onClick={handleAvatarUpload}
                    >
                      <Camera className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
                    <Upload className="w-4 h-4 mr-2 responsive-container sm:flex-col md:flex-row lg:grid" />
                    Upload Photo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Form */}
            <div className="lg:col-span-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form>
                    <FormGroup columns={2}>
                      <FormField label="First Name" required>
                        <Input
                          value={profileData.firstName}
                          onChange={e =>
                            setProfileData(prev => ({ ...prev, firstName: e.target.value }))
                          }
                        />
                      </FormField>
                      <FormField label="Last Name" required>
                        <Input
                          value={profileData.lastName}
                          onChange={e =>
                            setProfileData(prev => ({ ...prev, lastName: e.target.value }))
                          }
                        />
                      </FormField>
                    </FormGroup>

                    <FormGroup columns={2}>
                      <FormField label="Email" required>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={e =>
                            setProfileData(prev => ({ ...prev, email: e.target.value }))
                          }
                          leftIcon={<Mail className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                        />
                      </FormField>
                      <FormField label="Phone">
                        <Input
                          type="tel"
                          value={profileData.phone}
                          onChange={e =>
                            setProfileData(prev => ({ ...prev, phone: e.target.value }))
                          }
                          leftIcon={<Phone className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                        />
                      </FormField>
                    </FormGroup>

                    <FormGroup columns={2}>
                      <FormField label="Role">
                        <Input
                          value={profileData.role}
                          disabled
                          leftIcon={<Shield className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                        />
                      </FormField>
                      <FormField label="Department">
                        <Input
                          value={profileData.department}
                          onChange={e =>
                            setProfileData(prev => ({ ...prev, department: e.target.value }))
                          }
                        />
                      </FormField>
                    </FormGroup>

                    <FormField label="Location">
                      <Input
                        value={profileData.location}
                        onChange={e =>
                          setProfileData(prev => ({ ...prev, location: e.target.value }))
                        }
                        leftIcon={<MapPin className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                      />
                    </FormField>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <Card>
              <CardHeader>
                <CardTitle>Password & Security</CardTitle>
              </CardHeader>
              <CardContent>
                <Form>
                  <FormField label="Current Password" required>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      leftIcon={<Key className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />}
                      rightIcon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
            aria-label="Button"
                          className="text-gray-400 hover:text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          ) : (
                            <Eye className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                          )}
                        </button>
                      }
                    />
                  </FormField>

                  <FormGroup columns={2}>
                    <FormField label="New Password" required>
                      <Input type="password" leftIcon={<Key className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />} />
                    </FormField>
                    <FormField label="Confirm Password" required>
                      <Input type="password" leftIcon={<Key className="w-4 h-4 responsive-container sm:flex-col md:flex-row lg:grid" />} />
                    </FormField>
                  </FormGroup>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="font-medium text-blue-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Password Requirements</h4>
                    <ul className="text-sm text-blue-800 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <li>• At least 8 characters long</li>
                      <li>• Contains uppercase and lowercase letters</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                    </ul>
                  </div>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h4 className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Authenticator App</h4>
                    <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">
                      Use an authenticator app to generate verification codes
                    </p>
                  </div>
                  <Button variant={securitySettings.twoFactorEnabled ? 'default' : 'outline'}>
                    {securitySettings.twoFactorEnabled ? 'Enabled' : 'Enable'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === 'notifications' && (
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h4 className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Email Notifications</h4>
                    <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Receive notifications via email</p>
                  </div>
                  <Button variant={securitySettings.loginNotifications ? 'default' : 'outline'}>
                    {securitySettings.loginNotifications ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>

                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h4 className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">System Alerts</h4>
                    <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Get notified about system events</p>
                  </div>
                  <Button variant="default">Enabled</Button>
                </div>

                <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div>
                    <h4 className="font-medium text-gray-900 responsive-container sm:flex-col md:flex-row lg:grid">Security Alerts</h4>
                    <p className="text-sm text-gray-600 responsive-container sm:flex-col md:flex-row lg:grid">Receive security-related notifications</p>
                  </div>
                  <Button variant="default">Enabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'preferences' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
            <Card>
              <CardHeader>
                <CardTitle>General Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <Form>
                  <FormField label="Language">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </FormField>

                  <FormField label="Timezone">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      <option value="PST">Pacific Standard Time</option>
                      <option value="EST">Eastern Standard Time</option>
                      <option value="GMT">Greenwich Mean Time</option>
                    </select>
                  </FormField>

                  <FormField label="Date Format">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 responsive-container sm:flex-col md:flex-row lg:grid">
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </FormField>
                </Form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <Form>
                  <FormField label="Session Timeout (minutes)">
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={e =>
                        setSecuritySettings(prev => ({
                          ...prev,
                          sessionTimeout: parseInt(e.target.value),
                        }))
                      }
                    />
                  </FormField>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 responsive-container sm:flex-col md:flex-row lg:grid">
                    <h4 className="font-medium text-gray-900 mb-2 responsive-container sm:flex-col md:flex-row lg:grid">Session Information</h4>
                    <div className="text-sm text-gray-600 space-y-1 responsive-container sm:flex-col md:flex-row lg:grid">
                      <p>• Last login: 2 hours ago</p>
                      <p>• Current session: Active</p>
                      <p>• IP Address: 192.168.1.100</p>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
