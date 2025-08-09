import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Aug7 with rotating dots */}
        <div className="relative mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Aug7</h2>
          
          {/* Three dots rotating around Aug7 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute w-3 h-3 bg-electric-red rounded-full animate-spin" 
                   style={{ 
                     top: '0', 
                     left: '50%', 
                     transform: 'translateX(-50%)',
                     animationDuration: '2s',
                     transformOrigin: '50% 48px'
                   }}>
              </div>
              <div className="absolute w-3 h-3 bg-electric-red rounded-full animate-spin" 
                   style={{ 
                     top: '0', 
                     left: '50%', 
                     transform: 'translateX(-50%)',
                     animationDuration: '2s',
                     animationDelay: '0.66s',
                     transformOrigin: '50% 48px'
                   }}>
              </div>
              <div className="absolute w-3 h-3 bg-electric-red rounded-full animate-spin" 
                   style={{ 
                     top: '0', 
                     left: '50%', 
                     transform: 'translateX(-50%)',
                     animationDuration: '2s',
                     animationDelay: '1.33s',
                     transformOrigin: '50% 48px'
                   }}>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-white/80 text-lg">Processing your request...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;