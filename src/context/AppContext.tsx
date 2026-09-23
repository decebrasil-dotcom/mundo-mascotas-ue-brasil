import React, { createContext, useContext, useState, useEffect } from 'react';
import { MascotCharacter, Story, MailboxDraft } from '../types';
import { STICKERS } from '../data/stickers';
import { triggerConfetti } from '../utils/confetti';
import { playSound } from '../utils/audio';

export type NavigationSection =
  | 'inicio'
  | 'personajes'
  | 'juegos'
  | 'album'
  | 'historias'
  | 'retos'
  | 'dece'
  | 'tv'
  | 'buzon';

interface AppContextType {
  activeTab: NavigationSection;
  setActiveTab: (tab: NavigationSection) => void;
  unlockedStickers: string[];
  unlockSticker: (stickerId: string) => boolean;
  newStickerCelebration: string | null;
  closeStickerCelebration: () => void;
  completedChallenges: string[];
  toggleChallenge: (challengeId: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  selectedMascot: MascotCharacter | null;
  setSelectedMascot: (mascot: MascotCharacter | null) => void;
  activeGameId: string | null;
  setActiveGameId: (gameId: string | null) => void;
  activeStory: Story | null;
  setActiveStory: (story: Story | null) => void;
  mailboxDrafts: MailboxDraft[];
  saveMailboxDraft: (draft: Omit<MailboxDraft, 'id' | 'date'>) => void;
  deleteMailboxDraft: (id: string) => void;
  showQrModal: boolean;
  setShowQrModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STICKERS_STORAGE_KEY = 'ueb_stickers_v1';
const CHALLENGES_STORAGE_KEY = 'ueb_challenges_v1';
const SOUND_STORAGE_KEY = 'ueb_sound_v1';
const MAILBOX_STORAGE_KEY = 'ueb_mailbox_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<NavigationSection>('inicio');
  const [unlockedStickers, setUnlockedStickers] = useState<string[]>([]);
  const [newStickerCelebration, setNewStickerCelebration] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [selectedMascot, setSelectedMascot] = useState<MascotCharacter | null>(null);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [mailboxDrafts, setMailboxDrafts] = useState<MailboxDraft[]>([]);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedStickers = localStorage.getItem(STICKERS_STORAGE_KEY);
      if (savedStickers) {
        setUnlockedStickers(JSON.parse(savedStickers));
      } else {
        // Welcome starter sticker for first time students
        const initial = ['miau-dece'];
        setUnlockedStickers(initial);
        localStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(initial));
      }

      const savedChallenges = localStorage.getItem(CHALLENGES_STORAGE_KEY);
      if (savedChallenges) {
        setCompletedChallenges(JSON.parse(savedChallenges));
      }

      const savedSound = localStorage.getItem(SOUND_STORAGE_KEY);
      if (savedSound !== null) {
        setSoundEnabled(JSON.parse(savedSound));
      }

      const savedMailbox = localStorage.getItem(MAILBOX_STORAGE_KEY);
      if (savedMailbox) {
        setMailboxDrafts(JSON.parse(savedMailbox));
      }
    } catch {
      // Gracefully handle storage errors
    }
  }, []);

  const setActiveTab = (tab: NavigationSection) => {
    playSound('pop', soundEnabled);
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const unlockSticker = (stickerId: string): boolean => {
    const stickerExists = STICKERS.some((s) => s.id === stickerId);
    if (!stickerExists) return false;

    if (unlockedStickers.includes(stickerId)) {
      return false; // Already unlocked
    }

    const updated = [...unlockedStickers, stickerId];
    setUnlockedStickers(updated);
    try {
      localStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignored
    }

    // Check special school pride sticker (5 or more stickers)
    if (updated.length >= 5 && !updated.includes('brasil-estrella')) {
      updated.push('brasil-estrella');
      setUnlockedStickers([...updated]);
      try {
        localStorage.setItem(STICKERS_STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Ignored
      }
    }

    // Celebrate!
    setNewStickerCelebration(stickerId);
    triggerConfetti();
    playSound('fanfare', soundEnabled);

    return true;
  };

  const closeStickerCelebration = () => {
    playSound('pop', soundEnabled);
    setNewStickerCelebration(null);
  };

  const toggleChallenge = (challengeId: string) => {
    playSound('pop', soundEnabled);
    let updated: string[];
    if (completedChallenges.includes(challengeId)) {
      updated = completedChallenges.filter((id) => id !== challengeId);
    } else {
      updated = [...completedChallenges, challengeId];
      playSound('success', soundEnabled);

      // Check if unlocked 3 or more challenges for master-retos sticker
      if (updated.length >= 3 && !unlockedStickers.includes('master-retos')) {
        setTimeout(() => {
          unlockSticker('master-retos');
        }, 600);
      }
    }

    setCompletedChallenges(updated);
    try {
      localStorage.setItem(CHALLENGES_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    if (nextVal) {
      playSound('success', true);
    }
    try {
      localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(nextVal));
    } catch {
      // Ignored
    }
  };

  const saveMailboxDraft = (draft: Omit<MailboxDraft, 'id' | 'date'>) => {
    const newDraft: MailboxDraft = {
      ...draft,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('es-EC', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    const updated = [newDraft, ...mailboxDrafts];
    setMailboxDrafts(updated);
    try {
      localStorage.setItem(MAILBOX_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignored
    }
    playSound('success', soundEnabled);
    // Writing to mailbox also rewards the Guao bravery sticker
    unlockSticker('guao-ayuda');
  };

  const deleteMailboxDraft = (id: string) => {
    playSound('pop', soundEnabled);
    const updated = mailboxDrafts.filter((d) => d.id !== id);
    setMailboxDrafts(updated);
    try {
      localStorage.setItem(MAILBOX_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignored
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        unlockedStickers,
        unlockSticker,
        newStickerCelebration,
        closeStickerCelebration,
        completedChallenges,
        toggleChallenge,
        soundEnabled,
        toggleSound,
        selectedMascot,
        setSelectedMascot,
        activeGameId,
        setActiveGameId,
        activeStory,
        setActiveStory,
        mailboxDrafts,
        saveMailboxDraft,
        deleteMailboxDraft,
        showQrModal,
        setShowQrModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
