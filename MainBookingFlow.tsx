'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

import { useAuth } from '@/components/providers/AuthProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookingStep,
  CleaningFrequency,
  EffortLevel,
  PropertySizeTier,
  ServiceType,
  type BookingFlowState,
  type BookingSchedule,
  type Estimate,
  type OfficeDetails,
  type PropertyDetails,
} from '@/types/bookingFlow';

import { EffortSelectionStep } from './components/booking/steps/EffortSelectionStep';
import { FrequencySelectionStep } from './components/booking/steps/FrequencySelectionStep';
import { PaymentStep } from './components/booking/steps/PaymentStep';
import { PropertyDetailsStep } from './components/booking/steps/PropertyDetailsStep';
import { SchedulingStep } from './components/booking/steps/SchedulingStep';
import { ServiceSelectionStep } from './components/booking/steps/ServiceSelectionStep';

interface MainBookingFlowProps {
  preselectedService?: ServiceType | null;
  onComplete?: (bookingId: string) => void;
  onCancel?: () => void;
}

export const MainBookingFlow: React.FC<MainBookingFlowProps> = ({
  preselectedService,
  onComplete,
  onCancel,
}) => {
  const { loading: authLoading } = useAuth();

  const [bookingState, setBookingState] = useState<BookingFlowState>({
    currentStep: preselectedService ? BookingStep.PROPERTY_DETAILS : BookingStep.SERVICE_SELECTION,
    serviceType: preselectedService || null,
    cleaningFrequency: null,
    propertyDetails: null,
    estimate: null,
    selectedEffort: null,
    sizeTier: null,
    schedule: null,
    isSubmitting: false,
    errors: {},
    metadata: {
      sessionId: crypto.randomUUID(),
      startedAt: new Date().toISOString(),
      lastUpdatedAt: new Date().toISOString(),
      source: 'direct',
    },
  });

  const steps = useMemo(
    () => [
      {
        id: BookingStep.SERVICE_SELECTION,
        title: 'Service Selection',
        description: 'Choose your cleaning service',
        isRequired: true,
        canSkip: false,
      },
      {
        id: BookingStep.FREQUENCY_SELECTION,
        title: 'Frequency Selection',
        description: 'Choose cleaning frequency',
        isRequired: true,
        canSkip: false,
      },
      {
        id: BookingStep.PROPERTY_DETAILS,
        title: 'Property Details',
        description: 'Tell us about your property',
        isRequired: true,
        canSkip: false,
      },
      {
        id: BookingStep.EFFORT_SELECTION,
        title: 'Effort Level',
        description: 'Choose your cleaning level',
        isRequired: true,
        canSkip: false,
      },
      {
        id: BookingStep.SCHEDULING,
        title: 'Schedule',
        description: 'Choose date and time',
        isRequired: true,
        canSkip: false,
      },
      {
        id: BookingStep.PAYMENT,
        title: 'Payment',
        description: 'Review estimate and complete booking',
        isRequired: true,
        canSkip: false,
      },
    ],
    [],
  );

  const updateBookingState = useCallback((updates: Partial<BookingFlowState>) => {
    setBookingState(prev => {
      const newState = { ...prev, ...updates, lastUpdatedAt: new Date().toISOString() };
      if (updates.errors === undefined) {
        newState.errors = {};
      }
      return newState;
    });
  }, []);

  const clearError = useCallback(
    (field: string) => {
      const newErrors = { ...bookingState.errors };
      delete newErrors[field];
      updateBookingState({ errors: newErrors });
    },
    [bookingState.errors, updateBookingState],
  );

  useEffect(() => {
    if (preselectedService && bookingState.serviceType === null) {
      // Services that default to "Once" and skip frequency selection
      const skipFrequencyServices = [
        ServiceType.MOVE_IN_OUT,
        ServiceType.POST_CONSTRUCTION,
        ServiceType.WINDOW_CLEANING,
        ServiceType.DEEP_CLEANING,
      ];

      const nextStep = skipFrequencyServices.includes(preselectedService)
        ? BookingStep.PROPERTY_DETAILS
        : BookingStep.FREQUENCY_SELECTION;

      updateBookingState({
        serviceType: preselectedService,
        cleaningFrequency: skipFrequencyServices.includes(preselectedService)
          ? CleaningFrequency.ONCE
          : null,
        currentStep: nextStep,
      });
    }
  }, [preselectedService, updateBookingState, bookingState.serviceType]);

  const handleServiceSelect = useCallback(
    (selectedServiceType: ServiceType) => {
      // Services that default to "Once" and skip frequency selection
      const skipFrequencyServices = [
        ServiceType.MOVE_IN_OUT,
        ServiceType.POST_CONSTRUCTION,
        ServiceType.WINDOW_CLEANING,
        ServiceType.DEEP_CLEANING,
      ];

      const nextStep = skipFrequencyServices.includes(selectedServiceType)
        ? BookingStep.PROPERTY_DETAILS
        : BookingStep.FREQUENCY_SELECTION;

      updateBookingState({
        serviceType: selectedServiceType,
        cleaningFrequency: skipFrequencyServices.includes(selectedServiceType)
          ? CleaningFrequency.ONCE
          : null,
        currentStep: nextStep,
      });
      clearError('serviceType');
    },
    [updateBookingState, clearError],
  );

  const handleFrequencySelect = useCallback(
    (frequency: CleaningFrequency) => {
      updateBookingState({
        cleaningFrequency: frequency,
        currentStep: BookingStep.PROPERTY_DETAILS,
      });
      clearError('cleaningFrequency');
    },
    [updateBookingState, clearError],
  );

  const handlePropertyDetailsNext = useCallback(
    (data: PropertyDetails | OfficeDetails) => {
      // For services that skip frequency selection, go directly to effort selection
      const skipFrequencyServices = [
        ServiceType.MOVE_IN_OUT,
        ServiceType.POST_CONSTRUCTION,
        ServiceType.WINDOW_CLEANING,
        ServiceType.DEEP_CLEANING,
      ];

      const nextStep =
        bookingState.serviceType && skipFrequencyServices.includes(bookingState.serviceType)
          ? BookingStep.EFFORT_SELECTION
          : BookingStep.EFFORT_SELECTION; // For regular services, go to effort selection

      updateBookingState({
        propertyDetails: data,
        sizeTier: data.sizeTier || null,
        currentStep: nextStep,
      });
      clearError('propertyDetails');
    },
    [updateBookingState, clearError, bookingState.serviceType],
  );

  const handleEffortSelect = useCallback(
    (effort: EffortLevel) => {
      updateBookingState({
        selectedEffort: effort,
        currentStep: BookingStep.SCHEDULING,
      });
      clearError('selectedEffort');
    },
    [updateBookingState, clearError],
  );

  const handleScheduleNext = useCallback(
    (
      scheduleData: BookingSchedule & {
        addOns: Record<string, number>;
        accessInstructions?: string;
      },
    ) => {
      // Create a temporary estimate with the add-ons for the estimate step
      const addOnsTotal = Object.entries(scheduleData.addOns).reduce(
        (total, [_addOnId, quantity]) => {
          // This would need to be calculated based on the add-on prices
          // For now, we'll pass the add-ons data to the estimate step
          return total + quantity * 25; // Placeholder calculation
        },
        0,
      );

      const tempEstimate: Estimate = {
        id: `temp-estimate-${Date.now()}`,
        basePrice: 100, // This should come from the effort level calculation
        duration: 120,
        frequency: bookingState.cleaningFrequency || CleaningFrequency.ONCE,
        effortLevel: bookingState.selectedEffort || EffortLevel.STANDARD,
        sizeTier: bookingState.sizeTier || PropertySizeTier.TIER_2,
        isEstimate: true,
        addOns: [], // Will be populated in the estimate step
        discounts: [],
        totalPrice: Math.round((100 + addOnsTotal) * 1.08),
        currency: 'EUR',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        breakdown: {
          baseService: 100,
          addOns: addOnsTotal,
          frequencyMultiplier: 1.0,
          discounts: 0,
          taxes: Math.round((100 + addOnsTotal) * 0.08),
          total: Math.round((100 + addOnsTotal) * 1.08),
        },
        accessInstructions: scheduleData.accessInstructions || '',
      };

      updateBookingState({
        schedule: scheduleData,
        estimate: tempEstimate,
        currentStep: BookingStep.PAYMENT,
      });
      clearError('schedule');
    },
    [
      updateBookingState,
      clearError,
      bookingState.cleaningFrequency,
      bookingState.selectedEffort,
      bookingState.sizeTier,
    ],
  );

  const goToNextStep = useCallback(() => {
    const currentStepIndex = steps.findIndex(step => step.id === bookingState.currentStep);
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      updateBookingState({ currentStep: nextStep.id });
    }
  }, [steps, bookingState, updateBookingState]);

  const goToPreviousStep = useCallback(() => {
    const currentStepIndex = steps.findIndex(step => step.id === bookingState.currentStep);

    // Special handling for frequency selection step
    if (bookingState.currentStep === BookingStep.FREQUENCY_SELECTION) {
      // Check if the service type has multiple frequency options
      const skipFrequencyServices = [
        ServiceType.MOVE_IN_OUT,
        ServiceType.POST_CONSTRUCTION,
        ServiceType.WINDOW_CLEANING,
      ];

      const hasMultipleFrequencies = bookingState.serviceType
        ? !skipFrequencyServices.includes(bookingState.serviceType)
        : false;

      if (hasMultipleFrequencies) {
        // Go to previous step (service selection)
        const prevStep = steps[currentStepIndex - 1];
        if (prevStep) {
          updateBookingState({ currentStep: prevStep.id });
        }
      } else {
        // Skip frequency step and go directly to service selection
        updateBookingState({ currentStep: BookingStep.SERVICE_SELECTION });
      }
    } else {
      // Normal step navigation
      const prevStep = steps[currentStepIndex - 1];
      if (prevStep) {
        updateBookingState({ currentStep: prevStep.id });
      }
    }
  }, [steps, bookingState.currentStep, bookingState.serviceType, updateBookingState]);

  const skipStep = useCallback(() => {
    const currentStep = steps.find(step => step.id === bookingState.currentStep);
    if (currentStep?.canSkip) {
      goToNextStep();
    }
  }, [steps, bookingState.currentStep, goToNextStep]);

  const renderCurrentStep = () => {
    const commonProps = {
      onBack: goToPreviousStep,
      onSkip: skipStep,
      errors: bookingState.errors,
      isLoading: bookingState.isSubmitting,
    };

    switch (bookingState.currentStep) {
      case BookingStep.SERVICE_SELECTION:
        return (
          <ServiceSelectionStep
            {...commonProps}
            onNext={handleServiceSelect}
            preselectedService={preselectedService || null}
          />
        );
      case BookingStep.PROPERTY_DETAILS:
        if (!bookingState.serviceType) {
          return <div>Service type not selected</div>;
        }
        return (
          <PropertyDetailsStep
            {...commonProps}
            onNext={handlePropertyDetailsNext}
            serviceType={bookingState.serviceType}
            isRegularCleaning={bookingState.cleaningFrequency !== CleaningFrequency.ONCE}
            data={bookingState.propertyDetails}
          />
        );
      case BookingStep.EFFORT_SELECTION:
        if (!bookingState.propertyDetails || !bookingState.serviceType) {
          return <div>Required data not available</div>;
        }
        return (
          <EffortSelectionStep
            {...commonProps}
            onNext={handleEffortSelect}
            propertyData={bookingState.propertyDetails}
            serviceType={bookingState.serviceType}
            selectedEffort={bookingState.selectedEffort}
            sizeTier={bookingState.sizeTier}
          />
        );
      case BookingStep.FREQUENCY_SELECTION:
        if (!bookingState.serviceType) {
          return <div>Required data not available</div>;
        }
        return (
          <FrequencySelectionStep
            {...commonProps}
            onNext={handleFrequencySelect}
            serviceType={bookingState.serviceType}
          />
        );
      case BookingStep.SCHEDULING:
        if (!bookingState.serviceType || !bookingState.cleaningFrequency) {
          return <div>Required data not available</div>;
        }
        return (
          <SchedulingStep
            {...commonProps}
            onNext={handleScheduleNext}
            serviceType={bookingState.serviceType}
            frequency={bookingState.cleaningFrequency}
            data={bookingState.schedule}
          />
        );
      case BookingStep.PAYMENT:
        return (
          <PaymentStep
            {...commonProps}
            onNext={onComplete || (() => undefined)}
            onCancel={onCancel || (() => undefined)}
            bookingData={bookingState}
          />
        );
      default:
        return (
          <Card className='w-full max-w-md mx-auto'>
            <CardHeader>
              <CardTitle className='text-center'>Step Not Found</CardTitle>
              <CardDescription className='text-center'>
                Step {bookingState.currentStep} is not implemented yet.
              </CardDescription>
            </CardHeader>
            <CardContent className='text-center'>
              <Button onClick={goToPreviousStep} variant='outline'>
                <ArrowLeft className='w-4 h-4 mr-2' />
                Go Back
              </Button>
            </CardContent>
          </Card>
        );
    }
  };

  const breadcrumbDefs = useMemo(
    () => [
      { id: BookingStep.SERVICE_SELECTION, title: 'Service Selection' },
      { id: BookingStep.FREQUENCY_SELECTION, title: 'Frequency Selection' },
      { id: BookingStep.PROPERTY_DETAILS, title: 'Property Details' },
      { id: BookingStep.EFFORT_SELECTION, title: 'Effort Level' },
      { id: BookingStep.SCHEDULING, title: 'Schedule' },
      { id: BookingStep.PAYMENT, title: 'Payment' },
    ],
    [],
  );

  if (authLoading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-[#f7f7f7] via-white to-[#f7f7f7] flex items-center justify-center p-4'>
        <motion.div
          className='text-center max-w-md'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className='relative mb-6'>
            <Loader2 className='h-12 w-12 sm:h-16 sm:w-16 animate-spin text[#ffa000] mx-auto' />
            <div className='absolute inset-0 animate-ping rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-[#ffa000]/30 mx-auto' />
          </div>
          <h3 className='text-lg sm:text-xl font-semibold text-[#001b2e] mb-2'>
            Loading Booking Flow
          </h3>
          <p className='text-sm sm:text-base text-[#001b2e]/70'>
            Please wait while we prepare your booking experience...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#f7f7f7] via-white to-[#f7f7f7] py-4 sm:py-6 lg:py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='mb-6 sm:mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Service Selection Header - Only show on service selection step */}
          {bookingState.currentStep === BookingStep.SERVICE_SELECTION && (
            <div className='text-center mb-4 sm:mb-6'>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001b2e] mb-2 sm:mb-3'>
                Choose Your Cleaning Service
              </h1>
              <p className='text-sm sm:text-base lg:text-lg text-[#001b2e]/70 max-w-2xl mx-auto'>
                Select the type that best fits your needs. We offer comprehensive solutions for both
                residential and commercial properties.
              </p>
            </div>
          )}

          {/* Breadcrumbs: show only after service selection */}
          {bookingState.currentStep !== BookingStep.SERVICE_SELECTION && (
            <nav aria-label='Breadcrumb' className='flex justify-center'>
              <ol className='flex items-center text-xs sm:text-sm text-[#001b2e]/70'>
                {breadcrumbDefs.map((bc, index) => (
                  <li key={bc.id} className='flex items-center'>
                    <span
                      className={
                        bookingState.currentStep === bc.id
                          ? 'font-semibold text-[#ffa000]'
                          : 'text-[#001b2e]/70'
                      }
                    >
                      {bc.title}
                    </span>
                    {index < breadcrumbDefs.length - 1 && (
                      <span className='mx-2 text-[#001b2e]/40'>/</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </motion.div>

        {Object.keys(bookingState.errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-4 sm:mb-6'
          >
            <Alert variant='destructive' className='border-red-200 bg-red-50'>
              <AlertCircle className='h-4 w-4 text-red-600' />
              <AlertDescription className='text-red-800'>
                <div className='font-medium mb-2'>
                  Please fix the following errors before continuing:
                </div>
                <ul className='space-y-1 text-sm'>
                  {Object.entries(bookingState.errors).map(([field, error]) => (
                    <li key={field} className='flex items-start'>
                      <span className='w-1.5 h-1.5 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0' />
                      {error}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <AnimatePresence mode='wait'>
          <motion.div
            key={bookingState.currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
