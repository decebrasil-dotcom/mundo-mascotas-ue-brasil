import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MASCOTS } from '../../data/characters';
import { MascotaAvatar } from '../mascotas/MascotaAvatar';
import { playSound } from '../../utils/audio';
import { MascotId } from '../../types';

export const BuzonView: React.FC = () => {
  const { mailboxDrafts, saveMailboxDraft, deleteMailboxDraft, soundEnabled } = useApp();

  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [targetMascotId, setTargetMascotId] = useState<MascotId>('miau');
  const [category, setCategory] = useState<'ayuda' | 'duda' | 'sugerencia' | 'felicitacion'>('ayuda');
  const [message, setMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    saveMailboxDraft({
      studentName: studentName.trim() || 'Estudiante anónimo',
      grade: grade.trim() || 'Sin especificar',
      targetMascotId,
      category,
      message: message.trim(),
    });

    setMessage('');
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const handleCopy = (text: string, id: string) => {
    playSound('pop', soundEnabled);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedMascot = MASCOTS.find((m) => m.id === targetMascotId) || MASCOTS[0];

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-700 text-white p-6 rounded-3xl shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-yellow-400 text-purple-950 font-bold text-xs uppercase tracking-wider mb-2">
          <span>📬</span>
          <span>Espacio de Escucha</span>
        </div>
        <h2 className="text-2xl font-black font-display tracking-tight text-white mb-1">
          Buzón de las Mascotas & DECE
        </h2>
        <p className="text-xs md:text-sm text-purple-100 max-w-xl">
          Escribe tus preguntas, desahogos, sugerencias o palabras de aliento a tu mascota favorita o al equipo del DECE.
        </p>
      </div>

      {/* CRITICAL Safety Disclaimer */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-4 text-xs text-amber-950">
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">⚠️</span>
          <div>
            <h4 className="font-display font-bold text-amber-950 text-xs md:text-sm mb-1">
              Aviso Importante de Seguridad Escolar
            </h4>
            <p className="text-amber-900 leading-relaxed">
              Este buzón digital <strong>no sustituye la atención inmediata ni presencial de una emergencia</strong>. Si tú o alguien que conoces está en peligro físico, sufriendo acoso severo o necesita auxilio urgente, <strong>acude de inmediato y en persona</strong> con tu profesor tutor, inspector, directivo o a la oficina física del DECE en la Unidad Educativa Brasil.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
          <h3 className="font-display font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
            <span>✍️</span> Redactar Mensaje
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Target Mascot Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                ¿A qué mascota o área deseas dirigir tu mensaje?
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {MASCOTS.map((m) => (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => {
                      playSound('pop', soundEnabled);
                      setTargetMascotId(m.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-semibold shrink-0 cursor-pointer transition-all ${
                      targetMascotId === m.id
                        ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold scale-102 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{m.speciesEmoji}</span>
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mascot advice preview */}
            <div className="bg-purple-50/50 border border-purple-100 rounded-2xl p-3 flex items-center gap-3">
              <MascotaAvatar id={selectedMascot.id} size="sm" />
              <div className="text-xs">
                <span className="font-bold text-purple-950 block">{selectedMascot.name} ({selectedMascot.role})</span>
                <span className="text-purple-800 italic">"{selectedMascot.advice}"</span>
              </div>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Motivo del mensaje:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'ayuda', label: 'Pedir Apoyo 🤝' },
                  { id: 'duda', label: 'Pregunta / Duda ❓' },
                  { id: 'sugerencia', label: 'Sugerencia 💡' },
                  { id: 'felicitacion', label: 'Felicitación 🎉' },
                ].map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setCategory(cat.id as any)}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                      category === cat.id
                        ? 'bg-emerald-600 border-emerald-600 text-white font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name and Grade (optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tu nombre (o anónimo):
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ej. Mateo o Anónimo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Grado / Curso:
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  placeholder="Ej. 6to EGB 'A'"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Escribe tu mensaje con tranquilidad:
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hola Miau, hoy me sentí un poco solo en el recreo y me gustaría saber cómo puedo acercarme a mis compañeros..."
                className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50/50 leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition-all active:scale-98 shadow cursor-pointer text-xs md:text-sm font-display flex items-center justify-center gap-2"
            >
              <span>📨</span> Guardar en mi Buzón Escolar
            </button>

            {isSaved && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-xl text-xs text-center font-medium animate-pulse-gentle">
                ✓ ¡Mensaje guardado en tu dispositivo! También ganaste el sticker de Guao ("Valiente sin Miedo").
              </div>
            )}
          </form>
        </div>

        {/* Drafts & Instructions Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200">
            <h3 className="font-display font-bold text-sm text-slate-900 mb-2">
              ¿Cómo funciona este buzón?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Tus mensajes quedan almacenados de forma privada y segura en tu propio navegador. Puedes usar el botón <strong>"Copiar Texto"</strong> para mostrárselo a tu docente tutor, enviarlo por correo escolar o entregarlo al DECE.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
              <span>🐶</span>
              <span>¡Escribir en el buzón te otorga el sticker de Guao!</span>
            </div>
          </div>

          {/* Stored Drafts */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-slate-500 mb-3">
              Tus Mensajes Guardados ({mailboxDrafts.length})
            </h4>

            {mailboxDrafts.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                <span className="text-3xl block mb-1">📭</span>
                Aún no has redactado mensajes en este dispositivo.
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {mailboxDrafts.map((draft) => {
                  const targetMascot = MASCOTS.find((m) => m.id === draft.targetMascotId) || MASCOTS[0];

                  const fullShareText = `[Buzón U.E. Brasil - ${draft.category.toUpperCase()}]\nPara: ${targetMascot.name} / DECE\nDe: ${draft.studentName} (${draft.grade})\nFecha: ${draft.date}\n\nMensaje:\n${draft.message}`;

                  return (
                    <div
                      key={draft.id}
                      className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-slate-800 flex items-center gap-1">
                            <span>{targetMascot.speciesEmoji}</span>
                            <span>Para {targetMascot.name}</span>
                          </span>
                          <span className="text-[10px] text-slate-400">{draft.date}</span>
                        </div>

                        <p className="text-slate-700 leading-relaxed italic bg-white p-2.5 rounded-xl border border-slate-100 mb-3">
                          "{draft.message}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-[11px]">
                        <button
                          onClick={() => handleCopy(fullShareText, draft.id)}
                          className="font-bold text-purple-700 hover:text-purple-900 cursor-pointer flex items-center gap-1"
                        >
                          <span>{copiedId === draft.id ? '✓ Copiado' : '📋 Copiar para entregar'}</span>
                        </button>
                        <button
                          onClick={() => deleteMailboxDraft(draft.id)}
                          className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
