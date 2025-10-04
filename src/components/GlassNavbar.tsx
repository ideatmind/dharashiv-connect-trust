import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GlassNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  if (isHomePage) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="hover:bg-accent/10"
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
