'use client';

import Link from 'next/link';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';

import { LogoBar } from './LogoBar';

export function Hero() {
  return (
    <section
      className='relative min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden'
      style={{
        backgroundImage: 'url(/images/livingroom.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      aria-labelledby='hero-heading'
    >
      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-0' />
      <UnifiedContainer size='2xl' padding='lg' className='relative z-10'>
        <div className='text-left space-y-8 max-w-4xl'>
          {/* Main Headline */}
          <div className='space-y-6'>
            <h1
              id='hero-heading'
              className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg'
            >
              Professional Cleaning Services in Frankfurt
              <span
                className='block text-orange-400 mt-2'
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                Transparent pricing
              </span>
            </h1>
            <p className='text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed'>
              Experience premium cleaning services with guaranteed satisfaction. Our certified
              professionals deliver exceptional results every time.
            </p>
          </div>

          {/* CTA Button */}
          <div
            className='flex flex-col sm:flex-row gap-4 items-start sm:items-center'
            role='group'
            aria-label='Main action'
          >
            <Link href='/book'>
              <Button
                size='lg'
                className='bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105'
                aria-describedby='hero-description'
              >
                Book Now - Get Instant Quote
              </Button>
            </Link>
            <Link href='/services'>
              <Button
                variant='outline'
                size='lg'
                className='bg-white/10 hover:bg-white/20 text-white border-white/30 px-8 py-4 text-lg font-semibold backdrop-blur-sm'
              >
                View Services
              </Button>
            </Link>
          </div>

          {/* Trust Section */}
          <div className='mt-12'>
            <div className='text-center mb-8'>
              <p className='text-sm text-white/90 font-medium tracking-wide uppercase mb-3'>
                Trusted & Certified
              </p>
              <div className='w-20 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent mx-auto' />
            </div>

            <div className='flex justify-center items-center'>
              <LogoBar />
            </div>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
