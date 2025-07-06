
// Exchange rates based on the board image
const exchangeRates = {
  // Uganda rates
  SSR_to_UGX: {
    1000: 550,
    10000: 5500
  },
  USD_to_UGX: {
    100: 3850
  },
  
  // Kenya rates  
  SSR_to_KSHS: {
    51000: 1400
  },
  USD_to_KSHS: {
    100: 125
  },
  
  // Withdrawal rates
  UGX_to_SSR: {
    10000: 45,
    100000: 450
  },
  KSHS_to_SSR: {
    1000: 45
  },
  
  // US rates
  USD_to_SSR: {
    100: 600000
  }
};

export const getExchangeRates = () => exchangeRates;

export const calculateExchange = (amount: number, fromCurrency: string, toCurrency: string): number => {
  const rateKey = `${fromCurrency}_to_${toCurrency}`;
  const rates = exchangeRates[rateKey as keyof typeof exchangeRates];
  
  if (!rates) {
    // Try reverse calculation
    const reverseKey = `${toCurrency}_to_${fromCurrency}`;
    const reverseRates = exchangeRates[reverseKey as keyof typeof exchangeRates];
    
    if (reverseRates) {
      // Calculate reverse rate
      const rateEntries = Object.entries(reverseRates);
      const [baseAmount, targetAmount] = rateEntries[0];
      const reverseRate = parseFloat(baseAmount) / parseFloat(targetAmount);
      return amount / reverseRate;
    }
    
    return 0;
  }
  
  // Find the most appropriate rate based on amount
  const rateEntries = Object.entries(rates).map(([key, value]) => ({
    amount: parseInt(key),
    rate: value as number
  }));
  
  // Sort by amount to find closest rate
  rateEntries.sort((a, b) => a.amount - b.amount);
  
  let selectedRate = rateEntries[0];
  for (const entry of rateEntries) {
    if (amount >= entry.amount) {
      selectedRate = entry;
    }
  }
  
  // Calculate proportional exchange
  const exchangeRate = selectedRate.rate / selectedRate.amount;
  return amount * exchangeRate;
};

export const getAvailableCurrencies = () => [
  { code: 'SSR', name: 'South Sudanese Pound' },
  { code: 'UGX', name: 'Ugandan Shilling' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'KSHS', name: 'Kenyan Shilling' }
];
