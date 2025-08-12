import React, { useState, useEffect } from 'react';
import { Search, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import Navbar from '@/components/Navbar';
import BackToTop from '@/components/BackToTop';
import { supabase } from '@/integrations/supabase/client';

interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  description?: string;
  status: string;
  image_url?: string;
  specifications?: any;
  price?: number;
}

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleContactWhatsApp = (carName: string, action: string) => {
    const phoneNumber = "2348023659244";
    const message = `Hello! I'm interested in ${action.toLowerCase()} the ${carName}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    filterCars();
  }, [cars, statusFilter, searchQuery]);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCars = () => {
    let filtered = cars;
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(car => car.status === statusFilter);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Our</span> 
            <span className="text-gradient-primary"> Car Collection</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse through our extensive collection of premium vehicles
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant={statusFilter === 'all' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setStatusFilter('all')}
          >
            All Cars
          </Button>
          <Button
            variant={statusFilter === 'for-hire' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setStatusFilter('for-hire')}
          >
            For Hire
          </Button>
          <Button
            variant={statusFilter === 'brand-new' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setStatusFilter('brand-new')}
          >
            New
          </Button>
          <Button
            variant={statusFilter === 'fairly-used' ? 'default' : 'outline'}
            className="rounded-full"
            onClick={() => setStatusFilter('fairly-used')}
          >
            Fairly Used
          </Button>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search cars by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full"
            />
          </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            [...Array(6)].map((_, index) => (
              <Card key={index} className="car-card border-0 overflow-hidden">
                <div className="w-full h-64 bg-muted animate-pulse"></div>
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded mb-4 animate-pulse"></div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-10 bg-muted rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredCars.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-muted-foreground">
                No cars found for the selected filter.
              </p>
            </div>
          ) : (
            filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className="car-card border-0 overflow-hidden group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={car.image_url || '/placeholder.svg'} 
                    alt={car.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white text-sm font-medium">5.0</span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-primary mb-2">{car.name}</h3>
                    <p className="text-lg font-semibold text-electric-red capitalize">{car.status?.replace('-', ' ')}</p>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 btn-premium text-white rounded-full"
                      size="sm"
                      onClick={() => handleContactWhatsApp(car.name, "View Details")}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        </div>
      </section>

      <BackToTop />
    </div>
  );
};

export default Cars;