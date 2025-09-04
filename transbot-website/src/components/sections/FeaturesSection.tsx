
import React from 'react';
import { Brain, Zap, Shield, Globe, Users, BarChart3 } from 'lucide-react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';

const features = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: 'Advanced AI Intelligence',
    description: 'Enterprise-grade artificial intelligence with machine learning capabilities for predictive analytics and automated decision-making',
    category: 'AI & Analytics',
    color: 'from-primary-500 to-secondary-600'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Automated Operations',
    description: 'Streamlined logistics management with intelligent automation reducing manual tasks by 80%',
    category: 'Automation',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Predictive Analytics',
    description: 'Data-driven insights for strategic decision making with real-time market intelligence',
    category: 'Analytics',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Enterprise Security',
    description: 'Bank-level security protocols and compliance standards with SOC 2 Type II certification',
    category: 'Security',
    color: 'from-red-500 to-pink-600'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Integration',
    description: 'Seamless integration with existing enterprise systems and third-party platforms',
    category: 'Integration',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Team Collaboration',
    description: 'Advanced collaboration tools for distributed teams with real-time communication',
    category: 'Collaboration',
    color: 'from-blue-500 to-cyan-600'
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Logistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to manage your transportation operations efficiently and scale your business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="transform hover:-translate-y-1">
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center text-white mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <span className="inline-block bg-primary-100 text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                {feature.category}
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
