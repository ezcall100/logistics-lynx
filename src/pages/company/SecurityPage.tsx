import React from 'react'
import { ResponsiveContainer } from '../../components/ResponsiveContainer'

const SecurityPage: React.FC = () => {
  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Comprehensive security and availability controls audit',
      status: 'Certified',
      icon: '🔒'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system certification',
      status: 'Certified',
      icon: '🛡️'
    },
    {
      name: 'GDPR Compliant',
      description: 'General Data Protection Regulation compliance',
      status: 'Compliant',
      icon: '🔐'
    },
    {
      name: 'HIPAA Ready',
      description: 'Health Insurance Portability and Accountability Act compliance',
      status: 'Ready',
      icon: '🏥'
    }
  ]

  const securityFeatures = [
    {
      title: 'Data Encryption',
      description: 'End-to-end encryption for all data in transit and at rest',
      features: ['AES-256 encryption', 'TLS 1.3 for data in transit', 'Encrypted database storage']
    },
    {
      title: 'Access Control',
      description: 'Multi-factor authentication and role-based access control',
      features: ['MFA enforcement', 'RBAC implementation', 'Single sign-on (SSO)']
    },
    {
      title: 'Network Security',
      description: 'Advanced network protection and monitoring',
      features: ['DDoS protection', 'Intrusion detection', 'Network segmentation']
    },
    {
      title: 'Compliance Monitoring',
      description: 'Continuous compliance monitoring and reporting',
      features: ['Real-time monitoring', 'Automated compliance checks', 'Audit trail logging']
    }
  ]

  const securityPractices = [
    {
      category: 'Infrastructure Security',
      practices: [
        'Multi-layered security architecture',
        'Regular security assessments and penetration testing',
        'Automated vulnerability scanning',
        'Secure development lifecycle (SDL)'
      ]
    },
    {
      category: 'Data Protection',
      practices: [
        'Data classification and handling procedures',
        'Regular data backup and recovery testing',
        'Data loss prevention (DLP) systems',
        'Privacy by design principles'
      ]
    },
    {
      category: 'Incident Response',
      practices: [
        '24/7 security operations center (SOC)',
        'Incident response playbooks',
        'Regular security training for employees',
        'Third-party security assessments'
      ]
    }
  ]

  const complianceFrameworks = [
    {
      name: 'SOC 2',
      description: 'Service Organization Control 2 compliance for security, availability, and confidentiality',
      status: 'Certified'
    },
    {
      name: 'ISO 27001',
      description: 'International standard for information security management systems',
      status: 'Certified'
    },
    {
      name: 'GDPR',
      description: 'European Union General Data Protection Regulation compliance',
      status: 'Compliant'
    },
    {
      name: 'CCPA',
      description: 'California Consumer Privacy Act compliance',
      status: 'Compliant'
    }
  ]

  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <ResponsiveContainer>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 py-16 responsive-container">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 responsive-container">
          {/* Header */}
          <div className="text-center mb-16 responsive-container">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 responsive-container">
              Security & Compliance
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto responsive-container">
              Protecting your data and ensuring compliance with the highest security standards
            </p>
          </div>

          {/* Security Overview */}
          <div className="mb-16 bg-white rounded-2xl shadow-xl p-8 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center responsive-container">Security Overview</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-4xl mx-auto responsive-container">
              At Trans Bot AI, security is at the core of everything we do. We implement industry-leading 
              security practices and maintain compliance with the most stringent standards to protect 
              your data and ensure business continuity.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 responsive-container">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center responsive-container">
                  <div className="text-4xl mb-4 responsive-container">{cert.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 responsive-container">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 responsive-container">{cert.description}</p>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium responsive-container">
                    {cert.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Security Features</h2>
            <div className="grid md:grid-cols-2 gap-8 responsive-container">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 responsive-container">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 responsive-container">{feature.description}</p>
                  <ul className="space-y-3 responsive-container">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start responsive-container">
                        <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0 responsive-container" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 responsive-container">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Security Practices */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Security Practices</h2>
            <div className="grid md:grid-cols-3 gap-8 responsive-container">
              {securityPractices.map((practice, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 responsive-container">{practice.category}</h3>
                  <ul className="space-y-4 responsive-container">
                    {practice.practices.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start responsive-container">
                        <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5 flex-shrink-0 responsive-container" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600 responsive-container">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Frameworks */}
          <div className="mb-16 responsive-container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center responsive-container">Compliance Frameworks</h2>
            <div className="grid md:grid-cols-2 gap-8 responsive-container">
              {complianceFrameworks.map((framework, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300 responsive-container">
                  <div className="flex items-center justify-between mb-4 responsive-container">
                    <h3 className="text-xl font-bold text-gray-900 responsive-container">{framework.name}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium responsive-container">
                      {framework.status}
                    </span>
                  </div>
                  <p className="text-gray-600 responsive-container">{framework.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Security Resources */}
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-xl p-8 text-white text-center responsive-container">
            <h2 className="text-3xl font-bold mb-4 responsive-container">Security Resources</h2>
            <p className="text-xl mb-8 text-red-100 responsive-container">
              Download our security documentation and learn more about our security practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center responsive-container">
              <button className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors responsive-container" aria-label="Button">
                Security Whitepaper
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors responsive-container" aria-label="Button">
                Compliance Report
              </button>
              <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors responsive-container" aria-label="Button">
                Contact Security Team
              </button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 responsive-container">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center responsive-container">Security Contact</h2>
            <div className="grid md:grid-cols-2 gap-8 responsive-container">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container">Security Inquiries</h3>
                <div className="space-y-2 responsive-container">
                  <p className="text-gray-600 responsive-container">Email: security@transbotai.com</p>
                  <p className="text-gray-600 responsive-container">Phone: +1 (555) 123-4567</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 responsive-container">Compliance Questions</h3>
                <div className="space-y-2 responsive-container">
                  <p className="text-gray-600 responsive-container">Email: compliance@transbotai.com</p>
                  <p className="text-gray-600 responsive-container">Phone: +1 (555) 123-4568</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  )
}

export default SecurityPage
