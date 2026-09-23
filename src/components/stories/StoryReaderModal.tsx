import React, { useState } from 'react';
import { Story } from '../../types';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

interface StoryReaderModalProps {
  story: Story;
  onClose: () => void;
}

export const StoryReaderModal: React.FC<StoryReaderModalProps> = ({ story, onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const totalPages = story.pages.length;
  const page = story.pages[currentPageIndex];

  const handleNext = () => {
    playSound('pop', soundEnabled);
    if (currentPageIndex + 1 < totalPages) {
      setCurrentPageIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      if (story.rewardStickerId) {
        unlockSticker(story.rewardStickerId);
      }
    }
  };

  const handlePrev = () => {
    playSound('pop', soundEnabled);
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-300 my-auto text-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📖</span>
            <span className="text-xs font-bold text-amber-900 truncate max-w-[200px] md:max-w-xs font-display">
              {story.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress bar */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span>Página {currentPageIndex + 1} de {totalPages}</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                {Math.round(((currentPageIndex + 1) / totalPages) * 100)}% leído
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
              <div
                className="bg-amber-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }}
              />
            </div>

            {/* Mascot speaker pill if present */}
            {page.mascotId && (
              <div className="flex items-center gap-3 p-3 bg-amber-50/70 border border-amber-200 rounded-2xl mb-4">
                <MascotaAvatar id={page.mascotId} size="sm" />
                <div>
                  <h4 className="text-xs font-bold text-amber-950 font-display">
                    {page.speaker || 'Mascota'}
                  </h4>
                  <p className="text-[11px] text-amber-800">Personaje del relato</p>
                </div>
              </div>
            )}

            {/* Story text container */}
            <div className="bg-gradient-to-b from-amber-50/30 to-white p-5 rounded-2xl border border-slate-200 min-h-[200px] flex flex-col justify-between mb-5">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed font-normal">
                {page.text}
              </p>

              {page.highlightText && (
                <div className="mt-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl">
                  <p className="text-xs md:text-sm font-semibold text-emerald-950 italic">
                    {page.highlightText}
                  </p>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={currentPageIndex === 0}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-xs disabled:opacity-30 disabled:cursor-not-allowed"
              >
                ← Anterior
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-xs md:text-sm font-display flex items-center justify-center gap-2"
              >
                <span>{currentPageIndex + 1 === totalPages ? 'Terminar Historia ✨' : 'Siguiente Página →'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Finished Story */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-bounce">🌟</div>
            <h4 className="text-2xl font-bold font-display text-slate-800 mb-2">
              ¡Completaste esta Linda Historia!
            </h4>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5 text-left">
              <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wide mb-1">
                Lección del cuento:
              </h5>
              <p className="text-xs md:text-sm text-amber-900 italic leading-relaxed">
                «{story.lesson}»
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
              <span className="text-4xl">🎁</span>
              <div>
                <h5 className="font-bold text-emerald-950 text-sm">¡Recompensa Desbloqueada!</h5>
                <p className="text-xs text-emerald-800">
                  Por tu lectura atenta, un nuevo sticker coleccionable ha sido agregado a tu álbum.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm font-display"
            >
              Regresar a las Historias
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
