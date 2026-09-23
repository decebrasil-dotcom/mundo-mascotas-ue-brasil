import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { HomeView } from './components/views/HomeView';
import { PersonajesView } from './components/views/PersonajesView';
import { JuegosView } from './components/views/JuegosView';
import { AlbumView } from './components/views/AlbumView';
import { HistoriasView } from './components/views/HistoriasView';
import { RetosView } from './components/views/RetosView';
import { DeceView } from './components/views/DeceView';
import { TvView } from './components/views/TvView';
import { BuzonView } from './components/views/BuzonView';

// Modals and Games
import { MascotaDetailModal } from './components/mascotas/MascotaDetailModal';
import { StoryReaderModal } from './components/stories/StoryReaderModal';
import { StickerCelebrationModal } from './components/stickers/StickerCelebrationModal';
import { QrCodeModal } from './components/common/QrCodeModal';

import { AniLimpiezaGame } from './components/games/AniLimpiezaGame';
import { TukiCalmaGame } from './components/games/TukiCalmaGame';
import { KiroSeguridadGame } from './components/games/KiroSeguridadGame';
import { BibiConvivenciaGame } from './components/games/BibiConvivenciaGame';
import { OliRetoGame } from './components/games/OliRetoGame';
import { CrokiNaturalezaGame } from './components/games/CrokiNaturalezaGame';

const AppContent: React.FC = () => {
  const {
    activeTab,
    selectedMascot,
    setSelectedMascot,
    activeGameId,
    setActiveGameId,
    activeStory,
    setActiveStory,
  } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'inicio':
        return <HomeView />;
      case 'personajes':
        return <PersonajesView />;
      case 'juegos':
        return <JuegosView />;
      case 'album':
        return <AlbumView />;
      case 'historias':
        return <HistoriasView />;
      case 'retos':
        return <RetosView />;
      case 'dece':
        return <DeceView />;
      case 'tv':
        return <TvView />;
      case 'buzon':
        return <BuzonView />;
      default:
        return <HomeView />;
    }
  };

  const renderActiveGameModal = () => {
    if (!activeGameId) return null;

    const handleCloseGame = () => setActiveGameId(null);

    switch (activeGameId) {
      case 'ani-limpieza':
        return <AniLimpiezaGame onClose={handleCloseGame} />;
      case 'tuki-calma':
        return <TukiCalmaGame onClose={handleCloseGame} />;
      case 'kiro-seguridad':
        return <KiroSeguridadGame onClose={handleCloseGame} />;
      case 'bibi-convivencia':
        return <BibiConvivenciaGame onClose={handleCloseGame} />;
      case 'oli-sabiduria':
        return <OliRetoGame onClose={handleCloseGame} />;
      case 'croki-planeta':
        return <CrokiNaturalezaGame onClose={handleCloseGame} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 font-sans selection:bg-yellow-300 selection:text-emerald-950">
      {/* Top Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-4 md:py-6 pb-24 lg:pb-12">
        {renderActiveView()}
      </main>

      {/* Footer info */}
      <footer className="hidden lg:block border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-semibold text-emerald-900">
            🐾 Mundo de las Mascotas — Unidad Educativa Brasil
          </p>
          <p className="text-slate-400">
            Iniciativa educativa, pública y gratuita orientada a la convivencia, bienestar y prevención.
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Modals & Overlays */}
      {selectedMascot && (
        <MascotaDetailModal
          mascot={selectedMascot}
          onClose={() => setSelectedMascot(null)}
        />
      )}

      {renderActiveGameModal()}

      {activeStory && (
        <StoryReaderModal
          story={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}

      <StickerCelebrationModal />
      <QrCodeModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
