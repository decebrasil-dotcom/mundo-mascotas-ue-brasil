import React from 'react';
import { MascotCharacter } from '../../types';
import { MascotaAvatar } from './MascotaAvatar';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';

interface MascotaDetailModalProps {
  mascot: MascotCharacter;
  onClose: () => void;
}

export const MascotaDetailModal: React.FC<MascotaDetailModalProps> = ({ mascot, onClose }) => {
  const { setActiveGameId, setActiveTab, soundEnabled } = useApp();

  const handleLaunchGame = (gameId: string) => {
    playSound('pop', soundEnabled);
    onClose();
    setActiveGameId(gameId);
  };

  const handleGoToStories = () => {
    playSound('pop', soundEnabled);
    onClose();
    setActiveTab('historias');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-300 my-auto text-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-bold text-sm cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Mascot Hero Header */}
        <div className="flex flex-col items-center text-center pt-2 pb-4">
          <div className="mb-3">
            <MascotaAvatar id={mascot.id} size="xl" />
          </div>

          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-2xl font-black font-display text-slate-900">
              {mascot.name}
            </h3>
            <span className="text-xl">{mascot.speciesEmoji}</span>
          </div>

          {/* Species and Role */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-3">
            <span>Especie: <strong className="text-slate-700">{mascot.species}</strong></span>
            <span>·</span>
            <span className="text-emerald-700">{mascot.role}</span>
          </div>

          {/* Mascot Characteristic Quote */}
          <div className="w-full bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 mb-4 text-center">
            <p className="text-xs md:text-sm font-semibold text-amber-950 italic">
              {mascot.quote}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Sobre {mascot.name}
          </h4>
          <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
            {mascot.fullDesc}
          </p>
        </div>

        {/* Mascot Advice */}
        <div className="mb-5 bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-xl p-3.5">
          <h4 className="text-xs font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
            <span>💡</span> Consejo de {mascot.name} para ti:
          </h4>
          <p className="text-xs text-emerald-900 leading-relaxed font-medium">
            {mascot.advice}
          </p>
        </div>

        {/* Super Traits */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Valores y Cualidades
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {mascot.traits.map((trait, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        {mascot.gameId ? (
          <button
            onClick={() => handleLaunchGame(mascot.gameId!)}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-98 shadow cursor-pointer text-sm font-display flex items-center justify-center gap-2"
          >
            <span>🎮</span> Jugar el Reto de {mascot.name}
          </button>
        ) : (
          <button
            onClick={handleGoToStories}
            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-2xl transition-all active:scale-98 shadow cursor-pointer text-sm font-display flex items-center justify-center gap-2"
          >
            <span>📖</span> Leer Aventuras con {mascot.name}
          </button>
        )}
      </div>
    </div>
  );
};
