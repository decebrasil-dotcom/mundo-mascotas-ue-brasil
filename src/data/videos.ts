import { VideoEpisode } from '../types';

export const VIDEOS: VideoEpisode[] = [
  {
    id: 'ep-1-bienvenida',
    title: 'Episodio 1: ¡Bienvenidos al Mundo de las Mascotas!',
    duration: '3:45 min',
    mascotId: 'miau',
    category: 'Orientación & Bienvenida',
    summary: 'Conoce a las 10 mascotas oficiales de la Unidad Educativa Brasil y descubre cómo cada una te acompaña en tu vida escolar.',
    keyLearning: 'Cada mascota representa un valor fundamental para nuestra convivencia.',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder ready to be replaced with school video ID
  },
  {
    id: 'ep-2-respiracion-tuki',
    title: 'Episodio 2: Respira con Tuki — El Semáforo Emocional',
    duration: '4:10 min',
    mascotId: 'tuki',
    category: 'Inteligencia Emocional',
    summary: 'Aprende la técnica de relajación de la tortuga para calmar la mente y regular la respiración antes de exámenes o momentos de tensión.',
    keyLearning: 'La respiración profunda envía una señal de calma al sistema nervioso.',
  },
  {
    id: 'ep-3-reciclaje-ani',
    title: 'Episodio 3: Patrulla Limpieza — La Regla de las 3R con Ani',
    duration: '5:20 min',
    mascotId: 'ani',
    category: 'Medio Ambiente',
    summary: 'Una divertida guía animada para separar botellas plásticas, papel y restos orgánicos en los tachos del colegio.',
    keyLearning: 'Reducir, reutilizar y reciclar transforma nuestra escuela en un espacio limpio y agradable.',
  },
  {
    id: 'ep-4-ciberseguridad-kiro',
    title: 'Episodio 4: Escudo Digital — Detectives Seguros con Kiro',
    duration: '4:45 min',
    mascotId: 'kiro',
    category: 'Seguridad Digital',
    summary: 'Consejos prácticos para proteger tus datos en internet, evitar hablar con extraños en juegos en línea y prevenir el ciberacoso.',
    keyLearning: 'Tus contraseñas y fotos privadas son valiosas; compártelas solo con tu familia.',
  },
  {
    id: 'ep-5-juego-limpio-jagger',
    title: 'Episodio 5: Salta al Recreo — Deporte y Juego Limpio con Jagger',
    duration: '3:30 min',
    mascotId: 'jagger',
    category: 'Educación Física',
    summary: 'Juegos tradicionales de recreo, rutinas de calentamiento y la importancia de alentar y felicitar a los compañeros de equipo.',
    keyLearning: 'La diversión y el respeto mutuo son la verdadera victoria en cada partido.',
  },
];
