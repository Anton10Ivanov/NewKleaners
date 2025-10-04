// Booking Flow Types - Aligned with Supabase Database Schema
export enum ServiceType {
  HOME_CLEANING = 'home_cleaning',
  OFFICE_CLEANING = 'office_cleaning',
  DEEP_CLEANING = 'deep_cleaning',
  MOVE_IN_OUT = 'move_in_out',
  POST_CONSTRUCTION = 'post_construction'
}

export enum CleaningFrequency {
  ONE_TIME = 'one_time',
  WEEKLY = 'weekly',
  BI_WEEKLY = 'bi_weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom'
}

export enum RegularityPackage {
  BASIC = 'basic',
  STANDARD = 'standard',
  PREMIUM = 'premium',
  CUSTOM = 'custom'
}

export enum BookingStep {
  SERVICE_SELECTION = 0,
  FREQUENCY_SELECTION = 1,
  PROPERTY_DETAILS = 2,
  ESTIMATE = 3,
  PACKAGE_SELECTION = 4,
  SCHEDULING = 5,
  PAYMENT = 6
}

// Property Details Types
export interface PropertyDetails {
  propertyType: 'apartment' | 'house' | 'office' | 'commercial';
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  floors: number;
  hasBasement: boolean;
  hasAttic: boolean;
  hasGarage: boolean;
  pets: boolean;
  specialRequirements?: string[];
  accessInstructions?: string;
  preferredTime?: 'morning' | 'afternoon' | 'evening' | 'flexible';
}

export interface OfficeDetails extends Omit<PropertyDetails, 'bedrooms' | 'bathrooms'> {
  workstations: number;
  meetingRooms: number;
  commonAreas: number;
  hasKitchen: boolean;
  hasReception: boolean;
  businessType: 'startup' | 'corporate' | 'retail' | 'medical' | 'other';
}

// Estimate Types
export interface Estimate {
  id: string;
  basePrice: number;
  duration: number; // in minutes
  frequency: CleaningFrequency;
  packageType?: RegularityPackage;
  addOns: EstimateAddOn[];
  discounts: EstimateDiscount[];
  totalPrice: number;
  currency: string;
  validUntil: string;
  breakdown: EstimateBreakdown;
}

export interface EstimateAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  isSelected: boolean;
}

export interface EstimateDiscount {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

export interface EstimateBreakdown {
  baseService: number;
  addOns: number;
  frequencyMultiplier: number;
  packageMultiplier?: number;
  discounts: number;
  taxes: number;
  total: number;
}

// Scheduling Types
export interface BookingSchedule {
  id: string;
  date: string; // ISO date string
  timeSlot: TimeSlot;
  duration: number; // in minutes
  providerId?: string;
  isAvailable: boolean;
  notes?: string;
}

export interface TimeSlot {
  start: string; // HH:MM format
  end: string; // HH:MM format
  isAvailable: boolean;
}

// Main Booking Flow State
export interface BookingFlowState {
  currentStep: BookingStep;
  serviceType: ServiceType | null;
  cleaningFrequency: CleaningFrequency | null;
  propertyDetails: PropertyDetails | OfficeDetails | null;
  estimate: Estimate | null;
  selectedPackage: RegularityPackage | null;
  schedule: BookingSchedule | null;
  isSubmitting: boolean;
  errors: Record<string, string>;
  metadata: BookingMetadata;
}

export interface BookingMetadata {
  sessionId: string;
  startedAt: string;
  lastUpdatedAt: string;
  source: 'direct' | 'marketing' | 'referral' | 'organic';
  utmParams?: Record<string, string>;
  deviceInfo?: {
    type: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    os: string;
  };
}

// Form Data Types
export interface OneTimeCleaningData extends PropertyDetails {
  serviceType: ServiceType;
  frequency: CleaningFrequency.ONE_TIME;
  specialInstructions?: string;
  preferredDate?: string;
  preferredTime?: 'morning' | 'afternoon' | 'evening' | 'flexible';
}

export interface RegularCleaningData extends PropertyDetails {
  serviceType: ServiceType;
  frequency: Exclude<CleaningFrequency, CleaningFrequency.ONE_TIME>;
  packageType: RegularityPackage;
  startDate: string;
  endDate?: string;
  specialInstructions?: string;
}

// API Response Types
export interface BookingFlowResponse {
  success: boolean;
  data?: any;
  error?: string;
  step?: BookingStep;
  redirectUrl?: string;
}

// Component Props Types
export interface BookingStepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  onSkip?: () => void;
  data?: any;
  errors?: Record<string, string>;
  isLoading?: boolean;
}

export interface ServiceSelectionProps extends BookingStepProps {
  preselectedService?: ServiceType;
}

export interface FrequencySelectionProps extends BookingStepProps {
  serviceType: ServiceType;
}

export interface PropertyDetailsProps extends BookingStepProps {
  serviceType: ServiceType;
  isRegularCleaning: boolean;
}

export interface EstimateProps extends BookingStepProps {
  propertyData: PropertyDetails | OfficeDetails;
  serviceType: ServiceType;
  frequency: CleaningFrequency;
}

export interface PackageSelectionProps extends BookingStepProps {
  selectedPackage?: RegularityPackage;
  frequency: CleaningFrequency;
}

export interface SchedulingProps extends BookingStepProps {
  estimate: Estimate;
  serviceType: ServiceType;
  frequency: CleaningFrequency;
}

// Validation Schemas (for use with Zod)
export const PropertyDetailsSchema = {
  propertyType: 'string' as const,
  bedrooms: 'number' as const,
  bathrooms: 'number' as const,
  squareFootage: 'number' as const,
  floors: 'number' as const,
  hasBasement: 'boolean' as const,
  hasAttic: 'boolean' as const,
  hasGarage: 'boolean' as const,
  pets: 'boolean' as const,
  specialRequirements: 'array' as const,
  accessInstructions: 'string' as const,
  preferredTime: 'string' as const
} as const;

// Utility Types
export type BookingFlowStep = keyof typeof BookingStep;
export type ServiceTypeKey = keyof typeof ServiceType;
export type CleaningFrequencyKey = keyof typeof CleaningFrequency;
export type RegularityPackageKey = keyof typeof RegularityPackage;

// Step condition type
export type StepCondition = (state: BookingFlowState) => boolean;
