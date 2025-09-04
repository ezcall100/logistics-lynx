-- Portal Packs Seed Data
-- This seeds all 24 portal packs with their configurations

-- Core TMS Packs (9)
INSERT INTO portal_packs (code, name, category, description, icon, color, sort_order, required_plan, features) VALUES
-- Core TMS Packs
('BROKER', 'Broker', 'Core', 'Manage loads, carriers, and rates efficiently', '🚛', 'from-blue-600 to-purple-600', 10, 'starter', ARRAY['load_management', 'carrier_matching', 'rate_negotiation', 'analytics']),
('CARRIER', 'Carrier', 'Core', 'Manage fleet, drivers, and available loads', '🚚', 'from-green-600 to-teal-600', 20, 'starter', ARRAY['fleet_management', 'driver_management', 'route_planning', 'load_acceptance']),
('DRIVER', 'Driver', 'Core', 'Track loads and manage deliveries', '👨‍💼', 'from-indigo-600 to-blue-600', 30, 'starter', ARRAY['load_viewing', 'route_maps', 'document_upload', 'time_tracking']),
('SHIPPER', 'Shipper', 'Core', 'Create shipments and find reliable carriers', '📦', 'from-orange-600 to-red-600', 40, 'starter', ARRAY['shipment_creation', 'carrier_search', 'tracking', 'billing']),
('ADMIN', 'Admin', 'Core', 'System administration and control', '⚙️', 'from-purple-600 to-pink-600', 50, 'starter', ARRAY['user_management', 'system_settings', 'security', 'monitoring']),
('SUPER_ADMIN', 'Super Admin', 'Core', 'Complete system administration and control center', '🏛️', 'from-red-600 to-orange-600', 60, 'starter', ARRAY['global_settings', 'org_management', 'system_health', 'audit_logs']),
('ANALYTICS', 'Analytics', 'Core', 'Advanced analytics and reporting', '📊', 'from-cyan-600 to-blue-600', 70, 'pro', ARRAY['custom_reports', 'data_export', 'real_time_dashboards', 'predictive_analytics']),
('AUTONOMOUS', 'Autonomous', 'Core', 'AI agents and automation', '🤖', 'from-emerald-600 to-teal-600', 80, 'enterprise', ARRAY['ai_agents', 'workflow_automation', 'predictive_routing', 'smart_matching']),
('OWNER_OPERATOR', 'Owner-Operator', 'Core', 'Individual operator management', '👤', 'from-yellow-600 to-orange-600', 90, 'starter', ARRAY['load_management', 'expense_tracking', 'document_management', 'compliance']),

-- Business Packs (11)
('DIRECTORY', 'Directory', 'Business', 'Business directory and networking', '📇', 'from-slate-600 to-gray-600', 100, 'pro', ARRAY['business_directory', 'contact_management', 'networking', 'lead_generation']),
('RATES', 'Rates', 'Business', 'Rate management and optimization', '💰', 'from-green-600 to-emerald-600', 110, 'pro', ARRAY['rate_management', 'pricing_optimization', 'market_analysis', 'rate_history']),
('WORKERS', 'Workers', 'Business', 'Workforce management and HR', '👷', 'from-blue-600 to-indigo-600', 120, 'enterprise', ARRAY['employee_management', 'payroll', 'scheduling', 'compliance']),
('MARKETPLACE', 'Marketplace', 'Business', 'Load and capacity marketplace', '🛒', 'from-purple-600 to-pink-600', 130, 'pro', ARRAY['load_marketplace', 'capacity_marketplace', 'auctions', 'matching']),
('EDI', 'EDI', 'Business', 'Electronic Data Interchange', '📄', 'from-orange-600 to-red-600', 140, 'enterprise', ARRAY['edi_integration', 'data_mapping', 'compliance', 'audit_trails']),
('FINANCIALS', 'Financials', 'Business', 'Financial management and accounting', '💳', 'from-emerald-600 to-green-600', 150, 'pro', ARRAY['invoicing', 'payments', 'expense_tracking', 'financial_reports']),
('CRM', 'CRM', 'Business', 'Customer relationship management', '📞', 'from-blue-600 to-cyan-600', 160, 'pro', ARRAY['lead_management', 'opportunity_tracking', 'customer_service', 'sales_automation']),
('LOAD_BOARD', 'Load Board', 'Business', 'Load board and capacity management', '🧾', 'from-yellow-600 to-orange-600', 170, 'pro', ARRAY['load_posting', 'capacity_search', 'matching', 'notifications']),
('FACTORING', 'Factoring', 'Business', 'Invoice factoring and financing', '🏦', 'from-purple-600 to-indigo-600', 180, 'enterprise', ARRAY['invoice_factoring', 'financing', 'credit_management', 'collections']),
('ONBOARDING', 'Onboarding', 'Business', 'User and organization onboarding', '🎯', 'from-cyan-600 to-blue-600', 190, 'pro', ARRAY['user_onboarding', 'org_setup', 'training', 'compliance']),
('TMS_ADMIN', 'TMS Admin', 'Business', 'Transportation management system administration', '🖥️', 'from-slate-600 to-gray-600', 200, 'enterprise', ARRAY['system_configuration', 'integration_management', 'data_management', 'system_monitoring']),

-- Admin Sub-Packs (4)
('SHIPPER_ADMIN', 'Shipper Admin', 'Admin', 'Shipper-specific administration', '📦', 'from-orange-600 to-red-600', 210, 'pro', ARRAY['shipper_settings', 'user_management', 'compliance', 'reporting']),
('BROKER_ADMIN', 'Broker Admin', 'Admin', 'Broker-specific administration', '🤝', 'from-blue-600 to-purple-600', 220, 'pro', ARRAY['broker_settings', 'carrier_management', 'rate_management', 'analytics']),
('CARRIER_ADMIN', 'Carrier Admin', 'Admin', 'Carrier-specific administration', '🚛', 'from-green-600 to-teal-600', 230, 'pro', ARRAY['carrier_settings', 'fleet_management', 'driver_management', 'compliance']),
('OWNER_OPERATOR_ADMIN', 'Owner-Operator Admin', 'Admin', 'Owner-operator administration', '👤', 'from-yellow-600 to-orange-600', 240, 'pro', ARRAY['operator_settings', 'compliance_management', 'document_management', 'reporting']);

-- Default Role Pack Capabilities
-- Super Admin gets access to everything
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) 
SELECT 'SUPER_ADMIN', code, ARRAY['*'], true, true, true FROM portal_packs;

-- Admin gets access to most packs
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) 
SELECT 'ADMIN', code, 
  CASE 
    WHEN code IN ('SUPER_ADMIN') THEN ARRAY['read']
    ELSE ARRAY['read', 'write']
  END,
  true,
  CASE WHEN code IN ('SUPER_ADMIN') THEN false ELSE true END,
  CASE WHEN code IN ('SUPER_ADMIN') THEN false ELSE true END
FROM portal_packs;

-- Broker role gets access to broker-related packs
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) VALUES
('BROKER', 'BROKER', ARRAY['loads.read', 'loads.write', 'carriers.read', 'carriers.write', 'rates.read', 'rates.write'], true, true, false),
('BROKER', 'DIRECTORY', ARRAY['directory.read'], true, false, false),
('BROKER', 'RATES', ARRAY['rates.read', 'rates.write'], true, true, false),
('BROKER', 'MARKETPLACE', ARRAY['marketplace.read', 'marketplace.write'], true, true, false),
('BROKER', 'FINANCIALS', ARRAY['invoices.read', 'payments.read'], true, false, false),
('BROKER', 'CRM', ARRAY['leads.read', 'leads.write', 'customers.read'], true, true, false),
('BROKER', 'LOAD_BOARD', ARRAY['loads.read', 'loads.write'], true, true, false),
('BROKER', 'ANALYTICS', ARRAY['reports.read'], true, false, false);

-- Carrier role gets access to carrier-related packs
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) VALUES
('CARRIER', 'CARRIER', ARRAY['fleet.read', 'fleet.write', 'drivers.read', 'drivers.write', 'routes.read', 'routes.write'], true, true, false),
('CARRIER', 'DRIVER', ARRAY['loads.read', 'routes.read', 'documents.read', 'timecards.read'], true, false, false),
('CARRIER', 'DIRECTORY', ARRAY['directory.read'], true, false, false),
('CARRIER', 'MARKETPLACE', ARRAY['marketplace.read', 'capacity.write'], true, true, false),
('CARRIER', 'FINANCIALS', ARRAY['invoices.read', 'payments.read'], true, false, false),
('CARRIER', 'LOAD_BOARD', ARRAY['loads.read'], true, false, false),
('CARRIER', 'ANALYTICS', ARRAY['reports.read'], true, false, false);

-- Shipper role gets access to shipper-related packs
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) VALUES
('SHIPPER', 'SHIPPER', ARRAY['shipments.read', 'shipments.write', 'carriers.read', 'tracking.read', 'billing.read'], true, true, false),
('SHIPPER', 'DIRECTORY', ARRAY['directory.read'], true, false, false),
('SHIPPER', 'RATES', ARRAY['rates.read'], true, false, false),
('SHIPPER', 'MARKETPLACE', ARRAY['marketplace.read', 'loads.write'], true, true, false),
('SHIPPER', 'FINANCIALS', ARRAY['invoices.read', 'payments.read'], true, false, false),
('SHIPPER', 'CRM', ARRAY['customers.read', 'customers.write'], true, true, false),
('SHIPPER', 'LOAD_BOARD', ARRAY['loads.read', 'loads.write'], true, true, false),
('SHIPPER', 'ANALYTICS', ARRAY['reports.read'], true, false, false);

-- Driver role gets access to driver-related packs
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) VALUES
('DRIVER', 'DRIVER', ARRAY['loads.read', 'routes.read', 'documents.read', 'timecards.read', 'timecards.write'], true, true, false),
('DRIVER', 'CARRIER', ARRAY['fleet.read'], true, false, false),
('DRIVER', 'FINANCIALS', ARRAY['expenses.read', 'expenses.write'], true, true, false);

-- Manager role gets access to most packs with read/write
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) 
SELECT 'MANAGER', code, 
  CASE 
    WHEN code IN ('SUPER_ADMIN', 'ADMIN') THEN ARRAY['read']
    ELSE ARRAY['read', 'write']
  END,
  true,
  CASE WHEN code IN ('SUPER_ADMIN', 'ADMIN') THEN false ELSE true END,
  false
FROM portal_packs;

-- User role gets basic read access to most packs
INSERT INTO role_pack_caps (role_code, pack_code, permissions, can_read, can_write, can_admin) 
SELECT 'USER', code, ARRAY['read'], true, false, false FROM portal_packs;

-- Quick Actions for each pack
INSERT INTO quick_actions (pack_code, title, description, icon, action_type, action_data, required_permissions, category, sort_order) VALUES
-- Broker Quick Actions
('BROKER', 'Post New Load', 'Create and publish a new load', 'Plus', 'navigate', '{"path": "/broker/loads/new"}', ARRAY['loads.write'], 'loads', 10),
('BROKER', 'Find Carriers', 'Search for available carriers', 'Users', 'navigate', '{"path": "/broker/carriers/search"}', ARRAY['carriers.read'], 'carriers', 20),
('BROKER', 'Set Rates', 'Configure pricing and rates', 'DollarSign', 'navigate', '{"path": "/broker/rates"}', ARRAY['rates.write'], 'rates', 30),
('BROKER', 'View Analytics', 'Performance and insights', 'BarChart3', 'navigate', '{"path": "/broker/analytics"}', ARRAY['analytics.read'], 'analytics', 40),

-- Carrier Quick Actions
('CARRIER', 'Add Driver', 'Register new drivers', 'Users', 'navigate', '{"path": "/carrier/drivers/new"}', ARRAY['drivers.write'], 'drivers', 10),
('CARRIER', 'Add Vehicle', 'Register new fleet vehicles', 'Truck', 'navigate', '{"path": "/carrier/fleet/new"}', ARRAY['fleet.write'], 'fleet', 20),
('CARRIER', 'View Loads', 'Browse available loads', 'Package', 'navigate', '{"path": "/carrier/loads"}', ARRAY['loads.read'], 'loads', 30),
('CARRIER', 'Route Planning', 'Plan delivery routes', 'MapPin', 'navigate', '{"path": "/carrier/routes"}', ARRAY['routes.write'], 'routes', 40),

-- Shipper Quick Actions
('SHIPPER', 'New Shipment', 'Create shipment request', 'Package', 'navigate', '{"path": "/shipper/shipments/new"}', ARRAY['shipments.write'], 'shipments', 10),
('SHIPPER', 'Find Carrier', 'Search for carriers', 'Users', 'navigate', '{"path": "/shipper/carriers/search"}', ARRAY['carriers.read'], 'carriers', 20),
('SHIPPER', 'Add Location', 'Add pickup/delivery points', 'MapPin', 'navigate', '{"path": "/shipper/locations/new"}', ARRAY['locations.write'], 'locations', 30),
('SHIPPER', 'Track Shipments', 'Monitor delivery status', 'BarChart3', 'navigate', '{"path": "/shipper/tracking"}', ARRAY['tracking.read'], 'tracking', 40),

-- Driver Quick Actions
('DRIVER', 'View Loads', 'Browse available loads', 'Truck', 'navigate', '{"path": "/driver/loads"}', ARRAY['loads.read'], 'loads', 10),
('DRIVER', 'Route Map', 'View delivery route', 'MapPin', 'navigate', '{"path": "/driver/routes"}', ARRAY['routes.read'], 'routes', 20),
('DRIVER', 'Upload Proof', 'Submit delivery proof', 'Package', 'navigate', '{"path": "/driver/proof"}', ARRAY['documents.write'], 'documents', 30),
('DRIVER', 'Time Tracking', 'Log work hours', 'Clock', 'navigate', '{"path": "/driver/timecards"}', ARRAY['timecards.write'], 'timecards', 40),

-- Admin Quick Actions
('ADMIN', 'Manage Users', 'Add and manage team members', 'Users', 'navigate', '{"path": "/admin/users"}', ARRAY['users.admin'], 'users', 10),
('ADMIN', 'Settings', 'Configure portal settings', 'Settings', 'navigate', '{"path": "/admin/settings"}', ARRAY['settings.admin'], 'settings', 20),
('ADMIN', 'Reports', 'View analytics and reports', 'BarChart3', 'navigate', '{"path": "/admin/reports"}', ARRAY['reports.read'], 'reports', 30),

-- Super Admin Quick Actions
('SUPER_ADMIN', 'System Overview', 'View system health and status', 'BarChart3', 'navigate', '{"path": "/super-admin/overview"}', ARRAY['system.read'], 'system', 10),
('SUPER_ADMIN', 'User Management', 'Manage all users and organizations', 'Users', 'navigate', '{"path": "/super-admin/users"}', ARRAY['users.admin'], 'users', 20),
('SUPER_ADMIN', 'Company Management', 'Manage all companies and portals', 'Building2', 'navigate', '{"path": "/super-admin/companies"}', ARRAY['companies.admin'], 'companies', 30),
('SUPER_ADMIN', 'Security & Access', 'Manage security policies and access', 'Shield', 'navigate', '{"path": "/super-admin/security"}', ARRAY['security.admin'], 'security', 40);

-- Default Organization Pack Entitlements (for demo purposes)
-- This would typically be set up when an organization is created
-- For now, we'll create some example entitlements

-- Example: Starter plan organization gets core packs
INSERT INTO org_pack_entitlements (org_id, pack_code, enabled, plan_tier) VALUES
-- Replace with actual organization IDs from your system
-- ('org-uuid-1', 'BROKER', true, 'starter'),
-- ('org-uuid-1', 'CARRIER', true, 'starter'),
-- ('org-uuid-1', 'DRIVER', true, 'starter'),
-- ('org-uuid-1', 'SHIPPER', true, 'starter'),
-- ('org-uuid-1', 'ADMIN', true, 'starter'),
-- ('org-uuid-1', 'SUPER_ADMIN', true, 'starter');

-- Example: Pro plan organization gets additional business packs
-- INSERT INTO org_pack_entitlements (org_id, pack_code, enabled, plan_tier) VALUES
-- ('org-uuid-2', 'BROKER', true, 'pro'),
-- ('org-uuid-2', 'FINANCIALS', true, 'pro'),
-- ('org-uuid-2', 'CRM', true, 'pro'),
-- ('org-uuid-2', 'LOAD_BOARD', true, 'pro');

-- Example: Enterprise plan organization gets all packs
-- INSERT INTO org_pack_entitlements (org_id, pack_code, enabled, plan_tier) VALUES
-- ('org-uuid-3', 'BROKER', true, 'enterprise'),
-- ('org-uuid-3', 'EDI', true, 'enterprise'),
-- ('org-uuid-3', 'FACTORING', true, 'enterprise'),
-- ('org-uuid-3', 'WORKERS', true, 'enterprise'),
-- ('org-uuid-3', 'AUTONOMOUS', true, 'enterprise');

-- Comments
COMMENT ON TABLE portal_packs IS 'Available portal packs that can be enabled per organization';
COMMENT ON TABLE org_pack_entitlements IS 'Which packs are enabled for each organization';
COMMENT ON TABLE role_pack_caps IS 'Role-based capabilities for each pack';
COMMENT ON TABLE quick_actions IS 'Quick action definitions for each pack';
