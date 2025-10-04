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
    description: 'Regular or one-time residential cleaning services',
    icon: Home,
    features: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning'],
    popular: true,
    color: 'bg-blue-500',
    price: 'Starting at $80',
  },
  {
    type: ServiceType.OFFICE_CLEANING,
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning for businesses',
    icon: Building2,
    features: ['Daily maintenance', 'Deep office cleaning', 'Specialized equipment'],
    popular: false,
    color: 'bg-green-500',
    price: 'Starting at $100',
  },
  {
    type: ServiceType.DEEP_CLEANING,
    title: 'Deep Cleaning',
    description: 'Intensive cleaning for special occasions',
    icon: Sparkles,
    features: ['Detailed cleaning', 'Hard-to-reach areas', 'Sanitization'],
    popular: false,
    color: 'bg-purple-500',
    price: 'Starting at $150',
  },
  {
    type: ServiceType.MOVE_IN_OUT,
    title: 'Move In/Out',
    description: 'Cleaning services for moving transitions',
    icon: Truck,
    features: ['Pre-move cleaning', 'Post-move cleaning', 'Full property cleaning'],
    popular: false,
    color: 'bg-orange-500',
    price: 'Starting at $120',
  },
  {
    type: ServiceType.POST_CONSTRUCTION,
    title: 'Post-Construction',
    description: 'Specialized cleaning after construction work',
    icon: Hammer,
    features: ['Construction debris removal', 'Dust elimination', 'Final cleanup'],
    popular: false,
    color: 'bg-red-500',
    price: 'Starting at $200',
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
    description: '100% satisfaction guarantee or we\'ll make it right',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-oxford-blue">
                Professional Cleaning Services
              </h1>
              <p className="text-xl text-oxford-blue-600 max-w-3xl mx-auto">
                Choose from our comprehensive range of cleaning services designed to meet all your needs
              </p>
            </div>
          </UnifiedContainer>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.type} className="relative hover:shadow-lg transition-shadow">
                    {service.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-peel text-black">
                        Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-lg">
                        {service.description}
                      </CardDescription>
                      <div className="text-2xl font-bold text-orange-peel mt-2">
                        {service.price}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 mb-6">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/book?service=${service.type}`}>
                        <Button className="w-full">
                          Book {service.title}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Why Choose Kleaners?
              </h2>
              <p className="text-xl text-oxford-blue-600 max-w-2xl mx-auto">
                We're committed to providing the highest quality cleaning services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-orange-peel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-orange-peel" />
                    </div>
                    <h3 className="text-xl font-semibold text-oxford-blue mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-oxford-blue-600 max-w-2xl mx-auto">
                Book your cleaning service today and experience the difference
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="bg-orange-peel hover:bg-orange-peel-600 text-black px-8 py-4 text-lg">
                    Book Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-oxford-blue text-oxford-blue hover:bg-oxford-blue hover:text-seasalt px-8 py-4 text-lg">
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
