import type { BusinessDetails } from '@/types/bookingFlow';

export interface BusinessTypeDefaults {
  cleaningFrequency: 'daily' | 'weekly' | 'monthly';
  priority: 'quality' | 'price' | 'reliability';
  floorType: 'vinyl' | 'laminate' | 'wooden' | 'tiles' | 'carpet' | 'concrete';
  cleaningCount: number;
  contractType: 'one-time' | '6-month' | '12-month';
  description: string;
  features: readonly string[];
}

/**
 * Default configurations per business type
 */
export const BUSINESS_TYPE_DEFAULTS = {
  office: {
    cleaningFrequency: 'weekly' as const,
    priority: 'quality' as const,
    floorType: 'vinyl' as const,
    cleaningCount: 2,
    contractType: '6-month' as const,
    description: 'Professional office cleaning for corporate environments',
    features: ['Desk sanitization', 'Meeting room cleaning', 'Reception area maintenance'],
  },
  medical: {
    cleaningFrequency: 'daily' as const,
    priority: 'quality' as const,
    floorType: 'vinyl' as const,
    cleaningCount: 1,
    contractType: '12-month' as const,
    description: 'Medical-grade cleaning for healthcare facilities',
    features: ['Disinfection protocols', 'Sterile environment maintenance', 'Compliance standards'],
  },
  retail: {
    cleaningFrequency: 'weekly' as const,
    priority: 'price' as const,
    floorType: 'laminate' as const,
    cleaningCount: 2,
    contractType: '6-month' as const,
    description: 'Retail store cleaning for customer-facing spaces',
    features: ['Display area cleaning', 'Customer restroom maintenance', 'Floor polishing'],
  },
  restaurant: {
    cleaningFrequency: 'daily' as const,
    priority: 'reliability' as const,
    floorType: 'tiles' as const,
    cleaningCount: 2,
    contractType: '12-month' as const,
    description: 'Restaurant cleaning for food service environments',
    features: ['Kitchen deep cleaning', 'Dining area sanitization', 'Grease removal'],
  },
  gym: {
    cleaningFrequency: 'daily' as const,
    priority: 'quality' as const,
    floorType: 'concrete' as const,
    cleaningCount: 2,
    contractType: '6-month' as const,
    description: 'Fitness center cleaning for high-traffic areas',
    features: ['Equipment sanitization', 'Locker room cleaning', 'Floor maintenance'],
  },
  salon: {
    cleaningFrequency: 'daily' as const,
    priority: 'quality' as const,
    floorType: 'tiles' as const,
    cleaningCount: 1,
    contractType: '6-month' as const,
    description: 'Beauty salon cleaning for client comfort',
    features: ['Station sanitization', 'Tool sterilization', 'Client area maintenance'],
  },
  warehouse: {
    cleaningFrequency: 'monthly' as const,
    priority: 'price' as const,
    floorType: 'concrete' as const,
    cleaningCount: 1,
    contractType: '12-month' as const,
    description: 'Warehouse cleaning for industrial spaces',
    features: ['Dust removal', 'Floor sweeping', 'Equipment cleaning'],
  },
  other: {
    cleaningFrequency: 'weekly' as const,
    priority: 'quality' as const,
    floorType: 'vinyl' as const,
    cleaningCount: 2,
    contractType: '6-month' as const,
    description: 'Custom business cleaning solutions',
    features: ['Flexible scheduling', 'Customized cleaning plans', 'Professional service'],
  },
} as const;

/**
 * Get defaults for a specific business type
 */
export const getBusinessTypeDefaults = (businessType: string): BusinessTypeDefaults => {
  if (Object.hasOwnProperty.call(BUSINESS_TYPE_DEFAULTS, businessType)) {
    return BUSINESS_TYPE_DEFAULTS[businessType as keyof typeof BUSINESS_TYPE_DEFAULTS];
  }
  return BUSINESS_TYPE_DEFAULTS.other;
};

/**
 * Get all available business types
 */
export const getBusinessTypes = () => {
  return Object.keys(BUSINESS_TYPE_DEFAULTS).map(key => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    ...BUSINESS_TYPE_DEFAULTS[key as keyof typeof BUSINESS_TYPE_DEFAULTS],
  }));
};

/**
 * Get floor type options with descriptions
 */
export const getFloorTypeOptions = () => [
  {
    value: 'vinyl' as const,
    label: 'Vinyl',
    description: 'Easy to clean, durable, common in offices',
    icon: '🏢',
  },
  {
    value: 'laminate' as const,
    label: 'Laminate',
    description: 'Wood-like appearance, easy maintenance',
    icon: '🪵',
  },
  {
    value: 'wooden' as const,
    label: 'Wooden',
    description: 'Natural wood floors, requires special care',
    icon: '🌳',
  },
  {
    value: 'tiles' as const,
    label: 'Tiles',
    description: 'Ceramic or stone tiles, waterproof',
    icon: '🧱',
  },
  {
    value: 'carpet' as const,
    label: 'Carpet',
    description: 'Soft flooring, requires deep cleaning',
    icon: '🟫',
  },
  {
    value: 'concrete' as const,
    label: 'Concrete',
    description: 'Industrial flooring, durable and practical',
    icon: '🏭',
  },
];

/**
 * Get priority options with descriptions
 */
export const getPriorityOptions = () => [
  {
    value: 'quality' as const,
    label: 'Quality',
    description: 'Premium service and attention to detail',
    icon: '⭐',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
  },
  {
    value: 'price' as const,
    label: 'Price',
    description: 'Cost-effective solutions and competitive rates',
    icon: '💰',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    value: 'reliability' as const,
    label: 'Reliability',
    description: 'Consistent service and dependable scheduling',
    icon: '🛡️',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
];

/**
 * Get contract options with pricing information
 */
export const getContractOptions = () => [
  {
    value: 'one-time' as const,
    label: 'One-time',
    description: 'Single cleaning service',
    discount: 0,
    badge: null,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
  },
  {
    value: '6-month' as const,
    label: '6-month Contract',
    description: '6 months of regular service',
    discount: 10,
    badge: 'Save 10%',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
  {
    value: '12-month' as const,
    label: '12-month Contract',
    description: '12 months of regular service',
    discount: 20,
    badge: 'Save 20%',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
];

/**
 * Apply business type defaults to form data
 */
export const applyBusinessDefaults = (
  businessType: string,
  currentData: Partial<BusinessDetails>,
): Partial<BusinessDetails> => {
  const defaults = getBusinessTypeDefaults(businessType);

  return {
    ...currentData,
    businessType: businessType as BusinessDetails['businessType'],
    cleaningFrequency: currentData.cleaningFrequency || defaults.cleaningFrequency,
    priority: currentData.priority || defaults.priority,
    floorType: currentData.floorType || defaults.floorType,
    cleaningCount: currentData.cleaningCount || defaults.cleaningCount,
    contractType: currentData.contractType || defaults.contractType,
  };
};
