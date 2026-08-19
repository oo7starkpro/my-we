import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Premium text reveal animation variants
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as any,
      },
    },
  };

  const titleText = "GU Cafeteria";

  return (
    <section 
        ref={containerRef}
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-transparent pt-20 perspective-[1000px]"
    >
      {/* Background Gradient Blob (Lusion style atmospheric glow) */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow" />
        <div className="absolute top-[30%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-purple-500/20 rounded-full blur-[100px] mix-blend-screen opacity-40 animate-pulse-slow delay-700" />
      </motion.div>

      <motion.div style={{ opacity, y: y2 }} className="container relative z-10 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-8 flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-sm font-medium text-gray-300 backdrop-blur-xl mb-4 hover:bg-white/[0.08] transition-colors cursor-default"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Welcome to the future of dining
          </motion.div>

          <motion.h1 
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-balance uppercase leading-[0.9] flex justify-center flex-wrap gap-x-4"
          >
            {titleText.split(" ").map((word, index) => (
                <span key={index} className="flex overflow-hidden pb-2">
                    {word.split("").map((char, charIndex) => (
                        <motion.span 
                            key={charIndex} 
                            variants={letter}
                            className="inline-block bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/40 transform-gpu"
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-[600px] text-gray-400/90 text-lg md:text-2xl font-light leading-relaxed text-balance mix-blend-difference"
          >
            Experience food ordering like never before. 
            <br className="hidden md:block"/> Immersive, visceral, and delicious.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 relative z-50 pointer-events-auto"
          >
            <Link 
                to="/shops" 
                className="group relative px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden transition-transform duration-500 hover:scale-105"
            >
              <span className="relative z-10">Start Ordering</span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-gray-200 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
            </Link>
            <Link 
                to="/how-it-works" 
                className="group px-8 py-4 rounded-full bg-transparent border border-white/20 text-white font-medium hover:bg-white/5 transition-all duration-300 backdrop-blur-sm hover:border-white/50"
            >
              Explore Menu 
              <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modern Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-white/50 font-medium">Scroll</span>
        <div className="w-[1px] h-16 bg-white/20 overflow-hidden">
            <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-1/2 bg-white/80"
            />
        </div>
      </motion.div>
    </section>
  );
};
