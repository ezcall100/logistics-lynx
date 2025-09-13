/**
 * Super Admin Color Palette Demo Component
 * Demonstrates the comprehensive color system implementation
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Palette,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  TrendingUp,
  TrendingDown,
  Activity,
} from 'lucide-react';
import { useColorPalette } from '../../hooks/useColorPalette';

const ColorPaletteDemo: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { colors, combinations, chartColors, glass, getStatusColor, getPriorityColor } =
    useColorPalette({
      isDarkMode,
    });

  const colorSections = [
    {
      title: 'Primary Colors',
      description: 'Deep blue for trust and authority',
      colors: colors.primary,
      usage: 'Main brand color, navigation, primary actions',
    },
    {
      title: 'Secondary Colors',
      description: 'Purple for premium features',
      colors: colors.secondary,
      usage: 'Premium features, secondary actions, highlights',
    },
    {
      title: 'Accent Colors',
      description: 'Teal for highlights and success',
      colors: colors.accent,
      usage: 'Success states, positive feedback, highlights',
    },
    {
      title: 'Success Colors',
      description: 'Green for positive actions',
      colors: colors.success,
      usage: 'Success messages, positive feedback, completion states',
    },
    {
      title: 'Warning Colors',
      description: 'Amber for caution',
      colors: colors.warning,
      usage: 'Warning messages, caution states, pending actions',
    },
    {
      title: 'Error Colors',
      description: 'Red for errors and critical actions',
      colors: colors.error,
      usage: 'Error messages, critical states, destructive actions',
    },
    {
      title: 'Info Colors',
      description: 'Blue for information',
      colors: colors.info,
      usage: 'Information messages, neutral states, help content',
    },
  ];

  const statusExamples = [
    { status: 'active', label: 'Active', icon: CheckCircle },
    { status: 'warning', label: 'Warning', icon: AlertTriangle },
    { status: 'error', label: 'Error', icon: XCircle },
    { status: 'info', label: 'Info', icon: Info },
  ] as const;

  const priorityExamples = [
    { priority: 'critical', label: 'Critical' },
    { priority: 'high', label: 'High' },
    { priority: 'medium', label: 'Medium' },
    { priority: 'low', label: 'Low' },
  ] as const;

  const trendExamples = [
    { trend: 'up', label: 'Trending Up', icon: TrendingUp },
    { trend: 'down', label: 'Trending Down', icon: TrendingDown },
    { trend: 'stable', label: 'Stable', icon: Activity },
  ] as const;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Palette className="w-8 h-8 text-super-admin-primary-500" />
            <div>
              <h1 className="text-2xl font-bold">Super Admin Color Palette</h1>
              <p className="text-gray-400">
                Comprehensive color system for consistent, accessible design
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center space-x-2 px-4 py-2 bg-super-admin-primary-500 hover:bg-super-admin-primary-600 text-white rounded-lg transition-colors"
          >
            {isDarkMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Color Sections */}
        {colorSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-gray-400 mb-2">{section.description}</p>
              <p className="text-sm text-gray-500">{section.usage}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {Object.entries(section.colors).map(([shade, color]) => (
                <div key={shade} className="text-center">
                  <div
                    className="w-full h-16 rounded-lg border border-white/20 mb-2"
                    style={{ backgroundColor: color }}
                  />
                  <div className="text-xs font-mono text-gray-400">{shade}</div>
                  <div className="text-xs font-mono text-gray-500">{color}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Status Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold mb-6">Status Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statusExamples.map(example => {
              const Icon = example.icon;
              const statusColor = getStatusColor(example.status);
              return (
                <div key={example.status} className={`p-4 rounded-lg border ${statusColor}`}>
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{example.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Priority Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold mb-6">Priority Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {priorityExamples.map(example => {
              const priorityColor = getPriorityColor(example.priority);
              return (
                <div key={example.priority} className="p-4 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: priorityColor }}
                    />
                    <span className="font-medium">{example.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Trend Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold mb-6">Trend Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trendExamples.map(example => {
              const Icon = example.icon;
              const trendColor =
                example.trend === 'up'
                  ? 'text-super-admin-success-500'
                  : example.trend === 'down'
                    ? 'text-super-admin-error-500'
                    : 'text-super-admin-neutral-500';

              return (
                <div key={example.trend} className="p-4 rounded-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${trendColor}`} />
                    <span className="font-medium">{example.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Chart Colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold mb-6">Data Visualization Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {chartColors.map((color, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-full h-16 rounded-lg border border-white/20 mb-2"
                  style={{ backgroundColor: color }}
                />
                <div className="text-xs font-mono text-gray-400">Chart {index + 1}</div>
                <div className="text-xs font-mono text-gray-500">{color}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Glassmorphism Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold mb-6">Glassmorphism Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="p-6 rounded-lg border backdrop-blur-sm"
              style={{
                backgroundColor: glass.light,
                borderColor: glass.border,
              }}
            >
              <h3 className="font-bold mb-2">Light Glass</h3>
              <p className="text-sm text-gray-400">Subtle transparency effect</p>
            </div>
            <div
              className="p-6 rounded-lg border backdrop-blur-sm"
              style={{
                backgroundColor: glass.medium,
                borderColor: glass.border,
              }}
            >
              <h3 className="font-bold mb-2">Medium Glass</h3>
              <p className="text-sm text-gray-400">Moderate transparency effect</p>
            </div>
            <div
              className="p-6 rounded-lg border backdrop-blur-sm"
              style={{
                backgroundColor: glass.dark,
                borderColor: glass.border,
              }}
            >
              <h3 className="font-bold mb-2">Dark Glass</h3>
              <p className="text-sm text-gray-400">Strong transparency effect</p>
            </div>
          </div>
        </motion.div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-bold mb-6">Usage Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Primary Button */}
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: combinations.primary.background,
                color: combinations.primary.text,
                borderColor: combinations.primary.border,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = combinations.primary.hover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = combinations.primary.background;
              }}
            >
              Primary Button
            </button>

            {/* Secondary Button */}
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: combinations.secondary.background,
                color: combinations.secondary.text,
                borderColor: combinations.secondary.border,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = combinations.secondary.hover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = combinations.secondary.background;
              }}
            >
              Secondary Button
            </button>

            {/* Success Button */}
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: combinations.success.background,
                color: combinations.success.text,
                borderColor: combinations.success.border,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = combinations.success.hover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = combinations.success.background;
              }}
            >
              Success Button
            </button>

            {/* Error Button */}
            <button
              className="px-4 py-2 rounded-lg font-medium transition-colors"
              style={{
                backgroundColor: combinations.error.background,
                color: combinations.error.text,
                borderColor: combinations.error.border,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = combinations.error.hover;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = combinations.error.background;
              }}
            >
              Error Button
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ColorPaletteDemo;
