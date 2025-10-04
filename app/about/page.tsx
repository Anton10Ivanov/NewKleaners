'use client';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Clock,
  Shield,
  Star,
  Users
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { number: '500+', label: 'Happy Customers' },
  { number: '4.8/5', label: 'Average Rating' },
  { number: '100%', label: 'Insured & Bonded' },
  { number: '24/7', label: 'Customer Support' }
];

const values = [
  {
    icon: Shield,
    title: 'Reliability',
    description: 'We show up on time, every time, with consistent quality service you can count on.'
  },
  {
    icon: Star,
    title: 'Excellence',
    description: 'We strive for perfection in every cleaning task, ensuring your complete satisfaction.'
  },
  {
    icon: Users,
    title: 'Trust',
    description: 'Our vetted professionals are background-checked and fully insured for your peace of mind.'
  },
  {
    icon: Clock,
    title: 'Convenience',
    description: 'Flexible scheduling and easy booking make it simple to maintain a clean space.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-oxford-blue">
                About Kleaners
              </h1>
              <p className="text-xl text-oxford-blue-600 max-w-3xl mx-auto">
                Your trusted partner for professional cleaning services in Frankfurt and surrounding areas
              </p>
            </div>
          </UnifiedContainer>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-orange-peel mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </UnifiedContainer>
        </section>

        {/* Story Section */}
        <section className="bg-gray-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-oxford-blue mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Founded in 2020, Kleaners began with a simple mission: to make professional cleaning
                    services accessible, reliable, and affordable for everyone in Frankfurt.
                  </p>
                  <p>
                    What started as a small team of dedicated cleaners has grown into a trusted platform
                    connecting customers with verified, professional cleaning services across the region.
                  </p>
                  <p>
                    Today, we're proud to serve hundreds of satisfied customers with our comprehensive
                    range of cleaning services, from regular home maintenance to specialized commercial cleaning.
                  </p>
                </div>
              </div>
              <div className="bg-orange-peel/10 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-oxford-blue mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 text-lg">
                  To provide exceptional cleaning services that exceed expectations,
                  while building lasting relationships with our customers and creating
                  a positive impact in our community.
                </p>
              </div>
            </div>
          </UnifiedContainer>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Our Values
              </h2>
              <p className="text-xl text-oxford-blue-600 max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="w-16 h-16 bg-orange-peel/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-orange-peel" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </UnifiedContainer>
        </section>

        {/* CTA Section */}
        <section className="bg-orange-peel py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-black">
                Ready to Experience the Difference?
              </h2>
              <p className="text-xl text-black/80 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who trust Kleaners for their cleaning needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/book">
                  <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg">
                    Book Your Service
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg">
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
