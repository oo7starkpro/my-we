import { Header } from '@/components/Header';
import { ShopList } from '@/components/ShopList';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';

const Shops = () => {
  return (
    <div className="min-h-screen relative bg-transparent pt-20">
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-12">
          <div className="container mx-auto px-4">
            {/* Page Title */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-16 text-center"
            >
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-4 uppercase tracking-tighter">
                Curated Dining
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                Explore a handpicked selection of premium culinary experiences.
              </p>
            </motion.div>
            
            {/* ShopList with container */}
            <div className="max-w-7xl mx-auto">
              <ShopList />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Shops;