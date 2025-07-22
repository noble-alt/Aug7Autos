import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CarShowcase from '@/components/CarShowcase';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import LoadingSpinner from '@/components/LoadingSpinner';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Add scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      {/* Main Content */}
      <main>
        <Hero />
        <div className="animate-on-scroll">
          <CarShowcase />
        </div>
        <div className="animate-on-scroll">
          <WhyChooseUs />
        </div>
        <div className="animate-on-scroll">
          <Testimonials />
        </div>
        <div className="animate-on-scroll">
          <Contact />
        </div>
      </main>

      {/* Floating Elements */}
      <WhatsAppFloat />

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80">
            © 2024 Abuja Best Cars. All rights reserved. | 
            <span className="text-electric-red"> Drive Your Dreams Today</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
