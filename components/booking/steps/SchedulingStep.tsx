'use client';

import React, { useEffect, useState } from 'react';

import { addDays, addMonths, format, isSameDay, startOfWeek, subMonths } from 'date-fns';
import { motion } from 'framer-motion';
import {
  AlertCircle,
  Building2,
  Calendar,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock,
  Clock3,
  Flame,
  Home,
  Microwave,
  Minus,
  PawPrint,
  Plus,
  Shirt,
  ShirtIcon,
  Square,
  Wind,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CleaningFrequency, ServiceType, type BookingSchedule } from '@/types/bookingFlow';

interface SchedulingStepProps {
  onNext: (
    schedule: BookingSchedule & { addOns: Record<string, number>; accessInstructions?: string },
  ) => void;
  onBack: () => void;
  onSkip?: () => void;
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

const addOns = [
  // Items with "N" - simple toggles
  {
    id: 'oven_cleaning',
    name: 'Oven cleaning',
    price: 45,
    icon: Flame,
    hasQuantity: false, // N - no stepper
  },
  {
    id: 'cooker_hood_cleaning',
    name: 'Cooker hood cleaning',
    price: 35,
    icon: ChefHat,
    hasQuantity: false, // N - no stepper
  },
  {
    id: 'kitchen_cabinet_cleaning',
    name: 'Kitchen cabinet cleaning',
    price: 30,
    icon: Home,
    hasQuantity: false, // N - no stepper
  },
  {
    id: 'dishwashing',
    name: 'Dishwashing',
    price: 20,
    icon: Square,
    hasQuantity: false, // N - no stepper
  },
  {
    id: 'microwave_cleaning',
    name: 'Microwave cleaning',
    price: 25,
    icon: Microwave,
    hasQuantity: false, // N - no stepper
  },
  {
    id: 'ironing',
    name: 'Ironing',
    price: 15,
    icon: ShirtIcon,
    hasQuantity: true, // Has stepper
  },
  {
    id: 'pet_toilet_cleaning',
    name: 'Pet toilet cleaning',
    price: 20,
    icon: PawPrint,
    hasQuantity: false, // N - no stepper
  },
  {
    id: 'wardrobe_cleaning',
    name: 'Wardrobe cleaning',
    price: 25,
    icon: Shirt,
    hasQuantity: true, // Has stepper
  },

  // Items without "N" - with stepper controls
  {
    id: 'refrigerator_cleaning',
    name: 'Refrigerator cleaning',
    price: 40,
    icon: Wind,
    hasQuantity: true, // Has stepper
  },
  {
    id: 'balcony_cleaning',
    name: 'Balcony cleaning',
    price: 30,
    icon: Building2,
    hasQuantity: true, // Has stepper
  },
  {
    id: 'window_cleaning',
    name: 'Window cleaning (both sides)',
    price: 8,
    icon: Square,
    hasQuantity: true, // Has stepper - per piece
    unit: 'per piece',
  },
  {
    id: 'additional_hours',
    name: 'Additional hours',
    price: 25,
    icon: Clock3,
    hasQuantity: true, // Has stepper
    unit: 'per hour',
  },
];

const CalendarComponent: React.FC<{
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
  serviceType: ServiceType;
}> = ({ selectedDate, onDateSelect, serviceType }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    // Generate available dates (next 30 days, excluding Sundays for residential)
    const dates: Date[] = [];
    const today = new Date();

    for (let i = 1; i <= 30; i++) {
      const date = addDays(today, i);

      // Skip Sundays for residential cleaning
      if (serviceType !== ServiceType.OFFICE_CLEANING && date.getDay() === 0) {
        continue;
      }

      dates.push(date);
    }

    setAvailableDates(dates);
  }, [serviceType]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = startOfWeek(new Date(year, month, 1));
    const lastDay = startOfWeek(new Date(year, month + 1, 0));

    const days = [];
    let current = firstDay;

    while (current <= lastDay) {
      days.push(new Date(current));
      current = addDays(current, 1);
    }

    return days;
  };

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate => isSameDay(availableDate, date));
  };

  const isDateSelected = (date: Date) => {
    return selectedDate && isSameDay(selectedDate, date);
  };

  const isToday = (date: Date) => {
    return isSameDay(date, new Date());
  };

  const handleDateClick = (date: Date) => {
    if (isDateAvailable(date)) {
      onDateSelect(date);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card className='p-4'>
      <CardHeader className='pb-4'>
        <div className='flex items-center justify-between'>
          <CardTitle className='text-lg font-semibold'>
            {format(currentMonth, 'MMMM yyyy')}
          </CardTitle>
          <div className='flex space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigateMonth('prev')}
              className='h-8 w-8 p-0'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => navigateMonth('next')}
              className='h-8 w-8 p-0'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Week day headers */}
        <div className='grid grid-cols-7 gap-1 mb-2'>
          {weekDays.map(day => (
            <div key={day} className='text-center text-sm font-medium text-gray-500 py-2'>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className='grid grid-cols-7 gap-1'>
          {days.map((date, _index) => {
            const available = isDateAvailable(date);
            const selected = isDateSelected(date);
            const today = isToday(date);
            const isCurrentMonth = date.getMonth() === currentMonth.getMonth();

            return (
              <motion.button
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                whileHover={available ? { scale: 1.05 } : {}}
                whileTap={available ? { scale: 0.95 } : {}}
                onClick={() => handleDateClick(date)}
                disabled={!available}
                className={`
                  h-10 w-full rounded-lg text-sm font-medium transition-all
                  ${!isCurrentMonth ? 'text-gray-300' : ''}
                  ${today ? 'ring-2 ring-blue-500 ring-offset-1' : ''}
                  ${
                    selected
                      ? 'bg-orange-500 text-white shadow-lg'
                      : available
                        ? 'text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 hover:border-orange-300'
                        : 'text-gray-400 cursor-not-allowed bg-gray-50'
                  }
                `}
              >
                {format(date, 'd')}
              </motion.button>
            );
          })}
        </div>

        {/* Legend */}
        <div className='flex items-center justify-center space-x-4 mt-4 text-xs text-gray-500'>
          <div className='flex items-center space-x-1'>
            <div className='w-3 h-3 bg-orange-500 rounded' />
            <span>Selected</span>
          </div>
          <div className='flex items-center space-x-1'>
            <div className='w-3 h-3 bg-blue-500 rounded-full' />
            <span>Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SchedulingStep: React.FC<SchedulingStepProps> = ({
  onNext,
  onBack,
  serviceType,
  frequency,
  data,
  errors,
  isLoading = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    data?.date ? new Date(data.date) : null,
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(
    data?.timeSlot?.start || null,
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState(timeSlots);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});
  const [accessInstructions, setAccessInstructions] = useState<string>('');

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

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null); // Reset time selection when date changes
  };

  const handleTimeSelect = (timeSlotId: string) => {
    setSelectedTimeSlot(timeSlotId);
  };

  const handleAddOnToggle = (addOnId: string) => {
    const addOn = addOns.find(a => a.id === addOnId);
    if (!addOn) {
      return;
    }

    setSelectedAddOns(prev => {
      if (addOn.hasQuantity) {
        // Items with quantity: toggle between 0 and 1, then allow stepper
        const currentQuantity = prev[addOnId] || 0;
        return {
          ...prev,
          [addOnId]: currentQuantity === 0 ? 1 : 0,
        };
      } else {
        // Items without quantity: simple toggle
        const currentQuantity = prev[addOnId] || 0;
        return {
          ...prev,
          [addOnId]: currentQuantity === 0 ? 1 : 0,
        };
      }
    });
  };

  const handleQuantityChange = (addOnId: string, change: 'increment' | 'decrement') => {
    setSelectedAddOns(prev => {
      const currentQuantity = prev[addOnId] || 0;
      let newQuantity = currentQuantity;

      if (change === 'increment') {
        newQuantity = currentQuantity + 1;
      } else if (change === 'decrement' && currentQuantity > 0) {
        newQuantity = currentQuantity - 1;
      }

      return {
        ...prev,
        [addOnId]: newQuantity,
      };
    });
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      const timeSlot = availableTimeSlots.find(slot => slot.id === selectedTimeSlot);
      if (timeSlot) {
        const schedule = {
          id: `schedule-${Date.now()}`,
          date: selectedDate.toISOString().slice(0, 10),
          timeSlot: {
            start: timeSlot.start,
            end: timeSlot.end,
            isAvailable: true,
          },
          duration: 120, // Default 2 hours duration
          isAvailable: true,
          notes: 'Estimated duration: 2h 0m',
          addOns: selectedAddOns,
          ...(accessInstructions && { accessInstructions }),
        };
        onNext(schedule);
      }
    }
  };

  const getFrequencyText = () => {
    switch (frequency) {
      case CleaningFrequency.ONCE:
        return 'Once cleaning';
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
    <div className='w-full max-w-4xl mx-auto px-2 sm:px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-6'
      >
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Schedule Your Cleaning Service</h2>
        <p className='text-gray-600'>
          Choose your preferred date and time for your {getFrequencyText().toLowerCase()}
        </p>
      </motion.div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Calendar */}
        <div>
          <CalendarComponent
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            serviceType={serviceType}
          />
        </div>

        {/* Time Selection */}
        <div>
          {selectedDate ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className='p-4'>
                <CardHeader className='pb-4'>
                  <CardTitle className='flex items-center text-lg'>
                    <Clock className='w-5 h-5 mr-2' />
                    Select Time
                  </CardTitle>
                  <CardDescription>
                    Available time slots for {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedTimeSlot || ''}
                    onValueChange={handleTimeSelect}
                    className='grid grid-cols-1 gap-2'
                  >
                    {availableTimeSlots.map(slot => (
                      <motion.div
                        key={slot.id}
                        whileHover={{ scale: 1.02 }}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          selectedTimeSlot === slot.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700'
                            : slot.available
                              ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={() => slot.available && handleTimeSelect(slot.id)}
                      >
                        <div className='flex items-center space-x-3'>
                          <RadioGroupItem
                            value={slot.id}
                            id={slot.id}
                            disabled={!slot.available}
                            className={selectedTimeSlot === slot.id ? 'border-orange-500' : ''}
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
                            <Badge variant='secondary' className='text-xs'>
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
          ) : (
            <Card className='p-4'>
              <CardContent className='flex items-center justify-center h-48'>
                <div className='text-center text-gray-500'>
                  <Calendar className='w-12 h-12 mx-auto mb-2 opacity-50' />
                  <p>Select a date to see available time slots</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add-on Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='mt-8'
      >
        <Card className='p-4'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Plus className='w-5 h-5 mr-2' />
              Add-on Services
            </CardTitle>
            <CardDescription>
              Enhance your cleaning service with these additional options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
              {addOns.map(addOn => {
                const isSelected = (selectedAddOns[addOn.id] || 0) > 0;
                const quantity = selectedAddOns[addOn.id] || 0;
                const IconComponent = addOn.icon;

                return (
                  <motion.div
                    key={addOn.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                    }`}
                    onClick={() => handleAddOnToggle(addOn.id)}
                  >
                    {/* Icon */}
                    <div
                      className={`w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <IconComponent className='w-4 h-4' />
                    </div>

                    {/* Name */}
                    <h4
                      className={`text-sm font-medium text-center mb-1 ${
                        isSelected ? 'text-orange-700' : 'text-gray-700'
                      }`}
                    >
                      {addOn.name}
                    </h4>

                    {/* Price */}
                    <div
                      className={`text-center text-xs font-semibold ${
                        isSelected ? 'text-orange-600' : 'text-gray-500'
                      }`}
                    >
                      €{addOn.price}
                      {addOn.unit && <span className='text-gray-400'>/{addOn.unit}</span>}
                    </div>

                    {/* Stepper Controls for items with quantity */}
                    {addOn.hasQuantity && isSelected && (
                      <div className='mt-2 flex items-center justify-center space-x-2'>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleQuantityChange(addOn.id, 'decrement');
                          }}
                          className='w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors'
                        >
                          <Minus className='w-3 h-3' />
                        </button>
                        <span className='text-sm font-medium text-orange-700 min-w-[20px] text-center'>
                          {quantity}
                        </span>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            handleQuantityChange(addOn.id, 'increment');
                          }}
                          className='w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors'
                        >
                          <Plus className='w-3 h-3' />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='mt-6'
      >
        <Card className='p-4'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <AlertCircle className='w-5 h-5 mr-2' />
              Additional Information
            </CardTitle>
            <CardDescription>
              Help us provide the best service by sharing any special instructions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-2'>
              <Label htmlFor='accessInstructions' className='text-sm font-medium'>
                Access Instructions
              </Label>
              <Textarea
                id='accessInstructions'
                value={accessInstructions}
                onChange={e => setAccessInstructions(e.target.value)}
                placeholder='e.g., Key under the mat, Ring doorbell, etc.'
                rows={4}
                className='text-base'
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4'
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedTimeSlot || isLoading}
          className='flex-1'
          size='lg'
        >
          {isLoading ? 'Processing...' : 'Continue to Payment'}
        </Button>

        <Button variant='outline' onClick={onBack} className='flex-1 sm:flex-none'>
          Back to Effort Level
        </Button>
      </motion.div>

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
