import React, { useState } from 'react';
import { useApp, NavigationSection } from '../../context/AppContext';
import { playSound } from '../../utils/audio';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, soundEnabled } = useApp();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const mainTabs: { id: NavigationSection; label: string; icon: string }[] = [
    { id: 'inicio', label: 'Inicio', icon: '🏠' },
    { id: 'personajes', label: 'Mascotas', icon: '🐾' },
    { id: 'juegos', label: 'Juegos', icon: '🎮' },
    { id: 'album', label: 'Álbum', icon: '⭐' },
  ];

  const moreItems: { id: NavigationSection; label: string; icon: string; desc: string }[] = [
    { id: 'historias', label: 'Historias & Cuentos', icon: '📖', desc: 'Aventuras ilustradas paso a paso' },
    { id: 'retos', label: 'Retos Escolares', icon: '🎯', desc: 'Misiones positivas de convivencia' },
    { id: 'dece', label: 'Aprende DECE', icon: '💚', desc: 'Orientación, prevención y apoyo' },
    { id: 'tv', label: 'Mascotas TV', icon: '📺', desc: 'Videos educativos y episodios' },
    { id: 'buzon', label: 'Buzón de Mascotas', icon: '📬', desc: 'Escribe tus dudas o sugerencias' },
  ];

  const isMoreActive = moreItems.some((item) => item.id === activeTab);

  const handleSelectMore = (id: NavigationSection) => {
    playSound('pop', soundEnabled);
    setShowMoreMenu(false);
    setActiveTab(id);
  };

  return (
    <>
      {/* "Más" Bottom Sheet Modal on mobile */}
      {showMoreMenu && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="w-full max-w-md mx-auto bg-white rounded-t-3xl p-5 shadow-2xl border-t-2 border-emerald-200 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Grab handle */}
            <div className="w-10 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <h3 className="font-display font-bold text-slate-800 text-sm">
                Más Secciones del Mundo Escolar
              </h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 mb-3">
              {moreItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectMore(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-slate-50 hover:bg-amber-50/60 border border-slate-100 text-slate-700'
                  }`}
                >
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold font-display">{item.label}</h4>
                    <p className="text-[11px] text-slate-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg lg:hidden">
        <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
          {mainTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setShowMoreMenu(false);
                  setActiveTab(tab.id);
                }}
                className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer select-none ${
                  isActive ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <span className={`text-xl transition-transform ${isActive ? 'scale-115' : ''}`}>
                  {tab.icon}
                </span>
                <span
                  className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                    isActive ? 'font-black text-emerald-700' : 'font-medium'
                  }`}
                >
                  {tab.label}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5" />
                )}
              </button>
            );
          })}

          {/* More button */}
          <button
            onClick={() => {
              playSound('pop', soundEnabled);
              setShowMoreMenu((prev) => !prev);
            }}
            className={`flex flex-col items-center justify-center h-full min-h-[44px] transition-colors cursor-pointer select-none ${
              isMoreActive || showMoreMenu ? 'text-amber-700' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className={`text-xl transition-transform ${isMoreActive || showMoreMenu ? 'scale-115' : ''}`}>
              🎒
            </span>
            <span
              className={`text-[10px] tracking-tight mt-0.5 whitespace-nowrap ${
                isMoreActive || showMoreMenu ? 'font-black text-amber-700' : 'font-medium'
              }`}
            >
              Más
            </span>
            {isMoreActive && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-0.5" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
