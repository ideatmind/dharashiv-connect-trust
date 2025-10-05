import { Home, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                Dharashiv <span className="text-yellow-100">Seva</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Connecting Dharashiv residents with verified, trusted local service professionals. 
              Your one-stop solution for all home services.
            </p>
            <p className="text-primary-foreground/60 text-sm">धाराशिवमधील सर्वात विश्वासार्ह सेवा व्यावसायिक</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/electrician" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Electricians
                </Link>
              </li>
              <li>
                <Link to="/category/plumber" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Plumbers
                </Link>
              </li>
              <li>
                <Link to="/category/carpenter" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Carpenters
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-primary-foreground/80">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-accent" />
                <span className="text-sm">Dharashiv, Maharashtra</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm">+918208646135</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-sm">contact@dharashivseva.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex items-center justify-between">
          <p className="text-primary-foreground/60 text-sm">
            © {new Date().getFullYear()} Dharashiv Seva. All rights reserved.
          </p>
          <Link to="/admin" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>;
};
export default Footer;