
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateExchange } from '../utils/exchangeRates';
import { ArrowRight } from 'lucide-react';

const RateCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('SSP');
  const [toCurrency, setToCurrency] = useState('UGX');
  const [result, setResult] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const calculateRate = async () => {
      if (amount && fromCurrency && toCurrency && parseFloat(amount) > 0) {
        setIsCalculating(true);
        setError('');
        console.log('Calculating exchange rate for:', { amount: parseFloat(amount), fromCurrency, toCurrency });
        
        try {
          const calculatedAmount = await calculateExchange(parseFloat(amount), fromCurrency, toCurrency);
          console.log('Calculated result:', calculatedAmount);
          setResult(calculatedAmount);
          
          if (calculatedAmount === 0) {
            setError(`No exchange rate found for ${fromCurrency} to ${toCurrency}`);
          }
        } catch (error) {
          console.error('Error calculating exchange rate:', error);
          setResult(0);
          setError('Error calculating exchange rate');
        } finally {
          setIsCalculating(false);
        }
      } else {
        setResult(0);
        setError('');
      }
    };
    
    // Add a small debounce to avoid too many API calls
    const timeoutId = setTimeout(calculateRate, 300);
    return () => clearTimeout(timeoutId);
  }, [amount, fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const currencies = [
    { code: 'SSP', name: 'South Sudanese Pound', flag: '🇸🇸' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'KSHS', name: 'Kenyan Shilling', flag: '🇰🇪' }
  ];

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
          <CardTitle className="text-xl text-center">Exchange Rate Calculator</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Amount to Send */}
          <div className="space-y-2">
            <Label htmlFor="send-amount" className="text-sm font-medium text-gray-700">
              Amount to Send
            </Label>
            <Input
              id="send-amount"
              type="text"
              inputMode="decimal"
              placeholder="Enter amount"
              value={amount}
              onChange={handleAmountChange}
              className="text-lg h-12 border-2 border-orange-200 focus:border-orange-500"
            />
          </div>

          {/* From Currency */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="h-12 border-2 border-orange-200 focus:border-orange-500 bg-white z-50">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-orange-200 shadow-lg z-[100]">
                {currencies.map((currency) => (
                  <SelectItem 
                    key={currency.code} 
                    value={currency.code} 
                    className="hover:bg-orange-50 cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Arrow indicator */}
          <div className="flex justify-center">
            <div className="bg-orange-100 rounded-full p-3">
              <ArrowRight className="w-5 h-5 text-orange-600" />
            </div>
          </div>

          {/* Amount Received */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Amount Received
            </Label>
            <Input
              type="text"
              value={isCalculating ? 'Calculating...' : (result > 0 ? result.toLocaleString() : '0')}
              readOnly
              className="text-lg h-12 bg-green-50 border-2 border-green-200 font-bold text-green-700"
            />
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="h-12 border-2 border-green-200 focus:border-green-500 bg-white z-50">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-green-200 shadow-lg z-[100]">
                {currencies.map((currency) => (
                  <SelectItem 
                    key={currency.code} 
                    value={currency.code} 
                    className="hover:bg-green-50 cursor-pointer bg-white"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Result summary */}
          {amount && result > 0 && !isCalculating && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm text-gray-600 text-center">
                <span className="font-semibold">{amount} {fromCurrency}</span> = 
                <span className="font-bold text-green-700 ml-1">{result.toLocaleString()} {toCurrency}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">Rates updated daily • Secure transfers • Trusted service</p>
      </div>
    </div>
  );
};

export default RateCalculator;
