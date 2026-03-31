import { Outlet, NavLink } from 'react-router-dom';

const nav = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/log', label: 'Registro', icon: '📝' },
  { to: '/progress', label: 'Progreso', icon: '📊' },
  { to: '/profile', label: 'Perfil', icon: '👤' },
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="pb-20"><Outlet /></main>
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 flex justify-around py-3">
        {nav.map(n => (
          <NavLink key={n.to} to={n.to} className={({ isActive }) => `flex flex-col items-center gap-1 text-xs ${isActive ? 'text-emerald-400' : 'text-gray-500'}`}>
            <span className="text-lg">{n.icon}</span>
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
