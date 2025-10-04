'use client';

import React, { useState } from 'react';

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
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { BookingFlowState } from '@/types/bookingFlow';



interface PaymentStepProps {
  onNext: (bookingId: string) => void;
  onBack: () => void;
  onCancel?: () => void;
  bookingData: BookingFlowState;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, American Express',
    icon: CreditCard,
    popular: true,
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    description: 'Pay with Touch ID or Face ID',
    icon: '🍎',
    popular: false,
  },
  {
    id: 'google_pay',
    name: 'Google Pay',
    description: 'Quick and secure payment',
    icon: 'G',
    popular: false,
  },
];

const securityFeatures = [
  '256-bit SSL encryption',
  'PCI DSS compliant',
  'No card data stored',
  'Fraud protection',
  'Secure checkout',
];

export const PaymentStep: React.FC<PaymentStepProps> = ({
  onNext,
  onBack,
  onCancel,
  bookingData,
  errors,
  isLoading = false,
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleProcessPayment = async () => {
    if (!agreedToTerms) { return; }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onNext(`booking-${Date.now()}`);
    }, 2000);
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
      case 'one_time':
        return 'One-time cleaning';
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

  const formatTime = (timeSlot: any) => {
    return `${timeSlot.start} - ${timeSlot.end}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Complete Your Booking
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Review your booking details and complete your secure payment
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Payment Method */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment Method Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Payment Method
              </CardTitle>
              <CardDescription>
                Choose your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentMethods.map((method) => {
                  const renderIcon = () => {
                    if (typeof method.icon === 'string') {
                      return <span className="text-2xl">{method.icon}</span>;
                    } else {
                      const IconComponent = method.icon;
                      return <IconComponent className="w-6 h-6" />;
                    }
                  };

                  return (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPaymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                      onClick={() => handlePaymentMethodSelect(method.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          {renderIcon()}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{method.name}</h4>
                            {method.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{method.description}</p>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedPaymentMethod === method.id
                            ? 'border-primary bg-primary'
                            : 'border-gray-300'
                        }`}>
                          {selectedPaymentMethod === method.id && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-900">
                <Shield className="w-5 h-5 mr-2" />
                Secure Payment
              </CardTitle>
              <CardDescription className="text-green-700">
                Your payment information is protected with bank-level security
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-green-800">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  . I understand that this booking is subject to our cancellation policy.
                </Label>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service Details */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getServiceIcon()}</span>
                  <div>
                    <div className="font-medium">
                      {bookingData.serviceType?.replace('_', ' ').toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600">{getFrequencyText()}</div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2 font-medium">
                      {bookingData.schedule?.date ? formatDate(bookingData.schedule.date) : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Time:</span>
                    <span className="ml-2 font-medium">
                      {bookingData.schedule?.timeSlot ? formatTime(bookingData.schedule.timeSlot) : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-600">Duration:</span>
                    <span className="ml-2 font-medium">
                      {bookingData.estimate ?
                        `${Math.floor(bookingData.estimate.duration / 60)}h ${bookingData.estimate.duration % 60}m` :
                        'Not calculated'
                      }
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Pricing Breakdown */}
              {bookingData.estimate && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Base Service</span>
                    <span>${bookingData.estimate?.breakdown.baseService}</span>
                  </div>

                  {bookingData.estimate?.addOns && bookingData.estimate.addOns.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Add-ons:</div>
                      {bookingData.estimate.addOns.map((addOn) => (
                        <div key={addOn.id} className="flex justify-between text-sm text-gray-600 ml-2">
                          <span>{addOn.name}</span>
                          <span>+${addOn.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {bookingData.estimate?.discounts && bookingData.estimate.discounts.length > 0 && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Discounts:</div>
                      {bookingData.estimate.discounts.map((discount) => (
                        <div key={discount.id} className="flex justify-between text-sm text-green-600 ml-2">
                          <span>{discount.name}</span>
                          <span>-${discount.type === 'percentage' ?
                            Math.round((bookingData.estimate?.breakdown.baseService || 0) * discount.value / 100) :
                            discount.value
                          }</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span>${bookingData.estimate?.breakdown.taxes}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${bookingData.estimate?.breakdown.total}</span>
                  </div>
                </div>
              )}

              {/* Payment Security */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-800">
                    <p className="font-medium mb-1">Payment Security</p>
                    <p>Your payment is processed securely by Stripe. We never store your card details.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleProcessPayment}
              disabled={!agreedToTerms || isProcessing || isLoading}
              className="w-full"
              size="lg"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Processing Payment...
                </div>
              ) : (
                `Pay $${bookingData.estimate?.breakdown.total || 0}`
              )}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onBack}
                disabled={isProcessing}
              >
                Back to Schedule
              </Button>

              {onCancel && (
                <Button
                  variant="ghost"
                  onClick={onCancel}
                  disabled={isProcessing}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1" />
                4.9/5 Rating
              </div>
              <div className="flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 mr-1" />
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
          className="mt-6"
        >
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-800 mb-1">Payment Error</h3>
                <ul className="text-sm text-red-700 space-y-1">
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
