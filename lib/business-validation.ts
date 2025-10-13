import type { BusinessDetails } from '@/types/bookingFlow';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface FrequencyRecommendation {
  recommended: 'daily' | 'weekly' | 'monthly';
  reason: string;
  confidence: 'low' | 'medium' | 'high';
}

/**
 * Validates all business form fields
 */
export const validateBusinessDetails = (data: Partial<BusinessDetails>): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields validation
  if (!data.businessType) {
    errors.push('Please select your business type');
  }

  if (!data.squareFootage || data.squareFootage < 50 || data.squareFootage > 1000) {
    errors.push('Please enter a valid business size (50-1000 sqm)');
  }

  if (!data.cleaningFrequency) {
    errors.push('Please select cleaning frequency');
  }

  if (!data.cleaningCount || data.cleaningCount < 1 || data.cleaningCount > 20) {
    errors.push('Please enter a valid cleaning count (1-20)');
  }

  if (!data.floorType) {
    errors.push('Please select your floor type');
  }

  if (!data.visitorCount || data.visitorCount < 1) {
    errors.push('Please enter a valid visitor count');
  }

  if (!data.visitorFrequency) {
    errors.push('Please select visitor frequency');
  }

  if (!data.priority) {
    errors.push('Please select your priority');
  }

  // Smart validation for frequency/visitor combinations
  if (data.cleaningFrequency && data.visitorCount && data.visitorFrequency) {
    const frequencyWarning = validateFrequencyVisitorMatch(
      data.cleaningFrequency,
      data.visitorCount,
      data.visitorFrequency,
    );
    if (frequencyWarning) {
      warnings.push(frequencyWarning);
    }
  }

  // Business type specific validation
  if (data.businessType && data.cleaningFrequency) {
    const businessWarning = validateBusinessTypeFrequency(
      data.businessType,
      data.cleaningFrequency,
    );
    if (businessWarning) {
      warnings.push(businessWarning);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
};

/**
 * Prevents absurd combinations (e.g., 100 daily visitors + monthly cleaning)
 */
export const validateFrequencyVisitorMatch = (
  cleaningFrequency: 'daily' | 'weekly' | 'monthly',
  visitorCount: number,
  visitorFrequency: 'daily' | 'weekly' | 'monthly',
): string | null => {
  // Convert visitor count to daily equivalent for comparison
  let dailyVisitors: number;

  if (visitorFrequency === 'daily') {
    dailyVisitors = visitorCount;
  } else if (visitorFrequency === 'weekly') {
    dailyVisitors = visitorCount / 7;
  } else {
    dailyVisitors = visitorCount / 30;
  }

  // Check for problematic combinations
  if (cleaningFrequency === 'monthly' && dailyVisitors > 20) {
    return `High daily visitor count (${Math.round(dailyVisitors)}) with monthly cleaning may not provide adequate maintenance. Consider weekly cleaning for better results.`;
  }

  if (cleaningFrequency === 'weekly' && dailyVisitors > 100) {
    return `Very high daily visitor count (${Math.round(dailyVisitors)}) with weekly cleaning may require more frequent service. Consider daily cleaning for optimal maintenance.`;
  }

  if (cleaningFrequency === 'daily' && dailyVisitors < 5) {
    return `Low daily visitor count (${Math.round(dailyVisitors)}) with daily cleaning may be excessive. Consider weekly cleaning for cost efficiency.`;
  }

  return null;
};

/**
 * Suggests optimal frequency based on visitor count and business type
 */
export const getRecommendedFrequency = (
  visitorCount: number,
  visitorFrequency: 'daily' | 'weekly' | 'monthly',
  businessType: string,
): FrequencyRecommendation => {
  // Convert to daily equivalent
  let dailyVisitors: number;

  if (visitorFrequency === 'daily') {
    dailyVisitors = visitorCount;
  } else if (visitorFrequency === 'weekly') {
    dailyVisitors = visitorCount / 7;
  } else {
    dailyVisitors = visitorCount / 30;
  }

  // Business type specific recommendations
  if (businessType === 'medical' || businessType === 'restaurant') {
    return {
      recommended: 'daily',
      reason: `${businessType} businesses require daily cleaning for hygiene and safety standards`,
      confidence: 'high',
    };
  }

  if (businessType === 'warehouse') {
    return {
      recommended: 'monthly',
      reason: 'Warehouses typically require less frequent cleaning due to lower foot traffic',
      confidence: 'high',
    };
  }

  // Visitor-based recommendations
  if (dailyVisitors >= 50) {
    return {
      recommended: 'daily',
      reason: `High daily traffic (${Math.round(dailyVisitors)} visitors) requires daily maintenance`,
      confidence: 'medium',
    };
  }

  if (dailyVisitors >= 20) {
    return {
      recommended: 'weekly',
      reason: `Moderate daily traffic (${Math.round(dailyVisitors)} visitors) is well-suited for weekly cleaning`,
      confidence: 'medium',
    };
  }

  return {
    recommended: 'monthly',
    reason: `Low daily traffic (${Math.round(dailyVisitors)} visitors) can be maintained with monthly cleaning`,
    confidence: 'low',
  };
};

/**
 * Validates business type specific frequency requirements
 */
export const validateBusinessTypeFrequency = (
  businessType: string,
  cleaningFrequency: 'daily' | 'weekly' | 'monthly',
): string | null => {
  // Medical and restaurant businesses should have frequent cleaning
  if (
    (businessType === 'medical' || businessType === 'restaurant') &&
    cleaningFrequency === 'monthly'
  ) {
    return `${businessType} businesses typically require more frequent cleaning for hygiene and safety. Consider daily or weekly cleaning.`;
  }

  // Warehouses can have less frequent cleaning
  if (businessType === 'warehouse' && cleaningFrequency === 'daily') {
    return 'Warehouses typically require less frequent cleaning. Consider weekly or monthly cleaning for cost efficiency.';
  }

  return null;
};

/**
 * Gets visitor count limits based on cleaning frequency
 */
export const getVisitorCountLimits = (cleaningFrequency: 'daily' | 'weekly' | 'monthly') => {
  switch (cleaningFrequency) {
    case 'daily':
      return { min: 1, max: 200, step: 1 };
    case 'weekly':
      return { min: 1, max: 500, step: 10 }; // Max 500 visitors per week
    case 'monthly':
      return { min: 1, max: 1000, step: 25 }; // Max 1000 visitors per month
    default:
      return { min: 1, max: 1000, step: 10 };
  }
};

/**
 * Gets cleaning count limits based on frequency
 */
export const getCleaningCountLimits = (cleaningFrequency: 'daily' | 'weekly' | 'monthly') => {
  switch (cleaningFrequency) {
    case 'daily':
      return { min: 1, max: 5, step: 1 }; // Max 5 times per day
    case 'weekly':
      return { min: 1, max: 14, step: 1 }; // Max 14 times per week (twice daily)
    case 'monthly':
      return { min: 1, max: 8, step: 1 }; // Max 8 times per month
    default:
      return { min: 1, max: 20, step: 1 };
  }
};
