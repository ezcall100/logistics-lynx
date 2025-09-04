
import React, { useState } from 'react';
import Link from 'next/link';
import { Brain, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Solutions', href: '#solutions', dropdown: true },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' }
];

const solutions = [
  { name: 'Shipper Portal', href: '/shipper', description: 'Complete shipment management' },
  { name: 'Broker Portal', href: '/broker', description: 'Load matching and brokerage' },
  { name: 'Carrier Portal', href: '/carrier', description: 'Fleet and driver management' },
  { name: 'Driver Portal', href: '/driver', description: 'Mobile app for drivers' }
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TransBot AI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                ) : (
                  <a href={item.href} className="text-gray-700 hover:text-primary-600 transition-colors">
                    {item.name}
                  </a>
                )}
                
                {item.dropdown && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {solutions.map((solution) => (
                      <a
                        key={solution.name}
                        href={solution.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <div className="font-medium">{solution.name}</div>
                        <div className="text-xs text-gray-500">{solution.description}</div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
              Sign In
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600"
              >
                Sign In
              </Link>
              <Link href="/signup">
                <Button className="w-full mt-2">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
