import React from 'react';
import { useApp } from '../../context/AppContext';
import { STICKERS } from '../../data/stickers';
import { playSound } from '../../utils/audio';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    unlockedStickers,
    soundEnabled,
    toggleSound,
    setShowQrModal,
  } = useApp();

  const totalStickers = STICKERS.length;
  const unlockedCount = unlockedStickers.length;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-5xl mx-auto px-4 h-15 flex items-center justify-between">
        {/* Brand Zone: Clean single-line wordmark */}
        <button
          onClick={() => setActiveTab('inicio')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-yellow-400 p-0.5 shadow-sm shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-lg">
              🐾
            </div>
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black font-display text-emerald-950 leading-tight group-hover:text-emerald-700 transition-colors whitespace-nowrap">
              Mundo de las Mascotas
            </h1>
            <span className="text-[10px] md:text-xs text-amber-700 font-semibold tracking-wide">
              Unidad Educativa Brasil
            </span>
          </div>
        </button>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('personajes')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'personajes' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Personajes
          </button>
          <button
            onClick={() => setActiveTab('juegos')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'juegos' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Juegos
          </button>
          <button
            onClick={() => setActiveTab('album')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'album' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Álbum
          </button>
          <button
            onClick={() => setActiveTab('historias')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'historias' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Historias
          </button>
          <button
            onClick={() => setActiveTab('retos')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'retos' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Retos
          </button>
          <button
            onClick={() => setActiveTab('dece')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'dece' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Aprende DECE
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'tv' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Mascotas TV
          </button>
          <button
            onClick={() => setActiveTab('buzon')}
            className={`transition-colors hover:text-emerald-800 ${
              activeTab === 'buzon' ? 'text-emerald-700 font-bold border-b-2 border-emerald-600' : ''
            }`}
          >
            Buzón
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sticker Counter */}
          <button
            onClick={() => setActiveTab('album')}
            title="Ver álbum de stickers"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 text-xs font-bold transition-all cursor-pointer"
          >
            <span>⭐</span>
            <span className="tabular-nums font-mono text-[11px]">
              {unlockedCount}/{totalStickers}
            </span>
          </button>

          {/* QR Share Trigger */}
          <button
            onClick={() => {
              playSound('pop', soundEnabled);
              setShowQrModal(true);
            }}
            title="Mostrar código QR para celular"
            aria-label="Código QR"
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer text-sm"
          >
            📱
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Sonidos activados (click para silenciar)' : 'Sonidos desactivados'}
            aria-label="Activar o desactivar sonido"
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-colors cursor-pointer text-sm ${
              soundEnabled
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>
    </header>
  );
};
