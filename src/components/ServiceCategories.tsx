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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.path}
              className={`group ${isVisible ? "fade-in-scale" : "opacity-0"}`}
              style={staggerChildren(index, 0.08)}
            >
              <div className="card-premium p-8 text-center h-full group-hover:border-accent/20 transition-all duration-500">
                {/* Icon with parallax-like effect */}
                <div className="mb-6 flex justify-center transform transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={category.icon}
                      alt={`${category.name} icon`}
                      className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10"
                    />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 rounded-full blur-xl transition-all duration-500 -z-10" />
                  </div>
                </div>
                
                <h3 className="font-bold text-foreground text-lg md:text-xl mb-2 tracking-tight">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  {category.nameHi}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
