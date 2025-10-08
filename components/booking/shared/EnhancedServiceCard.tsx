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

  // Determine card background and text colors based on service type
  const getCardColors = () => {
    if (serviceType === 'HOME_CLEANING') {
      return {
        background: 'bg-orange-peel',
        textColor: 'text-black',
        iconColor: 'text-black',
      };
    }
    if (serviceType === 'OFFICE_CLEANING') {
      return {
        background: 'bg-oxford-blue',
        textColor: 'text-white',
        iconColor: 'text-white',
      };
    }
    return {
      background: isMainVariant ? 'bg-seasalt' : 'bg-white',
      textColor: 'text-oxford-blue',
      iconColor: 'text-oxford-blue',
    };
  };

  const cardColors = getCardColors();

  return (
    <Card
      className={cn(
        'relative cursor-pointer transition-all duration-300 group',
        // Dynamic background based on service type
        cardColors.background,
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
          <Icon className={cn(cardColors.iconColor, isMainVariant ? 'w-8 h-8' : 'w-6 h-6')} />
          <div className='flex-1'>
            <h3
              className={cn(
                'font-semibold',
                cardColors.textColor,
                isMainVariant ? 'text-xl' : 'text-lg',
              )}
            >
              {shortTitle}
            </h3>
            <p
              className={cn(
                isMainVariant ? 'text-sm' : 'text-xs',
                serviceType === 'HOME_CLEANING'
                  ? 'text-black/70'
                  : serviceType === 'OFFICE_CLEANING'
                    ? 'text-white/80'
                    : 'text-gray-600',
              )}
            >
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
                'flex items-center',
                isMainVariant ? 'text-sm' : 'text-xs',
                serviceType === 'HOME_CLEANING'
                  ? 'text-black/80'
                  : serviceType === 'OFFICE_CLEANING'
                    ? 'text-white/90'
                    : 'text-gray-700',
              )}
            >
              <div
                className={cn(
                  'w-1 h-1 rounded-full mr-3 flex-shrink-0',
                  serviceType === 'HOME_CLEANING'
                    ? 'bg-black/60'
                    : serviceType === 'OFFICE_CLEANING'
                      ? 'bg-white/70'
                      : 'bg-gray-400',
                )}
              />
              {feature}
            </li>
          ))}
        </ul>

        {/* Trust Signals */}
        <div
          className={cn(
            'flex items-center gap-4 text-xs',
            serviceType === 'HOME_CLEANING'
              ? 'text-black/60'
              : serviceType === 'OFFICE_CLEANING'
                ? 'text-white/70'
                : 'text-gray-500',
          )}
        >
          <div className='flex items-center'>
            <Shield
              className={cn(
                'w-3 h-3 mr-1',
                serviceType === 'HOME_CLEANING'
                  ? 'text-black/60'
                  : serviceType === 'OFFICE_CLEANING'
                    ? 'text-white/70'
                    : 'text-gray-500',
              )}
            />
            <span className='hidden sm:inline'>Insured</span>
          </div>
          <div className='flex items-center'>
            <Leaf
              className={cn(
                'w-3 h-3 mr-1',
                serviceType === 'HOME_CLEANING'
                  ? 'text-black/60'
                  : serviceType === 'OFFICE_CLEANING'
                    ? 'text-white/70'
                    : 'text-gray-500',
              )}
            />
            <span className='hidden sm:inline'>Eco-friendly</span>
          </div>
          <div className='flex items-center'>
            <CreditCard
              className={cn(
                'w-3 h-3 mr-1',
                serviceType === 'HOME_CLEANING'
                  ? 'text-black/60'
                  : serviceType === 'OFFICE_CLEANING'
                    ? 'text-white/70'
                    : 'text-gray-500',
              )}
            />
            <span className='hidden sm:inline'>Secure</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
