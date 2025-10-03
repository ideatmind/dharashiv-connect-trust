import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProviderCard from "@/components/ProviderCard";
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

  const categoryName = category
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleProviderClick = (providerId: string) => {
    navigate(`/provider/${providerId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">
                {categoryName}s in Dharashiv
              </h1>
              <p className="text-sm text-muted-foreground">
                धराशिवमधील {categoryName}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Providers List */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4">
          {mockProviders.map((provider, index) => (
            <div
              key={provider.id}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProviderCard
                {...provider}
                onClick={() => handleProviderClick(provider.id)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryListing;
