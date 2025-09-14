import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SuperAdminMainContent - Modular Main Content Component
 * Created by MCP 301 Agents - Design Logic Refactoring
 * Timestamp: 2025-09-14T17:28:33.000Z
 * 
 * This component provides the main content area for the Super Admin portal
 * with proper animation and responsive design.
 */
interface SuperAdminMainContentProps {
  activeTab: string;
  children?: React.ReactNode;
}

export const SuperAdminMainContent: React.FC<SuperAdminMainContentProps> = ({
  activeTab,
  children
}) => {
  return (
    <main className="flex-1 p-3 sm:p-4 md:p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default SuperAdminMainContent;
