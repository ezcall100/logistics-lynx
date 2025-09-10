import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1e293b', 
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', textAlign: 'center' }}>
          🚀 TransBot AI - Server Working!
        </h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem', textAlign: 'center', fontSize: '1.2rem' }}>
          The server is running on port 3000. React app is loading...
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              🌐 Main Website
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              TransBot AI platform with all portals and features
            </p>
            <a href="/" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: 'rgba(59, 130, 246, 0.5)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Go to Main Site
            </a>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              📊 MCP Dashboard
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Monitor 250 MCP agents in real-time
            </p>
            <a href="/mcp-dashboard" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: 'rgba(16, 185, 129, 0.5)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Open MCP Dashboard
            </a>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              📈 MCP Progress
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Track development progress of all portals
            </p>
            <a href="/mcp-progress" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: 'rgba(245, 158, 11, 0.5)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              View Progress
            </a>
          </div>

          <div style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: '12px', 
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              🌐 All Portals
            </h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Access all 35+ TransBot portals
            </p>
            <a href="/portals" style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '10px 20px',
              backgroundColor: 'rgba(139, 92, 246, 0.5)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Browse Portals
            </a>
          </div>
        </div>

        <div style={{ 
          textAlign: 'center', 
          backgroundColor: 'rgba(0, 255, 0, 0.1)', 
          padding: '20px', 
          borderRadius: '12px',
          border: '1px solid rgba(0, 255, 0, 0.3)'
        }}>
          <h3 style={{ marginBottom: '1rem' }}>✅ Server Status</h3>
          <p style={{ marginBottom: '0.5rem' }}>🌐 Port 3000: Active</p>
          <p style={{ marginBottom: '0.5rem' }}>⚡ Vite Server: Running</p>
          <p style={{ marginBottom: '0.5rem' }}>📅 Time: {new Date().toLocaleString()}</p>
          <p style={{ marginBottom: '0' }}>🔧 React: Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default App;
