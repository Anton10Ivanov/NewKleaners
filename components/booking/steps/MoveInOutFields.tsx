'use client';

import { Calendar, Home, Package, Truck } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { MoveInOutDetails } from '@/types/bookingFlow';

interface MoveInOutFieldsProps {
  data: Partial<MoveInOutDetails>;
  onChange: (field: keyof MoveInOutDetails, value: unknown) => void;
  errors?: Record<string, string> | undefined;
}

const moveTypes = [
  { value: 'move_in', label: 'Move In', description: 'Cleaning before moving in' },
  { value: 'move_out', label: 'Move Out', description: 'Cleaning after moving out' },
  { value: 'both', label: 'Both', description: 'Cleaning before and after' },
];

const propertyConditions = [
  {
    value: 'excellent',
    label: 'Excellent',
    description: 'Well maintained, minimal cleaning needed',
  },
  { value: 'good', label: 'Good', description: 'Generally clean, some attention needed' },
  { value: 'fair', label: 'Fair', description: 'Moderate cleaning required' },
  { value: 'poor', label: 'Poor', description: 'Heavy cleaning and restoration needed' },
];

export const MoveInOutFields: React.FC<MoveInOutFieldsProps> = ({ data, onChange, errors }) => {
  return (
    <div className='space-y-6'>
      {/* Move Type */}
      <Card className='bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-green-900'>
            <Truck className='w-5 h-5 mr-2' />
            Move Type
          </CardTitle>
          <CardDescription className='text-green-700'>
            What type of move cleaning do you need?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.moveType || 'move_in'}
            onValueChange={value => onChange('moveType', value)}
            className='grid grid-cols-1 md:grid-cols-3 gap-4'
          >
            {moveTypes.map(type => (
              <div
                key={type.value}
                className={cn(
                  'flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200',
                  data.moveType === type.value
                    ? 'border-green-500 bg-green-100'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50',
                )}
              >
                <RadioGroupItem value={type.value} id={type.value} />
                <div className='flex-1'>
                  <Label htmlFor={type.value} className='font-medium cursor-pointer'>
                    {type.label}
                  </Label>
                  <p className='text-sm text-gray-600 mt-1'>{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Move Date */}
      <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-blue-900'>
            <Calendar className='w-5 h-5 mr-2' />
            Move Date
          </CardTitle>
          <CardDescription className='text-blue-700'>When is your move scheduled?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='moveDate'>Move Date</Label>
              <input
                id='moveDate'
                type='date'
                value={data.moveDate || ''}
                onChange={e => onChange('moveDate', e.target.value)}
                className='mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Condition */}
      <Card className='bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-purple-900'>
            <Home className='w-5 h-5 mr-2' />
            Property Condition
          </CardTitle>
          <CardDescription className='text-purple-700'>
            How would you describe the current condition of the property?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.propertyCondition || 'good'}
            onValueChange={value => onChange('propertyCondition', value)}
            className='grid grid-cols-2 gap-4'
          >
            {propertyConditions.map(condition => (
              <div
                key={condition.value}
                className={cn(
                  'flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200',
                  data.propertyCondition === condition.value
                    ? 'border-purple-500 bg-purple-100'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50',
                )}
              >
                <RadioGroupItem value={condition.value} id={condition.value} />
                <div className='flex-1'>
                  <Label htmlFor={condition.value} className='font-medium cursor-pointer'>
                    {condition.label}
                  </Label>
                  <p className='text-sm text-gray-600 mt-1'>{condition.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Additional Services */}
      <Card className='bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-orange-900'>
            <Package className='w-5 h-5 mr-2' />
            Additional Services
          </CardTitle>
          <CardDescription className='text-orange-700'>
            Any additional services needed for your move?
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
              <div>
                <Label htmlFor='hasAppliances' className='font-medium'>
                  Appliance Cleaning
                </Label>
                <p className='text-sm text-gray-600'>Clean inside and outside of appliances</p>
              </div>
              <Switch
                id='hasAppliances'
                checked={data.hasAppliances || false}
                onCheckedChange={checked => onChange('hasAppliances', checked)}
              />
            </div>

            <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
              <div>
                <Label htmlFor='requiresDeepClean' className='font-medium'>
                  Deep Clean Required
                </Label>
                <p className='text-sm text-gray-600'>
                  Intensive cleaning beyond standard move cleaning
                </p>
              </div>
              <Switch
                id='requiresDeepClean'
                checked={data.requiresDeepClean || false}
                onCheckedChange={checked => onChange('requiresDeepClean', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
