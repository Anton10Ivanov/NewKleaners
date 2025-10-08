'use client';

import { Building, Droplets, Zap } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import type { PostConstructionDetails } from '@/types/bookingFlow';

interface PostConstructionFieldsProps {
  data: Partial<PostConstructionDetails>;
  onChange: (field: keyof PostConstructionDetails, value: unknown) => void;
  errors?: Record<string, string> | undefined;
}

const constructionTypes = [
  { value: 'renovation', label: 'Renovation', description: 'Existing space renovation' },
  { value: 'new_build', label: 'New Build', description: 'Brand new construction' },
  { value: 'remodel', label: 'Remodel', description: 'Major structural changes' },
];

const dustLevels = [
  { value: 1, label: 'Light', description: 'Minimal dust, light cleaning needed' },
  { value: 2, label: 'Moderate', description: 'Visible dust, standard cleaning' },
  { value: 3, label: 'Heavy', description: 'Heavy dust, intensive cleaning required' },
  { value: 4, label: 'Extreme', description: 'Extreme dust, professional restoration needed' },
];

export const PostConstructionFields: React.FC<PostConstructionFieldsProps> = ({
  data,
  onChange,
  errors,
}) => {
  const handleSliderChange = (field: keyof PostConstructionDetails, value: number[]) => {
    const level = value[0];
    const levelLabel = dustLevels.find(d => d.value === level)?.label || 'Moderate';
    onChange(field, levelLabel.toLowerCase() as 'light' | 'moderate' | 'heavy' | 'extreme');
  };

  const getSliderValue = () => {
    const level = data.dustLevel || 'moderate';
    return dustLevels.find(d => d.label.toLowerCase() === level)?.value || 2;
  };

  return (
    <div className='space-y-6'>
      {/* Construction Type */}
      <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-blue-900'>
            <Building className='w-5 h-5 mr-2' />
            Construction Type
          </CardTitle>
          <CardDescription className='text-blue-700'>
            What type of construction work was completed?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={data.constructionType || 'renovation'}
            onValueChange={value => onChange('constructionType', value)}
            className='grid grid-cols-1 md:grid-cols-3 gap-4'
          >
            {constructionTypes.map(type => (
              <div
                key={type.value}
                className={cn(
                  'flex items-start space-x-3 p-4 rounded-lg border-2 transition-all duration-200',
                  data.constructionType === type.value
                    ? 'border-blue-500 bg-blue-100'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50',
                )}
              >
                <RadioGroupItem value={type.value} id={type.value} />
                <div className='flex-1'>
                  <Label htmlFor={type.value} className='font-medium cursor-pointer'>
                    {type.label}
                  </Label>
                  <p className='text-sm text-gray-600 mt-1'>{type.description}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Dust Level */}
      <Card className='bg-gradient-to-br from-orange-50 to-red-50 border-orange-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-orange-900'>
            <Zap className='w-5 h-5 mr-2' />
            Dust Level
          </CardTitle>
          <CardDescription className='text-orange-700'>
            How much dust and debris is present?
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='space-y-4'>
            <div className='flex justify-between items-center'>
              <Label className='text-lg font-medium'>
                Dust Level: {dustLevels.find(d => d.value === getSliderValue())?.label}
              </Label>
              <span className='text-sm text-gray-600'>
                {dustLevels.find(d => d.value === getSliderValue())?.description}
              </span>
            </div>
            <Slider
              value={[getSliderValue()]}
              onValueChange={value => handleSliderChange('dustLevel', value)}
              min={1}
              max={4}
              step={1}
              className='w-full'
            />
            <div className='flex justify-between text-xs text-gray-500'>
              <span>Light</span>
              <span>Moderate</span>
              <span>Heavy</span>
              <span>Extreme</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Construction Residue */}
      <Card className='bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'>
        <CardHeader>
          <CardTitle className='flex items-center text-purple-900'>
            <Droplets className='w-5 h-5 mr-2' />
            Construction Residue
          </CardTitle>
          <CardDescription className='text-purple-700'>
            What type of construction materials need to be cleaned?
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
              <div>
                <Label htmlFor='hasPaintResidue' className='font-medium'>
                  Paint Residue
                </Label>
                <p className='text-sm text-gray-600'>Paint splatters, drips, or overspray</p>
              </div>
              <Switch
                id='hasPaintResidue'
                checked={data.hasPaintResidue || false}
                onCheckedChange={checked => onChange('hasPaintResidue', checked)}
              />
            </div>

            <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
              <div>
                <Label htmlFor='hasDrywallDust' className='font-medium'>
                  Drywall Dust
                </Label>
                <p className='text-sm text-gray-600'>Fine drywall dust and particles</p>
              </div>
              <Switch
                id='hasDrywallDust'
                checked={data.hasDrywallDust || false}
                onCheckedChange={checked => onChange('hasDrywallDust', checked)}
              />
            </div>

            <div className='flex items-center justify-between p-4 bg-white rounded-lg border md:col-span-2'>
              <div>
                <Label htmlFor='requiresHepaFilter' className='font-medium'>
                  Requires HEPA Filtration
                </Label>
                <p className='text-sm text-gray-600'>
                  Special air filtration needed for fine particles and allergens
                </p>
              </div>
              <Switch
                id='requiresHepaFilter'
                checked={data.requiresHepaFilter || false}
                onCheckedChange={checked => onChange('requiresHepaFilter', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
