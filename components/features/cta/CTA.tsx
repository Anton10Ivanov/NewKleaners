'use client';

import Link from 'next/link';

import { ArrowRight, CheckCircle, Shield, Clock } from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


export function CTA() {
  return (
    <section className='py-20 bg-gradient-to-br from-oxford-blue to-oxford-blue-800'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='text-center space-y-8'>
          <div className='space-y-4'>
            <h2 className='heading-2 text-seasalt'>Ready to Experience Professional Cleaning?</h2>
            <p className='body-large text-seasalt/80 max-w-2xl mx-auto'>
              Join thousands of satisfied customers who trust Kleaners for their cleaning needs.
              Book your first service today and see the difference professional cleaning makes.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/services'>
              <Button
                size='lg'
                className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 text-lg'
              >
                Book Now
                <ArrowRight className='w-5 h-5 ml-2' />
              </Button>
            </Link>
            <Link href='/providers'>
              <Button
                variant='outline'
                size='lg'
                className='border-seasalt text-seasalt hover:bg-seasalt hover:text-oxford-blue px-8 py-4 text-lg'
              >
                Become a Provider
              </Button>
            </Link>
          </div>

          {/* Benefits Grid */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16'>
            <Card className='bg-white/10 backdrop-blur-sm border-white/20 text-seasalt'>
              <CardContent className='p-6 text-center'>
                <div className='w-12 h-12 bg-orange-peel/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Shield className='w-6 h-6 text-orange-peel' />
                </div>
                <h3 className='font-semibold text-lg mb-2'>100% Insured</h3>
                <p className='text-sm text-seasalt/80'>
                  All our providers are fully insured and bonded for your peace of mind.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-white/10 backdrop-blur-sm border-white/20 text-seasalt'>
              <CardContent className='p-6 text-center'>
                <div className='w-12 h-12 bg-orange-peel/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <CheckCircle className='w-6 h-6 text-orange-peel' />
                </div>
                <h3 className='font-semibold text-lg mb-2'>Verified Providers</h3>
                <p className='text-sm text-seasalt/80'>
                  Every provider is background-checked and verified for quality and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className='bg-white/10 backdrop-blur-sm border-white/20 text-seasalt'>
              <CardContent className='p-6 text-center'>
                <div className='w-12 h-12 bg-orange-peel/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Clock className='w-6 h-6 text-orange-peel' />
                </div>
                <h3 className='font-semibold text-lg mb-2'>24/7 Support</h3>
                <p className='text-sm text-seasalt/80'>
                  Our customer support team is available around the clock to help you.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className='mt-12 pt-8 border-t border-seasalt/20'>
            <div className='flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-seasalt'>10,000+</div>
                <div className='text-sm text-seasalt/80'>Happy Customers</div>
              </div>
              <div className='w-px h-8 bg-seasalt/20 hidden md:block' />
              <div className='text-center'>
                <div className='text-2xl font-bold text-seasalt'>500+</div>
                <div className='text-sm text-seasalt/80'>Verified Providers</div>
              </div>
              <div className='w-px h-8 bg-seasalt/20 hidden md:block' />
              <div className='text-center'>
                <div className='text-2xl font-bold text-seasalt'>50,000+</div>
                <div className='text-sm text-seasalt/80'>Services Completed</div>
              </div>
            </div>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
