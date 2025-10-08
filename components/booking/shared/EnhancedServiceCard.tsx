'use client';

import React from 'react';

import { CreditCard, Leaf, Shield, type LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EnhancedServiceCardProps {
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  popular?: boolean;
  variant: 'main' | 'specialized';
  isSelected?: boolean;
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  'aria-pressed'?: boolean;
  'aria-label'?: string;
  tabIndex?: number;
  role?: string;
  serviceType?: string;
}

export const EnhancedServiceCard: React.FC<EnhancedServiceCardProps> = ({
  title,
  shortTitle,
  description,
  icon: Icon,
  features,
  popular = false,
  variant,
  isSelected = false,
  onClick,
  onKeyDown,
  'aria-pressed': ariaPressed,
  'aria-label': ariaLabel,
  tabIndex = 0,
  role = 'button',
  serviceType,
}) => {
  const isMainVariant = variant === 'main';

  // Determine title color based on service type
  const getTitleColor = () => {
    if (serviceType === 'HOME_CLEANING') {
      return 'text-orange-peel';
    }
    if (serviceType === 'OFFICE_CLEANING') {
      return 'text-oxford-blue';
    }
    return 'text-oxford-blue'; // default
  };

  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all duration-300 group',
        // Background based on variant
        isMainVariant ? 'bg-seasalt' : 'bg-white',
        // Border and selection states
        isSelected
          ? 'ring-2 ring-orange-peel border-orange-peel shadow-lg'
          : 'border-gray-200 hover:border-orange-peel hover:shadow-lg',
      )}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
    >
      {/* Popular Badge */}
      {popular && (
        <Badge
          className='absolute -top-2 -left-2 z-10 bg-orange-peel text-black caption font-semibold shadow'
          variant='default'
        >
          Popular
        </Badge>
      )}

      <CardContent className={cn('p-4', isMainVariant ? 'p-6' : 'p-4')}>
        {/* Header Section */}
        <div className='flex items-start gap-3 mb-4'>
          <Icon className={cn('text-oxford-blue', isMainVariant ? 'w-8 h-8' : 'w-6 h-6')} />
          <div className='flex-1'>
            <h3
              className={cn(
                'font-semibold',
                getTitleColor(),
                isMainVariant ? 'text-xl' : 'text-lg',
              )}
            >
              {shortTitle}
            </h3>
            <p className={cn('text-gray-600', isMainVariant ? 'text-sm' : 'text-xs')}>
              {description}
            </p>
          </div>
        </div>

        {/* Features List */}
        <ul className={cn('space-y-2 mb-4', isMainVariant ? 'space-y-2' : 'space-y-1')}>
          {features.map(feature => (
            <li
              key={`${title}-feature-${feature}`}
              className={cn(
                'flex items-center text-sm text-gray-700',
                isMainVariant ? 'text-sm' : 'text-xs',
              )}
            >
              <div className='w-1 h-1 bg-gray-400 rounded-full mr-3 flex-shrink-0' />
              {feature}
            </li>
          ))}
        </ul>

        {/* Trust Signals */}
        <div className='flex items-center gap-4 text-xs text-gray-500'>
          <div className='flex items-center'>
            <Shield className='w-3 h-3 mr-1' />
            <span className='hidden sm:inline'>Insured</span>
          </div>
          <div className='flex items-center'>
            <Leaf className='w-3 h-3 mr-1' />
            <span className='hidden sm:inline'>Eco-friendly</span>
          </div>
          <div className='flex items-center'>
            <CreditCard className='w-3 h-3 mr-1' />
            <span className='hidden sm:inline'>Secure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
