import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, MapPin, Briefcase, IndianRupee, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import providerSample from "@/assets/provider-sample.jpg";

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock provider data
  const provider = {
    id,
    name: "Rajesh Kumar",
    photo: providerSample,
    location: "Shivaji Nagar, Dharashiv",
    experience: "8 Years",
    visitingCharge: "150",
    phone: "+91 98765 43210",
    about:
      "Experienced electrician specializing in residential and commercial electrical work. Expert in wiring, installations, repairs, and maintenance. Available for emergency services. Serving Dharashiv and surrounding areas with quality workmanship.",
    services: [
      "Electrical Wiring & Installation",
      "Fan & Light Installation",
      "Switch & Socket Repair",
      "MCB & Fuse Box Repair",
      "Emergency Electrical Services",
    ],
  };

  const handleCall = () => {
    window.location.href = `tel:${provider.phone}`;
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${provider.phone.replace(/\s/g, "")}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Provider Header */}
          <Card className="p-6 fade-in bg-card border-border">
            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={provider.photo}
                alt={provider.name}
                className="w-32 h-32 rounded-xl object-cover mx-auto sm:mx-0"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                    {provider.name}
                  </h1>
                  <span className="verified-badge">
                    <CheckCircle className="h-4 w-4" />
                    Verified Professional
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{provider.location}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Contact Buttons */}
          <div
            className="grid grid-cols-2 gap-4 fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <Button
              onClick={handleCall}
              size="lg"
              className="btn-cta h-14 text-base"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="lg"
              variant="outline"
              className="h-14 text-base border-2 hover:bg-success/10 hover:border-success hover:text-success transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Details Section */}
          <Card
            className="p-6 fade-in bg-card border-border"
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Details</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground">Experience</div>
                  <div className="font-semibold text-foreground">
                    {provider.experience}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm text-muted-foreground">Visiting Charge</div>
                  <div className="font-semibold text-foreground">
                    ₹{provider.visitingCharge}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* About Section */}
          <Card
            className="p-6 fade-in bg-card border-border"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {provider.about}
            </p>
          </Card>

          {/* Services Section */}
          <Card
            className="p-6 fade-in bg-card border-border"
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Services</h2>
            <ul className="space-y-2">
              {provider.services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-muted-foreground"
                >
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4">
        <div className="container mx-auto max-w-4xl">
          <Button
            onClick={handleCall}
            size="lg"
            className="btn-cta w-full h-14 text-lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call {provider.name} Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
