import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary">Get In</span> 
            <span className="text-gradient-primary"> Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to find your dream car? Contact us today and let our expert team 
            help you drive away in your perfect vehicle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="car-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-electric-red rounded-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Visit Our Showroom</h3>
                    <p className="text-muted-foreground">
                      Aug7Autos<br />
                      Opposite Polaris/GTB Banks<br />
                      Beside Liberty Fence<br />
                      Lister Bus-Stop<br />
                      Ring Road, Ibadan<br />
                      Oyo State, Nigeria
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="car-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-electric-red rounded-lg">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Call Us</h3>
                    <p className="text-muted-foreground">
                      <span className="font-semibold text-electric-red">Hotline / WhatsApp:</span><br />
                      <a href="tel:+2348023659244" className="hover:text-electric-red transition-colors">08023659244</a><br />
                      <span className="font-semibold text-electric-red">Other Line:</span><br />
                      <a href="tel:+2348057710330" className="hover:text-electric-red transition-colors">08057710330</a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="car-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-electric-red rounded-lg">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Email Us</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:aug7inc@hotmail.com" className="hover:text-electric-red transition-colors">
                        aug7inc@hotmail.com
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="car-card border-0">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-electric-red rounded-lg">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Opening Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: 1:00 PM - 5:00 PM (on appointments)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="car-card border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      First Name
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="border-border/50 focus:border-electric-red"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">
                      Last Name
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="border-border/50 focus:border-electric-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email" 
                    required 
                    className="border-border/50 focus:border-electric-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    required 
                    className="border-border/50 focus:border-electric-red"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Interested In
                  </label>
                  <select className="w-full px-3 py-2 border border-border/50 rounded-md focus:outline-none focus:border-electric-red">
                    <option value="">Select a car type</option>
                    <option value="sedan">Luxury Sedan</option>
                    <option value="suv">Premium SUV</option>
                    <option value="sports">Sports Coupe</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Message
                  </label>
                  <Textarea 
                    rows={5}
                    required 
                    className="border-border/50 focus:border-electric-red resize-none"
                    placeholder="Tell us about your dream car..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full btn-premium text-white py-3 text-lg rounded-full"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="car-card border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-96 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-electric-red mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-primary mb-2">Find Us Here</h3>
                  <p className="text-muted-foreground">
                    Interactive map would be embedded here<br />
                    123 Independence Avenue, CBD, Abuja
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;