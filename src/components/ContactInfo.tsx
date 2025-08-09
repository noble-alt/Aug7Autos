import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visit <span className="text-electric-red">Aug7Autos</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Come experience our premium vehicles and exceptional service in person
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="text-center">
            <div className="w-16 h-16 bg-electric-red rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Our Location</h3>
            <div className="text-white/80 leading-relaxed">
              <p className="font-semibold mb-2">Aug7Autos</p>
              <p>Opposite Polaris/GTB Banks</p>
              <p>Beside Liberty Fence</p>
              <p>Lister Bus-Stop</p>
              <p>Ring Road, Ibadan</p>
              <p>Oyo State, Nigeria</p>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="text-center">
            <div className="w-16 h-16 bg-electric-red rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Call Us</h3>
            <div className="text-white/80 space-y-2">
              <p>
                <span className="font-semibold text-electric-red">Hotline / WhatsApp:</span>
                <br />
                <a href="tel:+2348023659244" className="hover:text-electric-red transition-colors">
                  08023659244
                </a>
              </p>
              <p>
                <span className="font-semibold text-electric-red">Other Line:</span>
                <br />
                <a href="tel:+2348057710330" className="hover:text-electric-red transition-colors">
                  08057710330
                </a>
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="text-center">
            <div className="w-16 h-16 bg-electric-red rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-4">Email Us</h3>
            <div className="text-white/80">
              <a 
                href="mailto:aug7inc@hotmail.com" 
                className="hover:text-electric-red transition-colors text-lg"
              >
                aug7inc@hotmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;