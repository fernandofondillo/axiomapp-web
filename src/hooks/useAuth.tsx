import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, onAuthStateChange, signOut } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType { user: User | null; loading: boolean; signOut: () => void; }
const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: () => {} });
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { onAuthStateChange((session: unknown) => { setUser((session as { user: User | null })?.user ?? null); setLoading(false); }); }, []);
  return <AuthContext.Provider value={{ user, loading, signOut: () => signOut() }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
