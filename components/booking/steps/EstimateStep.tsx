'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Calculator, CheckCircle, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { calculatePrice, getSizeTier } from '@/lib/pricing-calculator';
import {
  CleaningFrequency,
  EffortLevel,
  PropertySizeTier,
  ServiceType,
  type Estimate,
  type OfficeDetails,
  type PropertyDetails,
} from '@/types/bookingFlow';

// Add-ons pricing data - moved outside component to prevent recreation
const ADD_ONS_PRICING = {
  oven_cleaning: 45,
  cooker_hood_cleaning: 35,
  kitchen_cabinet_cleaning: 30,
  dishwashing: 20,
  microwave_cleaning: 25,
  pet_toilet_cleaning: 20,
  ironing: 15,
  wardrobe_cleaning: 25,
  refrigerator_cleaning: 40,
  balcony_cleaning: 30,
  window_cleaning: 8,
  additional_hours: 25,
};

interface EstimateStepProps {
  onNext: (estimate: Estimate) => void;
  onBack: () => void;
  propertyData: PropertyDetails | OfficeDetails;
  serviceType: ServiceType;
  frequency: CleaningFrequency;
  effortLevel?: EffortLevel;
  sizeTier?: PropertySizeTier | null;
  data?: Estimate | null;
  addOns?: Record<string, number>; // Add-ons from schedule step
  errors?: Record<string, string>;
  isLoading?: boolean;
}

export const EstimateStep: React.FC<EstimateStepProps> = ({
  onNext,
  onBack,
  propertyData,
  serviceType,
  frequency,
  effortLevel,
  sizeTier: passedSizeTier,
  data,
  addOns = {},
  errors,
  isLoading = false,
}) => {
  const [estimate, setEstimate] = useState<Estimate | null>(data || null);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isFirstTimeCustomer, setIsFirstTimeCustomer] = useState<boolean>(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState<boolean>(false);

  // Check if this is a home cleaning service
  const isHomeCleaning = 'bedrooms' in propertyData;

  // Use passed size tier or calculate it if not provided
  const sizeTier =
    passedSizeTier || (isHomeCleaning ? getSizeTier(propertyData.squareFootage) : null);

  // Calculate base price using new pricing system
  const calculateBasePrice = () => {
    if (!isHomeCleaning || !effortLevel || !sizeTier) {
      // Fallback for non-home cleaning services
      const sqm = propertyData.squareFootage || 100;
      return Math.max(sqm * 1.5, 80);
    }
    return calculatePrice(sizeTier, effortLevel);
  };

  // Get frequency multiplier
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

  // Calculate add-ons total
  const calculateAddOnsTotal = () => {
    return Object.entries(addOns).reduce((total, [addOnId, quantity]) => {
      const price = ADD_ONS_PRICING[addOnId as keyof typeof ADD_ONS_PRICING] || 0;
      return total + price * quantity;
    }, 0);
  };

  // Calculate discounts
  const calculateDiscounts = () => {
    let totalDiscount = 0;
    const discounts: Array<{
      id: string;
      name: string;
      value: number;
      type: 'percentage' | 'fixed';
      description: string;
    }> = [];

    // First-time customer discount (2% of total before taxes)
    if (isFirstTimeCustomer) {
      const basePrice = calculateBasePrice();
      const frequencyMultiplier = getFrequencyMultiplier();
      const addOnsTotal = calculateAddOnsTotal();
      const subtotal = basePrice * frequencyMultiplier + addOnsTotal;
      const firstTimeDiscount = Math.round(subtotal * 0.02);
      totalDiscount += firstTimeDiscount;
      discounts.push({
        id: 'first-time-customer',
        name: 'First-time Customer Discount',
        value: firstTimeDiscount,
        type: 'fixed',
        description: '2% discount for first-time customers',
      });
    }

    // Promo code discount (referral bonus)
    if (promoCodeApplied && promoCode.toLowerCase() === 'referral') {
      totalDiscount += 20;
      discounts.push({
        id: 'referral-bonus',
        name: 'Referral Bonus',
        value: 20,
        type: 'fixed',
        description: '€20 discount for referral code',
      });
    }

    return { totalDiscount, discounts };
  };

  // Calculate total estimate
  const calculateEstimate = useCallback(() => {
    const basePrice = calculateBasePrice();
    const frequencyMultiplier = getFrequencyMultiplier();
    const addOnsTotal = calculateAddOnsTotal();
    const { totalDiscount, discounts } = calculateDiscounts();

    const subtotal = basePrice * frequencyMultiplier + addOnsTotal;
    const afterDiscounts = Math.max(subtotal - totalDiscount, 0);
    const taxes = Math.round(afterDiscounts * 0.08);
    const total = afterDiscounts + taxes;

    return {
      id: `estimate-${Date.now()}`,
      basePrice: Math.round(basePrice),
      duration: Math.round(120), // Base 2 hours
      frequency,
      effortLevel: effortLevel || EffortLevel.STANDARD,
      sizeTier: sizeTier || PropertySizeTier.TIER_2,
      isEstimate: true,
      addOns: Object.entries(addOns).map(([id, quantity]) => ({
        id,
        name: id.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        price: ADD_ONS_PRICING[id as keyof typeof ADD_ONS_PRICING] || 0,
        quantity,
        isSelected: true,
      })),
      discounts,
      totalPrice: Math.round(total),
      currency: 'EUR',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      breakdown: {
        baseService: Math.round(basePrice),
        addOns: Math.round(addOnsTotal),
        frequencyMultiplier,
        discounts: Math.round(totalDiscount),
        taxes,
        total: Math.round(total),
      },
      accessInstructions: estimate?.accessInstructions || '',
    };
  }, [
    propertyData,
    serviceType,
    frequency,
    effortLevel,
    sizeTier,
    addOns,
    isFirstTimeCustomer,
    promoCodeApplied,
    promoCode,
    estimate?.accessInstructions,
  ]);

  useEffect(() => {
    const newEstimate = calculateEstimate();
    setEstimate(newEstimate);
  }, [calculateEstimate]);

  const handlePromoCodeApply = () => {
    if (promoCode.toLowerCase() === 'referral') {
      setPromoCodeApplied(true);
    }
  };

  const handleFirstTimeCustomerChange = (checked: boolean) => {
    setIsFirstTimeCustomer(checked);
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
    <div className='w-full max-w-6xl mx-auto px-2 sm:px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-4 sm:mb-8'
      >
        <h2 className='heading-2 text-gray-900 mb-4'>Your Cleaning Estimate</h2>
        <p className='text-gray-600 mb-4'>
          Review your cleaning service details and estimated pricing
        </p>

        {/* Estimate Disclaimer Banner */}
        <div className='mt-4 inline-block bg-blue-50 text-blue-800 px-4 py-2 rounded-lg border border-blue-200'>
          <div className='flex items-center justify-center'>
            <div className='w-2 h-2 bg-blue-500 rounded-full mr-2' />
            <span className='text-sm font-medium'>
              This is your estimated price based on property details. Final price confirmed on-site.
            </span>
          </div>
        </div>
      </motion.div>

      <div className='max-w-2xl mx-auto'>
        {/* Estimate Summary */}
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
                {/* Service Details */}
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
                        <span>
                          {addOn.name}
                          {addOn.quantity && addOn.quantity > 1 && (
                            <span className='text-gray-400'> × {addOn.quantity}</span>
                          )}
                        </span>
                        <span>+€{(addOn.price * (addOn.quantity || 1)).toFixed(0)}</span>
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
                          {discount.type === 'percentage'
                            ? `-${discount.value}%`
                            : `-€${discount.value}`}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className='flex justify-between text-lg font-semibold'>
                  <span>Total</span>
                  <span>€{estimate.totalPrice}</span>
                </div>

                {/* Duration */}
                <div className='flex items-center text-sm text-gray-600'>
                  <Clock className='w-4 h-4 mr-2' />
                  Estimated duration: {Math.floor(estimate.duration / 60)}h {estimate.duration % 60}
                  m
                </div>

                {/* Promo Code and Discounts */}
                <div className='space-y-4 py-4 border-t border-gray-200'>
                  {/* Promo Code Field */}
                  <div className='space-y-2'>
                    <Label htmlFor='promo-code' className='text-sm'>
                      Promo Code
                    </Label>
                    <div className='flex gap-2'>
                      <Input
                        id='promo-code'
                        placeholder='Enter promo code'
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        disabled={promoCodeApplied}
                        className='text-sm'
                      />
                      <Button
                        onClick={handlePromoCodeApply}
                        disabled={!promoCode || promoCodeApplied}
                        variant='outline'
                        size='sm'
                      >
                        Apply
                      </Button>
                    </div>
                    {promoCodeApplied && (
                      <div className='flex items-center text-green-600 text-sm'>
                        <CheckCircle className='w-4 h-4 mr-2' />
                        Promo code applied successfully!
                      </div>
                    )}
                  </div>

                  {/* First-time Customer Discount */}
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='first-time-customer'
                      checked={isFirstTimeCustomer}
                      onCheckedChange={handleFirstTimeCustomerChange}
                    />
                    <Label htmlFor='first-time-customer' className='text-sm'>
                      I'm a first-time customer (2% discount)
                    </Label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className='space-y-3 pt-4'>
                  <Button
                    onClick={handleContinue}
                    disabled={!estimate || isLoading}
                    className='w-full'
                    size='lg'
                  >
                    {isLoading ? 'Processing...' : 'Pay Securely with Stripe'}
                  </Button>

                  <Button variant='outline' onClick={onBack} className='w-full'>
                    Back to Schedule
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {errors && Object.keys(errors || {}).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-6'
        >
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <ul className='text-sm text-red-700 space-y-1'>
              {Object.entries(errors || {}).map(([field, error]) => (
                <li key={field}>• {error}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};
