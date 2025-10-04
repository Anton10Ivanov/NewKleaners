'use client';

import { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';



function ConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get('bookingId');
    setBookingId(id);
  }, [searchParams]);

  const handleBackToHome = () => {
    router.push('/');
  };

  const handleViewBookings = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="mb-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your cleaning service has been successfully booked. You'll receive a confirmation email shortly.
            </p>
          </motion.div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Booking Details
              </CardTitle>
              <CardDescription>
                Your booking reference: {bookingId || 'N/A'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-medium">Home Cleaning</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-medium">To be confirmed</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">2-3 hours</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Total Price:</span>
                <span className="font-bold text-lg text-primary">$120</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1 text-left">
                <li>• You'll receive a confirmation email with all details</li>
                <li>• Our team will contact you within 24 hours to confirm timing</li>
                <li>• Your cleaner will arrive at the scheduled time</li>
                <li>• Payment will be processed after service completion</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleBackToHome}
                variant="outline"
                className="px-8"
              >
                Back to Home
              </Button>
              <Button
                onClick={handleViewBookings}
                className="px-8"
              >
                View My Bookings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-peel mx-auto mb-4" />
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
