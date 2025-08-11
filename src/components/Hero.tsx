import React from 'react';
import { ArrowRight, Star, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '/lovable-uploads/9c898d2b-fa06-4783-80d6-306ac39654e3.png';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">Trusted by 1000+ Clients</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-white">Drive Your</span>
            <br />
            <span className="hero-text">Dream Car Today</span>
            <br />
            <span className="text-white">Only at</span> 
            <span className="text-electric-red"> Aug7Autos!</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover premium vehicles with unbeatable financing options. 
            Your perfect car awaits at Aug7Autos - Ring Road, Ibadan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              className="btn-premium text-white px-8 py-4 text-lg rounded-full font-semibold min-w-[200px]"
              onClick={() => {
                window.location.href = '/cars';
              }}
            >
              Browse Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="glass border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full font-semibold min-w-[200px]"
              onClick={() => {
                const phoneNumber = "2348023659244";
                const message = "Hello! I'm interested in financing options for a car.";
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Get Financing
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Shield className="h-8 w-8 text-electric-red mr-2" />
                <span className="text-3xl font-bold text-white">1000+</span>
              </div>
              <p className="text-white/80">Happy Customers</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-electric-red mr-2" />
                <span className="text-3xl font-bold text-white">5+</span>
              </div>
              <p className="text-white/80">Years Experience</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Star className="h-8 w-8 text-electric-red mr-2" />
                <span className="text-3xl font-bold text-white">100%</span>
              </div>
              <p className="text-white/80">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;