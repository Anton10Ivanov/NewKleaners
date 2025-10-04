'use client';

import Link from 'next/link';

import { Home, Building2, Sparkles, TreePine, Shield, ArrowRight } from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';



const services = [
  {
    id: 'residential',
    name: 'Residential Cleaning',
    description: 'Regular house cleaning, deep cleaning, and move-in/out services for your home.',
    icon: Home,
    color: 'text-blue-green',
    bgColor: 'bg-blue-green/10',
    borderColor: 'border-blue-green/20',
    features: ['Regular cleaning', 'Deep cleaning', 'Move-in/out', 'Post-construction'],
  },
  {
    id: 'commercial',
    name: 'Commercial Cleaning',
    description: 'Office, retail, and commercial space cleaning services for businesses.',
    icon: Building2,
    color: 'text-orange-peel',
    bgColor: 'bg-orange-peel/10',
    borderColor: 'border-orange-peel/20',
    features: ['Office cleaning', 'Retail spaces', 'Warehouses', 'Medical facilities'],
  },
  {
    id: 'windows',
    name: 'Window Cleaning',
    description: 'Professional window cleaning for residential and commercial properties.',
    icon: Sparkles,
    color: 'text-dark-spring-green',
    bgColor: 'bg-dark-spring-green/10',
    borderColor: 'border-dark-spring-green/20',
    features: [
      'Residential windows',
      'Commercial windows',
      'High-rise cleaning',
      'Gutter cleaning',
    ],
  },
  {
    id: 'garden',
    name: 'Garden Cleaning',
    description: 'Outdoor cleaning services including patios, decks, and garden maintenance.',
    icon: TreePine,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200',
    features: ['Patio cleaning', 'Deck maintenance', 'Garden cleanup', 'Pressure washing'],
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    description: 'Specialized cleaning for health facilities and safety-critical environments.',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200',
    features: ['Medical facilities', 'Laboratories', 'Food service', 'Disinfection'],
  },
];

export function ServicesOverview() {
  return (
    <section className='py-20 bg-white'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='text-center space-y-4 mb-16'>
          <h2 className='heading-2'>Our Cleaning Services</h2>
          <p className='body-large text-oxford-blue-600 max-w-2xl mx-auto'>
            Choose from our comprehensive range of professional cleaning services tailored to meet
            your specific needs.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map(service => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                className={`group hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} hover:scale-105`}
              >
                <CardHeader className='text-center pb-4'>
                  <div
                    className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <CardTitle className='text-xl text-oxford-blue'>{service.name}</CardTitle>
                  <p className='text-oxford-blue-600 text-sm leading-relaxed'>
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className='space-y-6'>
                  <ul className='space-y-2'>
                    {service.features.map((feature, index) => (
                      <li key={index} className='flex items-center text-sm text-oxford-blue'>
                        <div
                          className={`w-2 h-2 ${service.color.replace('text-', 'bg-')} rounded-full mr-3 flex-shrink-0`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={`/services/${service.id}`}>
                    <Button
                      variant='outline'
                      className={`w-full group-hover:bg-orange-peel group-hover:text-black group-hover:border-orange-peel transition-colors duration-300 ${service.borderColor}`}
                    >
                      Learn More
                      <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300' />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className='text-center mt-12'>
          <Link href='/services'>
            <Button
              size='lg'
              className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4'
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
