import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-warm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">GU</span>
              </div>
              <div>
                <h3 className="font-bold text-secondary-foreground">GU Cafeteria</h3>
                <p className="text-xs text-secondary-foreground/60">Order • Track • Enjoy</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              Your favorite campus food, just a tap away. Pre-order and skip the queue!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-secondary-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#shops" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  All Shops
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                  
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-secondary-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-secondary-foreground/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Galgotias University, Greater Noida, UP 201310</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 9339441748</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>shaurya.singh13655@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold mb-4 text-secondary-foreground">Operating Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Main Cafeteria: 7 AM - 10 PM</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-secondary-foreground/70">
                <Clock className="w-4 h-4 shrink-0" />
                <span>Night Owl Cafe: 24/7</span>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-xs text-primary font-medium">
                🌙 Hostel delivery available after 10 PM
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-secondary-foreground/10 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} GU Cafeteria. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
