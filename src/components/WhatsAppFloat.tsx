import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "2348023659244";
    const message = "Hello! I'm interested in learning more about your cars and services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 z-50 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-3 bg-primary text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us on WhatsApp
        <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 border-4 border-transparent border-l-primary"></div>
      </div>
    </button>
  );
};

export default WhatsAppFloat;