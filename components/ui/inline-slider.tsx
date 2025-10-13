'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface InlineSliderProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
  disabled?: boolean;
}

export const InlineSlider: React.FC<InlineSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  className,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onChange(newValue);
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('inline-flex items-center space-x-2', className)}>
      <span className='text-lg font-semibold text-gray-900 min-w-[3rem] text-center'>
        {value}
        {unit && <span className='text-sm text-gray-500 ml-1'>{unit}</span>}
      </span>

      <div className='relative flex-1 min-w-[120px] max-w-[200px]'>
        <input
          type='range'
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            // Custom slider styling
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5',
            '[&::-webkit-slider-thumb]:rounded-full',
            '[&::-webkit-slider-thumb]:bg-orange-500',
            '[&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:shadow-lg',
            '[&::-webkit-slider-thumb]:transition-all',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-webkit-slider-thumb]:active:scale-95',
            // Firefox
            '[&::-moz-range-thumb]:appearance-none',
            '[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5',
            '[&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-orange-500',
            '[&::-moz-range-thumb]:cursor-pointer',
            '[&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:shadow-lg',
            // Track styling
            '[&::-webkit-slider-track]:bg-gray-200',
            '[&::-webkit-slider-track]:rounded-lg',
            '[&::-webkit-slider-track]:h-2',
            '[&::-moz-range-track]:bg-gray-200',
            '[&::-moz-range-track]:rounded-lg',
            '[&::-moz-range-track]:h-2',
            '[&::-moz-range-track]:border-0',
          )}
          style={{
            background: `linear-gradient(to right, #f97316 0%, #f97316 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
      </div>
    </div>
  );
};
