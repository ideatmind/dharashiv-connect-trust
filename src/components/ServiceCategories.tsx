import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
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
  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our Services
          </h2>
          <p className="text-muted-foreground text-lg">
            आमच्या सेवा - Choose from verified local professionals
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.path}
              className="fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="p-6 text-center transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-2 cursor-pointer border-border bg-card">
                <div className="mb-4 flex justify-center">
                  <img
                    src={category.icon}
                    alt={`${category.name} icon`}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>
                <h3 className="font-semibold text-foreground text-base md:text-lg mb-1">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.nameHi}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
