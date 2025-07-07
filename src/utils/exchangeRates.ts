
import { supabase } from '@/integrations/supabase/client';

// Fetch exchange rates from Supabase
export const getExchangeRates = async () => {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching exchange rates:', error);
    return {};
  }
  
  console.log('Fetched exchange rates data:', data);
  
  // Convert to the expected format
  const rates: any = {};
  data?.forEach(rate => {
    if (!rates[rate.rate_key]) {
      rates[rate.rate_key] = {};
    }
    rates[rate.rate_key][rate.base_amount] = rate.exchange_amount;
  });
  
  return rates;
};

export const calculateExchange = async (amount: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  console.log(`Calculating exchange: ${amount} ${fromCurrency} to ${toCurrency}`);
  
  // Fetch specific rate from database
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .eq('from_currency', fromCurrency)
    .eq('to_currency', toCurrency)
    .order('base_amount', { ascending: true });
  
  console.log('Direct exchange rate query result:', { data, error });
  
  if (error || !data || data.length === 0) {
    console.log('No direct rate found, trying reverse calculation');
    // Try reverse calculation
    const { data: reverseData, error: reverseError } = await supabase
      .from('exchange_rates')
      .select('*')
      .eq('from_currency', toCurrency)
      .eq('to_currency', fromCurrency)
      .order('base_amount', { ascending: true });
    
    console.log('Reverse exchange rate query result:', { reverseData, reverseError });
    
    if (reverseError || !reverseData || reverseData.length === 0) {
      console.log('No exchange rate found in either direction');
      return 0;
    }
    
    // Calculate reverse rate
    const rate = reverseData[0];
    const reverseRate = rate.base_amount / rate.exchange_amount;
    const result = amount / reverseRate;
    console.log('Reverse calculation result:', result);
    return result;
  }
  
  // Find the most appropriate rate based on amount
  let selectedRate = data[0];
  for (const rate of data) {
    if (amount >= rate.base_amount) {
      selectedRate = rate;
    }
  }
  
  console.log('Selected rate:', selectedRate);
  
  // Calculate proportional exchange
  const exchangeRate = selectedRate.exchange_amount / selectedRate.base_amount;
  const result = amount * exchangeRate;
  console.log('Final calculation:', { exchangeRate, result });
  
  return result;
};

export const getAvailableCurrencies = () => [
  { code: 'SSP', name: 'South Sudanese Pound' },
  { code: 'UGX', name: 'Ugandan Shilling' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'KSHS', name: 'Kenyan Shilling' }
];

// Update exchange rate in database
export const updateExchangeRate = async (rateKey: string, exchangeAmount: number) => {
  const { error } = await supabase
    .from('exchange_rates')
    .update({ exchange_amount: exchangeAmount })
    .eq('rate_key', rateKey);
  
  if (error) {
    console.error('Error updating exchange rate:', error);
    throw error;
  }
};

// Fetch all rates for admin panel
export const getAllRates = async () => {
  const { data, error } = await supabase
    .from('exchange_rates')
    .select('*')
    .order('rate_key', { ascending: true });
  
  if (error) {
    console.error('Error fetching all rates:', error);
    return [];
  }
  
  return data || [];
};
