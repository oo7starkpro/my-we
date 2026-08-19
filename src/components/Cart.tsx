import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, Truck, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Checkout } from './Checkout';
import RequireAuth from './RequireAuth';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

axios.defaults.withCredentials = true;

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, updateQuantity, removeFromCart, totalAmount, orderType, setOrderType, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = orderType === 'delivery' ? 30 : 0;
  const finalAmount = totalAmount + deliveryFee;

  const handleCheckout = async () => {
    if (!user) {
      return alert("Please login first");
    }

    if (items.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Add items to your cart before checking out",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        userId: user?.id,
        items: items.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          price: item.menuItem.price,
          shopName: item.shopName,
        })),
        totalAmount: finalAmount,
        orderType,
        deliveryFee,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const orderId = `ORD-${Date.now()}`;
      const order = { ...orderData, id: orderId };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      const res = await axios.post("http://localhost:3000/payments/checkout", {
        orderId: order.id,
      }, { withCredentials: true });
      
      window.location.href = res.data.url;
    } catch (error) {
      console.error('Checkout failed:', error);
      toast({
        title: "Checkout Failed",
        description: "Failed to initiate checkout. Please try again.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handlePaymentSuccess = async (paymentDetails: any) => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        userId: user?.id,
        items: items.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity,
          price: item.menuItem.price,
          shopName: item.shopName,
        })),
        totalAmount: finalAmount,
        orderType,
        deliveryFee,
        paymentDetails,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const orderId = `ORD-${Date.now()}`;
      
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push({ ...orderData, id: orderId });
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Your order #${orderId} has been confirmed`,
      });

      clearCart();
      setShowCheckout(false);
      onClose();
    } catch (error) {
      console.error('Order creation failed:', error);
      toast({
        title: "Order Failed",
        description: "Failed to create order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Cart panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white/10 backdrop-blur-2xl border-l border-white/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Your Cart</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            {showCheckout ? (
              <Checkout 
                amount={finalAmount} 
                onBack={() => setShowCheckout(false)}
                onSuccess={handlePaymentSuccess}
                isProcessing={isProcessing}
              />
            ) : (
              <>
                {/* Order type toggle */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex gap-2 p-1 bg-white/5 rounded-xl">
                    <button
                      onClick={() => setOrderType('pickup')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                        orderType === 'pickup'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <MapPin className="w-4 h-4" />
                      Pickup
                    </button>
                    <button
                      onClick={() => setOrderType('delivery')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                        orderType === 'delivery'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Truck className="w-4 h-4" />
                      Delivery
                    </button>
                  </div>
                  {orderType === 'delivery' && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-sm text-gray-300 mt-3 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Available for hostel students • ₹30 delivery fee
                    </motion.p>
                  )}
                </div>

                {/* Cart items */}
                <div className="flex-1 overflow-y-auto p-4">
                  {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <MapPin className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Your cart is empty</h3>
                      <p className="text-sm text-gray-300">
                        Add some delicious items from our shops!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.menuItem.id}
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex gap-3 p-3 rounded-xl bg-white/10 border border-white/20"
                        >
                          <img
                            src={item.menuItem.image}
                            alt={item.menuItem.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-sm line-clamp-1">
                              {item.menuItem.name}
                            </h4>
                            <p className="text-xs text-gray-400">{item.shopName}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-semibold text-amber-400">
                                ₹{item.menuItem.price * item.quantity}
                              </span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => updateQuantity(item.menuItem.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center text-sm font-medium text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                                  className="w-7 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.menuItem.id)}
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors ml-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                  <div className="p-6 border-t border-white/10 bg-white/5 space-y-3">
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Subtotal</span>
                        <span className="text-white">₹{totalAmount}</span>
                      </div>
                      {orderType === 'delivery' && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Delivery Fee</span>
                          <span className="text-white">₹{deliveryFee}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-white/10">
                        <span className="text-white">Total</span>
                        <span className="text-amber-400">₹{finalAmount}</span>
                      </div>
                    </div>
                    
                    <RequireAuth>
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold shadow-lg"
                        onClick={handleCheckout}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </RequireAuth>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};