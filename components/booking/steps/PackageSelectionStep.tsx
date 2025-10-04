'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Crown, Shield, Star, Users, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CleaningFrequency, RegularityPackage } from '@/types/bookingFlow';



interface PackageSelectionStepProps {
  onNext: (packageType: RegularityPackage) => void;
  onBack: () => void;
  onSkip?: () => void;
  frequency: CleaningFrequency;
  selectedPackage?: RegularityPackage | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const packages = [
  {
    type: RegularityPackage.BASIC,
    title: 'Basic Package',
    description: 'Essential cleaning services for regular maintenance',
    price: 'Starting at €80/visit',
    icon: Shield,
    color: 'bg-blue-500',
    features: [
      'General cleaning of all rooms',
      'Vacuum and mop floors',
      'Clean bathrooms and kitchen',
      'Dust all surfaces',
      'Empty trash bins',
      'Basic organization',
    ],
    included: [
      '2-3 hours of cleaning',
      'Standard cleaning supplies',
      'Basic equipment',
      'Quality guarantee',
    ],
    popular: false,
  },
  {
    type: RegularityPackage.STANDARD,
    title: 'Standard Package',
    description: 'Comprehensive cleaning with additional services',
    price: 'Starting at €120/visit',
    icon: Star,
    color: 'bg-green-500',
    features: [
      'Everything in Basic Package',
      'Deep clean bathrooms',
      'Kitchen appliance cleaning',
      'Window cleaning (interior)',
      'Light fixture cleaning',
      'Cabinet exterior cleaning',
      'Baseboard cleaning',
    ],
    included: [
      '3-4 hours of cleaning',
      'Premium cleaning supplies',
      'Professional equipment',
      'Quality guarantee',
      'Satisfaction guarantee',
    ],
    popular: true,
  },
  {
    type: RegularityPackage.PREMIUM,
    title: 'Premium Package',
    description: 'Complete deep cleaning with luxury services',
    price: 'Starting at €180/visit',
    icon: Crown,
    color: 'bg-purple-500',
    features: [
      'Everything in Standard Package',
      'Deep clean all appliances',
      'Cabinet interior cleaning',
      'Window cleaning (interior & exterior)',
      'Light fixture deep cleaning',
      'Vent cleaning',
      'Furniture polishing',
      'Specialty surface cleaning',
    ],
    included: [
      '4-6 hours of cleaning',
      'Luxury cleaning supplies',
      'Professional-grade equipment',
      'Quality guarantee',
      'Satisfaction guarantee',
      'Priority scheduling',
      'Dedicated cleaning team',
    ],
    popular: false,
  },
  {
    type: RegularityPackage.CUSTOM,
    title: 'Custom Package',
    description: 'Tailored cleaning services to your specific needs',
    price: 'Custom pricing',
    icon: Zap,
    color: 'bg-orange-500',
    features: [
      'Fully customizable services',
      'Choose specific areas to focus on',
      'Flexible scheduling options',
      'Specialized cleaning requests',
      'Add-on services included',
      'Personalized cleaning plan',
    ],
    included: [
      'Flexible duration',
      'Custom cleaning supplies',
      'Specialized equipment',
      'Quality guarantee',
      'Satisfaction guarantee',
      'Direct communication with team',
      'Regular plan adjustments',
    ],
    popular: false,
  },
];

const frequencyBenefits = {
  [CleaningFrequency.WEEKLY]: {
    title: 'Weekly Cleaning Benefits',
    benefits: [
      'Consistent cleanliness',
      'Easier maintenance',
      'Better health environment',
      'Reduced deep cleaning needs',
    ],
  },
  [CleaningFrequency.BI_WEEKLY]: {
    title: 'Bi-Weekly Cleaning Benefits',
    benefits: [
      'Balanced maintenance',
      'Cost-effective solution',
      'Regular deep cleaning',
      'Flexible scheduling',
    ],
  },
  [CleaningFrequency.MONTHLY]: {
    title: 'Monthly Cleaning Benefits',
    benefits: [
      'Deep cleaning focus',
      'Budget-friendly option',
      'Thorough maintenance',
      'Flexible timing',
    ],
  },
};

export const PackageSelectionStep: React.FC<PackageSelectionStepProps> = ({
  onNext,
  onBack,
  frequency,
  selectedPackage,
  errors,
  isLoading = false,
}) => {
  const [selectedPackageType, setSelectedPackageType] = useState<RegularityPackage | null>(
    selectedPackage || null,
  );

  const handlePackageSelect = (packageType: RegularityPackage) => {
    setSelectedPackageType(packageType);
  };

  const handleContinue = () => {
    if (selectedPackageType) {
      onNext(selectedPackageType);
    }
  };

  const getFrequencyContext = () => {
    const context = frequencyBenefits[frequency as keyof typeof frequencyBenefits];
    return context || {
      title: 'Regular Cleaning Benefits',
      benefits: ['Consistent service', 'Better maintenance', 'Cost savings'],
    };
  };

  const frequencyContext = getFrequencyContext();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose Your Cleaning Package
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the package that best fits your {frequency.replace('_', ' ').toLowerCase()} cleaning needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {packages.map((pkg, index) => {
          const IconComponent = pkg.icon;
          const isSelected = selectedPackageType === pkg.type;

          return (
            <motion.div
              key={pkg.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`relative cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-primary shadow-xl scale-105'
                    : 'hover:shadow-lg hover:border-primary/50'
                } ${pkg.popular ? 'border-primary/20' : ''}`}
                onClick={() => handlePackageSelect(pkg.type)}
              >
                {pkg.popular && (
                  <Badge
                    className="absolute -top-3 -right-3 bg-primary text-white px-3 py-1"
                    variant="default"
                  >
                    Most Popular
                  </Badge>
                )}

                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 ${pkg.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {pkg.description}
                  </CardDescription>
                  <div className="text-2xl font-bold text-primary mt-2">
                    {pkg.price}
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">What's Included:</h4>
                      <ul className="space-y-1">
                        {pkg.included.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-center text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm text-gray-700 mb-2">Services:</h4>
                      <ul className="space-y-1">
                        {pkg.features.slice(0, 4).map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                        {pkg.features.length > 4 && (
                          <li className="text-xs text-gray-500">
                            +{pkg.features.length - 4} more services
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <RadioGroup
                      value={selectedPackageType || ''}
                      onValueChange={(value) => handlePackageSelect(value as RegularityPackage)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={pkg.type} id={pkg.type} />
                        <Label htmlFor={pkg.type} className="text-sm font-medium cursor-pointer">
                          Select {pkg.title}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Frequency Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Clock className="w-5 h-5 mr-2" />
              {frequencyContext.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {frequencyContext.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-blue-800">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-2 flex-shrink-0" />
                  {benefit}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Package Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Package Comparison
            </CardTitle>
            <CardDescription>
              Compare features across all packages to make the best choice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Feature</th>
                    {packages.map((pkg) => (
                      <th key={pkg.type} className="text-center py-2 font-medium">
                        {pkg.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    'General cleaning',
                    'Deep clean bathrooms',
                    'Kitchen appliance cleaning',
                    'Window cleaning',
                    'Light fixture cleaning',
                    'Cabinet cleaning',
                    'Vent cleaning',
                    'Furniture polishing',
                  ].map((feature, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2 text-gray-700">{feature}</td>
                      {packages.map((pkg) => (
                        <td key={pkg.type} className="text-center py-2">
                          {pkg.features.some(f => f.toLowerCase().includes(feature.toLowerCase())) ? (
                            <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <div className="w-4 h-4 border border-gray-300 rounded mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {errors?.['selectedPackage'] && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">{errors['selectedPackage']}</p>
          </div>
        </motion.div>
      )}

      <motion.div
        className="flex justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700"
        >
          ← Back to Estimate
        </Button>

        <Button
          onClick={handleContinue}
          disabled={!selectedPackageType || isLoading}
          className="px-8"
        >
          {isLoading ? 'Processing...' : 'Continue to Scheduling'}
        </Button>
      </motion.div>
    </div>
  );
};
