import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const MinimalDashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  console.log('MinimalDashboard - isAuthenticated:', isAuthenticated);
  console.log('MinimalDashboard - user:', user);

  if (!isAuthenticated) {
    return <div>Not authenticated</div>;
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1>Minimal Dashboard</h1>
      <p>Welcome, {user?.name}!</p>
      <p>Role: {user?.role}</p>
      <p>Company: {user?.company}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default MinimalDashboard;
