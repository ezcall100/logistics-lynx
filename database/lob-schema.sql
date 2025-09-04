-- LOB System Database Schema
-- Lines of Business: FTL, LTL, Air, Parcel, Auto, Intermodal, Drayage, Dedicated, Specialized

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create enum types
CREATE TYPE mode_type AS ENUM (
  'ftl', 'ltl', 'air', 'parcel', 'auto', 'intermodal', 'drayage', 'dedicated', 'specialized'
);

CREATE TYPE equipment_type AS ENUM (
  'dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy',
  'auto_hauler_open', 'auto_hauler_enclosed',
  'sprinter_van', 'box_truck',
  'cargo_aircraft_narrow', 'cargo_aircraft_wide',
  'container_20', 'container_40', 'chassis'
);

CREATE TYPE quote_speed_type AS ENUM ('economy', 'standard', 'expedited');

CREATE TYPE shipment_status_type AS ENUM (
  'draft', 'quoted', 'booked', 'dispatched', 'in_transit', 'delivered', 'invoiced', 'canceled'
);

CREATE TYPE role_scope_type AS ENUM ('shipper', 'broker', 'carrier');

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role_scope role_scope_type NOT NULL,
  mode mode_type NOT NULL,
  equipment_type equipment_type,
  
  -- Lane information
  lane JSONB NOT NULL, -- {origin: {address, iata?, lat?, lng?}, destination: {...}, miles?}
  
  -- Dimensions and vehicles
  dims_in JSONB, -- Array of {l, w, h, qty, stackable?}
  vehicles JSONB, -- Array of {vin, operable, open_or_enclosed?, photos?, year?, make?, model?}
  
  -- Pricing
  base_cost NUMERIC(10,2),
  fuel_surcharge NUMERIC(10,2),
  accessorial_cost NUMERIC(10,2),
  broker_margin_pct NUMERIC(5,2),
  broker_margin_amt NUMERIC(10,2),
  speed_options JSONB, -- {economy: {cost, eta}, standard: {...}, expedited: {...}}
  currency TEXT DEFAULT 'USD',
  valid_until TIMESTAMPTZ,
  
  -- Metadata
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  role_scope role_scope_type NOT NULL,
  mode mode_type NOT NULL,
  equipment_type equipment_type,
  
  -- Origin and destination
  origin_address TEXT NOT NULL,
  origin_lat NUMERIC(10,8),
  origin_lng NUMERIC(11,8),
  destination_address TEXT NOT NULL,
  destination_lat NUMERIC(10,8),
  destination_lng NUMERIC(11,8),
  
  -- Time windows
  pickup_earliest_at TIMESTAMPTZ NOT NULL,
  pickup_latest_at TIMESTAMPTZ NOT NULL,
  delivery_earliest_at TIMESTAMPTZ NOT NULL,
  delivery_latest_at TIMESTAMPTZ NOT NULL,
  
  -- Cargo details
  weight_lbs NUMERIC(10,2),
  pieces INTEGER,
  pallets INTEGER,
  dims_in JSONB, -- Array of {l, w, h, qty, stackable?}
  
  -- Mode-specific data
  air_specific JSONB, -- {airway_bill?, origin_iata?, dest_iata?, dangerous_goods?}
  parcel_specific JSONB, -- {packages?, parcel_carrier?, tracking_numbers?}
  auto_specific JSONB, -- {vehicles?}
  
  -- Accessorials and status
  accessorials TEXT[],
  status shipment_status_type DEFAULT 'draft',
  
  -- References
  quote_id UUID REFERENCES quotes(id),
  assigned_carrier_id UUID REFERENCES companies(id),
  
  -- Metadata
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_quotes_company_role ON quotes(company_id, role_scope);
CREATE INDEX IF NOT EXISTS idx_quotes_mode ON quotes(mode);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_lane_gin ON quotes USING GIN(lane);
CREATE INDEX IF NOT EXISTS idx_quotes_dims_in_gin ON quotes USING GIN(dims_in);
CREATE INDEX IF NOT EXISTS idx_quotes_vehicles_gin ON quotes USING GIN(vehicles);

CREATE INDEX IF NOT EXISTS idx_shipments_company_role ON shipments(company_id, role_scope);
CREATE INDEX IF NOT EXISTS idx_shipments_mode ON shipments(mode);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_assigned_carrier ON shipments(assigned_carrier_id);
CREATE INDEX IF NOT EXISTS idx_shipments_quote_id ON shipments(quote_id);
CREATE INDEX IF NOT EXISTS idx_shipments_pickup_window ON shipments(pickup_earliest_at, pickup_latest_at);
CREATE INDEX IF NOT EXISTS idx_shipments_delivery_window ON shipments(delivery_earliest_at, delivery_latest_at);
CREATE INDEX IF NOT EXISTS idx_shipments_origin_dest ON shipments(origin_address, destination_address);
CREATE INDEX IF NOT EXISTS idx_shipments_dims_in_gin ON shipments USING GIN(dims_in);
CREATE INDEX IF NOT EXISTS idx_shipments_air_specific_gin ON shipments USING GIN(air_specific);
CREATE INDEX IF NOT EXISTS idx_shipments_parcel_specific_gin ON shipments USING GIN(parcel_specific);
CREATE INDEX IF NOT EXISTS idx_shipments_auto_specific_gin ON shipments USING GIN(auto_specific);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipments_updated_at BEFORE UPDATE ON shipments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;

-- Quotes RLS Policies
CREATE POLICY "Users can view quotes from their company" ON quotes
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create quotes for their company" ON quotes
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update quotes from their company" ON quotes
  FOR UPDATE USING (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete quotes from their company" ON quotes
  FOR DELETE USING (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

-- Shipments RLS Policies
CREATE POLICY "Users can view shipments from their company" ON shipments
  FOR SELECT USING (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can view shipments assigned to their company" ON shipments
  FOR SELECT USING (assigned_carrier_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can create shipments for their company" ON shipments
  FOR INSERT WITH CHECK (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can update shipments from their company" ON shipments
  FOR UPDATE USING (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Assigned carriers can update shipment status" ON shipments
  FOR UPDATE USING (assigned_carrier_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

CREATE POLICY "Users can delete shipments from their company" ON shipments
  FOR DELETE USING (company_id IN (
    SELECT company_id FROM user_companies WHERE user_id = auth.uid()
  ));

-- Helper functions for LOB operations

-- Function to calculate lane distance
CREATE OR REPLACE FUNCTION calculate_lane_distance(origin_lat NUMERIC, origin_lng NUMERIC, dest_lat NUMERIC, dest_lng NUMERIC)
RETURNS NUMERIC AS $$
BEGIN
  -- Haversine formula for distance calculation
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

-- Function to validate VIN
CREATE OR REPLACE FUNCTION validate_vin(vin TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Basic VIN validation (11-17 characters, alphanumeric)
  RETURN vin ~ '^[A-HJ-NPR-Z0-9]{11,17}$';
END;
$$ LANGUAGE plpgsql;

-- Function to validate IATA code
CREATE OR REPLACE FUNCTION validate_iata_code(code TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- IATA codes are 3 letters
  RETURN code ~ '^[A-Z]{3}$';
END;
$$ LANGUAGE plpgsql;

-- Function to get equipment options by mode
CREATE OR REPLACE FUNCTION get_equipment_by_mode(mode_val mode_type)
RETURNS equipment_type[] AS $$
BEGIN
  CASE mode_val
    WHEN 'ftl' THEN RETURN ARRAY['dry_van', 'reefer', 'flatbed', 'step_deck', 'lowboy']::equipment_type[];
    WHEN 'ltl' THEN RETURN ARRAY['dry_van', 'reefer', 'flatbed']::equipment_type[];
    WHEN 'air' THEN RETURN ARRAY['cargo_aircraft_narrow', 'cargo_aircraft_wide']::equipment_type[];
    WHEN 'parcel' THEN RETURN ARRAY['sprinter_van', 'box_truck']::equipment_type[];
    WHEN 'auto' THEN RETURN ARRAY['auto_hauler_open', 'auto_hauler_enclosed']::equipment_type[];
    WHEN 'intermodal' THEN RETURN ARRAY['container_20', 'container_40', 'chassis']::equipment_type[];
    WHEN 'drayage' THEN RETURN ARRAY['chassis']::equipment_type[];
    WHEN 'dedicated' THEN RETURN ARRAY['dry_van', 'reefer', 'flatbed']::equipment_type[];
    WHEN 'specialized' THEN RETURN ARRAY['step_deck', 'lowboy', 'flatbed']::equipment_type[];
    ELSE RETURN ARRAY[]::equipment_type[];
  END CASE;
END;
$$ LANGUAGE plpgsql;

-- Function to convert quote to shipment
CREATE OR REPLACE FUNCTION convert_quote_to_shipment(quote_uuid UUID)
RETURNS UUID AS $$
DECLARE
  new_shipment_id UUID;
  quote_data RECORD;
BEGIN
  -- Get quote data
  SELECT * INTO quote_data FROM quotes WHERE id = quote_uuid;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quote not found';
  END IF;
  
  -- Create shipment from quote
  INSERT INTO shipments (
    company_id,
    role_scope,
    mode,
    equipment_type,
    origin_address,
    origin_lat,
    origin_lng,
    destination_address,
    destination_lat,
    destination_lng,
    pickup_earliest_at,
    pickup_latest_at,
    delivery_earliest_at,
    delivery_latest_at,
    weight_lbs,
    pieces,
    pallets,
    dims_in,
    air_specific,
    parcel_specific,
    auto_specific,
    accessorials,
    status,
    quote_id,
    created_by
  ) VALUES (
    quote_data.company_id,
    quote_data.role_scope,
    quote_data.mode,
    quote_data.equipment_type,
    quote_data.lane->>'origin'->>'address',
    (quote_data.lane->>'origin'->>'lat')::NUMERIC,
    (quote_data.lane->>'origin'->>'lng')::NUMERIC,
    quote_data.lane->>'destination'->>'address',
    (quote_data.lane->>'destination'->>'lat')::NUMERIC,
    (quote_data.lane->>'destination'->>'lng')::NUMERIC,
    NOW(), -- Default pickup window
    NOW() + INTERVAL '7 days',
    NOW() + INTERVAL '1 day',
    NOW() + INTERVAL '8 days',
    NULL, -- Will be filled by mode-specific data
    NULL,
    NULL,
    quote_data.dims_in,
    quote_data.lane->>'origin'->>'iata' IS NOT NULL ? jsonb_build_object(
      'origin_iata', quote_data.lane->>'origin'->>'iata',
      'dest_iata', quote_data.lane->>'destination'->>'iata'
    ) : NULL,
    NULL,
    quote_data.vehicles,
    ARRAY[]::TEXT[],
    'booked',
    quote_data.id,
    quote_data.created_by
  ) RETURNING id INTO new_shipment_id;
  
  -- Update quote status
  UPDATE quotes SET valid_until = NOW() WHERE id = quote_uuid;
  
  RETURN new_shipment_id;
END;
$$ LANGUAGE plpgsql;

-- Create views for common queries

-- View for active shipments by company
CREATE VIEW active_shipments AS
SELECT 
  s.*,
  c.name as company_name,
  ac.name as assigned_carrier_name,
  q.id as quote_id
FROM shipments s
JOIN companies c ON s.company_id = c.id
LEFT JOIN companies ac ON s.assigned_carrier_id = ac.id
LEFT JOIN quotes q ON s.quote_id = q.id
WHERE s.status NOT IN ('delivered', 'invoiced', 'canceled');

-- View for quotes by company
CREATE VIEW company_quotes AS
SELECT 
  q.*,
  c.name as company_name,
  u.email as created_by_email
FROM quotes q
JOIN companies c ON q.company_id = c.id
JOIN users u ON q.created_by = u.id
WHERE q.valid_until IS NULL OR q.valid_until > NOW();

-- Grant permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON quotes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON shipments TO authenticated;
GRANT SELECT ON active_shipments TO authenticated;
GRANT SELECT ON company_quotes TO authenticated;
