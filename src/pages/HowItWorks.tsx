import { Header } from '@/components/Header';
import { HowItWorks as HowItWorksSection } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';

const HowItWorks = () => {
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/galgotias-building.jpg" 
          alt="Galgotias University Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <HowItWorksSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HowItWorks;