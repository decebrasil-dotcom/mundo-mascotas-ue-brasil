import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { STICKERS } from '../../data/stickers';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { playSound } from '../../utils/audio';

export const AlbumView: React.FC = () => {
  const { unlockedStickers, setActiveTab, soundEnabled } = useApp();
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  const total = STICKERS.length;
  const unlockedCount = unlockedStickers.length;
  const percentage = Math.round((unlockedCount / total) * 100);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'juegos', label: 'Juegos' },
    { id: 'historias', label: 'Historias' },
    { id: 'retos', label: 'Retos' },
    { id: 'dece', label: 'DECE' },
    { id: 'especial', label: 'Especial' },
  ];

  const filteredStickers = filterCategory === 'todos'
    ? STICKERS
    : STICKERS.filter((s) => s.category === filterCategory);

  return (
    <div className="space-y-5 pb-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 text-yellow-300 font-bold text-xs uppercase tracking-wider mb-2">
          <span>⭐</span>
          <span>Coleccionable Escolar</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight mb-1">
          Álbum de Stickers
        </h2>
        <p className="text-xs md:text-sm text-slate-800 max-w-xl mb-4">
          ¡Cada acción positiva, juego superado e historia leída te regala un sticker para tu colección escolar!
        </p>

        {/* Progress bar container */}
        <div className="bg-white/70 backdrop-blur-xs p-4 rounded-2xl border border-amber-300">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className="text-slate-800">Progreso del Álbum</span>
            <span className="text-emerald-800 bg-white px-2 py-0.5 rounded-full shadow-xs">
              {unlockedCount} de {total} stickers ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-amber-200/80 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playSound('pop', soundEnabled);
              setFilterCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              filterCategory === cat.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filteredStickers.map((sticker) => {
          const isUnlocked = unlockedStickers.includes(sticker.id);

          return (
            <div
              key={sticker.id}
              className={`relative rounded-3xl p-4 transition-all flex flex-col justify-between text-center overflow-hidden min-h-[200px] border-2 ${
                isUnlocked
                  ? 'bg-white border-amber-300 shadow-sm'
                  : 'bg-slate-50 border-slate-200 opacity-75'
              }`}
            >
              {isUnlocked ? (
                /* Unlocked Card */
                <>
                  <div className="flex flex-col items-center">
                    <div className="mb-1">
                      <MascotaAvatar id={sticker.mascotId} size="sm" />
                    </div>
                    <span className="text-3xl my-1 animate-float">{sticker.icon}</span>
                    <h3 className="font-display font-bold text-xs text-slate-900 leading-tight">
                      {sticker.title}
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                      {sticker.subtitle}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-2 line-clamp-2">
                    {sticker.description}
                  </p>
                </>
              ) : (
                /* Locked Silhouette Card */
                <>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xl mb-2">
                      🔒
                    </div>
                    <h3 className="font-display font-bold text-xs text-slate-500 leading-tight">
                      Sticker Bloqueado
                    </h3>
                    <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                      {sticker.subtitle}
                    </span>
                  </div>

                  <div className="bg-white/80 rounded-xl p-2 mt-2 border border-slate-200 text-left">
                    <span className="text-[9px] font-bold text-amber-800 uppercase block mb-0.5">
                      ¿Cómo desbloquear?
                    </span>
                    <p className="text-[10px] text-slate-600 leading-tight">
                      {sticker.howToUnlock}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Call to action if stickers remain */}
      {unlockedCount < total && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center">
          <h4 className="font-display font-bold text-emerald-950 text-sm mb-1">
            ¡Sigue explorando para completar el álbum!
          </h4>
          <p className="text-xs text-emerald-800 mb-3 max-w-md mx-auto">
            Puedes ganar los stickers restantes jugando los 6 juegos, leyendo las 4 historias o marcando retos positivos.
          </p>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('juegos')}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs font-display transition-colors cursor-pointer"
            >
              Ir a los Juegos 🎮
            </button>
            <button
              onClick={() => setActiveTab('retos')}
              className="py-2.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-bold rounded-xl text-xs font-display transition-colors cursor-pointer"
            >
              Cumplir Retos 🎯
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
