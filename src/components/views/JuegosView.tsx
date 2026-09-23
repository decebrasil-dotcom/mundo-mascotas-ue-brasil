import React from 'react';
import { useApp } from '../../context/AppContext';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { playSound } from '../../utils/audio';
import { MascotId } from '../../types';

interface GameCard {
  id: string;
  mascotId: MascotId;
  mascotName: string;
  title: string;
  category: string;
  desc: string;
  objective: string;
  rewardStickerTitle: string;
  icon: string;
  badgeColor: string;
  borderColor: string;
}

const GAMES: GameCard[] = [
  {
    id: 'ani-limpieza',
    mascotId: 'ani',
    mascotName: 'Ani la Hormiga',
    title: 'Misión Limpieza',
    category: 'Clasificación de Residuos',
    desc: 'Pon a prueba tu rapidez y conocimiento depositando cada residuo en el tacho correcto: Orgánico, Plásticos y Metales o Papel.',
    objective: 'Logra al menos 5 aciertos para desbloquear el sticker de Ani.',
    rewardStickerTitle: 'Hormiga Limpiecita',
    icon: '🐜',
    badgeColor: 'bg-teal-100 text-teal-900',
    borderColor: 'border-teal-200 hover:border-teal-400',
  },
  {
    id: 'tuki-calma',
    mascotId: 'tuki',
    mascotName: 'Tuki la Tortuga',
    title: 'Momento de Calma',
    category: 'Respiración & Autorregulación',
    desc: 'Un ejercicio interactivo y guiado con música relajante para calmar la mente y aprender a pausar antes de reaccionar.',
    objective: 'Completa 3 ciclos de respiración consciente.',
    rewardStickerTitle: 'Caparazón Zen',
    icon: '🐢',
    badgeColor: 'bg-green-100 text-green-900',
    borderColor: 'border-green-200 hover:border-green-400',
  },
  {
    id: 'kiro-seguridad',
    mascotId: 'kiro',
    mascotName: 'Kiro el Pingüino',
    title: 'Detectives de Seguridad',
    category: 'Prevención & Autocuidado',
    desc: 'Analiza situaciones escolares y de internet. Identifica cuáles representan conductas seguras y cuáles son riesgosas.',
    objective: 'Consigue 4 aciertos como detective escolar.',
    rewardStickerTitle: 'Detective Alerta',
    icon: '🐧',
    badgeColor: 'bg-sky-100 text-sky-900',
    borderColor: 'border-sky-200 hover:border-sky-400',
  },
  {
    id: 'bibi-convivencia',
    mascotId: 'bibi',
    mascotName: 'Bibi la Abeja',
    title: 'Buena Convivencia',
    category: 'Empatía & Solidaridad',
    desc: 'Escoge la mejor respuesta ante situaciones cotidianas en el patio, el aula o trabajos en grupo.',
    objective: 'Alcanza 4 respuestas empáticas ejemplares.',
    rewardStickerTitle: 'Colmena Respetuosa',
    icon: '🐝',
    badgeColor: 'bg-yellow-100 text-yellow-900',
    borderColor: 'border-yellow-200 hover:border-yellow-400',
  },
  {
    id: 'oli-sabiduria',
    mascotId: 'oli',
    mascotName: 'Oli el Búho',
    title: 'Reto del Saber',
    category: 'Trivia & Curiosidades',
    desc: 'Preguntas divertidas de ciencias, naturaleza, hábitos saludables y datos escolares.',
    objective: 'Responde correctamente al menos 4 preguntas.',
    rewardStickerTitle: 'Búho del Saber',
    icon: '🦉',
    badgeColor: 'bg-amber-100 text-amber-900',
    borderColor: 'border-amber-200 hover:border-amber-400',
  },
  {
    id: 'croki-planeta',
    mascotId: 'croki',
    mascotName: 'Croki el Sapo',
    title: 'Guardianes de la Naturaleza',
    category: 'Cuidado Ambiental & Agua',
    desc: 'Decisiones ecológicas para no desperdiciar agua, cuidar las plantas y proteger el entorno de nuestra escuela.',
    objective: 'Toma 4 decisiones verdes acertadas.',
    rewardStickerTitle: 'Gota de Vida',
    icon: '🐸',
    badgeColor: 'bg-lime-100 text-lime-900',
    borderColor: 'border-lime-200 hover:border-lime-400',
  },
];

export const JuegosView: React.FC = () => {
  const { setActiveGameId, unlockedStickers, soundEnabled } = useApp();

  const handleLaunch = (gameId: string) => {
    playSound('pop', soundEnabled);
    setActiveGameId(gameId);
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white text-amber-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>🎮</span>
          <span>6 Juegos 100% Reales y Funcionales</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Zona de Juegos Interactivos
        </h2>
        <p className="text-xs md:text-sm text-amber-50 max-w-xl">
          Aprende mientras te diviertes. Cada juego completado te otorga retroalimentación y stickers especiales para llenar tu álbum escolar.
        </p>
      </div>

      {/* Games List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GAMES.map((game) => {
          const isStickerUnlocked = unlockedStickers.includes(game.id);

          return (
            <div
              key={game.id}
              className={`bg-white rounded-3xl p-5 border-2 ${game.borderColor} shadow-xs hover:shadow-md transition-all flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <MascotaAvatar id={game.mascotId} size="md" />
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${game.badgeColor}`}>
                        {game.category}
                      </span>
                      <h3 className="text-base font-bold font-display text-slate-900 mt-1">
                        {game.title}
                      </h3>
                      <p className="text-xs text-slate-500">{game.mascotName}</p>
                    </div>
                  </div>

                  {isStickerUnlocked && (
                    <span
                      title="Sticker ya desbloqueado"
                      className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold shrink-0"
                    >
                      ✓ Desbloqueado
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {game.desc}
                </p>

                <div className="bg-slate-50 rounded-2xl p-2.5 mb-4 text-[11px] text-slate-600 flex items-center gap-2">
                  <span>🎯</span>
                  <span><strong>Meta:</strong> {game.objective}</span>
                </div>
              </div>

              <button
                onClick={() => handleLaunch(game.id)}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-98 shadow cursor-pointer text-xs md:text-sm font-display flex items-center justify-center gap-2"
              >
                <span>🎮</span> Jugar Ahora
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
