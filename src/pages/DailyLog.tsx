import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { upsertDailyLog } from '../lib/supabase';
import type { EmotionState } from '../types';

const emotions: { id: EmotionState; label: string; emoji: string }[] = [
  { id: 'great', label: 'Genial', emoji: '😄' },
  { id: 'good', label: 'Bien', emoji: '🙂' },
  { id: 'okay', label: 'Normal', emoji: '😐' },
  { id: 'low', label: 'Bajo', emoji: '😔' },
  { id: 'bad', label: 'Mal', emoji: '😣' },
];

export default function DailyLog() {
  const { user } = useAuth();
  const [energy, setEnergy] = useState(5);
  const [emotion, setEmotion] = useState<EmotionState>('good');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await upsertDailyLog(user.id, {
      date: new Date().toISOString().split('T')[0],
      energy,
      emotion,
      weight: weight ? parseFloat(weight) : undefined,
      notes,
      foodLog: [],
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-6">Registro de hoy</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">¿Cómo te sientes?</h2>
          <div className="flex gap-2 justify-between">
            {emotions.map(e => (
              <button key={e.id} onClick={() => setEmotion(e.id)} className={`flex flex-col items-center gap-1 p-2 rounded-xl ${emotion === e.id ? 'bg-emerald-900 border-2 border-emerald-500' : 'bg-gray-800 border-2 border-transparent'}`}>
                <span className="text-xl">{e.emoji}</span>
                <span className="text-xs text-gray-400">{e.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Nivel de energía: <span className="text-emerald-400">{energy}/10</span></h2>
          <input type="range" min="1" max="10" value={energy} onChange={e => setEnergy(parseInt(e.target.value))} className="w-full accent-emerald-500" />
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Peso (opcional)</h2>
          <input type="number" placeholder="kg" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Notas</h2>
          <textarea placeholder="¿Qué has comido? ¿Cómo has dormido?" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none resize-none" />
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition text-lg">
          {saving ? 'Guardando...' : saved ? '✅ Guardado' : 'Guardar registro'}
        </button>
      </div>
    </div>
  );
}
