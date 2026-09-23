import React from 'react';
import { useApp } from '../../context/AppContext';
import { STICKERS } from '../../data/stickers';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

export const StickerCelebrationModal: React.FC = () => {
  const { newStickerCelebration, closeStickerCelebration, setActiveTab } = useApp();

  if (!newStickerCelebration) return null;

  const sticker = STICKERS.find((s) => s.id === newStickerCelebration);
  if (!sticker) return null;

  const handleGoToAlbum = () => {
    closeStickerCelebration();
    setActiveTab('album');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-amber-50 to-white rounded-3xl p-6 shadow-2xl border-4 border-yellow-400 text-center text-slate-800 animate-pulse-gentle">
        <div className="text-3xl mb-1">🎉 ✨ 🎊</div>

        <h3 className="text-2xl font-black font-display text-amber-950 mb-1">
          ¡Nuevo Sticker Desbloqueado!
        </h3>
        <p className="text-xs text-amber-800 mb-5">
          ¡Felicidades por tu esfuerzo en la Unidad Educativa Brasil!
        </p>

        {/* Sticker Card Display */}
        <div className="relative mx-auto w-40 h-44 rounded-3xl bg-white border-4 border-amber-300 p-3 shadow-xl flex flex-col items-center justify-center mb-5 overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-200/50 rounded-full blur-xl pointer-events-none" />
          <div className="mb-1">
            <MascotaAvatar id={sticker.mascotId} size="md" />
          </div>
          <span className="text-2xl my-0.5">{sticker.icon}</span>
          <h4 className="text-xs font-bold text-slate-900 font-display text-center leading-tight">
            {sticker.title}
          </h4>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">
            {sticker.subtitle}
          </span>
        </div>

        <p className="text-xs text-slate-600 mb-5 px-2">
          {sticker.description}
        </p>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleGoToAlbum}
            className="w-full py-3.5 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold rounded-2xl shadow transition-all active:scale-98 cursor-pointer text-xs md:text-sm font-display"
          >
            Ver en mi Álbum 🌟
          </button>
          <button
            onClick={closeStickerCelebration}
            className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
          >
            Continuar jugando
          </button>
        </div>
      </div>
    </div>
  );
};
