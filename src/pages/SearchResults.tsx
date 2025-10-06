import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerChildren } from "@/lib/animations";
import ProviderCard from "@/components/ProviderCard";
import GlassNavbar from "@/components/GlassNavbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Provider {
  id: string;
  name: string;
  photo_url: string;
  location: string;
  profession: string;
  experience_years: number;
  visiting_charge: number;
  phone: string;
  whatsapp: string | null;
  keywords: string[] | null;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  
  const query = searchParams.get("q") || "";

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      
      let supabaseQuery = supabase
        .from("service_providers")
        .select("*");

      if (query) {
        // Search in name, profession, location, and keywords
        supabaseQuery = supabaseQuery.or(
          `name.ilike.%${query}%,profession.ilike.%${query}%,location.ilike.%${query}%,keywords.cs.{${query}}`
        );
      }

      const { data, error } = await supabaseQuery;

      if (!error && data) {
        setProviders(data);
      }
      setLoading(false);
    };

    fetchProviders();
  }, [query]);

  const handleProviderClick = (providerId: string) => {
    navigate(`/provider/${providerId}`);
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <GlassNavbar />

      {/* Hero Header */}
      <header className="bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-16 mb-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight fade-in-up">
            Search Results for "{query}"
          </h1>
          <p className="text-lg md:text-xl text-white/90 fade-in-up" style={{ animationDelay: "0.1s" }}>
            {loading ? "Searching..." : `${providers.length} ${providers.length === 1 ? "Professional" : "Professionals"} Found`}
          </p>
        </div>
      </header>

      {/* Results List */}
      <main ref={ref} className="container mx-auto px-4 pb-12 max-w-7xl">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">Loading providers...</p>
          </div>
        ) : providers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider, index) => (
              <div
                key={provider.id}
                className={isVisible ? "fade-in-up" : "opacity-0"}
                style={staggerChildren(index, 0.1)}
              >
                <ProviderCard
                  id={provider.id}
                  name={provider.name}
                  photo={provider.photo_url}
                  location={provider.location}
                  profession={provider.profession}
                  experience={`${provider.experience_years} Years`}
                  visitingCharge={provider.visiting_charge.toString()}
                  phone={provider.phone}
                  whatsapp={provider.whatsapp || provider.phone}
                  onClick={() => handleProviderClick(provider.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No professionals found for "{query}"
            </p>
            <p className="text-muted-foreground">
              Try searching for: electrician, plumber, carpenter, painter, AC technician, or appliance repair
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;