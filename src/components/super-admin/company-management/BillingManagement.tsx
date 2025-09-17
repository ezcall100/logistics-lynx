import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Calendar, 
  Download, 
  Plus,
  Edit,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

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
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm';
}> = ({ children, className = '', variant = 'default', size = 'default' }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  const variantClasses = variant === 'outline' 
    ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground' 
    : 'bg-primary text-primary-foreground hover:bg-primary/90';
  const sizeClasses = size === 'sm' ? 'h-9 px-3 text-sm' : 'h-10 px-4 py-2';
  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </button>
  );
};

const Input: React.FC<{ 
  value?: string; 
  readOnly?: boolean; 
  className?: string;
}> = ({ value, readOnly, className = '' }) => (
  <input 
    value={value} 
    readOnly={readOnly}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

const Label: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <label className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}>
    {children}
  </label>
);

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
    {children}
  </span>
);

const BillingManagement: React.FC = () => {
  const [billingInfo] = useState({
    currentPlan: 'Enterprise',
    monthlyCost: 299,
    nextBillingDate: '2024-02-15',
    paymentMethod: 'Visa **** 4242',
    billingAddress: {
      company: 'Acme Corp',
      address: '123 Business St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    }
  });

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-01-15',
      amount: 299,
      status: 'paid',
      description: 'Monthly Enterprise Plan'
    },
    {
      id: 'INV-2024-002',
      date: '2023-12-15',
      amount: 299,
      status: 'paid',
      description: 'Monthly Enterprise Plan'
    },
    {
      id: 'INV-2024-003',
      date: '2023-11-15',
      amount: 299,
      status: 'overdue',
      description: 'Monthly Enterprise Plan'
    }
  ]);

  const [usage] = useState({
    apiCalls: {
      used: 45000,
      limit: 100000,
      percentage: 45
    },
    storage: {
      used: 2.5,
      limit: 10,
      percentage: 25
    },
    users: {
      used: 25,
      limit: 50,
      percentage: 50
    }
  });


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing Management</h1>
          <p className="text-muted-foreground">
            Manage your subscription, billing, and payment information
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Payment Method
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingInfo.currentPlan}</div>
            <p className="text-xs text-muted-foreground">
              ${billingInfo.monthlyCost}/month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Billing</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingInfo.nextBillingDate}</div>
            <p className="text-xs text-muted-foreground">
              ${billingInfo.monthlyCost} will be charged
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Method</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{billingInfo.paymentMethod}</div>
            <p className="text-xs text-muted-foreground">
              Primary payment method
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Usage Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>API Calls</Label>
                <span className="text-sm text-muted-foreground">
                  {usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${usage.apiCalls.percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Storage</Label>
                <span className="text-sm text-muted-foreground">
                  {usage.storage.used}GB / {usage.storage.limit}GB
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${usage.storage.percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Users</Label>
                <span className="text-sm text-muted-foreground">
                  {usage.users.used} / {usage.users.limit}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${usage.users.percentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={billingInfo.billingAddress.company} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={billingInfo.billingAddress.address} readOnly />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input value={billingInfo.billingAddress.city} readOnly />
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Input value={billingInfo.billingAddress.state} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>ZIP Code</Label>
                <Input value={billingInfo.billingAddress.zip} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Input value={billingInfo.billingAddress.country} readOnly />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(invoice.status)}
                  <div>
                    <h4 className="font-medium">{invoice.id}</h4>
                    <p className="text-sm text-muted-foreground">{invoice.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                  {getStatusBadge(invoice.status)}
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingManagement;
