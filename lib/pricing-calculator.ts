import { EffortLevel, PropertySizeTier, type PropertyDetails } from '@/types/bookingFlow';

// Size tier definitions
export const SIZE_TIERS = {
  [PropertySizeTier.TIER_1]: { min: 50, max: 70, name: '50-70sqm', basePrice: 60 },
  [PropertySizeTier.TIER_2]: { min: 70, max: 90, name: '70-90sqm', basePrice: 80 },
  [PropertySizeTier.TIER_3]: { min: 90, max: 110, name: '90-110sqm', basePrice: 100 },
  [PropertySizeTier.TIER_4]: { min: 110, max: 130, name: '110-130sqm', basePrice: 120 },
  [PropertySizeTier.TIER_5]: { min: 130, max: 150, name: '130-150sqm', basePrice: 140 },
  [PropertySizeTier.TIER_6]: {
    min: 150,
    max: Number.POSITIVE_INFINITY,
    name: '150+sqm',
    basePrice: 0,
  },
} as const;

// Effort level multipliers
export const EFFORT_MULTIPLIERS = {
  [EffortLevel.BASIC]: 1.0,
  [EffortLevel.STANDARD]: 1.5,
  [EffortLevel.KLEANERS]: 2.0,
} as const;

/**
 * Get the size tier based on square footage
 */
export const getSizeTier = (squareFootage: number): PropertySizeTier => {
  if (squareFootage >= 50 && squareFootage < 70) {
    return PropertySizeTier.TIER_1;
  }
  if (squareFootage >= 70 && squareFootage < 90) {
    return PropertySizeTier.TIER_2;
  }
  if (squareFootage >= 90 && squareFootage < 110) {
    return PropertySizeTier.TIER_3;
  }
  if (squareFootage >= 110 && squareFootage < 130) {
    return PropertySizeTier.TIER_4;
  }
  if (squareFootage >= 130 && squareFootage < 150) {
    return PropertySizeTier.TIER_5;
  }
  return PropertySizeTier.TIER_6; // 150+ sqm
};

/**
 * Calculate price for a specific effort level
 */
export const calculatePrice = (sizeTier: PropertySizeTier, effortLevel: EffortLevel): number => {
  const tier = SIZE_TIERS[sizeTier];
  const effortMultiplier = EFFORT_MULTIPLIERS[effortLevel];

  // For custom quote tier, return 0 (handled separately)
  if (sizeTier === PropertySizeTier.TIER_6) {
    return 0;
  }

  const price = tier.basePrice * effortMultiplier;
  return Math.round(price);
};

/**
 * Get prices for all effort levels
 */
export const getPriceForAllEfforts = (
  sizeTier: PropertySizeTier,
): { basic: number; standard: number; kleaners: number } => {
  return {
    basic: calculatePrice(sizeTier, EffortLevel.BASIC),
    standard: calculatePrice(sizeTier, EffortLevel.STANDARD),
    kleaners: calculatePrice(sizeTier, EffortLevel.KLEANERS),
  };
};

/**
 * Get size tier info for display
 */
export const getSizeTierInfo = (sizeTier: PropertySizeTier) => {
  return SIZE_TIERS[sizeTier];
};

/**
 * Check if property requires custom quote
 */
export const requiresCustomQuote = (squareFootage: number): boolean => {
  return squareFootage >= 150;
};

/**
 * Get effort level display info
 */
export const getEffortLevelInfo = (effortLevel: EffortLevel) => {
  const info = {
    [EffortLevel.BASIC]: {
      name: 'BASIC',
      tagline: 'The Essentials',
      duration: '2-3 hours',
      description: 'Essential cleaning done efficiently',
      color: 'from-blue-400 to-blue-600',
      icon: 'Shield',
    },
    [EffortLevel.STANDARD]: {
      name: 'STANDARD',
      tagline: 'Professional Quality',
      duration: '3-4 hours',
      description: 'Professional quality you can trust',
      color: 'from-green-400 to-green-600',
      icon: 'Star',
    },
    [EffortLevel.KLEANERS]: {
      name: 'KLEANERS',
      tagline: 'Luxury Experience',
      duration: '4-6 hours',
      description: "Luxury transformation you've never experienced",
      color: 'from-purple-400 to-purple-600',
      icon: 'Crown',
    },
  };

  return info[effortLevel];
};

/**
 * Get bedroom and bathroom constraints based on home size
 */
export const getPropertyConstraints = (squareFootage: number) => {
  if (squareFootage >= 50 && squareFootage <= 69) {
    return {
      maxBedrooms: 2,
      maxBathrooms: 1,
      description: 'Studio/1BR - Up to 2 bedrooms, 1 bathroom',
    };
  }
  if (squareFootage >= 70 && squareFootage <= 89) {
    return {
      maxBedrooms: 2,
      maxBathrooms: 2,
      description: '2BR - Up to 2 bedrooms, 2 bathrooms',
    };
  }
  if (squareFootage >= 90 && squareFootage <= 109) {
    return {
      maxBedrooms: 3,
      maxBathrooms: 2,
      description: '3BR - Up to 3 bedrooms, 2 bathrooms',
    };
  }
  if (squareFootage >= 110 && squareFootage <= 129) {
    return {
      maxBedrooms: 4,
      maxBathrooms: 3,
      description: '4BR - Up to 4 bedrooms, 3 bathrooms',
    };
  }
  if (squareFootage >= 130 && squareFootage <= 150) {
    return {
      maxBedrooms: 4,
      maxBathrooms: 4,
      description: 'Large 4BR - Up to 4 bedrooms, 4 bathrooms',
    };
  }
  // For 150+ sqm, allow more flexibility
  return {
    maxBedrooms: 5,
    maxBathrooms: 5,
    description: 'Large Property - Up to 5 bedrooms, 5 bathrooms',
  };
};

/**
 * Validate property details against constraints
 */
export const validatePropertyDetails = (propertyData: PropertyDetails) => {
  const constraints = getPropertyConstraints(propertyData.squareFootage);
  const errors: string[] = [];

  if (propertyData.bedrooms > constraints.maxBedrooms) {
    errors.push(`Maximum ${constraints.maxBedrooms} bedrooms allowed for this property size`);
  }
  if (propertyData.bathrooms > constraints.maxBathrooms) {
    errors.push(`Maximum ${constraints.maxBathrooms} bathrooms allowed for this property size`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    constraints,
  };
};

/**
 * Calculate pricing breakdown for display
 */
export const getPricingBreakdown = (propertyData: PropertyDetails, effortLevel: EffortLevel) => {
  const sizeTier = getSizeTier(propertyData.squareFootage);
  const tierInfo = getSizeTierInfo(sizeTier);
  const effortInfo = getEffortLevelInfo(effortLevel);

  const basePrice = tierInfo.basePrice;
  const effortMultiplier = EFFORT_MULTIPLIERS[effortLevel];

  const finalPrice = calculatePrice(sizeTier, effortLevel);

  return {
    sizeTier,
    tierName: tierInfo.name,
    effortLevel,
    effortName: effortInfo.name,
    basePrice,
    effortMultiplier,
    finalPrice,
    isCustomQuote: sizeTier === PropertySizeTier.TIER_6,
  };
};
