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
import DispatchPortal from '../pages/portals/dispatch/DispatchPortal';
import CompliancePortal from '../pages/portals/compliance/CompliancePortal';
import WarehousePortal from '../pages/portals/warehouse/WarehousePortal';
import RouteOptimizer from '../pages/ai-agents/route-optimizer/RouteOptimizer';
import FuelPortal from '../pages/portals/fuel/FuelPortal';
import MaintenancePortal from '../pages/portals/maintenance/MaintenancePortal';
import InsurancePortal from '../pages/portals/insurance/InsurancePortal';
import EDIPortal from '../pages/portals/edi/EDIPortal';
import FactoringPortal from '../pages/portals/factoring/FactoringPortal';
import RatesPortal from '../pages/portals/rates/RatesPortal';
import YMSPortal from '../pages/portals/yms/YMSPortal';
import WorkersPortal from '../pages/portals/workers/WorkersPortal';
import AutonomousPortal from '../pages/portals/autonomous/AutonomousPortal';

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
    // Core TMS Portals (Completed - Live)
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

    // Business Operations Portals
    case 'financial':
      return <FinancialPortal />;
    case 'fleet':
      return <FleetPortal />;
    case 'crm':
      return <CRMPortal />;
    case 'loadboard':
      return <LoadBoardPortal />;
    case 'dispatch':
      return <DispatchPortal />;
    case 'compliance':
      return <CompliancePortal />;
    case 'warehouse':
      return <WarehousePortal />;
    case 'route':
      return <RouteOptimizer />;
    case 'fuel':
      return <FuelPortal />;
    case 'maintenance':
      return <MaintenancePortal />;
    case 'insurance':
      return <InsurancePortal />;
    case 'billing':
      return <FinancialPortal />; // Using FinancialPortal for billing
    case 'contract':
      return <CRMPortal />; // Using CRMPortal for contracts
    case 'communication':
      return <CRMPortal />; // Using CRMPortal for communication
    case 'edi':
      return <EDIPortal />;
    case 'factoring':
      return <FactoringPortal />;
    case 'rates':
      return <RatesPortal />;

    // Admin & Specialized Portals
    case 'admin':
      return <AdminPortal />;
    case 'superadmin':
      return <SuperAdminPortal />;
    case 'mcp-agent':
      return <SuperAdminPortal />; // Using SuperAdminPortal for MCP agents
    case 'dev-admin':
      return <AdminPortal />; // Using AdminPortal for dev admin
    case 'autonomous':
      return <AutonomousPortal />;
    case 'yms':
      return <YMSPortal />;
    case 'workers':
      return <WorkersPortal />;

    // Documentation and Reporting
    case 'documentation':
      return <AnalyticsPortal />; // Using AnalyticsPortal for documentation
    case 'reporting':
      return <AnalyticsPortal />; // Using AnalyticsPortal for reporting
    case 'integration':
      return <EDIPortal />; // Using EDIPortal for integration

    case 'main':
    default:
      // Show main website for transbotai.com or unknown subdomains
      return <>{children}</>;
  }
};

export default SubdomainRouter;
