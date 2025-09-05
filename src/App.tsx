import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SmartNavigation } from './components/SmartNavigation'
import { SmartLandingPage } from './components/SmartLandingPage'
import { HeroSection } from './components/HeroSection'
import { TrustedBy } from './components/TrustedBy'
import { FeaturesSection } from './components/FeaturesSection'
import { EcosystemGrid } from './components/EcosystemGrid'
import { Footer } from './components/Footer'
import { TestDesign } from './components/TestDesign'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen dark">
          <SmartNavigation />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <SmartLandingPage />
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
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App