import React from 'react';
import { Star, Fuel, Users, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import carSedan from '@/assets/car-sedan-luxury.jpg';
import carSUV from '@/assets/car-suv-red.jpg';
import carSports from '@/assets/car-sports-white.jpg';

const CarShowcase = () => {
  const cars = [
    {
      id: 1,
      name: "Luxury Sedan",
      price: "₦15,500,000",
      image: carSedan,
      rating: 4.9,
      fuel: "Hybrid",
      seats: 5,
      speed: "250 km/h",
      year: 2024,
      features: ["Leather Interior", "Sunroof", "Navigation"]
    },
    {
      id: 2,
      name: "Premium SUV",
      price: "₦22,800,000",
      image: carSUV,
      rating: 4.8,
      fuel: "Petrol",
      seats: 7,
      speed: "200 km/h",
      year: 2024,
      features: ["4WD", "Panoramic Roof", "Premium Sound"]
    },
    {
      id: 3,
      name: "Sports Coupe",
      price: "₦35,200,000",
      image: carSports,
      rating: 5.0,
      fuel: "Petrol",
      seats: 2,
      speed: "320 km/h",
      year: 2024,
      features: ["Racing Package", "Carbon Fiber", "Track Mode"]
    }
  ];

  return (
    <section id="cars" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Latest</span> 
            <span className="text-gradient-primary"> Premium Cars</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our handpicked selection of luxury vehicles, each offering 
            unparalleled performance, comfort, and style.
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car, index) => (
            <Card 
              key={car.id} 
              className="car-card border-0 overflow-hidden group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-electric-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {car.year}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-white text-sm font-medium">{car.rating}</span>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-primary mb-2">{car.name}</h3>
                </div>

                {/* Car Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <Fuel className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">{car.fuel}</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">{car.seats} Seats</p>
                  </div>
                  <div className="text-center">
                    <Gauge className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm text-muted-foreground">{car.speed}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold text-primary mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {car.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 btn-premium text-white rounded-full"
                    size="sm"
                  >
                    View Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="px-4 rounded-full"
                  >
                    Book Test Drive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Cars
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;