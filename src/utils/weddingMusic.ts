// Romantic wedding music box synthesizer using Web Audio API
class WeddingSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private step = 0;

  // Romantic Canon in D theme notes (frequencies in Hz and duration in seconds)
  private melody = [
    { f: 587.33, d: 0.8 }, // D5
    { f: 554.37, d: 0.4 }, // C#5
    { f: 493.88, d: 0.4 }, // B4
    { f: 440.00, d: 0.8 }, // A4
    { f: 392.00, d: 0.4 }, // G4
    { f: 369.99, d: 0.4 }, // F#4
    { f: 329.63, d: 0.8 }, // E4
    { f: 369.99, d: 0.4 }, // F#4
    { f: 392.00, d: 0.4 }, // G4
    { f: 440.00, d: 0.8 }, // A4
    { f: 493.88, d: 0.4 }, // B4
    { f: 554.37, d: 0.4 }, // C#5
    { f: 587.33, d: 0.8 }, // D5
    { f: 440.00, d: 0.8 }, // A4
    { f: 493.88, d: 0.8 }, // B4
    { f: 440.00, d: 0.8 }, // A4
    { f: 392.00, d: 0.8 }, // G4
    { f: 369.99, d: 0.8 }, // F#4
    { f: 329.63, d: 0.8 }, // E4
    { f: 440.00, d: 0.8 }, // A4
  ];

  public get active(): boolean {
    return this.isPlaying;
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return await this.start();
    }
  }

  public async start(): Promise<boolean> {
    if (this.isPlaying) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }
      if (this.ctx.state === "running") {
        this.isPlaying = true;
        this.step = 0;
        this.playNextNote();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    // Filter for music box warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1600, now);

    // Pure sine voice
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Subtle chime harmonic
    const osc2 = this.ctx.createOscillator();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.6);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0, now);
    gain2.gain.linearRampToValueAtTime(0.02, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.8);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(filter);
    gain2.connect(filter);
    filter.connect(this.ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.7);
    osc2.stop(now + duration + 0.7);
  }

  private playNextNote = () => {
    if (!this.isPlaying || !this.ctx) return;
    const note = this.melody[this.step % this.melody.length];
    this.playTone(note.f, note.d);

    // Warm bass accompaniment note every 4 beats
    if (this.step % 4 === 0) {
      const bassNotes = [146.83, 110.00, 123.47, 92.50, 98.00, 146.83, 98.00, 110.00];
      const bass = bassNotes[Math.floor(this.step / 4) % bassNotes.length];
      this.playTone(bass, 1.8);
    }

    this.step++;
    this.timer = window.setTimeout(this.playNextNote, note.d * 1000);
  };
}

export const weddingMusic = typeof window !== "undefined" ? new WeddingSynthesizer() : null;
