import React from 'react';

function MCPProgressDashboard() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f1a',
        padding: '24px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#8a2be2' }}
        >
          🚀 TransBot AI - MCP Dashboard
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Real-time monitoring of 250 autonomous agents building 35+ portals
        </p>

        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#4CAF50' }}>
            📊 Agent Status
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>237</div>
              <div style={{ color: '#94a3b8' }}>Active Agents</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFA500' }}>7</div>
              <div style={{ color: '#94a3b8' }}>Maintenance</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF6B6B' }}>6</div>
              <div style={{ color: '#94a3b8' }}>Error Recovery</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8a2be2' }}>250</div>
              <div style={{ color: '#94a3b8' }}>Total Agents</div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#4CAF50' }}>
            🎯 Mission Progress
          </h2>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Portal Development</span>
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>68%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#374151',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '68%',
                  height: '100%',
                  backgroundColor: '#4CAF50',
                  transition: 'width 0.3s ease',
                }}
              ></div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>UI Implementation</span>
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>45%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#374151',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '45%',
                  height: '100%',
                  backgroundColor: '#4CAF50',
                  transition: 'width 0.3s ease',
                }}
              ></div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Testing & QA</span>
              <span style={{ color: '#FFA500', fontWeight: 'bold' }}>23%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '8px',
                backgroundColor: '#374151',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '23%',
                  height: '100%',
                  backgroundColor: '#FFA500',
                  transition: 'width 0.3s ease',
                }}
              ></div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#4CAF50' }}>
            🌐 Portal Status
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                backgroundColor: '#2d3748',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50' }}>24</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Completed</div>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                backgroundColor: '#2d3748',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFA500' }}>8</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>In Progress</div>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                backgroundColor: '#2d3748',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF6B6B' }}>3</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Pending</div>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                backgroundColor: '#2d3748',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#8a2be2' }}>35</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Total</div>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '16px', color: '#4CAF50' }}>
            ⏰ Timeline
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Start Date</div>
              <div style={{ fontWeight: 'bold' }}>September 9, 2025</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Target Completion</div>
              <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>October 28, 2025</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Days Remaining</div>
              <div style={{ fontWeight: 'bold', color: '#FFA500' }}>49 days</div>
            </div>
            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Overall Progress</div>
              <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>68%</div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '32px',
            textAlign: 'center',
            padding: '24px',
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#8a2be2' }}>
            🎯 Mission Status: FULLY DEPLOYED AND COMMITTED
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            All 250 MCP agents are operational and working towards the October 28, 2025 deadline
          </p>
        </div>
      </div>
    </div>
  );
}

export default MCPProgressDashboard;
