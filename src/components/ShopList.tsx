import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowLeft, Star, Clock, MapPin } from 'lucide-react';
import { shops } from '@/data/shops';
import { Shop } from '@/types';
import { ShopCard } from './ShopCard';
import { MenuItemCard } from './MenuItemCard';
import { Button } from '@/components/ui/button';

export const ShopList = () => {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = selectedShop
    ? ['all', ...new Set(selectedShop.menu.map((item) => item.category))]
    : [];

  const filteredMenu = selectedShop?.menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="shops" className="py-20 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {!selectedShop ? (
            <motion.div
              key="shops"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              {/* Section header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-amber-400 mb-6 backdrop-blur-md"
                >
                  Campus Dining
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
                >
                  Explore Eateries
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
                >
                  Discover a variety of culinary delights right here on campus. From quick bites to full meals.
                </motion.p>
              </div>

              {/* Shop grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {shops.map((shop, index) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div
                      onClick={() => setSelectedShop(shop)}
                      className="cursor-pointer bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500 shadow-card hover:shadow-glow"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={shop.image}
                          alt={shop.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{shop.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <MapPin className="w-4 h-4 text-amber-500" />
                              <span>Campus Center</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-white font-bold text-sm">4.8</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4" />
                            <span>10-15 min</span>
                          </div>
                          <div className="text-sm font-medium px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                            Open Now
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-6">
                          {shop.description}
                        </p>
                        <Button className="w-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300">
                          View Menu
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back button */}
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedShop(null);
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mb-8 group text-gray-400 hover:text-white hover:bg-white/5"
              >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Shops
              </Button>

              {/* Shop header */}
              <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
                <div className="h-[40vh] md:h-[50vh]">
                  <img
                    src={selectedShop.image}
                    alt={selectedShop.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                  >
                    {selectedShop.name}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-300 max-w-2xl"
                  >
                    {selectedShop.description}
                  </motion.p>
                </div>
              </div>

              {/* Search and filters */}
              <div className="sticky top-24 z-30 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-10 shadow-xl">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      placeholder="Search menu items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-white/30 focus:bg-white/10 focus:outline-none focus:ring-0 transition-all text-white placeholder:text-gray-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        <X className="w-5 h-5 text-gray-500 hover:text-white transition-colors" />
                      </button>
                    )}
                  </div>

                  {/* Category filters */}
                  <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 items-center no-scrollbar">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                            ? 'bg-white text-black shadow-glow font-bold'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                          }`}
                      >
                        {category === 'all' ? 'All Items' : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Menu grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMenu?.map((item, index) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    shopId={selectedShop.id}
                    shopName={selectedShop.name}
                    index={index}
                  />
                ))}
              </div>

              {filteredMenu?.length === 0 && (
                <div className="text-center py-20">
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 max-w-md mx-auto">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
                    <p className="text-gray-400">Try adjusting your search or category filter.</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};