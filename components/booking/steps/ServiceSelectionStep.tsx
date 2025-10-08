'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Building2, Hammer, Home, Sparkles, Square, Truck, type LucideIcon } from 'lucide-react';

import { EnhancedServiceCard } from '@/components/booking/shared/EnhancedServiceCard';
import { Button } from '@/components/ui/button';
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
  },
];

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
        <h3 className='heading-4 text-oxford-blue mb-4'>Main Services</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6'>
          {services.map((service, index) => {
            const isSelected = preselectedService === service.type;

            return (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <EnhancedServiceCard
                  title={service.title}
                  shortTitle={service.shortTitle}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  popular={service.popular}
                  variant='main'
                  isSelected={isSelected}
                  onClick={() => handleServiceSelect(service.type)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceSelect(service.type);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${service.shortTitle} service`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Specialized Services */}
      <div className='mb-8'>
        <h3 className='heading-4 text-oxford-blue mb-4'>Specialized Services</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6'>
          {specializedServices.map((service, index) => {
            const isSelected = preselectedService === service.type;

            return (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: (index + 2) * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <EnhancedServiceCard
                  title={service.title}
                  shortTitle={service.shortTitle}
                  description={service.description}
                  icon={service.icon}
                  features={service.features}
                  popular={service.popular}
                  variant='specialized'
                  isSelected={isSelected}
                  onClick={() => handleServiceSelect(service.type)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceSelect(service.type);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${service.shortTitle} service`}
                />
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
