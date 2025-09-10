import React, { useEffect, useState } from 'react';
import CustomerPortal from '../pages/portals/customer/CustomerPortal';
import BrokerPortal from '../pages/portals/broker/BrokerPortal';
import CarrierPortal from '../pages/portals/carrier/CarrierPortal';
import DriverPortal from '../pages/portals/driver/DriverPortal';
import ShipperPortal from '../pages/portals/shipper/ShipperPortal';
import AnalyticsPortal from '../pages/portals/analytics/AnalyticsPortal';
import MarketplacePortal from '../pages/portals/marketplace/MarketplacePortal';
import FinancialPortal from '../pages/portals/financials/FinancialsPortal';
import FleetPortal from '../pages/portals/fleet/FleetPortal';
import CRMPortal from '../pages/portals/crm/CRMPortal';
import LoadBoardPortal from '../pages/portals/load-board/LoadBoardPortal';
import AdminPortal from '../pages/portals/admin/AdminPortal';
import SuperAdminPortal from '../pages/portals/super-admin/SuperAdminPortal';

interface SubdomainRouterProps {
  children: React.ReactNode;
}

const SubdomainRouter: React.FC<SubdomainRouterProps> = ({ children }) => {
  const [currentSubdomain, setCurrentSubdomain] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectSubdomain = () => {
      const hostname = window.location.hostname;

      // Extract subdomain from hostname
      const parts = hostname.split('.');

      if (parts.length >= 3 && parts[1] === 'transbotai' && parts[2] === 'com') {
        const subdomain = parts[0];
        setCurrentSubdomain(subdomain);
      } else if (hostname === 'transbotai.com' || hostname === 'www.transbotai.com') {
        setCurrentSubdomain('main');
      } else {
        setCurrentSubdomain('main');
      }

      setIsLoading(false);
    };

    detectSubdomain();
  }, []);

  // Show loading while detecting subdomain
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">TransBot AI</h2>
          <p className="text-gray-300">Loading portal...</p>
        </div>
      </div>
    );
  }

  // Route to specific portal based on subdomain
  switch (currentSubdomain) {
    case 'customer':
      return <CustomerPortal />;
    case 'broker':
      return <BrokerPortal />;
    case 'carrier':
      return <CarrierPortal />;
    case 'driver':
      return <DriverPortal />;
    case 'shipper':
      return <ShipperPortal />;
    case 'analytics':
      return <AnalyticsPortal />;
    case 'marketplace':
      return <MarketplacePortal />;
    case 'financial':
      return <FinancialPortal />;
    case 'fleet':
      return <FleetPortal />;
    case 'crm':
      return <CRMPortal />;
    case 'loadboard':
      return <LoadBoardPortal />;
    case 'admin':
      return <AdminPortal />;
    case 'superadmin':
      return <SuperAdminPortal />;
    case 'main':
    default:
      // Show main website for transbotai.com or unknown subdomains
      return <>{children}</>;
  }
};

export default SubdomainRouter;
