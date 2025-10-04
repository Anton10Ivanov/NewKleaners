// User Types
export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: 'client' | 'provider' | 'admin';
  created_at: string;
  updated_at: string;
  is_verified: boolean;
  last_login?: string;
}

export interface UserProfile extends User {
  bio?: string;
  address?: Address;
  preferences?: UserPreferences;
  subscription?: Subscription;
}

export interface UserPreferences {
  language: string;
  timezone: string;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
  booking_updates: boolean;
  marketing: boolean;
}

export interface PrivacySettings {
  profile_visibility: 'public' | 'private';
  show_phone: boolean;
  show_email: boolean;
}

// Address Types
export interface Address {
  id: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  state?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  is_default: boolean;
  user_id: string;
}

// Service Types
export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  subcategory?: string;
  base_price: number;
  price_type: 'hourly' | 'fixed' | 'per_sqm';
  duration_minutes: number;
  is_active: boolean;
  requirements?: string[];
  features?: string[];
  images?: string[];
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
  sort_order: number;
}

export interface ServiceProvider {
  id: string;
  user_id: string;
  business_name: string;
  business_type: 'individual' | 'company';
  description: string;
  services: string[]; // Service IDs
  service_areas: string[]; // Postal codes or cities
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_available: boolean;
  availability_schedule: AvailabilitySchedule;
  pricing: ProviderPricing;
  documents: ProviderDocument[];
  created_at: string;
  updated_at: string;
}

export interface AvailabilitySchedule {
  monday: TimeSlot[];
  tuesday: TimeSlot[];
  wednesday: TimeSlot[];
  thursday: TimeSlot[];
  friday: TimeSlot[];
  saturday: TimeSlot[];
  sunday: TimeSlot[];
}

export interface TimeSlot {
  start: string; // HH:MM format
  end: string; // HH:MM format
  is_available: boolean;
}

export interface ProviderPricing {
  base_rate: number;
  currency: string;
  minimum_booking: number; // in minutes
  cancellation_policy: CancellationPolicy;
  additional_fees?: AdditionalFee[];
}

export interface AdditionalFee {
  name: string;
  amount: number;
  type: 'fixed' | 'percentage';
  condition?: string;
}

export interface CancellationPolicy {
  free_cancellation_hours: number;
  partial_refund_hours: number;
  no_refund_hours: number;
}

export interface ProviderDocument {
  id: string;
  type: 'insurance' | 'license' | 'certification' | 'id';
  name: string;
  file_url: string;
  expiry_date?: string;
  is_verified: boolean;
  uploaded_at: string;
}

// Booking Types
export interface Booking {
  id: string;
  client_id: string;
  provider_id: string;
  service_id: string;
  status: BookingStatus;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  address: Address;
  special_instructions?: string;
  total_price: number;
  currency: string;
  payment_status: PaymentStatus;
  payment_method?: string;
  created_at: string;
  updated_at: string;
  completed_at?: string;
  cancelled_at?: string;
  cancellation_reason?: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'disputed';

export type PaymentStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'partially_refunded';

// Payment Types
export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method: PaymentMethod;
  stripe_payment_intent_id?: string;
  stripe_charge_id?: string;
  refund_amount?: number;
  refund_reason?: string;
  processed_at?: string;
  created_at: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'sepa' | 'paypal' | 'apple_pay' | 'google_pay';
  last_four?: string;
  brand?: string;
  expiry_month?: number;
  expiry_year?: number;
  is_default: boolean;
}

// Review Types
export interface Review {
  id: string;
  booking_id: string;
  client_id: string;
  provider_id: string;
  rating: number; // 1-5
  title: string;
  comment: string;
  images?: string[];
  is_verified: boolean;
  is_public: boolean;
  provider_response?: ProviderResponse;
  created_at: string;
  updated_at: string;
}

export interface ProviderResponse {
  id: string;
  review_id: string;
  comment: string;
  created_at: string;
}

// Message Types
export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'system';
  attachments?: MessageAttachment[];
  is_read: boolean;
  created_at: string;
}

export interface MessageAttachment {
  id: string;
  file_name: string;
  file_url: string;
  file_size: number;
  file_type: string;
}

export interface Conversation {
  id: string;
  booking_id: string;
  client_id: string;
  provider_id: string;
  last_message?: Message;
  unread_count_client: number;
  unread_count_provider: number;
  created_at: string;
  updated_at: string;
}

// Notification Types
export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

export type NotificationType =
  | 'booking_confirmed'
  | 'booking_cancelled'
  | 'booking_reminder'
  | 'payment_received'
  | 'review_received'
  | 'message_received'
  | 'system_update';

// Admin Types
export interface AdminStats {
  total_users: number;
  total_providers: number;
  total_bookings: number;
  total_revenue: number;
  pending_verifications: number;
  active_bookings: number;
  completed_bookings_today: number;
  average_rating: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

// Form Types
export interface BookingFormData {
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  duration_minutes: number;
  address: Omit<Address, 'id' | 'user_id'>;
  special_instructions?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface ProviderRegistrationData {
  business_name: string;
  business_type: 'individual' | 'company';
  description: string;
  services: string[];
  service_areas: string[];
  availability_schedule: AvailabilitySchedule;
  pricing: Omit<ProviderPricing, 'currency'>;
}

// Search and Filter Types
export interface SearchFilters {
  category?: string;
  subcategory?: string;
  price_min?: number;
  price_max?: number;
  rating_min?: number;
  availability?: string;
  location?: string;
  sort_by?: 'price' | 'rating' | 'distance' | 'availability';
  sort_order?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  filters: SearchFilters;
  pagination: {
    page: number;
    limit: number;
    total_pages: number;
  };
}

// Error Types
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, any>;
  timestamp: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  is_popular: boolean;
  is_active: boolean;
}
