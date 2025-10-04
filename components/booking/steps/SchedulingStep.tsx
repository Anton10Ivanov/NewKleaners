'use client';

import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { AlertCircle, Calendar, CheckCircle, Clock, MapPin, User } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { BookingSchedule, Estimate } from '@/types/bookingFlow';
import { CleaningFrequency, ServiceType } from '@/types/bookingFlow';



interface SchedulingStepProps {
  onNext: (schedule: BookingSchedule) => void;
  onBack: () => void;
  onSkip?: () => void;
  estimate: Estimate;
  serviceType: ServiceType;
  frequency: CleaningFrequency;
  data?: BookingSchedule | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const timeSlots = [
  { id: 'morning-1', start: '08:00', end: '10:00', label: '8:00 AM - 10:00 AM', available: true },
  { id: 'morning-2', start: '09:00', end: '11:00', label: '9:00 AM - 11:00 AM', available: true },
  { id: 'morning-3', start: '10:00', end: '12:00', label: '10:00 AM - 12:00 PM', available: true },
  { id: 'afternoon-1', start: '12:00', end: '14:00', label: '12:00 PM - 2:00 PM', available: true },
  { id: 'afternoon-2', start: '13:00', end: '15:00', label: '1:00 PM - 3:00 PM', available: true },
  { id: 'afternoon-3', start: '14:00', end: '16:00', label: '2:00 PM - 4:00 PM', available: true },
  { id: 'evening-1', start: '16:00', end: '18:00', label: '4:00 PM - 6:00 PM', available: true },
  { id: 'evening-2', start: '17:00', end: '19:00', label: '5:00 PM - 7:00 PM', available: false },
  { id: 'evening-3', start: '18:00', end: '20:00', label: '6:00 PM - 8:00 PM', available: false },
];

const getNextAvailableDates = (count: number = 14) => {
  const dates = [];
  const today = new Date();

  for (let i = 1; i <= count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip Sundays for residential cleaning
    if (date.getDay() !== 0) {
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
        available: true,
      });
    }
  }

  return dates;
};

export const SchedulingStep: React.FC<SchedulingStepProps> = ({
  onNext,
  onBack,
  estimate,
  serviceType,
  frequency,
  data,
  errors,
  isLoading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(data?.date || null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(data?.timeSlot?.start || null);
  const [availableDates] = useState(getNextAvailableDates());
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);

  useEffect(() => {
    // Filter time slots based on selected date and service type
    const filteredSlots = timeSlots.filter(slot => {
      // Office cleaning has different availability
      if (serviceType === ServiceType.OFFICE_CLEANING) {
        return slot.start >= '08:00' && slot.end <= '17:00';
      }
      return slot.available;
    });
    setAvailableTimeSlots(filteredSlots);
  }, [serviceType, selectedDate]);

  const handleDateSelect = (date: string | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTimeSlot(null); // Reset time selection when date changes
    }
  };

  const handleTimeSelect = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      const timeSlot = availableTimeSlots.find(slot => slot.id === selectedTimeSlot);
      if (timeSlot) {
        const schedule: BookingSchedule = {
          id: `schedule-${Date.now()}`,
          date: selectedDate,
          timeSlot: {
            start: timeSlot.start,
            end: timeSlot.end,
            isAvailable: true,
          },
          duration: estimate.duration,
          isAvailable: true,
          notes: `Estimated duration: ${Math.floor(estimate.duration / 60)}h ${estimate.duration % 60}m`,
        };
        onNext(schedule);
      }
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

  const getFrequencyText = () => {
    switch (frequency) {
      case CleaningFrequency.ONE_TIME:
        return 'One-time cleaning';
      case CleaningFrequency.WEEKLY:
        return 'Weekly cleaning';
      case CleaningFrequency.BI_WEEKLY:
        return 'Bi-weekly cleaning';
      case CleaningFrequency.MONTHLY:
        return 'Monthly cleaning';
      default:
        return 'Regular cleaning';
    }
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
          Schedule Your Cleaning Service
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your preferred date and time for your {getFrequencyText().toLowerCase()}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Date Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Service Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Service Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getServiceIcon()}</span>
                  <div>
                    <div className="font-medium">{serviceType.replace('_', ' ').toUpperCase()}</div>
                    <div className="text-sm text-gray-600">{getFrequencyText()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">${estimate.totalPrice}</div>
                  <div className="text-sm text-gray-600">
                    {Math.floor(estimate.duration / 60)}h {estimate.duration % 60}m
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Select Date
              </CardTitle>
              <CardDescription>
                Choose your preferred cleaning date
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableDates.map((dateInfo, index) => (
                  <motion.div
                    key={dateInfo.date}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => handleDateSelect(dateInfo.date)}
                      disabled={!dateInfo.available}
                      className={`w-full p-3 rounded-lg border text-center transition-all ${
                        selectedDate === dateInfo.date
                          ? 'border-primary bg-primary text-white'
                          : dateInfo.available
                            ? 'border-gray-200 hover:border-primary hover:bg-primary/5'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-sm font-medium">{dateInfo.display}</div>
                      {selectedDate === dateInfo.date && (
                        <CheckCircle className="w-4 h-4 mx-auto mt-1" />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Select Time
                  </CardTitle>
                  <CardDescription>
                    Available time slots for {new Date(selectedDate).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedTimeSlot || ''}
                    onValueChange={handleTimeSelect}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {availableTimeSlots.map((slot) => (
                      <motion.div
                        key={slot.id}
                        whileHover={{ scale: 1.02 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTimeSlot === slot.id
                            ? 'border-primary bg-primary/5'
                            : slot.available
                              ? 'border-gray-200 hover:border-primary/50'
                              : 'border-gray-100 bg-gray-50 cursor-not-allowed'
                        }`}
                        onClick={() => slot.available && handleTimeSelect(slot.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem
                            value={slot.id}
                            id={slot.id}
                            disabled={!slot.available}
                          />
                          <Label
                            htmlFor={slot.id}
                            className={`flex-1 cursor-pointer ${
                              !slot.available ? 'text-gray-400' : ''
                            }`}
                          >
                            {slot.label}
                          </Label>
                          {!slot.available && (
                            <Badge variant="secondary" className="text-xs">
                              Unavailable
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Right Column - Booking Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Service Details */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium">{serviceType.replace('_', ' ')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frequency</span>
                  <span className="font-medium">{getFrequencyText()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {Math.floor(estimate.duration / 60)}h {estimate.duration % 60}m
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Price</span>
                  <span className="font-bold text-primary">${estimate.totalPrice}</span>
                </div>
              </div>

              {/* Selected Schedule */}
              {selectedDate && selectedTimeSlot && (
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Date:</span>
                      <span className="ml-2 font-medium">
                        {new Date(selectedDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-gray-600">Time:</span>
                      <span className="ml-2 font-medium">
                        {availableTimeSlots.find(slot => slot.id === selectedTimeSlot)?.label}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-800">
                    <p className="font-medium mb-1">Important:</p>
                    <ul className="space-y-1">
                      <li>• We'll confirm your booking within 2 hours</li>
                      <li>• You can reschedule up to 24 hours before</li>
                      <li>• Our team will arrive within the scheduled window</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTimeSlot || isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Processing...' : 'Confirm & Continue to Payment'}
            </Button>

            <Button
              variant="outline"
              onClick={onBack}
              className="w-full"
            >
              Back to Package Selection
            </Button>
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
            <ul className="text-sm text-red-700 space-y-1">
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
