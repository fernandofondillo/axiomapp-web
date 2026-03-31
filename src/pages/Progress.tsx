import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchMetabolicScores } from '../lib/supabase';
import type { MetabolicQScore } from '../types';

export default function Progress() {
  const { user } = useAuth();
  const [scores, setScores] = useState<MetabolicQScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMetabolicScores(user.id, 30).then(({ data }) => { setScores(data ?? []); setLoading(false); });
  }, [user]);

  if (loading) return <div className="p-6 text-gray-400">Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-6">Tu progreso</h1>
      {scores.length === 0 ? (
        <div className="text-center text-gray-400 mt-12">Sin datos todavía. Completa registros diarios para ver tu evolución.</div>
      ) : (
        <div className="space-y-3">
          {scores.map(s => (
            <div key={s.date} className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex justify-between items-center">
              <div>
                <div className="text-gray-400 text-sm">{new Date(s.date).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</div>
                <div className="text-xs text-gray-500 mt-1">{s.drivers.map(d => `${d.label}: ${d.score}`).join(' · ')}</div>
              </div>
              <div className="text-2xl font-bold text-emerald-400">{s.overall}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
