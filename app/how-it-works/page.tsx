'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Search,
  Shield,
  Star,
} from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';


const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Choose Your Service',
    description: 'Select the type of cleaning service you need - home, office, deep cleaning, or specialized services.',
    details: 'Browse our comprehensive range of cleaning services and select the one that best fits your needs.',
  },
  {
    number: 2,
    icon: Calendar,
    title: 'Schedule Your Cleaning',
    description: 'Pick your preferred date and time from our available slots.',
    details: 'Choose from flexible scheduling options that work with your busy lifestyle.',
  },
  {
    number: 3,
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Complete your booking with our secure payment system.',
    details: 'Pay safely and securely with our encrypted payment processing.',
  },
  {
    number: 4,
    icon: CheckCircle,
    title: 'Enjoy Clean Results',
    description: 'Relax while our professional cleaners take care of everything.',
    details: 'Sit back and enjoy your spotless space, knowing you\'re covered by our satisfaction guarantee.',
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'All cleaners are background-checked and fully insured',
  },
  {
    icon: Star,
    title: '5-Star Rated',
    description: 'Consistently rated 5 stars by our customers',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Book at your convenience with easy rescheduling',
  },
  {
    icon: CheckCircle,
    title: 'Satisfaction Guarantee',
    description: '100% satisfaction guarantee or we\'ll make it right',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-oxford-blue">
                How It Works
              </h1>
              <p className="text-xl text-oxford-blue-600 max-w-3xl mx-auto">
                Getting your space cleaned has never been easier. Follow these simple steps to book your cleaning service.
              </p>
            </div>
          </UnifiedContainer>
        </section>

        {/* Steps Section */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <Card key={step.number} className="relative">
                    <CardHeader className="text-center">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 bg-orange-peel rounded-full flex items-center justify-center mx-auto">
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-oxford-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {step.number}
                        </div>
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                      <CardDescription className="text-base">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 text-center">
                        {step.details}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Why Choose Kleaners?
              </h2>
              <p className="text-xl text-oxford-blue-600 max-w-2xl mx-auto">
                We make cleaning simple, reliable, and stress-free
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-orange-peel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-orange-peel" />
                    </div>
                    <h3 className="text-xl font-semibold text-oxford-blue mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* Process Details */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-oxford-blue mb-6">
                  What Happens After You Book?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-peel/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-orange-peel" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-oxford-blue mb-1">Confirmation</h3>
                      <p className="text-gray-600">
                        You'll receive an email confirmation with all the details of your booking.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-peel/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-orange-peel" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-oxford-blue mb-1">Cleaner Assignment</h3>
                      <p className="text-gray-600">
                        We'll assign a qualified cleaner and send you their profile and contact information.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-peel/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-orange-peel" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-oxford-blue mb-1">Pre-Service Contact</h3>
                      <p className="text-gray-600">
                        Your cleaner will contact you 24 hours before the service to confirm details.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-orange-peel/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-orange-peel" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-oxford-blue mb-1">Service Completion</h3>
                      <p className="text-gray-600">
                        After the service, you'll receive a summary and can rate your experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-orange-peel/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-oxford-blue mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join hundreds of satisfied customers who trust Kleaners for their cleaning needs.
                  Book your first service today and experience the difference!
                </p>
                <Link href="/book">
                  <Button size="lg" className="w-full">
                    Book Your Cleaning Service
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </UnifiedContainer>
        </section>

        {/* CTA Section */}
        <section className="bg-orange-peel py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Start Your Cleaning Journey Today
              </h2>
              <p className="text-xl text-black/80 max-w-2xl mx-auto">
                Experience the convenience and quality of professional cleaning services
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg">
                    Book Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg">
                    View Services
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
