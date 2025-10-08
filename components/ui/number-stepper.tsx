'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label: string;
  unit?: string;
  disabled?: boolean;
  className?: string;
}

export const NumberStepper: React.FC<NumberStepperProps> = ({
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  label,
  unit = '',
  disabled = false,
  className,
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(value + step, max);
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - step, min);
    if (newValue !== value) {
      onChange(newValue);
    }
  };

  const isAtMin = value <= min;
  const isAtMax = value >= max;

  return (
    <div className={cn('flex flex-col items-center space-y-3', className)}>
      <label className='text-sm font-medium text-gray-700 text-center'>
        {label}
        {unit && <span className='text-gray-500 ml-1'>({unit})</span>}
      </label>

      <div className='flex items-center space-x-3'>
        {/* Decrement Button */}
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={handleDecrement}
          disabled={disabled || isAtMin}
          className={cn(
            'h-10 w-10 rounded-full border-2 transition-all duration-200',
            'hover:scale-105 active:scale-95',
            {
              'border-gray-300 text-gray-400 cursor-not-allowed': disabled || isAtMin,
              'border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600':
                !disabled && !isAtMin,
            },
          )}
          aria-label={`Decrease ${label}`}
        >
          <Minus className='h-4 w-4' />
        </Button>

        {/* Value Display */}
        <div className='min-w-[60px] text-center'>
          <span className='text-2xl font-semibold text-gray-900'>{value}</span>
        </div>

        {/* Increment Button */}
        <Button
          type='button'
          variant='outline'
          size='icon'
          onClick={handleIncrement}
          disabled={disabled || isAtMax}
          className={cn(
            'h-10 w-10 rounded-full border-2 transition-all duration-200',
            'hover:scale-105 active:scale-95',
            {
              'border-gray-300 text-gray-400 cursor-not-allowed': disabled || isAtMax,
              'border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600':
                !disabled && !isAtMax,
            },
          )}
          aria-label={`Increase ${label}`}
        >
          <Plus className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};
