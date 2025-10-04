'use client';

import Link from 'next/link';

import { Search, Star, Users, Shield, Clock } from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';


export function Hero() {
  return (
    <section className='bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20 md:py-32'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='text-center space-y-8'>
          {/* Main Headline */}
          <div className='space-y-4'>
            <h1 className='heading-responsive text-oxford-blue'>
              Professional Cleaning Services
              <span className='block text-orange-peel'>in Frankfurt</span>
            </h1>
            <p className='body-responsive text-oxford-blue-600 max-w-3xl mx-auto'>
              Connect with verified cleaning professionals for residential, commercial, and
              specialized cleaning services. Book with confidence, pay securely, and enjoy spotless
              results.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/book'>
              <Button
                size='lg'
                className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 text-lg'
              >
                <Search className='w-5 h-5 mr-2' />
                Book Cleaning Service
              </Button>
            </Link>
            <Link href='/providers'>
              <Button
                variant='outline'
                size='lg'
                className='border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt px-8 py-4 text-lg'
              >
                Become a Provider
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mt-16'>
            <Card className='text-center p-6 bg-white/80 backdrop-blur-sm border-orange-peel/20'>
              <CardContent className='p-0'>
                <div className='flex justify-center mb-3'>
                  <div className='w-12 h-12 bg-orange-peel/10 rounded-full flex items-center justify-center'>
                    <Users className='w-6 h-6 text-orange-peel' />
                  </div>
                </div>
                <div className='text-2xl font-bold text-oxford-blue'>500+</div>
                <div className='text-sm text-oxford-blue-600'>Verified Providers</div>
              </CardContent>
            </Card>

            <Card className='text-center p-6 bg-white/80 backdrop-blur-sm border-orange-peel/20'>
              <CardContent className='p-0'>
                <div className='flex justify-center mb-3'>
                  <div className='w-12 h-12 bg-orange-peel/10 rounded-full flex items-center justify-center'>
                    <Star className='w-6 h-6 text-orange-peel' />
                  </div>
                </div>
                <div className='text-2xl font-bold text-oxford-blue'>4.8/5</div>
                <div className='text-sm text-oxford-blue-600'>Average Rating</div>
              </CardContent>
            </Card>

            <Card className='text-center p-6 bg-white/80 backdrop-blur-sm border-orange-peel/20'>
              <CardContent className='p-0'>
                <div className='flex justify-center mb-3'>
                  <div className='w-12 h-12 bg-orange-peel/10 rounded-full flex items-center justify-center'>
                    <Shield className='w-6 h-6 text-orange-peel' />
                  </div>
                </div>
                <div className='text-2xl font-bold text-oxford-blue'>100%</div>
                <div className='text-sm text-oxford-blue-600'>Insured & Bonded</div>
              </CardContent>
            </Card>

            <Card className='text-center p-6 bg-white/80 backdrop-blur-sm border-orange-peel/20'>
              <CardContent className='p-0'>
                <div className='flex justify-center mb-3'>
                  <div className='w-12 h-12 bg-orange-peel/10 rounded-full flex items-center justify-center'>
                    <Clock className='w-6 h-6 text-orange-peel' />
                  </div>
                </div>
                <div className='text-2xl font-bold text-oxford-blue'>24/7</div>
                <div className='text-sm text-oxford-blue-600'>Customer Support</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
