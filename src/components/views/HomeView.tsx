import React from 'react';
import { useApp } from '../../context/AppContext';
import { MASCOTS } from '../../data/characters';
import { STICKERS } from '../../data/stickers';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { playSound } from '../../utils/audio';

export const HomeView: React.FC = () => {
  const {
    setActiveTab,
    setSelectedMascot,
    unlockedStickers,
    completedChallenges,
    setShowQrModal,
    soundEnabled,
  } = useApp();

  const handleMascotClick = (id: string) => {
    playSound('pop', soundEnabled);
    const mascot = MASCOTS.find((m) => m.id === id);
    if (mascot) {
      setSelectedMascot(mascot);
    }
  };

  const sections = [
    {
      id: 'personajes' as const,
      title: '10 Mascotas Oficiales',
      subtitle: 'Conoce su historia, rol y consejos',
      icon: '🐾',
      badge: '10 amigos',
      color: 'bg-emerald-500',
      border: 'border-emerald-200',
      lightBg: 'bg-emerald-50/70',
    },
    {
      id: 'juegos' as const,
      title: 'Juegos Interactivos',
      subtitle: 'Limpieza, calma, seguridad y trivia',
      icon: '🎮',
      badge: '6 mini-juegos',
      color: 'bg-amber-500',
      border: 'border-amber-200',
      lightBg: 'bg-amber-50/70',
    },
    {
      id: 'album' as const,
      title: 'Álbum de Stickers',
      subtitle: 'Colecciona insignias escolares',
      icon: '⭐',
      badge: `${unlockedStickers.length}/${STICKERS.length} coleccionados`,
      color: 'bg-yellow-500',
      border: 'border-yellow-200',
      lightBg: 'bg-yellow-50/70',
    },
    {
      id: 'historias' as const,
      title: 'Historias & Cuentos',
      subtitle: 'Aventuras ilustradas paso a paso',
      icon: '📖',
      badge: '4 relatos',
      color: 'bg-teal-500',
      border: 'border-teal-200',
      lightBg: 'bg-teal-50/70',
    },
    {
      id: 'retos' as const,
      title: 'Retos Escolares',
      subtitle: 'Misiones positivas diarias en el aula',
      icon: '🎯',
      badge: `${completedChallenges.length}/10 cumplidos`,
      color: 'bg-orange-500',
      border: 'border-orange-200',
      lightBg: 'bg-orange-50/70',
    },
    {
      id: 'dece' as const,
      title: 'Aprende DECE',
      subtitle: 'Emociones, bullying, inclusión y ayuda',
      icon: '💚',
      badge: 'Guía y trivias',
      color: 'bg-emerald-600',
      border: 'border-emerald-200',
      lightBg: 'bg-emerald-50/70',
    },
    {
      id: 'tv' as const,
      title: 'Mascotas TV',
      subtitle: 'Episodios y cápsulas educativas',
      icon: '📺',
      badge: '5 videos',
      color: 'bg-sky-500',
      border: 'border-sky-200',
      lightBg: 'bg-sky-50/70',
    },
    {
      id: 'buzon' as const,
      title: 'Buzón de Mascotas',
      subtitle: 'Redacta dudas, mensajes o felicitaciones',
      icon: '📬',
      badge: 'Espacio seguro',
      color: 'bg-violet-500',
      border: 'border-violet-200',
      lightBg: 'bg-violet-50/70',
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Banner with Green & Yellow Identity */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 md:p-8 shadow-lg">
        {/* Playful background shapes */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 rounded-full bg-yellow-400/20 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 rounded-full bg-emerald-400/30 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          {/* School Badge Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-emerald-950 font-bold text-xs uppercase tracking-wider mb-3 shadow-xs">
            <span>🏫</span>
            <span>Unidad Educativa Brasil</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white mb-2 leading-tight">
            Mundo de las Mascotas
          </h2>

          <p className="text-emerald-100 text-xs md:text-base leading-relaxed font-medium mb-5">
            ¡Aprende, juega y vive aventuras con nuestras mascotas! Un espacio interactivo creado para acompañarte, divertirte y fortalecer nuestra convivencia escolar.
          </p>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('juegos')}
              className="py-3 px-5 bg-yellow-400 hover:bg-yellow-300 text-emerald-950 font-black rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-xs md:text-sm font-display flex items-center gap-2"
            >
              <span>🎮</span> ¡Jugar Ahora!
            </button>

            <button
              onClick={() => setActiveTab('personajes')}
              className="py-3 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white font-bold rounded-2xl transition-all cursor-pointer text-xs md:text-sm flex items-center gap-2 border border-white/30"
            >
              <span>🐾</span> Ver las 10 Mascotas
            </button>
          </div>
        </div>
      </section>

      {/* Mascot Carousel / Quick Tap Bar */}
      <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-display font-bold text-sm md:text-base text-slate-900">
              Nuestros 10 Amigos Oficiales
            </h3>
            <p className="text-xs text-slate-500">Toca cualquier mascota para ver su ficha y consejos</p>
          </div>
          <button
            onClick={() => setActiveTab('personajes')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            Ver todos →
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-1 px-1">
          {MASCOTS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleMascotClick(m.id)}
              className="flex flex-col items-center shrink-0 w-20 p-2.5 rounded-2xl bg-amber-50/40 hover:bg-amber-100/60 border border-amber-100/80 transition-transform active:scale-95 cursor-pointer group"
            >
              <div className="mb-1 transition-transform group-hover:scale-110">
                <MascotaAvatar id={m.id} size="md" />
              </div>
              <span className="text-xs font-bold text-slate-800 font-display truncate max-w-full">
                {m.name}
              </span>
              <span className="text-[10px] text-slate-500">{m.species}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 8 Access Cards Grid */}
      <section>
        <div className="mb-3">
          <h3 className="font-display font-bold text-base md:text-lg text-slate-900">
            Explora las Secciones
          </h3>
          <p className="text-xs text-slate-500">Todo disponible sin registros y guardado en tu dispositivo</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(sec.id)}
              className={`flex flex-col justify-between p-4 rounded-3xl border ${sec.border} ${sec.lightBg} hover:shadow-md transition-all active:scale-[0.98] text-left cursor-pointer group min-h-[140px]`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-2xl ${sec.color} text-white flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform`}>
                    {sec.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {sec.badge}
                  </span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-900 leading-tight mb-1">
                  {sec.title}
                </h4>
                <p className="text-xs text-slate-600 leading-snug">
                  {sec.subtitle}
                </p>
              </div>

              <div className="mt-3 flex items-center text-[11px] font-bold text-emerald-800 group-hover:translate-x-0.5 transition-transform">
                <span>Entrar</span>
                <span className="ml-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* DECE Mascot Daily Tip & Support Notice */}
      <section className="bg-gradient-to-r from-emerald-50 via-amber-50 to-yellow-50 rounded-3xl p-5 border border-emerald-200 flex flex-col md:flex-row items-center gap-4">
        <div className="shrink-0 flex items-center gap-2">
          <MascotaAvatar id="miau" size="lg" />
          <MascotaAvatar id="guao" size="lg" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
            Consejo del DECE
          </span>
          <h4 className="font-display font-bold text-base text-slate-900 mt-1">
            ¿Sabías que en el DECE siempre hay un amigo para ti?
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Miau y Guao te recuerdan que tus emociones son importantes. Si hoy te sientes triste, nervioso o tienes dudas, puedes acercarte con toda confianza al Departamento de Consejería Estudiantil en la escuela.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('dece')}
          className="shrink-0 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs font-display transition-colors cursor-pointer"
        >
          Conocer el DECE
        </button>
      </section>

      {/* QR Code Banner for Mobile access */}
      <section className="bg-white rounded-3xl p-4 border border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-xl shrink-0">
            📱
          </div>
          <div>
            <h4 className="text-xs md:text-sm font-bold text-slate-900 font-display">
              ¿Accediendo desde una computadora o proyector?
            </h4>
            <p className="text-[11px] text-slate-500">
              Abre el código QR para que los estudiantes lo escaneen desde sus celulares.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            playSound('pop', soundEnabled);
            setShowQrModal(true);
          }}
          className="shrink-0 py-2 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors cursor-pointer font-display"
        >
          Ver QR 📱
        </button>
      </section>
    </div>
  );
};
