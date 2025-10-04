'use client';

import React from 'react';

import { motion } from 'framer-motion';
import { Building2, Hammer, Home, Sparkles, Truck } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceType } from '@/types/bookingFlow';



interface ServiceSelectionStepProps {
  onNext: (serviceType: ServiceType) => void;
  onBack: () => void;
  onSkip?: () => void;
  preselectedService?: ServiceType | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const services = [
  {
    type: ServiceType.HOME_CLEANING,
    title: 'Home Cleaning',
    description: 'Regular or one-time residential cleaning services',
    icon: Home,
    features: ['Deep cleaning', 'Regular maintenance', 'Move-in/out cleaning'],
    popular: true,
    color: 'bg-blue-500',
  },
  {
    type: ServiceType.OFFICE_CLEANING,
    title: 'Office Cleaning',
    description: 'Professional commercial cleaning for businesses',
    icon: Building2,
    features: ['Daily maintenance', 'Deep office cleaning', 'Specialized equipment'],
    popular: false,
    color: 'bg-green-500',
  },
  {
    type: ServiceType.DEEP_CLEANING,
    title: 'Deep Cleaning',
    description: 'Intensive cleaning for special occasions',
    icon: Sparkles,
    features: ['Detailed cleaning', 'Hard-to-reach areas', 'Sanitization'],
    popular: false,
    color: 'bg-purple-500',
  },
  {
    type: ServiceType.MOVE_IN_OUT,
    title: 'Move In/Out',
    description: 'Cleaning services for moving transitions',
    icon: Truck,
    features: ['Pre-move cleaning', 'Post-move cleaning', 'Full property cleaning'],
    popular: false,
    color: 'bg-orange-500',
  },
  {
    type: ServiceType.POST_CONSTRUCTION,
    title: 'Post-Construction',
    description: 'Specialized cleaning after construction work',
    icon: Hammer,
    features: ['Construction debris removal', 'Dust elimination', 'Final cleanup'],
    popular: false,
    color: 'bg-red-500',
  },
];

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
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001b2e] mb-3 sm:mb-4">
          Choose Your Cleaning Service
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#001b2e]/70 max-w-3xl mx-auto leading-relaxed">
          Select the type of cleaning service that best fits your needs.
          We offer comprehensive solutions for both residential and commercial properties.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon;
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
              <Card
                className={`relative cursor-pointer transition-all duration-300 group ${
                  isSelected
                    ? 'ring-2 ring-[#ffa000] shadow-lg border-[#ffa000]'
                    : 'hover:shadow-lg hover:border-[#ffa000]/50 hover:ring-1 hover:ring-[#ffa000]/20'
                }`}
                onClick={() => handleServiceSelect(service.type)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleServiceSelect(service.type);
                  }
                }}
                aria-pressed={isSelected}
                aria-label={`Select ${service.title} service`}
              >
                {service.popular && (
                  <Badge
                    className="absolute -top-2 -right-2 bg-[#ffa000] text-white text-xs font-medium"
                    variant="default"
                  >
                    Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4 p-4 sm:p-6">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-[#001b2e] font-semibold">{service.title}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-[#001b2e]/70 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 p-4 sm:p-6">
                  <ul className="space-y-2 mb-4 sm:mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-[#001b2e]/70">
                        <div className="w-1.5 h-1.5 bg-[#ffa000] rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full h-11 sm:h-12 text-sm font-medium"
                    variant={isSelected ? 'default' : 'outline'}
                    disabled={isLoading}
                    style={{
                      backgroundColor: isSelected ? '#ffa000' : undefined,
                      borderColor: isSelected ? '#ffa000' : undefined,
                      color: isSelected ? 'white' : '#ffa000',
                    }}
                  >
                    {isLoading ? 'Selecting...' : isSelected ? 'Selected' : 'Select Service'}
                  </Button>
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
          className="mt-4 sm:mt-6 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
            <p className="text-sm text-red-700 font-medium">{errors['serviceType']}</p>
          </div>
        </motion.div>
      )}

      <motion.div
        className="flex justify-center mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#001b2e]/60 hover:text-[#001b2e] hover:bg-[#001b2e]/5 h-10 px-4"
        >
          ← Back to Home
        </Button>
      </motion.div>
    </div>
  );
};
