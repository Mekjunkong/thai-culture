// Auto-generated target shape for: supabase gen types typescript --linked > lib/database.types.ts
// Hand-written MVP stubs matching schema.sql until a live Supabase project is linked.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          subscription_tier: 'free' | 'pro' | 'lifetime'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'lifetime'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'lifetime'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      lessons: {
        Row: {
          id: string
          slug: string
          title: string
          week: number
          description: string | null
          content_url: string | null
          video_url: string | null
          audio_url: string | null
          is_free: boolean
          sort_order: number
          published_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          week: number
          description?: string | null
          content_url?: string | null
          video_url?: string | null
          audio_url?: string | null
          is_free?: boolean
          sort_order?: number
          published_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          week?: number
          description?: string | null
          content_url?: string | null
          video_url?: string | null
          audio_url?: string | null
          is_free?: boolean
          sort_order?: number
          published_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          quiz_score: number | null
          last_position_seconds: number
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          quiz_score?: number | null
          last_position_seconds?: number
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          quiz_score?: number | null
          last_position_seconds?: number
          completed_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused'
          plan: 'monthly' | 'annual' | 'lifetime'
          current_period_start: string | null
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused'
          plan?: 'monthly' | 'annual' | 'lifetime'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          status?: 'active' | 'canceled' | 'past_due' | 'trialing' | 'incomplete' | 'incomplete_expired' | 'unpaid' | 'paused'
          plan?: 'monthly' | 'annual' | 'lifetime'
          current_period_start?: string | null
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
