-- Rates Integration Database Schema for Supabase
-- This schema supports the enhanced rates module with business roles and LOB integration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Rate Lanes Table
CREATE TABLE IF NOT EXISTS rate_lanes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  origin_zip_code TEXT,
  origin_lat DECIMAL(10, 8),
  origin_lng DECIMAL(11, 8),
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  destination_zip_code TEXT,
  destination_lat DECIMAL(10, 8),
  destination_lng DECIMAL(11, 8),
  distance DECIMAL(10, 2) NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('ftl', 'ltl', 'air', 'parcel', 'auto', 'intermodal', 'drayage', 'dedicated', 'specialized')),
  equipment TEXT NOT NULL CHECK (equipment IN ('dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy', 'auto_hauler_open', 'auto_hauler_enclosed', 'sprinter_van', 'box_truck', 'cargo_aircraft_narrow', 'cargo_aircraft_wide', 'container_20', 'container_40', 'chassis')),
  weight_class TEXT,
  service_level TEXT NOT NULL CHECK (service_level IN ('economy', 'standard', 'expedited')),
  rate_type TEXT NOT NULL CHECK (rate_type IN ('spot', 'contract', 'negotiated', 'market')),
  rate_basis TEXT NOT NULL CHECK (rate_basis IN ('per_mile', 'per_pound', 'flat_rate', 'percentage')),
  base_rate DECIMAL(10, 4) NOT NULL,
  fuel_surcharge DECIMAL(10, 4) NOT NULL DEFAULT 0,
  accessorial_cost DECIMAL(10, 4) NOT NULL DEFAULT 0,
  margin DECIMAL(10, 4) NOT NULL DEFAULT 0,
  total_rate DECIMAL(10, 4) NOT NULL,
  volume INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  trend TEXT NOT NULL CHECK (trend IN ('up', 'down', 'stable')) DEFAULT 'stable',
  status TEXT NOT NULL CHECK (status IN ('draft', 'active', 'expired', 'archived')) DEFAULT 'active',
  company_id UUID NOT NULL,
  role_scope TEXT NOT NULL CHECK (role_scope IN ('shipper', 'broker', 'carrier')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate Quotes Table
CREATE TABLE IF NOT EXISTS rate_quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID, -- Reference to LOB quote
  lane_id UUID REFERENCES rate_lanes(id) ON DELETE SET NULL,
  customer_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  business_role TEXT NOT NULL CHECK (business_role IN ('shipper', 'carrier', 'broker')),
  mode TEXT NOT NULL CHECK (mode IN ('ftl', 'ltl', 'air', 'parcel', 'auto', 'intermodal', 'drayage', 'dedicated', 'specialized')),
  equipment TEXT NOT NULL CHECK (equipment IN ('dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy', 'auto_hauler_open', 'auto_hauler_enclosed', 'sprinter_van', 'box_truck', 'cargo_aircraft_narrow', 'cargo_aircraft_wide', 'container_20', 'container_40', 'chassis')),
  origin_city TEXT NOT NULL,
  origin_state TEXT NOT NULL,
  origin_zip_code TEXT,
  destination_city TEXT NOT NULL,
  destination_state TEXT NOT NULL,
  destination_zip_code TEXT,
  distance DECIMAL(10, 2) NOT NULL,
  weight DECIMAL(10, 2),
  pieces INTEGER,
  pallets INTEGER,
  rate_type TEXT NOT NULL CHECK (rate_type IN ('spot', 'contract', 'negotiated', 'market')),
  rate_basis TEXT NOT NULL CHECK (rate_basis IN ('per_mile', 'per_pound', 'flat_rate', 'percentage')),
  base_rate DECIMAL(10, 4) NOT NULL,
  fuel_surcharge DECIMAL(10, 4) NOT NULL DEFAULT 0,
  accessorial_cost DECIMAL(10, 4) NOT NULL DEFAULT 0,
  margin DECIMAL(10, 4) NOT NULL DEFAULT 0,
  total_rate DECIMAL(10, 4) NOT NULL,
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'sent', 'accepted', 'expired', 'rejected')) DEFAULT 'draft',
  notes TEXT,
  created_by UUID NOT NULL,
  company_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate Matrices Table
CREATE TABLE IF NOT EXISTS rate_matrices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  mode TEXT NOT NULL CHECK (mode IN ('ftl', 'ltl', 'air', 'parcel', 'auto', 'intermodal', 'drayage', 'dedicated', 'specialized')),
  equipment TEXT NOT NULL CHECK (equipment IN ('dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy', 'auto_hauler_open', 'auto_hauler_enclosed', 'sprinter_van', 'box_truck', 'cargo_aircraft_narrow', 'cargo_aircraft_wide', 'container_20', 'container_40', 'chassis')),
  origin_states TEXT[] NOT NULL,
  destination_states TEXT[] NOT NULL,
  rate_table JSONB NOT NULL DEFAULT '[]',
  company_id UUID NOT NULL,
  role_scope TEXT NOT NULL CHECK (role_scope IN ('shipper', 'broker', 'carrier')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate Intelligence Table
CREATE TABLE IF NOT EXISTS rate_intelligence (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lane_id UUID REFERENCES rate_lanes(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('ftl', 'ltl', 'air', 'parcel', 'auto', 'intermodal', 'drayage', 'dedicated', 'specialized')),
  equipment TEXT NOT NULL CHECK (equipment IN ('dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy', 'auto_hauler_open', 'auto_hauler_enclosed', 'sprinter_van', 'box_truck', 'cargo_aircraft_narrow', 'cargo_aircraft_wide', 'container_20', 'container_40', 'chassis')),
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  date DATE NOT NULL,
  market_rate DECIMAL(10, 4) NOT NULL,
  our_rate DECIMAL(10, 4) NOT NULL,
  win_rate DECIMAL(5, 4) NOT NULL,
  volume INTEGER NOT NULL DEFAULT 0,
  competitor_rates JSONB NOT NULL DEFAULT '[]',
  market_trend TEXT NOT NULL CHECK (market_trend IN ('up', 'down', 'stable')) DEFAULT 'stable',
  recommendations TEXT[] NOT NULL DEFAULT '[]',
  company_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate Analytics Table
CREATE TABLE IF NOT EXISTS rate_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  role_scope TEXT NOT NULL CHECK (role_scope IN ('shipper', 'broker', 'carrier')),
  date DATE NOT NULL,
  total_quotes INTEGER NOT NULL DEFAULT 0,
  accepted_quotes INTEGER NOT NULL DEFAULT 0,
  win_rate DECIMAL(5, 4) NOT NULL DEFAULT 0,
  average_rate DECIMAL(10, 4) NOT NULL DEFAULT 0,
  average_margin DECIMAL(10, 4) NOT NULL DEFAULT 0,
  total_revenue DECIMAL(12, 2) NOT NULL DEFAULT 0,
  mode_breakdown JSONB NOT NULL DEFAULT '[]',
  top_lanes JSONB NOT NULL DEFAULT '[]',
  rate_trends JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, role_scope, date)
);

-- Rate Configurations Table
CREATE TABLE IF NOT EXISTS rate_configs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  role_scope TEXT NOT NULL CHECK (role_scope IN ('shipper', 'broker', 'carrier')),
  mode TEXT NOT NULL CHECK (mode IN ('ftl', 'ltl', 'air', 'parcel', 'auto', 'intermodal', 'drayage', 'dedicated', 'specialized')),
  equipment TEXT NOT NULL CHECK (equipment IN ('dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy', 'auto_hauler_open', 'auto_hauler_enclosed', 'sprinter_van', 'box_truck', 'cargo_aircraft_narrow', 'cargo_aircraft_wide', 'container_20', 'container_40', 'chassis')),
  base_rate_multiplier DECIMAL(5, 4) NOT NULL DEFAULT 1.0,
  fuel_surcharge_percentage DECIMAL(5, 4) NOT NULL DEFAULT 0.15,
  default_margin DECIMAL(5, 4) NOT NULL DEFAULT 0.20,
  accessorial_rates JSONB NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, role_scope, mode, equipment)
);

-- Rate Search History Table
CREATE TABLE IF NOT EXISTS rate_search_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  user_id UUID NOT NULL,
  search_criteria JSONB NOT NULL,
  results_count INTEGER NOT NULL DEFAULT 0,
  search_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Rate Favorites Table
CREATE TABLE IF NOT EXISTS rate_favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  user_id UUID NOT NULL,
  lane_id UUID REFERENCES rate_lanes(id) ON DELETE CASCADE,
  quote_id UUID REFERENCES rate_quotes(id) ON DELETE CASCADE,
  favorite_type TEXT NOT NULL CHECK (favorite_type IN ('lane', 'quote')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(company_id, user_id, lane_id, quote_id)
);

-- Rate Alerts Table
CREATE TABLE IF NOT EXISTS rate_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL,
  user_id UUID NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('rate_change', 'volume_change', 'market_trend', 'competitor_activity')),
  lane_id UUID REFERENCES rate_lanes(id) ON DELETE CASCADE,
  threshold_value DECIMAL(10, 4),
  threshold_operator TEXT CHECK (threshold_operator IN ('above', 'below', 'equals')),
  is_active BOOLEAN DEFAULT true,
  last_triggered TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_rate_lanes_company_role ON rate_lanes(company_id, role_scope);
CREATE INDEX IF NOT EXISTS idx_rate_lanes_mode_equipment ON rate_lanes(mode, equipment);
CREATE INDEX IF NOT EXISTS idx_rate_lanes_origin_destination ON rate_lanes(origin_city, destination_city);
CREATE INDEX IF NOT EXISTS idx_rate_lanes_status ON rate_lanes(status);
CREATE INDEX IF NOT EXISTS idx_rate_lanes_last_updated ON rate_lanes(last_updated DESC);

CREATE INDEX IF NOT EXISTS idx_rate_quotes_company_role ON rate_quotes(company_id, business_role);
CREATE INDEX IF NOT EXISTS idx_rate_quotes_status ON rate_quotes(status);
CREATE INDEX IF NOT EXISTS idx_rate_quotes_valid_until ON rate_quotes(valid_until);
CREATE INDEX IF NOT EXISTS idx_rate_quotes_created_at ON rate_quotes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_rate_matrices_company_role ON rate_matrices(company_id, role_scope);
CREATE INDEX IF NOT EXISTS idx_rate_matrices_active ON rate_matrices(is_active);

CREATE INDEX IF NOT EXISTS idx_rate_intelligence_lane_date ON rate_intelligence(lane_id, date);
CREATE INDEX IF NOT EXISTS idx_rate_intelligence_company ON rate_intelligence(company_id);

CREATE INDEX IF NOT EXISTS idx_rate_analytics_company_role_date ON rate_analytics(company_id, role_scope, date);

CREATE INDEX IF NOT EXISTS idx_rate_configs_company_role ON rate_configs(company_id, role_scope);
CREATE INDEX IF NOT EXISTS idx_rate_configs_active ON rate_configs(is_active);

CREATE INDEX IF NOT EXISTS idx_rate_search_history_company_user ON rate_search_history(company_id, user_id);
CREATE INDEX IF NOT EXISTS idx_rate_search_history_timestamp ON rate_search_history(search_timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_rate_favorites_company_user ON rate_favorites(company_id, user_id);
CREATE INDEX IF NOT EXISTS idx_rate_favorites_type ON rate_favorites(favorite_type);

CREATE INDEX IF NOT EXISTS idx_rate_alerts_company_user ON rate_alerts(company_id, user_id);
CREATE INDEX IF NOT EXISTS idx_rate_alerts_active ON rate_alerts(is_active);

-- GIN indexes for JSONB fields
CREATE INDEX IF NOT EXISTS idx_rate_matrices_rate_table_gin ON rate_matrices USING GIN (rate_table);
CREATE INDEX IF NOT EXISTS idx_rate_intelligence_competitor_rates_gin ON rate_intelligence USING GIN (competitor_rates);
CREATE INDEX IF NOT EXISTS idx_rate_intelligence_recommendations_gin ON rate_intelligence USING GIN (recommendations);
CREATE INDEX IF NOT EXISTS idx_rate_analytics_mode_breakdown_gin ON rate_analytics USING GIN (mode_breakdown);
CREATE INDEX IF NOT EXISTS idx_rate_analytics_top_lanes_gin ON rate_analytics USING GIN (top_lanes);
CREATE INDEX IF NOT EXISTS idx_rate_analytics_rate_trends_gin ON rate_analytics USING GIN (rate_trends);
CREATE INDEX IF NOT EXISTS idx_rate_configs_accessorial_rates_gin ON rate_configs USING GIN (accessorial_rates);
CREATE INDEX IF NOT EXISTS idx_rate_search_history_criteria_gin ON rate_search_history USING GIN (search_criteria);

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_rate_lanes_updated_at BEFORE UPDATE ON rate_lanes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rate_quotes_updated_at BEFORE UPDATE ON rate_quotes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rate_matrices_updated_at BEFORE UPDATE ON rate_matrices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rate_intelligence_updated_at BEFORE UPDATE ON rate_intelligence FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rate_analytics_updated_at BEFORE UPDATE ON rate_analytics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rate_configs_updated_at BEFORE UPDATE ON rate_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rate_alerts_updated_at BEFORE UPDATE ON rate_alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE rate_lanes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_matrices ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_intelligence ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_alerts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rate_lanes
CREATE POLICY "Users can view their company's rate lanes" ON rate_lanes
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can insert their company's rate lanes" ON rate_lanes
  FOR INSERT WITH CHECK (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can update their company's rate lanes" ON rate_lanes
  FOR UPDATE USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can delete their company's rate lanes" ON rate_lanes
  FOR DELETE USING (company_id = auth.jwt() ->> 'company_id'::text);

-- RLS Policies for rate_quotes
CREATE POLICY "Users can view their company's rate quotes" ON rate_quotes
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can insert their company's rate quotes" ON rate_quotes
  FOR INSERT WITH CHECK (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can update their company's rate quotes" ON rate_quotes
  FOR UPDATE USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can delete their company's rate quotes" ON rate_quotes
  FOR DELETE USING (company_id = auth.jwt() ->> 'company_id'::text);

-- RLS Policies for rate_matrices
CREATE POLICY "Users can view their company's rate matrices" ON rate_matrices
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can insert their company's rate matrices" ON rate_matrices
  FOR INSERT WITH CHECK (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can update their company's rate matrices" ON rate_matrices
  FOR UPDATE USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can delete their company's rate matrices" ON rate_matrices
  FOR DELETE USING (company_id = auth.jwt() ->> 'company_id'::text);

-- RLS Policies for rate_intelligence
CREATE POLICY "Users can view their company's rate intelligence" ON rate_intelligence
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can insert their company's rate intelligence" ON rate_intelligence
  FOR INSERT WITH CHECK (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can update their company's rate intelligence" ON rate_intelligence
  FOR UPDATE USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can delete their company's rate intelligence" ON rate_intelligence
  FOR DELETE USING (company_id = auth.jwt() ->> 'company_id'::text);

-- RLS Policies for rate_analytics
CREATE POLICY "Users can view their company's rate analytics" ON rate_analytics
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can insert their company's rate analytics" ON rate_analytics
  FOR INSERT WITH CHECK (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can update their company's rate analytics" ON rate_analytics
  FOR UPDATE USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can delete their company's rate analytics" ON rate_analytics
  FOR DELETE USING (company_id = auth.jwt() ->> 'company_id'::text);

-- RLS Policies for rate_configs
CREATE POLICY "Users can view their company's rate configs" ON rate_configs
  FOR SELECT USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can insert their company's rate configs" ON rate_configs
  FOR INSERT WITH CHECK (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can update their company's rate configs" ON rate_configs
  FOR UPDATE USING (company_id = auth.jwt() ->> 'company_id'::text);

CREATE POLICY "Users can delete their company's rate configs" ON rate_configs
  FOR DELETE USING (company_id = auth.jwt() ->> 'company_id'::text);

-- RLS Policies for rate_search_history
CREATE POLICY "Users can view their own search history" ON rate_search_history
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own search history" ON rate_search_history
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own search history" ON rate_search_history
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for rate_favorites
CREATE POLICY "Users can view their own favorites" ON rate_favorites
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own favorites" ON rate_favorites
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own favorites" ON rate_favorites
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own favorites" ON rate_favorites
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for rate_alerts
CREATE POLICY "Users can view their own alerts" ON rate_alerts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own alerts" ON rate_alerts
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own alerts" ON rate_alerts
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own alerts" ON rate_alerts
  FOR DELETE USING (user_id = auth.uid());

-- Helper functions
CREATE OR REPLACE FUNCTION calculate_lane_distance(
  origin_lat DECIMAL(10, 8),
  origin_lng DECIMAL(11, 8),
  dest_lat DECIMAL(10, 8),
  dest_lng DECIMAL(11, 8)
) RETURNS DECIMAL(10, 2) AS $$
BEGIN
  RETURN (
    3959 * acos(
      cos(radians(origin_lat)) * 
      cos(radians(dest_lat)) * 
      cos(radians(dest_lng) - radians(origin_lng)) + 
      sin(radians(origin_lat)) * 
      sin(radians(dest_lat))
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Function to convert quote to shipment
CREATE OR REPLACE FUNCTION convert_rate_quote_to_shipment(quote_id UUID)
RETURNS UUID AS $$
DECLARE
  new_shipment_id UUID;
  quote_record RECORD;
BEGIN
  -- Get quote details
  SELECT * INTO quote_record FROM rate_quotes WHERE id = quote_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quote not found';
  END IF;
  
  -- Insert into shipments table (assuming it exists from LOB schema)
  INSERT INTO shipments (
    company_id,
    role_scope,
    mode,
    equipment_type,
    origin_address,
    destination_address,
    pickup_earliest_at,
    pickup_latest_at,
    delivery_earliest_at,
    delivery_latest_at,
    weight_lbs,
    status,
    quote_id,
    created_by,
    created_at
  ) VALUES (
    quote_record.company_id,
    quote_record.business_role,
    quote_record.mode,
    quote_record.equipment,
    quote_record.origin_city || ', ' || quote_record.origin_state,
    quote_record.destination_city || ', ' || quote_record.destination_state,
    NOW(),
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '3 days',
    NOW() + INTERVAL '10 days',
    quote_record.weight,
    'booked',
    quote_record.quote_id,
    quote_record.created_by,
    NOW()
  ) RETURNING id INTO new_shipment_id;
  
  -- Update quote status
  UPDATE rate_quotes SET status = 'accepted' WHERE id = quote_id;
  
  RETURN new_shipment_id;
END;
$$ LANGUAGE plpgsql;

-- Insert default rate configurations
INSERT INTO rate_configs (company_id, role_scope, mode, equipment, base_rate_multiplier, fuel_surcharge_percentage, default_margin, accessorial_rates) VALUES
-- Shipper configurations
('00000000-0000-0000-0000-000000000001', 'shipper', 'ftl', 'dry_van', 1.0, 0.15, 0.20, '{"liftgate": 75, "inside_delivery": 50, "residential": 25}'),
('00000000-0000-0000-0000-000000000001', 'shipper', 'ltl', 'dry_van', 1.0, 0.15, 0.25, '{"liftgate": 75, "inside_delivery": 50, "residential": 25, "appointment": 35}'),
('00000000-0000-0000-0000-000000000001', 'shipper', 'air', 'cargo_aircraft_narrow', 1.0, 0.10, 0.30, '{"dangerous_goods": 150, "temperature_controlled": 100}'),
('00000000-0000-0000-0000-000000000001', 'shipper', 'parcel', 'sprinter_van', 1.0, 0.05, 0.15, '{"signature_required": 15, "insurance": 25}'),
('00000000-0000-0000-0000-000000000001', 'shipper', 'auto', 'auto_hauler_enclosed', 1.0, 0.20, 0.25, '{"inoperable": 100, "enclosed": 200}'),

-- Carrier configurations
('00000000-0000-0000-0000-000000000002', 'carrier', 'ftl', 'dry_van', 0.85, 0.15, 0.15, '{"detention": 50, "layover": 100, "tarp": 75}'),
('00000000-0000-0000-0000-000000000002', 'carrier', 'ltl', 'dry_van', 0.90, 0.15, 0.20, '{"detention": 50, "layover": 100, "appointment": 35}'),
('00000000-0000-0000-0000-000000000002', 'carrier', 'air', 'cargo_aircraft_narrow', 0.80, 0.10, 0.25, '{"dangerous_goods": 150, "temperature_controlled": 100}'),
('00000000-0000-0000-0000-000000000002', 'carrier', 'parcel', 'sprinter_van', 0.95, 0.05, 0.10, '{"signature_required": 15, "insurance": 25}'),
('00000000-0000-0000-0000-000000000002', 'carrier', 'auto', 'auto_hauler_enclosed', 0.85, 0.20, 0.20, '{"inoperable": 100, "enclosed": 200}'),

-- Broker configurations
('00000000-0000-0000-0000-000000000003', 'broker', 'ftl', 'dry_van', 1.0, 0.15, 0.30, '{"liftgate": 75, "inside_delivery": 50, "residential": 25, "detention": 50}'),
('00000000-0000-0000-0000-000000000003', 'broker', 'ltl', 'dry_van', 1.0, 0.15, 0.35, '{"liftgate": 75, "inside_delivery": 50, "residential": 25, "appointment": 35}'),
('00000000-0000-0000-0000-000000000003', 'broker', 'air', 'cargo_aircraft_narrow', 1.0, 0.10, 0.40, '{"dangerous_goods": 150, "temperature_controlled": 100}'),
('00000000-0000-0000-0000-000000000003', 'broker', 'parcel', 'sprinter_van', 1.0, 0.05, 0.25, '{"signature_required": 15, "insurance": 25}'),
('00000000-0000-0000-0000-000000000003', 'broker', 'auto', 'auto_hauler_enclosed', 1.0, 0.20, 0.35, '{"inoperable": 100, "enclosed": 200}');

-- Insert sample rate lanes
INSERT INTO rate_lanes (origin_city, origin_state, destination_city, destination_state, distance, mode, equipment, service_level, rate_type, rate_basis, base_rate, fuel_surcharge, accessorial_cost, margin, total_rate, volume, trend, company_id, role_scope) VALUES
('Los Angeles', 'CA', 'Phoenix', 'AZ', 450, 'ftl', 'dry_van', 'standard', 'spot', 'per_mile', 2.50, 0.38, 0.15, 0.45, 3.48, 125, 'up', '00000000-0000-0000-0000-000000000001', 'shipper'),
('Chicago', 'IL', 'Dallas', 'TX', 925, 'ftl', 'reefer', 'expedited', 'contract', 'per_mile', 3.20, 0.48, 0.25, 0.52, 4.45, 89, 'down', '00000000-0000-0000-0000-000000000001', 'shipper'),
('Atlanta', 'GA', 'Miami', 'FL', 665, 'ftl', 'flatbed', 'standard', 'negotiated', 'per_mile', 3.15, 0.47, 0.20, 0.50, 4.32, 67, 'stable', '00000000-0000-0000-0000-000000000001', 'shipper'),
('New York', 'NY', 'Los Angeles', 'CA', 2789, 'intermodal', 'container_40', 'economy', 'contract', 'per_mile', 1.20, 0.18, 0.10, 0.30, 1.78, 45, 'up', '00000000-0000-0000-0000-000000000001', 'shipper'),
('Seattle', 'WA', 'Portland', 'OR', 173, 'ltl', 'dry_van', 'standard', 'spot', 'per_mile', 1.80, 0.27, 0.12, 0.35, 2.54, 156, 'stable', '00000000-0000-0000-0000-000000000001', 'shipper');

-- Insert sample rate quotes
INSERT INTO rate_quotes (customer_id, customer_name, business_role, mode, equipment, origin_city, origin_state, destination_city, destination_state, distance, weight, rate_type, rate_basis, base_rate, fuel_surcharge, accessorial_cost, margin, total_rate, valid_until, status, created_by, company_id) VALUES
('00000000-0000-0000-0000-000000000004', 'ABC Logistics', 'shipper', 'ftl', 'dry_van', 'Los Angeles', 'CA', 'Phoenix', 'AZ', 450, 45000, 'negotiated', 'per_mile', 2.50, 0.38, 0.15, 0.45, 3.48, NOW() + INTERVAL '7 days', 'sent', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001'),
('00000000-0000-0000-0000-000000000006', 'XYZ Transport', 'carrier', 'ftl', 'reefer', 'Chicago', 'IL', 'Dallas', 'TX', 925, 42000, 'contract', 'per_mile', 3.20, 0.48, 0.25, 0.52, 4.45, NOW() + INTERVAL '14 days', 'accepted', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002'),
('00000000-0000-0000-0000-000000000008', 'Global Shipping Co', 'broker', 'ftl', 'flatbed', 'Atlanta', 'GA', 'Miami', 'FL', 665, 28000, 'spot', 'per_mile', 3.15, 0.47, 0.20, 0.50, 4.32, NOW() + INTERVAL '3 days', 'expired', '00000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000003');

-- Comments
COMMENT ON TABLE rate_lanes IS 'Stores rate lane information for different business roles and LOB modes';
COMMENT ON TABLE rate_quotes IS 'Stores rate quotes with integration to LOB quote system';
COMMENT ON TABLE rate_matrices IS 'Stores rate matrices for origin/destination combinations';
COMMENT ON TABLE rate_intelligence IS 'Stores market intelligence and competitor analysis data';
COMMENT ON TABLE rate_analytics IS 'Stores aggregated analytics data for rates and quotes';
COMMENT ON TABLE rate_configs IS 'Stores rate calculation configurations by business role and mode';
COMMENT ON TABLE rate_search_history IS 'Stores user search history for rate queries';
COMMENT ON TABLE rate_favorites IS 'Stores user favorites for lanes and quotes';
COMMENT ON TABLE rate_alerts IS 'Stores user alerts for rate changes and market conditions';
