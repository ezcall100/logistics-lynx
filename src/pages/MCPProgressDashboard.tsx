import React from 'react';

function MCPProgressDashboard() {
  console.log('MCP Dashboard component is rendering...');
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1e293b', 
      padding: '24px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          MCP Agent Progress Dashboard
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
          Real-time monitoring of 250 autonomous agents building 35+ portals
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginBottom: '32px'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Mission Timeline
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Started:</span>
                <span>December 19, 2024</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Deadline:</span>
                <span>October 28, 2025</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Status:</span>
                <span style={{ color: '#10b981' }}>Active</span>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Overall Progress
            </h3>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '8px' }}>
                15.2%
              </div>
              <div style={{ 
                width: '100%', 
                backgroundColor: '#374151', 
                borderRadius: '9999px', 
                height: '12px',
                marginBottom: '8px'
              }}>
                <div
                  style={{ 
                    background: 'linear-gradient(to right, #3b82f6, #10b981)',
                    height: '12px',
                    borderRadius: '9999px',
                    width: '15.2%'
                  }}
                ></div>
              </div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                Phase 1: Foundation & Infrastructure
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '16px' }}>
              Agent Status
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                  <span style={{ color: '#94a3b8' }}>Active</span>
                </div>
                <span style={{ fontWeight: '600' }}>238</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                  <span style={{ color: '#94a3b8' }}>Maintenance</span>
                </div>
                <span style={{ fontWeight: '600' }}>7</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                  <span style={{ color: '#94a3b8' }}>Error Recovery</span>
                </div>
                <span style={{ fontWeight: '600' }}>5</span>
              </div>
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8' }}>Total Agents</span>
                  <span style={{ fontWeight: '600' }}>250</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '12px', 
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '24px' }}>
            Portal Development Progress
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '16px'
          }}>
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '8px', 
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Super Admin Portal</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Admin</p>
                </div>
                <div style={{ 
                  padding: '4px 12px', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#10b981'
                }}>
                  complete
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#94a3b8' }}>Progress</span>
                  <span style={{ fontWeight: '500' }}>100.0%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  backgroundColor: '#374151', 
                  borderRadius: '9999px', 
                  height: '8px'
                }}>
                  <div style={{ 
                    backgroundColor: '#10b981',
                    height: '8px',
                    borderRadius: '9999px',
                    width: '100%'
                  }}></div>
                </div>
              </div>
            </div>

            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '8px', 
              padding: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Broker Portal</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Core TMS</p>
                </div>
                <div style={{ 
                  padding: '4px 12px', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem',
                  backgroundColor: 'rgba(245, 158, 11, 0.2)',
                  color: '#f59e0b'
                }}>
                  development
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                  <span style={{ color: '#94a3b8' }}>Progress</span>
                  <span style={{ fontWeight: '500' }}>20.2%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  backgroundColor: '#374151', 
                  borderRadius: '9999px', 
                  height: '8px'
                }}>
                  <div style={{ 
                    backgroundColor: '#f59e0b',
                    height: '8px',
                    borderRadius: '9999px',
                    width: '20.2%'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            color: '#10b981',
            padding: '8px 16px',
            borderRadius: '8px'
          }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: '#10b981', 
              borderRadius: '50%',
              animation: 'pulse 2s infinite'
            }}></div>
            <span>All 250 agents are actively working</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCPProgressDashboard;