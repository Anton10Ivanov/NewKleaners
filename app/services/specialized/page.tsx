'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Building2,
  CheckCircle,
  Clock,
  Hammer,
  Shield,
  Sparkles,
  Star,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const services = [
  {
    id: 'industrial-cleaning',
    title: 'Industrial Cleaning',
    description: 'Professional cleaning for industrial facilities',
    icon: Building2,
    features: ['Heavy-duty equipment', 'Safety protocols', 'Large-scale operations'],
    popular: false,
    color: 'bg-blue-500',
    price: 'Starting at €299',
  },
  {
    id: 'construction-cleaning',
    title: 'Construction Cleaning',
    description: 'Post-construction cleanup and debris removal',
    icon: Hammer,
    features: ['Debris removal', 'Dust elimination', 'Final polish'],
    popular: true,
    color: 'bg-orange-500',
    price: 'Starting at €249',
  },
  {
    id: 'crime-scene-cleaning',
    title: 'Crime Scene Cleaning',
    description: 'Professional crime scene cleanup services',
    icon: Shield,
    features: ['Trauma cleanup', 'Biohazard removal', 'Compassionate service'],
    popular: false,
    color: 'bg-red-500',
    price: 'Starting at €399',
  },
  {
    id: 'disinfection-cleaning',
    title: 'Disinfection Cleaning',
    description: 'Deep disinfection and sanitization services',
    icon: Zap,
    features: ['Viral protection', 'Bacterial elimination', 'Safe chemicals'],
    popular: false,
    color: 'bg-blue-500',
    price: 'Starting at €179',
  },
  {
    id: 'facade-cleaning',
    title: 'Facade Cleaning',
    description: 'Professional building exterior cleaning',
    icon: Building2,
    features: ['Pressure washing', 'Window cleaning', 'Surface restoration'],
    popular: false,
    color: 'bg-green-500',
    price: 'Starting at €299',
  },
  {
    id: 'graffiti-removal',
    title: 'Graffiti Removal',
    description: 'Professional graffiti removal and prevention',
    icon: Wrench,
    features: ['Paint removal', 'Surface restoration', 'Prevention coating'],
    popular: false,
    color: 'bg-purple-500',
    price: 'Starting at €149',
  },
  {
    id: 'intensive-cleaning',
    title: 'Intensive Cleaning',
    description: 'Deep intensive cleaning services',
    icon: Sparkles,
    features: ['Thorough cleaning', 'Detail work', 'Complete restoration'],
    popular: false,
    color: 'bg-yellow-500',
    price: 'Starting at €199',
  },
  {
    id: 'multi-surface-cleaning',
    title: 'Multi Surface Cleaning',
    description: 'Cleaning for various surface types',
    icon: ArrowRight,
    features: ['Multiple materials', 'Specialized techniques', 'Surface protection'],
    popular: false,
    color: 'bg-indigo-500',
    price: 'Starting at €129',
  },
  {
    id: 'stone-surface-cleaning',
    title: 'Stone Surface Cleaning',
    description: 'Specialized stone and marble cleaning',
    icon: Shield,
    features: ['Marble cleaning', 'Granite care', 'Stone restoration'],
    popular: false,
    color: 'bg-gray-500',
    price: 'Starting at €179',
  },
  {
    id: 'ventilation-cleaning',
    title: 'Ventilation Cleaning (Coming soon)',
    description: 'HVAC and ventilation system cleaning',
    icon: Wind,
    features: ['Duct cleaning', 'Filter replacement', 'Air quality improvement'],
    popular: false,
    color: 'bg-cyan-500',
    price: 'Starting at €229',
  },
  {
    id: 'pipe-cleaning',
    title: 'Pipe Cleaning (Coming soon)',
    description: 'Professional pipe and drain cleaning',
    icon: Wrench,
    features: ['Drain cleaning', 'Pipe maintenance', 'Blockage removal'],
    popular: false,
    color: 'bg-teal-500',
    price: 'Starting at €99',
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

export default function SpecializedServicesPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center space-y-6'>
              <h1 className='text-4xl md:text-5xl font-bold text-oxford-blue'>
                Specialized Cleaning Services
              </h1>
              <p className='text-xl text-oxford-blue-600 max-w-3xl mx-auto'>
                Expert cleaning solutions for unique and challenging situations
              </p>
            </div>
          </UnifiedContainer>
        </section>

        {/* Services Grid */}
        <section className='py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {services.map(service => {
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
                        <CardTitle className='text-2xl'>{service.title}</CardTitle>
                        <CardDescription className='text-lg'>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className='p-0'>
                        <ul className='space-y-2'>
                          {service.features.map(feature => (
                            <li key={feature} className='flex items-center text-sm text-gray-600'>
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
              <h2 className='text-3xl md:text-4xl font-bold text-oxford-blue mb-4'>
                Why Choose Kleaners?
              </h2>
              <p className='text-xl text-oxford-blue-600 max-w-2xl mx-auto'>
                We&apos;re committed to providing the highest quality specialized cleaning services
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {features.map(feature => {
                const IconComponent = feature.icon;
                return (
                  <div key={feature.title} className='text-center'>
                    <div className='w-16 h-16 bg-orange-peel/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                      <IconComponent className='w-8 h-8 text-orange-peel' />
                    </div>
                    <h3 className='text-xl font-semibold text-oxford-blue mb-2'>{feature.title}</h3>
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
              <h2 className='text-3xl md:text-4xl font-bold text-oxford-blue'>
                Ready to Get Started?
              </h2>
              <p className='text-xl text-oxford-blue-600 max-w-2xl mx-auto'>
                Book your specialized cleaning service today and experience the difference
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Link href='/book'>
                  <Button
                    size='lg'
                    className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 text-lg'
                  >
                    Book Now
                    <ArrowRight className='w-5 h-5 ml-2' />
                  </Button>
                </Link>
                <Link href='/contact'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt px-8 py-4 text-lg'
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
