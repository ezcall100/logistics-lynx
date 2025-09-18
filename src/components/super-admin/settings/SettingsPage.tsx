import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Settings, 
  User,
  Building2, 
  Shield,
  Bell,
  Palette,
  Save
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [settings, setSettings] = useState({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timezone: 'UTC',
      language: 'en'
    },
    company: {
      name: '',
      address: '',
      phone: '',
      email: '',
      website: '',
      logo: ''
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginNotifications: true
    },
    notifications: {
      email: true,
      push: false,
      sms: false,
      marketing: false
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
          <div>
          <h1 className="text-3xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Settings</h1>
          <p className="text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
            Manage your account and system preferences
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Save className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
        <TabsList className="grid w-full grid-cols-5 responsive-container sm:flex-col md:flex-row lg:grid">
          <TabsTrigger value="personal" className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <User className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Building2 className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Company
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Shield className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Bell className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Palette className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={settings.personal.firstName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      personal: { ...prev.personal, firstName: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={settings.personal.lastName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      personal: { ...prev.personal, lastName: e.target.value }
                    }))}
              />
            </div>
          </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.personal.email}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    personal: { ...prev.personal, email: e.target.value }
                  }))}
                />
          </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={settings.personal.phone}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    personal: { ...prev.personal, phone: e.target.value }
                  }))}
                />
          </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.company.name}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    company: { ...prev.company, name: e.target.value }
                  }))}
                />
            </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={settings.company.address}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    company: { ...prev.company, address: e.target.value }
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input
                    id="companyPhone"
                    value={settings.company.phone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      company: { ...prev.company, phone: e.target.value }
                    }))}
                  />
          </div>
                <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label htmlFor="companyEmail">Email</Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      company: { ...prev.company, email: e.target.value }
                    }))}
                  />
                        </div>
                      </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Add an extra layer of security to your account
                  </p>
                    </div>
                <Switch
                  checked={settings.security.twoFactor}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, twoFactor: checked }
                  }))}
                />
                    </div>
              <Separator />
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Login Notifications</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Get notified when someone logs into your account
                  </p>
                    </div>
                <Switch
                  checked={settings.security.loginNotifications}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, loginNotifications: checked }
                  }))}
                />
                    </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Receive notifications via email
                  </p>
                    </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: checked }
                  }))}
                />
        </div>
          <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Receive push notifications in your browser
                  </p>
            </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: checked }
                  }))}
                />
            </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Compact Mode</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Use a more compact interface layout
                  </p>
          </div>
                <Switch
                  checked={settings.appearance.compactMode}
                  onCheckedChange={(checked) => setSettings(prev => ({
                    ...prev,
                    appearance: { ...prev.appearance, compactMode: checked }
                  }))}
                />
        </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
}