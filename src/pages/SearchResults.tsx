import { useSearchParams, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerChildren } from "@/lib/animations";
import ProviderCard from "@/components/ProviderCard";
import GlassNavbar from "@/components/GlassNavbar";
import Footer from "@/components/Footer";
import providerSample from "@/assets/provider-sample.jpg";

// Mock data for all providers
const allProviders = [
  {
    id: "1",
    name: "Rajesh Kumar",
    photo: providerSample,
    location: "Shivaji Nagar",
    profession: "Electrician",
    experience: "8 Years",
    visitingCharge: "150",
    keywords: ["electrician", "electric", "wiring", "electrical work"],
  },
  {
    id: "2",
    name: "Amit Patil",
    photo: providerSample,
    location: "Gandhi Chowk",
    profession: "Electrician",
    experience: "12 Years",
    visitingCharge: "200",
    keywords: ["electrician", "electric", "wiring", "electrical work"],
  },
  {
    id: "3",
    name: "Suresh Jadhav",
    photo: providerSample,
    location: "Station Road",
    profession: "Plumber",
    experience: "6 Years",
    visitingCharge: "150",
    keywords: ["plumber", "plumbing", "pipe", "water", "leak"],
  },
  {
    id: "4",
    name: "Vijay Deshmukh",
    photo: providerSample,
    location: "Market Yard",
    profession: "Plumber",
    experience: "10 Years",
    visitingCharge: "180",
    keywords: ["plumber", "plumbing", "pipe", "water", "leak"],
  },
  {
    id: "5",
    name: "Santosh Bhosale",
    photo: providerSample,
    location: "Railway Station",
    profession: "Carpenter",
    experience: "15 Years",
    visitingCharge: "250",
    keywords: ["carpenter", "carpentry", "wood", "furniture", "woodwork"],
  },
  {
    id: "6",
    name: "Ramesh Shinde",
    photo: providerSample,
    location: "College Road",
    profession: "Painter",
    experience: "7 Years",
    visitingCharge: "120",
    keywords: ["painter", "painting", "paint", "wall", "color"],
  },
  {
    id: "7",
    name: "Prakash Gaikwad",
    photo: providerSample,
    location: "Shivaji Nagar",
    profession: "AC Technician",
    experience: "9 Years",
    visitingCharge: "180",
    keywords: ["ac", "air conditioner", "cooling", "hvac", "air conditioning"],
  },
  {
    id: "8",
    name: "Mahesh Kale",
    photo: providerSample,
    location: "Gandhi Chowk",
    profession: "Appliance Repair",
    experience: "11 Years",
    visitingCharge: "150",
    keywords: ["appliance", "repair", "washing machine", "fridge", "refrigerator"],
  },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const query = searchParams.get("q") || "";
  
  // Advanced search: match by profession, name, or keywords
  const searchResults = allProviders.filter((provider) => {
    const searchTerm = query.toLowerCase();
    return (
      provider.profession.toLowerCase().includes(searchTerm) ||
      provider.name.toLowerCase().includes(searchTerm) ||
      provider.keywords.some(keyword => keyword.includes(searchTerm)) ||
      provider.location.toLowerCase().includes(searchTerm)
    );
  });

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
            {searchResults.length} {searchResults.length === 1 ? "Professional" : "Professionals"} Found
          </p>
        </div>
      </header>

      {/* Results List */}
      <main ref={ref} className="container mx-auto px-4 pb-12 max-w-7xl">
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((provider, index) => (
              <div
                key={provider.id}
                className={isVisible ? "fade-in-up" : "opacity-0"}
                style={staggerChildren(index, 0.1)}
              >
                <ProviderCard
                  {...provider}
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
