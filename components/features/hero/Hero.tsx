'use client';

import Link from 'next/link';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function Hero() {
  return (
    <section
      className='relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden bg-red-500'
      style={{
        backgroundImage: 'url(/images/livingroom.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-labelledby='hero-heading'
    >
      {/* Gradient Background */}
      <div className='absolute inset-0 z-0 bg-gradient-to-br from-orange-peel/5 via-background/10 to-orange-peel/5' />

      <UnifiedContainer size='xl' padding='lg' className='relative z-10'>
        <div className='text-left space-y-8'>
          {/* Main Headline */}
          <div className='space-y-4'>
            <h1 id='hero-heading' className='heading-responsive text-oxford-blue'>
              Feeling Overwhelmed by Mess?
              <span
                className='block text-orange-peel drop-shadow-lg'
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
              >
                Reliable cleaning, Transparent pricing.
              </span>
            </h1>
          </div>

          {/* CTA Button */}
          <div className='flex justify-center md:justify-end' role='group' aria-label='Main action'>
            <Link href='/book'>
              <Button
                size='lg'
                className='bg-oxford-blue hover:bg-oxford-blue-600 text-seasalt px-8 py-4 text-lg'
                aria-describedby='hero-description'
              >
                Explore Services
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
                <div className='text-lg font-bold text-oxford-blue'>✓</div>
                <div className='text-xs text-oxford-blue/90'>Fully Insured</div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>✓</div>
                <div className='text-xs text-oxford-blue/90'>Background Checked</div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>✓</div>
                <div className='text-xs text-oxford-blue/90'>Eco-Friendly</div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>✓</div>
                <div className='text-xs text-oxford-blue/90'>Satisfaction Guaranteed</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
