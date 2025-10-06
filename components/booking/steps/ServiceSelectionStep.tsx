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
    type: ServiceType.HOME_CLEANING,
    title: 'Home Cleaning',
    shortTitle: 'Home',
    description: 'Regular or one-time residential cleaning services',
    icon: Home,
    features: ['Deep cleaning included', 'Regular maintenance', 'Move-in/out cleaning'],
    popular: true,
    startingFrom: 89,
    differentiator: 'Perfect for homes up to 3 bedrooms',
  },
  {
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
  {
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
    type: ServiceType.POST_CONSTRUCTION,
    title: 'Post-Construction',
    shortTitle: 'After Build',
    description: 'Specialized cleaning after construction work',
    icon: Hammer,
    features: ['Debris removal', 'Dust elimination', 'Final polish & detail'],
    popular: false,
    startingFrom: 249,
    differentiator: 'Removes fine dust and residue after renovation',
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
    bgTint: 'bg-primary/10',
    border: 'border-primary/20',
    headerBg: 'bg-primary/15',
    accentText: 'text-primary',
    dotBg: 'bg-primary',
  },
  [ServiceType.OFFICE_CLEANING]: {
    bgTint: 'bg-info/10',
    border: 'border-info/20',
    headerBg: 'bg-info/15',
    accentText: 'text-info',
    dotBg: 'bg-info',
  },
  [ServiceType.DEEP_CLEANING]: {
    bgTint: 'bg-success/10',
    border: 'border-success/20',
    headerBg: 'bg-success/15',
    accentText: 'text-success',
    dotBg: 'bg-success',
  },
  [ServiceType.MOVE_IN_OUT]: {
    bgTint: 'bg-primary/10',
    border: 'border-primary/20',
    headerBg: 'bg-primary/15',
    accentText: 'text-primary',
    dotBg: 'bg-primary',
  },
  [ServiceType.POST_CONSTRUCTION]: {
    bgTint: 'bg-destructive/10',
    border: 'border-destructive/20',
    headerBg: 'bg-destructive/15',
    accentText: 'text-destructive',
    dotBg: 'bg-destructive',
  },
};

const priorityServices: ServiceType[] = [ServiceType.OFFICE_CLEANING, ServiceType.MOVE_IN_OUT];

export const ServiceSelectionStep: React.FC<ServiceSelectionStepProps> = ({
  onNext,
  onBack,
  preselectedService,
  errors,
  isLoading = false,
}) => {
  const handleServiceSelect = (serviceType: ServiceType) => {
    onNext(serviceType);
  };

  return (
    <div className='w-full max-w-6xl mx-auto'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='text-center mb-6 sm:mb-8'
      >
        <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001b2e] mb-3 sm:mb-4'>
          Choose Your Cleaning Service
        </h2>
        <p className='text-sm sm:text-base lg:text-lg text-[#001b2e]/70 max-w-3xl mx-auto leading-relaxed'>
          Select the type of cleaning service that best fits your needs. We offer comprehensive
          solutions for both residential and commercial properties.
        </p>
      </motion.div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
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
                    className='absolute -top-2 -left-2 z-10 bg-primary text-primary-foreground text-xs font-semibold shadow'
                    variant='default'
                  >
                    Popular
                  </Badge>
                )}

                {/* Category Header with price pill */}
                <div className={cn('p-4 sm:p-5 rounded-t-lg', s.headerBg)}>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div
                        className={cn(
                          'w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center',
                          s.dotBg,
                          'text-primary-foreground/95',
                        )}
                      >
                        <IconComponent className='w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground' />
                      </div>
                      <div>
                        <h3 className='text-lg sm:text-xl font-semibold text-oxford-blue'>
                          {service.shortTitle}
                        </h3>
                        <p className='text-xs sm:text-sm text-oxford-blue/70'>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className='pt-0 p-4 sm:p-6'>
                  {/* Key differentiator */}
                  <div className='mb-4 sm:mb-5 p-2 rounded-md bg-accent/5'>
                    <p className='text-xs font-medium text-accent-foreground/80'>
                      {service.differentiator}
                    </p>
                  </div>

                  {/* Tiered features */}
                  <ul className='space-y-2 mb-4 sm:mb-6'>
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={cn(
                          'flex items-center text-xs sm:text-sm',
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

      {errors?.['serviceType'] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='mt-4 sm:mt-6 text-center'
        >
          <div className='inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg'>
            <div className='w-2 h-2 bg-red-500 rounded-full mr-2' />
            <p className='text-sm text-red-700 font-medium'>{errors['serviceType']}</p>
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
          className='text-[#001b2e]/60 hover:text-[#001b2e] hover:bg-[#001b2e]/5 h-10 px-4'
        >
          ← Back to Home
        </Button>
      </motion.div>
    </div>
  );
};
