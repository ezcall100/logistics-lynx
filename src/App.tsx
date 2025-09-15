import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/dark-mode.css';
import { HorizontalMegaMenu } from './components/HorizontalMegaMenu';
import { AdvancedFAB } from './components/AdvancedFAB';
import { NeuralBackground } from './components/NeuralBackground';
import { HeroSection } from './components/HeroSection';
import { TrustedBy } from './components/TrustedBy';
import { FeaturesSection } from './components/FeaturesSection';
import { EcosystemGrid } from './components/EcosystemGrid';
import { Footer } from './components/Footer';
import { TestDesign } from './components/TestDesign';
import SubdomainRouter from './components/SubdomainRouter';
// import DashboardPage from './pages/DashboardPage' // Removed - not needed for main website
import TestAuth from './pages/TestAuth';
import PortalEntry from './pages/PortalEntry';
import { GetStartedPage } from './pages/GetStartedPage';
import { SubdomainManagement } from './pages/admin/SubdomainManagement';
import { MCPAgentAdmin } from './pages/portals/admin/MCPAgentAdmin';
import { HumanDeveloperAdmin } from './pages/portals/admin/HumanDeveloperAdmin';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import SolutionsPage from './pages/SolutionsPage';
import PricingPage from './pages/PricingPage';
import ResourcesPage from './pages/ResourcesPage';
import CompanyPage from './pages/CompanyPage';
import AboutPage from './pages/company/AboutPage';
import CareersPage from './pages/company/CareersPage';
import ContactPage from './pages/company/ContactPage';
import LeadershipPage from './pages/company/LeadershipPage';
import PressPage from './pages/company/PressPage';
import InvestorsPage from './pages/company/InvestorsPage';
import PartnersPage from './pages/company/PartnersPage';
import CompanySecurityPage from './pages/company/SecurityPage';
import IndustriesPage from './pages/IndustriesPage';
import PortalsPage from './pages/PortalsPage';
import AIAgentsPage from './pages/AIAgentsPage';
import TransportationManagement from './pages/solutions/transportation/TransportationManagement';
import RouteOptimizer from './pages/ai-agents/route-optimizer/RouteOptimizer';
import LoadMatcher from './pages/ai-agents/load-matcher/LoadMatcher';
import PredictiveAnalytics from './pages/ai-agents/predictive-analytics/PredictiveAnalytics';
import FleetManager from './pages/ai-agents/fleet-manager/FleetManager';
import FuelOptimizer from './pages/ai-agents/fuel-optimizer/FuelOptimizer';
import PriceOptimizer from './pages/ai-agents/price-optimizer/PriceOptimizer';
import DemandForecaster from './pages/ai-agents/demand-forecaster/DemandForecaster';
import MaintenancePredictor from './pages/ai-agents/maintenance-predictor/MaintenancePredictor';
import CarbonOptimizer from './pages/ai-agents/carbon-optimizer/CarbonOptimizer';
import SmartWarehouse from './pages/ai-agents/smart-warehouse/SmartWarehouse';
import CustomerExperience from './pages/ai-agents/customer-experience/CustomerExperience';
import RiskAssessment from './pages/ai-agents/risk-assessment/RiskAssessment';
import CustomerPortal from './pages/portals/customer/CustomerPortal';
import PartnerPortal from './pages/portals/partner/PartnerPortal';
import DeveloperPortal from './pages/portals/developer/DeveloperPortal';
import AdminPortal from './pages/portals/admin/AdminPortal';
import SuperAdminPortal from './pages/portals/super-admin/SuperAdminPortal';
import MCPAgentsPortal from './pages/portals/mcp-agents/MCPAgentsPortal';
import AutonomousPortal from './pages/portals/autonomous/AutonomousPortal';
import BrokerPortal from './pages/portals/broker/BrokerPortal';
import CarrierPortal from './pages/portals/carrier/CarrierPortal';
import DriverPortal from './pages/portals/driver/DriverPortal';
import ShipperPortal from './pages/portals/shipper/ShipperPortal';
import AnalyticsPortal from './pages/portals/analytics/AnalyticsPortal';
import YMSPortal from './pages/portals/yms/YMSPortal';
import DirectoryPortal from './pages/portals/directory/DirectoryPortal';
import RatesPortal from './pages/portals/rates/RatesPortal';
import MarketplacePortal from './pages/portals/marketplace/MarketplacePortal';
import FinancialsPortal from './pages/portals/financials/FinancialsPortal';
import LoadBoardPortal from './pages/portals/load-board/LoadBoardPortal';
import CRMPortal from './pages/portals/crm/CRMPortal';
import EDIPortal from './pages/portals/edi/EDIPortal';
import OwnerOperatorPortal from './pages/portals/owner-operator/OwnerOperatorPortal';
import WorkersPortal from './pages/portals/workers/WorkersPortal';
import FactoringPortal from './pages/portals/factoring/FactoringPortal';
import WarehousePortal from './pages/portals/warehouse/WarehousePortal';
import FleetPortal from './pages/portals/fleet/FleetPortal';
import DispatchPortal from './pages/portals/dispatch/DispatchPortal';
import MaintenancePortal from './pages/portals/maintenance/MaintenancePortal';
import FuelPortal from './pages/portals/fuel/FuelPortal';
import InsurancePortal from './pages/portals/insurance/InsurancePortal';
import CompliancePortal from './pages/portals/compliance/CompliancePortal';
import WarehouseManagement from './pages/solutions/WarehouseManagement';
import RouteOptimization from './pages/solutions/RouteOptimization';
import LoadMatching from './pages/solutions/LoadMatching';
import PredictiveAnalyticsSolution from './pages/solutions/PredictiveAnalytics';
import FleetManagement from './pages/solutions/FleetManagement';
import LastMileDelivery from './pages/solutions/LastMileDelivery';
import BlogPage from './pages/resources/BlogPage';
import CaseStudiesPage from './pages/resources/CaseStudiesPage';
import APIDocumentationPage from './pages/resources/APIDocumentationPage';
import WebinarsPage from './pages/resources/WebinarsPage';
import HelpCenterPage from './pages/resources/HelpCenterPage';
import YardManagementSolution from './pages/solutions/YardManagementSolution';
import FinancialManagementSolution from './pages/solutions/FinancialManagementSolution';
import LoadBoardSolution from './pages/solutions/LoadBoardSolution';
import CRMSolution from './pages/solutions/CRMSolution';
import ShipperSolutions from './pages/solutions/ShipperSolutions';
import CarrierSolutions from './pages/solutions/CarrierSolutions';
import BrokerSolutions from './pages/solutions/BrokerSolutions';
import OwnerOperatorSolutions from './pages/solutions/OwnerOperatorSolutions';
import DriverSolutions from './pages/solutions/DriverSolutions';
import TechnologyPage from './pages/TechnologyPage';
import AITechnologyPage from './pages/technology/AITechnologyPage';
import BlockchainPage from './pages/technology/BlockchainPage';
import CloudInfrastructurePage from './pages/technology/CloudInfrastructurePage';
import APIPlatformPage from './pages/technology/APIPlatformPage';
import DataAnalyticsPage from './pages/technology/DataAnalyticsPage';
import SecurityPage from './pages/technology/SecurityPage';
import IntegrationPage from './pages/technology/IntegrationPage';
import AutomationPage from './pages/technology/AutomationPage';
import MobileTechnologyPage from './pages/technology/MobileTechnologyPage';
import IoTSensorsPage from './pages/technology/IoTSensorsPage';
import EdgeComputingPage from './pages/technology/EdgeComputingPage';
import MicroservicesPage from './pages/technology/MicroservicesPage';
// import MCPProgressDashboard from './pages/MCPProgressDashboard'; // Using port 3002 instead

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SubdomainRouter>
          <Router>
            <div className="min-h-screen relative">
              <NeuralBackground />
              <HorizontalMegaMenu />
              <AdvancedFAB />
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <HeroSection />
                      <TrustedBy />
                      <FeaturesSection />
                      <EcosystemGrid />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/classic"
                  element={
                    <>
                      <HeroSection />
                      <TrustedBy />
                      <FeaturesSection />
                      <EcosystemGrid />
                      <Footer />
                    </>
                  }
                />
                <Route path="/test" element={<TestDesign />} />
                <Route path="/test-auth" element={<TestAuth />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/portal/*"
                  element={
                    <ProtectedRoute>
                      <PortalEntry />
                    </ProtectedRoute>
                  }
                />
                <Route path="/super-admin" element={<SuperAdminPortal />} />
                <Route path="/super-admin/*" element={<SuperAdminPortal />} />
                <Route path="/mcp-agents/*" element={<MCPAgentsPortal />} />
                <Route path="/get-started" element={<GetStartedPage />} />
                <Route path="/admin/subdomains" element={<SubdomainManagement />} />
                <Route path="/admin/mcp-agents" element={<MCPAgentAdmin />} />
                <Route path="/admin/human-developers" element={<HumanDeveloperAdmin />} />
                {/* <Route path="/mcp-dashboard" element={<MCPProgressDashboard />} /> */}{' '}
                {/* Using port 3002 instead */}
                <Route
                  path="/solutions"
                  element={
                    <>
                      <SolutionsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/transportation"
                  element={
                    <>
                      <TransportationManagement />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/warehouse"
                  element={
                    <>
                      <WarehouseManagement />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/route-optimization"
                  element={
                    <>
                      <RouteOptimization />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/load-matching"
                  element={
                    <>
                      <LoadMatching />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/predictive-analytics"
                  element={
                    <>
                      <PredictiveAnalyticsSolution />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/fleet-management"
                  element={
                    <>
                      <FleetManagement />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/last-mile"
                  element={
                    <>
                      <LastMileDelivery />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/yard-management"
                  element={
                    <>
                      <YardManagementSolution />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/financial-management"
                  element={
                    <>
                      <FinancialManagementSolution />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/load-board"
                  element={
                    <>
                      <LoadBoardSolution />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/crm"
                  element={
                    <>
                      <CRMSolution />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/shipper"
                  element={
                    <>
                      <ShipperSolutions />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/carrier"
                  element={
                    <>
                      <CarrierSolutions />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/broker"
                  element={
                    <>
                      <BrokerSolutions />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/owner-operator"
                  element={
                    <>
                      <OwnerOperatorSolutions />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/solutions/driver"
                  element={
                    <>
                      <DriverSolutions />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/route-optimizer"
                  element={
                    <>
                      <RouteOptimizer />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/load-matcher"
                  element={
                    <>
                      <LoadMatcher />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/customer"
                  element={
                    <>
                      <CustomerPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/partner"
                  element={
                    <>
                      <PartnerPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/developer"
                  element={
                    <>
                      <DeveloperPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/admin"
                  element={
                    <>
                      <AdminPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/autonomous"
                  element={
                    <>
                      <AutonomousPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/broker"
                  element={
                    <>
                      <BrokerPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/carrier"
                  element={
                    <>
                      <CarrierPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/driver"
                  element={
                    <>
                      <DriverPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/shipper"
                  element={
                    <>
                      <ShipperPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/analytics"
                  element={
                    <>
                      <AnalyticsPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/yms"
                  element={
                    <>
                      <YMSPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/directory"
                  element={
                    <>
                      <DirectoryPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/rates"
                  element={
                    <>
                      <RatesPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/marketplace"
                  element={
                    <>
                      <MarketplacePortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/financials"
                  element={
                    <>
                      <FinancialsPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/load-board"
                  element={
                    <>
                      <LoadBoardPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/crm"
                  element={
                    <>
                      <CRMPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/edi"
                  element={
                    <>
                      <EDIPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/owner-operator"
                  element={
                    <>
                      <OwnerOperatorPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/workers"
                  element={
                    <>
                      <WorkersPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/factoring"
                  element={
                    <>
                      <FactoringPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/warehouse"
                  element={
                    <>
                      <WarehousePortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/fleet"
                  element={
                    <>
                      <FleetPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/dispatch"
                  element={
                    <>
                      <DispatchPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/maintenance"
                  element={
                    <>
                      <MaintenancePortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/fuel"
                  element={
                    <>
                      <FuelPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/insurance"
                  element={
                    <>
                      <InsurancePortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals/compliance"
                  element={
                    <>
                      <CompliancePortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/broker"
                  element={
                    <>
                      <BrokerPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/carrier"
                  element={
                    <>
                      <CarrierPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/driver"
                  element={
                    <>
                      <DriverPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/shipper"
                  element={
                    <>
                      <ShipperPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <>
                      <AnalyticsPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/autonomous"
                  element={
                    <>
                      <AutonomousPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/yms"
                  element={
                    <>
                      <YMSPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/directory"
                  element={
                    <>
                      <DirectoryPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/rates"
                  element={
                    <>
                      <RatesPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/marketplace"
                  element={
                    <>
                      <MarketplacePortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/financials"
                  element={
                    <>
                      <FinancialsPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/load-board"
                  element={
                    <>
                      <LoadBoardPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/crm"
                  element={
                    <>
                      <CRMPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/edi"
                  element={
                    <>
                      <EDIPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/owner-operator"
                  element={
                    <>
                      <OwnerOperatorPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/workers"
                  element={
                    <>
                      <WorkersPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/factoring"
                  element={
                    <>
                      <FactoringPortal />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/predictive-analytics"
                  element={
                    <>
                      <PredictiveAnalytics />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/fleet-manager"
                  element={
                    <>
                      <FleetManager />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/fuel-optimizer"
                  element={
                    <>
                      <FuelOptimizer />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/demand-forecaster"
                  element={
                    <>
                      <DemandForecaster />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/price-optimizer"
                  element={
                    <>
                      <PriceOptimizer />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/maintenance-predictor"
                  element={
                    <>
                      <MaintenancePredictor />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/carbon-optimizer"
                  element={
                    <>
                      <CarbonOptimizer />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/smart-warehouse"
                  element={
                    <>
                      <SmartWarehouse />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/customer-experience"
                  element={
                    <>
                      <CustomerExperience />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/agents/risk-assessment"
                  element={
                    <>
                      <RiskAssessment />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/pricing"
                  element={
                    <>
                      <PricingPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/resources"
                  element={
                    <>
                      <ResourcesPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/about"
                  element={
                    <>
                      <AboutPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/careers"
                  element={
                    <>
                      <CareersPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/contact"
                  element={
                    <>
                      <ContactPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/leadership"
                  element={
                    <>
                      <LeadershipPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/press"
                  element={
                    <>
                      <PressPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/investors"
                  element={
                    <>
                      <InvestorsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/partners"
                  element={
                    <>
                      <PartnersPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company/security"
                  element={
                    <>
                      <CompanySecurityPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/company"
                  element={
                    <>
                      <CompanyPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/careers"
                  element={
                    <>
                      <CareersPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <>
                      <ContactPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/leadership"
                  element={
                    <>
                      <LeadershipPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/press"
                  element={
                    <>
                      <PressPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/investors"
                  element={
                    <>
                      <InvestorsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/partners"
                  element={
                    <>
                      <PartnersPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/security"
                  element={
                    <>
                      <SecurityPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/industries"
                  element={
                    <>
                      <IndustriesPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/portals"
                  element={
                    <>
                      <PortalsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/ai-agents"
                  element={
                    <>
                      <AIAgentsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology"
                  element={
                    <>
                      <TechnologyPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/ai"
                  element={
                    <>
                      <AITechnologyPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/blockchain"
                  element={
                    <>
                      <BlockchainPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/cloud"
                  element={
                    <>
                      <CloudInfrastructurePage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/api"
                  element={
                    <>
                      <APIPlatformPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/analytics"
                  element={
                    <>
                      <DataAnalyticsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/security"
                  element={
                    <>
                      <SecurityPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/integration"
                  element={
                    <>
                      <IntegrationPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/automation"
                  element={
                    <>
                      <AutomationPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/mobile"
                  element={
                    <>
                      <MobileTechnologyPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/iot"
                  element={
                    <>
                      <IoTSensorsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/edge"
                  element={
                    <>
                      <EdgeComputingPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/technology/microservices"
                  element={
                    <>
                      <MicroservicesPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/resources/blog"
                  element={
                    <>
                      <BlogPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/resources/case-studies"
                  element={
                    <>
                      <CaseStudiesPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/resources/api-docs"
                  element={
                    <>
                      <APIDocumentationPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/resources/webinars"
                  element={
                    <>
                      <WebinarsPage />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/resources/help-center"
                  element={
                    <>
                      <HelpCenterPage />
                      <Footer />
                    </>
                  }
                />
                {/* MCP Dashboard routes removed - causing errors */}
              </Routes>
            </div>
          </Router>
        </SubdomainRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
