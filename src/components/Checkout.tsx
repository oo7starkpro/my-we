import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

interface CheckoutProps {
  amount: number;
  onBack: () => void;
  onSuccess: () => void;
}

type PaymentMethod = 'card' | 'upi' | 'wallet';

export const Checkout: React.FC<CheckoutProps> = ({ amount, onBack, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { orderType } = useCart();

  const paymentMethods = [
    { id: 'upi' as const, label: 'UPI', icon: Wallet, desc: 'Pay via GPay, PhonePe, Paytm' },
    { id: 'card' as const, label: 'Card', icon: CreditCard, desc: 'Credit or Debit Card' },
    { id: 'wallet' as const, label: 'Campus Wallet', icon: Building2, desc: 'Use your campus balance' },
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    
    toast.success('Payment successful! Your order has been placed.');
    
    // Delay before closing
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </motion.div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h3>
        <p className="text-muted-foreground mb-4">
          {orderType === 'pickup' 
            ? "We'll notify you when your order is ready for pickup."
            : "Your order will be delivered to your hostel soon."
          }
        </p>
        <div className="bg-muted rounded-xl p-4 w-full max-w-xs">
          <p className="text-sm text-muted-foreground">Order ID</p>
          <p className="font-mono font-bold text-foreground">#GU{Date.now().toString().slice(-6)}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-2">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cart
        </Button>
        <h3 className="text-lg font-bold text-foreground">Payment</h3>
        <p className="text-sm text-muted-foreground">Choose your payment method</p>
      </div>

      {/* Payment methods */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setPaymentMethod(method.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                paymentMethod === method.id
                  ? 'border-primary bg-primary/5 shadow-soft'
                  : 'border-border bg-card hover:border-primary/50'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                paymentMethod === method.id ? 'bg-primary/20' : 'bg-muted'
              }`}>
                <method.icon className={`w-6 h-6 ${
                  paymentMethod === method.id ? 'text-primary' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <p className={`font-semibold ${
                  paymentMethod === method.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {method.label}
                </p>
                <p className="text-sm text-muted-foreground">{method.desc}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMethod === method.id ? 'border-primary' : 'border-muted-foreground'
              }`}>
                {paymentMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-3 h-3 rounded-full bg-primary"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* UPI Input */}
        {paymentMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4"
          >
            <label className="block text-sm font-medium text-foreground mb-2">
              Enter UPI ID
            </label>
            <input
              type="text"
              placeholder="yourname@upi"
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
            />
          </motion.div>
        )}

        {/* Card Input */}
        {paymentMethod === 'card' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-4 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Expiry
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Pay button */}
      <div className="p-6 border-t border-border bg-card">
        <Button
          variant="hero"
          size="lg"
          className="w-full"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>Pay ₹{amount}</>
          )}
        </Button>
        <p className="text-xs text-center text-muted-foreground mt-3">
          Secured by 256-bit encryption
        </p>
      </div>
    </div>
  );
};
