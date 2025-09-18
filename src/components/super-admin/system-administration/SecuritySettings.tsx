import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Shield,
  Lock,
  Key,
  Eye, 
  EyeOff, 
  AlertTriangle,
  CheckCircle,
  Save,
  RefreshCw
} from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [securitySettings, setSecuritySettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90
    },
    sessionSettings: {
      timeoutMinutes: 30,
      maxConcurrentSessions: 3,
      requireReauth: false
    },
    twoFactor: {
      enabled: false,
      required: false,
      backupCodes: 10
    },
    ipWhitelist: {
      enabled: false,
      addresses: ['192.168.1.0/24', '10.0.0.0/8']
    },
    auditLogging: {
      enabled: true,
      retentionDays: 365,
      logLevel: 'info'
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    console.log('Saving security settings:', securitySettings);
  };

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword && newPassword.length >= securitySettings.passwordPolicy.minLength) {
      console.log('Password changed successfully');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const securityChecks = [
    { name: 'Password Policy', status: 'enabled', description: 'Strong password requirements' },
    { name: 'Two-Factor Auth', status: 'disabled', description: 'Additional security layer' },
    { name: 'Session Management', status: 'enabled', description: 'Automatic session timeout' },
    { name: 'IP Whitelist', status: 'disabled', description: 'Restrict access by IP' },
    { name: 'Audit Logging', status: 'enabled', description: 'Track all activities' }
  ];

  return (
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Security Settings</h1>
          <p className="text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
            Configure security policies and access controls
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Save className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          Save Changes
        </Button>
          </div>
          
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 responsive-container sm:flex-col md:flex-row lg:grid">
        <div className="lg:col-span-2 space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Lock className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                Password Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="minLength">Minimum Length</Label>
                <Input
                  id="minLength"
                  type="number"
                  value={securitySettings.passwordPolicy.minLength}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    passwordPolicy: {
                      ...prev.passwordPolicy,
                      minLength: parseInt(e.target.value)
                    }
                  }))}
              />
            </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="expiryDays">Password Expiry (Days)</Label>
                <Input
                  id="expiryDays"
                  type="number"
                  value={securitySettings.passwordPolicy.expiryDays}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    passwordPolicy: {
                      ...prev.passwordPolicy,
                      expiryDays: parseInt(e.target.value)
                    }
                  }))}
                />
          </div>
              <div className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Label>Require Uppercase</Label>
                    <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                      Must contain uppercase letters
                </p>
              </div>
                  <Switch
                    checked={securitySettings.passwordPolicy.requireUppercase}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      passwordPolicy: {
                        ...prev.passwordPolicy,
                        requireUppercase: checked
                      }
                    }))}
                  />
            </div>
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Label>Require Numbers</Label>
                    <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                      Must contain numbers
                </p>
              </div>
                  <Switch
                    checked={securitySettings.passwordPolicy.requireNumbers}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      passwordPolicy: {
                        ...prev.passwordPolicy,
                        requireNumbers: checked
                      }
                    }))}
                  />
            </div>
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                    <Label>Require Special Characters</Label>
                    <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                      Must contain special characters
                </p>
              </div>
                  <Switch
                    checked={securitySettings.passwordPolicy.requireSpecialChars}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      passwordPolicy: {
                        ...prev.passwordPolicy,
                        requireSpecialChars: checked
                      }
                    }))}
                  />
              </div>
            </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Key className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Enable 2FA</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Add an extra layer of security
                </p>
              </div>
                <Switch
                  checked={securitySettings.twoFactor.enabled}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({
                    ...prev,
                    twoFactor: {
                      ...prev.twoFactor,
                      enabled: checked
                    }
                  }))}
                />
              </div>
              <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Require 2FA</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Make 2FA mandatory for all users
                  </p>
            </div>
                <Switch
                  checked={securitySettings.twoFactor.required}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({
                    ...prev,
                    twoFactor: {
                      ...prev.twoFactor,
                      required: checked
                    }
                  }))}
                />
        </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="backupCodes">Backup Codes</Label>
                <Input
                  id="backupCodes"
                  type="number"
                  value={securitySettings.twoFactor.backupCodes}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    twoFactor: {
                      ...prev.twoFactor,
                      backupCodes: parseInt(e.target.value)
                    }
                  }))}
                />
          </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Shield className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
                Session Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="timeout">Session Timeout (Minutes)</Label>
                <Input
                  id="timeout"
                  type="number"
                  value={securitySettings.sessionSettings.timeoutMinutes}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    sessionSettings: {
                      ...prev.sessionSettings,
                      timeoutMinutes: parseInt(e.target.value)
                    }
                  }))}
                />
                          </div>
                          <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="maxSessions">Max Concurrent Sessions</Label>
                <Input
                  id="maxSessions"
                  type="number"
                  value={securitySettings.sessionSettings.maxConcurrentSessions}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    sessionSettings: {
                      ...prev.sessionSettings,
                      maxConcurrentSessions: parseInt(e.target.value)
                    }
                  }))}
                />
                            </div>
                            <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                <div className="space-y-0.5 responsive-container sm:flex-col md:flex-row lg:grid">
                  <Label>Require Re-authentication</Label>
                  <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
                    Force re-login for sensitive operations
                  </p>
                            </div>
                <Switch
                  checked={securitySettings.sessionSettings.requireReauth}
                  onCheckedChange={(checked) => setSecuritySettings(prev => ({
                    ...prev,
                    sessionSettings: {
                      ...prev.sessionSettings,
                      requireReauth: checked
                    }
                  }))}
                />
                            </div>
            </CardContent>
          </Card>
                  </div>

        <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
          <Card>
            <CardHeader>
              <CardTitle>Security Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              {securityChecks.map((check, index) => (
                <div key={index} className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
                  <div className="flex items-center space-x-3 responsive-container sm:flex-col md:flex-row lg:grid">
                    {check.status === 'enabled' ? (
                      <CheckCircle className="h-5 w-5 text-green-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-600 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                          <div>
                      <p className="font-medium responsive-container sm:flex-col md:flex-row lg:grid">{check.name}</p>
                      <p className="text-sm text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">{check.description}</p>
                            </div>
                          </div>
                  <Badge 
                    className={
                      check.status === 'enabled' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }
                  >
                    {check.status}
                  </Badge>
                      </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative responsive-container sm:flex-col md:flex-row lg:grid">
                  <Input
                    id="newPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 responsive-container sm:flex-col md:flex-row lg:grid"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    ) : (
                      <Eye className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
                    )}
                  </Button>
                        </div>
                      </div>
              <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                    </div>
              <Button onClick={handlePasswordChange} className="w-full responsive-container sm:flex-col md:flex-row lg:grid">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
}