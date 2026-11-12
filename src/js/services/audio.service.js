/**
 * Web Audio Retro 8-bit Sound Synthesizer
 * Generates genuine chiptune sound effects dynamically without external audio files.
 */
class RetroAudioService {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.volume = 0.12;

    try {
      const saved = localStorage.getItem('retro_sfx_muted');
      if (saved !== null) {
        this.muted = saved === 'true';
      }
    } catch {
      // storage unavailable
    }
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  isMuted() {
    return this.muted;
  }

  toggleMute() {
    this.muted = !this.muted;
    try {
      localStorage.setItem('retro_sfx_muted', String(this.muted));
    } catch {
      // storage unavailable
    }
    if (!this.muted) {
      this.playCoin();
    }
    return this.muted;
  }

  /**
   * Soft 8-bit blip for UI navigation / hover
   */
  playBlip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);

      gain.gain.setValueAtTime(this.volume * 0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // Audio error silenced
    }
  }

  /**
   * Classic ascending arcade coin chime (E6 -> B6)
   */
  playCoin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1318.51, now); // E6
      osc.frequency.setValueAtTime(1975.53, now + 0.08); // B6

      gain.gain.setValueAtTime(this.volume, now);
      gain.gain.setValueAtTime(this.volume, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);
    } catch {
      // Audio error silenced
    }
  }

  /**
   * 3-note victory/powerup fanfare for transmissions
   */
  playPowerup() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + i * 0.07;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteStart);

        gain.gain.setValueAtTime(this.volume * 0.9, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteStart);
        osc.stop(noteStart + 0.12);
      });
    } catch {
      // Audio error silenced
    }
  }
}

export const audio = new RetroAudioService();
