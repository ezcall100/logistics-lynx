import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Shield, 
  Globe, 
  Code, 
  BarChart3, 
  Layers, 
  Zap, 
  Server,
  Database,
  Cloud,
  Network,
  Lock,
  Smartphone,
  Activity
} from 'lucide-react';

const TechnologyPage: React.FC = () => {
  const technologies = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description: "Advanced artificial intelligence and machine learning algorithms power our intelligent logistics platform.",
      features: ["Deep Learning Models", "Predictive Analytics", "Natural Language Processing", "Computer Vision"],
      color: "text-purple-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Shield,
      title: "Blockchain Technology",
      description: "Secure, transparent, and immutable blockchain technology ensures data integrity and trust.",
      features: ["Smart Contracts", "Decentralized Storage", "Cryptographic Security", "Immutable Records"],
      color: "text-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Globe,
      title: "Cloud Infrastructure",
      description: "Scalable cloud architecture built on modern cloud platforms for global reach and reliability.",
      features: ["Multi-Cloud Deployment", "Auto-Scaling", "Global CDN", "99.9% Uptime"],
      color: "text-green-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Code,
      title: "API Platform",
      description: "Developer-friendly APIs with comprehensive documentation and SDK support.",
      features: ["RESTful APIs", "GraphQL", "Real-time WebSockets", "SDK Libraries"],
      color: "text-orange-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description: "Advanced data processing and analytics engine for real-time insights and reporting.",
      features: ["Real-time Processing", "Big Data Analytics", "Business Intelligence", "Custom Dashboards"],
      color: "text-cyan-500",
      bgColor: "bg-cyan-50"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level security with multi-layered protection and compliance standards.",
      features: ["End-to-End Encryption", "Multi-Factor Auth", "SOC 2 Compliance", "GDPR Ready"],
      color: "text-red-500",
      bgColor: "bg-red-50"
    }
  ];

  const techStack = [
    {
      category: "Frontend",
      technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
      icon: Smartphone
    },
    {
      category: "Backend",
      technologies: ["Node.js", "Python", "Go", "Microservices", "GraphQL"],
      icon: Server
    },
    {
      category: "Database",
      technologies: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "TimescaleDB"],
      icon: Database
    },
    {
      category: "Cloud & DevOps",
      technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD"],
      icon: Cloud
    },
    {
      category: "AI/ML",
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "MLflow"],
      icon: Brain
    },
    {
      category: "Security",
      technologies: ["OAuth 2.0", "JWT", "SSL/TLS", "Vault", "WAF"],
      icon: Shield
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime SLA", icon: Activity },
    { number: "< 100ms", label: "API Response", icon: Zap },
    { number: "24/7", label: "Monitoring", icon: Network },
    { number: "SOC 2", label: "Compliance", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl">
                <Code className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Technology Stack
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Built on cutting-edge technology to deliver enterprise-grade logistics solutions. 
              Our platform combines AI, cloud computing, and modern software architecture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technologies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is built on a foundation of cutting-edge technologies 
              designed for scale, security, and performance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`inline-flex p-3 rounded-xl ${tech.bgColor} mb-6`}>
                  <tech.icon className={`h-8 w-8 ${tech.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {tech.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {tech.description}
                </p>
                <div className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern, scalable technologies powering our logistics platform 
              for enterprise-grade performance and reliability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techStack.map((stack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mr-4">
                    <stack.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {stack.category}
                  </h3>
                </div>
                <div className="space-y-3">
                  {stack.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-medium">{tech}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center mb-6">
                <Layers className="h-12 w-12 text-blue-400 mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Modern Architecture
                </h2>
              </div>
              <p className="text-xl text-blue-100 mb-8">
                Built with microservices architecture, our platform ensures scalability, 
                reliability, and maintainability. Each component is designed to work 
                independently while maintaining seamless integration.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-lg">Microservices Architecture</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-lg">Event-Driven Design</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-lg">Container Orchestration</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-lg">Auto-Scaling Infrastructure</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Architecture</span>
                    <span className="text-white font-semibold">Microservices</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Deployment</span>
                    <span className="text-white font-semibold">Kubernetes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Monitoring</span>
                    <span className="text-white font-semibold">24/7 Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200">Security</span>
                    <span className="text-white font-semibold">Enterprise Grade</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
