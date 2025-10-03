import { Phone, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
  return (
    <Card
      className="p-4 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 cursor-pointer bg-card border-border"
      onClick={onClick}
    >
      <div className="flex gap-4">
        {/* Provider Photo */}
        <div className="flex-shrink-0">
          <img
            src={photo}
            alt={name}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>

        {/* Provider Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground text-lg truncate">
              {name}
            </h3>
            <span className="verified-badge flex-shrink-0">
              <CheckCircle className="h-4 w-4" />
              Verified
            </span>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span>{experience} Experience</span>
              <span>•</span>
              <span className="font-medium text-foreground">₹{visitingCharge} Visiting Charge</span>
            </div>
          </div>

          {/* CTA Button */}
          <Button className="btn-cta w-full sm:w-auto">
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProviderCard;
