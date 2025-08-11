import React, { useState, useEffect } from 'react';
import { Star, Fuel, Users, Gauge, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import BackToTop from '@/components/BackToTop';

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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

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
  }, [cars, statusFilter]);

  const fetchCars = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch cars",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCars = () => {
    if (statusFilter === 'all') {
      setFilteredCars(cars);
    } else {
      setFilteredCars(cars.filter(car => car.status === statusFilter));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-24 pb-20 bg-gradient-to-b from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-primary">All</span> 
              <span className="text-gradient-primary"> Available Cars</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Browse our complete collection of premium vehicles
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              className="rounded-full"
            >
              <Filter className="mr-2 h-4 w-4" />
              All Cars
            </Button>
            <Button
              variant={statusFilter === 'for hire' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('for hire')}
              className="rounded-full"
            >
              For Hire
            </Button>
            <Button
              variant={statusFilter === 'new' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('new')}
              className="rounded-full"
            >
              New
            </Button>
            <Button
              variant={statusFilter === 'fairly used' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('fairly used')}
              className="rounded-full"
            >
              Fairly Used
            </Button>
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
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 bg-muted rounded animate-pulse"></div>
                      <div className="w-24 h-10 bg-muted rounded animate-pulse"></div>
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
                    <div className="absolute top-4 left-4">
                      <span className="bg-electric-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {car.year}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold capitalize">
                        {car.status}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-primary mb-1">{car.name}</h3>
                      <p className="text-lg font-semibold text-electric-red">{car.brand} {car.model}</p>
                      {car.description && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {car.description}
                        </p>
                      )}
                    </div>

                    {/* Car Specs */}
                    {car.specifications && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <Fuel className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">
                            {car.specifications.fuel || 'Petrol'}
                          </p>
                        </div>
                        <div className="text-center">
                          <Users className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">
                            {car.specifications.seats || '5'} Seats
                          </p>
                        </div>
                        <div className="text-center">
                          <Gauge className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-sm text-muted-foreground">
                            {car.specifications.transmission || 'Auto'}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 btn-premium text-white rounded-full"
                        size="sm"
                        onClick={() => handleContactWhatsApp(car.name, "View Details")}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="px-4 rounded-full"
                        onClick={() => handleContactWhatsApp(car.name, car.status === 'for hire' ? 'Hire' : 'Purchase')}
                      >
                        {car.status === 'for hire' ? 'Hire Now' : 'Contact'}
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