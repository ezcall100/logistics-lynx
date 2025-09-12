import React, { useState, useEffect } from 'react';
import RealTimePortalStatus from '../../../components/RealTimePortalStatus';
import PortalUpdateSystem from '../../../utils/PortalUpdateSystem';

function ReportingPortal() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [portalData, setPortalData] = useState({
    status: 'active',
    progress: 0,
    lastUpdate: new Date(),
    metrics: {
      efficiency: 0,
      performance: 0,
      reliability: 0,
    },
  });

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setPortalData(prev => ({
        ...prev,
        progress: Math.min(prev.progress + Math.random() * 2, 100),
        lastUpdate: new Date(),
        metrics: {
          efficiency: Math.min(prev.metrics.efficiency + Math.random() * 1, 100),
          performance: Math.min(prev.metrics.performance + Math.random() * 1, 100),
          reliability: Math.min(prev.metrics.reliability + Math.random() * 1, 100),
        },
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)',
        color: 'white',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.15) 0%, transparent 50%)
          `,
          animation: 'pulse 20s ease-in-out infinite',
        }}
      />

      {/* Real-time Portal Status */}
      <RealTimePortalStatus />

      {/* Main Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '32px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1
              style={{
                fontSize: '3rem',
                fontWeight: '900',
                margin: '0 0 12px 0',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(102, 126, 234, 0.5)',
                letterSpacing: '-0.02em',
              }}
            >
              🚀 Reporting Portal
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', margin: 0, fontWeight: '500' }}>
              Enterprise-grade {PortalName.toLowerCase()} management with real-time analytics
            </p>
          </div>

          {/* Dashboard Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Status Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  margin: '0 0 16px 0',
                  color: '#e2e8f0',
                }}
              >
                📊 Portal Status
              </h3>
              <div
                style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#10b981',
                  marginBottom: '16px',
                }}
              >
                {portalData.progress.toFixed(1)}%
              </div>
              <div
                style={{
                  width: '100%',
                  height: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  marginBottom: '16px',
                }}
              >
                <div
                  style={{
                    width: `${portalData.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%)',
                    borderRadius: '6px',
                    transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
              <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: 0 }}>
                Last updated: {portalData.lastUpdate.toLocaleTimeString()}
              </p>
            </div>

            {/* Metrics Cards */}
            {Object.entries(portalData.metrics).map(([key, value]) => (
              <div
                key={key}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '24px',
                  padding: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  boxShadow:
                    '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    margin: '0 0 12px 0',
                    color: '#e2e8f0',
                  }}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h4>
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#3b82f6',
                    marginBottom: '8px',
                  }}
                >
                  {value.toFixed(1)}%
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '3px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${value}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>⚡</span>
      </div>

      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '280px',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '32px 24px',
          zIndex: 100,
          overflowY: 'auto',
        }}
      >
        <h3
          style={{ fontSize: '1.2rem', fontWeight: '700', margin: '0 0 24px 0', color: '#e2e8f0' }}
        >
          Reporting Portal
        </h3>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['Dashboard', 'Analytics', 'Settings', 'Reports', 'Users', 'Configuration'].map(item => (
            <a
              key={item}
              href="#"
              style={{
                display: 'block',
                padding: '12px 16px',
                color: '#94a3b8',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem',
                fontWeight: '500',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                e.currentTarget.style.color = '#3b82f6';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#94a3b8';
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default ReportingPortal;
