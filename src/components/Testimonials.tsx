import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ahmed Musa",
      location: "Abuja",
      rating: 5,
      text: "Exceptional service! The team at Abuja Best Cars helped me find the perfect SUV for my family. The financing process was smooth and transparent.",
      car: "Premium SUV"
    },
    {
      id: 2,
      name: "Fatima Ibrahim",
      location: "Kaduna",
      rating: 5,
      text: "I couldn't be happier with my purchase. The car was exactly as described, and the after-sales service has been outstanding. Highly recommended!",
      car: "Luxury Sedan"
    },
    {
      id: 3,
      name: "John Okafor",
      location: "Lagos",
      rating: 5,
      text: "Professional, reliable, and honest. They went above and beyond to ensure I got the best deal. The quality of their cars is unmatched.",
      car: "Sports Coupe"
    },
    {
      id: 4,
      name: "Mary Adebayo",
      location: "Port Harcourt",
      rating: 5,
      text: "Amazing experience from start to finish. The staff was knowledgeable and patient, helping me understand all the features of my new car.",
      car: "Compact SUV"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">What Our</span> 
            <span className="text-gradient-primary"> Customers Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers 
            have to say about their experience with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Card className="testimonial-card overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="text-center">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-12 w-12 text-electric-red mx-auto" />
                </div>

                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-xl md:text-2xl text-primary leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                {/* Customer Info */}
                <div>
                  <h4 className="text-xl font-bold text-primary mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-muted-foreground mb-2">
                    {testimonials[currentIndex].location}
                  </p>
                  <p className="text-sm text-electric-red font-semibold">
                    Purchased: {testimonials[currentIndex].car}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 glass hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full p-2 glass hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-electric-red scale-125' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="btn-premium text-white px-8 py-4 text-lg rounded-full"
          >
            Join Our Happy Customers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;