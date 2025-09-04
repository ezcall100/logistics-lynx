import { HeroSection } from '../components/HeroSection'
import { EcosystemGrid } from '../components/EcosystemGrid'
import { AIAgentVisualization } from '../components/AIAgentVisualization'
import { CinematicDemo } from '../components/CinematicDemo'

export function HomePage() {
  return (
    <div className="pt-16">
      <HeroSection />
      <EcosystemGrid />
      <AIAgentVisualization />
      <CinematicDemo />
    </div>
  )
}