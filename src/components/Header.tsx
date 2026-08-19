import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Cart } from './Cart';
import { ProfileMenu } from './ProfileMenu';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  // TODO: Replace with actual coins data from context/API
  const guCoins = 250;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}
      >
        <div className="container mx-auto px-4">
          <div className={`mx-auto rounded-full transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-md border border-white/10 shadow-lg px-6' : 'bg-transparent px-0'}`}>
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-2xl font-bold text-white tracking-tighter group-hover:opacity-80 transition-opacity">
                  GUC
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-8">
                {['Shops', 'How it Works'].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
                  </Link>
                ))}
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {/* GU Coins */}
                <Link
                  to="/coins"
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  <Coins className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">{guCoins}</span>
                </Link>

                {/* Profile */}
                <ProfileMenu />

                {/* Cart */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-white hover:bg-white/10 hover:text-white rounded-full w-10 h-10"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-white text-black text-[10px] flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>

                {/* Mobile Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-24 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 overflow-hidden md:hidden"
              >
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/shops"
                    className="px-4 py-3 rounded-xl hover:bg-white/5 text-gray-200 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shops
                  </Link>
                  <Link
                    to="/how-it-works"
                    className="px-4 py-3 rounded-xl hover:bg-white/5 text-gray-200 hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    How it Works
                  </Link>
                  <Link
                    to="/coins"
                    className="px-4 py-3 rounded-xl hover:bg-white/5 text-gray-200 hover:text-white transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Coins className="w-4 h-4 text-yellow-400" />
                    <span>{guCoins} Coins</span>
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};
