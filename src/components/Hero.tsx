import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-electrician.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional electrician at work in Dharashiv"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20 mx-auto">
        <div className="max-w-3xl mx-auto text-center fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Dharashiv's Most Trusted
            <span className="block mt-2 text-accent">Service Professionals</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 font-medium">
            धराशिवमधील सर्वात विश्वासार्ह सेवा व्यावसायिक
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-xl shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="What service do you need today?"
                  className="pl-10 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base"
                />
              </div>
              <Button className="btn-cta h-12 px-8 text-base rounded-lg">
                Search Services
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-white/80 text-sm mt-1">Verified Professionals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-white/80 text-sm mt-1">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-white/80 text-sm mt-1">Verified & Trusted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
