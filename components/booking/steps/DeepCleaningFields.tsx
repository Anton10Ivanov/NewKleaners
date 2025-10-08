'use client';

import React from 'react';

import { Calendar, Droplets, Zap } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { DeepCleaningDetails } from '@/types/bookingFlow';

interface DeepCleaningFieldsProps {
  data: Partial<DeepCleaningDetails>;
  onChange: (field: keyof DeepCleaningDetails, value: unknown) => void;
  errors?: Record<string, string> | undefined;
}

const cleaningLevels = [
  { value: 'light', label: 'Light', description: 'Regular maintenance cleaning' },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Thorough cleaning with attention to detail',
  },
  { value: 'heavy', label: 'Heavy', description: 'Deep cleaning with intensive scrubbing' },
  { value: 'extreme', label: 'Extreme', description: 'Complete restoration cleaning' },
];

export const DeepCleaningFields: React.FC<DeepCleaningFieldsProps> = ({
  data,
  onChange,
  errors: _errors,
}) => {
  return (
    <div className='space-y-6'>
      {/* Cleaning Level */}
      <Card className='bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-purple-900'>
            <Zap className='w-5 h-5 mr-2' />
            Cleaning Level Required
          </CardTitle>
          <CardDescription className='text-purple-700'>
            How intensive should the cleaning be?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.cleaningLevel || 'moderate'}
            onValueChange={value => onChange('cleaningLevel', value)}
            className='grid grid-cols-2 gap-4'
          >
            {cleaningLevels.map(level => (
              <div
                key={level.value}
                className={cn(
                  'flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200',
                  data.cleaningLevel === level.value
                    ? 'border-purple-500 bg-purple-100'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50',
                )}
              >
                <RadioGroupItem value={level.value} id={level.value} />
                <div className='flex-1'>
                  <Label htmlFor={level.value} className='font-medium cursor-pointer'>
                    {level.label}
                  </Label>
                  <p className='text-sm text-gray-600 mt-1'>{level.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Last Cleaned Date */}
      <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-blue-900'>
            <Calendar className='w-5 h-5 mr-2' />
            Last Cleaning Date
          </CardTitle>
          <CardDescription className='text-blue-700'>
            When was the property last professionally cleaned?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='lastCleanedDate'>Date of Last Cleaning</Label>
              <input
                id='lastCleanedDate'
                type='date'
                value={data.lastCleanedDate || ''}
                onChange={e => onChange('lastCleanedDate', e.target.value)}
                className='mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Conditions */}
      <Card className='bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-orange-900'>
            <Droplets className='w-5 h-5 mr-2' />
            Special Conditions
          </CardTitle>
          <CardDescription className='text-orange-700'>
            Any special cleaning challenges we should know about?
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
              <div>
                <Label htmlFor='hasStains' className='font-medium'>
                  Stains Present
                </Label>
                <p className='text-sm text-gray-600'>Carpet, upholstery, or surface stains</p>
              </div>
              <Switch
                id='hasStains'
                checked={data.hasStains || false}
                onCheckedChange={checked => onChange('hasStains', checked)}
              />
            </div>

            <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
              <div>
                <Label htmlFor='hasOdors' className='font-medium'>
                  Odor Issues
                </Label>
                <p className='text-sm text-gray-600'>Pet, smoke, or other persistent odors</p>
              </div>
              <Switch
                id='hasOdors'
                checked={data.hasOdors || false}
                onCheckedChange={checked => onChange('hasOdors', checked)}
              />
            </div>

            <div className='flex items-center justify-between p-4 bg-white rounded-lg border md:col-span-2'>
              <div>
                <Label htmlFor='requiresDisinfection' className='font-medium'>
                  Requires Disinfection
                </Label>
                <p className='text-sm text-gray-600'>
                  Medical-grade disinfection required (COVID-19, illness, etc.)
                </p>
              </div>
              <Switch
                id='requiresDisinfection'
                checked={data.requiresDisinfection || false}
                onCheckedChange={checked => onChange('requiresDisinfection', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
