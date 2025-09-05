import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WorldClassHeader } from './components/WorldClassHeader'
import { SmartSidebar } from './components/SmartSidebar'
import { NeuralBackground } from './components/NeuralBackground'
import { ModernLandingPage } from './components/ModernLandingPage'
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
import { AuthProvider } from './contexts/AuthContext'
import SolutionsPage from './pages/SolutionsPage'
import PricingPage from './pages/PricingPage'
import ResourcesPage from './pages/ResourcesPage'
import CompanyPage from './pages/CompanyPage'
import IndustriesPage from './pages/IndustriesPage'
import PortalsPage from './pages/PortalsPage'
import AIAgentsPage from './pages/AIAgentsPage'
import TransportationManagement from './pages/solutions/TransportationManagement'
import WarehouseManagement from './pages/solutions/WarehouseManagement'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen relative">
          <NeuralBackground />
          <WorldClassHeader />
          <SmartSidebar />
          <main className="pt-20 pl-64 transition-all duration-500">
            <Routes>
              <Route path="/" element={
                <>
                  <ModernLandingPage />
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
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App