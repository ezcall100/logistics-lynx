import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PortalLogin from '../PortalLogin';
import StandaloneDashboard from '../StandaloneDashboard';


const PortalApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
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
