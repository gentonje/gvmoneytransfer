
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [rates, setRates] = useState({
    SSR_to_UGX_1000: 550,
    SSR_to_UGX_10000: 5500,
    USD_to_UGX_100: 3850,
    SSR_to_KSHS_51000: 1400,
    USD_to_KSHS_100: 125,
    UGX_to_SSR_10000: 45,
    UGX_to_SSR_100000: 450,
    KSHS_to_SSR_1000: 45,
    USD_to_SSR_100: 600000
  });
  const { toast } = useToast();

  const correctPassword = '@#$_&-+()/'

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

  const handleSaveRates = () => {
    // In a real app, this would save to a database
    // For now, we'll just show a success message
    toast({
      title: "Rates Updated",
      description: "Exchange rates have been saved successfully",
    });
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
              <div>
                <Label>1000 SSR to UGX</Label>
                <Input
                  type="number"
                  value={rates.SSR_to_UGX_1000}
                  onChange={(e) => handleRateChange('SSR_to_UGX_1000', e.target.value)}
                />
              </div>
              <div>
                <Label>10000 SSR to UGX</Label>
                <Input
                  type="number"
                  value={rates.SSR_to_UGX_10000}
                  onChange={(e) => handleRateChange('SSR_to_UGX_10000', e.target.value)}
                />
              </div>
              <div>
                <Label>100 USD to UGX</Label>
                <Input
                  type="number"
                  value={rates.USD_to_UGX_100}
                  onChange={(e) => handleRateChange('USD_to_UGX_100', e.target.value)}
                />
              </div>
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
              <div>
                <Label>51000 SSR to KSHS</Label>
                <Input
                  type="number"
                  value={rates.SSR_to_KSHS_51000}
                  onChange={(e) => handleRateChange('SSR_to_KSHS_51000', e.target.value)}
                />
              </div>
              <div>
                <Label>100 USD to KSHS</Label>
                <Input
                  type="number"
                  value={rates.USD_to_KSHS_100}
                  onChange={(e) => handleRateChange('USD_to_KSHS_100', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal & US Rates */}
          <Card>
            <CardHeader className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <span>💳</span>
                Other Rates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div>
                <Label>10000 UGX to SSR</Label>
                <Input
                  type="number"
                  value={rates.UGX_to_SSR_10000}
                  onChange={(e) => handleRateChange('UGX_to_SSR_10000', e.target.value)}
                />
              </div>
              <div>
                <Label>100000 UGX to SSR</Label>
                <Input
                  type="number"
                  value={rates.UGX_to_SSR_100000}
                  onChange={(e) => handleRateChange('UGX_to_SSR_100000', e.target.value)}
                />
              </div>
              <div>
                <Label>1000 KSHS to SSR</Label>
                <Input
                  type="number"
                  value={rates.KSHS_to_SSR_1000}
                  onChange={(e) => handleRateChange('KSHS_to_SSR_1000', e.target.value)}
                />
              </div>
              <div>
                <Label>100 USD to SSR</Label>
                <Input
                  type="number"
                  value={rates.USD_to_SSR_100}
                  onChange={(e) => handleRateChange('USD_to_SSR_100', e.target.value)}
                />
              </div>
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
