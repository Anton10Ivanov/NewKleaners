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

  const handleBookingCancel = () => {
    console.log('Booking cancelled');
    // Handle booking cancellation
    // e.g., redirect to home page, show cancellation message, etc.
  };

  return (
    <div className="min-h-screen">
      <MainBookingFlow
        preselectedService={ServiceType.HOME_CLEANING} // Optional: pre-select a service
        onComplete={handleBookingComplete}
        onCancel={handleBookingCancel}
      />
    </div>
  );
};

// Example with different service types
export const OfficeBookingFlowExample: React.FC = () => {
  return (
    <div className="min-h-screen">
      <MainBookingFlow
        preselectedService={ServiceType.OFFICE_CLEANING}
        onComplete={(bookingId) => {
          console.log('Office booking completed:', bookingId);
        }}
        onCancel={() => {
          console.log('Office booking cancelled');
        }}
      />
    </div>
  );
};

// Example without preselected service (user chooses from all options)
export const FullBookingFlowExample: React.FC = () => {
  return (
    <div className="min-h-screen">
      <MainBookingFlow
        onComplete={(bookingId) => {
          console.log('Booking completed:', bookingId);
        }}
        onCancel={() => {
          console.log('Booking cancelled');
        }}
      />
    </div>
  );
};
