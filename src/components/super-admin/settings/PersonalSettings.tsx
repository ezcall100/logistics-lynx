import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Save } from 'lucide-react';

const PersonalSettings: React.FC = () => {
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleSave = () => {
    console.log('Saving personal settings:', personalData);
  };

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="space-y-6 responsive-container sm:flex-col md:flex-row lg:grid">
      <div className="flex items-center justify-between responsive-container sm:flex-col md:flex-row lg:grid">
        <div>
          <h1 className="text-3xl font-bold responsive-container sm:flex-col md:flex-row lg:grid">Personal Settings</h1>
          <p className="text-muted-foreground responsive-container sm:flex-col md:flex-row lg:grid">
            Manage your personal information
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
          <Save className="h-4 w-4 responsive-container sm:flex-col md:flex-row lg:grid" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <User className="h-5 w-5 responsive-container sm:flex-col md:flex-row lg:grid" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 responsive-container sm:flex-col md:flex-row lg:grid">
          <div className="grid grid-cols-2 gap-4 responsive-container sm:flex-col md:flex-row lg:grid">
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={personalData.firstName}
                onChange={(e) => setPersonalData(prev => ({
                  ...prev,
                  firstName: e.target.value
                }))}
          />
        </div>
            <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={personalData.lastName}
                onChange={(e) => setPersonalData(prev => ({
                  ...prev,
                  lastName: e.target.value
                }))}
          />
        </div>
      </div>
          <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalData.email}
              onChange={(e) => setPersonalData(prev => ({
                ...prev,
                email: e.target.value
              }))}
        />
      </div>
          <div className="space-y-2 responsive-container sm:flex-col md:flex-row lg:grid">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={personalData.phone}
              onChange={(e) => setPersonalData(prev => ({
                ...prev,
                phone: e.target.value
              }))}
            />
        </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalSettings;
