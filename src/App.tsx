import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HorizontalMegaMenu } from './components/HorizontalMegaMenu'
import { AdvancedFAB } from './components/AdvancedFAB'
import { NeuralBackground } from './components/NeuralBackground'
import OutstandingHomePage from './components/OutstandingHomePage'
import { HeroSection } from './components/HeroSection'
import { TrustedBy } from './components/TrustedBy'
import { FeaturesSection } from './components/FeaturesSection'
import { EcosystemGrid } from './components/EcosystemGrid'
import { Footer } from './components/Footer'
import { TestDesign } from './components/TestDesign'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { SuperAdminPortal } from './pages/super-admin/SuperAdminPortal'
import { GetStartedPage } from './pages/GetStartedPage'
import { SubdomainManagement } from './pages/admin/SubdomainManagement'
import { MCPAgentAdmin } from './pages/portals/admin/MCPAgentAdmin'
import { HumanDeveloperAdmin } from './pages/portals/admin/HumanDeveloperAdmin'
import { AuthProvider } from './contexts/AuthContext'
import SolutionsPage from './pages/SolutionsPage'
import PricingPage from './pages/PricingPage'
import ResourcesPage from './pages/ResourcesPage'
import CompanyPage from './pages/CompanyPage'
import IndustriesPage from './pages/IndustriesPage'
import PortalsPage from './pages/PortalsPage'
import AIAgentsPage from './pages/AIAgentsPage'
import TransportationManagement from './pages/solutions/transportation/TransportationManagement'
import RouteOptimizer from './pages/ai-agents/route-optimizer/RouteOptimizer'
import LoadMatcher from './pages/ai-agents/load-matcher/LoadMatcher'
import PredictiveAnalytics from './pages/ai-agents/predictive-analytics/PredictiveAnalytics'
import FleetManager from './pages/ai-agents/fleet-manager/FleetManager'
import CustomerPortal from './pages/portals/customer/CustomerPortal'
import PartnerPortal from './pages/portals/partner/PartnerPortal'
import DeveloperPortal from './pages/portals/developer/DeveloperPortal'
import AdminPortal from './pages/portals/admin/AdminPortal'
import BrokerPortal from './pages/portals/broker/BrokerPortal'
import CarrierPortal from './pages/portals/carrier/CarrierPortal'
import DriverPortal from './pages/portals/driver/DriverPortal'
import ShipperPortal from './pages/portals/shipper/ShipperPortal'
import AnalyticsPortal from './pages/portals/analytics/AnalyticsPortal'
import AutonomousPortal from './pages/portals/autonomous/AutonomousPortal'
import YMSPortal from './pages/portals/yms/YMSPortal'
import DirectoryPortal from './pages/portals/directory/DirectoryPortal'
import RatesPortal from './pages/portals/rates/RatesPortal'
import MarketplacePortal from './pages/portals/marketplace/MarketplacePortal'
import FinancialsPortal from './pages/portals/financials/FinancialsPortal'
import LoadBoardPortal from './pages/portals/load-board/LoadBoardPortal'
import CRMPortal from './pages/portals/crm/CRMPortal'
import EDIPortal from './pages/portals/edi/EDIPortal'
import OwnerOperatorPortal from './pages/portals/owner-operator/OwnerOperatorPortal'
import WorkersPortal from './pages/portals/workers/WorkersPortal'
import FactoringPortal from './pages/portals/factoring/FactoringPortal'
import EnhancedBrokerPortal from './pages/portals/broker/EnhancedBrokerPortal'
import WarehouseManagement from './pages/solutions/WarehouseManagement'
import RouteOptimization from './pages/solutions/RouteOptimization'
import CareersPage from './pages/company/CareersPage'
import LeadershipPage from './pages/company/LeadershipPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative">
          <NeuralBackground />
          <HorizontalMegaMenu />
          <AdvancedFAB />
          <Routes>
              <Route path="/" element={
                <>
                  <OutstandingHomePage />
                  <Footer />
                </>
              } />
              <Route path="/classic" element={
                <>
                  <HeroSection />
                  <TrustedBy />
                  <FeaturesSection />
                  <EcosystemGrid />
                  <Footer />
                </>
              } />
              <Route path="/test" element={<TestDesign />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard/*" element={<DashboardPage />} />
              <Route path="/super-admin/*" element={<SuperAdminPortal />} />
              <Route path="/get-started" element={<GetStartedPage />} />
              <Route path="/admin/subdomains" element={<SubdomainManagement />} />
              <Route path="/admin/mcp-agents" element={<MCPAgentAdmin />} />
              <Route path="/admin/human-developers" element={<HumanDeveloperAdmin />} />
              <Route path="/solutions" element={
                <>
                  <SolutionsPage />
                  <Footer />
                </>
              } />
              <Route path="/solutions/transportation" element={
                <>
                  <TransportationManagement />
                  <Footer />
                </>
              } />
              <Route path="/solutions/warehouse" element={
                <>
                  <WarehouseManagement />
                  <Footer />
                </>
              } />
              <Route path="/solutions/route-optimization" element={
                <>
                  <RouteOptimization />
                  <Footer />
                </>
              } />
              <Route path="/solutions/brokerage" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Freight Brokerage</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - End-to-end brokerage solutions</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/solutions/last-mile" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Last Mile Delivery</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Optimized final delivery solutions</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/agents/route-optimizer" element={
                <>
                  <RouteOptimizer />
                  <Footer />
                </>
              } />
              <Route path="/agents/load-matcher" element={
                <>
                  <LoadMatcher />
                  <Footer />
                </>
              } />
              <Route path="/portals/customer" element={
                <>
                  <CustomerPortal />
                  <Footer />
                </>
              } />
              <Route path="/portals/partner" element={
                <>
                  <PartnerPortal />
                  <Footer />
                </>
              } />
              <Route path="/portals/developer" element={
                <>
                  <DeveloperPortal />
                  <Footer />
                </>
              } />
              <Route path="/portals/admin" element={
                <>
                  <AdminPortal />
                  <Footer />
                </>
              } />
              <Route path="/broker" element={
                <>
                  <BrokerPortal />
                  <Footer />
                </>
              } />
              <Route path="/portals/broker/enhanced" element={
                <>
                  <EnhancedBrokerPortal />
                  <Footer />
                </>
              } />
              <Route path="/carrier" element={
                <>
                  <CarrierPortal />
                  <Footer />
                </>
              } />
              <Route path="/driver" element={
                <>
                  <DriverPortal />
                  <Footer />
                </>
              } />
              <Route path="/shipper" element={
                <>
                  <ShipperPortal />
                  <Footer />
                </>
              } />
              <Route path="/analytics" element={
                <>
                  <AnalyticsPortal />
                  <Footer />
                </>
              } />
              <Route path="/autonomous" element={
                <>
                  <AutonomousPortal />
                  <Footer />
                </>
              } />
              <Route path="/yms" element={
                <>
                  <YMSPortal />
                  <Footer />
                </>
              } />
              <Route path="/directory" element={
                <>
                  <DirectoryPortal />
                  <Footer />
                </>
              } />
              <Route path="/rates" element={
                <>
                  <RatesPortal />
                  <Footer />
                </>
              } />
              <Route path="/marketplace" element={
                <>
                  <MarketplacePortal />
                  <Footer />
                </>
              } />
              <Route path="/financials" element={
                <>
                  <FinancialsPortal />
                  <Footer />
                </>
              } />
              <Route path="/load-board" element={
                <>
                  <LoadBoardPortal />
                  <Footer />
                </>
              } />
              <Route path="/crm" element={
                <>
                  <CRMPortal />
                  <Footer />
                </>
              } />
              <Route path="/edi" element={
                <>
                  <EDIPortal />
                  <Footer />
                </>
              } />
              <Route path="/owner-operator" element={
                <>
                  <OwnerOperatorPortal />
                  <Footer />
                </>
              } />
              <Route path="/workers" element={
                <>
                  <WorkersPortal />
                  <Footer />
                </>
              } />
              <Route path="/factoring" element={
                <>
                  <FactoringPortal />
                  <Footer />
                </>
              } />
              <Route path="/agents/predictive-analytics" element={
                <>
                  <PredictiveAnalytics />
                  <Footer />
                </>
              } />
              <Route path="/agents/fleet-manager" element={
                <>
                  <FleetManager />
                  <Footer />
                </>
              } />
              <Route path="/agents/fuel-optimizer" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Fuel Optimizer</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Minimize fuel consumption with AI</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/agents/demand-forecaster" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Demand Forecaster</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Predict shipping demand with AI</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/agents/price-optimizer" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Price Optimizer</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Dynamic pricing strategies with AI</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/agents/maintenance-predictor" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Maintenance Predictor</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Predictive maintenance alerts with AI</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/pricing" element={
                <>
                  <PricingPage />
                  <Footer />
                </>
              } />
              <Route path="/resources" element={
                <>
                  <ResourcesPage />
                  <Footer />
                </>
              } />
              <Route path="/company" element={
                <>
                  <CompanyPage />
                  <Footer />
                </>
              } />
              <Route path="/careers" element={
                <>
                  <CareersPage />
                  <Footer />
                </>
              } />
              <Route path="/contact" element={
                <>
                  <ContactPage />
                  <Footer />
                </>
              } />
              <Route path="/leadership" element={
                <>
                  <LeadershipPage />
                  <Footer />
                </>
              } />
              <Route path="/press" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Press & News</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Latest news and updates</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/investors" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Investor Information</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Investor relations and financial information</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/partners" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Strategic Partners</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Our strategic partnerships</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/security" element={
                <>
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-transbot-text-primary mb-4">Security & Compliance</h1>
                      <p className="text-transbot-text-secondary">Coming Soon - Security and compliance information</p>
                    </div>
                  </div>
                  <Footer />
                </>
              } />
              <Route path="/industries" element={
                <>
                  <IndustriesPage />
                  <Footer />
                </>
              } />
              <Route path="/portals" element={
                <>
                  <PortalsPage />
                  <Footer />
                </>
              } />
              <Route path="/ai-agents" element={
                <>
                  <AIAgentsPage />
                  <Footer />
                </>
              } />
            </Routes>
    </div>
      </Router>
    </AuthProvider>
  )
}

export default App