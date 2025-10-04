import { CTA } from '@/components/features/cta/CTA';
import { Hero } from '@/components/features/hero/Hero';
import { HowItWorks } from '@/components/features/how-it-works/HowItWorks';
import { ServicesOverview } from '@/components/features/services/ServicesOverview';
import { Testimonials } from '@/components/features/testimonials/Testimonials';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <HowItWorks />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
