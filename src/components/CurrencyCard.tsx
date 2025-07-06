
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Rate {
  from: string;
  to: string;
  rate: number;
  amount: number;
}

interface CurrencyCardProps {
  title: string;
  flag: string;
  rates: Rate[];
  color: string;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ title, flag, rates, color }) => {
  return (
    <Card className="shadow-lg border-0 overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className={`${color} text-white`}>
        <CardTitle className="text-lg flex items-center gap-2">
          <span className="text-2xl">{flag}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {rates.map((rate, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="text-sm">
                <span className="font-semibold">{rate.amount.toLocaleString()}</span>
                <span className="text-gray-600 ml-1">{rate.from}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-green-600">
                  {rate.rate.toLocaleString()} {rate.to}
                </div>
                <div className="text-xs text-gray-500">
                  Rate: {(rate.rate / rate.amount).toFixed(4)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrencyCard;
