'use client';

import React from 'react';

import { motion } from 'framer-motion';
import {
  Building2,
  CreditCard,
  Hammer,
  Home,
  Leaf,
  Shield,
  Sparkles,
  Square,
  Truck,
  type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ServiceType } from '@/types/bookingFlow';

interface ServiceSelectionStepProps {
  onNext: (serviceType: ServiceType) => void;
  onBack: () => void;
  onSkip?: () => void;
  preselectedService?: ServiceType | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

interface ServiceCardConfig {
  id: string;
  type: ServiceType;
  title: string;
  shortTitle: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  popular: boolean;
  startingFrom: number;
  differentiator: string;
}

const services: ServiceCardConfig[] = [
  {
    id: 'home-cleaning',
    type: ServiceType.HOME_CLEANING,
    title: 'Home Cleaning',
    shortTitle: 'Home',
    description: 'Professional home cleaning in 3 effort levels',
    icon: Home,
    features: [
      'BASIC: Essential cleaning',
      'STANDARD: Professional quality',
      'KLEANERS: Luxury experience',
    ],
    popular: true,
    startingFrom: 60,
    differentiator: 'Pricing varies by property size and effort level',
  },
  {
    id: 'office-cleaning',
    type: ServiceType.OFFICE_CLEANING,
    title: 'Office Cleaning',
    shortTitle: 'Office',
    description: 'Professional commercial cleaning for businesses',
    icon: Building2,
    features: ['Flexible scheduling', 'Deep office cleaning', 'Specialized equipment'],
    popular: false,
    startingFrom: 149,
    differentiator: 'Perfect for offices of any size',
  },
];

const specializedServices: ServiceCardConfig[] = [
  {
    id: 'deep-cleaning',
    type: ServiceType.DEEP_CLEANING,
    title: 'Deep Cleaning',
    shortTitle: 'Deep',
    description: 'Intensive cleaning for special occasions',
    icon: Sparkles,
    features: ['Detailed cleaning', 'Hard-to-reach areas', 'Sanitization'],
    popular: false,
    startingFrom: 199,
    differentiator: 'Ideal before/after events and seasonal refresh',
  },
  {
    id: 'move-in-out',
    type: ServiceType.MOVE_IN_OUT,
    title: 'Move In/Out',
    shortTitle: 'Move In/Out',
    description: 'Cleaning services for moving transitions',
    icon: Truck,
    features: ['Pre-move cleaning', 'Post-move cleaning', 'Full property cleaning'],
    popular: false,
    startingFrom: 179,
    differentiator: 'Thorough clean to hand over or move in with confidence',
  },
  {
    id: 'post-construction',
    type: ServiceType.POST_CONSTRUCTION,
    title: 'Construction Cleaning',
    shortTitle: 'Construction',
    description: 'Specialized cleaning after construction work',
    icon: Hammer,
    features: ['Debris removal', 'Dust elimination', 'Final polish & detail'],
    popular: false,
    startingFrom: 249,
    differentiator: 'Removes fine dust and residue after renovation',
  },
  {
    id: 'window-cleaning',
    type: ServiceType.WINDOW_CLEANING,
    title: 'Window Cleaning',
    shortTitle: 'Windows',
    description: 'Professional interior and exterior window cleaning',
    icon: Square,
    features: ['Interior & exterior', 'Streak-free finish', 'Safety equipment'],
    popular: false,
    startingFrom: 89,
    differentiator: 'Crystal clear windows for maximum light',
  },
];

interface ServiceStyle {
  bgTint: string;
  border: string;
  headerBg: string;
  accentText: string;
  dotBg: string;
}

const stylesByType: Record<ServiceType, ServiceStyle> = {
  [ServiceType.HOME_CLEANING]: {
    bgTint: 'bg-emerald/10',
    border: 'border-emerald/20',
    headerBg: 'bg-emerald/15',
    accentText: 'text-emerald',
    dotBg: 'bg-emerald',
  },
  [ServiceType.OFFICE_CLEANING]: {
    bgTint: 'bg-teal/10',
    border: 'border-teal/20',
    headerBg: 'bg-teal/15',
    accentText: 'text-teal',
    dotBg: 'bg-teal',
  },
  [ServiceType.DEEP_CLEANING]: {
    bgTint: 'bg-purple/10',
    border: 'border-purple/20',
    headerBg: 'bg-purple/15',
    accentText: 'text-purple',
    dotBg: 'bg-purple',
  },
  [ServiceType.MOVE_IN_OUT]: {
    bgTint: 'bg-amber/10',
    border: 'border-amber/20',
    headerBg: 'bg-amber/15',
    accentText: 'text-amber',
    dotBg: 'bg-amber',
  },
  [ServiceType.POST_CONSTRUCTION]: {
    bgTint: 'bg-copper/10',
    border: 'border-copper/20',
    headerBg: 'bg-copper/15',
    accentText: 'text-copper',
    dotBg: 'bg-copper',
  },
  [ServiceType.WINDOW_CLEANING]: {
    bgTint: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    headerBg: 'bg-blue-500/15',
    accentText: 'text-blue-500',
    dotBg: 'bg-blue-500',
  },
};

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onNext,
  onBack,
  preselectedService,
  errors,
  isLoading: _isLoading = false,
}) => {
  const handleServiceSelect = (serviceType: ServiceType) => {
    onNext(serviceType);
  };

  return (
    <div className='w-full max-w-6xl mx-auto px-2 sm:px-4'>
      {/* Main Services */}
      <div className='mb-8'>
        <h3 className='heading-4 text-oxford-blue-500-500 mb-4'>Main Services</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 lg:gap-6'>
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isSelected = preselectedService === service.type;
            const s = stylesByType[service.type];

            return (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    'relative cursor-pointer transition-all duration-300 group hover:shadow-xl',
                    s.bgTint,
                    s.border,
                    isSelected
                      ? 'ring-2 ring-primary border-primary shadow-lg'
                      : 'hover:ring-1 hover:ring-primary/30',
                  )}
                  onClick={() => handleServiceSelect(service.type)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceSelect(service.type);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${service.shortTitle} service`}
                >
                  {service.popular && (
                    <Badge
                      className='absolute -top-2 -left-2 z-10 bg-primary text-primary-foreground caption font-semibold shadow'
                      variant='default'
                    >
                      Popular
                    </Badge>
                  )}

                  {/* Category Header with price pill */}
                  <div className={cn('p-3 sm:p-4 lg:p-5 rounded-t-lg', s.headerBg)}>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='mobile-hidden-svg'>
                          <div
                            className={cn(
                              'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center',
                              s.dotBg,
                              'text-primary-foreground/95',
                            )}
                          >
                            <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground' />
                          </div>
                        </div>
                        <div>
                          <h3 className='heading-5 sm:heading-4 text-oxford-blue-500'>
                            {service.shortTitle}
                          </h3>
                          <p className='caption sm:body-small text-oxford-blue-500/70'>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className='pt-0 p-3 sm:p-4 lg:p-6'>
                    {/* Key differentiator */}
                    <div className='mb-3 sm:mb-4 lg:mb-5 p-2 rounded-md bg-accent/5'>
                      <p className='caption font-medium text-accent-foreground/80'>
                        {service.differentiator}
                      </p>
                    </div>

                    {/* Tiered features */}
                    <ul className='space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 lg:mb-6'>
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={`${service.id}-feature-${feature}`}
                          className={cn(
                            'flex items-center caption sm:body-small',
                            featureIndex === 0
                              ? 'font-semibold text-foreground'
                              : 'text-muted-foreground',
                          )}
                        >
                          <div
                            className={cn('w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0', s.dotBg)}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Trust & clarity signals */}
                    <div className='flex items-center gap-4 text-[11px] text-muted-foreground mb-4 sm:mb-6'>
                      <span className='inline-flex items-center'>
                        <Shield className='w-3.5 h-3.5 mr-1' /> Insured
                      </span>
                      <span className='inline-flex items-center'>
                        <Leaf className='w-3.5 h-3.5 mr-1' /> Eco-friendly
                      </span>
                      <span className='inline-flex items-center'>
                        <CreditCard className='w-3.5 h-3.5 mr-1' /> Secure payment
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Specialized Services */}
      <div className='mb-8'>
        <h3 className='heading-4 text-oxford-blue-500 mb-4'>Specialized Services</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6'>
          {specializedServices.map((service, index) => {
            const IconComponent = service.icon;
            const isSelected = preselectedService === service.type;
            const s = stylesByType[service.type];

            return (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    'relative cursor-pointer transition-all duration-300 group hover:shadow-xl',
                    s.bgTint,
                    s.border,
                    isSelected
                      ? 'ring-2 ring-primary border-primary shadow-lg'
                      : 'hover:ring-1 hover:ring-primary/30',
                  )}
                  onClick={() => handleServiceSelect(service.type)}
                  role='button'
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceSelect(service.type);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${service.shortTitle} service`}
                >
                  {/* Category Header with price pill */}
                  <div className={cn('p-3 sm:p-4 lg:p-5 rounded-t-lg', s.headerBg)}>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2 sm:gap-3'>
                        <div className='mobile-hidden-svg'>
                          <div
                            className={cn(
                              'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center',
                              s.dotBg,
                              'text-primary-foreground/95',
                            )}
                          >
                            <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground' />
                          </div>
                        </div>
                        <div>
                          <h3 className='heading-5 sm:heading-4 text-oxford-blue-500'>
                            {service.shortTitle}
                          </h3>
                          <p className='caption sm:body-small text-oxford-blue-500/70'>
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardContent className='pt-0 p-3 sm:p-4 lg:p-6'>
                    {/* Key differentiator */}
                    <div className='mb-3 sm:mb-4 lg:mb-5 p-2 rounded-md bg-accent/5'>
                      <p className='caption font-medium text-accent-foreground/80'>
                        {service.differentiator}
                      </p>
                    </div>

                    {/* Tiered features */}
                    <ul className='space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 lg:mb-6'>
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={`${service.id}-feature-${feature}`}
                          className={cn(
                            'flex items-center caption sm:body-small',
                            featureIndex === 0
                              ? 'font-semibold text-foreground'
                              : 'text-muted-foreground',
                          )}
                        >
                          <div
                            className={cn('w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0', s.dotBg)}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Trust & clarity signals */}
                    <div className='flex items-center gap-4 text-[11px] text-muted-foreground mb-4 sm:mb-6'>
                      <span className='inline-flex items-center'>
                        <Shield className='w-3.5 h-3.5 mr-1' /> Insured
                      </span>
                      <span className='inline-flex items-center'>
                        <Leaf className='w-3.5 h-3.5 mr-1' /> Eco-friendly
                      </span>
                      <span className='inline-flex items-center'>
                        <CreditCard className='w-3.5 h-3.5 mr-1' /> Secure payment
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {errors?.['serviceType'] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-4 sm:mt-6 text-center'
        >
          <div className='inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg'>
            <div className='w-2 h-2 bg-red-500 rounded-full mr-2' />
            <p className='body-small text-red-700 font-medium'>{errors['serviceType']}</p>
          </div>
        </motion.div>
      )}

      <motion.div
        className='flex justify-center mt-6 sm:mt-8'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant='ghost'
          onClick={onBack}
          className='text-oxford-blue-500/60 hover:text-oxford-blue-500 hover:bg-oxford-blue-500/5 h-10 px-4'
        >
          ← Back to Home
        </Button>
      </motion.div>
    </div>
  );
};
