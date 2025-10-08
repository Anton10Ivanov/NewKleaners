'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NumberStepper } from '@/components/ui/number-stepper';
import {
  getPropertyConstraints,
  getSizeTier,
  validatePropertyDetails,
} from '@/lib/pricing-calculator';
import {
  ServiceType,
  type OfficeDetails,
  type PropertyDetails,
  type PropertySizeTier,
} from '@/types/bookingFlow';

import { EnhancedButton } from '../shared/EnhancedButton';

// Import pricing calculator

interface PropertyDetailsStepProps {
  onNext: (data: PropertyDetails | OfficeDetails) => void;
  onBack: () => void;
  onSkip?: () => void;
  serviceType: ServiceType;
  isRegularCleaning: boolean;
  data?: PropertyDetails | OfficeDetails | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  onNext,
  onBack,
  serviceType,
  isRegularCleaning: _isRegularCleaning,
  data,
  errors,
  isLoading = false,
}) => {
  const getDefaultValues = (serviceType: ServiceType): Partial<PropertyDetails | OfficeDetails> => {
    switch (serviceType) {
      case ServiceType.DEEP_CLEANING:
        return {
          bedrooms: 2,
          bathrooms: 2,
          squareFootage: 100,
        };
      case ServiceType.MOVE_IN_OUT:
        return {
          bedrooms: 2,
          bathrooms: 1,
          squareFootage: 80,
        };
      case ServiceType.POST_CONSTRUCTION:
        return {
          bedrooms: 2,
          bathrooms: 2,
          squareFootage: 120,
        };
      case ServiceType.WINDOW_CLEANING:
        return {
          bedrooms: 2,
          bathrooms: 1,
          squareFootage: 90,
        };
      case ServiceType.OFFICE_CLEANING:
        return {
          workstations: 10,
          meetingRooms: 2,
          commonAreas: 1,
          squareFootage: 150,
        };
      default: // HOME_CLEANING
        return {
          bedrooms: 2,
          bathrooms: 2,
          squareFootage: 100,
        };
    }
  };

  const [formData, setFormData] = useState<Partial<PropertyDetails | OfficeDetails>>({
    ...getDefaultValues(serviceType),
    ...data,
  });

  const [selectedSizeTier, setSelectedSizeTier] = useState<PropertySizeTier | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const isOffice = serviceType === ServiceType.OFFICE_CLEANING;

  // Initialize size tier based on current square footage
  useEffect(() => {
    if (formData.squareFootage) {
      const sizeTier = getSizeTier(formData.squareFootage);
      setSelectedSizeTier(sizeTier);
    }
  }, [formData.squareFootage]);

  // Validate property details whenever they change
  useEffect(() => {
    if (!isOffice && formData.squareFootage && 'bedrooms' in formData && 'bathrooms' in formData) {
      const propertyData = formData as PropertyDetails;
      const validation = validatePropertyDetails(propertyData);
      setValidationErrors(validation.errors);
    }
  }, [formData, isOffice]);

  const handleInputChange = (field: string, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Auto-calculate size tier when square footage changes
    if (field === 'squareFootage') {
      const sizeTier = getSizeTier(value);
      setSelectedSizeTier(sizeTier);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate before submitting
    if (!isOffice) {
      const validation = validatePropertyDetails(formData as PropertyDetails);
      if (!validation.isValid) {
        setValidationErrors(validation.errors);
        return;
      }
    }

    const dataWithSizeTier = {
      ...formData,
      sizeTier: selectedSizeTier,
    };

    if (isOffice) {
      onNext(dataWithSizeTier as OfficeDetails);
    } else {
      onNext(dataWithSizeTier as PropertyDetails);
    }
  };

  // Get constraints for current square footage
  const constraints = formData.squareFootage
    ? getPropertyConstraints(formData.squareFootage)
    : null;

  return (
    <div className='w-full max-w-4xl mx-auto px-2 sm:px-4'>
      {/* Simple Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-8'
      >
        <h2 className='heading-2 text-gray-900 mb-4'>
          Tell us about your {isOffice ? 'office' : 'property'}
        </h2>
        <p className='text-gray-600'>
          Use the controls below to specify your {isOffice ? 'office space' : 'home'} details
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className='space-y-8'>
          {/* Property Details Steppers */}
          <Card>
            <CardContent>
              {isOffice ? (
                // Office-specific steppers
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <NumberStepper
                    label='Workstations'
                    value={'workstations' in formData ? formData.workstations || 10 : 10}
                    onChange={value => handleInputChange('workstations', value)}
                    min={1}
                    max={50}
                    step={1}
                    unit='stations'
                  />
                  <NumberStepper
                    label='Meeting Rooms'
                    value={'meetingRooms' in formData ? formData.meetingRooms || 2 : 2}
                    onChange={value => handleInputChange('meetingRooms', value)}
                    min={0}
                    max={10}
                    step={1}
                    unit='rooms'
                  />
                  <NumberStepper
                    label='Common Areas'
                    value={'commonAreas' in formData ? formData.commonAreas || 1 : 1}
                    onChange={value => handleInputChange('commonAreas', value)}
                    min={0}
                    max={5}
                    step={1}
                    unit='areas'
                  />
                </div>
              ) : (
                // Residential property steppers
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  <NumberStepper
                    label='Home Size'
                    value={formData.squareFootage || 100}
                    onChange={value => handleInputChange('squareFootage', value)}
                    min={50}
                    max={serviceType === ServiceType.HOME_CLEANING ? 150 : Number.POSITIVE_INFINITY}
                    step={5}
                    unit='m²'
                  />
                  <NumberStepper
                    label='Bedrooms'
                    value={'bedrooms' in formData ? formData.bedrooms || 2 : 2}
                    onChange={value => handleInputChange('bedrooms', value)}
                    min={1}
                    max={constraints?.maxBedrooms || 5}
                    step={1}
                  />
                  <NumberStepper
                    label='Bathrooms'
                    value={'bathrooms' in formData ? formData.bathrooms || 2 : 2}
                    onChange={value => handleInputChange('bathrooms', value)}
                    min={1}
                    max={constraints?.maxBathrooms || 3}
                    step={1}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-8'
          >
            <div className='bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg'>
              <h4 className='text-red-800 font-semibold mb-3'>
                Please adjust your property details:
              </h4>
              <ul className='text-base text-red-700 space-y-2'>
                {validationErrors.map(error => (
                  <li key={error} className='flex items-center'>
                    <span className='w-2 h-2 bg-red-500 rounded-full mr-3' />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* General Error Display */}
        {errors && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-8'
          >
            <div className='bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg'>
              <ul className='text-base text-red-700 space-y-2'>
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field} className='flex items-center'>
                    <span className='w-2 h-2 bg-red-500 rounded-full mr-3' />
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-3 mt-8'>
          <EnhancedButton
            type='submit'
            disabled={isLoading || validationErrors.length > 0}
            className='flex-1'
            size='lg'
            loading={isLoading}
          >
            Continue to Effort Level
          </EnhancedButton>

          <Button variant='outline' onClick={onBack} className='flex-1 sm:flex-none'>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};
