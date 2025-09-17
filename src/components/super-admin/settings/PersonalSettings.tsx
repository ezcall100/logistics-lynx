import React, { useState } from 'react';
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Personal Settings</h1>
          <p className="text-muted-foreground">
            Manage your personal information
          </p>
        </div>
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
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
            <div className="space-y-2">
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
          <div className="space-y-2">
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
          <div className="space-y-2">
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
