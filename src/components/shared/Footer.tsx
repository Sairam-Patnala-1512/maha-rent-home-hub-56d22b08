import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-hero text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                <span className="text-lg font-bold">म</span>
              </div>
              <div>
                <h3 className="font-semibold">Maharashtra Rental Housing</h3>
                <p className="text-xs opacity-80">MHADA PoC Portal</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              A government initiative to provide transparent and verified rental housing solutions for citizens of Maharashtra.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-80 hover:opacity-100 transition-opacity">
                  About Portal
                </Link>
              </li>
              <li>
                <Link to="/tenant/properties" className="opacity-80 hover:opacity-100 transition-opacity">
                  Search Properties
                </Link>
              </li>
              <li>
                <Link to="/landlord/register" className="opacity-80 hover:opacity-100 transition-opacity">
                  Register as Landlord
                </Link>
              </li>
              <li>
                <Link to="/grievance" className="opacity-80 hover:opacity-100 transition-opacity">
                  Grievance Portal
                </Link>
              </li>
              <li>
                <Link to="/faq" className="opacity-80 hover:opacity-100 transition-opacity">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="font-semibold mb-4">Government Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://mhada.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  MHADA Official
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://maharashtra.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  Maharashtra Gov
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://digilocker.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                >
                  DigiLocker
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">
                  MHADA Building, Bandra East,<br />
                  Mumbai - 400051, Maharashtra
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="opacity-80">1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span className="opacity-80">support@mhada.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm opacity-80">
            <p>© 2024 Government of Maharashtra. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:opacity-100 transition-opacity">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:opacity-100 transition-opacity">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
