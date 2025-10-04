'use client';

import { ArrowRight, Calendar, CheckCircle, CreditCard, Search } from 'lucide-react';

import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
  {
    number: '01',
    title: 'Search & Select',
    description:
      'Browse our verified cleaning professionals and select the service that fits your needs.',
    icon: Search,
    color: 'text-blue-green',
    bgColor: 'bg-blue-green/10',
  },
  {
    number: '02',
    title: 'Schedule & Book',
    description:
      'Choose your preferred date and time. Our providers will confirm availability within minutes.',
    icon: Calendar,
    color: 'text-orange-peel',
    bgColor: 'bg-orange-peel/10',
  },
  {
    number: '03',
    title: 'Secure Payment',
    description:
      'Pay securely through our platform. Your payment is protected until the service is completed.',
    icon: CreditCard,
    color: 'text-dark-spring-green',
    bgColor: 'bg-dark-spring-green/10',
  },
  {
    number: '04',
    title: 'Enjoy & Review',
    description:
      'Relax while our professionals clean. Rate your experience to help others make informed choices.',
    icon: CheckCircle,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
];

export function HowItWorks() {
  return (
    <section className='py-20 bg-seasalt'>
      <UnifiedContainer size='xl' padding='lg'>
        <div className='text-center space-y-4 mb-16'>
          <h2 className='heading-2'>How It Works</h2>
          <p className='body-large text-oxford-blue-600 max-w-2xl mx-auto'>
            Getting professional cleaning services has never been easier. Follow these simple steps
            to book your next cleaning service.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={step.number} className='relative'>
                <Card className='group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-orange-peel/20'>
                  <CardHeader className='text-center pb-4'>
                    <div className='relative'>
                      <div
                        className={`w-20 h-20 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`w-10 h-10 ${step.color}`} />
                      </div>
                      <div className='absolute -top-2 -right-2 w-8 h-8 bg-orange-peel text-black rounded-full flex items-center justify-center text-sm font-bold'>
                        {step.number}
                      </div>
                    </div>
                    <CardTitle className='text-xl text-oxford-blue'>{step.title}</CardTitle>
                    <p className='text-oxford-blue-600 text-sm leading-relaxed'>
                      {step.description}
                    </p>
                  </CardHeader>
                </Card>

                {/* Arrow between steps */}
                {!isLast && (
                  <div className='hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10'>
                    <div className='w-8 h-8 bg-seasalt border-2 border-orange-peel/20 rounded-full flex items-center justify-center'>
                      <ArrowRight className='w-4 h-4 text-orange-peel' />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className='text-center mt-16'>
          <div className='inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg'>
            <div className='flex items-center space-x-2'>
              <div className='w-3 h-3 bg-orange-peel rounded-full' />
              <span className='text-sm font-medium text-oxford-blue'>Ready to get started?</span>
            </div>
            <div className='w-px h-6 bg-oxford-blue/20' />
            <div className='text-sm text-oxford-blue-600'>
              Average booking time:{' '}
              <span className='font-semibold text-orange-peel'>2 minutes</span>
            </div>
          </div>
        </div>
      </UnifiedContainer>
    </section>
  );
}
