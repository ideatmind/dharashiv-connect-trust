import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [animatedWords, setAnimatedWords] = useState<boolean[]>([]);
  const navigate = useNavigate();
  
  const headline = ["Dharashiv's", "Most", "Trusted"];
  const accentWord = "Service Professionals";

  useEffect(() => {
    // Animate headline words sequentially
    headline.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedWords(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 150);
    });
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Convert search query to URL-friendly format
      const categorySlug = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
      navigate(`/category/${categorySlug}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Video Simulation (using gradient animation) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          {/* Animated overlay for depth */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 50% 50%, hsl(211 100% 50% / 0.15) 0%, transparent 50%)",
                animation: "pulse 4s ease-in-out infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {headline.map((word, index) => (
              <span
                key={index}
                className={`inline-block mr-3 slide-in-word ${
                  animatedWords[index] ? "opacity-100" : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {word}
              </span>
            ))}
            <span
              className="block mt-3 bg-gradient-to-r from-accent via-accent-glow to-accent bg-clip-text text-transparent slide-in-word"
              style={{ animationDelay: "0.45s" }}
            >
              {accentWord}
            </span>
          </h1>
          
          <p
            className="text-xl md:text-2xl text-white/90 mb-12 font-medium fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            धराशिवमधील सर्वात विश्वासार्ह सेवा व्यावसायिक
          </p>

          {/* Premium Search Bar */}
          <div
            className="max-w-3xl mx-auto fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-2xl shadow-[var(--shadow-strong)]">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search electrician, plumber, carpenter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-12 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14 text-base bg-transparent"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="btn-premium h-14 px-10 text-base rounded-xl font-semibold"
              >
                Search Services
              </Button>
            </div>
          </div>

          {/* Trust Indicators with stagger animation */}
          <div
            className="mt-16 flex flex-wrap justify-center gap-12 text-white fade-in-up"
            style={{ animationDelay: "1s" }}
          >
            {[
              { label: "Verified Professionals", value: "500+" },
              { label: "Happy Customers", value: "10,000+" },
              { label: "Verified & Trusted", value: "100%" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center fade-in-scale"
                style={{ animationDelay: `${1 + index * 0.15}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
