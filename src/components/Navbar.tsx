import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '/cars' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      // For anchor links, scroll to the element
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // For page navigation
      window.location.href = href;
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-500 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-electric-red to-electric-red-dark">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div className="text-xl font-bold text-primary">
              <span className="text-electric-red">Aug7Autos</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className="text-primary hover:text-electric-red transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
            <Button 
              variant="ghost"
              size="sm"
              className="text-primary hover:text-electric-red"
              onClick={() => window.location.href = '/admin'}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setIsOpen(false);
                    handleNavigation(item.href);
                  }}
                  className="block w-full text-left px-3 py-2 text-primary hover:text-electric-red transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button 
                  variant="ghost"
                  size="sm"
                  className="w-full text-primary hover:text-electric-red flex items-center justify-center gap-2"
                  onClick={() => window.location.href = '/admin'}
                >
                  <Settings className="h-5 w-5" />
                  Admin
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;