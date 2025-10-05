'use client';

import { Quote, Star } from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Müller',
    location: 'Frankfurt',
    rating: 5,
    text: 'Excellent service! The cleaning team was punctual, professional, and did an amazing job. My apartment has never looked better. Highly recommended!',
    service: 'Residential Cleaning',
    avatar: 'SM',
  },
  {
    id: 2,
    name: 'Michael Weber',
    location: 'Frankfurt',
    rating: 5,
    text: 'Outstanding window cleaning service. They cleaned all the windows in our office building and the results were fantastic. Will definitely book again.',
    service: 'Window Cleaning',
    avatar: 'MW',
  },
  {
    id: 3,
    name: 'Anna Schmidt',
    location: 'Frankfurt',
    rating: 5,
    text: 'The commercial cleaning service exceeded our expectations. Professional, reliable, and thorough. Our office space looks spotless every week.',
    service: 'Commercial Cleaning',
    avatar: 'AS',
  },
  {
    id: 4,
    name: 'Thomas Klein',
    location: 'Frankfurt',
    rating: 5,
    text: 'Great experience from booking to completion. The platform is easy to use and the cleaning service was top-notch. Very satisfied!',
    service: 'Garden Cleaning',
    avatar: 'TK',
  },
  {
    id: 5,
    name: 'Lisa Hoffmann',
    location: 'Frankfurt',
    rating: 5,
    text: 'Professional, trustworthy, and efficient. The team cleaned our medical facility to the highest standards. Highly professional service.',
    service: 'Health & Safety',
    avatar: 'LH',
  },
  {
    id: 6,
    name: 'David Fischer',
    location: 'Frankfurt',
    rating: 5,
    text: 'Amazing service! The cleaners were friendly, thorough, and left our home sparkling clean. The booking process was simple and convenient.',
    service: 'Residential Cleaning',
    avatar: 'DF',
  },
];

export function Testimonials() {
  return (
    <section className='py-20 bg-gradient-to-br from-orange-peel/10 to-orange-peel/20'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='text-center space-y-4 mb-16'>
          <h2 className='heading-2 text-oxford-blue'>What Our Customers Say</h2>
          <p className='body-large text-oxford-blue/80 max-w-2xl mx-auto'>
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to
            say about their cleaning experiences.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map(testimonial => (
            <Card
              key={testimonial.id}
              className='group hover:shadow-xl transition-all duration-300 bg-background/80 backdrop-blur-sm border-orange-peel/20 hover:border-orange-peel/40'
            >
              <CardContent className='p-6'>
                <div className='flex items-center space-x-1 mb-4'>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 fill-orange-peel text-orange-peel' />
                  ))}
                </div>

                <div className='relative mb-6'>
                  <Quote className='w-8 h-8 text-orange-peel/20 absolute -top-2 -left-2' />
                  <p className='text-oxford-blue-700 text-sm leading-relaxed italic'>
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </div>

                <div className='flex items-center space-x-3'>
                  <div className='w-10 h-10 bg-orange-peel/10 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-semibold text-orange-peel'>
                      {testimonial.avatar}
                    </span>
                  </div>
                  <div>
                    <div className='font-semibold text-oxford-blue text-sm'>{testimonial.name}</div>
                    <div className='text-xs text-oxford-blue-600'>
                      {testimonial.location} • {testimonial.service}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='text-center mt-12'>
          <div className='inline-flex items-center space-x-6 bg-seasalt rounded-full px-8 py-4'>
            <div className='flex items-center space-x-2'>
              <div className='flex items-center space-x-1'>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className='w-5 h-5 fill-orange-peel text-orange-peel' />
                ))}
              </div>
              <span className='text-lg font-bold text-oxford-blue'>4.8/5</span>
            </div>
            <div className='w-px h-6 bg-oxford-blue/20' />
            <div className='text-sm text-oxford-blue-600'>
              Based on <span className='font-semibold text-orange-peel'>1,200+</span> reviews
            </div>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
