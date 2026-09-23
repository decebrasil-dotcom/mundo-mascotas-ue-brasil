import React from 'react';
import { STORIES } from '../../data/stories';
import { useApp } from '../../context/AppContext';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { playSound } from '../../utils/audio';

export const HistoriasView: React.FC = () => {
  const { setActiveStory, unlockedStickers, soundEnabled } = useApp();

  const handleReadStory = (story: (typeof STORIES)[0]) => {
    playSound('pop', soundEnabled);
    setActiveStory(story);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400 text-teal-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>📖</span>
          <span>4 Cuentos Escolares Ilustrados</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Historias de las Mascotas
        </h2>
        <p className="text-xs md:text-sm text-teal-50 max-w-xl">
          Acompaña a nuestros amigos en relatos sobre la amistad, la inclusión, el valor de pedir ayuda y la protección de la naturaleza. ¡Avanza página a página y recibe un sticker al final!
        </p>
      </div>

      {/* Stories list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STORIES.map((story) => {
          const isRewarded = story.rewardStickerId ? unlockedStickers.includes(story.rewardStickerId) : false;

          return (
            <div
              key={story.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Mascots badges & read time */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {story.mascotIds.map((mid) => (
                      <MascotaAvatar key={mid} id={mid} size="sm" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    ⏱️ {story.durationMinutes} min lectura
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 leading-tight mb-1">
                  {story.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {story.summary}
                </p>

                {/* Lesson highlight */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 mb-4 text-[11px] text-emerald-950">
                  <strong className="block text-[10px] uppercase text-emerald-800 tracking-wider mb-0.5">
                    Valor o Aprendizaje:
                  </strong>
                  «{story.lesson}»
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                {isRewarded ? (
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <span>✓ Historia leída</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-amber-700 flex items-center gap-1">
                    <span>🎁 Desbloquea sticker</span>
                  </span>
                )}

                <button
                  onClick={() => handleReadStory(story)}
                  className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs font-display transition-colors active:scale-98 cursor-pointer flex items-center gap-1.5"
                >
                  <span>📖</span>
                  <span>Leer Cuento</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
