'use client';

import React from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { CleaningFrequency, ServiceType } from '@/types/bookingFlow';

interface FrequencySelectionStepProps {
  onNext: (frequency: CleaningFrequency) => void;
  onBack: () => void;
  onSkip?: () => void;
  serviceType: ServiceType;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const frequencies = [
  {
    type: CleaningFrequency.ONCE,
    title: 'Once',
    shortTitle: 'Once',
    description: 'Perfect for special occasions or when you need a deep clean',
    features: ['Deep cleaning', 'Flexible scheduling', 'No commitment'],
    discount: null,
    popular: false,
  },
  {
    type: CleaningFrequency.WEEKLY,
    title: 'Weekly',
    shortTitle: 'Weekly',
    description: 'Regular maintenance to keep your space consistently clean',
    features: [
      'Consistent cleanliness maintained',
      'Reduced allergens and bacteria',
      'Time-saving for busy households',
      'Professional maintenance schedule',
    ],
    discount: 15,
    popular: true,
  },
  {
    type: CleaningFrequency.BI_WEEKLY,
    title: 'Bi-Weekly',
    shortTitle: 'Bi-wk',
    description: 'Every other week cleaning for moderate maintenance',
    features: [
      'Balanced maintenance schedule',
      'Cost-effective solution',
      'Regular deep cleaning included',
      'Flexible timing options',
    ],
    discount: 10,
    popular: false,
  },
  {
    type: CleaningFrequency.MONTHLY,
    title: 'Monthly',
    shortTitle: 'Monthly',
    description: 'Monthly deep cleaning for light maintenance',
    features: ['Monthly deep clean', 'Flexible timing', 'Budget friendly'],
    discount: 5,
    popular: false,
  },
  {
    type: CleaningFrequency.CUSTOM,
    title: 'Custom',
    shortTitle: 'Custom',
    description: 'Create a personalized cleaning schedule that fits your needs',
    features: ['Fully customizable', 'Flexible timing', 'Tailored service'],
    discount: null,
    popular: false,
  },
];

export const FrequencySelectionStep: React.FC<FrequencySelectionStepProps> = ({
  onNext,
  onBack,
  serviceType,
  errors,
  isLoading = false,
}) => {
  const [selectedFrequency, setSelectedFrequency] = React.useState<CleaningFrequency | null>(null);

  const handleFrequencySelect = (frequency: CleaningFrequency) => {
    setSelectedFrequency(frequency);
    // No automatic progression - user must click Continue
  };

  const handleContinue = () => {
    if (selectedFrequency) {
      onNext(selectedFrequency);
    }
  };

  const getServiceContext = () => {
    switch (serviceType) {
      case ServiceType.HOME_CLEANING:
        return {
          title: 'How often do you need home cleaning?',
        };
      case ServiceType.OFFICE_CLEANING:
        return {
          title: "What's your office cleaning schedule?",
        };
      case ServiceType.DEEP_CLEANING:
        return {
          title: 'When do you need deep cleaning?',
        };
      case ServiceType.MOVE_IN_OUT:
        return {
          title: 'Move In/Out Cleaning',
        };
      case ServiceType.POST_CONSTRUCTION:
        return {
          title: 'Construction Cleaning',
        };
      case ServiceType.WINDOW_CLEANING:
        return {
          title: 'Window Cleaning',
        };
      default:
        return {
          title: 'How often do you need cleaning?',
          subtitle: 'Choose the frequency that works best for you',
        };
    }
  };

  const getAvailableFrequencies = () => {
    switch (serviceType) {
      case ServiceType.HOME_CLEANING:
        return frequencies.filter(
          f =>
            f.type === CleaningFrequency.ONCE ||
            f.type === CleaningFrequency.WEEKLY ||
            f.type === CleaningFrequency.BI_WEEKLY,
        );
      case ServiceType.OFFICE_CLEANING:
        return frequencies.filter(
          f =>
            f.type === CleaningFrequency.ONCE ||
            f.type === CleaningFrequency.WEEKLY ||
            f.type === CleaningFrequency.BI_WEEKLY ||
            f.type === CleaningFrequency.CUSTOM,
        );
      case ServiceType.DEEP_CLEANING:
      case ServiceType.MOVE_IN_OUT:
      case ServiceType.POST_CONSTRUCTION:
      case ServiceType.WINDOW_CLEANING:
        return frequencies.filter(f => f.type === CleaningFrequency.ONCE);
      default:
        return frequencies;
    }
  };

  const context = getServiceContext();
  const availableFrequencies = getAvailableFrequencies();

  // Set default selection based on service type
  React.useEffect(() => {
    if (!selectedFrequency) {
      if (
        serviceType === ServiceType.DEEP_CLEANING ||
        serviceType === ServiceType.MOVE_IN_OUT ||
        serviceType === ServiceType.POST_CONSTRUCTION ||
        serviceType === ServiceType.WINDOW_CLEANING
      ) {
        // For one-time services, select "Once"
        setSelectedFrequency(CleaningFrequency.ONCE);
      } else if (availableFrequencies.some(f => f.type === CleaningFrequency.WEEKLY)) {
        // For recurring services, default to "Weekly" (most popular)
        setSelectedFrequency(CleaningFrequency.WEEKLY);
      } else if (availableFrequencies.length > 0) {
        // Fallback to first available option
        const firstFrequency = availableFrequencies[0];
        if (firstFrequency) {
          setSelectedFrequency(firstFrequency.type);
        }
      }
    }
  }, [selectedFrequency, serviceType, availableFrequencies]);

  // Auto-select if only one frequency option is available - but don't auto-proceed
  React.useEffect(() => {
    if (availableFrequencies.length === 1 && !selectedFrequency) {
      const singleFrequency = availableFrequencies[0]?.type;
      if (singleFrequency) {
        setSelectedFrequency(singleFrequency);
        // No automatic progression - user must click Continue
      }
    }
  }, [availableFrequencies, selectedFrequency, serviceType]);

  return (
    <div className='w-full max-w-4xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='text-center mb-10'
      >
        <div className='space-y-4'>
          <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-[#001b2e] tracking-tight leading-tight'>
            {context.title}
          </h2>
          <div className='w-24 h-1 bg-gradient-to-r from-[#ffa000] to-[#ff8c00] rounded-full mx-auto' />
          <p className='text-base sm:text-lg lg:text-xl text-[#001b2e]/70 max-w-3xl mx-auto leading-relaxed font-medium'>
            {context.subtitle}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className='mb-8'
      >
        {/* Segmented Control */}
        <div className='flex justify-center mb-10'>
          <div className='inline-flex bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-2 shadow-lg border border-gray-200 gap-1'>
            {availableFrequencies.map(frequency => {
              const isSelected = selectedFrequency === frequency.type;

              return (
                <button
                  key={frequency.type}
                  onClick={() => handleFrequencySelect(frequency.type)}
                  className={`
                    relative px-6 py-5 text-sm font-medium transition-all duration-300 ease-out rounded-lg
                    ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#ffa000] to-[#ff8c00] text-white shadow-lg transform scale-105 border border-[#ffa000]/20'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/80 hover:shadow-md hover:scale-102'
                    }
                    min-w-[90px] sm:min-w-[120px]
                    group
                  `}
                >
                  <div className='flex flex-col items-center space-y-2'>
                    <span
                      className={`text-sm font-bold tracking-wide ${
                        isSelected
                          ? 'text-white drop-shadow-sm'
                          : 'text-gray-800 group-hover:text-gray-900'
                      }`}
                    >
                      <span className='sm:hidden'>{frequency.shortTitle}</span>
                      <span className='hidden sm:inline'>{frequency.title}</span>
                    </span>
                    {frequency.discount && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'text-white bg-white/30 backdrop-blur-sm border border-white/40'
                            : 'text-green-700 bg-green-200 group-hover:bg-green-300 border border-green-300'
                        }`}
                      >
                        -{frequency.discount}%
                      </span>
                    )}
                    {frequency.popular && (
                      <span
                        className={`absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full font-normal shadow-md ${
                          isSelected
                            ? 'bg-white text-red-600 border border-red-200'
                            : 'bg-red-500 text-white'
                        }`}
                      >
                        BEST
                      </span>
                    )}
                  </div>

                  {/* Subtle glow effect for selected state */}
                  {isSelected && (
                    <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-[#ffa000]/20 to-[#ff8c00]/20 blur-sm -z-10' />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Frequency Details */}
        {selectedFrequency && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-xl p-10 relative overflow-hidden mt-8'
          >
            {/* Background decoration */}
            <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ffa000]/5 to-transparent rounded-full -translate-y-16 translate-x-16' />
            <div className='absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#ffa000]/5 to-transparent rounded-full translate-y-12 -translate-x-12' />

            {(() => {
              const frequency = availableFrequencies.find(f => f.type === selectedFrequency);
              if (!frequency) {
                return null;
              }

              return (
                <div className='text-center space-y-8 relative z-10'>
                  {frequency.features && frequency.features.length > 0 && (
                    <div className='space-y-6'>
                      <h4 className='text-lg font-semibold text-[#001b2e] mb-6 flex items-center justify-center gap-2'>
                        <div className='w-2 h-2 bg-[#ffa000] rounded-full' />
                        What you get:
                      </h4>
                      <ul className='space-y-4 text-left max-w-lg mx-auto'>
                        {frequency.features.map((feature, featureIndex) => (
                          <motion.li
                            key={`${frequency.type}-feature-${featureIndex}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            className='flex items-start text-base text-[#001b2e]/80 group'
                          >
                            <div className='w-2 h-2 bg-gradient-to-r from-[#ffa000] to-[#ff8c00] rounded-full mr-4 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200' />
                            <span className='group-hover:text-[#001b2e] transition-colors duration-200'>
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {frequency.discount && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className='bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm mt-6'
                    >
                      <div className='flex items-center justify-center gap-3'>
                        <span className='text-2xl'>🎉</span>
                        <p className='text-base font-semibold text-green-800'>
                          Save{' '}
                          <span className='text-green-600 font-bold'>{frequency.discount}%</span>{' '}
                          with {frequency.title.toLowerCase()} cleaning!
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </motion.div>

      {errors?.['cleaningFrequency'] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-10 text-center'
        >
          <div className='inline-flex items-center px-6 py-4 bg-red-50 border border-red-200 rounded-2xl shadow-sm'>
            <div className='w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse' />
            <p className='text-sm text-red-700 font-semibold'>{errors['cleaningFrequency']}</p>
          </div>
        </motion.div>
      )}

      <motion.div
        className='flex flex-col sm:flex-row justify-between items-center gap-8 mt-12'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          variant='ghost'
          onClick={onBack}
          className='text-[#001b2e]/60 hover:text-[#001b2e] hover:bg-[#001b2e]/5 h-12 px-8 order-2 sm:order-1 font-medium transition-all duration-200 hover:scale-105 rounded-xl'
        >
          ← Back to Service Selection
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!selectedFrequency || isLoading}
          className='px-10 h-12 bg-gradient-to-r from-[#ffa000] to-[#ff8c00] hover:from-[#ff8c00] hover:to-[#ff7c00] text-white font-semibold order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:hover:scale-100 rounded-xl'
        >
          {isLoading ? (
            <div className='flex items-center gap-2'>
              <div className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
              Processing...
            </div>
          ) : (
            'Continue'
          )}
        </Button>
      </motion.div>
    </div>
  );
};
