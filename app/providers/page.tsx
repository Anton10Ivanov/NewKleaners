'use client';

import Link from 'next/link';

import { ArrowRight, Calendar, CheckCircle, DollarSign, Shield, Users } from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const benefits = [
  {
    icon: DollarSign,
    title: 'Earn More',
    description: 'Set your own rates and earn competitive income',
  },
  {
    icon: Calendar,
    title: 'Flexible Schedule',
    description: 'Work when you want, as much or as little as you prefer',
  },
  {
    icon: Shield,
    title: 'Insurance Coverage',
    description: 'We provide liability insurance for all our providers',
  },
  {
    icon: Users,
    title: 'Support Team',
    description: 'Dedicated support team to help you succeed',
  },
];

const requirements = [
  'Valid cleaning experience (minimum 1 year)',
  'Clean background check',
  'Reliable transportation',
  'Professional references',
  'Commitment to quality service',
];

const steps = [
  {
    number: 1,
    title: 'Apply Online',
    description: 'Fill out our simple application form with your details and experience',
  },
  {
    number: 2,
    title: 'Background Check',
    description: "We'll verify your background and check your references",
  },
  {
    number: 3,
    title: 'Interview & Training',
    description: 'Complete a brief interview and our quality training program',
  },
  {
    number: 4,
    title: 'Start Earning',
    description: 'Begin accepting bookings and earning money immediately',
  },
];

export default function ProvidersPage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        {/* Hero Section */}
        <section className='bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center space-y-6'>
              <h1 className='text-4xl md:text-5xl font-bold text-oxford-blue'>
                Become a Cleaning Provider
              </h1>
              <p className='text-xl text-oxford-blue-600 max-w-3xl mx-auto'>
                Join our network of professional cleaners and start earning money on your own
                schedule. Work when you want, where you want, and earn competitive rates.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  size='lg'
                  className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 text-lg'
                >
                  Apply Now
                  <ArrowRight className='w-5 h-5 ml-2' />
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  className='border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt px-8 py-4 text-lg'
                >
                  Learn More
                </Button>
              </div>
            </div>
          </UnifiedContainer>
        </section>

        {/* Benefits Section */}
        <section className='py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-oxford-blue mb-4'>
                Why Join Kleaners?
              </h2>
              <p className='text-xl text-oxford-blue-600 max-w-2xl mx-auto'>
                We provide everything you need to succeed as a cleaning professional
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {benefits.map((benefit, _index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={_index} className='text-center'>
                    <CardHeader>
                      <div className='w-16 h-16 bg-orange-peel/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <IconComponent className='w-8 h-8 text-orange-peel' />
                      </div>
                      <CardTitle className='text-xl'>{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className='text-base'>{benefit.description}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* Requirements Section */}
        <section className='bg-gray-50 py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div>
                <h2 className='text-3xl font-bold text-oxford-blue mb-6'>Requirements to Join</h2>
                <p className='text-lg text-gray-600 mb-8'>
                  We maintain high standards to ensure quality service for our customers. Here's
                  what we look for in our cleaning providers:
                </p>
                <ul className='space-y-4'>
                  {requirements.map((requirement, index) => (
                    <li key={index} className='flex items-start'>
                      <CheckCircle className='w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0' />
                      <span className='text-gray-700'>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='bg-orange-peel/10 rounded-lg p-8'>
                <h3 className='text-2xl font-bold text-oxford-blue mb-4'>Ready to Apply?</h3>
                <p className='text-gray-600 mb-6'>
                  Join our team of professional cleaners and start earning money on your own
                  schedule. The application process is quick and easy.
                </p>
                <Button size='lg' className='w-full'>
                  Start Your Application
                  <ArrowRight className='w-5 h-5 ml-2' />
                </Button>
              </div>
            </div>
          </UnifiedContainer>
        </section>

        {/* Application Process */}
        <section className='py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center mb-16'>
              <h2 className='text-3xl md:text-4xl font-bold text-oxford-blue mb-4'>
                How to Get Started
              </h2>
              <p className='text-xl text-oxford-blue-600 max-w-2xl mx-auto'>
                Our simple 4-step process gets you up and running quickly
              </p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {steps.map((step, index) => (
                <Card key={step.number} className='relative'>
                  <CardHeader className='text-center'>
                    <div className='relative mb-4'>
                      <div className='w-16 h-16 bg-orange-peel rounded-full flex items-center justify-center mx-auto'>
                        <span className='text-2xl font-bold text-white'>{step.number}</span>
                      </div>
                    </div>
                    <CardTitle className='text-xl'>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className='text-base text-center'>
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </UnifiedContainer>
        </section>

        {/* Stats Section */}
        <section className='bg-orange-peel py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center space-y-8'>
              <h2 className='text-3xl md:text-4xl font-bold text-black'>
                Join Our Growing Community
              </h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='text-center'>
                  <div className='text-4xl font-bold text-black mb-2'>500+</div>
                  <div className='text-black/80'>Active Providers</div>
                </div>
                <div className='text-center'>
                  <div className='text-4xl font-bold text-black mb-2'>4.8/5</div>
                  <div className='text-black/80'>Average Rating</div>
                </div>
                <div className='text-center'>
                  <div className='text-4xl font-bold text-black mb-2'>€25-40</div>
                  <div className='text-black/80'>Hourly Rate</div>
                </div>
              </div>
            </div>
          </UnifiedContainer>
        </section>

        {/* CTA Section */}
        <section className='py-20'>
          <UnifiedContainer size='xl' padding='lg'>
            <div className='text-center space-y-8'>
              <h2 className='text-3xl md:text-4xl font-bold text-oxford-blue'>
                Ready to Start Your Journey?
              </h2>
              <p className='text-xl text-oxford-blue-600 max-w-2xl mx-auto'>
                Join thousands of cleaning professionals who are already earning with Kleaners
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <Button
                  size='lg'
                  className='bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 text-lg'
                >
                  Apply to Become a Provider
                  <ArrowRight className='w-5 h-5 ml-2' />
                </Button>
                <Link href='/contact'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt px-8 py-4 text-lg'
                  >
                    Have Questions?
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
