'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/navigation';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

import { useAuth } from '@/components/providers/AuthProvider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookingStep,
  CleaningFrequency,
  type BookingFlowState,
  type BookingSchedule,
  type Estimate,
  type OfficeDetails,
  type PropertyDetails,
  type RegularityPackage,
  type ServiceType,
} from '@/types/bookingFlow';

import { EstimateStep } from './components/booking/steps/EstimateStep';
import { FrequencySelectionStep } from './components/booking/steps/FrequencySelectionStep';
import { PackageSelectionStep } from './components/booking/steps/PackageSelectionStep';
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
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Initialize booking state with proper typing
  const [bookingState, setBookingState] = useState<BookingFlowState>({
    currentStep: preselectedService
      ? BookingStep.FREQUENCY_SELECTION
      : BookingStep.SERVICE_SELECTION,
    serviceType: preselectedService || null,
    cleaningFrequency: null,
    propertyDetails: null,
    estimate: null,
    selectedPackage: null,
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

  // Define steps with proper typing and metadata
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
        id: BookingStep.ESTIMATE,
        title: 'Estimate',
        description: 'Get your cleaning estimate',
        isRequired: true,
        canSkip: false,
      },
      {
        id: BookingStep.PACKAGE_SELECTION,
        title: 'Package',
        description: 'Select your package (if regular)',
        isRequired: false,
        canSkip: true,
        condition: (state: BookingFlowState) =>
          state.cleaningFrequency !== CleaningFrequency.ONE_TIME,
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
        description: 'Complete your booking',
        isRequired: true,
        canSkip: false,
      },
    ],
    [],
  );

  // Enhanced state update function with validation and error handling
  const updateBookingState = useCallback((updates: Partial<BookingFlowState>) => {
    setBookingState(prev => {
      const newState = {
        ...prev,
        ...updates,
        lastUpdatedAt: new Date().toISOString(),
      };

      // Clear errors when updating state
      if (updates.errors === undefined) {
        newState.errors = {};
      }

      return newState;
    });
  }, []);

  // Clear error function
  const clearError = useCallback(
    (field: string) => {
      const newErrors = { ...bookingState.errors };
      delete newErrors[field];
      updateBookingState({ errors: newErrors });
    },
    [bookingState.errors, updateBookingState],
  );

  // Handle preselected service from URL
  useEffect(() => {
    if (preselectedService && bookingState.serviceType === null) {
      updateBookingState({
        serviceType: preselectedService,
        currentStep: BookingStep.FREQUENCY_SELECTION,
      });
    }
  }, [preselectedService, updateBookingState, bookingState.serviceType]);

  // Step navigation handlers with proper validation
  const handleServiceSelect = useCallback(
    (selectedServiceType: ServiceType) => {
      updateBookingState({
        serviceType: selectedServiceType,
        currentStep: BookingStep.FREQUENCY_SELECTION,
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
      updateBookingState({
        propertyDetails: data,
        currentStep: BookingStep.ESTIMATE,
      });
      clearError('propertyDetails');
    },
    [updateBookingState, clearError],
  );

  const handleEstimateNext = useCallback(
    (estimateData: Estimate) => {
      const nextStep =
        bookingState.cleaningFrequency === CleaningFrequency.ONE_TIME
          ? BookingStep.SCHEDULING
          : BookingStep.PACKAGE_SELECTION;

      updateBookingState({
        estimate: estimateData,
        currentStep: nextStep,
      });
      clearError('estimate');
    },
    [bookingState.cleaningFrequency, updateBookingState, clearError],
  );

  const handlePackageSelect = useCallback(
    (packageType: RegularityPackage) => {
      updateBookingState({
        selectedPackage: packageType,
        currentStep: BookingStep.SCHEDULING,
      });
      clearError('selectedPackage');
    },
    [updateBookingState, clearError],
  );

  const handleScheduleSelect = useCallback(
    (schedule: BookingSchedule) => {
      // Check authentication before proceeding to payment
      if (!user) {
        const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
        router.push(`/login?returnUrl=${returnUrl}`);
        return;
      }

      updateBookingState({
        schedule,
        currentStep: BookingStep.PAYMENT,
      });
      clearError('schedule');
    },
    [user, router, updateBookingState, clearError],
  );

  // Navigation functions
  const goToNextStep = useCallback(() => {
    const currentStepIndex = steps.findIndex(step => step.id === bookingState.currentStep);
    const nextStep = steps[currentStepIndex + 1];

    if (nextStep && (!nextStep.condition || nextStep.condition(bookingState))) {
      updateBookingState({ currentStep: nextStep.id });
    }
  }, [steps, bookingState, updateBookingState]);

  const goToPreviousStep = useCallback(() => {
    const currentStepIndex = steps.findIndex(step => step.id === bookingState.currentStep);
    const prevStep = steps[currentStepIndex - 1];

    if (prevStep) {
      updateBookingState({ currentStep: prevStep.id });
    }
  }, [steps, bookingState, updateBookingState]);

  // Skip step function
  const skipStep = useCallback(() => {
    const currentStep = steps.find(step => step.id === bookingState.currentStep);
    if (currentStep?.canSkip) {
      goToNextStep();
    }
  }, [steps, bookingState.currentStep, goToNextStep]);

  // Render current step component with proper error handling
  const renderCurrentStep = () => {
    const commonProps = {
      onNext: () => {
        // Step-specific next logic will be handled by individual step components
      },
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

      case BookingStep.FREQUENCY_SELECTION:
        if (!bookingState.serviceType) {
          return <div>Service type not selected</div>;
        }
        return (
          <FrequencySelectionStep
            {...commonProps}
            onNext={handleFrequencySelect}
            serviceType={bookingState.serviceType}
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
            isRegularCleaning={bookingState.cleaningFrequency !== CleaningFrequency.ONE_TIME}
            data={bookingState.propertyDetails}
          />
        );

      case BookingStep.ESTIMATE:
        if (
          !bookingState.propertyDetails ||
          !bookingState.serviceType ||
          !bookingState.cleaningFrequency
        ) {
          return <div>Required data not available</div>;
        }
        return (
          <EstimateStep
            {...commonProps}
            onNext={handleEstimateNext}
            propertyData={bookingState.propertyDetails}
            serviceType={bookingState.serviceType}
            frequency={bookingState.cleaningFrequency}
            data={bookingState.estimate}
          />
        );

      case BookingStep.PACKAGE_SELECTION:
        if (!bookingState.cleaningFrequency) {
          return <div>Cleaning frequency not selected</div>;
        }
        return (
          <PackageSelectionStep
            {...commonProps}
            onNext={handlePackageSelect}
            frequency={bookingState.cleaningFrequency}
            selectedPackage={bookingState.selectedPackage}
          />
        );

      case BookingStep.SCHEDULING:
        if (
          !bookingState.estimate ||
          !bookingState.serviceType ||
          !bookingState.cleaningFrequency
        ) {
          return <div>Required data not available</div>;
        }
        return (
          <SchedulingStep
            {...commonProps}
            onNext={handleScheduleSelect}
            estimate={bookingState.estimate}
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

  // Get visible steps for display
  const visibleSteps = useMemo(
    () =>
      steps.filter(step => (preselectedService ? step.id !== BookingStep.SERVICE_SELECTION : true)),
    [steps, preselectedService],
  );

  // Show loading state while checking authentication
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
            <Loader2 className='h-12 w-12 sm:h-16 sm:w-16 animate-spin text-[#ffa000] mx-auto' />
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
        {/* Header with Progress */}
        <motion.div
          className='mb-6 sm:mb-8'
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className='text-center mb-6 sm:mb-8'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001b2e] mb-2 sm:mb-3'>
              Book Your Cleaning Service
            </h1>
            <p className='text-sm sm:text-base lg:text-lg text-[#001b2e]/70 max-w-2xl mx-auto'>
              Complete your booking in just a few simple steps
            </p>
          </div>

          {/* Step Indicators */}
          <div className='flex items-center justify-center overflow-x-auto pb-2'>
            <div className='flex items-center bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg border border-[#001b2e]/10 min-w-fit'>
              {visibleSteps.map((step, index) => (
                <div key={step.id} className='flex items-center'>
                  <motion.div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      bookingState.currentStep >= step.id
                        ? 'bg-gradient-to-r from-[#ffa000] to-[#ffa000]/90 text-white shadow-lg'
                        : 'bg-[#001b2e]/10 text-[#001b2e]/60'
                    }`}
                    animate={{
                      scale: bookingState.currentStep === step.id ? 1.05 : 1,
                      boxShadow:
                        bookingState.currentStep === step.id
                          ? '0 0 20px rgba(255, 160, 0, 0.3)'
                          : 'none',
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {bookingState.currentStep > step.id ? (
                      <CheckCircle className='w-4 h-4 sm:w-5 sm:h-5' />
                    ) : (
                      index + 1
                    )}
                  </motion.div>
                  {index < visibleSteps.length - 1 && (
                    <motion.div
                      className={`w-8 sm:w-12 h-0.5 mx-2 rounded-full transition-all duration-500 ${
                        bookingState.currentStep > step.id
                          ? 'bg-gradient-to-r from-[#ffa000] to-[#ffa000]/80'
                          : 'bg-[#001b2e]/20'
                      }`}
                      initial={{ width: 0 }}
                      animate={{
                        width: window.innerWidth < 640 ? '32px' : '48px',
                        opacity: bookingState.currentStep > step.id ? 1 : 0.3,
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Labels */}
          <div className='flex justify-center mt-4 sm:mt-6'>
            <div className='hidden sm:flex items-center space-x-8 lg:space-x-20'>
              {visibleSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className='text-center max-w-20 lg:max-w-24'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`text-xs lg:text-sm font-medium transition-colors duration-300 ${
                      bookingState.currentStep >= step.id ? 'text-[#ffa000]' : 'text-[#001b2e]/60'
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-xs text-[#001b2e]/50 mt-1 transition-colors duration-300 ${
                      bookingState.currentStep >= step.id
                        ? 'text-[#ffa000]/70'
                        : 'text-[#001b2e]/40'
                    }`}
                  >
                    {step.description}
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Mobile step label - show current step only */}
            <div className='sm:hidden text-center'>
              <motion.div
                key={bookingState.currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className='text-sm font-medium text-[#ffa000]'>
                  {visibleSteps.find(step => step.id === bookingState.currentStep)?.title}
                </div>
                <div className='text-xs text-[#001b2e]/60 mt-1'>
                  {visibleSteps.find(step => step.id === bookingState.currentStep)?.description}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
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

        {/* Current Step Content */}
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
