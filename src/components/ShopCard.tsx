import { motion } from 'framer-motion';
import { Star, Clock, ChevronRight } from 'lucide-react';
import { Shop } from '@/types';

interface ShopCardProps {
  shop: Shop;
  onClick: () => void;
  index: number;
}

export const ShopCard: React.FC<ShopCardProps> = ({ shop, onClick, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={onClick}
      className="group cursor-pointer bg-black/40 backdrop-blur-xl rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 border border-white/5 hover:border-white/20 hover:-translate-y-2 relative"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        
        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10 ${
            shop.isOpen 
              ? 'bg-green-500/20 text-green-400' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            <span className={`w-2 h-2 rounded-full ${shop.isOpen ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            {shop.isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
          <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-bold text-white">{shop.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-2xl text-white group-hover:text-amber-400 transition-colors tracking-tight">
              {shop.name}
            </h3>
            <p className="text-sm text-gray-400 mt-2 line-clamp-2 font-light leading-relaxed">
              {shop.description}
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0 transform -rotate-45 group-hover:rotate-0">
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>{shop.deliveryTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {shop.cuisine.slice(0, 3).map((tag, idx) => (
            <span
              key={tag}
              className={`px-3 py-1 rounded-full border text-xs font-medium backdrop-blur-md transition-colors ${idx === 0 ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/5 border-white/10 text-gray-300'}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};