import { Phone, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ProviderCardProps {
  id: string;
  name: string;
  photo: string;
  location: string;
  experience: string;
  visitingCharge: string;
  onClick: () => void;
}

const ProviderCard = ({
  name,
  photo,
  location,
  experience,
  visitingCharge,
  onClick,
}: ProviderCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card-premium cursor-pointer group"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-5 p-5">
        {/* Provider Photo with zoom effect */}
        <div className="flex-shrink-0 relative overflow-hidden rounded-xl">
          <img
            src={photo}
            alt={name}
            className={`w-24 h-24 object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          {/* Gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Verified badge animates up on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-2 transition-all duration-500 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <span className="verified-badge text-xs">
              <CheckCircle className="h-3 w-3" />
              Verified
            </span>
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-foreground text-xl tracking-tight truncate">
              {name}
            </h3>
            {!isHovered && (
              <span className="verified-badge flex-shrink-0 text-xs">
                <CheckCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Verified</span>
              </span>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-accent" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-medium">{experience} Experience</span>
              <span className="text-border">•</span>
              <span className="font-semibold text-foreground">
                ₹{visitingCharge} Visiting
              </span>
            </div>
          </div>

          {/* CTA Button with icon animation */}
          <Button
            className="btn-premium w-full sm:w-auto group/btn"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <Phone className="h-4 w-4 mr-2 transition-transform duration-300 group-hover/btn:rotate-12" />
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
