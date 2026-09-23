import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

type Phase = 'inhale' | 'hold' | 'exhale' | 'rest';

const AFFIRMATIONS = [
  '«Siento mis pies bien apoyados en la tierra.»',
  '«Inhalo aire puro, calma y tranquilidad.»',
  '«Dejo ir el enojo, la prisa y la preocupación.»',
  '«Mi cuerpo se siente relajado y protegido.»',
  '«Tengo la paciencia y sabiduría de la tortuga.»',
];

export const TukiCalmaGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  const TARGET_CYCLES = 3;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && !isFinished) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition to next phase
            if (phase === 'inhale') {
              setPhase('hold');
              return 4;
            } else if (phase === 'hold') {
              setPhase('exhale');
              playSound('breatheOut', soundEnabled);
              return 4;
            } else if (phase === 'exhale') {
              const newCycleCount = completedCycles + 1;
              setCompletedCycles(newCycleCount);
              setAffirmationIndex((idx) => (idx + 1) % AFFIRMATIONS.length);

              if (newCycleCount >= TARGET_CYCLES) {
                setIsFinished(true);
                setIsActive(false);
                unlockSticker('tuki-calma');
                playSound('success', soundEnabled);
                return 0;
              } else {
                setPhase('inhale');
                playSound('breatheIn', soundEnabled);
                return 4;
              }
            }
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, phase, completedCycles, isFinished, soundEnabled, unlockSticker]);

  const handleStart = () => {
    setIsActive(true);
    setPhase('inhale');
    setSecondsLeft(4);
    playSound('breatheIn', soundEnabled);
  };

  const handleRestart = () => {
    setIsFinished(false);
    setCompletedCycles(0);
    setPhase('inhale');
    setSecondsLeft(4);
    setIsActive(true);
    playSound('breatheIn', soundEnabled);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return { title: 'Inhala profundamente por la nariz', color: 'text-emerald-700', bg: 'bg-emerald-500' };
      case 'hold':
        return { title: 'Sostén el aire con serenidad', color: 'text-amber-700', bg: 'bg-amber-500' };
      case 'exhale':
        return { title: 'Exhala despacito por la boca', color: 'text-teal-700', bg: 'bg-teal-500' };
      default:
        return { title: 'Prepárate...', color: 'text-slate-700', bg: 'bg-slate-400' };
    }
  };

  const phaseInfo = getPhaseInstruction();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-green-300 my-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <MascotaAvatar id="tuki" size="sm" />
            <div>
              <h3 className="font-display text-lg font-bold text-green-900 leading-tight">
                Tuki: Momento de Calma
              </h3>
              <p className="text-xs text-slate-500">Autorregulación y respiración guiada</p>
            </div>
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
            {/* Progress indicators */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Ciclo de respiración {completedCycles + 1} de {TARGET_CYCLES}</span>
              <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                Puntos de Paz: {completedCycles * 35}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-6">
              <div
                className="bg-green-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${(completedCycles / TARGET_CYCLES) * 100}%` }}
              />
            </div>

            {/* Breathing Animation Canvas */}
            <div className="relative flex flex-col items-center justify-center py-6 bg-gradient-to-b from-green-50/80 to-emerald-50/40 rounded-3xl border border-green-100 mb-5 min-h-[260px] overflow-hidden">
              {/* Outer pulsing ring */}
              <div
                className={`w-44 h-44 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  isActive
                    ? phase === 'inhale'
                      ? 'scale-110 bg-emerald-200/50 shadow-lg shadow-emerald-200/50'
                      : phase === 'hold'
                      ? 'scale-105 bg-amber-200/50'
                      : 'scale-90 bg-teal-200/40'
                    : 'scale-100 bg-green-100'
                }`}
              >
                {/* Inner bubble */}
                <div
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-bold transition-all duration-1000 ${phaseInfo.bg} shadow-md`}
                >
                  <span className="text-4xl font-display">{isActive ? secondsLeft : '🐢'}</span>
                  <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90 mt-0.5">
                    {isActive ? phase.toUpperCase() : 'INICIAR'}
                  </span>
                </div>
              </div>

              {/* Sub instruction */}
              <h4 className={`mt-5 font-display text-base font-bold text-center px-4 transition-all ${phaseInfo.color}`}>
                {isActive ? phaseInfo.title : 'Tómate un respiro con Tuki'}
              </h4>

              <p className="text-xs text-slate-500 italic mt-1 text-center max-w-xs px-2">
                {AFFIRMATIONS[affirmationIndex]}
              </p>
            </div>

            {/* Controls */}
            {!isActive ? (
              <button
                onClick={handleStart}
                className="w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-md transition-all active:scale-98 cursor-pointer text-sm font-display flex items-center justify-center gap-2"
              >
                <span>🌿</span> Comenzar Ejercicio de Calma
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsActive(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-xs"
                >
                  Pausar
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Finished summary */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-float">🐢</div>
            <h4 className="text-2xl font-bold font-display text-green-900 mb-1">
              ¡Completaste tu Momento de Calma!
            </h4>
            <p className="text-sm text-slate-600 mb-4 max-w-sm mx-auto">
              Realizaste 3 ciclos de respiración consciente. Tu ritmo cardíaco se ha estabilizado y tu mente está clara y en paz.
            </p>

            <div className="bg-green-50 border border-green-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
              <span className="text-4xl">🧘</span>
              <div>
                <h5 className="font-bold text-green-950 text-sm">¡Sticker Desbloqueado!</h5>
                <p className="text-xs text-green-800">
                  Desbloqueaste el sticker <strong>"Caparazón Zen"</strong> de Tuki para tu álbum coleccionable.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm"
              >
                Respirar otra vez
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-sm"
              >
                Finalizar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
