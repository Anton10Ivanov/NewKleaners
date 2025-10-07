'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Calculator, Car, Clock, Flame, Home, Square, Star, Wind, Wrench, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  CleaningFrequency,
  ServiceType,
  type Estimate,
  type OfficeDetails,
  type PropertyDetails,
} from '@/types/bookingFlow';

interface EstimateStepProps {
  onNext: (estimate: Estimate) => void;
  onBack: () => void;
  onSkip?: () => void;
  propertyData: PropertyDetails | OfficeDetails;
  serviceType: ServiceType;
  frequency: CleaningFrequency;
  data?: Estimate | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const addOns = [
  {
    id: 'window_cleaning',
    name: 'Window Cleaning',
    description: 'Interior and exterior window cleaning',
    price: 25,
    duration: 30,
    icon: Square,
  },
  {
    id: 'appliance_cleaning',
    name: 'Appliance Cleaning',
    description: 'Deep cleaning of kitchen appliances',
    price: 35,
    duration: 45,
    icon: Wrench,
  },
  {
    id: 'cabinet_cleaning',
    name: 'Cabinet Cleaning',
    description: 'Interior and exterior cabinet cleaning',
    price: 30,
    duration: 30,
    icon: Home,
  },
  {
    id: 'fridge_cleaning',
    name: 'Refrigerator Cleaning',
    description: 'Deep cleaning inside and outside fridge',
    price: 40,
    duration: 60,
    icon: Wind,
  },
  {
    id: 'oven_cleaning',
    name: 'Oven Cleaning',
    description: 'Deep cleaning of oven interior and exterior',
    price: 45,
    duration: 60,
    icon: Flame,
  },
  {
    id: 'garage_cleaning',
    name: 'Garage Cleaning',
    description: 'Complete garage cleaning and organization',
    price: 50,
    duration: 90,
    icon: Car,
  },
];

const discounts = [
  {
    id: 'first_time',
    name: 'First Time Customer',
    type: 'percentage' as const,
    value: 15,
    description: 'Welcome discount for new customers',
  },
  {
    id: 'regular_cleaning',
    name: 'Regular Cleaning Discount',
    type: 'percentage' as const,
    value: 10,
    description: 'Discount for regular cleaning services',
  },
  {
    id: 'referral',
    name: 'Referral Bonus',
    type: 'fixed' as const,
    value: 20,
    description: 'Referral discount from existing customer',
  },
];

export const EstimateStep: React.FC<EstimateStepProps> = ({
  onNext,
  onBack,
  propertyData,
  serviceType,
  frequency,
  data,
  errors,
  isLoading = false,
}) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<Estimate | null>(data || null);

  // Calculate base price based on property details
  const calculateBasePrice = () => {
    let basePrice = 0;
    // Convert to square meters (default 100 sqm)
    const sqm = propertyData.squareFootage || 100;
    const floors = propertyData.floors || 1;

    // Base price per square meter (converted from USD to EUR)
    if (serviceType === ServiceType.HOME_CLEANING) {
      basePrice = sqm * 1.5; // €1.5 per sqm
    } else if (serviceType === ServiceType.OFFICE_CLEANING) {
      basePrice = sqm * 1.2; // €1.2 per sqm
    } else if (serviceType === ServiceType.DEEP_CLEANING) {
      basePrice = sqm * 2.5; // €2.5 per sqm
    }

    // Floor multiplier
    basePrice *= floors;

    // Minimum price
    return Math.max(basePrice, 80);
  };

  // Calculate frequency multiplier
  const getFrequencyMultiplier = () => {
    switch (frequency) {
      case CleaningFrequency.WEEKLY:
        return 0.8; // 20% discount for weekly
      case CleaningFrequency.BI_WEEKLY:
        return 0.9; // 10% discount for bi-weekly
      case CleaningFrequency.MONTHLY:
        return 1.0; // No discount for monthly
      default:
        return 1.0;
    }
  };

  // Calculate total estimate
  const calculateEstimate = () => {
    const basePrice = calculateBasePrice();
    const frequencyMultiplier = getFrequencyMultiplier();

    // Add-ons
    const addOnsTotal = selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);

    // Discounts
    let discountTotal = 0;
    selectedDiscounts.forEach(discountId => {
      const discount = discounts.find(d => d.id === discountId);
      if (discount) {
        if (discount.type === 'percentage') {
          discountTotal += (basePrice + addOnsTotal) * (discount.value / 100);
        } else {
          discountTotal += discount.value;
        }
      }
    });

    const subtotal = (basePrice + addOnsTotal) * frequencyMultiplier;
    const total = Math.max(subtotal - discountTotal, 0);

    return {
      id: `estimate-${Date.now()}`,
      basePrice: Math.round(basePrice),
      duration: Math.round(120 + selectedAddOns.length * 30), // Base 2 hours + 30 min per add-on
      frequency,
      addOns: addOns
        .filter(a => selectedAddOns.includes(a.id))
        .map(a => ({
          ...a,
          isSelected: true,
        })),
      discounts: discounts
        .filter(d => selectedDiscounts.includes(d.id))
        .map(d => ({
          ...d,
          isSelected: true,
        })),
      totalPrice: Math.round(total),
      currency: 'EUR',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      breakdown: {
        baseService: Math.round(basePrice),
        addOns: Math.round(addOnsTotal),
        frequencyMultiplier,
        packageMultiplier: 1,
        discounts: Math.round(discountTotal),
        taxes: Math.round(total * 0.08), // 8% tax
        total: Math.round(total * 1.08),
      },
    };
  };

  useEffect(() => {
    const newEstimate = calculateEstimate();
    setEstimate(newEstimate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddOns, selectedDiscounts, propertyData, serviceType, frequency]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId) ? prev.filter(id => id !== addOnId) : [...prev, addOnId],
    );
  };

  const handleDiscountToggle = (discountId: string) => {
    setSelectedDiscounts(prev =>
      prev.includes(discountId) ? prev.filter(id => id !== discountId) : [...prev, discountId],
    );
  };

  const handleContinue = () => {
    if (estimate) {
      onNext(estimate);
    }
  };

  const getServiceIcon = () => {
    switch (serviceType) {
      case ServiceType.HOME_CLEANING:
        return '🏠';
      case ServiceType.OFFICE_CLEANING:
        return '🏢';
      case ServiceType.DEEP_CLEANING:
        return '✨';
      default:
        return '🧹';
    }
  };

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-8'
      >
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Your Cleaning Estimate</h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Review your estimate and customize your service with add-ons
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Add-ons and Discounts */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Zap className='w-5 h-5 mr-2' />
                Add-on Services
              </CardTitle>
              <CardDescription>
                Enhance your cleaning service with these additional options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {addOns.map(addOn => (
                  <motion.div
                    key={addOn.id}
                    whileHover={{ scale: 1.02 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedAddOns.includes(addOn.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleAddOnToggle(addOn.id)}
                  >
                    <div className='flex items-start space-x-3'>
                      <Checkbox
                        checked={selectedAddOns.includes(addOn.id)}
                        onChange={() => handleAddOnToggle(addOn.id)}
                      />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-2'>
                          <h4 className='font-medium'>{addOn.name}</h4>
                          <div className='flex items-center space-x-2'>
                            <addOn.icon className='w-4 h-4 text-gray-500' />
                            <span className='font-semibold text-primary'>+€{addOn.price}</span>
                          </div>
                        </div>
                        <p className='text-sm text-gray-600 mb-2'>{addOn.description}</p>
                        <div className='flex items-center text-xs text-gray-500'>
                          <Clock className='w-3 h-3 mr-1' />+{addOn.duration} minutes
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Discounts */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Star className='w-5 h-5 mr-2' />
                Available Discounts
              </CardTitle>
              <CardDescription>Select any discounts that apply to your service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3'>
                {discounts.map(discount => (
                  <motion.div
                    key={discount.id}
                    whileHover={{ scale: 1.01 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDiscounts.includes(discount.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => handleDiscountToggle(discount.id)}
                  >
                    <div className='flex items-start space-x-3'>
                      <Checkbox
                        checked={selectedDiscounts.includes(discount.id)}
                        onChange={() => handleDiscountToggle(discount.id)}
                      />
                      <div className='flex-1'>
                        <div className='flex items-center justify-between mb-1'>
                          <h4 className='font-medium'>{discount.name}</h4>
                          <span className='font-semibold text-green-600'>
                            {discount.type === 'percentage'
                              ? `${discount.value}%`
                              : `€${discount.value}`}{' '}
                            off
                          </span>
                        </div>
                        <p className='text-sm text-gray-600'>{discount.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Estimate Summary */}
        <div className='space-y-6'>
          <Card className='sticky top-6'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Calculator className='w-5 h-5 mr-2' />
                Estimate Summary
              </CardTitle>
              <CardDescription>
                {getServiceIcon()} {serviceType.replace('_', ' ').toUpperCase()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {estimate && (
                <div className='space-y-4'>
                  {/* Base Service */}
                  <div className='flex justify-between text-sm'>
                    <span>Base Service</span>
                    <span>€{estimate.breakdown.baseService}</span>
                  </div>

                  {/* Add-ons */}
                  {estimate.addOns.length > 0 && (
                    <div>
                      <div className='text-sm font-medium mb-2'>Add-ons:</div>
                      {estimate.addOns.map(addOn => (
                        <div
                          key={addOn.id}
                          className='flex justify-between text-sm text-gray-600 ml-2'
                        >
                          <span>{addOn.name}</span>
                          <span>+€{addOn.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Frequency Discount */}
                  {estimate.breakdown.frequencyMultiplier < 1 && (
                    <div className='flex justify-between text-sm text-green-600'>
                      <span>Frequency Discount</span>
                      <span>
                        -€
                        {Math.round(
                          estimate.breakdown.baseService *
                            (1 - estimate.breakdown.frequencyMultiplier),
                        )}
                      </span>
                    </div>
                  )}

                  {/* Discounts */}
                  {estimate.discounts.length > 0 && (
                    <div>
                      <div className='text-sm font-medium mb-2'>Discounts:</div>
                      {estimate.discounts.map(discount => (
                        <div
                          key={discount.id}
                          className='flex justify-between text-sm text-green-600 ml-2'
                        >
                          <span>{discount.name}</span>
                          <span>
                            -€
                            {discount.type === 'percentage'
                              ? Math.round((estimate.breakdown.baseService * discount.value) / 100)
                              : discount.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Separator />

                  {/* Subtotal */}
                  <div className='flex justify-between text-sm'>
                    <span>Subtotal</span>
                    <span>€{estimate.totalPrice}</span>
                  </div>

                  {/* Tax */}
                  <div className='flex justify-between text-sm'>
                    <span>Tax (8%)</span>
                    <span>€{estimate.breakdown.taxes}</span>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className='flex justify-between text-lg font-bold'>
                    <span>Total</span>
                    <span className='text-primary'>€{estimate.breakdown.total}</span>
                  </div>

                  {/* Duration */}
                  <div className='flex items-center text-sm text-gray-600'>
                    <Clock className='w-4 h-4 mr-2' />
                    Estimated duration: {Math.floor(estimate.duration / 60)}h{' '}
                    {estimate.duration % 60}m
                  </div>

                  {/* Validity */}
                  <div className='text-xs text-gray-500'>
                    Valid until: {new Date(estimate.validUntil).toLocaleDateString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className='space-y-3'>
            <Button
              onClick={handleContinue}
              disabled={!estimate || isLoading}
              className='w-full'
              size='lg'
            >
              {isLoading ? 'Processing...' : 'Accept Estimate & Continue'}
            </Button>

            <Button variant='outline' onClick={onBack} className='w-full'>
              Modify Details
            </Button>
          </div>
        </div>
      </div>

      {errors && Object.keys(errors).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-6'
        >
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <ul className='text-sm text-red-700 space-y-1'>
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>• {error}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};
