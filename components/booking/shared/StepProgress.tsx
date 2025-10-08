'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { BookingStep } from '@/types/bookingFlow';

interface StepProgressProps {
  currentStep: BookingStep;
  onStepClick?: (step: BookingStep) => void;
  className?: string;
}

const stepConfig = [
  { id: BookingStep.SERVICE_SELECTION, title: 'Service', shortTitle: 'Service' },
  { id: BookingStep.FREQUENCY_SELECTION, title: 'Frequency', shortTitle: 'Frequency' },
  { id: BookingStep.PROPERTY_DETAILS, title: 'Property', shortTitle: 'Property' },
  { id: BookingStep.EFFORT_SELECTION, title: 'Effort', shortTitle: 'Effort' },
  { id: BookingStep.SCHEDULING, title: 'Schedule', shortTitle: 'Schedule' },
  { id: BookingStep.ESTIMATE, title: 'Estimate', shortTitle: 'Estimate' },
  { id: BookingStep.PAYMENT, title: 'Payment', shortTitle: 'Payment' },
];

export const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  onStepClick,
  className,
}) => {
  const currentStepIndex = stepConfig.findIndex(step => step.id === currentStep);

  return (
    <div className={cn('flex items-center justify-between mb-8', className)}>
      {stepConfig.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isUpcoming = index > currentStepIndex;
        const isClickable = onStepClick && (isCompleted || isCurrent);

        return (
          <React.Fragment key={step.id}>
            {/* Step Circle */}
            <motion.div
              className={cn(
                'relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                {
                  'bg-orange-500 border-orange-500 text-white': isCompleted || isCurrent,
                  'bg-white border-gray-300 text-gray-500': isUpcoming,
                  'cursor-pointer hover:scale-105': isClickable,
                  'cursor-default': !isClickable,
                },
              )}
              onClick={() => isClickable && onStepClick(step.id)}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
            >
              {isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <Check className='w-5 h-5' />
                </motion.div>
              ) : (
                <span className='text-sm font-semibold'>{index + 1}</span>
              )}
            </motion.div>

            {/* Step Title */}
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2'>
              <span
                className={cn('text-xs font-medium transition-colors duration-300', {
                  'text-orange-600': isCompleted || isCurrent,
                  'text-gray-500': isUpcoming,
                })}
              >
                {step.shortTitle}
              </span>
            </div>

            {/* Connector Line */}
            {index < stepConfig.length - 1 && (
              <div className='flex-1 mx-2 h-0.5 bg-gray-200 relative'>
                <motion.div
                  className='absolute top-0 left-0 h-full bg-orange-500'
                  initial={{ width: 0 }}
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
