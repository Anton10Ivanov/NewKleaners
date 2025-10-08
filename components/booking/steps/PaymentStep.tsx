'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  Lock,
  MapPin,
  Shield,
  Star,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  calculatePrice,
  getEffortLevelInfo,
  getSizeTier,
  getSizeTierInfo,
} from '@/lib/pricing-calculator';
import { cn } from '@/lib/utils';
import type { BookingFlowState, Estimate } from '@/types/bookingFlow';
import { CleaningFrequency, EffortLevel, PropertySizeTier } from '@/types/bookingFlow';

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

interface PaymentStepProps {
  onNext: (bookingId: string) => void;
  bookingData: BookingFlowState;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const paymentMethods = [
  {
    id: 'cash',
    name: 'Cash Payment',
    description: 'Pay in cash when service is completed',
    icon: CreditCard,
    popular: true,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    popular: false,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
];

export const PaymentStep: React.FC<PaymentStepProps> = ({
  onNext,
  bookingData,
  errors,
  isLoading = false,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('cash');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isFirstTimeCustomer, setIsFirstTimeCustomer] = useState<boolean>(false);
  const [promoCodeApplied, setPromoCodeApplied] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<Estimate | null>(bookingData.estimate || null);

  // Check if this is a home cleaning service
  const isHomeCleaning = bookingData.propertyDetails && 'bedrooms' in bookingData.propertyDetails;

  // Use passed size tier or calculate it if not provided
  const sizeTier =
    bookingData.sizeTier ||
    (isHomeCleaning && bookingData.propertyDetails
      ? getSizeTier(bookingData.propertyDetails.squareFootage)
      : null);

  // Calculate base price using new pricing system
  const calculateBasePrice = useCallback(() => {
    if (!isHomeCleaning || !bookingData.selectedEffort || !sizeTier) {
      // Fallback for non-home cleaning services
      const sqm = bookingData.propertyDetails?.squareFootage || 100;
      return Math.max(sqm * 1.5, 80);
    }
    return calculatePrice(sizeTier, bookingData.selectedEffort);
  }, [
    isHomeCleaning,
    bookingData.selectedEffort,
    sizeTier,
    bookingData.propertyDetails?.squareFootage,
  ]);

  // Get frequency multiplier
  const getFrequencyMultiplier = useCallback(() => {
    switch (bookingData.cleaningFrequency) {
      case CleaningFrequency.WEEKLY:
        return 0.8; // 20% discount for weekly
      case CleaningFrequency.BI_WEEKLY:
        return 0.9; // 10% discount for bi-weekly
      case CleaningFrequency.MONTHLY:
        return 1.0; // No discount for monthly
      default:
        return 1.0;
    }
  }, [bookingData.cleaningFrequency]);

  // Calculate add-ons total
  const calculateAddOnsTotal = useCallback(() => {
    const addOns = bookingData.schedule?.addOns || {};
    return Object.entries(addOns).reduce((total, [addOnId, quantity]) => {
      const price = ADD_ONS_PRICING[addOnId as keyof typeof ADD_ONS_PRICING] || 0;
      return total + price * quantity;
    }, 0);
  }, [bookingData.schedule?.addOns]);

  // Calculate discounts
  const calculateDiscounts = useCallback(() => {
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
  }, [
    isFirstTimeCustomer,
    promoCodeApplied,
    promoCode,
    calculateBasePrice,
    getFrequencyMultiplier,
    calculateAddOnsTotal,
  ]);

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
      frequency: bookingData.cleaningFrequency || CleaningFrequency.ONCE,
      effortLevel: bookingData.selectedEffort || EffortLevel.STANDARD,
      sizeTier: sizeTier || PropertySizeTier.TIER_2,
      isEstimate: true,
      addOns: Object.entries(bookingData.schedule?.addOns || {}).map(([id, quantity]) => ({
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
      accessInstructions: bookingData.schedule?.accessInstructions || '',
    };
  }, [
    bookingData.cleaningFrequency,
    bookingData.selectedEffort,
    sizeTier,
    bookingData.schedule?.addOns,
    bookingData.schedule?.accessInstructions,
    calculateBasePrice,
    getFrequencyMultiplier,
    calculateAddOnsTotal,
    calculateDiscounts,
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

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleProcessPayment = async () => {
    if (!agreedToTerms || !estimate) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing with Stripe
      // In real implementation, this would call your backend API
      // which would create a PaymentIntent with the above metadata
      // console.log('Processing payment with data:', paymentData);

      setTimeout(() => {
        setIsProcessing(false);
        onNext(`booking-${Date.now()}`);
      }, 2000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsProcessing(false);
      // Handle error - show user-friendly message
    }
  };

  const getServiceIcon = () => {
    switch (bookingData.serviceType) {
      case 'home_cleaning':
        return '🏠';
      case 'office_cleaning':
        return '🏢';
      case 'deep_cleaning':
        return '✨';
      default:
        return '🧹';
    }
  };

  const getFrequencyText = () => {
    switch (bookingData.cleaningFrequency) {
      case 'once':
        return 'Once cleaning';
      case 'weekly':
        return 'Weekly cleaning';
      case 'bi_weekly':
        return 'Bi-weekly cleaning';
      case 'monthly':
        return 'Monthly cleaning';
      default:
        return 'Regular cleaning';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (timeSlot: { start: string; end: string }) => {
    return `${timeSlot.start} - ${timeSlot.end}`;
  };

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-8'
      >
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Complete Your Booking</h2>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Review your booking details and complete your secure payment
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.618fr] gap-8'>
        {/* Left Column - Booking Summary */}
        <div className='space-y-6'>
          <Card className='sticky top-6'>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <Lock className='w-5 h-5 mr-2' />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Service Details */}
              <div className='space-y-3'>
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{getServiceIcon()}</span>
                  <div>
                    <div className='font-medium'>
                      {bookingData.serviceType?.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className='text-sm text-gray-600'>{getFrequencyText()}</div>
                  </div>
                </div>

                <Separator />

                <div className='space-y-2'>
                  <div className='flex items-center text-sm'>
                    <Calendar className='w-4 h-4 mr-2 text-gray-500' />
                    <span className='text-gray-600'>Date:</span>
                    <span className='ml-2 font-medium'>
                      {bookingData.schedule?.date
                        ? formatDate(bookingData.schedule.date)
                        : 'Not selected'}
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <Clock className='w-4 h-4 mr-2 text-gray-500' />
                    <span className='text-gray-600'>Time:</span>
                    <span className='ml-2 font-medium'>
                      {bookingData.schedule?.timeSlot
                        ? formatTime(bookingData.schedule.timeSlot)
                        : 'Not selected'}
                    </span>
                  </div>
                  <div className='flex items-center text-sm'>
                    <MapPin className='w-4 h-4 mr-2 text-gray-500' />
                    <span className='text-gray-600'>Duration:</span>
                    <span className='ml-2 font-medium'>
                      {estimate
                        ? `${Math.floor(estimate.duration / 60)}h ${estimate.duration % 60}m`
                        : 'Not calculated'}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              {estimate && (
                <div className='space-y-2'>
                  {/* Size and Effort Information */}
                  {bookingData.sizeTier && bookingData.selectedEffort && (
                    <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3'>
                      <div className='text-sm space-y-1'>
                        <div className='flex justify-between'>
                          <span className='text-blue-700'>Size:</span>
                          <span className='font-medium text-blue-800'>
                            {getSizeTierInfo(bookingData.sizeTier).name}
                          </span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-blue-700'>Effort:</span>
                          <span className='font-medium text-blue-800'>
                            {getEffortLevelInfo(bookingData.selectedEffort).name}
                          </span>
                        </div>
                        {bookingData.propertyDetails &&
                        typeof bookingData.propertyDetails === 'object' &&
                        'propertyType' in bookingData.propertyDetails &&
                        bookingData.propertyDetails.propertyType ? (
                          <div className='flex justify-between'>
                            <span className='text-blue-700'>Type:</span>
                            <span className='font-medium text-blue-800'>
                              {bookingData.propertyDetails.propertyType === 'house'
                                ? 'House (+10%)'
                                : 'Apartment'}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}

                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Base Service</span>
                    <span>€{estimate.breakdown.baseService}</span>
                  </div>

                  {estimate.addOns && estimate.addOns.length > 0 && (
                    <div>
                      <div className='text-sm text-gray-600 mb-1'>Add-ons:</div>
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

                  {estimate.discounts && estimate.discounts.length > 0 && (
                    <div>
                      <div className='text-sm text-gray-600 mb-1'>Discounts:</div>
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

                  <div className='flex justify-between text-sm'>
                    <span className='text-gray-600'>Tax (8%)</span>
                    <span>€{estimate.breakdown.taxes}</span>
                  </div>

                  <Separator />

                  <div className='flex justify-between text-lg font-bold'>
                    <span>Estimated Total</span>
                    <span className='text-primary'>€{estimate.breakdown.total}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Payment Method & Terms */}
        <div className='space-y-6'>
          {/* Integrated Payment & Terms Card */}
          <Card className='overflow-hidden'>
            <CardHeader className='bg-gradient-to-r from-orange-50 to-blue-50 border-b border-gray-100'>
              <CardTitle className='flex items-center text-xl'>
                <CreditCard className='w-6 h-6 mr-3 text-orange-600' />
                Payment & Agreement
              </CardTitle>
              <CardDescription className='text-gray-600'>
                Choose payment method and confirm your booking
              </CardDescription>
            </CardHeader>
            <CardContent className='p-0'>
              {/* Payment Methods - Integrated Design */}
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Payment Method</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {paymentMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    const isSelected = selectedPaymentMethod === method.id;

                    return (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? `${method.bgColor} ${method.borderColor} border-2 shadow-md`
                            : 'bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        } rounded-xl p-4`}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                      >
                        {/* Selection Indicator */}
                        <div
                          className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected
                              ? `${method.color} border-transparent`
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {isSelected && <CheckCircle className='w-4 h-4 text-white' />}
                        </div>

                        {/* Content */}
                        <div className='flex items-center space-x-3'>
                          <div
                            className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center`}
                          >
                            <IconComponent className='w-6 h-6 text-white' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <div className='flex items-center space-x-2'>
                              <h4 className='font-semibold text-gray-900 truncate'>
                                {method.name}
                              </h4>
                              {method.popular && (
                                <Badge className={`${method.color} text-white text-xs px-2 py-0.5`}>
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className='text-sm text-gray-600 mt-1 line-clamp-2'>
                              {method.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Promo Code and Discounts */}
              <div className='p-6 border-b border-gray-100'>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                  Discounts & Promo Codes
                </h3>

                {/* Promo Code Field */}
                <div className='space-y-3 mb-4'>
                  <div className='flex gap-2'>
                    <Input
                      id='promo-code'
                      placeholder='Enter promo code'
                      value={promoCode}
                      onChange={e => setPromoCode(e.target.value)}
                      disabled={promoCodeApplied}
                      className={cn(
                        'text-sm border-orange-500 focus:border-orange-500 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
                      )}
                    />
                    <Button
                      onClick={handlePromoCodeApply}
                      disabled={!promoCode || promoCodeApplied}
                      variant='outline'
                      size='sm'
                      className={cn(
                        'transition-colors',
                        'hover:bg-green-600 hover:text-white hover:border-orange-600',
                      )}
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
                    I&apos;m a first-time customer
                  </Label>
                </div>
              </div>

              {/* Terms Agreement - Integrated Design */}
              <div className='p-6 bg-gray-50'>
                <div className='flex items-start space-x-4'>
                  <Checkbox
                    id='terms'
                    checked={agreedToTerms}
                    onCheckedChange={checked => setAgreedToTerms(checked as boolean)}
                    className='mt-1'
                  />
                  <div className='flex-1'>
                    <Label
                      htmlFor='terms'
                      className='text-sm text-gray-700 leading-relaxed cursor-pointer'
                    >
                      I agree to the{' '}
                      <button
                        type='button'
                        className='text-orange-600 hover:text-orange-700 hover:underline font-medium'
                        onClick={() => {
                          /* Handle terms click */
                        }}
                      >
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button
                        type='button'
                        className='text-orange-600 hover:text-orange-700 hover:underline font-medium'
                        onClick={() => {
                          /* Handle privacy click */
                        }}
                      >
                        Privacy Policy
                      </button>
                      . I understand that this booking is subject to our cancellation policy.
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons - Integrated Design */}
          <div className='space-y-4'>
            <Button
              onClick={handleProcessPayment}
              disabled={!agreedToTerms || isProcessing || isLoading}
              className='w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
              size='lg'
            >
              {isProcessing ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3' />
                  Processing Payment...
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <Lock className='w-5 h-5 mr-2' />
                  {selectedPaymentMethod === 'cash'
                    ? `Confirm Booking - €${estimate?.breakdown.total || 0}`
                    : `Pay Securely - €${estimate?.breakdown.total || 0}`}
                </div>
              )}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className='text-center'>
            <div className='flex items-center justify-center space-x-4 text-xs text-gray-500'>
              <div className='flex items-center'>
                <Star className='w-3 h-3 mr-1' />
                4.9/5 Rating
              </div>
              <div className='flex items-center'>
                <Shield className='w-3 h-3 mr-1' />
                Secure
              </div>
              <div className='flex items-center'>
                <CheckCircle className='w-3 h-3 mr-1' />
                Guaranteed
              </div>
            </div>
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
            <div className='flex items-start space-x-2'>
              <AlertCircle className='w-5 h-5 text-red-600 mt-0.5' />
              <div>
                <h3 className='text-sm font-medium text-red-800 mb-1'>Payment Error</h3>
                <ul className='text-sm text-red-700 space-y-1'>
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
