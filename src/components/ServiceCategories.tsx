import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerChildren } from "@/lib/animations";
import { supabase } from "@/integrations/supabase/client";

interface Service {
  id: string;
  name: string;
  icon_url: string;
  description: string | null;
}

const ServiceCategories = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("name");

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <section ref={ref} className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight ${
              isVisible ? "fade-in-up" : "opacity-0"
            }`}
          >
            Our Services
          </h2>
          <p
            className={`text-muted-foreground text-lg md:text-xl ${
              isVisible ? "fade-in-up" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            आमच्या सेवा - Choose from verified local professionals
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading services...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/category/${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="group"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/80 border-2 border-border/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-[0_25px_70px_-15px_rgba(59,130,246,0.4)] hover:border-primary/50 ${isVisible ? "fade-in-scale" : "opacity-0"}`}
                  style={staggerChildren(index, 0.08)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-10 flex flex-col items-center gap-5">
                    <div className="relative w-24 h-24 flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/15 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg group-hover:shadow-primary/20">
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={service.icon_url}
                        alt={service.name}
                        className="w-14 h-14 object-contain relative z-10 drop-shadow-lg"
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground text-center group-hover:text-primary transition-colors duration-300">
                      {service.name}
                    </h3>
                    
                    <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceCategories;
