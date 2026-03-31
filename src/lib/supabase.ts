import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const signInWithEmail = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

export const signUpWithEmail = (email: string, password: string) =>
  supabase.auth.signUp({ email, password });

export const signOut = () => supabase.auth.signOut();

export const onAuthStateChange = (callback: (session: unknown) => void) =>
  supabase.auth.onAuthStateChange((_event, session) => callback(session));

export const upsertUserProfile = (profile: Partial<UserProfile> & { id: string }) =>
  supabase.from('users').upsert(profile).select().single();

export const fetchUserProfile = (userId: string) =>
  supabase.from('users').select('*').eq('id', userId).single();

// FIX 2 (HIGH): elimina campos calculados en frontend antes de upsert
export const upsertMetabolicScore = (userId: string, score: Partial<MetabolicQScore>) => {
  const {
    overall: _overall,
    drivers: _drivers,
    trend: _trend,
    trendPercent: _trendPercent,
    isProvisional: _isProvisional,
    ...dbFields
  } = score;
  return supabase
    .from('metabolic_scores')
    .upsert({ user_id: userId, ...dbFields })
    .select()
    .single();
};

export const fetchMetabolicScores = (userId: string, days = 30) => {
  const from = new Date();
  from.setDate(from.getDate() - days);
  return supabase
    .from('metabolic_scores')
    .select('*')
    .eq('user_id', userId)
    .gte('date', from.toISOString().split('T')[0])
    .order('date', { ascending: false });
};

// FIX 1 (CRÍTICO): elimina campos no-columna en BD antes de upsert
export const upsertDailyLog = (userId: string, log: Partial<DailyLog>) => {
  const { id: _id, userId: _userId, createdAt: _createdAt, ...dbFields } = log;
  return supabase
    .from('daily_logs')
    .upsert({ user_id: userId, date: log.date, ...dbFields })
    .select()
    .single();
};

export const fetchDailyLogs = (userId: string, days = 7) => {
  const from = new Date();
  from.setDate(from.getDate() - days);
  return supabase
    .from('daily_logs')
    .select('*')
    .eq('user_id', userId)
    .gte('date', from.toISOString().split('T')[0])
    .order('date', { ascending: false });
};

import type { UserProfile, MetabolicQScore, DailyLog } from '../types';
