'use client';

import Link from 'next/link';

import {
  ArrowRight,
  CheckCircle,
  Clock,
  Home,
  Shield,
  Square,
  Star,
  Wind,
  Wrench,
} from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    id: 'window-cleaning',
    title: 'Window Cleaning',
    description: 'Professional window and glass cleaning services',
    icon: Square,
    features: ['Interior & exterior windows', 'Frame cleaning', 'Streak-free results'],
    popular: true,
    color: 'bg-blue-500',
    price: 'Starting at €59',
  },
  {
    id: 'carpet-cleaning',
    title: 'Carpet Cleaning',
    description: 'Deep carpet cleaning for residential properties',
    icon: Wind,
    features: ['Deep stain removal', 'Pet odor elimination', 'Eco-friendly products'],
    popular: false,
    color: 'bg-green-500',
    price: 'Starting at €89',
  },
  {
    id: 'upholstery-cleaning',
    title: 'Upholstery Cleaning',
    description: 'Professional furniture and upholstery cleaning',
    icon: Home,
    features: ['Sofa cleaning', 'Chair cleaning', 'Fabric protection'],
    popular: false,
    color: 'bg-purple-500',
    price: 'Starting at €79',
  },
  {
    id: 'stairwell-cleaning',
    title: 'Stairwell Cleaning',
    description: 'Professional stairwell and common area cleaning',
    icon: ArrowRight,
    features: ['Step cleaning', 'Handrail sanitization', 'Wall maintenance'],
    popular: false,
    color: 'bg-indigo-500',
    price: 'Starting at €129',
  },
  {
    id: 'mold-removal',
    title: 'Mold Removal',
    description: 'Professional mold remediation and prevention',
    icon: Wrench,
    features: ['Mold detection', 'Safe removal', 'Prevention treatment'],
    popular: false,
    color: 'bg-red-500',
    price: 'Starting at €199',
  },
  {
    id: 'hoarder-cleaning',
    title: 'Hoarder Cleaning',
    description: 'Compassionate hoarding cleanup services',
    icon: Shield,
    features: ['Sensitive approach', 'Complete cleanup', 'Disposal services'],
    popular: false,
    color: 'bg-gray-500',
    price: 'Starting at €299',
  },
  {
    id: 'holiday-apartment-cleaning',
    title: 'Holiday Apartment Cleaning',
    description: 'Turnover cleaning for vacation rentals',
    icon: Clock,
    features: ['Quick turnaround', 'Guest-ready standards', 'Flexible scheduling'],
    popular: false,
    color: 'bg-yellow-500',
    price: 'Starting at €129',
  },
  {
    id: 'household-clearance',
    title: 'Household Clearance',
    description: 'Complete household clearance and disposal',
    icon: ArrowRight,
    features: ['Item sorting', 'Responsible disposal', 'Donation coordination'],
    popular: false,
    color: 'bg-indigo-500',
    price: 'Starting at €179',
  },
];

const features = [
  {
    icon: Shield,
    title: 'Insured & Bonded',
    description: 'All our cleaners are fully insured and bonded for your peace of mind',
  },
  {
    icon: Star,
    title: '5-Star Rated',
    description: 'Consistently rated 5 stars by our satisfied customers',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book at your convenience with flexible scheduling options',
  },
  {
    icon: CheckCircle,
    title: 'Quality Guarantee',
    description: "100% satisfaction guarantee or we'll make it right",
  },
];

export default function ResidentialServicesPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center space-y-6'>
              <h1 className='heading-responsive text-oxford-blue'>Residential Cleaning Services</h1>
              <p className='body-large text-oxford-blue-600 max-w-3xl mx-auto'>
                Professional cleaning services designed specifically for your home and family needs
              </p>
            </div>
          </UnifiedContainer>
        </section>

        {/* Services Grid */}
        <section className='py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {services.map((service, _index) => {
                const IconComponent = service.icon;
                return (
                  <Link key={service.id} href={`/book?service=${service.id}`}>
                    <Card className='relative hover:shadow-lg transition-shadow cursor-pointer'>
                      {service.popular && (
                        <Badge className='absolute -top-2 -right-2 bg-orange-peel text-black'>
                          Popular
                        </Badge>
                      )}
                      <CardHeader className='text-center'>
                        <div
                          className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
                          <IconComponent className='w-8 h-8 text-white' />
                        </div>
                        <CardTitle className='heading-3'>{service.title}</CardTitle>
                        <CardDescription className='body-large'>
                          {service.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <ul className='space-y-2'>
                          {service.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className='flex items-center body-small text-gray-600'
                            >
                              <CheckCircle className='w-4 h-4 text-green-500 mr-2 flex-shrink-0' />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* Features Section */}
        <section className='bg-seasalt-100 py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center mb-16'>
              <h2 className='heading-2 text-oxford-blue mb-4'>Why Choose Kleaners?</h2>
              <p className='body-large text-oxford-blue-600 max-w-2xl mx-auto'>
                We're committed to providing the highest quality residential cleaning services
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {features.map((feature, _index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={_index} className='text-center'>
                    <div className='w-16 h-16 bg-orange-peel/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <IconComponent className='w-8 h-8 text-orange-peel' />
                    </div>
                    <h3 className='heading-4 text-oxford-blue mb-2'>{feature.title}</h3>
                    <p className='text-gray-600'>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* CTA Section */}
        <section className='py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center space-y-8'>
              <h2 className='heading-2 text-oxford-blue'>Ready to Get Started?</h2>
              <p className='body-large text-oxford-blue-600 max-w-2xl mx-auto'>
                Book your residential cleaning service today and experience the difference
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link href='/book'>
                  <Button
                    size='lg'
                    className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 body-large'
                  >
                    Book Now
                    <ArrowRight className='w-5 h-5 ml-2' />
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt px-8 py-4 body-large'
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </UnifiedContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
}
