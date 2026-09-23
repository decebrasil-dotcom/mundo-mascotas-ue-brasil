export type MascotId =
  | 'miau'
  | 'guao'
  | 'bibi'
  | 'jagger'
  | 'ani'
  | 'tuki'
  | 'lumi'
  | 'croki'
  | 'kiro'
  | 'oli';

export interface MascotCharacter {
  id: MascotId;
  name: string;
  species: string;
  speciesEmoji: string;
  role: string;
  shortDesc: string;
  fullDesc: string;
  advice: string;
  quote: string;
  themeColor: {
    primary: string;
    secondary: string;
    bgLight: string;
    border: string;
    text: string;
  };
  traits: string[];
  customAvatarUrl?: string;
  gameId?: string;
}

export interface Sticker {
  id: string;
  mascotId: MascotId;
  title: string;
  subtitle: string;
  description: string;
  category: 'juegos' | 'historias' | 'retos' | 'dece' | 'especial';
  howToUnlock: string;
  icon: string;
  borderStyle: string;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  highlightText?: string;
  speaker?: string;
  mascotId?: MascotId;
  illustrationKey: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  durationMinutes: number;
  mascotIds: MascotId[];
  pages: StoryPage[];
  lesson: string;
  rewardStickerId: string;
}

export interface Challenge {
  id: string;
  mascotId: MascotId;
  title: string;
  description: string;
  category: string;
  rewardStickerId?: string;
}

export interface DeceTopic {
  id: string;
  title: string;
  summary: string;
  mascotId: MascotId;
  content: {
    heading: string;
    paragraphs: string[];
    tips?: string[];
  }[];
  quiz: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
}

export interface VideoEpisode {
  id: string;
  title: string;
  duration: string;
  mascotId: MascotId;
  summary: string;
  category: string;
  youtubeId?: string;
  videoUrl?: string;
  keyLearning: string;
}

export interface MailboxDraft {
  id: string;
  date: string;
  category: 'ayuda' | 'duda' | 'sugerencia' | 'preocupacion' | 'felicitacion';
  targetMascotId: MascotId;
  studentName?: string;
  studentGrade?: string;
  grade?: string;
  message: string;
}
