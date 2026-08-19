import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  ShoppingBag,
  Heart,
  Gift,
  Award,
  Coins,
  Bell,
  LogOut,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const protectedClick = (href: string) => {
    if (!isAuthenticated) {
      window.location.href = "http://localhost:3000/auth/google";
      return;
    }

    setIsOpen(false);
  };

  const guestMenuItems = [
    { icon: ShoppingBag, label: 'Orders', href: '/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: Gift, label: 'Gift Cards', href: '/gift-cards' },
  ];

  const authenticatedMenuItems = [
    { icon: User, label: 'My Profile', href: '/profile' },
    { icon: Coins, label: 'GU Coins Zone', href: '/gu-coins' },
    { icon: ShoppingBag, label: 'Orders', href: '/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: Ticket, label: 'Coupons', href: '/coupons' },
    { icon: Gift, label: 'Gift Cards', href: '/gift-cards' },
    { icon: Bell, label: 'Notifications', href: '/notifications' },
  ];

  const menuItems = isAuthenticated ? authenticatedMenuItems : guestMenuItems;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative text-white hover:bg-white/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="w-5 h-5" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-white/5">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-gray-300 mb-1">
                    Welcome back!
                  </p>
                  <p className="font-semibold truncate text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-300 mb-2">
                    You are not logged in
                  </p>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      window.location.href = "http://localhost:3000/auth/google";
                    }}
                    className="w-full py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg"
                  >
                    Sign in with Google
                  </button>
                </>
              )}
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={isAuthenticated ? item.href : "#"}
                    onClick={() => protectedClick(item.href)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors group"
                  >
                    <item.icon className="w-5 h-5 text-amber-400" />
                    <span className="font-medium text-white">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {isAuthenticated && (
              <div className="border-t border-white/10">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 w-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};