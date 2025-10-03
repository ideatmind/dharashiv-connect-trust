import { useParams, useNavigate } from "react-router-dom";
import { Phone, MessageCircle, MapPin, Briefcase, IndianRupee, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassNavbar from "@/components/GlassNavbar";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import providerSample from "@/assets/provider-sample.jpg";

const ProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

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
    <div className="min-h-screen bg-background pb-28 pt-20">
      <GlassNavbar />

      {/* Profile Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Provider Header */}
          <div className="card-premium p-8 fade-in-scale">
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="relative group">
                <img
                  src={provider.photo}
                  alt={provider.name}
                  className="w-40 h-40 rounded-2xl object-cover shadow-[var(--shadow-medium)]"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                    {provider.name}
                  </h1>
                  <span className="verified-badge">
                    <CheckCircle className="h-4 w-4" />
                    Verified Professional
                  </span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground text-lg mb-6">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span>{provider.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Buttons */}
          <div
            className="grid grid-cols-2 gap-5 fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Button
              onClick={handleCall}
              size="lg"
              className="btn-premium h-16 text-lg group"
            >
              <Phone className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
              Call Now
            </Button>
            <Button
              onClick={handleWhatsApp}
              size="lg"
              variant="outline"
              className="h-16 text-lg border-2 hover:bg-success/5 hover:border-success hover:text-success transition-all duration-500"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Details Section */}
          <div
            ref={ref}
            className={`card-premium p-8 ${isVisible ? "fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.2s" }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Details</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Briefcase className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Experience</div>
                  <div className="text-lg font-bold text-foreground">
                    {provider.experience}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="p-2 rounded-lg bg-accent/10">
                  <IndianRupee className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Visiting Charge</div>
                  <div className="text-lg font-bold text-foreground">
                    ₹{provider.visitingCharge}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div
            className={`card-premium p-8 ${isVisible ? "fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4 tracking-tight">About</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {provider.about}
            </p>
          </div>

          {/* Services Section */}
          <div
            className={`card-premium p-8 ${isVisible ? "fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "0.4s" }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6 tracking-tight">Services</h2>
            <ul className="space-y-3">
              {provider.services.map((service, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors duration-300"
                >
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground text-lg">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA with glassmorphism */}
      <div className="fixed bottom-0 left-0 right-0 glass-dark shadow-[var(--shadow-strong)] border-t border-white/10 p-5 z-40">
        <div className="container mx-auto max-w-4xl">
          <Button
            onClick={handleCall}
            size="lg"
            className="btn-premium w-full h-16 text-lg group"
          >
            <Phone className="h-5 w-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
            Call {provider.name} Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;
