import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MCPProgressDashboard from './MCPProgressDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<MCPProgressDashboard />} />
          <Route path="/mcp-dashboard" element={<MCPProgressDashboard />} />
          <Route path="/mcp-progress" element={<MCPProgressDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
