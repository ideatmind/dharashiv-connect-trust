import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GlassNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHomePage) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-[var(--shadow-soft)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className={`transition-all duration-300 ${
              isScrolled ? "hover:bg-primary/5" : "hover:bg-white/10"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <button
            onClick={() => navigate("/")}
            className="text-xl font-bold tracking-tight hover:text-accent transition-colors duration-300"
          >
            Dharashiv Seva
          </button>

          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </div>
    </nav>
  );
};

export default GlassNavbar;
