import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

interface WasteItem {
  name: string;
  emoji: string;
  category: 'organico' | 'plastico' | 'papel';
  hint: string;
}

const ITEMS: WasteItem[] = [
  { name: 'Cáscara de Plátano', emoji: '🍌', category: 'organico', hint: 'Se biodegrada rápidamente en la tierra.' },
  { name: 'Botella de Agua Plástica', emoji: '🧴', category: 'plastico', hint: 'Plástico PET que debe reciclarse aplastado.' },
  { name: 'Cuaderno Viejo o Papel', emoji: '📄', category: 'papel', hint: 'Fibras de papel limpias para reciclar.' },
  { name: 'Lata de Jugo de Aluminio', emoji: '🥫', category: 'plastico', hint: 'Metal reciclable junto a envases.' },
  { name: 'Restos de Manzana', emoji: '🍎', category: 'organico', hint: 'Materia orgánica perfecta para compost.' },
  { name: 'Caja de Cartón de Galletas', emoji: '📦', category: 'papel', hint: 'Cartón seco listo para reutilizarse.' },
  { name: 'Tarrina Plástica Limpia', emoji: '🥡', category: 'plastico', hint: 'Polímero plástico reciclable.' },
  { name: 'Cáscaras de Naranja', emoji: '🍊', category: 'organico', hint: 'Residuo orgánico de fruta.' },
];

export const AniLimpiezaGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentItem = ITEMS[currentIndex];

  const handleClassify = (chosenCategory: 'organico' | 'plastico' | 'papel') => {
    if (feedback !== null || isFinished) return;

    const isCorrect = chosenCategory === currentItem.category;
    if (isCorrect) {
      playSound('success', soundEnabled);
      setScore((prev) => prev + 1);
      setFeedback({
        isCorrect: true,
        text: `¡Correcto! ${currentItem.name} va en ese tacho. ${currentItem.hint}`,
      });
    } else {
      playSound('wrong', soundEnabled);
      setFeedback({
        isCorrect: false,
        text: `¡Casi! ${currentItem.name} debe ir en el tacho de ${
          currentItem.category === 'organico'
            ? 'Orgánicos'
            : currentItem.category === 'plastico'
            ? 'Plásticos y Metales'
            : 'Papel y Cartón'
        }.`,
      });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex + 1 < ITEMS.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 5) {
          unlockSticker('ani-limpieza');
        }
      }
    }, 1400);
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
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-teal-300 my-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <MascotaAvatar id="ani" size="sm" />
            <div>
              <h3 className="font-display text-lg font-bold text-teal-800 leading-tight">
                Ani: Misión Limpieza
              </h3>
              <p className="text-xs text-slate-500">Clasifica cada residuo en el tacho correcto</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors font-bold text-sm"
          >
            ✕
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress and score */}
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
              <span>Objeto {currentIndex + 1} de {ITEMS.length}</span>
              <span className="text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                Puntos: {score}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-teal-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / ITEMS.length) * 100}%` }}
              />
            </div>

            {/* Current item card */}
            <div className="bg-gradient-to-b from-teal-50 to-amber-50/50 rounded-2xl p-6 border-2 border-dashed border-teal-300 flex flex-col items-center justify-center mb-5 text-center min-h-[170px]">
              <div className="text-5xl mb-2 filter drop-shadow animate-float">
                {currentItem.emoji}
              </div>
              <h4 className="text-xl font-bold text-slate-800 font-display">
                {currentItem.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                ¿En qué tacho debe depositarse este objeto en el colegio?
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

            {/* Bins selection */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleClassify('organico')}
                disabled={feedback !== null}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-400 hover:bg-emerald-100 active:scale-95 transition-all text-emerald-950 text-center cursor-pointer disabled:opacity-50"
              >
                <span className="text-3xl mb-1">🌿</span>
                <span className="text-xs font-bold font-display">Orgánico</span>
                <span className="text-[10px] text-emerald-700">Frutas, hojas</span>
              </button>

              <button
                onClick={() => handleClassify('plastico')}
                disabled={feedback !== null}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50 border-2 border-sky-400 hover:bg-sky-100 active:scale-95 transition-all text-sky-950 text-center cursor-pointer disabled:opacity-50"
              >
                <span className="text-3xl mb-1">🥤</span>
                <span className="text-xs font-bold font-display">Plástico & Metal</span>
                <span className="text-[10px] text-sky-700">Botellas, latas</span>
              </button>

              <button
                onClick={() => handleClassify('papel')}
                disabled={feedback !== null}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50 border-2 border-amber-400 hover:bg-amber-100 active:scale-95 transition-all text-amber-950 text-center cursor-pointer disabled:opacity-50"
              >
                <span className="text-3xl mb-1">📦</span>
                <span className="text-xs font-bold font-display">Papel & Cartón</span>
                <span className="text-[10px] text-amber-700">Hojas, cajas</span>
              </button>
            </div>
          </div>
        ) : (
          /* Results screen */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-bounce">
              {score >= 6 ? '🏆' : '🌱'}
            </div>
            <h4 className="text-2xl font-bold font-display text-slate-800 mb-1">
              {score >= 6 ? '¡Misión Cumplida con Éxito!' : '¡Buen Intento Guardián!'}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Acertaste <strong className="text-teal-700 text-lg">{score}</strong> de {ITEMS.length} residuos.
            </p>

            {score >= 5 ? (
              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
                <span className="text-4xl">🐜</span>
                <div>
                  <h5 className="font-bold text-emerald-900 text-sm">¡Sticker Desbloqueado!</h5>
                  <p className="text-xs text-emerald-700">
                    Ganaste el sticker coleccionable <strong>"Hormiga Limpiecita"</strong> de Ani para tu álbum escolar.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-5">
                Necesitas 5 puntos para ganar el sticker. ¡Vuelve a intentarlo, tú puedes lograrlo!
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm"
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
