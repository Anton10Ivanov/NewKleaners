'use client';

import { useState } from 'react';

import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { UnifiedContainer } from '@/components/layout/UnifiedContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';


const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: '+49 69 123 456 789',
    description: 'Mon-Fri 8AM-6PM, Sat 9AM-4PM',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'hello@kleaners.de',
    description: 'We respond within 24 hours',
  },
  {
    icon: MapPin,
    title: 'Address',
    details: 'Frankfurt am Main, Germany',
    description: 'Serving Frankfurt and surrounding areas',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Mon-Fri: 8AM-6PM',
    description: 'Sat: 9AM-4PM, Sun: Closed',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-seasalt via-seasalt-50 to-orange-peel-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-oxford-blue">
                Contact Us
              </h1>
              <p className="text-xl text-oxford-blue-600 max-w-3xl mx-auto">
                Get in touch with our team. We're here to help with any questions or concerns.
              </p>
            </div>
          </UnifiedContainer>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-oxford-blue mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Have questions about our services? Need help with a booking?
                    We're here to help! Reach out to us using any of the methods below.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-orange-peel/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-orange-peel" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-oxford-blue mb-1">
                                {info.title}
                              </h3>
                              <p className="text-gray-900 font-medium">
                                {info.details}
                              </p>
                              <p className="text-gray-600 text-sm">
                                {info.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Send us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+49 69 123 456 789"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            required
                            placeholder="What's this about?"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </UnifiedContainer>
        </section>

        {/* FAQ Section */}
        <section className="bg-gray-50 py-20">
          <UnifiedContainer size="xl" padding="lg">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-oxford-blue mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-oxford-blue-600 max-w-2xl mx-auto">
                Quick answers to common questions about our services
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>How do I book a cleaning service?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Simply click "Book Now" on our website, select your service type,
                    choose your preferred date and time, and complete the booking form.
                    It's that easy!
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Are your cleaners insured and background-checked?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes! All our cleaners are fully insured, bonded, and have passed
                    comprehensive background checks for your peace of mind.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>What if I'm not satisfied with the service?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We offer a 100% satisfaction guarantee. If you're not happy with
                    the service, we'll make it right or provide a full refund.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Do I need to be home during the cleaning?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    No, you don't need to be home. We can arrange key pickup or you
                    can provide access instructions. We'll keep you updated throughout the process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </UnifiedContainer>
        </section>
      </main>
      <Footer />
    </div>
  );
}
