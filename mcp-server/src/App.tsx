import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperAdminFocus301 from './SuperAdminFocus301';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Routes>
          <Route path="/" element={<SuperAdminFocus301 />} />
          <Route path="/mcp-dashboard" element={<SuperAdminFocus301 />} />
          <Route path="/mcp-progress" element={<SuperAdminFocus301 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
