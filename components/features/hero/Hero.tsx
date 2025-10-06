'use client';

import Link from 'next/link';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Hero() {
  return (
    <section
      className='relative min-h-[70vh] md:min-h-[80vh] flex items-center oveflow-hidden'
      style={{
        backgroundImage: 'url(/images/livingroom.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-labelledby='hero-heading'
    >
      <UnifiedContainer size='2xl' padding='lg' className='relative z-5'>
        <div className='text-left space-y-10'>
          {/* Main Headline */}
          <div className='space-y-4'>
            <h1 id='hero-heading' className='heading-responsive text-oxford-blue-400'>
              Professional Cleaning Services in Frankfurt
              <span
                className='block text-orange-peel drop-shadow-lg'
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
              >
                Transparent pricing
              </span>
            </h1>
          </div>

          {/* CTA Button */}
          <div className='flex justify-center md:justify-end' role='group' aria-label='Main action'>
            <Link href='/book'>
              <Button
                size='lg'
                className='bg-oxford-blue-500 hover:bg-blue-500 hover:text-white text-orange-400 px-8 py-4 text-xl border-secondary-foreground'
                aria-describedby='hero-description'
              >
                Discover Services
              </Button>
            </Link>
          </div>

          {/* Trust Indicators (service-oriented) */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12'>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-s text-black/90'>Liability Insurance</div>
                <div className='text-lg font-bold text-black'> ✅ </div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-s text-black/90'>Background Checked Professionals</div>
                <div className='text-lg font-bold text-black'> ✅ </div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-s text-black/90'>Payment after service</div>
                <div className='text-lg font-bold text-black'> ✅ </div>
              </CardContent>
            </Card>
            <Card
              variant='subtle'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-s text-black/90'>Satisfaction Guaranteed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
