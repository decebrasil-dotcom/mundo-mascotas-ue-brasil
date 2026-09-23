import React from 'react';
import { CHALLENGES } from '../../data/challenges';
import { useApp } from '../../context/AppContext';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

export const RetosView: React.FC = () => {
  const { completedChallenges, toggleChallenge, unlockedStickers } = useApp();

  const total = CHALLENGES.length;
  const completedCount = completedChallenges.length;
  const isMasterUnlocked = unlockedStickers.includes('master-retos');

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-orange-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>🎯</span>
          <span>10 Retos de Buena Convivencia</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Retos Positivos Escolares
        </h2>
        <p className="text-xs md:text-sm text-orange-50 max-w-xl mb-4">
          Pequeñas acciones cotidianas que transforman nuestra escuela en un lugar más amable, limpio y seguro. ¡Márcalos al cumplirlos para ganar el sticker de Héroe de la Escuela!
        </p>

        {/* Progress */}
        <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-orange-200 text-slate-800">
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span>Retos Completados</span>
            <span className="text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
              {completedCount} de {total}
            </span>
          </div>
          <div className="w-full bg-orange-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-orange-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(completedCount / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Special master badge notice */}
      {isMasterUnlocked ? (
        <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-4 flex items-center gap-3">
          <span className="text-3xl">🏆</span>
          <div>
            <h4 className="font-display font-bold text-xs md:text-sm text-emerald-950">
              ¡Insignia "Héroe de la Escuela" Desbloqueada!
            </h4>
            <p className="text-xs text-emerald-800">
              Cumpliste más de 3 retos positivos. ¡Gracias por hacer de la Unidad Educativa Brasil un espacio genial!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 flex items-center gap-2.5">
          <span>💡</span>
          <span>Completa al menos <strong>3 retos</strong> para desbloquear el sticker de honor <strong>"Héroe de la Escuela"</strong>.</span>
        </div>
      )}

      {/* Challenges list */}
      <div className="space-y-3">
        {CHALLENGES.map((ch) => {
          const isDone = completedChallenges.includes(ch.id);

          return (
            <div
              key={ch.id}
              onClick={() => toggleChallenge(ch.id)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-400 text-slate-800 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
              }`}
            >
              {/* Checkbox button */}
              <div
                className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 mt-0.5 transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white scale-105 shadow-xs'
                    : 'border-2 border-slate-300 text-transparent bg-slate-50'
                }`}
              >
                ✓
              </div>

              {/* Challenge description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {ch.category}
                  </span>
                </div>
                <h3 className={`font-display font-bold text-sm leading-tight ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                  {ch.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              {/* Mascot badge */}
              <div className="shrink-0 hidden sm:block">
                <MascotaAvatar id={ch.mascotId} size="sm" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
