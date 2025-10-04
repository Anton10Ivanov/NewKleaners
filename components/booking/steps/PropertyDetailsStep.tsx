'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { Building2, Car, Home, MapPin, Square, TreePine, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import type { OfficeDetails, PropertyDetails } from '@/types/bookingFlow';
import { ServiceType } from '@/types/bookingFlow';



interface PropertyDetailsStepProps {
  onNext: (data: PropertyDetails | OfficeDetails) => void;
  onBack: () => void;
  onSkip?: () => void;
  serviceType: ServiceType;
  isRegularCleaning: boolean;
  data?: PropertyDetails | OfficeDetails | null;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

const propertyTypes = [
  { value: 'apartment', label: 'Apartment', icon: Home },
  { value: 'house', label: 'House', icon: Home },
  { value: 'condo', label: 'Condo', icon: Home },
  { value: 'townhouse', label: 'Townhouse', icon: Home },
];

const officeTypes = [
  { value: 'office', label: 'Office Space', icon: Building2 },
  { value: 'retail', label: 'Retail Store', icon: Building2 },
  { value: 'warehouse', label: 'Warehouse', icon: Building2 },
  { value: 'medical', label: 'Medical Facility', icon: Building2 },
  { value: 'other', label: 'Other Commercial', icon: Building2 },
];

const timePreferences = [
  { value: 'morning', label: 'Morning (8 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 5 PM)' },
  { value: 'evening', label: 'Evening (5 PM - 8 PM)' },
  { value: 'flexible', label: 'Flexible - Any time works' },
];

export const PropertyDetailsStep: React.FC<PropertyDetailsStepProps> = ({
  onNext,
  onBack,
  serviceType,
  isRegularCleaning,
  data,
  errors,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Partial<PropertyDetails | OfficeDetails>>({
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 1000,
    floors: 1,
    hasBasement: false,
    hasAttic: false,
    hasGarage: false,
    pets: false,
    specialRequirements: [],
    accessInstructions: '',
    preferredTime: 'flexible',
    ...data,
  });

  const isOffice = serviceType === ServiceType.OFFICE_CLEANING;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialRequirementChange = (requirement: string, checked: boolean) => {
    setFormData(prev => {
      const current = prev.specialRequirements || [];
      if (checked) {
        return { ...prev, specialRequirements: [...current, requirement] };
      } else {
        return { ...prev, specialRequirements: current.filter(r => r !== requirement) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOffice) {
      onNext(formData as OfficeDetails);
    } else {
      onNext(formData as PropertyDetails);
    }
  };

  const getSpecialRequirements = () => {
    if (isOffice) {
      return [
        'Medical facility cleaning',
        'Food service area cleaning',
        'High-traffic area focus',
        'Window cleaning',
        'Floor waxing/polishing',
        'Restroom deep cleaning',
      ];
    } else {
      return [
        'Pet hair removal',
        'Allergen reduction',
        'Eco-friendly products only',
        'Window cleaning',
        'Appliance cleaning',
        'Cabinet cleaning',
      ];
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tell us about your {isOffice ? 'office' : 'property'}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Help us provide the most accurate estimate by sharing details about your {isOffice ? 'commercial space' : 'home'}.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Property Type
                </CardTitle>
                <CardDescription>
                  Select the type of {isOffice ? 'commercial space' : 'property'} you have
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.propertyType || ''}
                  onValueChange={(value) => handleInputChange('propertyType', value)}
                  className="grid grid-cols-2 gap-4"
                >
                  {(isOffice ? officeTypes : propertyTypes).map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div key={type.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={type.value} id={type.value} />
                        <Label htmlFor={type.value} className="flex items-center cursor-pointer">
                          <IconComponent className="w-4 h-4 mr-2" />
                          {type.label}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Square className="w-5 h-5 mr-2" />
                  Space Details
                </CardTitle>
                <CardDescription>
                  Provide details about your {isOffice ? 'office' : 'home'} size and layout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="squareFootage">Square Footage</Label>
                    <Input
                      id="squareFootage"
                      type="number"
                      value={formData.squareFootage || ''}
                      onChange={(e) => handleInputChange('squareFootage', parseInt(e.target.value))}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input
                      id="floors"
                      type="number"
                      value={formData.floors || ''}
                      onChange={(e) => handleInputChange('floors', parseInt(e.target.value))}
                      placeholder="1"
                    />
                  </div>
                </div>

                {!isOffice && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={(formData as PropertyDetails).bedrooms || ''}
                        onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        value={(formData as PropertyDetails).bathrooms || ''}
                        onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                        placeholder="1"
                      />
                    </div>
                  </div>
                )}

                {isOffice && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="workstations">Workstations</Label>
                      <Input
                        id="workstations"
                        type="number"
                        value={(formData as OfficeDetails).workstations || ''}
                        onChange={(e) => handleInputChange('workstations', parseInt(e.target.value))}
                        placeholder="10"
                      />
                    </div>
                    <div>
                      <Label htmlFor="meetingRooms">Meeting Rooms</Label>
                      <Input
                        id="meetingRooms"
                        type="number"
                        value={(formData as OfficeDetails).meetingRooms || ''}
                        onChange={(e) => handleInputChange('meetingRooms', parseInt(e.target.value))}
                        placeholder="2"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TreePine className="w-5 h-5 mr-2" />
                  Additional Features
                </CardTitle>
                <CardDescription>
                  Tell us about special areas or features in your {isOffice ? 'office' : 'home'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasBasement"
                      checked={formData.hasBasement || false}
                      onCheckedChange={(checked) => handleInputChange('hasBasement', checked)}
                    />
                    <Label htmlFor="hasBasement">Basement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAttic"
                      checked={formData.hasAttic || false}
                      onCheckedChange={(checked) => handleInputChange('hasAttic', checked)}
                    />
                    <Label htmlFor="hasAttic">Attic</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasGarage"
                      checked={formData.hasGarage || false}
                      onCheckedChange={(checked) => handleInputChange('hasGarage', checked)}
                    />
                    <Label htmlFor="hasGarage">Garage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pets"
                      checked={formData.pets || false}
                      onCheckedChange={(checked) => handleInputChange('pets', checked)}
                    />
                    <Label htmlFor="pets">Pets</Label>
                  </div>
                </div>

                {isOffice && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasKitchen"
                        checked={(formData as OfficeDetails).hasKitchen || false}
                        onCheckedChange={(checked) => handleInputChange('hasKitchen', checked)}
                      />
                      <Label htmlFor="hasKitchen">Kitchen</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasReception"
                        checked={(formData as OfficeDetails).hasReception || false}
                        onCheckedChange={(checked) => handleInputChange('hasReception', checked)}
                      />
                      <Label htmlFor="hasReception">Reception Area</Label>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Special Requirements
                </CardTitle>
                <CardDescription>
                  Select any special cleaning requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {getSpecialRequirements().map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement}
                        checked={formData.specialRequirements?.includes(requirement) || false}
                        onCheckedChange={(checked) => handleSpecialRequirementChange(requirement, checked as boolean)}
                      />
                      <Label htmlFor={requirement} className="text-sm">
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="w-5 h-5 mr-2" />
                  Additional Information
                </CardTitle>
                <CardDescription>
                  Any other details we should know?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="accessInstructions">Access Instructions</Label>
                  <Textarea
                    id="accessInstructions"
                    value={formData.accessInstructions || ''}
                    onChange={(e) => handleInputChange('accessInstructions', e.target.value)}
                    placeholder="e.g., Key under the mat, Ring doorbell, etc."
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <RadioGroup
                    value={formData.preferredTime || 'flexible'}
                    onValueChange={(value) => handleInputChange('preferredTime', value)}
                    className="mt-2"
                  >
                    {timePreferences.map((time) => (
                      <div key={time.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={time.value} id={time.value} />
                        <Label htmlFor={time.value} className="text-sm">
                          {time.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {errors && Object.keys(errors).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field}>• {error}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        <motion.div
          className="flex justify-between mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            ← Back to Frequency
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="px-8"
          >
            {isLoading ? 'Processing...' : 'Continue to Estimate'}
          </Button>
        </motion.div>
      </form>
    </div>
  );
};
