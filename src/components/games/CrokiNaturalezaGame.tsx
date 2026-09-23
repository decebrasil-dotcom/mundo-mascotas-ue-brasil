import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

interface EcoDecision {
  id: number;
  situation: string;
  emoji: string;
  ecoChoice: string;
  wasteChoice: string;
  ecoExplanation: string;
}

const DECISIONS: EcoDecision[] = [
  {
    id: 1,
    situation: 'Te estás enjabonando las manos en el baño de la escuela tras el recreo:',
    emoji: '🚰',
    ecoChoice: 'Cerrar la llave del agua mientras te frotas con jabón 20 segundos.',
    wasteChoice: 'Dejar la llave abierta a chorro completo todo el tiempo.',
    ecoExplanation: '¡Ahorras hasta 10 litros de agua por lavado! Cada gota cuenta para nuestro planeta.',
  },
  {
    id: 2,
    situation: 'Todo el curso sale al patio y el aula queda completamente vacía:',
    emoji: '💡',
    ecoChoice: 'Apagar las luces y ventiladores antes de cerrar la puerta.',
    wasteChoice: 'Dejar todo encendido porque volverán en 40 minutos.',
    ecoExplanation: '¡Ahorro de energía brillante! Menos consumo eléctrico reduce la huella de carbono.',
  },
  {
    id: 3,
    situation: 'Hora de preparar tu agua o jugo para llevar a la escuela:',
    emoji: '🥤',
    ecoChoice: 'Usar un termo o tomatodo reutilizable que lavas a diario.',
    wasteChoice: 'Comprar una botella plástica desechable nueva cada día.',
    ecoExplanation: '¡Evitas miles de botellas de plástico que tardan 500 años en descomponerse!',
  },
  {
    id: 4,
    situation: 'Ves una plantita en la jardinera escolar con la tierra muy seca en la tarde:',
    emoji: '🌱',
    ecoChoice: 'Colocarle agua fresca de tu tomatodo con cariño.',
    wasteChoice: 'Arrancarle las hojas o pasar por encima jugando.',
    ecoExplanation: '¡Amor por la vida! Las plantas limpian el aire que respiramos en la escuela.',
  },
  {
    id: 5,
    situation: 'Tienes hojas de cuaderno que solo están escritas por una carilla:',
    emoji: '📝',
    ecoChoice: 'Usar el reverso en blanco para hacer borradores, dibujos o cálculos.',
    wasteChoice: 'Arrugarlas y botarlas al tacho inmediatamente.',
    ecoExplanation: '¡Reutilización al 100%! Aprovechar el papel salva árboles de nuestros bosques.',
  },
];

export const CrokiNaturalezaGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentD = DECISIONS[currentIndex];

  const handleDecision = (isEco: boolean) => {
    if (feedback !== null || isFinished) return;

    if (isEco) {
      playSound('success', soundEnabled);
      setScore((s) => s + 1);
      setFeedback({
        isCorrect: true,
        text: `¡Gran Guardián! ${currentD.ecoExplanation}`,
      });
    } else {
      playSound('wrong', soundEnabled);
      setFeedback({
        isCorrect: false,
        text: `¡Croki te recuerda! La mejor opción era la ecológica. ${currentD.ecoExplanation}`,
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < DECISIONS.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        if (score + (isEco ? 1 : 0) >= 4) {
          unlockSticker('croki-planeta');
        }
      }
    }, 1700);
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
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-lime-400 my-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <MascotaAvatar id="croki" size="sm" />
            <div>
              <h3 className="font-display text-lg font-bold text-lime-950 leading-tight">
                Croki: Guardianes de la Naturaleza
              </h3>
              <p className="text-xs text-slate-500">Decisiones ecológicas para cuidar la escuela</p>
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
              <span>Misión {currentIndex + 1} de {DECISIONS.length}</span>
              <span className="text-lime-800 bg-lime-50 px-2 py-0.5 rounded-full border border-lime-200">
                Puntos Verdes: {score * 20}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-lime-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / DECISIONS.length) * 100}%` }}
              />
            </div>

            {/* Dilemma card */}
            <div className="bg-lime-50/70 border border-lime-200 rounded-2xl p-4 mb-4 text-center min-h-[120px] flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">{currentD.emoji}</span>
              <p className="text-sm font-semibold text-slate-800">
                {currentD.situation}
              </p>
            </div>

            {/* Feedback alert */}
            {feedback && (
              <div
                className={`p-3 rounded-xl mb-4 text-xs font-medium text-center animate-pulse-gentle transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : 'bg-amber-100 text-amber-950 border border-amber-300'
                }`}
              >
                {feedback.text}
              </div>
            )}

            {/* Choices */}
            <div className="space-y-3">
              <button
                onClick={() => handleDecision(true)}
                disabled={feedback !== null}
                className="w-full text-left p-3.5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-950 transition-all cursor-pointer disabled:opacity-50 flex items-start gap-2.5 text-xs md:text-sm"
              >
                <span className="text-xl">🌿</span>
                <span className="font-semibold">{currentD.ecoChoice}</span>
              </button>

              <button
                onClick={() => handleDecision(false)}
                disabled={feedback !== null}
                className="w-full text-left p-3.5 rounded-2xl border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all cursor-pointer disabled:opacity-50 flex items-start gap-2.5 text-xs md:text-sm"
              >
                <span className="text-xl">💨</span>
                <span>{currentD.wasteChoice}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-float">🐸</div>
            <h4 className="text-2xl font-bold font-display text-slate-800 mb-1">
              {score >= 4 ? '¡Auténtico Guardián del Planeta!' : '¡Buen Compromiso Verde!'}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Tomaste <strong className="text-lime-700 text-lg">{score}</strong> de {DECISIONS.length} decisiones ecológicas acertadas.
            </p>

            {score >= 4 ? (
              <div className="bg-lime-50 border border-lime-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
                <span className="text-4xl">💧</span>
                <div>
                  <h5 className="font-bold text-lime-950 text-sm">¡Sticker Desbloqueado!</h5>
                  <p className="text-xs text-lime-800">
                    Ganaste el sticker coleccionable <strong>"Gota de Vida"</strong> de Croki para tu álbum escolar.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-5">
                Alcanza 4 aciertos para conseguir el sticker de Croki. ¡Vuelve a intentarlo!
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm font-display"
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
