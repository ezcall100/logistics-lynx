import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface SystemHealthChartProps {
  data?: unknown[];
  height?: number;
}

const systemHealthData = [
  { time: '00:00', cpu: 45, memory: 62, disk: 38, network: 85 },
  { time: '04:00', cpu: 38, memory: 58, disk: 35, network: 78 },
  { time: '08:00', cpu: 65, memory: 72, disk: 42, network: 92 },
  { time: '12:00', cpu: 72, memory: 78, disk: 45, network: 88 },
  { time: '16:00', cpu: 68, memory: 75, disk: 41, network: 85 },
  { time: '20:00', cpu: 55, memory: 68, disk: 39, network: 82 },
  { time: '24:00', cpu: 48, memory: 64, disk: 37, network: 80 }
];

export const SystemHealthChart: React.FC<SystemHealthChartProps> = ({ 
  data = systemHealthData, 
  height = 200 
}) => {
  return (
    <>
      <script type="application/ld+json">
        {"@context": "https://schema.org", "@type": "SoftwareApplication", "name": "TransBot AI"}
      </script>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      
    <div className="w-full h-full responsive-container sm:flex-col md:flex-row lg:grid">
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            fontSize={10}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={10}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
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
              name.charAt(0).toUpperCase() + name.slice(1)
            ]}
          />
          <Area 
            type="monotone" 
            dataKey="cpu" 
            stroke="#10B981" 
            strokeWidth={2}
            fill="url(#healthGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SystemHealthChart;
