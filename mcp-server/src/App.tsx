import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SuperAdminFocus301 from './SuperAdminFocus301';

function App() {
  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 responsive-container sm:flex-col md:flex-row lg:grid">
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
