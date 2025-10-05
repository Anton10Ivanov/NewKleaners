'use client';

import Link from 'next/link';

import { Search } from 'lucide-react';

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
              <span className='block text-orange-peel'>We Can Help</span>
            </h1>
          </div>

          {/* CTA Button */}
          <div
            className='flex justify-center md:justify-start'
            role='group'
            aria-label='Main action'
          >
            <Link href='/book'>
              <Button
                size='lg'
                className='btn-primary-enhanced px-8 py-4 text-lg'
                aria-describedby='hero-description'
              >
                <Search className='w-5 h-5 mr-2' aria-hidden='true' />
                Book Cleaning Service
              </Button>
            </Link>
          </div>

          {/* Trust Indicators (enhanced contrast) */}
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12'>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>500+</div>
                <div className='text-xs text-oxford-blue/70'>Verified Providers</div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>4.8/5</div>
                <div className='text-xs text-oxford-blue/70'>Average Rating</div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>100%</div>
                <div className='text-xs text-oxford-blue/70'>Insured & Bonded</div>
              </CardContent>
            </Card>
            <Card
              variant='elevated'
              className='text-center p-4 bg-background/90 backdrop-blur-sm border border-primary/20'
            >
              <CardContent className='p-0'>
                <div className='text-lg font-bold text-oxford-blue'>24/7</div>
                <div className='text-xs text-oxford-blue/70'>Customer Support</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
