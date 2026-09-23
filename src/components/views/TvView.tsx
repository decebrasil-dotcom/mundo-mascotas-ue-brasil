import React, { useState } from 'react';
import { VIDEOS } from '../../data/videos';
import { VideoEpisode } from '../../types';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { playSound } from '../../utils/audio';
import { useApp } from '../../context/AppContext';

export const TvView: React.FC = () => {
  const { soundEnabled } = useApp();
  const [activeEpisode, setActiveEpisode] = useState<VideoEpisode | null>(null);

  const handleSelectEpisode = (ep: VideoEpisode) => {
    playSound('pop', soundEnabled);
    setActiveEpisode(ep);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400 text-sky-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>📺</span>
          <span>Cápsulas & Episodios</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Mascotas TV
        </h2>
        <p className="text-xs md:text-sm text-sky-100 max-w-xl">
          Aprende con cápsulas animadas sobre convivencia, calma, deporte y seguridad escolar. Diseñado para incorporar fácilmente nuevos videos institucionales.
        </p>
      </div>

      {/* Video Player Modal / Active Video Showcase */}
      {activeEpisode && (
        <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-xl border-2 border-sky-400">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-xl animate-pulse">●</span>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider font-display">
                Reproductor de Mascotas TV
              </span>
            </div>
            <button
              onClick={() => setActiveEpisode(null)}
              className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Interactive Player Screen / Placeholder Frame */}
          <div className="relative aspect-video w-full rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center p-6 text-center overflow-hidden mb-4 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center text-3xl shadow-lg transition-transform group-hover:scale-110 cursor-pointer mb-3">
                ▶
              </div>
              <h3 className="text-base md:text-lg font-bold font-display text-white max-w-md">
                {activeEpisode.title}
              </h3>
              <span className="text-xs text-sky-300 mt-1">
                ⏱️ {activeEpisode.duration} · {activeEpisode.category}
              </span>
              <p className="text-[11px] text-slate-400 mt-2 max-w-sm italic">
                (Espacio listo para enlazar videos de YouTube o archivos institucionales MP4)
              </p>
            </div>
          </div>

          {/* Episode Info */}
          <div className="bg-slate-800/80 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <MascotaAvatar id={activeEpisode.mascotId} size="sm" />
              <div>
                <h4 className="text-sm font-bold text-white font-display">
                  {activeEpisode.title}
                </h4>
                <p className="text-xs text-sky-300">{activeEpisode.category}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              {activeEpisode.summary}
            </p>
            <div className="text-xs text-amber-300 font-medium">
              💡 <strong>Aprendizaje clave:</strong> {activeEpisode.keyLearning}
            </div>
          </div>
        </div>
      )}

      {/* Episodes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VIDEOS.map((video) => (
          <div
            key={video.id}
            onClick={() => handleSelectEpisode(video)}
            className="group bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail representation */}
              <div className="relative aspect-video w-full rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-50 border border-sky-100 flex items-center justify-center mb-3 overflow-hidden group-hover:border-sky-300 transition-colors">
                <div className="text-4xl transition-transform group-hover:scale-110">
                  📺
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  {video.duration}
                </div>
                <div className="absolute bottom-2.5 left-2.5">
                  <MascotaAvatar id={video.mascotId} size="sm" />
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                {video.category}
              </span>

              <h3 className="font-display font-bold text-sm text-slate-900 leading-tight mt-2 mb-1.5 group-hover:text-sky-700 transition-colors">
                {video.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {video.summary}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-sky-700 group-hover:underline flex items-center gap-1">
                <span>Reproducir cápsula</span>
                <span>▶</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
