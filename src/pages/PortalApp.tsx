import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PortalLogin from '../PortalLogin';
import StandaloneDashboard from '../StandaloneDashboard';


const PortalApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 responsive-container sm:flex-col md:flex-row lg:grid">
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<PortalLogin />} />
        
        {/* Dashboard Route */}
        <Route path="/dashboard" element={<StandaloneDashboard />} />
      </Routes>
    </div>
  );
};

export default PortalApp;
}