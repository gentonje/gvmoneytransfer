
import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import RateCalculator from '../components/RateCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-4">
        {/* Header with dropdown menu */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            GV Money Transfer
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger className="p-2 hover:bg-white/50 rounded-lg">
              <Menu className="h-6 w-6 text-gray-700" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border shadow-lg">
              <DropdownMenuItem asChild>
                <Link to="/admin" className="w-full cursor-pointer">
                  Admin Panel
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-lg text-gray-600 mb-2">Mobile Money Transfer</p>
          <p className="text-base text-orange-600 font-semibold">Calculate Your Sending Rates</p>
        </div>
        
        <RateCalculator />
      </div>
    </div>
  );
};

export default Index;
