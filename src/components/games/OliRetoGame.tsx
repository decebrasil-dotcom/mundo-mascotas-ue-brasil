import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: '¿Cuántas patas tienen los insectos como nuestra amiga Bibi la abeja y Ani la hormiga?',
    options: ['4 patas', '6 patas', '8 patas'],
    correctIndex: 1,
    explanation: '¡Exacto! Todos los insectos tienen 6 patas articuladas y el cuerpo dividido en 3 partes.',
  },
  {
    id: 2,
    question: '¿Qué órgano principal bombea la sangre y late más rápido cuando Jagger hace deportes?',
    options: ['Los pulmones', 'El estómago', 'El corazón'],
    correctIndex: 2,
    explanation: '¡Brillante! El corazón es un músculo vital que oxigena todo nuestro cuerpo al movernos.',
  },
  {
    id: 3,
    question: '¿Qué debemos hacer siempre con agua y jabón antes de comer en el recreo?',
    options: ['Lavarnos bien las manos', 'Limpiarnos con la ropa', 'Tomar una foto'],
    correctIndex: 0,
    explanation: '¡Correcto! Lavarse las manos elimina gérmenes y bacterias protegiendo tu salud.',
  },
  {
    id: 4,
    question: '¿Cuál de nuestras mascotas representa la sabiduría, la curiosidad y la lectura?',
    options: ['Oli el búho', 'Jagger el jaguar', 'Croki el sapo'],
    correctIndex: 0,
    explanation: '¡Muy bien! Oli el búho nos inspira a leer todos los días y nunca dejar de hacer preguntas.',
  },
  {
    id: 5,
    question: '¿Qué tipo de energía vital para las plantas proviene del sol en nuestro planeta?',
    options: ['Energía solar y lumínica', 'Energía eólica', 'Energía plástica'],
    correctIndex: 0,
    explanation: '¡Excelente! La luz del sol permite la fotosíntesis y llena de vida los jardines escolares.',
  },
];

export const OliRetoGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = QUESTIONS[currentIndex];

  const handleAnswer = (index: number) => {
    if (selectedIndex !== null || isFinished) return;

    setSelectedIndex(index);
    const isCorrect = index === currentQ.correctIndex;

    if (isCorrect) {
      playSound('success', soundEnabled);
      setScore((s) => s + 1);
    } else {
      playSound('wrong', soundEnabled);
    }

    setTimeout(() => {
      setSelectedIndex(null);
      if (currentIndex + 1 < QUESTIONS.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        if (score + (isCorrect ? 1 : 0) >= 4) {
          unlockSticker('oli-sabiduria');
        }
      }
    }, 1700);
  };

  const handleRestart = () => {
    playSound('pop', soundEnabled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedIndex(null);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-amber-400 my-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <MascotaAvatar id="oli" size="sm" />
            <div>
              <h3 className="font-display text-lg font-bold text-amber-950 leading-tight">
                Oli: Reto del Saber
              </h3>
              <p className="text-xs text-slate-500">Trivia escolar interactiva</p>
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
              <span>Pregunta {currentIndex + 1} de {QUESTIONS.length}</span>
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Aciertos: {score}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 mb-5 text-center min-h-[120px] flex flex-col items-center justify-center">
              <span className="text-3xl mb-2">🦉</span>
              <h4 className="text-base font-bold text-slate-800 font-display">
                {currentQ.question}
              </h4>
            </div>

            {/* Options */}
            <div className="space-y-2.5 mb-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedIndex === idx;
                const isCorrect = idx === currentQ.correctIndex;
                let style = 'bg-white border-slate-200 hover:bg-amber-50 hover:border-amber-300';

                if (selectedIndex !== null) {
                  if (isCorrect) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    style = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    style = 'opacity-50 bg-slate-50 border-slate-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedIndex !== null}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-xs md:text-sm flex items-center justify-between ${style}`}
                  >
                    <span className="font-semibold">{opt}</span>
                    {selectedIndex !== null && isCorrect && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>
                );
              })}
            </div>

            {selectedIndex !== null && (
              <p className="mt-3 p-2.5 bg-amber-100 text-amber-950 rounded-xl text-xs font-medium text-center animate-pulse-gentle">
                💡 {currentQ.explanation}
              </p>
            )}
          </div>
        ) : (
          /* Results */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-float">🦉</div>
            <h4 className="text-2xl font-bold font-display text-slate-800 mb-1">
              {score >= 4 ? '¡Mente Brillante!' : '¡Buen Esfuerzo de Sabiduría!'}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Acertaste <strong className="text-amber-700 text-lg">{score}</strong> de {QUESTIONS.length} preguntas.
            </p>

            {score >= 4 ? (
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
                <span className="text-4xl">📜</span>
                <div>
                  <h5 className="font-bold text-amber-950 text-sm">¡Sticker Desbloqueado!</h5>
                  <p className="text-xs text-amber-800">
                    Ganaste el sticker coleccionable <strong>"Búho del Saber"</strong> de Oli para tu álbum escolar.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-5">
                Necesitas al menos 4 aciertos para conseguir el sticker. ¡Oli te anima a volver a intentarlo!
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm font-display"
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
