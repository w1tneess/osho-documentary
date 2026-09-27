/**
 * Ambient Contemplative Soundscape Generator
 * 
 * Built with pure Web Audio API — zero network downloads, zero external audio assets.
 * Produces an organic, warm 432Hz meditative drone with harmonic undertones and
 * gentle analog-filtered warmth.
 * 
 * Apple HIG Compliant:
 * - User-initiated: silent by default, activated on explicit action.
 * - Non-intrusive: soft master volume (capped at 0.12), smoothly ramped fades.
 * - Clean cleanup: disconnects audio nodes when stopped to conserve battery/CPU.
 */

type SoundStateListener = (isActive: boolean) => void;

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  private isActive = false;
  private listeners: SoundStateListener[] = [];

  public get isPlaying(): boolean {
    return this.isActive;
  }

  public subscribe(listener: SoundStateListener): () => void {
    this.listeners.push(listener);
    listener(this.isActive);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isActive));
  }

  public toggle(): boolean {
    if (this.isActive) {
      this.stop();
    } else {
      this.start();
    }
    return this.isActive;
  }

  public async start(): Promise<void> {
    if (this.isActive) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const now = this.ctx.currentTime;

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, now);
      // Gentle fade-in over 1.8 seconds
      this.masterGain.gain.linearRampToValueAtTime(0.12, now + 1.8);
      this.masterGain.connect(this.ctx.destination);

      // Lowpass filter for warm, rounded, non-fatiguing tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, now);
      filter.Q.setValueAtTime(1.2, now);
      filter.connect(this.masterGain);

      // 1. Root fundamental: 432 Hz (sine)
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(216, now); // Warm mid-low
      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0.35, now);
      osc1.connect(gain1);
      gain1.connect(filter);
      osc1.start(now);
      this.oscillators.push(osc1);

      // 2. Sub-octave: 108 Hz (warm foundation)
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(108, now);
      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0.45, now);
      osc2.connect(gain2);
      gain2.connect(filter);
      osc2.start(now);
      this.oscillators.push(osc2);

      // 3. Harmonic Fifth: 324 Hz (peaceful resonance)
      const osc3 = this.ctx.createOscillator();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(324, now);
      const gain3 = this.ctx.createGain();
      gain3.gain.setValueAtTime(0.15, now);
      osc3.connect(gain3);
      gain3.connect(filter);
      osc3.start(now);
      this.oscillators.push(osc3);

      // Slow LFO for organic breathing filter movement (0.08 Hz)
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(60, now);
      this.lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      this.lfo.start(now);

      this.isActive = true;
      this.notify();
    } catch {
      this.isActive = false;
      this.notify();
    }
  }

  public stop(): void {
    if (!this.isActive || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    // Gentle fade out over 0.8 seconds
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.8);

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // already stopped
        }
      });
      this.oscillators = [];

      if (this.lfo) {
        try {
          this.lfo.stop();
          this.lfo.disconnect();
        } catch {
          // already stopped
        }
        this.lfo = null;
      }

      this.isActive = false;
      this.notify();
    }, 850);
  }
}

export const soundscape = new SoundscapeEngine();
