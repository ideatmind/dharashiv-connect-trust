import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { staggerChildren } from "@/lib/animations";
import electricianIcon from "@/assets/icon-electrician.png";
import plumberIcon from "@/assets/icon-plumber.png";
import carpenterIcon from "@/assets/icon-carpenter.png";
import painterIcon from "@/assets/icon-painter.png";
import acIcon from "@/assets/icon-ac.png";
import cleaningIcon from "@/assets/icon-cleaning.png";
import applianceIcon from "@/assets/icon-appliance.png";
import pestIcon from "@/assets/icon-pest.png";

const categories = [
  { name: "Electrician", nameHi: "इलेक्ट्रीशियन", icon: electricianIcon, path: "/category/electrician" },
  { name: "Plumber", nameHi: "प्लंबर", icon: plumberIcon, path: "/category/plumber" },
  { name: "Carpenter", nameHi: "सुतार", icon: carpenterIcon, path: "/category/carpenter" },
  { name: "Painter", nameHi: "पेंटर", icon: painterIcon, path: "/category/painter" },
  { name: "AC Repair", nameHi: "एसी दुरुस्ती", icon: acIcon, path: "/category/ac-repair" },
  { name: "Cleaning", nameHi: "साफसफाई", icon: cleaningIcon, path: "/category/cleaning" },
  { name: "Appliance Repair", nameHi: "उपकरण दुरुस्ती", icon: applianceIcon, path: "/category/appliance" },
  { name: "Pest Control", nameHi: "कीड नियंत्रण", icon: pestIcon, path: "/category/pest-control" },
];

const ServiceCategories = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.path}
              className={`group ${isVisible ? "fade-in-scale" : "opacity-0"}`}
              style={staggerChildren(index, 0.08)}
            >
              <div className="relative card-premium p-8 text-center h-full overflow-hidden">
                {/* Accent gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-500" />
                
                <div className="relative">
                  <div className="w-20 h-20 mx-auto mb-5 p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-[var(--shadow-accent)]">
                    <img
                      src={category.icon}
                      alt={`${category.name} icon`}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="font-bold text-foreground text-base tracking-tight mb-1 transition-colors duration-300 group-hover:text-accent">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.nameHi}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
