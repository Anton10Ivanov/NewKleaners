'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import type { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase';
import type { UserProfile } from '@/types';

// Check if Supabase is properly configured
const isSupabaseConfigured = supabase !== null;

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      if (!isSupabaseConfigured) {
        console.warn('Supabase not configured, running in development mode');
        setLoading(false);
        return;
      }

      try {
        if (supabase) {
          const {
            data: { session },
          } = await supabase.auth.getSession();
          setUser(session?.user ?? null);

          if (session?.user) {
            await fetchUserProfile(session.user.id);
          }
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes (only if Supabase is configured)
    if (isSupabaseConfigured && supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchUserProfile(session.user.id);
        } else {
          setUserProfile(null);
        }

        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }

    // Return cleanup function for when Supabase is not configured
    return () => {};
  }, []);

  const fetchUserProfile = async (userId: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

      if (error) {
        throw error;
      }
      setUserProfile(data as UserProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: new Error('Supabase not configured. Please set up your environment variables.'),
      };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: new Error('Supabase not configured. Please set up your environment variables.'),
      };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });
    return { error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured || !supabase) {
      return;
    }

    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!isSupabaseConfigured || !supabase) {
      return {
        error: new Error('Supabase not configured. Please set up your environment variables.'),
      };
    }

    if (!user) {
      return { error: new Error('No user logged in') };
    }

    const { error } = await supabase.from('users').update(updates).eq('id', user.id);

    if (!error) {
      setUserProfile(prev => (prev ? { ...prev, ...updates } : null));
    }

    return { error };
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
