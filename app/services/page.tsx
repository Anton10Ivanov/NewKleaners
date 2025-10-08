'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  Hammer,
  Home,
  Shield,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';

import { ServiceCategoryCard } from '@/components/features/services/ServiceCategoryCard';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceType } from '@/types/bookingFlow';

const services = [
  {
    type: ServiceType.HOME_CLEANING,
    title: 'Home Cleaning',
    description: 'Regular or once residential cleaning services',
    icon: Home,
    features: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning'],
    popular: true,
    color: 'bg-blue-500',
    price: 'Starting at $89',
  },
  {
    type: ServiceType.OFFICE_CLEANING,
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning for businesses',
    icon: Building2,
    features: ['Daily maintenance', 'Deep office cleaning', 'Specialized equipment'],
    popular: false,
    color: 'bg-green-500',
    price: 'Starting at $149',
  },
  {
    type: ServiceType.DEEP_CLEANING,
    title: 'Deep Cleaning',
    description: 'Intensive cleaning for special occasions',
    icon: Sparkles,
    features: ['Detailed cleaning', 'Hard-to-reach areas', 'Sanitization'],
    popular: false,
    color: 'bg-purple-500',
    price: 'Starting at $199',
  },
  {
    type: ServiceType.MOVE_IN_OUT,
    title: 'Move In/Out',
    description: 'Cleaning services for moving transitions',
    icon: Truck,
    features: ['Pre-move cleaning', 'Post-move cleaning', 'Full property cleaning'],
    popular: false,
    color: 'bg-orange-500',
    price: 'Starting at $179',
  },
  {
    type: ServiceType.POST_CONSTRUCTION,
    title: 'Post-Construction',
    description: 'Specialized cleaning after construction work',
    icon: Hammer,
    features: ['Construction debris removal', 'Dust elimination', 'Final cleanup'],
    popular: false,
    color: 'bg-red-500',
    price: 'Starting at $249',
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

export default function ServicesPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        {/* Service Categories Section */}
        <section className='py-20 bg-seasalt-100'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center mb-16'>
              <h2 className='heading-2 text-oxford-blue mb-4'>Explore Our Service Categories</h2>
              <p className='body-large text-oxford-blue-600 max-w-2xl mx-auto'>
                Find the right cleaning service for your space
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              <ServiceCategoryCard
                title='Commercial'
                href='/services/commercial'
                icon={Building2}
                labels={['Industrial', 'Medical', 'Kindergarten', 'Garage', 'Stairwell']}
                imageSrc='/images/pixabay-commercial.webp'
                imageAlt='Commercial cleaning services'
                description='For businesses, institutions, and commercial facilities'
                trustSignals={[
                  'Certified professionals',
                  'Flexible scheduling',
                  'Eco-friendly products',
                ]}
              />
              <ServiceCategoryCard
                title='Residential'
                href='/services/residential'
                icon={Home}
                labels={['Window', 'Carpet', 'Upholstery', 'Holiday Apt']}
                imageSrc='/images/pixabay-residential.webp'
                imageAlt='Residential cleaning services'
                description='For homes, apartments, and residential properties'
                trustSignals={['Insured & bonded', 'Pet-safe products', 'Same-day service']}
              />
              <ServiceCategoryCard
                title='Specialized'
                href='/services/specialized'
                icon={Sparkles}
                labels={['Construction', 'Disinfection', 'Facade', 'Graffiti', 'Ventilation']}
                imageSrc='/images/pixabay-industrial.webp'
                imageAlt='Specialized and industrial cleaning services'
                description='Advanced cleaning solutions for unique challenges'
                trustSignals={['Specialized equipment', 'Safety certified', '24/7 emergency']}
              />
              <ServiceCategoryCard
                title='Outdoor'
                href='/services/outdoor'
                icon={Star}
                labels={['Gardening', 'Pool', 'Roof', 'Sidewalk', 'Vehicle']}
                imageSrc='/images/pixabay-outdoor.webp'
                imageAlt='Outdoor cleaning services'
                description='Exterior cleaning and maintenance services'
                trustSignals={['Weather-resistant', 'Seasonal packages', 'Equipment included']}
              />
            </div>
          </UnifiedContainer>
        </section>

        {/* Core Services with Online Estimation */}
        <section className='py-20 bg-gradient-to-br from-oxford-blue/5 via-seasalt to-blue-green/10'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center mb-10'>
              <h2 className='heading-2 text-oxford-blue mb-4'>
                Available online pricing and booking
              </h2>
              <p className='body-large text-oxford-blue-600'>
                Get instant estimates and book directly online for our most popular services
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {services.map(service => {
                const IconComponent = service.icon;
                return (
                  <Link key={service.type} href={`/book?service=${service.type}`}>
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
                      <CardContent>
                        <ul className='space-y-2'>
                          {service.features.map(feature => (
                            <li
                              key={feature}
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
                We&apos;re committed to providing the highest quality cleaning services
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className='text-center'>
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
                Book your cleaning service today and experience the difference
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
