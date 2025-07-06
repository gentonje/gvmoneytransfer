import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAllRates, updateExchangeRate } from '../utils/exchangeRates';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rates, setRates] = useState<{[key: string]: number}>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const correctPassword = '@#$_&-+()/'

  // Fetch rates from database
  const { data: ratesData = [], isLoading } = useQuery({
    queryKey: ['exchange-rates'],
    queryFn: getAllRates,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (ratesData.length > 0) {
      const ratesMap: {[key: string]: number} = {};
      ratesData.forEach(rate => {
        ratesMap[rate.rate_key] = rate.exchange_amount;
      });
      setRates(ratesMap);
    }
  }, [ratesData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the admin panel",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleRateChange = (rateKey: string, value: string) => {
    setRates(prev => ({
      ...prev,
      [rateKey]: parseFloat(value) || 0
    }));
  };

  const handleSaveRates = async () => {
    try {
      // Update all rates in database
      const updatePromises = Object.entries(rates).map(([rateKey, exchangeAmount]) =>
        updateExchangeRate(rateKey, exchangeAmount)
      );
      
      await Promise.all(updatePromises);
      
      // Refresh the data
      queryClient.invalidateQueries({ queryKey: ['exchange-rates'] });
      
      toast({
        title: "Rates Updated",
        description: "Exchange rates have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update exchange rates",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-xl">Loading rates...</div>
      </div>
    );
  }

  // Group rates by categories
  const ugandaRates = ratesData.filter(rate => 
    (rate.from_currency === 'SSR' && rate.to_currency === 'UGX') ||
    (rate.from_currency === 'USD' && rate.to_currency === 'UGX')
  );
  
  const kenyaRates = ratesData.filter(rate => 
    (rate.from_currency === 'SSR' && rate.to_currency === 'KSHS') ||
    (rate.from_currency === 'USD' && rate.to_currency === 'KSHS')
  );
  
  const otherRates = ratesData.filter(rate => 
    (rate.from_currency === 'UGX' && rate.to_currency === 'SSR') ||
    (rate.from_currency === 'KSHS' && rate.to_currency === 'SSR') ||
    (rate.from_currency === 'USD' && rate.to_currency === 'SSR')
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Panel</h1>
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Uganda Rates */}
          <Card>
            <CardHeader className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <span>🇺🇬</span>
                Uganda Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {ugandaRates.map((rate) => (
                <div key={rate.rate_key}>
                  <Label>{rate.base_amount} {rate.from_currency} to {rate.to_currency}</Label>
                  <Input
                    type="number"
                    value={rates[rate.rate_key] || ''}
                    onChange={(e) => handleRateChange(rate.rate_key, e.target.value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Kenya Rates */}
          <Card>
            <CardHeader className="bg-gradient-to-br from-red-500 to-red-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <span>🇰🇪</span>
                Kenya Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {kenyaRates.map((rate) => (
                <div key={rate.rate_key}>
                  <Label>{rate.base_amount} {rate.from_currency} to {rate.to_currency}</Label>
                  <Input
                    type="number"
                    value={rates[rate.rate_key] || ''}
                    onChange={(e) => handleRateChange(rate.rate_key, e.target.value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Other Rates */}
          <Card>
            <CardHeader className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <span>💳</span>
                Other Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {otherRates.map((rate) => (
                <div key={rate.rate_key}>
                  <Label>{rate.base_amount} {rate.from_currency} to {rate.to_currency}</Label>
                  <Input
                    type="number"
                    value={rates[rate.rate_key] || ''}
                    onChange={(e) => handleRateChange(rate.rate_key, e.target.value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={handleSaveRates} size="lg" className="px-8">
            Save All Rates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
