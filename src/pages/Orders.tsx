import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, ShoppingBag, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Mock data generator if API fails (for demonstration)
const getMockOrders = () => [
  {
    id: 101,
    createdAt: new Date().toISOString(),
    status: 'COMPLETED',
    total: 350,
    items: [
      { id: 1, quantity: 2, price: 100, menuItem: { name: 'Chicken Biryani' } },
      { id: 2, quantity: 1, price: 150, menuItem: { name: 'Paneer Tikka' } }
    ]
  },
  {
    id: 102,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'PENDING',
    total: 120,
    items: [
      { id: 3, quantity: 1, price: 120, menuItem: { name: 'Veg Burger Combo' } }
    ]
  }
];

export default function MyOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("http://localhost:3000/orders", {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        // Fallback to mock data for UI demo
        setOrders(getMockOrders());
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'PENDING': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'CANCELLED': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 md:px-6 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
              <ShoppingBag className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Orders</h1>
              <p className="text-gray-400">Track and manage your dining history</p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-4" />
              <p className="text-gray-400">Loading your orders...</p>
            </div>
          ) : !orders.length ? (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">Looks like you haven't placed any orders yet. Start exploring our shops!</p>
              <Button asChild className="bg-white text-black hover:bg-gray-200">
                <a href="/shops">Start Ordering</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10"
                >
                  <div
                    className="p-6 cursor-pointer hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-lg text-white">Order #{order.id}</span>
                          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString(undefined, {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} • {new Date(order.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Total Amount</div>
                        <div className="text-xl font-bold text-white">₹{order.total}</div>
                      </div>
                      {expandedOrder === order.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/10 bg-black/20">
                          <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Order Items</h4>
                          <div className="space-y-3">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                <span className="text-white font-medium flex items-center gap-3">
                                  <span className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-xs text-amber-400 font-bold">
                                    {item.quantity}x
                                  </span>
                                  {item.menuItem.name}
                                </span>
                                <span className="text-gray-300">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                              Need Help?
                            </Button>
                            <Button className="bg-white text-black hover:bg-gray-200">
                              Reorder
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
