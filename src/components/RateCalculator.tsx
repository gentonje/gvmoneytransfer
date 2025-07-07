
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateExchange } from '../utils/exchangeRates';
import { ArrowRight } from 'lucide-react';

const RateCalculator = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('SSR');
  const [toCurrency, setToCurrency] = useState('UGX');
  const [result, setResult] = useState(0);

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
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg h-12 border-2 border-orange-200 focus:border-orange-500"
            />
          </div>

          {/* From Currency */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">From</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="h-12 border-2 border-orange-200 focus:border-orange-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-orange-200 z-50">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="hover:bg-orange-50">
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
              value={result > 0 ? result.toLocaleString() : '0'}
              readOnly
              className="text-lg h-12 bg-green-50 border-2 border-green-200 font-bold text-green-700"
            />
          </div>

          {/* To Currency */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">To</Label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="h-12 border-2 border-green-200 focus:border-green-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-green-200 z-50">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="hover:bg-green-50">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{currency.flag}</span>
                      <span>{currency.code}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Result summary */}
          {amount && result > 0 && (
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
