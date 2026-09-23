import React from 'react';
import { MASCOTS } from '../../data/characters';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';

export const PersonajesView: React.FC = () => {
  const { setSelectedMascot, setActiveGameId, soundEnabled } = useApp();

  const handleOpenMascot = (mascot: (typeof MASCOTS)[0]) => {
    playSound('pop', soundEnabled);
    setSelectedMascot(mascot);
  };

  const handleOpenGame = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    playSound('pop', soundEnabled);
    setActiveGameId(gameId);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400 text-emerald-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>🐾</span>
          <span>10 Personajes Oficiales</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Nuestras Mascotas Escolares
        </h2>
        <p className="text-xs md:text-sm text-emerald-100 max-w-xl">
          Conoce a cada uno de los integrantes de la Unidad Educativa Brasil. Cada especie representa un valor indispensable para nuestro crecimiento y bienestar.
        </p>
      </div>

      {/* Grid of 10 Mascots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {MASCOTS.map((mascot) => (
          <div
            key={mascot.id}
            onClick={() => handleOpenMascot(mascot)}
            className="group bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start gap-4 mb-3">
                <div className="shrink-0 transition-transform group-hover:scale-105">
                  <MascotaAvatar id={mascot.id} size="lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-bold font-display text-slate-900 truncate">
                      {mascot.name}
                    </h3>
                    <span className="text-lg">{mascot.speciesEmoji}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700">
                    {mascot.species} · {mascot.role}
                  </p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {mascot.shortDesc}
                  </p>
                </div>
              </div>

              {/* Quote bubble */}
              <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-2.5 mb-3 text-xs text-amber-950 italic">
                "{mascot.quote}"
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
                <span>Ver ficha completa</span>
                <span>→</span>
              </span>

              {mascot.gameId && (
                <button
                  onClick={(e) => handleOpenGame(e, mascot.gameId!)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-yellow-300 text-emerald-950 font-bold font-display transition-colors cursor-pointer text-xs"
                >
                  🎮 Mini-Juego
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
