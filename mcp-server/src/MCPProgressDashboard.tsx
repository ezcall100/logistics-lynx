import React, { useState, useEffect } from 'react';

function MCPProgressDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

        {/* Individual Portal Details */}
        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#4CAF50' }}>
            🌐 Individual Portal Details & Real-Time Status
          </h2>

          {/* Core TMS Portals */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontSize: '1.3rem',
                marginBottom: '16px',
                color: '#4CAF50',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              🚛 Core TMS Portals (11 portals)
              <span
                style={{
                  fontSize: '0.9rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  marginLeft: '12px',
                }}
              >
                100% Complete
              </span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #4CAF50',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  LIVE
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                    marginBottom: '8px',
                  }}
                >
                  Customer Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Customer self-service platform with advanced analytics
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 'bold' }}>
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', backgroundColor: '#4CAF50' }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>12</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>2.5K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.9★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Uptime:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>99.9%</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #4CAF50',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  LIVE
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                    marginBottom: '8px',
                  }}
                >
                  Broker Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Freight brokerage management with AI-powered matching
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 'bold' }}>
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', backgroundColor: '#4CAF50' }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>15</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>1.2K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.7★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Uptime:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>99.8%</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #4CAF50',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  LIVE
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                    marginBottom: '8px',
                  }}
                >
                  Carrier Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Carrier operations management with fleet optimization
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 'bold' }}>
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', backgroundColor: '#4CAF50' }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>18</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>1.8K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.8★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Uptime:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>99.7%</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #4CAF50',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  LIVE
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                    marginBottom: '8px',
                  }}
                >
                  Driver Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Mobile driver interface with real-time navigation
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 'bold' }}>
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', backgroundColor: '#4CAF50' }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>20</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>5.2K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.9★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Uptime:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>99.9%</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #4CAF50',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  LIVE
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                    marginBottom: '8px',
                  }}
                >
                  Shipper Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Shipment management with predictive analytics
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 'bold' }}>
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', backgroundColor: '#4CAF50' }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>16</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>2.5K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.9★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Uptime:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>99.8%</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #4CAF50',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  LIVE
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#4CAF50',
                    marginBottom: '8px',
                  }}
                >
                  Analytics Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Business intelligence dashboard with ML insights
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#4CAF50', fontWeight: 'bold' }}>
                      100%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{ width: '100%', height: '100%', backgroundColor: '#4CAF50' }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>14</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>980+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.8★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Uptime:</span>{' '}
                    <span style={{ color: '#4CAF50' }}>99.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Operations Portals */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontSize: '1.3rem',
                marginBottom: '16px',
                color: '#FFA500',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              💼 Business Operations Portals (16 portals)
              <span
                style={{
                  fontSize: '0.9rem',
                  backgroundColor: '#FFA500',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  marginLeft: '12px',
                }}
              >
                68% Complete
              </span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #FFA500',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#FFA500',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FFA500',
                    marginBottom: '8px',
                  }}
                >
                  Financial Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Financial management with automated invoicing
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#FFA500', fontWeight: 'bold' }}>
                      85%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '85%', height: '100%', backgroundColor: '#FFA500' }}></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#FFA500' }}>14</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#FFA500' }}>890+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.8★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>ETA:</span>{' '}
                    <span style={{ color: '#FFA500' }}>3 days</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #FFA500',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#FFA500',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FFA500',
                    marginBottom: '8px',
                  }}
                >
                  Load Board Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Load board management with smart matching
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#FFA500', fontWeight: 'bold' }}>
                      90%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '90%', height: '100%', backgroundColor: '#FFA500' }}></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#FFA500' }}>18</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#FFA500' }}>3.2K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.7★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>ETA:</span>{' '}
                    <span style={{ color: '#FFA500' }}>2 days</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #FFA500',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#FFA500',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FFA500',
                    marginBottom: '8px',
                  }}
                >
                  CRM Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Customer relationship management with AI insights
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#FFA500', fontWeight: 'bold' }}>
                      75%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '75%', height: '100%', backgroundColor: '#FFA500' }}></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#FFA500' }}>12</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#FFA500' }}>1.3K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.6★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>ETA:</span>{' '}
                    <span style={{ color: '#FFA500' }}>5 days</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #FFA500',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#FFA500',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FFA500',
                    marginBottom: '8px',
                  }}
                >
                  Fleet Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Fleet management with predictive maintenance
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#FFA500', fontWeight: 'bold' }}>
                      90%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '90%', height: '100%', backgroundColor: '#FFA500' }}></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#FFA500' }}>16</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#FFA500' }}>1.4K+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.7★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>ETA:</span>{' '}
                    <span style={{ color: '#FFA500' }}>2 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin & Specialized Portals */}
          <div style={{ marginBottom: '32px' }}>
            <h3
              style={{
                fontSize: '1.3rem',
                marginBottom: '16px',
                color: '#FF6B6B',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              🔧 Admin & Specialized Portals (4 portals)
              <span
                style={{
                  fontSize: '0.9rem',
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  marginLeft: '12px',
                }}
              >
                35% Complete
              </span>
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '16px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #FF6B6B',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#FF6B6B',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    marginBottom: '8px',
                  }}
                >
                  Super Admin Portal
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Master system control with advanced monitoring
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#FF6B6B', fontWeight: 'bold' }}>
                      30%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '30%', height: '100%', backgroundColor: '#FF6B6B' }}></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#FF6B6B' }}>8</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#FF6B6B' }}>25+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>5.0★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>ETA:</span>{' '}
                    <span style={{ color: '#FF6B6B' }}>15 days</span>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '16px',
                  borderRadius: '10px',
                  border: '2px solid #FF6B6B',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: '#FF6B6B',
                    color: 'white',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                  }}
                >
                  DEV
                </div>
                <h4
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    color: '#FF6B6B',
                    marginBottom: '8px',
                  }}
                >
                  MCP Agent Admin
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px' }}>
                  Manage and monitor AI development agents
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '4px',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Progress</span>
                    <span style={{ fontSize: '0.8rem', color: '#FF6B6B', fontWeight: 'bold' }}>
                      40%
                    </span>
                  </div>
                  <div
                    style={{
                      width: '100%',
                      height: '6px',
                      backgroundColor: '#374151',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ width: '40%', height: '100%', backgroundColor: '#FF6B6B' }}></div>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Agents:</span>{' '}
                    <span style={{ color: '#FF6B6B' }}>4</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Users:</span>{' '}
                    <span style={{ color: '#FF6B6B' }}>85+</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>Rating:</span>{' '}
                    <span style={{ color: '#FFD700' }}>4.9★</span>
                  </div>
                  <div>
                    <span style={{ color: '#a0a0a0' }}>ETA:</span>{' '}
                    <span style={{ color: '#FF6B6B' }}>12 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Portal Analytics */}
        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#4CAF50' }}>
            📊 Portal Analytics & Performance
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
              marginBottom: '24px',
            }}
          >
            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #4CAF50',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#4CAF50' }}>
                🏆 Top Performing Portals
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Driver Portal</span>
                  <span style={{ color: '#4CAF50' }}>5.2K users</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Marketplace Portal</span>
                  <span style={{ color: '#4CAF50' }}>2.1K users</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Load Board Portal</span>
                  <span style={{ color: '#4CAF50' }}>3.2K users</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #FFA500',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#FFA500' }}>
                ⚡ Development Velocity
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Portals/Day</span>
                  <span style={{ color: '#FFA500' }}>0.8</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Features/Day</span>
                  <span style={{ color: '#FFA500' }}>12.5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Bug Fixes/Day</span>
                  <span style={{ color: '#FFA500' }}>8.3</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #8a2be2',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#8a2be2' }}>
                🎯 Quality Metrics
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Avg Rating</span>
                  <span style={{ color: '#8a2be2' }}>4.7/5.0</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Uptime</span>
                  <span style={{ color: '#8a2be2' }}>99.8%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Response Time</span>
                  <span style={{ color: '#8a2be2' }}>120ms</span>
                </div>
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #FF6B6B',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#FF6B6B' }}>
                🚨 Critical Issues
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>High Priority</span>
                  <span style={{ color: '#FF6B6B' }}>3</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Medium Priority</span>
                  <span style={{ color: '#FF6B6B' }}>12</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Low Priority</span>
                  <span style={{ color: '#FF6B6B' }}>28</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Distribution */}
        <div
          style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#4CAF50' }}>
            🤖 Agent Distribution by Portal Category
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #4CAF50',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#4CAF50' }}>
                🚛 Core TMS Portals
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Total Agents</span>
                  <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>147</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Active Agents</span>
                  <span style={{ color: '#4CAF50' }}>142</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Maintenance</span>
                  <span style={{ color: '#FFA500' }}>3</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Error Recovery</span>
                  <span style={{ color: '#FF6B6B' }}>2</span>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>
                Avg: 13.4 agents per portal
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #FFA500',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#FFA500' }}>
                💼 Business Operations
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Total Agents</span>
                  <span style={{ color: '#FFA500', fontWeight: 'bold' }}>78</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Active Agents</span>
                  <span style={{ color: '#4CAF50' }}>72</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Maintenance</span>
                  <span style={{ color: '#FFA500' }}>4</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Error Recovery</span>
                  <span style={{ color: '#FF6B6B' }}>2</span>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Avg: 4.9 agents per portal</div>
            </div>

            <div
              style={{
                backgroundColor: '#2d3748',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #FF6B6B',
              }}
            >
              <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: '#FF6B6B' }}>
                🔧 Admin & Specialized
              </h3>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '8px' }}>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Total Agents</span>
                  <span style={{ color: '#FF6B6B', fontWeight: 'bold' }}>25</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Active Agents</span>
                  <span style={{ color: '#4CAF50' }}>23</span>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}
                >
                  <span>Maintenance</span>
                  <span style={{ color: '#FFA500' }}>0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Error Recovery</span>
                  <span style={{ color: '#FF6B6B' }}>2</span>
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Avg: 6.3 agents per portal</div>
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
            ⏰ Timeline & Milestones
          </h2>

          {/* Real-time Clock Tile */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
              backgroundColor: '#2d3748',
              borderRadius: '12px',
              padding: '20px',
              border: '2px solid #8a2be2',
            }}
          >
            <div
              style={{
                backgroundColor: '#8a2be2',
                borderRadius: '50%',
                width: '80px',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '20px',
                fontSize: '2rem',
                color: 'white',
                boxShadow: '0 0 20px rgba(138, 43, 238, 0.5)',
              }}
            >
              🕐
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#8a2be2',
                  marginBottom: '8px',
                }}
              >
                Real-Time Mission Clock
              </div>
              <div
                style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#4CAF50',
                  fontFamily: 'monospace',
                  marginBottom: '4px',
                }}
              >
                {currentTime.toLocaleTimeString()}
              </div>
              <div style={{ fontSize: '1rem', color: '#94a3b8' }}>
                {currentTime.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#FFA500',
                  marginBottom: '8px',
                }}
              >
                Mission Time
              </div>
              <div
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 'bold',
                  color: '#FFA500',
                  fontFamily: 'monospace',
                }}
              >
                Day 49
              </div>
              <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>of 70 total days</div>
            </div>
          </div>

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

          {/* Milestone Progress */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#8a2be2' }}>
              🎯 Key Milestones
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '12px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #4CAF50',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                    Phase 1: Core Portals
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    ✅ Complete
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  11 Core TMS portals deployed
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Completed: Sep 15, 2025</div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #FFA500',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#FFA500' }}>
                    Phase 2: Business Ops
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      backgroundColor: '#FFA500',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    🔄 68%
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  16 Business operations portals
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Target: Oct 15, 2025</div>
              </div>

              <div
                style={{
                  backgroundColor: '#2d3748',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #FF6B6B',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ fontWeight: 'bold', color: '#FF6B6B' }}>
                    Phase 3: Admin & Special
                  </span>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      backgroundColor: '#FF6B6B',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    ⏳ 35%
                  </span>
                </div>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                  4 Admin & specialized portals
                </div>
                <div style={{ fontSize: '0.8rem', color: '#a0a0a0' }}>Target: Oct 28, 2025</div>
              </div>
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
