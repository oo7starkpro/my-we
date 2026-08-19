import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        {/* We can add more sections here later like 'Featured Spots' etc. */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;