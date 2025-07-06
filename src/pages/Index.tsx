
import React from 'react';
import { Link } from 'react-router-dom';
import RateCalculator from '../components/RateCalculator';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Green Valley Money Transfer
          </h1>
          <p className="text-xl text-gray-600 mb-6">Secure Cross-Border Money Transfer</p>
          
          {/* Money Transfer Flow Visual */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            {/* South Sudan */}
            <div className="flex flex-col items-center">
              <div className="text-6xl mb-2">🇸🇸</div>
              <div className="text-sm font-medium text-gray-700">South Sudan</div>
              <div className="text-xs text-gray-500">SSR</div>
            </div>
            
            {/* Arrow with cash flow */}
            <div className="flex items-center gap-1">
              <div className="text-green-600 text-2xl">💵</div>
              <ArrowRight className="text-orange-500 w-6 h-6" />
            </div>
            
            {/* Uganda */}
            <div className="flex flex-col items-center">
              <div className="text-6xl mb-2">🇺🇬</div>
              <div className="text-sm font-medium text-gray-700">Uganda</div>
              <div className="text-xs text-gray-500">UGX</div>
            </div>
            
            {/* Arrow with cash flow */}
            <div className="flex items-center gap-1">
              <div className="text-green-600 text-2xl">💵</div>
              <ArrowRight className="text-orange-500 w-6 h-6" />
            </div>
            
            {/* Kenya */}
            <div className="flex flex-col items-center">
              <div className="text-6xl mb-2">🇰🇪</div>
              <div className="text-sm font-medium text-gray-700">Kenya</div>
              <div className="text-xs text-gray-500">KSHS</div>
            </div>
          </div>
          
          {/* Bidirectional flow indicator */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>💰</span>
              <span>Fast & Secure Transfers</span>
              <span>💰</span>
            </div>
          </div>
          
          <p className="text-lg text-orange-600 font-semibold">Calculate Your Sending Rates</p>
        </div>
        
        <RateCalculator />
        
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">Rates updated daily • Secure transfers • Trusted service</p>
          <Link 
            to="/admin" 
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
