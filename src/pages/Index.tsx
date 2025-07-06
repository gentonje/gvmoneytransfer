
import React from 'react';
import RateCalculator from '../components/RateCalculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Dream Express
          </h1>
          <p className="text-xl text-gray-600 mb-2">Mobile Money Transfer</p>
          <p className="text-lg text-orange-600 font-semibold">Calculate Your Sending Rates</p>
        </div>
        
        <RateCalculator />
        
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">Rates updated daily • Secure transfers • Trusted service</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
