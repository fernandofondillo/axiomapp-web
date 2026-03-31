import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user, signOut } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-6">Perfil</h1>
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6">
        <div className="text-4xl mb-3 text-center">👤</div>
        <div className="text-center">
          <div className="text-white font-semibold">{user?.email}</div>
          <div className="text-gray-400 text-sm mt-1">ID: {user?.id?.slice(0, 8)}...</div>
        </div>
      </div>
      <button onClick={signOut} className="w-full bg-red-900 hover:bg-red-800 text-red-200 font-semibold py-3 rounded-xl transition">
        Cerrar sesión
      </button>
    </div>
  );
}
