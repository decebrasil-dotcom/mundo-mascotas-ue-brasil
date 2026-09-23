import React, { useState } from 'react';
import { DECE_TOPICS } from '../../data/deceTopics';
import { DeceTopic } from '../../types';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';

export const DeceView: React.FC = () => {
  const { soundEnabled, unlockSticker } = useApp();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(DECE_TOPICS[0].id);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});

  const currentTopic = DECE_TOPICS.find((t) => t.id === selectedTopicId) || DECE_TOPICS[0];

  const handleSelectAnswer = (topicId: string, optionIndex: number, correctIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [topicId]: optionIndex }));
    if (optionIndex === correctIndex) {
      playSound('success', soundEnabled);
      unlockSticker('miau-dece');
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400 text-emerald-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>💚</span>
          <span>Consejería Estudiantil</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Aprende con el DECE
        </h2>
        <p className="text-xs md:text-sm text-emerald-100 max-w-xl">
          El Departamento de Consejería Estudiantil de la Unidad Educativa Brasil te brinda este espacio de orientación, bienestar emocional, prevención y seguridad.
        </p>
      </div>

      {/* Safety & Real Institutional Protocol Notice */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 text-xs text-amber-950">
        <div className="flex items-start gap-2.5">
          <span className="text-xl shrink-0">🤝</span>
          <div>
            <h4 className="font-display font-bold text-amber-950 text-xs md:text-sm mb-1">
              Atención Presencial y Acompañamiento en el Plantel
            </h4>
            <p className="text-amber-900 leading-relaxed">
              Si necesitas orientación personalizada o estás viviendo una situación difícil, acércate directamente a la <strong>oficina del DECE en la Unidad Educativa Brasil</strong> o comunícaselo a tu <strong>docente tutor o directivo de confianza</strong>. ¡Estamos para escucharte sin juzgarte!
            </p>
          </div>
        </div>
      </div>

      {/* Topics selector pills / tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {DECE_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => {
              playSound('pop', soundEnabled);
              setSelectedTopicId(topic.id);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedTopicId === topic.id
                ? 'bg-emerald-700 text-white shadow-xs scale-102'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{topic.id === 'que-es-el-dece' ? '🐱' : topic.id === 'cuando-acudir' ? '🐶' : '📌'}</span>
            <span>{topic.title}</span>
          </button>
        ))}
      </div>

      {/* Selected Topic Full Content Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        {/* Mascot host & Title */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900 leading-tight">
              {currentTopic.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {currentTopic.summary}
            </p>
          </div>
          <div className="shrink-0 ml-3">
            <MascotaAvatar id={currentTopic.mascotId} size="md" />
          </div>
        </div>

        {/* Content sections */}
        <div className="space-y-4 mb-6">
          {currentTopic.content.map((sec, idx) => (
            <div key={idx}>
              <h4 className="font-display font-bold text-sm text-emerald-900 mb-2">
                {sec.heading}
              </h4>
              <div className="space-y-2 mb-3">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-xs md:text-sm text-slate-700 leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Tips checkmark list */}
              {sec.tips && sec.tips.length > 0 && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 mt-3">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-950 mb-2">
                    Puntos Clave para Recordar:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-emerald-900">
                    {sec.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold shrink-0 mt-0.5">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mini interactive Quiz */}
        {currentTopic.quiz && (
          <div className="bg-gradient-to-b from-amber-50/80 to-yellow-50/50 rounded-2xl p-5 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-amber-950">
                Trivia de Aprendizaje
              </h4>
            </div>

            <p className="text-xs md:text-sm font-semibold text-slate-800 mb-3">
              {currentTopic.quiz.question}
            </p>

            <div className="space-y-2">
              {currentTopic.quiz.options.map((opt, optIdx) => {
                const isSelected = quizAnswers[currentTopic.id] === optIdx;
                const hasAnswered = quizAnswers[currentTopic.id] !== undefined;
                const isCorrect = optIdx === currentTopic.quiz!.correctAnswerIndex;

                let optStyle = 'bg-white border-slate-200 hover:bg-amber-100/50';
                if (hasAnswered) {
                  if (isCorrect) {
                    optStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    optStyle = 'bg-rose-100 border-rose-300 text-rose-950';
                  } else {
                    optStyle = 'opacity-50 bg-slate-50 border-slate-200';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() =>
                      handleSelectAnswer(currentTopic.id, optIdx, currentTopic.quiz!.correctAnswerIndex)
                    }
                    disabled={hasAnswered}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs cursor-pointer ${optStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {quizAnswers[currentTopic.id] !== undefined && (
              <div className="mt-3 p-2.5 bg-white rounded-xl border border-amber-200 text-xs text-amber-950 font-medium">
                {currentTopic.quiz.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
