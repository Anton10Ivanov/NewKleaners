'use client';

import Link from 'next/link';

import { ArrowRight, Building2, Home, Sparkles, Star } from 'lucide-react';

import { ServiceCategoryCard } from '@/components/features/services/ServiceCategoryCard';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';

const serviceCategories = [
  {
    title: 'Commercial',
    href: '/services/commercial',
    icon: Building2,
    labels: ['Industrial', 'Medical', 'Kindergarten', 'Garage', 'Stairwell'],
    imageSrc: '/images/pixabay-commercial.webp',
    imageAlt: 'Commercial cleaning services',
    description: 'For businesses, institutions, and commercial facilities',
    trustSignals: ['Certified professionals', 'Flexible scheduling', 'Eco-friendly products'],
  },
  {
    title: 'Residential',
    href: '/services/residential',
    icon: Home,
    labels: ['Window', 'Carpet', 'Upholstery', 'Holiday Apt'],
    imageSrc: '/images/pixabay-residential.webp',
    imageAlt: 'Residential cleaning services',
    description: 'For homes, apartments, and residential properties',
    trustSignals: ['Insured & bonded', 'Pet-safe products', 'Same-day service'],
  },
  {
    title: 'Specialized',
    href: '/services/specialized',
    icon: Sparkles,
    labels: ['Construction', 'Disinfection', 'Facade', 'Graffiti', 'Ventilation'],
    imageSrc: '/images/pixabay-industrial.webp',
    imageAlt: 'Specialized and industrial cleaning services',
    description: 'Advanced cleaning solutions for unique challenges',
    trustSignals: ['Specialized equipment', 'Safety certified', '24/7 emergency'],
  },
  {
    title: 'Outdoor',
    href: '/services/outdoor',
    icon: Star,
    labels: ['Gardening', 'Pool', 'Roof', 'Sidewalk', 'Vehicle'],
    imageSrc: '/images/pixabay-outdoor.webp',
    imageAlt: 'Outdoor cleaning services',
    description: 'Exterior cleaning and maintenance services',
    trustSignals: ['Weather-resistant', 'Seasonal packages', 'Equipment included'],
  },
];

export function ServicesOverview() {
  return (
    <section className='py-20 bg-seasalt-100'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='text-center mb-16'>
          <h2 className='heading-2 text-oxford-blue mb-4'>Our Cleaning Services</h2>
          <p className='body-large text-oxford-blue-600 max-w-2xl mx-auto'>
            Find the right cleaning service for your space
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {serviceCategories.map(category => (
            <ServiceCategoryCard
              key={category.title}
              title={category.title}
              href={category.href}
              icon={category.icon}
              labels={category.labels}
              imageSrc={category.imageSrc}
              imageAlt={category.imageAlt}
              description={category.description}
              trustSignals={category.trustSignals}
            />
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link href='/services'>
            <Button
              size='lg'
              className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 body-large'
            >
              View All Services
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
          </Link>
        </div>
      </UnifiedContainer>
    </section>
  );
}
