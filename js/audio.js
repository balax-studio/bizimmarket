// Web Audio API Procedural Sound Synthesizer
// ponytail: procedural audio eliminates all external asset dependencies, prevents 404s, and works offline.

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.initialized = true;
      }
    } catch (e) {
      console.warn("AudioContext not supported", e);
    }
  }

  ensureContext() {
    if (!this.initialized) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Soft juicy bubble pop (harvesting crops)
  playPop() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startTime = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, startTime);
    osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 100, startTime + 0.08);

    gain.gain.setValueAtTime(0.3, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.08);
  }

  // Shelf stock thud
  playStock() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startTime = this.ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(280, startTime);
    osc.frequency.exponentialRampToValueAtTime(140, startTime + 0.06);

    gain.gain.setValueAtTime(0.25, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.06);
  }

  // Crisp money pickup chime
  playCoin() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const startTime = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, startTime); // B5
    osc.frequency.setValueAtTime(1318.51, startTime + 0.05); // E6

    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.2);
  }

  // Classic cash register bell (ka-ching!)
  playCashRegister() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Bell chime 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1760, now); // A6
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Bell chime 2
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2637, now + 0.08); // E7
    gain2.gain.setValueAtTime(0.25, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.5);
  }

  // Triumphant fanfare for unlocking and buying areas
  playUnlock() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const startTime = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = startTime + idx * 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.3, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.3);
    });
  }

  // Soft walking pop
  playFootstep() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const startTime = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(160 + Math.random() * 40, startTime);
    osc.frequency.exponentialRampToValueAtTime(80, startTime + 0.04);

    gain.gain.setValueAtTime(0.08, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.04);
  }

  // Karabash Dog Bark sound
  playBark() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    [0, 0.12].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, startTime + offset);
      osc.frequency.exponentialRampToValueAtTime(80, startTime + offset + 0.08);

      gain.gain.setValueAtTime(0.2, startTime + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + offset + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime + offset);
      osc.stop(startTime + offset + 0.08);
    });
  }

  // Security Gate Alarm Siren
  playAlarmSiren() {
    if (this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = startTime + i * 0.25;
      const freq = (i % 2 === 0) ? 960 : 680;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.22);
    }
  }

  // Esnaf Retro Radio (Chiptune, Lo-Fi, Anatolian Synth)
  setRadioChannel(channelIndex = 0) {
    this.radioChannel = channelIndex;
    if (this.radioTimer) {
      clearInterval(this.radioTimer);
      this.radioTimer = null;
    }
    if (channelIndex === 0 || this.muted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const scales = {
      1: [261.63, 329.63, 392.00, 523.25, 587.33, 659.25], // Retro Chiptune (C major pentatonic)
      2: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00], // Lo-Fi Esnaf (A minor pentatonic)
      3: [246.94, 277.18, 329.63, 369.99, 440.00, 493.88]  // Anadolu Synth (Hicaz/Modal)
    };
    const scale = scales[channelIndex] || scales[1];
    let noteIdx = 0;

    this.radioTimer = setInterval(() => {
      if (this.muted || !this.ctx || this.radioChannel === 0) return;
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const freq = scale[noteIdx % scale.length];
        noteIdx = (noteIdx + 1 + Math.floor(Math.random() * 2)) % scale.length;

        osc.type = this.radioChannel === 1 ? 'square' : (this.radioChannel === 2 ? 'triangle' : 'sine');
        const now = this.ctx.currentTime;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.28);
      } catch (err) {}
    }, 320);
  }
}

if (typeof window !== 'undefined') {
  window.Sound = new SoundEngine();
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SoundEngine;
}

