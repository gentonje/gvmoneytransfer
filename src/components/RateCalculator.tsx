
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CurrencyCard from './CurrencyCard';
import { calculateExchange, getAllRates } from '../utils/exchangeRates';
import { useQuery } from '@tanstack/react-query';

const RateCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('SSR');
  const [toCurrency, setToCurrency] = useState('UGX');
  const [result, setResult] = useState(0);

  // Fetch rates for display cards
  const { data: ratesData = [] } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: getAllRates,
  });

  useEffect(() => {
    const calculateRate = async () => {
      if (amount && fromCurrency && toCurrency) {
        const calculatedAmount = await calculateExchange(parseFloat(amount), fromCurrency, toCurrency);
        setResult(calculatedAmount);
      } else {
        setResult(0);
      }
    };
    
    calculateRate();
  }, [amount, fromCurrency, toCurrency]);

  const currencies = [
    { code: 'SSR', name: 'South Sudanese Pound', flag: '🇸🇸' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'KSHS', name: 'Kenyan Shilling', flag: '🇰🇪' }
  ];

  // Group rates by country for display
  const ugandaRates = ratesData.filter(rate => 
    (rate.from_currency === 'SSR' && rate.to_currency === 'UGX') ||
    (rate.from_currency === 'USD' && rate.to_currency === 'UGX')
  ).map(rate => ({
    from: rate.from_currency,
    to: rate.to_currency,
    rate: rate.exchange_amount,
    amount: rate.base_amount
  }));

  const kenyaRates = ratesData.filter(rate => 
    (rate.from_currency === 'SSR' && rate.to_currency === 'KSHS') ||
    (rate.from_currency === 'USD' && rate.to_currency === 'KSHS')
  ).map(rate => ({
    from: rate.from_currency,
    to: rate.to_currency,
    rate: rate.exchange_amount,
    amount: rate.base_amount
  }));

  const withdrawalRates = ratesData.filter(rate => 
    (rate.from_currency === 'UGX' && rate.to_currency === 'SSR') ||
    (rate.from_currency === 'KSHS' && rate.to_currency === 'SSR') ||
    (rate.from_currency === 'USD' && rate.to_currency === 'SSR')
  ).map(rate => ({
    from: rate.from_currency,
    to: rate.to_currency,
    rate: rate.exchange_amount,
    amount: rate.base_amount
  }));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Main Calculator */}
      <Card className="mb-8 shadow-lg border-0 bg-white/90 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl text-center">Exchange Rate Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6 items-end">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Amount to Send
              </Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg h-12 border-2 border-orange-200 focus:border-orange-500"
              />
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger className="border-2 border-orange-200 focus:border-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-orange-200">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code} className="hover:bg-orange-50">
                        <span className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-orange-100 rounded-full p-3">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Amount Received
              </Label>
              <div className="relative">
                <Input
                  type="text"
                  value={result.toLocaleString()}
                  readOnly
                  className="text-lg h-12 bg-green-50 border-2 border-green-200 font-bold text-green-700"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-gray-500">To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger className="border-2 border-green-200 focus:border-green-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-green-200">
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code} className="hover:bg-green-50">
                        <span className="flex items-center gap-2">
                          <span>{currency.flag}</span>
                          <span>{currency.code}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {amount && result > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">{amount} {fromCurrency}</span> = 
                <span className="font-bold text-green-700 ml-1">{result.toLocaleString()} {toCurrency}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rate Display Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ugandaRates.length > 0 && (
          <CurrencyCard
            title="Uganda Rates"
            flag="🇺🇬"
            rates={ugandaRates}
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
        )}
        
        {kenyaRates.length > 0 && (
          <CurrencyCard
            title="Kenya Rates"
            flag="🇰🇪"
            rates={kenyaRates}
            color="bg-gradient-to-br from-red-500 to-red-600"
          />
        )}
        
        {withdrawalRates.length > 0 && (
          <CurrencyCard
            title="Withdrawal Rates"
            flag="💳"
            rates={withdrawalRates}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        )}
      </div>
    </div>
  );
};

export default RateCalculator;
