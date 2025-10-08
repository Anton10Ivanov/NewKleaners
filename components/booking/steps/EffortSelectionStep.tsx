'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Crown, Shield, Star } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  getEffortLevelInfo,
  getPriceForAllEfforts,
  getSizeTier,
  getSizeTierInfo,
  requiresCustomQuote,
} from '@/lib/pricing-calculator';
import { cn } from '@/lib/utils';
import {
  EffortLevel,
  type OfficeDetails,
  type PropertyDetails,
  type PropertySizeTier,
} from '@/types/bookingFlow';

import { EnhancedButton } from '../shared/EnhancedButton';

interface EffortSelectionStepProps {
  onNext: (effortLevel: EffortLevel) => void;
  onBack: () => void;
  propertyData: PropertyDetails | OfficeDetails;
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

  // Check if this is a home cleaning service
  const isHomeCleaning = 'bedrooms' in propertyData;

  // Use passed size tier or calculate it if not provided
  const sizeTier =
    passedSizeTier || (isHomeCleaning ? getSizeTier(propertyData.squareFootage) : null);
  const tierInfo = sizeTier ? getSizeTierInfo(sizeTier) : null;
  const needsCustomQuote = isHomeCleaning ? requiresCustomQuote(propertyData.squareFootage) : false;

  // Calculate prices for all effort levels
  const prices =
    isHomeCleaning && sizeTier
      ? getPriceForAllEfforts(sizeTier)
      : { basic: 0, standard: 0, kleaners: 0 };

  const handleEffortSelect = (effortLevel: EffortLevel) => {
    setSelectedEffortLevel(effortLevel);
  };

  const handleContinue = () => {
    if (selectedEffortLevel) {
      onNext(selectedEffortLevel);
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
        <p className='text-gray-600'>
          Select the intensity of cleaning service that best fits your needs
        </p>

        {tierInfo && (
          <div className='mt-4 inline-block bg-orange-50 text-orange-800 px-4 py-2 rounded-lg'>
            <span className='font-medium'>Your property:</span> {tierInfo.name} (
            {propertyData.squareFootage}sqm)
          </div>
        )}
      </motion.div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8'>
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
              key={effort.level}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={cn('cursor-pointer transition-all duration-300 group hover:shadow-xl', {
                  'ring-2 ring-orange-500 border-orange-500 shadow-lg':
                    selectedEffortLevel === effort.level,
                  'hover:ring-1 hover:ring-orange-500/30': selectedEffortLevel !== effort.level,
                })}
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
                <CardHeader className='text-center relative p-4 md:p-6'>
                  {effort.popular && (
                    <Badge
                      className='absolute -top-2 -left-2 z-10 bg-orange-500 text-white caption font-semibold shadow'
                      variant='default'
                    >
                      Popular
                    </Badge>
                  )}
                  <div
                    className={cn(
                      'w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full flex items-center justify-center',
                      {
                        'bg-orange-500 text-white': selectedEffortLevel === effort.level,
                        'bg-gray-100 text-gray-600 group-hover:bg-orange-100 group-hover:text-orange-600':
                          selectedEffortLevel !== effort.level,
                      },
                    )}
                  >
                    {getIcon()}
                  </div>
                  <CardTitle className='heading-5 text-gray-900 mb-2'>{effort.info.name}</CardTitle>
                  <CardDescription className='body-medium text-gray-600 mb-2'>
                    {effort.info.description}
                  </CardDescription>
                  <div className='text-2xl font-bold text-orange-600 mb-1'>€{effort.price}</div>
                  <div className='text-sm text-gray-500'>{effort.info.duration}</div>
                </CardHeader>
                <CardContent className='pt-0 p-4 md:p-6'>
                  <ul className='space-y-2'>
                    {effort.features.map((feature, featureIndex) => (
                      <li
                        key={`${effort.level}-feature-${featureIndex}`}
                        className={cn(
                          'flex items-center text-sm',
                          featureIndex === 0 ? 'font-semibold text-gray-900' : 'text-gray-600',
                        )}
                      >
                        <div className='w-1.5 h-1.5 rounded-full bg-orange-500 mr-3 flex-shrink-0' />
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
