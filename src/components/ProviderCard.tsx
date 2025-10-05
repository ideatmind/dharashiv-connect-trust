import { Phone, MapPin, CheckCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface ProviderCardProps {
  id: string;
  name: string;
  photo: string;
  location: string;
  profession: string;
  experience: string;
  visitingCharge: string;
  phone: string;
  whatsapp?: string | null;
  onClick: () => void;
}

const ProviderCard = ({
  id,
  name,
  photo,
  location,
  profession,
  experience,
  visitingCharge,
  phone,
  whatsapp,
  onClick,
}: ProviderCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const trackClick = async (clickType: 'call' | 'whatsapp') => {
    try {
      await supabase.from("provider_clicks").insert({
        provider_id: id,
        click_type: clickType,
      });
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackClick('call');
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackClick('whatsapp');
    window.open(`https://wa.me/${whatsapp?.replace(/\D/g, '')}`, '_blank');
  };

  return (
    <div
      className="card-premium cursor-pointer group max-w-sm mx-auto"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Provider Photo with zoom effect */}
      <div className="relative overflow-hidden rounded-t-2xl h-64">
        <img
          src={photo}
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Verified badge */}
        <div className="absolute top-4 right-4">
          <span className="verified-badge text-xs shadow-lg">
            <CheckCircle className="h-3.5 w-3.5" />
            Verified
          </span>
        </div>
      </div>

      {/* Provider Info */}
      <div className="p-6">
        <h3 className="font-bold text-foreground text-2xl tracking-tight mb-2">
          {name}
        </h3>
        <p className="text-accent font-semibold text-lg mb-4">{profession}</p>

        <div className="space-y-3 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">{experience} Experience</span>
            <span className="font-bold text-lg text-accent">
              ₹{visitingCharge}
            </span>
          </div>
        </div>

        {/* CTA Buttons with icon animation */}
        <div className="flex gap-2">
          <Button
            className="btn-premium flex-1 group/btn"
            onClick={handleCall}
          >
            <Phone className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/btn:rotate-12" />
            Call
          </Button>
          {whatsapp && (
            <Button
              className="btn-premium flex-1 group/btn bg-[#25D366] hover:bg-[#20BA5A]"
              onClick={handleWhatsApp}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
