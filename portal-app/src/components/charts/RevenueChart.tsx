import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

interface RevenueChartProps {
  type?: 'bar' | 'pie' | 'line' | 'area';
  data?: unknown[];
  height?: number;
}

const revenueData = [
  { month: 'Jan', revenue: 32000, companies: 2, users: 45 },
  { month: 'Feb', revenue: 35000, companies: 3, users: 67 },
  { month: 'Mar', revenue: 38000, companies: 3, users: 89 },
  { month: 'Apr', revenue: 42000, companies: 4, users: 112 },
  { month: 'May', revenue: 45000, companies: 4, users: 134 },
  { month: 'Jun', revenue: 42400, companies: 4, users: 152 }
];

const pieData = [
  { name: 'Enterprise', value: 45, color: '#8B5CF6' },
  { name: 'Professional', value: 30, color: '#06B6D4' },
  { name: 'Standard', value: 20, color: '#10B981' },
  { name: 'Basic', value: 5, color: '#F59E0B' }
];

// const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B']; // Unused - colors defined in data objects

export const RevenueChart: React.FC<RevenueChartProps> = ({ 
  type = 'bar', 
  data = revenueData, 
  height = 300 
}) => {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: unknown) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Bar 
              dataKey="revenue" 
              fill="url(#revenueGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </BarChart>
        );

      case 'pie':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: unknown) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
            />
          </PieChart>
        );

      case 'line':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: unknown) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'area':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: unknown) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              fill="url(#areaGradient)"
            />
          </AreaChart>
        );

      default:
        return null;
    }
  };

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="w-full h-full responsive-container sm:flex-col md:flex-row lg:grid">
      <ResponsiveContainer width="100%" height={height}>
        {renderChart() || <div>No chart data available</div>}
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
