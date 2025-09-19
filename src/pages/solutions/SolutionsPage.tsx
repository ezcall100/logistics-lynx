import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Truck, Package, BarChart3, Shield, Zap, Bot, Building2, CreditCard, Globe, Cpu, Settings, Database } from 'lucide-react';
import Navigation from '../../components/Navigation';

const SolutionsPage: React.FC = () => {
  const solutions = [
    {
      title: "Broker Portal",
      description: "Streamline freight brokerage operations with intelligent load matching and carrier management.",
      icon: Users,
      path: "/solutions/broker",
      features: ["Load Matching", "Carrier Management", "Analytics"]
    },
    {
      title: "Carrier Portal",
      description: "Optimize fleet operations with route planning, load optimization, and driver management.",
      icon: Truck,
      path: "/solutions/carrier",
      features: ["Route Planning", "Fleet Management", "Driver Tools"]
    },
    {
      title: "Shipper Portal",
      description: "Simplify shipping with automated booking, tracking, and supply chain visibility.",
      icon: Package,
      path: "/solutions/shipper",
      features: ["Automated Booking", "Real-time Tracking", "Supply Chain Visibility"]
    },
    {
      title: "Driver Portal",
      description: "Mobile-first tools for drivers with navigation, load updates, and communication.",
      icon: Truck,
      path: "/solutions/driver",
      features: ["Mobile Navigation", "Load Updates", "Communication Hub"]
    },
    {
      title: "Owner-Operator Portal",
      description: "Business management tools for independent operators and small fleets.",
      icon: Building2,
      path: "/solutions/owner-operator",
      features: ["Business Management", "Financial Tracking", "Load Optimization"]
    },
    {
      title: "CRM Portal",
      description: "Customer relationship management with automated workflows and communication.",
      icon: Users,
      path: "/solutions/crm",
      features: ["Customer Management", "Automated Workflows", "Communication Tools"]
    },
    {
      title: "EDI Portal",
      description: "Electronic data interchange for seamless integration with trading partners.",
      icon: Database,
      path: "/solutions/edi",
      features: ["Data Integration", "Trading Partner Management", "Compliance"]
    },
    {
      title: "Financials Portal",
      description: "Comprehensive financial management with invoicing, payments, and reporting.",
      icon: CreditCard,
      path: "/solutions/financials",
      features: ["Invoicing", "Payment Processing", "Financial Reporting"]
    },
    {
      title: "Factoring Portal",
      description: "Streamlined factoring operations with automated approvals and funding.",
      icon: CreditCard,
      path: "/solutions/factoring",
      features: ["Automated Approvals", "Quick Funding", "Risk Management"]
    },
    {
      title: "Marketplace Portal",
      description: "Digital marketplace connecting shippers, brokers, and carriers.",
      icon: Globe,
      path: "/solutions/marketplace",
      features: ["Digital Marketplace", "Load Posting", "Bidding System"]
    },
    {
      title: "Analytics Portal",
      description: "Advanced analytics and business intelligence for data-driven decisions.",
      icon: BarChart3,
      path: "/solutions/analytics",
      features: ["Business Intelligence", "Predictive Analytics", "Custom Reports"]
    },
    {
      title: "Autonomous Portal",
      description: "AI-powered automation for autonomous logistics operations.",
      icon: Cpu,
      path: "/solutions/autonomous",
      features: ["AI Automation", "Predictive Planning", "Autonomous Operations"]
    },
    {
      title: "Super Admin Portal",
      description: "Centralized administration for managing all portals and users.",
      icon: Settings,
      path: "/solutions/super-admin",
      features: ["User Management", "Portal Administration", "System Configuration"]
    },
    {
      title: "TMS Admin Portal",
      description: "Transportation management system administration and configuration.",
      icon: Settings,
      path: "/solutions/tms-admin",
      features: ["TMS Configuration", "System Administration", "Performance Monitoring"]
    },
    {
      title: "Security & Compliance",
      description: "Comprehensive security and compliance management across all operations.",
      icon: Shield,
      path: "/solutions/security-compliance",
      features: ["Security Monitoring", "Compliance Tracking", "Risk Management"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Logistics Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Trans Bot AI unifies 24 specialized portals into one intelligent Core Portal OS. 
              One login. One dashboard. Infinite possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-primary text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              <Link to="/company/contact" className="btn-secondary text-lg px-8 py-3">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Portal
            </h2>
            <p className="text-xl text-gray-600">
              Specialized solutions for every role in the logistics ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              return (
                <Link
                  key={index}
                  to={solution.path}
                  className="group glass-effect rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {solution.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {solution.features.map((feature, featureIndex) => (
                      <span
                        key={featureIndex}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-blue-600 mt-4 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="responsive-container">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of logistics professionals who trust Trans Bot AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
                Start Free Trial
              </Link>
              <Link to="/company/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors">
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
