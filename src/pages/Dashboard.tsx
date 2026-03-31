import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { fetchMetabolicScores } from '../lib/supabase';
import type { MetabolicQScore } from '../types';

export default function Dashboard() {
  const { user } = useAuth();
  const [score, setScore] = useState<MetabolicQScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMetabolicScores(user.id, 7).then(({ data }) => {
      setScore(data?.[0] ?? null);
      setLoading(false);
    });
  }, [user]);

  if (loading) return <div className="p-6 text-center text-gray-400">Cargando...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-1">Hola, {user?.email?.split('@')[0]}</h1>
      <p className="text-gray-400 text-sm mb-6">Tu resumen de hoy</p>
      
      {score ? (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400 text-sm">MetabolicQ Score</span>
            <span className={`text-xs px-2 py-1 rounded-full ${score.trend === 'up' ? 'bg-emerald-900 text-emerald-400' : score.trend === 'down' ? 'bg-red-900 text-red-400' : 'bg-gray-800 text-gray-400'}`}>
              {score.trend === 'up' ? '↑ Subiendo' : score.trend === 'down' ? '↓ Bajando' : '→ Estable'}
            </span>
          </div>
          <div className="text-5xl font-bold text-emerald-400 mb-6">{score.overall}<span className="text-2xl text-gray-500">/100</span></div>
          <div className="grid grid-cols-2 gap-3">
            {score.drivers.slice(0, 4).map(d => (
              <div key={d.driver} className="bg-gray-800 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">{d.label}</div>
                <div className="text-xl font-semibold text-white">{d.score}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 text-center">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-400">Completa tu primer registro diario para ver tu MetabolicQ Score</p>
          <a href="/log" className="mt-4 inline-block bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm">Empezar</a>
        </div>
      )}
    </div>
  );
}
