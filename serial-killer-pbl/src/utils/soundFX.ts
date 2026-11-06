// Subtle Web Audio API synthesizer for UI clicks, glitch pulses, shadow scene cues,
// and the "Whitney Houston - I Wanna Dance With Somebody" Easter Egg audio player.

class SoundController {
  private ctx: AudioContext | null = null;
  public isMuted: boolean = true;

  // Easter Egg Music Player state
  public isMusicPlaying: boolean = false;
  private audioEl: HTMLAudioElement | null = null;
  private onEndedCallback: (() => void) | null = null;

  private ensureContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.ensureContext();
      this.playHoverTick(660);
    }
    return this.isMuted;
  }

  // ==========================================================================
  // EASTER EGG: "Whitney Houston — I Wanna Dance With Somebody" (/assets/i-wanna-dance.mp3)
  // Starts at the 30-second mark (0:30), plays until the song finishes (no auto-loop),
  // stops spinning when finished, and requires clicking the music disc again to replay.
  // ==========================================================================
  public toggleWhitneySong(onSongEnded?: () => void): boolean {
    if (this.isMusicPlaying) {
      this.stopWhitneySong();
      return false;
    } else {
      this.startWhitneySong(onSongEnded);
      return true;
    }
  }

  public startWhitneySong(onSongEnded?: () => void) {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.onEndedCallback = onSongEnded || null;

    if (typeof window !== 'undefined') {
      if (!this.audioEl) {
        this.audioEl = new Audio('/assets/i-wanna-dance.mp3');
        this.audioEl.loop = false;
        this.audioEl.volume = 0.8;

        this.audioEl.addEventListener('ended', () => {
          this.isMusicPlaying = false;
          if (this.onEndedCallback) {
            this.onEndedCallback();
          }
        });
      }

      // Start playback at the 30-second mark as requested
      this.audioEl.loop = false;
      this.audioEl.currentTime = 30;
      this.audioEl.play().catch((err) => {
        console.error('Failed to play Whitney Houston audio:', err);
        this.isMusicPlaying = false;
        if (this.onEndedCallback) {
          this.onEndedCallback();
        }
      });
    }
  }

  public stopWhitneySong() {
    this.isMusicPlaying = false;
    if (this.audioEl) {
      this.audioEl.pause();
      this.audioEl.currentTime = 30;
    }
  }

  public playHoverTick(freq = 520) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.045);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.045);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playGlitchSwitch() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.setValueAtTime(340, now + 0.04);
    osc.frequency.setValueAtTime(85, now + 0.08);

    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playDramaticPulse() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(75, now);
    osc.frequency.exponentialRampToValueAtTime(36, now + 0.55);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.62);
  }
}

export const soundFX = new SoundController();
