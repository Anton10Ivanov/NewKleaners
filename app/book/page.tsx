'use client';

import { MainBookingFlow } from '@/MainBookingFlow';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();

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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MainBookingFlow
          onComplete={handleBookingComplete}
          onCancel={handleBookingCancel}
        />
      </div>
    </div>
  );
}
