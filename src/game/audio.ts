export class GameAudio {
  private ctx: AudioContext | null = null;
  muted = false;

  unlock() {
    try {
      if (!this.ctx) this.ctx = new AudioContext();
      if (this.ctx.state === "suspended") void this.ctx.resume();
    } catch {
      this.ctx = null;
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
  }

  tone(freq: number, dur: number, type: OscillatorType, gain: number) {
    if (this.muted || !this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    amp.gain.setValueAtTime(gain, ctx.currentTime);
    amp.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  }

  place() {
    this.tone(220, 0.08, "square", 0.03);
  }

  shot() {
    this.tone(520, 0.04, "square", 0.02);
  }

  boom() {
    this.tone(90, 0.18, "sawtooth", 0.03);
  }

  warn() {
    this.tone(140, 0.2, "triangle", 0.04);
  }

  ui() {
    this.tone(360, 0.05, "square", 0.02);
  }
}
