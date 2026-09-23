import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

interface SecurityScenario {
  id: number;
  situation: string;
  emoji: string;
  isSafe: boolean;
  explanation: string;
}

const SCENARIOS: SecurityScenario[] = [
  {
    id: 1,
    situation: 'Bajar las escaleras del colegio de dos en dos corriendo para ganar puesto en la fila.',
    emoji: '🏃‍♂️',
    isSafe: false,
    explanation: '¡Riesgoso! Correr en escaleras puede causar caídas graves. Siempre debemos caminar y sujetarnos del pasamanos.',
  },
  {
    id: 2,
    situation: 'Mirar a ambos lados de la calle y cruzar siempre por el paso cebra o con el vigilante escolar.',
    emoji: '🚸',
    isSafe: true,
    explanation: '¡Seguro! Los conductores pueden verte mejor y respetan el paso peatonal señalizado.',
  },
  {
    id: 3,
    situation: 'Compartir tu contraseña de Roblox o correo electrónico con alguien que conociste en un chat.',
    emoji: '🔑',
    isSafe: false,
    explanation: '¡Riesgoso! Tus contraseñas son privadas y secretas. Solo tus padres o tutores deben conocerlas.',
  },
  {
    id: 4,
    situation: 'Si un desconocido te invita a subir a su auto o te pide guardar un secreto incómodo, decir NO y avisar a un docente.',
    emoji: '🛑',
    isSafe: true,
    explanation: '¡Seguro y muy valiente! Decir NO con firmeza y buscar a un adulto de confianza te protege.',
  },
  {
    id: 5,
    situation: 'Dejar la mochila en medio del pasillo del aula mientras juegas.',
    emoji: '🎒',
    isSafe: false,
    explanation: '¡Riesgoso! Un compañero o el profesor pueden tropezar y lastimarse. El pasillo debe estar despejado.',
  },
  {
    id: 6,
    situation: 'Utilizar casco y coderas al andar en bicicleta o patineta.',
    emoji: '🛹',
    isSafe: true,
    explanation: '¡Seguro! El casco protege tu cabeza ante cualquier caída inesperada.',
  },
];

export const KiroSeguridadGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentScenario = SCENARIOS[currentIndex];

  const handleChoice = (chosenSafe: boolean) => {
    if (feedback !== null || isFinished) return;

    const isCorrect = chosenSafe === currentScenario.isSafe;

    if (isCorrect) {
      playSound('success', soundEnabled);
      setScore((s) => s + 1);
      setFeedback({
        isCorrect: true,
        text: `¡Correcto, Detective! ${currentScenario.explanation}`,
      });
    } else {
      playSound('wrong', soundEnabled);
      setFeedback({
        isCorrect: false,
        text: `¡Atención! ${currentScenario.explanation}`,
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < SCENARIOS.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 4) {
          unlockSticker('kiro-seguridad');
        }
      }
    }, 1600);
  };

  const handleRestart = () => {
    playSound('pop', soundEnabled);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-sky-300 my-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <MascotaAvatar id="kiro" size="sm" />
            <div>
              <h3 className="font-display text-lg font-bold text-sky-900 leading-tight">
                Kiro: Detectives de Seguridad
              </h3>
              <p className="text-xs text-slate-500">¿Esta conducta es Segura o Riesgosa?</p>
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
            {/* Progress */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Caso {currentIndex + 1} de {SCENARIOS.length}</span>
              <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                Puntos: {score}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-sky-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / SCENARIOS.length) * 100}%` }}
              />
            </div>

            {/* Scenario Card */}
            <div className="bg-sky-50/70 border-2 border-dashed border-sky-200 rounded-2xl p-5 mb-5 flex flex-col items-center text-center min-h-[170px] justify-center">
              <span className="text-5xl mb-3 animate-float">{currentScenario.emoji}</span>
              <p className="text-base font-semibold text-slate-800 leading-relaxed max-w-sm">
                "{currentScenario.situation}"
              </p>
            </div>

            {/* Feedback alert */}
            {feedback && (
              <div
                className={`p-3 rounded-xl mb-4 text-xs font-medium text-center animate-pulse-gentle transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border border-amber-300'
                }`}
              >
                {feedback.text}
              </div>
            )}

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleChoice(true)}
                disabled={feedback !== null}
                className="py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 active:scale-95 border-2 border-emerald-400 text-emerald-950 font-bold rounded-2xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="text-xl">🛡️</span>
                <span className="font-display text-sm">Conducta Segura</span>
              </button>

              <button
                onClick={() => handleChoice(false)}
                disabled={feedback !== null}
                className="py-3.5 px-4 bg-rose-50 hover:bg-rose-100 active:scale-95 border-2 border-rose-400 text-rose-950 font-bold rounded-2xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <span className="text-xl">⚠️</span>
                <span className="font-display text-sm">Conducta Riesgosa</span>
              </button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-bounce">
              {score >= 5 ? '🏅' : '🔍'}
            </div>
            <h4 className="text-2xl font-bold font-display text-slate-800 mb-1">
              {score >= 4 ? '¡Gran Detective de Seguridad!' : '¡Sigue Entrenando tu Ojo Detective!'}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Acertaste <strong className="text-sky-700 text-lg">{score}</strong> de {SCENARIOS.length} situaciones.
            </p>

            {score >= 4 ? (
              <div className="bg-sky-50 border border-sky-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
                <span className="text-4xl">🐧</span>
                <div>
                  <h5 className="font-bold text-sky-950 text-sm">¡Sticker Desbloqueado!</h5>
                  <p className="text-xs text-sky-800">
                    Ganaste el sticker coleccionable <strong>"Detective Alerta"</strong> de Kiro para tu álbum escolar.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-5">
                Necesitas al menos 4 aciertos para ganar el sticker. ¡Vuelve a intentarlo!
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm font-display"
              >
                Jugar otra vez
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-sm"
              >
                Salir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
