'use client';

import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { MainBookingFlow } from '@/MainBookingFlow';

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedService = searchParams.get('service');

  const handleBookingComplete = (bookingId: string) => {
    console.log('Booking completed:', bookingId);
    // Redirect to confirmation page or show success message
    router.push(`/booking/confirmation?bookingId=${bookingId}`);
  };

  const handleBookingCancel = () => {
    console.log('Booking cancelled');
    // Redirect back to home page
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <MainBookingFlow
          preselectedService={preselectedService as any}
          onComplete={handleBookingComplete}
        />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-background flex items-center justify-center'>
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
