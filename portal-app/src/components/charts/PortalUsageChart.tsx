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

interface PortalUsageChartProps {
  type?: 'bar' | 'pie' | 'line' | 'area';
  data?: unknown[];
  height?: number;
}

const portalUsageData = [
  { portal: 'TMS Core', usage: 95, users: 45, revenue: 12000 },
  { portal: 'Load Board', usage: 78, users: 32, revenue: 8500 },
  { portal: 'Fleet Management', usage: 82, users: 28, revenue: 9200 },
  { portal: 'Broker Portal', usage: 65, users: 25, revenue: 6800 },
  { portal: 'Driver App', usage: 88, users: 22, revenue: 5900 }
];

const portalStatusData = [
  { name: 'Active', value: 5, color: '#10B981' },
  { name: 'Maintenance', value: 1, color: '#F59E0B' },
  { name: 'Inactive', value: 0, color: '#EF4444' }
];

// const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // Unused - colors defined in data objects

export const PortalUsageChart: React.FC<PortalUsageChartProps> = ({ 
  type = 'bar', 
  data = portalUsageData, 
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
              dataKey="portal" 
              stroke="#6B7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: unknown, name: string) => [
                `${value}%`, 
                name === 'usage' ? 'Usage' : name
              ]}
            />
            <Bar 
              dataKey="usage" 
              fill="url(#usageGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0891B2" />
              </linearGradient>
            </defs>
          </BarChart>
        );

      case 'pie':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Pie
              data={portalStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry: unknown) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {portalStatusData.map((entry, index) => (
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
              dataKey="portal" 
              stroke="#6B7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: unknown) => [`${value}%`, 'Usage']}
            />
            <Line 
              type="monotone" 
              dataKey="usage" 
              stroke="#06B6D4" 
              strokeWidth={3}
              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#06B6D4', strokeWidth: 2 }}
            />
          </LineChart>
        );

      case 'area':
        return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="portalAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="portal" 
              stroke="#6B7280"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: unknown) => [`${value}%`, 'Usage']}
            />
            <Area 
              type="monotone" 
              dataKey="usage" 
              stroke="#06B6D4" 
              strokeWidth={3}
              fill="url(#portalAreaGradient)"
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

export default PortalUsageChart;
