import { CTA } from '@/components/features/cta/CTA';
import { Hero } from '@/components/features/hero/Hero';
import { HowItWorks } from '@/components/features/how-it-works/HowItWorks';
import { ServicesOverview } from '@/components/features/services/ServicesOverview';
import { Testimonials } from '@/components/features/testimonials/Testimonials';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        <Hero />
        <Separator className='my-12 md:my-16' />
        <ServicesOverview />
        <Separator className='my-12 md:my-16' />
        <HowItWorks />
        <Separator className='my-12 md:my-16' />
        <Testimonials />
        <Separator className='my-12 md:my-16' />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
