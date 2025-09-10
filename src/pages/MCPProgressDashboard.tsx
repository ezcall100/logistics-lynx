import React from 'react';

function MCPProgressDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            MCP Agent Progress Dashboard
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Real-time monitoring of 250 autonomous agents building 35+ portals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Mission Timeline</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Started:</span>
                  <span className="text-white">December 19, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Deadline:</span>
                  <span className="text-white">October 28, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Overall Progress</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">15.2%</div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                    style={{ width: '15.2%' }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400 mt-2">Phase 1: Foundation & Infrastructure</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Agent Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400">Active</span>
                  </div>
                  <span className="text-white font-semibold">238</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-400">Maintenance</span>
                  </div>
                  <span className="text-white font-semibold">7</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-gray-400">Error Recovery</span>
                  </div>
                  <span className="text-white font-semibold">5</span>
                </div>
                <div className="pt-2 border-t border-white/20">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Agents</span>
                    <span className="text-white font-semibold">250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h3 className="text-xl font-semibold text-white mb-6">Portal Development Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">Super Admin Portal</h4>
                    <p className="text-gray-400 text-sm">Admin</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                    complete
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">100.0%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">Broker Portal</h4>
                    <p className="text-gray-400 text-sm">Core TMS</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400">
                    development
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">20.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20.2%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">Carrier Portal</h4>
                    <p className="text-gray-400 text-sm">Core TMS</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm bg-yellow-500/20 text-yellow-400">
                    development
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">18.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '18.2%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">Driver Portal</h4>
                    <p className="text-gray-400 text-sm">Core TMS</p>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400">
                    testing
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-medium">23.2%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23.2%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All 250 agents are actively working</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MCPProgressDashboard;