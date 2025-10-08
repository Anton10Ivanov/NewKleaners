'use client';

import React from 'react';

import { MainBookingFlow } from '@/MainBookingFlow';
import { ServiceType } from '@/types/bookingFlow';

export const BookingFlowExample: React.FC = () => {
  const handleBookingComplete = (bookingId: string) => {
    console.log('Booking completed:', bookingId);
    // Handle successful booking completion
    // e.g., redirect to confirmation page, show success message, etc.
  };

  return (
    <div className='min-h-screen'>
      <MainBookingFlow
        preselectedService={ServiceType.HOME_CLEANING} // Optional: pre-select a service
        onComplete={handleBookingComplete}
      />
    </div>
  );
};

// Example with different service types
export const OfficeBookingFlowExample: React.FC = () => {
  return (
    <div className='min-h-screen'>
      <MainBookingFlow
        preselectedService={ServiceType.OFFICE_CLEANING}
        onComplete={bookingId => {
          console.log('Office booking completed:', bookingId);
        }}
      />
    </div>
  );
};

// Example without preselected service (user chooses from all options)
export const FullBookingFlowExample: React.FC = () => {
  return (
    <div className='min-h-screen'>
      <MainBookingFlow
        onComplete={bookingId => {
          console.log('Booking completed:', bookingId);
        }}
      />
    </div>
  );
};
