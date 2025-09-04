import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary/50 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">TB</span>
              </div>
              <span className="text-xl font-bold text-white">Trans Bot AI</span>
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              The Industry Redefiner. One Platform. Every Freight Journey. 
              250 AI Agents. Infinite Possibilities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#ecosystem" className="text-white/70 hover:text-white transition-colors">
                  Core TMS Portals
                </Link>
              </li>
              <li>
                <Link to="/#ecosystem" className="text-white/70 hover:text-white transition-colors">
                  Business Operations
                </Link>
              </li>
              <li>
                <Link to="/#ai-agents" className="text-white/70 hover:text-white transition-colors">
                  AI Agents
                </Link>
              </li>
              <li>
                <Link to="/#demo" className="text-white/70 hover:text-white transition-colors">
                  Lead-to-Ledger
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 Trans Bot AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}