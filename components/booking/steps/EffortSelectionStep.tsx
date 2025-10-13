'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Crown, Shield, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getBusinessPricingBreakdown,
  getEffortLevelInfo,
  getPriceForAllEfforts,
  getSizeTier,
  getSizeTierInfo,
  requiresCustomQuote,
} from '@/lib/pricing-calculator';
import { cn } from '@/lib/utils';
import {
  EffortLevel,
  type BusinessDetails,
  type OfficeDetails,
  type PropertyDetails,
  type PropertySizeTier,
} from '@/types/bookingFlow';

import { EnhancedButton } from '../shared/EnhancedButton';

interface EffortSelectionStepProps {
  onNext: (effortLevel: EffortLevel, contractType?: string) => void;
  onBack: () => void;
  propertyData: PropertyDetails | OfficeDetails | BusinessDetails;
  serviceType: string;
  selectedEffort?: EffortLevel | null;
  sizeTier?: PropertySizeTier | null;
  isLoading?: boolean;
}

export const EffortSelectionStep: React.FC<EffortSelectionStepProps> = ({
  onNext,
  onBack,
  propertyData,
  serviceType: _serviceType,
  selectedEffort,
  sizeTier: passedSizeTier,
  isLoading = false,
}) => {
  const [selectedEffortLevel, setSelectedEffortLevel] = useState<EffortLevel | null>(
    selectedEffort || null,
  );
  const [selectedContractType, setSelectedContractType] = useState<string>('6-month');

  // Check if this is a business cleaning service
  const isBusinessCleaning = 'businessType' in propertyData;
  const isHomeCleaning = 'bedrooms' in propertyData;

  // Use passed size tier or calculate it if not provided
  const sizeTier =
    passedSizeTier || (isHomeCleaning ? getSizeTier(propertyData.squareFootage) : null);
  const needsCustomQuote = isHomeCleaning ? requiresCustomQuote(propertyData.squareFootage) : false;

  // Get tier info for display
  const tierInfo = sizeTier ? getSizeTierInfo(sizeTier) : null;

  // Get business tier info for business cleaning
  const businessTierInfo = isBusinessCleaning
    ? (() => {
        const squareFootage = propertyData.squareFootage;
        if (squareFootage <= 150) {
          return { name: 'Small Business', range: '50-150sqm' };
        }
        if (squareFootage <= 300) {
          return { name: 'Medium Business', range: '150-300sqm' };
        }
        if (squareFootage <= 500) {
          return { name: 'Large Business', range: '300-500sqm' };
        }
        return { name: 'Enterprise', range: '500+sqm' };
      })()
    : null;

  // Calculate prices for all effort levels
  const prices = (() => {
    if (isHomeCleaning && sizeTier) {
      return getPriceForAllEfforts(sizeTier);
    }

    if (isBusinessCleaning && 'businessType' in propertyData) {
      // Calculate business pricing for each effort level
      const businessData = propertyData as BusinessDetails;
      const basicPrice = getBusinessPricingBreakdown(businessData, EffortLevel.BASIC);
      const standardPrice = getBusinessPricingBreakdown(businessData, EffortLevel.STANDARD);
      const kleanersPrice = getBusinessPricingBreakdown(businessData, EffortLevel.KLEANERS);

      return {
        basic: basicPrice.finalPrice,
        standard: standardPrice.finalPrice,
        kleaners: kleanersPrice.finalPrice,
      };
    }

    return { basic: 0, standard: 0, kleaners: 0 };
  })();

  const handleEffortSelect = (effortLevel: EffortLevel) => {
    setSelectedEffortLevel(effortLevel);
  };

  const handleContinue = () => {
    if (selectedEffortLevel) {
      onNext(selectedEffortLevel, isBusinessCleaning ? selectedContractType : undefined);
    }
  };

  // Custom quote flow for large properties
  if (needsCustomQuote) {
    return (
      <div className='w-full max-w-4xl mx-auto px-2 sm:px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center mb-8'
        >
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Custom Quote Required</h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Properties over 150sqm require a personal assessment for accurate pricing.
          </p>
        </motion.div>

        <Card className='max-w-2xl mx-auto'>
          <CardHeader className='text-center'>
            <CardTitle className='text-2xl'>Personal Assessment</CardTitle>
            <CardDescription className='text-lg'>
              Large properties need individual attention
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='bg-blue-50 p-6 rounded-lg'>
              <h3 className='font-semibold text-lg mb-3'>What you get:</h3>
              <ul className='space-y-2 text-gray-700'>
                <li>• 30-minute on-site assessment</li>
                <li>• Personalized cleaning plan</li>
                <li>• Priority scheduling</li>
                <li>• €30 estimation fee (deducted from final price)</li>
              </ul>
            </div>

            <div className='text-center'>
              <Button
                onClick={() => {
                  // TODO: Redirect to scheduling with custom quote note
                  // For now, just log
                  // console.log('Schedule assessment for custom quote');
                }}
                className='px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              >
                Schedule Assessment
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className='text-center mt-8'>
          <Button
            type='button'
            variant='ghost'
            onClick={onBack}
            className='text-gray-500 hover:text-gray-700'
          >
            ← Back
          </Button>
        </div>
      </div>
    );
  }

  const effortLevels = [
    {
      level: EffortLevel.BASIC,
      info: getEffortLevelInfo(EffortLevel.BASIC),
      price: prices.basic,
      features: [
        'Basic vacuuming and mopping',
        'Surface cleaning',
        'Bathroom sanitization',
        'Kitchen cleaning',
        'Trash removal',
      ],
    },
    {
      level: EffortLevel.STANDARD,
      info: getEffortLevelInfo(EffortLevel.STANDARD),
      price: prices.standard,
      features: [
        'Everything in BASIC',
        'Deep cleaning bathrooms',
        'Appliance cleaning',
        'Window cleaning (interior)',
        'Baseboard cleaning',
        'Light fixture cleaning',
        'Cabinet cleaning',
        'Detailed dusting',
        'Floor polishing',
        'Mirror cleaning',
        'Door cleaning',
      ],
      popular: true,
    },
    {
      level: EffortLevel.KLEANERS,
      info: getEffortLevelInfo(EffortLevel.KLEANERS),
      price: prices.kleaners,
      features: [
        'Everything in STANDARD',
        'Premium deep cleaning',
        'Cabinet interior cleaning',
        'Appliance deep cleaning',
        'Premium finishing touches',
        'Luxury experience',
      ],
    },
  ];

  return (
    <div className='w-full max-w-6xl mx-auto px-2 sm:px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-8'
      >
        <h2 className='heading-2 text-gray-900 mb-4'>Choose Your Cleaning Level</h2>

        {(tierInfo || businessTierInfo) && (
          <div className='mt-4 inline-block bg-orange-50 text-orange-800 px-4 py-2 rounded-lg'>
            <span className='font-medium'>
              {isBusinessCleaning ? 'Your business:' : 'Your property:'}
            </span>{' '}
            {isBusinessCleaning ? businessTierInfo?.name : tierInfo?.name} (
            {propertyData.squareFootage}sqm)
          </div>
        )}
      </motion.div>

      {/* Contract Selection for Business Cleaning */}
      {isBusinessCleaning && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mb-8'
        >
          <div className='text-center mb-4'>
            <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2'>
              Contract Length
            </h3>
          </div>

          <div className='grid grid-cols-3 gap-2 sm:gap-4 max-w-4xl mx-auto'>
            {[
              {
                value: 'one-time',
                label: 'One-time',
                description: 'Pay per cleaning',
                badge: null,
                borderColor: 'border-gray-200',
                bgColor: 'bg-white',
                color: 'text-gray-700',
              },
              {
                value: '6-month',
                label: '6-month',
                description: '10% discount',
                badge: null,
                borderColor: 'border-orange-500',
                bgColor: 'bg-orange-50',
                color: 'text-orange-700',
              },
              {
                value: '12-month',
                label: '12-month',
                description: '20% discount',
                badge: null,
                borderColor: 'border-orange-500',
                bgColor: 'bg-orange-50',
                color: 'text-orange-700',
              },
            ].map((contract, index) => (
              <motion.div
                key={contract.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 relative ${
                    selectedContractType === contract.value
                      ? 'ring-2 ring-orange-500 border-orange-500 shadow-lg'
                      : 'hover:ring-1 hover:ring-orange-500/30'
                  }`}
                  onClick={() => setSelectedContractType(contract.value)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedContractType(contract.value);
                    }
                  }}
                >
                  {contract.badge && (
                    <div className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                      {contract.badge}
                    </div>
                  )}
                  <CardContent className='p-2 sm:p-4 text-center'>
                    <div className='font-semibold text-xs sm:text-base mb-1 sm:mb-2'>
                      {contract.label}
                    </div>
                    <div className='text-xs sm:text-sm text-gray-600'>{contract.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Primary Effort Level Selection - Horizontal Scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mb-8'
      >
        <div className='text-center mb-6'>
          <p className='text-gray-600'>Swipe to explore options</p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className='relative'>
          <div className='horizontal-scroll-container flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-6 space-x-4'>
            {effortLevels.map((effort, index) => {
              const getIcon = () => {
                switch (effort.level) {
                  case EffortLevel.BASIC:
                    return <Shield className='w-6 h-6' />;
                  case EffortLevel.STANDARD:
                    return <Star className='w-6 h-6' />;
                  case EffortLevel.KLEANERS:
                    return <Crown className='w-6 h-6' />;
                  default:
                    return <Shield className='w-6 h-6' />;
                }
              };

              return (
                <motion.div
                  key={`scroll-${effort.level}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className='flex-shrink-0 w-72 sm:w-72 md:w-80 lg:w-96 snap-center'
                >
                  <Card
                    className={cn(
                      'cursor-pointer transition-all duration-300 group hover:shadow-xl h-full border-2 border-orange-200',
                      {
                        'ring-2 ring-orange-500 border-orange-500 shadow-lg':
                          selectedEffortLevel === effort.level,
                        'hover:ring-1 hover:ring-orange-500/30 hover:border-orange-300':
                          selectedEffortLevel !== effort.level,
                      },
                    )}
                    onClick={() => handleEffortSelect(effort.level)}
                    role='button'
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleEffortSelect(effort.level);
                      }
                    }}
                    aria-pressed={selectedEffortLevel === effort.level}
                    aria-label={`Select ${effort.info.name} cleaning level`}
                  >
                    <CardHeader className='text-center relative p-4 sm:p-6'>
                      {effort.popular && (
                        <Badge
                          className='absolute -top-2 -left-2 z-10 bg-orange-500 text-white text-xs font-semibold shadow'
                          variant='default'
                        >
                          Popular
                        </Badge>
                      )}

                      <div
                        className={cn(
                          'w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center',
                          {
                            'bg-orange-500 text-white': selectedEffortLevel === effort.level,
                            'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600':
                              selectedEffortLevel !== effort.level,
                          },
                        )}
                      >
                        {getIcon()}
                      </div>

                      <CardTitle className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
                        {effort.info.name}
                      </CardTitle>

                      <div className='text-2xl sm:text-3xl font-bold text-orange-600 mb-2'>
                        €{effort.price}
                      </div>

                      <div className='text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4'>
                        {effort.info.duration}
                      </div>

                      <CardDescription className='text-sm sm:text-base text-gray-600 mb-3 sm:mb-4'>
                        {effort.info.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className='pt-0 p-4 sm:p-6'>
                      <ul className='space-y-2 sm:space-y-3'>
                        {effort.features.map((feature, featureIndex) => (
                          <li
                            key={`scroll-${effort.level}-feature-${feature}`}
                            className={cn(
                              'flex items-center text-xs sm:text-sm',
                              featureIndex === 0 ? 'font-semibold text-gray-900' : 'text-gray-600',
                            )}
                          >
                            <div className='w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 mr-2 sm:mr-3 flex-shrink-0' />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Gradient Fade Edges */}
          <div className='absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10' />
          <div className='absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10' />
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className='flex flex-col sm:flex-row gap-3 mt-8'>
        <EnhancedButton
          onClick={handleContinue}
          disabled={!selectedEffortLevel || isLoading}
          className='flex-1'
          size='lg'
          loading={isLoading}
        >
          Continue to Schedule
        </EnhancedButton>

        <Button variant='outline' onClick={onBack} className='flex-1 sm:flex-none'>
          Back
        </Button>
      </div>
    </div>
  );
};
