import { motion } from 'framer-motion';
import { Plus, Minus, Clock, Leaf } from 'lucide-react';
import { MenuItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
  shopId: string;
  shopName: string;
  index: number;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  shopId,
  shopName,
  index,
}) => {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group flex gap-4 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:border-amber-400/50 hover:shadow-xl hover:bg-white/15 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {item.isVeg && (
          <div className="absolute top-2 left-2 w-5 h-5 rounded bg-green-500 shadow-lg flex items-center justify-center">
            <Leaf className="w-3 h-3 text-white" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h4 className="font-semibold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.name}
          </h4>
          <p className="text-sm text-gray-300 mt-1 line-clamp-2">
            {item.description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-bold text-amber-400 text-lg">₹{item.price}</span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {item.preparationTime} min
            </span>
          </div>
        </div>

        {/* Add to cart */}
        <div className="mt-3 flex justify-end">
          {quantity === 0 ? (
            <Button
              variant="warm"
              size="sm"
              onClick={() => addToCart(item, shopId, shopName)}
              disabled={!item.isAvailable}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg p-1 shadow-lg">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 text-white"
                onClick={() => updateQuantity(item.id, quantity - 1)}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-bold text-white">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-white/20 text-white"
                onClick={() => addToCart(item, shopId, shopName)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};