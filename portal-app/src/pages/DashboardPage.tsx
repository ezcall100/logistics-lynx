import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Users, DollarSign, Activity, TrendingUp, 
  BarChart3, PieChart, LineChart, Calendar, Clock
} from 'lucide-react';
import KPICard from '../components/dashboard/KPICard';
import CompanyTable from '../components/dashboard/CompanyTable';
import { Company, SystemAnalytics } from '../types';
import { mockCompanies, mockSystemAnalytics } from '../data/mockData';

interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [companies] = useState<Company[]>(mockCompanies);
  const [analytics] = useState<SystemAnalytics>(mockSystemAnalytics);

  const handleViewCompany = (company: Company) => {
    console.log('View company:', company);
    onNavigate(`/companies/${company.id}`);
  };

  const handleEditCompany = (company: Company) => {
    console.log('Edit company:', company);
    onNavigate(`/companies/${company.id}/edit`);
  };

  const handleDeleteCompany = (company: Company) => {
    console.log('Delete company:', company);
    // Implement delete logic
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-800 rounded-2xl p-8 text-white shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">Welcome to Trans Bot AI</h1>
            <p className="text-blue-100 text-lg">
              Super Admin Dashboard - Monitor and manage your entire platform ecosystem
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-blue-100">System Status</p>
              <p className="text-lg font-semibold">All Systems Operational</p>
            </div>
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Companies"
          value={analytics.totalCompanies}
          change={12.5}
          changeType="increase"
          icon={Building2}
          color="text-blue-600"
          bgColor="bg-blue-50"
          iconColor="bg-blue-500"
          delay={0.1}
        />
        <KPICard
          title="Total Users"
          value={analytics.totalUsers}
          change={8.3}
          changeType="increase"
          icon={Users}
          color="text-green-600"
          bgColor="bg-green-50"
          iconColor="bg-green-500"
          delay={0.2}
        />
        <KPICard
          title="Monthly Revenue"
          value={analytics.totalRevenue}
          change={15.7}
          changeType="increase"
          icon={DollarSign}
          color="text-purple-600"
          bgColor="bg-purple-50"
          iconColor="bg-purple-500"
          delay={0.3}
        />
        <KPICard
          title="System Health"
          value={`${analytics.uptime}%`}
          change={0.1}
          changeType="increase"
          icon={Activity}
          color="text-orange-600"
          bgColor="bg-orange-50"
          iconColor="bg-orange-500"
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600 font-medium">+15.7%</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 rounded-2xl flex items-center justify-center border border-gray-200/30">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Revenue chart will be rendered here</p>
            </div>
          </div>
        </motion.div>

        {/* Portal Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 p-6 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Portal Usage</h3>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-blue-600 font-medium">5 Active</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl flex items-center justify-center border border-gray-200/30">
            <div className="text-center">
              <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Portal usage chart will be rendered here</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/30 p-6 hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {[
            { action: 'New company registered', company: 'CargoConnect Inc', time: '2 hours ago', type: 'success' },
            { action: 'Subscription renewed', company: 'FleetMax Transport', time: '4 hours ago', type: 'info' },
            { action: 'Portal updated', company: 'SmartLogistics Pro', time: '6 hours ago', type: 'info' },
            { action: 'User added', company: 'LogiFlow Solutions', time: '8 hours ago', type: 'info' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:scale-[1.01]">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.company}</p>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Companies Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <CompanyTable
          companies={companies}
          onViewCompany={handleViewCompany}
          onEditCompany={handleEditCompany}
          onDeleteCompany={handleDeleteCompany}
        />
      </motion.div>
    </div>
  );
};

export default DashboardPage;
