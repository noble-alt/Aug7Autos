import React from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const CarShowcase = () => {
  const [cars, setCars] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleContactWhatsApp = (carName: string, action: string) => {
    const phoneNumber = "2348023659244";
    const message = `Hello! I'm interested in ${action.toLowerCase()} the ${carName}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  React.useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('is_featured', true)
          .limit(2);
        
        if (error) throw error;
        setCars(data || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

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
          {loading ? (
            // Loading skeleton
            [...Array(3)].map((_, index) => (
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
          ) : (
            cars.map((car, index) => (
            <Card 
              key={car.id} 
              className="car-card border-0 overflow-hidden group"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={car.image_url || '/placeholder.svg'} 
                  alt={car.name}
                  className="w-full h-64 object-contain group-hover:scale-110 transition-transform duration-700"
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

                {/* No action buttons for featured cars on homepage */}
              </CardContent>
            </Card>
            ))
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant="default"
            className="rounded-full"
            onClick={() => window.location.href = '/cars'}
          >
            All Cars
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => window.location.href = '/cars?filter=Rent/Hire a car'}
          >
            Rent/Hire a car
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => window.location.href = '/cars?filter=Foreign used cars'}
          >
            Foreign used cars
          </Button>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={() => window.location.href = '/cars?filter=Brand new cars'}
          >
            Brand new cars
          </Button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            onClick={() => window.location.href = '/cars'}
          >
            View All Cars
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarShowcase;