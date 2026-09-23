import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';

interface ConvivenciaCase {
  id: number;
  situation: string;
  emoji: string;
  options: {
    text: string;
    isBest: boolean;
    feedback: string;
  }[];
}

const CASES: ConvivenciaCase[] = [
  {
    id: 1,
    situation: 'A un compañero se le caen todos los cuadernos y lápices en el pasillo y se siente avergonzado.',
    emoji: '📚',
    options: [
      {
        text: 'Agacharte con una sonrisa, ayudarlo a recoger y decirle: "¡No te preocupes, a cualquiera le pasa!".',
        isBest: true,
        feedback: '¡Excelente empatía! Ayudarlo alivia su vergüenza y fortalece la amistad.',
      },
      {
        text: 'Pasar de largo rápido para no llegar tarde a tu asiento.',
        isBest: false,
        feedback: 'Podrías tomarte 10 segundos para tender una mano. El compañerismo es primero.',
      },
      {
        text: 'Reírte con los demás de cómo cayeron las cosas.',
        isBest: false,
        feedback: 'Burlarse hace sentir mal al compañero. Trata a otros como te gustaría ser tratado.',
      },
    ],
  },
  {
    id: 2,
    situation: 'Durante el recreo, notas a una niña nueva sentada sola debajo del árbol mirando el piso.',
    emoji: '🌳',
    options: [
      {
        text: 'Acercarte, saludarla amablemente y preguntarle si desea unirse a tu juego.',
        isBest: true,
        feedback: '¡Hermoso gesto! La inclusión hace que nadie se sienta invisible en el colegio.',
      },
      {
        text: 'Quedarte mirando desde lejos sin decirle nada.',
        isBest: false,
        feedback: 'Un simple "Hola, ¿quieres jugar?" puede alegrarle todo el día a alguien nuevo.',
      },
      {
        text: 'Decirle a tus amigos que no la miren.',
        isBest: false,
        feedback: 'Excluir daña el corazón. En la colmena de Bibi todos tienen un lugar.',
      },
    ],
  },
  {
    id: 3,
    situation: 'En un trabajo en grupo, tú y un compañero tienen dos ideas diferentes para el dibujo.',
    emoji: '🎨',
    options: [
      {
        text: 'Escuchar la idea del otro con calma y buscar cómo combinar lo mejor de ambas propuestas.',
        isBest: true,
        feedback: '¡Trabajo en equipo brillante! Dos cabezas piensan mejor que una cuando hay respeto.',
      },
      {
        text: 'Imponer tu idea a la fuerza y enojarte si no hacen lo que dices.',
        isBest: false,
        feedback: 'Imponer crea tensiones. Dialogar y ceder un poco es la clave del respeto.',
      },
      {
        text: 'Cruzar los brazos y no trabajar nada.',
        isBest: false,
        feedback: 'Rendirse no ayuda al equipo. La comunicación asertiva siempre abre caminos.',
      },
    ],
  },
  {
    id: 4,
    situation: 'En el partido de fútbol de educación física, tu compañero comete un error y les meten un gol.',
    emoji: '⚽',
    options: [
      {
        text: 'Chocarle los cinco y decirle: "¡Buen intento, seguimos adelante juntos!".',
        isBest: true,
        feedback: '¡Verdadero espíritu deportivo! Animar en los errores une al equipo.',
      },
      {
        text: 'Gritarle enojado y culparlo de que van a perder.',
        isBest: false,
        feedback: 'Culpabilizar desmotiva. Todos cometemos errores cuando estamos aprendiendo.',
      },
      {
        text: 'Pedirle al profesor que lo saque del partido de inmediato.',
        isBest: false,
        feedback: 'El deporte escolar es para divertirse y aprender a convivir, no para humillar.',
      },
    ],
  },
  {
    id: 5,
    situation: 'Alguien cuenta un apodo burlón sobre otro estudiante y varios se empiezan a reír.',
    emoji: '🗣️',
    options: [
      {
        text: 'No reírte y decir con respeto: "No está bien burlarse, mejor hablemos de otra cosa".',
        isBest: true,
        feedback: '¡Gran valentía moral! Poner un límite pacífico frena el acoso escolar.',
      },
      {
        text: 'Reírte también solo para que el grupo no se burle de ti.',
        isBest: false,
        feedback: 'Reírse de apodos ofensivos alimenta el bullying aunque no lo hayas inventado tú.',
      },
      {
        text: 'Inventar un apodo aún peor para sumarte.',
        isBest: false,
        feedback: 'Lastimar a otros nunca te hará más popular. Las palabras amables tienen más poder.',
      },
    ],
  },
];

export const BibiConvivenciaGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { soundEnabled, unlockSticker } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentCase = CASES[currentIndex];

  const handleSelect = (index: number) => {
    if (selectedOption !== null || isFinished) return;

    setSelectedOption(index);
    const chosen = currentCase.options[index];

    if (chosen.isBest) {
      playSound('success', soundEnabled);
      setScore((s) => s + 1);
    } else {
      playSound('wrong', soundEnabled);
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (currentIndex + 1 < CASES.length) {
        setCurrentIndex((i) => i + 1);
      } else {
        setIsFinished(true);
        if (score + (chosen.isBest ? 1 : 0) >= 4) {
          unlockSticker('bibi-convivencia');
        }
      }
    }, 1800);
  };

  const handleRestart = () => {
    playSound('pop', soundEnabled);
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border-4 border-yellow-300 my-auto text-slate-800">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <MascotaAvatar id="bibi" size="sm" />
            <div>
              <h3 className="font-display text-lg font-bold text-yellow-900 leading-tight">
                Bibi: Buena Convivencia
              </h3>
              <p className="text-xs text-slate-500">¿Cuál es la mejor respuesta solidaria?</p>
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
              <span>Situación {currentIndex + 1} de {CASES.length}</span>
              <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                Puntos de Dulzura: {score * 20}
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-5">
              <div
                className="bg-yellow-400 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIndex + 1) / CASES.length) * 100}%` }}
              />
            </div>

            {/* Case Card */}
            <div className="bg-yellow-50/70 border border-yellow-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
              <span className="text-4xl shrink-0">{currentCase.emoji}</span>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {currentCase.situation}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5 mb-2">
              {currentCase.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'bg-white border-slate-200 hover:bg-amber-50/50 hover:border-amber-300';
                if (selectedOption !== null) {
                  if (opt.isBest) {
                    btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-300 text-rose-950';
                  } else {
                    btnStyle = 'opacity-40 bg-slate-50 border-slate-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-xs md:text-sm leading-relaxed ${btnStyle}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-amber-600 text-sm mt-0.5">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      <div className="flex-1">
                        <span>{opt.text}</span>
                        {selectedOption !== null && (isSelected || opt.isBest) && (
                          <p className="mt-1.5 text-xs font-medium text-slate-700 italic border-t border-slate-200/50 pt-1">
                            💡 {opt.feedback}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Results */
          <div className="text-center py-4">
            <div className="text-6xl mb-3 animate-float">🐝</div>
            <h4 className="text-2xl font-bold font-display text-slate-800 mb-1">
              {score >= 4 ? '¡Maestro de la Convivencia Escolar!' : '¡Buen Trabajo Sembrando Amistad!'}
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Elegiste con éxito <strong className="text-yellow-700 text-lg">{score}</strong> de {CASES.length} conductas ejemplares.
            </p>

            {score >= 4 ? (
              <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-4 mb-5 text-left flex items-center gap-3">
                <span className="text-4xl">🍯</span>
                <div>
                  <h5 className="font-bold text-yellow-950 text-sm">¡Sticker Desbloqueado!</h5>
                  <p className="text-xs text-yellow-800">
                    Ganaste el sticker coleccionable <strong>"Colmena Respetuosa"</strong> de Bibi para tu álbum.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200 mb-5">
                Necesitas 4 aciertos para desbloquear el sticker de Bibi. ¡Vuelve a jugar para conseguirlo!
              </p>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleRestart}
                className="flex-1 py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold rounded-2xl transition-colors active:scale-98 shadow cursor-pointer text-sm font-display"
              >
                Jugar otra vez
              </button>
              <button
                onClick={onClose}
                className="py-3 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition-colors cursor-pointer text-sm"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
