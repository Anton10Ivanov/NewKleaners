// Booking Flow Types - Aligned with Supabase Database Schema
export enum ServiceType {
  HOME_CLEANING = 'home_cleaning',
  OFFICE_CLEANING = 'office_cleaning',
  DEEP_CLEANING = 'deep_cleaning',
  MOVE_IN_OUT = 'move_in_out',
  POST_CONSTRUCTION = 'post_construction',
  WINDOW_CLEANING = 'window_cleaning',
}

export enum CleaningFrequency {
  ONCE = 'once',
  WEEKLY = 'weekly',
  BI_WEEKLY = 'bi_weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
}

export enum EffortLevel {
  BASIC = 'basic',
  STANDARD = 'standard',
  KLEANERS = 'kleaners',
}

export enum PropertySizeTier {
  TIER_1 = 'tier_1', // 50-70sqm (Studio/1BR)
  TIER_2 = 'tier_2', // 70-90sqm (2BR)
  TIER_3 = 'tier_3', // 90-110sqm (3BR)
  TIER_4 = 'tier_4', // 110-130sqm (4BR)
  TIER_5 = 'tier_5', // 130-150sqm (Large 4BR)
  TIER_6 = 'tier_6', // 150+sqm (Custom quote required)
}

export enum BookingStep {
  SERVICE_SELECTION = 0,
  FREQUENCY_SELECTION = 1,
  PROPERTY_DETAILS = 2,
  EFFORT_SELECTION = 3,
  SCHEDULING = 4,
  ESTIMATE = 5,
  PAYMENT = 6,
}

// Property Details Types
export interface PropertyDetails {
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  accessInstructions?: string;
  sizeTier?: PropertySizeTier;
}

// Service-specific interfaces
export interface DeepCleaningDetails extends PropertyDetails {
  serviceType: ServiceType.DEEP_CLEANING;
  cleaningLevel: 'light' | 'moderate' | 'heavy' | 'extreme';
  lastCleanedDate?: string;
  hasStains: boolean;
  hasOdors: boolean;
  requiresDisinfection: boolean;
}

export interface MoveInOutDetails extends PropertyDetails {
  serviceType: ServiceType.MOVE_IN_OUT;
  moveType: 'move_in' | 'move_out' | 'both';
  moveDate: string;
  propertyCondition: 'excellent' | 'fair' | 'poor';
  hasAppliances: boolean;
  requiresDeepClean: boolean;
}

export interface PostConstructionDetails extends PropertyDetails {
  serviceType: ServiceType.POST_CONSTRUCTION;
  constructionType: 'renovation' | 'new_build' | 'other';
  dustLevel: 'light' | 'heavy' | 'extreme';
  hasPaintResidue: boolean;
  hasDrywallDust: boolean;
  requiresHepaFilter: boolean;
}

export interface WindowCleaningDetails extends PropertyDetails {
  serviceType: ServiceType.WINDOW_CLEANING;
  windowCount: number;
  windowHeight: 'ground' | 'medium' | 'high' | 'very_high';
  hasHardToReach: boolean;
  requiresLadder: boolean;
  includesScreens: boolean;
  includesTracks: boolean;
}

export interface OfficeDetails extends Omit<PropertyDetails, 'bedrooms' | 'bathrooms'> {
  workstations: number;
  meetingRooms: number;
  commonAreas: number;
  hasKitchen: boolean;
  hasReception: boolean;
  businessType: 'startup' | 'corporate' | 'retail' | 'medical' | 'other';
}

// Union type for all property detail types
export type AllPropertyDetails =
  | PropertyDetails
  | OfficeDetails
  | DeepCleaningDetails
  | MoveInOutDetails
  | PostConstructionDetails
  | WindowCleaningDetails;

// Estimate Types
export interface Estimate {
  id: string;
  basePrice: number;
  duration: number; // in minutes
  frequency: CleaningFrequency;
  effortLevel?: EffortLevel;
  sizeTier?: PropertySizeTier;
  isEstimate: boolean;
  addOns: EstimateAddOn[];
  discounts: EstimateDiscount[];
  totalPrice: number;
  currency: string;
  validUntil: string;
  breakdown: EstimateBreakdown;
  accessInstructions?: string;
}

export interface EstimateAddOn {
  id: string;
  name: string;
  price: number;
  quantity?: number;
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
  effortMultiplier?: number;
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
  addOns?: Record<string, number>; // Add-ons selected in schedule step
  accessInstructions?: string; // Access instructions from schedule step
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
  selectedEffort: EffortLevel | null;
  sizeTier: PropertySizeTier | null;
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
  frequency: CleaningFrequency.ONCE;
  specialInstructions?: string;
  preferredDate?: string;
}

export interface RegularCleaningData extends PropertyDetails {
  serviceType: ServiceType;
  frequency: Exclude<CleaningFrequency, CleaningFrequency.ONCE>;
  effortLevel: EffortLevel;
  startDate: string;
  endDate?: string;
  specialInstructions?: string;
}

// API Response Types
export interface BookingFlowResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  step?: BookingStep;
  redirectUrl?: string;
}

// Component Props Types
export interface BookingStepProps {
  onNext: (data: unknown) => void;
  onBack: () => void;
  onSkip?: () => void;
  data?: unknown;
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
  selectedEffort?: EffortLevel;
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
} as const;

// Utility Types
export type BookingFlowStep = keyof typeof BookingStep;
export type ServiceTypeKey = keyof typeof ServiceType;
export type CleaningFrequencyKey = keyof typeof CleaningFrequency;
export type EffortLevelKey = keyof typeof EffortLevel;
export type PropertySizeTierKey = keyof typeof PropertySizeTier;

// Step condition type
export type StepCondition = (state: BookingFlowState) => boolean;
