import { useParams, useNavigate } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerChildren } from "@/lib/animations";
import ProviderCard from "@/components/ProviderCard";
import GlassNavbar from "@/components/GlassNavbar";
import Footer from "@/components/Footer";
import providerSample from "@/assets/provider-sample.jpg";

// Mock data for providers
const mockProviders = [
  {
    id: "1",
    name: "Rajesh Kumar",
    photo: providerSample,
    location: "Shivaji Nagar",
    experience: "8 Years",
    visitingCharge: "150",
  },
  {
    id: "2",
    name: "Amit Patil",
    photo: providerSample,
    location: "Gandhi Chowk",
    experience: "12 Years",
    visitingCharge: "200",
  },
  {
    id: "3",
    name: "Suresh Jadhav",
    photo: providerSample,
    location: "Station Road",
    experience: "6 Years",
    visitingCharge: "150",
  },
  {
    id: "4",
    name: "Vijay Deshmukh",
    photo: providerSample,
    location: "Market Yard",
    experience: "10 Years",
    visitingCharge: "180",
  },
];

const CategoryListing = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const categoryName = category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
            {categoryName}s in Dharashiv
          </h1>
          <p className="text-lg md:text-xl text-white/90 fade-in-up" style={{ animationDelay: "0.1s" }}>
            धराशिवमधील {categoryName}
          </p>
        </div>
      </header>

      {/* Providers List */}
      <main ref={ref} className="container mx-auto px-4 pb-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProviders.map((provider, index) => (
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
      </main>

      <Footer />
    </div>
  );
};

export default CategoryListing;
