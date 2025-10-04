export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
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
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          phone?: string;
          avatar_url?: string;
          role?: 'client' | 'provider' | 'admin';
          created_at?: string;
          updated_at?: string;
          is_verified?: boolean;
          last_login?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          phone?: string;
          avatar_url?: string;
          role?: 'client' | 'provider' | 'admin';
          created_at?: string;
          updated_at?: string;
          is_verified?: boolean;
          last_login?: string;
        };
        Relationships: [];
      };
      addresses: {
        Row: {
          id: string;
          street: string;
          city: string;
          postal_code: string;
          country: string;
          state?: string;
          coordinates?: Json;
          is_default: boolean;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          street: string;
          city: string;
          postal_code: string;
          country: string;
          state?: string;
          coordinates?: Json;
          is_default?: boolean;
          user_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          street?: string;
          city?: string;
          postal_code?: string;
          country?: string;
          state?: string;
          coordinates?: Json;
          is_default?: boolean;
          user_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'addresses_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      service_categories: {
        Row: {
          id: string;
          name: string;
          description: string;
          icon: string;
          color: string;
          is_active: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          icon: string;
          color: string;
          is_active?: boolean;
          sort_order: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          icon?: string;
          color?: string;
          is_active?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          id: string;
          name: string;
          description: string;
          category_id: string;
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
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          category_id: string;
          subcategory?: string;
          base_price: number;
          price_type: 'hourly' | 'fixed' | 'per_sqm';
          duration_minutes: number;
          is_active?: boolean;
          requirements?: string[];
          features?: string[];
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          category_id?: string;
          subcategory?: string;
          base_price?: number;
          price_type?: 'hourly' | 'fixed' | 'per_sqm';
          duration_minutes?: number;
          is_active?: boolean;
          requirements?: string[];
          features?: string[];
          images?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'services_category_id_fkey';
            columns: ['category_id'];
            referencedRelation: 'service_categories';
            referencedColumns: ['id'];
          },
        ];
      };
      providers: {
        Row: {
          id: string;
          user_id: string;
          business_name: string;
          business_type: 'individual' | 'company';
          description: string;
          services: string[];
          service_areas: string[];
          rating: number;
          review_count: number;
          is_verified: boolean;
          is_available: boolean;
          availability_schedule: Json;
          pricing: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_name: string;
          business_type: 'individual' | 'company';
          description: string;
          services: string[];
          service_areas: string[];
          rating?: number;
          review_count?: number;
          is_verified?: boolean;
          is_available?: boolean;
          availability_schedule: Json;
          pricing: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          business_name?: string;
          business_type?: 'individual' | 'company';
          description?: string;
          services?: string[];
          service_areas?: string[];
          rating?: number;
          review_count?: number;
          is_verified?: boolean;
          is_available?: boolean;
          availability_schedule?: Json;
          pricing?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'providers_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      bookings: {
        Row: {
          id: string;
          client_id: string;
          provider_id: string;
          service_id: string;
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
          scheduled_date: string;
          scheduled_time: string;
          duration_minutes: number;
          address: Json;
          special_instructions?: string;
          total_price: number;
          currency: string;
          payment_status:
            | 'pending'
            | 'processing'
            | 'completed'
            | 'failed'
            | 'refunded'
            | 'partially_refunded';
          payment_method?: string;
          created_at: string;
          updated_at: string;
          completed_at?: string;
          cancelled_at?: string;
          cancellation_reason?: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          provider_id: string;
          service_id: string;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
          scheduled_date: string;
          scheduled_time: string;
          duration_minutes: number;
          address: Json;
          special_instructions?: string;
          total_price: number;
          currency?: string;
          payment_status?:
            | 'pending'
            | 'processing'
            | 'completed'
            | 'failed'
            | 'refunded'
            | 'partially_refunded';
          payment_method?: string;
          created_at?: string;
          updated_at?: string;
          completed_at?: string;
          cancelled_at?: string;
          cancellation_reason?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          provider_id?: string;
          service_id?: string;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
          scheduled_date?: string;
          scheduled_time?: string;
          duration_minutes?: number;
          address?: Json;
          special_instructions?: string;
          total_price?: number;
          currency?: string;
          payment_status?:
            | 'pending'
            | 'processing'
            | 'completed'
            | 'failed'
            | 'refunded'
            | 'partially_refunded';
          payment_method?: string;
          created_at?: string;
          updated_at?: string;
          completed_at?: string;
          cancelled_at?: string;
          cancellation_reason?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookings_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_provider_id_fkey';
            columns: ['provider_id'];
            referencedRelation: 'providers';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'bookings_service_id_fkey';
            columns: ['service_id'];
            referencedRelation: 'services';
            referencedColumns: ['id'];
          },
        ];
      };
      payments: {
        Row: {
          id: string;
          booking_id: string;
          amount: number;
          currency: string;
          status:
            | 'pending'
            | 'processing'
            | 'completed'
            | 'failed'
            | 'refunded'
            | 'partially_refunded';
          payment_method: string;
          stripe_payment_intent_id?: string;
          stripe_charge_id?: string;
          refund_amount?: number;
          refund_reason?: string;
          processed_at?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          amount: number;
          currency?: string;
          status?:
            | 'pending'
            | 'processing'
            | 'completed'
            | 'failed'
            | 'refunded'
            | 'partially_refunded';
          payment_method: string;
          stripe_payment_intent_id?: string;
          stripe_charge_id?: string;
          refund_amount?: number;
          refund_reason?: string;
          processed_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          amount?: number;
          currency?: string;
          status?:
            | 'pending'
            | 'processing'
            | 'completed'
            | 'failed'
            | 'refunded'
            | 'partially_refunded';
          payment_method?: string;
          stripe_payment_intent_id?: string;
          stripe_charge_id?: string;
          refund_amount?: number;
          refund_reason?: string;
          processed_at?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'payments_booking_id_fkey';
            columns: ['booking_id'];
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
        ];
      };
      reviews: {
        Row: {
          id: string;
          booking_id: string;
          client_id: string;
          provider_id: string;
          rating: number;
          title: string;
          comment: string;
          images?: string[];
          is_verified: boolean;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          client_id: string;
          provider_id: string;
          rating: number;
          title: string;
          comment: string;
          images?: string[];
          is_verified?: boolean;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          client_id?: string;
          provider_id?: string;
          rating?: number;
          title?: string;
          comment?: string;
          images?: string[];
          is_verified?: boolean;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_booking_id_fkey';
            columns: ['booking_id'];
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reviews_provider_id_fkey';
            columns: ['provider_id'];
            referencedRelation: 'providers';
            referencedColumns: ['id'];
          },
        ];
      };
      conversations: {
        Row: {
          id: string;
          booking_id: string;
          client_id: string;
          provider_id: string;
          unread_count_client: number;
          unread_count_provider: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          client_id: string;
          provider_id: string;
          unread_count_client?: number;
          unread_count_provider?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          client_id?: string;
          provider_id?: string;
          unread_count_client?: number;
          unread_count_provider?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'conversations_booking_id_fkey';
            columns: ['booking_id'];
            referencedRelation: 'bookings';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_client_id_fkey';
            columns: ['client_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'conversations_provider_id_fkey';
            columns: ['provider_id'];
            referencedRelation: 'providers';
            referencedColumns: ['id'];
          },
        ];
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          message_type: 'text' | 'image' | 'file' | 'system';
          attachments?: Json;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content: string;
          message_type?: 'text' | 'image' | 'file' | 'system';
          attachments?: Json;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          sender_id?: string;
          content?: string;
          message_type?: 'text' | 'image' | 'file' | 'system';
          attachments?: Json;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_conversation_id_fkey';
            columns: ['conversation_id'];
            referencedRelation: 'conversations';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_sender_id_fkey';
            columns: ['sender_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type:
            | 'booking_confirmed'
            | 'booking_cancelled'
            | 'booking_reminder'
            | 'payment_received'
            | 'review_received'
            | 'message_received'
            | 'system_update';
          title: string;
          message: string;
          data?: Json;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type:
            | 'booking_confirmed'
            | 'booking_cancelled'
            | 'booking_reminder'
            | 'payment_received'
            | 'review_received'
            | 'message_received'
            | 'system_update';
          title: string;
          message: string;
          data?: Json;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          type?:
            | 'booking_confirmed'
            | 'booking_cancelled'
            | 'booking_reminder'
            | 'payment_received'
            | 'review_received'
            | 'message_received'
            | 'system_update';
          title?: string;
          message?: string;
          data?: Json;
          is_read?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notifications_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
