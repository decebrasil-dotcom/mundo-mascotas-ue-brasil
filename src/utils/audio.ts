// Lightweight Web Audio API synthesizer for sound effects
// Respects user preference (sound enabled/disabled)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = (type: 'pop' | 'success' | 'fanfare' | 'wrong' | 'breatheIn' | 'breatheOut', enabled: boolean = true) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'pop') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      // Cheerful 2-tone chime (G5 -> C6)
      const notes = [783.99, 1046.5];
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.1);
        gain.gain.setValueAtTime(0.25, now + index * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.1);
        osc.stop(now + index * 0.1 + 0.35);
      });
    } else if (type === 'fanfare') {
      // Victory 4-tone arpeggio (C5 -> E5 -> G5 -> C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const start = now + index * 0.12;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.28, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + (index === 3 ? 0.6 : 0.25));
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + (index === 3 ? 0.7 : 0.3));
      });
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.18);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'breatheIn') {
      // Soft gentle rising bell tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.linearRampToValueAtTime(440, now + 3.8);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 1.5);
      gain.gain.linearRampToValueAtTime(0.01, now + 3.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.9);
    } else if (type === 'breatheOut') {
      // Soft gentle descending relaxing tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(280, now + 3.8);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 3.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.9);
    }
  } catch {
    // Gracefully handle browser autoplay policies
  }
};
