import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MobilOil {
  id: string;
  name: string;
  type: string;
  viscosity: string;
  volume: string;
  image_url?: string;
  description?: string;
  benefits?: string[];
  in_stock: boolean;
}

const MobilOilSection = () => {
  const [oils, setOils] = useState<MobilOil[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const handleContactWhatsApp = (oilName: string) => {
    const phoneNumber = "2348023659244";
    const message = `Hello! I'm interested in ${oilName}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    const fetchOils = async () => {
      try {
        const { data, error } = await supabase
          .from('mobil_oils')
          .select('*')
          .eq('in_stock', true);

        if (error) {
          console.error('Error fetching oils:', error);
          toast({
            title: "Error",
            description: "Failed to load oil products",
            variant: "destructive",
          });
          return;
        }

        setOils(data || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOils();
  }, [toast]);

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="oils" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Mobil 1</span> 
            <span className="text-gradient-primary"> Synthetic Engine Oil</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Premium synthetic motor oils engineered to keep your engine running like new. 
            Superior protection and performance for every drive.
          </p>
        </div>

        {oils.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-6">
              Oil products will be displayed here once added by admin.
            </p>
            <Button 
              onClick={() => handleContactWhatsApp("Mobil 1 Synthetic Engine Oil")}
              className="btn-premium text-white px-8 py-3 rounded-full"
            >
              Contact Us for Oil Products
            </Button>
          </div>
        ) : (
          <>
            {/* Oils Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {oils.map((oil, index) => (
                <Card 
                  key={oil.id} 
                  className="car-card border-0 overflow-hidden group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative overflow-hidden">
                    {oil.image_url ? (
                      <img 
                        src={oil.image_url} 
                        alt={oil.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gradient-to-br from-electric-red/20 to-primary/20 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                            <span className="text-2xl">🛢️</span>
                          </div>
                          <p className="text-muted-foreground">Image will be added</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="bg-electric-red text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {oil.in_stock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-primary mb-2">{oil.name}</h3>
                      <p className="text-sm text-muted-foreground">{oil.type}</p>
                    </div>

                    {/* Oil Specifications */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm font-semibold text-primary">Viscosity</p>
                        <p className="text-sm text-muted-foreground">{oil.viscosity}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">Volume</p>
                        <p className="text-sm text-muted-foreground">{oil.volume}</p>
                      </div>
                    </div>

                    {/* Benefits */}
                    {oil.benefits && oil.benefits.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-primary mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-2">
                          {oil.benefits.map((benefit, idx) => (
                            <span 
                              key={idx}
                              className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {oil.description && (
                      <p className="text-sm text-muted-foreground mb-6">{oil.description}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        className="flex-1 btn-premium text-white rounded-full"
                        size="sm"
                        onClick={() => handleContactWhatsApp(oil.name)}
                      >
                        Inquire Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="px-4 rounded-full"
                        onClick={() => handleContactWhatsApp(`${oil.name} - Order`)}
                      >
                        Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Section */}
            <div className="text-center mt-12">
              <Button 
                size="lg"
                onClick={() => handleContactWhatsApp("Mobil 1 Oil Products")}
                className="btn-premium text-white px-8 py-4 text-lg rounded-full"
              >
                Contact Us for More Oil Products
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MobilOilSection;