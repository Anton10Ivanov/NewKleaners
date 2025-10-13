'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InlineSlider } from '@/components/ui/inline-slider';
import {
  applyBusinessDefaults,
  getBusinessTypes,
  getFloorTypeOptions,
  getPriorityOptions,
} from '@/lib/business-defaults';
import {
  getCleaningCountLimits,
  getVisitorCountLimits,
  validateBusinessDetails,
} from '@/lib/business-validation';
import type { BusinessDetails, ServiceType } from '@/types/bookingFlow';

import { EnhancedButton } from '../shared/EnhancedButton';

interface BusinessDetailsStepProps {
  onNext: (data: BusinessDetails) => void;
  onBack: () => void;
  onSkip?: () => void;
  serviceType: ServiceType;
  data?: BusinessDetails | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

export const BusinessDetailsStep: React.FC<BusinessDetailsStepProps> = ({
  onNext,
  onBack,
  serviceType: _serviceType,
  data,
  errors,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<BusinessDetails>>({
    businessType: 'office',
    squareFootage: 150,
    cleaningFrequency: 'weekly',
    cleaningCount: 2,
    floorType: 'vinyl',
    visitorCount: 20,
    visitorFrequency: 'daily',
    priority: 'quality',
    ...data,
  });

  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);

  const businessTypes = getBusinessTypes();
  const floorTypes = getFloorTypeOptions();
  const priorities = getPriorityOptions();

  // Validate form data whenever it changes
  useEffect(() => {
    const validation = validateBusinessDetails(formData);
    setValidationErrors(validation.errors);
    setValidationWarnings(validation.warnings);
  }, [formData]);

  // Apply defaults when business type changes
  const handleBusinessTypeChange = (businessType: string) => {
    const updatedData = applyBusinessDefaults(businessType, formData);
    setFormData(updatedData);
  };

  // Auto-adjust visitor frequency based on cleaning frequency
  const handleCleaningFrequencyChange = (frequency: 'daily' | 'weekly' | 'monthly') => {
    // Set visitor frequency to match cleaning frequency
    const visitorFrequency =
      frequency === 'daily' ? 'daily' : frequency === 'weekly' ? 'weekly' : 'monthly';

    setFormData(prev => ({
      ...prev,
      cleaningFrequency: frequency,
      visitorFrequency,
    }));
  };

  const handleInputChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateBusinessDetails(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    onNext(formData as BusinessDetails);
  };

  const visitorLimits = getVisitorCountLimits(formData.cleaningFrequency || 'weekly');
  const cleaningLimits = getCleaningCountLimits(formData.cleaningFrequency || 'weekly');

  return (
    <div className='w-full max-w-4xl mx-auto px-2 sm:px-4'>
      {/* Simplified Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-6'
      >
        <h2 className='heading-2 text-gray-900 mb-2'>Business Details</h2>
        <p className='text-gray-600'>Tell us about your commercial cleaning needs</p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        {/* Unified Business Details Container */}
        <Card className='overflow-hidden'>
          <CardContent className='p-6 space-y-6'>
            {/* Business Type & Size */}
            <div className='space-y-4'>
              <div className='text-center'>
                <div className='mb-4'>
                  <span className='text-gray-700 font-medium'>Our business is a </span>
                  <select
                    value={formData.businessType || 'office'}
                    onChange={e => handleBusinessTypeChange(e.target.value)}
                    className='inline-block border-2 border-gray-300 rounded-lg px-4 py-2 mx-1 bg-white font-medium text-gray-700 hover:border-orange-300 focus:border-orange-500 focus:outline-none transition-colors'
                  >
                    {businessTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p className='text-gray-600 mb-3'>Property size</p>
                  <InlineSlider
                    value={formData.squareFootage || 150}
                    onChange={value => handleInputChange('squareFootage', value)}
                    min={50}
                    max={1000}
                    step={10}
                    unit='m²'
                    className='justify-center'
                  />
                </div>
              </div>
            </div>

            {/* Cleaning Schedule */}
            <div className='space-y-4'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Number of cleanings</h3>

                <div className='space-y-4'>
                  <div>
                    <InlineSlider
                      value={formData.cleaningCount || 2}
                      onChange={value => handleInputChange('cleaningCount', value)}
                      min={cleaningLimits.min}
                      max={cleaningLimits.max}
                      step={cleaningLimits.step}
                      className='justify-center'
                    />
                  </div>

                  <div>
                    <p className='text-gray-600 mb-3'>Frequency</p>
                    <select
                      value={formData.cleaningFrequency || 'weekly'}
                      onChange={e =>
                        handleCleaningFrequencyChange(
                          e.target.value as 'daily' | 'weekly' | 'monthly',
                        )
                      }
                      className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-white font-medium text-gray-700 hover:border-orange-300 focus:border-orange-500 focus:outline-none transition-colors'
                    >
                      <option value='daily'>Daily</option>
                      <option value='weekly'>Weekly</option>
                      <option value='monthly'>Monthly</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Floor Type */}
            <div className='space-y-4'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  What type of flooring covers over 60% of your space?
                </h3>
                <select
                  value={formData.floorType || 'vinyl'}
                  onChange={e => handleInputChange('floorType', e.target.value)}
                  className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-white font-medium text-gray-700 hover:border-orange-300 focus:border-orange-500 focus:outline-none transition-colors'
                >
                  {floorTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visitor Count */}
            <div className='space-y-4'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Visitors {formData.cleaningFrequency || 'weekly'}
                </h3>

                <div className='space-y-4'>
                  <div>
                    <InlineSlider
                      value={formData.visitorCount || 20}
                      onChange={value => handleInputChange('visitorCount', value)}
                      min={visitorLimits.min}
                      max={visitorLimits.max}
                      step={visitorLimits.step}
                      className='justify-center'
                    />
                    <p className='text-sm text-gray-500 mt-2 text-center'>
                      Automatically matches your cleaning schedule
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority */}
            <div className='space-y-4'>
              <div className='text-center'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  What matters most to your business?
                </h3>
                <select
                  value={formData.priority || 'quality'}
                  onChange={e => handleInputChange('priority', e.target.value)}
                  className='border-2 border-gray-300 rounded-lg px-4 py-2 bg-white font-medium text-gray-700 hover:border-orange-300 focus:border-orange-500 focus:outline-none transition-colors'
                >
                  {priorities.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-8'
          >
            <div className='bg-red-50 border border-red-200 rounded-xl p-6 shadow-lg'>
              <h4 className='text-red-800 font-semibold mb-3'>
                Please complete all required fields:
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

        {/* Validation Warnings */}
        {validationWarnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-8'
          >
            <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-lg'>
              <h4 className='text-yellow-800 font-semibold mb-3'>Recommendations:</h4>
              <ul className='text-base text-yellow-700 space-y-2'>
                {validationWarnings.map(warning => (
                  <li key={warning} className='flex items-center'>
                    <span className='w-2 h-2 bg-yellow-500 rounded-full mr-3' />
                    {warning}
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
