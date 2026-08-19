import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, ShoppingBag, CreditCard, Bell, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const steps = [
  {
    icon: Search,
    title: 'Browse & Select',
    description: 'Explore curated menus from campus spots and pick your favorite dishes.',
  },
  {
    icon: ShoppingBag,
    title: 'Add to Cart',
    description: 'Customize your order with extras and add items to your cart seamlessly.',
  },
  {
    icon: CreditCard,
    title: 'Pay Securely',
    description: 'Complete your payment instantly using UPI, cards, or your campus wallet.',
  },
  {
    icon: Bell,
    title: 'Get Notified',
    description: 'Receive real-time, push-style updates on your order preparation status.',
  },
  {
    icon: CheckCircle,
    title: 'Pick Up or Receive',
    description: 'Collect your ready order at the counter or get it delivered to your hostel.',
  },
];

const StepCard = ({ step, index }: { step: any, index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["0 1", "1.2 1"] // starts when top of card hits bottom of viewport
    });

    const yParams = index % 2 === 0 ? [100, -50] : [150, -100];
    const y = useTransform(scrollYProgress, [0, 1], yParams);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    const isEven = index % 2 === 0;

    return (
        <motion.div 
            ref={cardRef}
            style={{ y, opacity, scale }}
            className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-20 w-full mb-32 group`}
        >
            {/* Visual Side */}
            <div className="flex-1 w-full relative perspective-[1000px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-3xl transform rotate-3 scale-105 group-hover:rotate-6 transition-transform duration-700" />
                <div className="relative aspect-[4/3] rounded-3xl bg-black/40 backdrop-blur-md border border-white/10 overflow-hidden flex items-center justify-center transform-gpu transition-all duration-700 group-hover:bg-white/[0.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <step.icon className="w-24 h-24 text-white/20 group-hover:text-white transition-colors duration-500 group-hover:scale-110 transform" />
                    
                    {/* Giant background number */}
                    <span className="absolute -bottom-10 -right-4 text-[200px] font-black leading-none text-white/[0.03] select-none pointer-events-none group-hover:text-white/[0.06] transition-colors duration-500">
                        0{index + 1}
                    </span>
                </div>
            </div>

            {/* Text Side */}
            <div className={`flex-1 w-full flex flex-col ${isEven ? 'md:items-start text-left' : 'md:items-end md:text-right text-left'}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-6 uppercase tracking-widest">
                    Step 0{index + 1}
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase tracking-tighter mix-blend-difference">{step.title}</h3>
                <p className="text-xl text-gray-400/80 leading-relaxed max-w-md font-light">
                    {step.description}
                </p>
                <div className={`mt-8 w-12 h-[2px] bg-white/20 group-hover:w-24 group-hover:bg-white transition-all duration-500`} />
            </div>
        </motion.div>
    );
};

export const HowItWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section ref={containerRef} id="how-it-works" className="py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center mb-40">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter uppercase inline-block pb-4"
          >
            The Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-400 max-w-2xl mx-auto text-xl md:text-2xl font-light mt-4"
          >
            A seamless experience engineered for ultimate speed & satisfaction.
          </motion.p>
        </div>

        <div className="relative mt-20 flex flex-col w-full">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />
            
            {steps.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} />
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-32 text-center"
        >
          <Link 
            to="/shops" 
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black font-bold uppercase tracking-widest overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
          >
            <span className="relative z-10">Experience Now</span>
            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
