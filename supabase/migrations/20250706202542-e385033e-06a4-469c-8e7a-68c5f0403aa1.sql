
-- Create exchange_rates table to store daily rates
CREATE TABLE exchange_rates (
  id BIGSERIAL PRIMARY KEY,
  rate_key TEXT NOT NULL UNIQUE, -- e.g., 'SSR_to_UGX_1000'
  from_currency TEXT NOT NULL, -- e.g., 'SSR'
  to_currency TEXT NOT NULL, -- e.g., 'UGX'
  base_amount NUMERIC NOT NULL, -- e.g., 1000
  exchange_amount NUMERIC NOT NULL, -- e.g., 550
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster lookups
CREATE INDEX idx_exchange_rates_rate_key ON exchange_rates(rate_key);
CREATE INDEX idx_exchange_rates_currencies ON exchange_rates(from_currency, to_currency);

-- Insert initial exchange rates based on your current data
INSERT INTO exchange_rates (rate_key, from_currency, to_currency, base_amount, exchange_amount) VALUES
('SSR_to_UGX_1000', 'SSR', 'UGX', 1000, 550),
('SSR_to_UGX_10000', 'SSR', 'UGX', 10000, 5500),
('USD_to_UGX_100', 'USD', 'UGX', 100, 3850),
('SSR_to_KSHS_51000', 'SSR', 'KSHS', 51000, 1400),
('USD_to_KSHS_100', 'USD', 'KSHS', 100, 125),
('UGX_to_SSR_10000', 'UGX', 'SSR', 10000, 45),
('UGX_to_SSR_100000', 'UGX', 'SSR', 100000, 450),
('KSHS_to_SSR_1000', 'KSHS', 'SSR', 1000, 45),
('USD_to_SSR_100', 'USD', 'SSR', 100, 600000);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the timestamp
CREATE TRIGGER update_exchange_rates_updated_at 
    BEFORE UPDATE ON exchange_rates 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
