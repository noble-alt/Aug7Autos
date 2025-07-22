import React from 'react';
import { Shield, DollarSign, Award, Clock, Users, Wrench } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhyChooseUs = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Affordable Financing",
      description: "Flexible payment plans with competitive interest rates tailored to your budget."
    },
    {
      icon: Users,
      title: "Trusted by 1000+ Clients",
      description: "Join thousands of satisfied customers who chose us for their dream cars."
    },
    {
      icon: Shield,
      title: "Certified Used Cars",
      description: "Every vehicle undergoes rigorous inspection and comes with warranty coverage."
    },
    {
      icon: Clock,
      title: "Quick Processing",
      description: "Fast approval process - drive your new car home in just 24 hours."
    },
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized for excellence in customer service and automotive sales."
    },
    {
      icon: Wrench,
      title: "Free Maintenance",
      description: "Complimentary first-year maintenance and 24/7 roadside assistance included."
    }
  ];

  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-electric-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-silver rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-electric-red">Abuja Best Cars?</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're not just a car dealership - we're your partner in finding the perfect vehicle 
            with unmatched service and support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-electric-red rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-electric-red mb-2">1000+</div>
            <p className="text-white/80">Cars Sold</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-electric-red mb-2">5+</div>
            <p className="text-white/80">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-electric-red mb-2">99%</div>
            <p className="text-white/80">Customer Satisfaction</p>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-electric-red mb-2">24/7</div>
            <p className="text-white/80">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;