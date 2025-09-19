import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Monitor, Palette, Zap, Shield, Key, Database, Plug, Smartphone, BarChart3, FileText, TrendingUp } from 'lucide-react';

const ProductPage: React.FC = () => {
  const features = [
    {
      icon: Monitor,
      title: "Portal OS",
      description: "Unified operating system for all logistics portals with seamless integration and management.",
      path: "/product/portal-os",
      color: "blue"
    },
    {
      icon: Palette,
      title: "Theme System",
      description: "Customizable themes and branding options to match your company's visual identity.",
      path: "/product/theme-system",
      color: "purple"
    },
    {
      icon: Zap,
      title: "Automation",
      description: "AI-powered automation for intelligent decision making and process optimization.",
      path: "/product/automation",
      color: "yellow"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Enterprise-grade security with advanced encryption and compliance standards.",
      path: "/product/security",
      color: "red"
    },
    {
      icon: Key,
      title: "Permissions",
      description: "Granular permission system for role-based access control and user management.",
      path: "/product/permissions",
      color: "green"
    },
    {
      icon: Database,
      title: "Row-Level Security (RLS)",
      description: "Advanced database security with row-level access control and data protection.",
      path: "/product/rls",
      color: "indigo"
    },
    {
      icon: Plug,
      title: "Integrations",
      description: "Seamless integration with third-party systems and APIs for complete connectivity.",
      path: "/product/integrations",
      color: "orange"
    },
    {
      icon: Database,
      title: "APIs",
      description: "Comprehensive API suite for custom integrations and third-party development.",
      path: "/product/apis",
      color: "teal"
    },
    {
      icon: Smartphone,
      title: "Mobile",
      description: "Native mobile applications for iOS and Android with offline capabilities.",
      path: "/product/mobile",
      color: "pink"
    },
    {
      icon: BarChart3,
      title: "Dashboard Customization",
      description: "Fully customizable dashboards with drag-and-drop widgets and real-time data.",
      path: "/product/dashboard-customization",
      color: "cyan"
    },
    {
      icon: FileText,
      title: "Audit Logs",
      description: "Comprehensive audit trails and logging for compliance and security monitoring.",
      path: "/product/audit-logs",
      color: "gray"
    },
    {
      icon: TrendingUp,
      title: "Scalability",
      description: "Built to scale from startup to enterprise with cloud-native architecture.",
      path: "/product/scalability",
      color: "emerald"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-600",
      purple: "bg-purple-100 text-purple-600",
      yellow: "bg-yellow-100 text-yellow-600",
      red: "bg-red-100 text-red-600",
      green: "bg-green-100 text-green-600",
      indigo: "bg-indigo-100 text-indigo-600",
      orange: "bg-orange-100 text-orange-600",
      teal: "bg-teal-100 text-teal-600",
      pink: "bg-pink-100 text-pink-600",
      cyan: "bg-cyan-100 text-cyan-600",
      gray: "bg-gray-100 text-gray-600",
      emerald: "bg-emerald-100 text-emerald-600"
    };
    return colorMap[color] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="responsive-container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">Trans Bot AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <Link to="/solutions" className="text-gray-600 hover:text-gray-900 transition-colors">Solutions</Link>
              <Link to="/product" className="text-blue-600 font-medium">Product</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900 transition-colors">Resources</Link>
              <Link to="/company" className="text-gray-600 hover:text-gray-900 transition-colors">Company</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-gray-600 hover:text-gray-900 transition-colors">Sign In</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful Product Features
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Built for modern logistics with enterprise-grade features, security, and scalability. 
              Everything you need to transform your operations.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="responsive-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.path}
                className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${getColorClasses(feature.color)}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="responsive-container">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Experience the Power of Trans Bot AI
            </h2>
            <p className="text-xl mb-8 opacity-90">
              See how our product features can transform your logistics operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors">
                Start Free Trial
              </Link>
              <Link to="/company/contact" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-8 rounded-lg transition-colors">
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
