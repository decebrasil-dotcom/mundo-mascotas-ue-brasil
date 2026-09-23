import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { playSound } from '../../utils/audio';

export const QrCodeModal: React.FC = () => {
  const { showQrModal, setShowQrModal, soundEnabled } = useApp();
  const [copied, setCopied] = useState(false);

  if (!showQrModal) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ueb-mascotas.edu.ec';

  // Generate an embeddable QR code image using safe QR SVG or standard QR api URL with offline fallback
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(
    currentUrl
  )}&bgcolor=FFFFFF&color=059669&margin=1`;

  const handleCopyLink = () => {
    playSound('success', soundEnabled);
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleClose = () => {
    playSound('pop', soundEnabled);
    setShowQrModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-slate-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border-4 border-emerald-400 text-center text-slate-800">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors font-bold text-sm cursor-pointer"
        >
          ✕
        </button>

        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl mx-auto mb-3">
          📱
        </div>

        <h3 className="text-xl font-bold font-display text-emerald-950 mb-1">
          Acceso mediante Código QR
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Escanea con la cámara de tu celular o tablet para abrir el <strong>Mundo de las Mascotas</strong>.
        </p>

        {/* QR container */}
        <div className="p-3 bg-white border-2 border-emerald-200 rounded-2xl inline-block shadow-inner mb-4">
          <img
            src={qrApiUrl}
            alt="Código QR del Mundo de las Mascotas"
            className="w-48 h-48 mx-auto rounded-lg object-contain"
            onError={(e) => {
              // Graceful fallback to SVG illustration if offline
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('qr-svg-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div id="qr-svg-fallback" className="hidden w-48 h-48 p-4 bg-emerald-50 rounded-lg text-emerald-800 text-xs flex flex-col items-center justify-center">
            <span className="text-3xl mb-2">🐾</span>
            <p className="font-bold">U.E. Brasil</p>
            <p className="text-[10px] break-all mt-1">{currentUrl}</p>
          </div>
        </div>

        {/* URL and Copy */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all active:scale-98 shadow cursor-pointer text-xs font-display flex items-center justify-center gap-2"
          >
            <span>{copied ? '✓ ¡Enlace Copiado!' : '📋 Copiar Enlace Directo'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
