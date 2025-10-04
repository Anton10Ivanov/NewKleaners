'use client'

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CleaningFrequency, ServiceType } from '@/types/bookingFlow';
import { motion } from 'framer-motion';
import { Calendar, Clock, Repeat, Star, Zap } from 'lucide-react';
import React from 'react';

interface FrequencySelectionStepProps {
  onNext: (frequency: CleaningFrequency) => void;
  onBack: () => void;
  onSkip?: () => void;
  serviceType: ServiceType;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const frequencies = [
  {
    type: CleaningFrequency.ONE_TIME,
    title: 'One-Time Cleaning',
    description: 'Perfect for special occasions or when you need a deep clean',
    icon: Star,
    features: ['Deep cleaning', 'Flexible scheduling', 'No commitment'],
    price: 'From $120',
    color: 'bg-blue-500',
    popular: true
  },
  {
    type: CleaningFrequency.WEEKLY,
    title: 'Weekly Cleaning',
    description: 'Regular maintenance to keep your space consistently clean',
    icon: Repeat,
    features: ['Consistent cleaning', 'Best value', 'Priority scheduling'],
    price: 'From $80/week',
    color: 'bg-green-500',
    popular: true
  },
  {
    type: CleaningFrequency.BI_WEEKLY,
    title: 'Bi-Weekly Cleaning',
    description: 'Every other week cleaning for moderate maintenance',
    icon: Calendar,
    features: ['Balanced schedule', 'Cost effective', 'Regular maintenance'],
    price: 'From $100/visit',
    color: 'bg-purple-500',
    popular: false
  },
  {
    type: CleaningFrequency.MONTHLY,
    title: 'Monthly Cleaning',
    description: 'Monthly deep cleaning for light maintenance',
    icon: Clock,
    features: ['Monthly deep clean', 'Flexible timing', 'Budget friendly'],
    price: 'From $150/visit',
    color: 'bg-orange-500',
    popular: false
  },
  {
    type: CleaningFrequency.CUSTOM,
    title: 'Custom Schedule',
    description: 'Create a personalized cleaning schedule that fits your needs',
    icon: Zap,
    features: ['Fully customizable', 'Flexible timing', 'Tailored service'],
    price: 'Custom pricing',
    color: 'bg-indigo-500',
    popular: false
  }
];

export const FrequencySelectionStep: React.FC<FrequencySelectionStepProps> = ({
  onNext,
  onBack,
  serviceType,
  errors,
  isLoading = false
}) => {
  const [selectedFrequency, setSelectedFrequency] = React.useState<CleaningFrequency | null>(null);

  const handleFrequencySelect = (frequency: CleaningFrequency) => {
    setSelectedFrequency(frequency);
  };

  const handleContinue = () => {
    if (selectedFrequency) {
      onNext(selectedFrequency);
    }
  };

  const getServiceContext = () => {
    switch (serviceType) {
      case ServiceType.HOME_CLEANING:
        return {
          title: 'How often do you need home cleaning?',
          subtitle: 'Choose the frequency that works best for your household'
        };
      case ServiceType.OFFICE_CLEANING:
        return {
          title: 'What\'s your office cleaning schedule?',
          subtitle: 'Select the frequency that matches your business needs'
        };
      case ServiceType.DEEP_CLEANING:
        return {
          title: 'When do you need deep cleaning?',
          subtitle: 'Deep cleaning is typically a one-time or occasional service'
        };
      default:
        return {
          title: 'How often do you need cleaning?',
          subtitle: 'Choose the frequency that works best for you'
        };
    }
  };

  const context = getServiceContext();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#001b2e] mb-3 sm:mb-4">
          {context.title}
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-[#001b2e]/70 max-w-3xl mx-auto leading-relaxed">
          {context.subtitle}
        </p>
      </motion.div>

      <RadioGroup
        value={selectedFrequency || ''}
        onValueChange={(value) => handleFrequencySelect(value as CleaningFrequency)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {frequencies.map((frequency, index) => {
            const IconComponent = frequency.icon;
            const isSelected = selectedFrequency === frequency.type;

            return (
              <motion.div
                key={frequency.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 group ${
                    isSelected
                      ? 'ring-2 ring-[#ffa000] shadow-lg border-[#ffa000]'
                      : 'hover:shadow-lg hover:border-[#ffa000]/50 hover:ring-1 hover:ring-[#ffa000]/20'
                  }`}
                  onClick={() => handleFrequencySelect(frequency.type)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleFrequencySelect(frequency.type);
                    }
                  }}
                  aria-pressed={isSelected}
                  aria-label={`Select ${frequency.title} frequency`}
                >
                  {frequency.popular && (
                    <Badge
                      className="absolute -top-2 -right-2 bg-[#ffa000] text-white text-xs font-medium"
                      variant="default"
                    >
                      Popular
                    </Badge>
                  )}

                  <CardHeader className="pb-4 p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className={`w-12 h-12 ${frequency.color} rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <CardTitle className="text-base sm:text-lg text-[#001b2e] font-semibold truncate">{frequency.title}</CardTitle>
                          <span className="text-xs sm:text-sm font-bold text-[#ffa000] ml-2">{frequency.price}</span>
                        </div>
                        <CardDescription className="text-xs sm:text-sm text-[#001b2e]/70 leading-relaxed">
                          {frequency.description}
                        </CardDescription>
                      </div>
                      <RadioGroupItem
                        value={frequency.type}
                        id={frequency.type}
                        className="mt-1 flex-shrink-0"
                        style={{
                          accentColor: '#ffa000'
                        }}
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 p-4 sm:p-6">
                    <ul className="space-y-2">
                      {frequency.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-xs sm:text-sm text-[#001b2e]/70">
                          <div className="w-1.5 h-1.5 bg-[#ffa000] rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </RadioGroup>

      {errors?.['cleaningFrequency'] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 sm:mt-6 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
            <p className="text-sm text-red-700 font-medium">{errors['cleaningFrequency']}</p>
          </div>
        </motion.div>
      )}

      <motion.div
        className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#001b2e]/60 hover:text-[#001b2e] hover:bg-[#001b2e]/5 h-10 px-4 order-2 sm:order-1"
        >
          ← Back to Service Selection
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!selectedFrequency || isLoading}
          className="px-6 sm:px-8 h-11 sm:h-12 bg-[#ffa000] hover:bg-[#ffa000]/90 text-white font-medium order-1 sm:order-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Continue'}
        </Button>
      </motion.div>
    </div>
  );
};
