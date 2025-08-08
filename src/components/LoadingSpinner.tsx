import React from 'react';
import { Car } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-primary z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-electric-red to-electric-red-dark rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Car className="h-10 w-10 text-white" />
          </div>
          
          {/* Loading Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Aug7Aautos</h2>
          <p className="text-white/80">Loading your dream cars...</p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full mx-auto mt-6">
          <div className="h-full bg-gradient-to-r from-electric-red to-electric-red-dark rounded-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;