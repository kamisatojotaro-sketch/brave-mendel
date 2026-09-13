// Browser Web Audio API Ambient Sound Synthesizer for ADHD Focus

class AmbientAudioEngine {
  private ctx: AudioContext | null = null;
  private noiseNode: AudioNode | null = null;
  private binauralLeftOsc: OscillatorNode | null = null;
  private binauralRightOsc: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;
  public isPlaying: boolean = false;
  public currentType: 'pink' | 'brown' | 'binaural-focus' | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(type: 'pink' | 'brown' | 'binaural-focus', volume: number = 0.3) {
    this.stop();
    this.initContext();
    if (!this.ctx) return;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    if (type === 'pink') {
      this.playPinkNoise();
    } else if (type === 'brown') {
      this.playBrownNoise();
    } else if (type === 'binaural-focus') {
      this.playBinauralBeats();
    }

    this.isPlaying = true;
    this.currentType = type;
  }

  private playPinkNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = 4096;
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    const node = this.ctx.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    };
    node.connect(this.masterGain);
    this.noiseNode = node;
  }

  private playBrownNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = 4096;
    let lastOut = 0.0;
    const node = this.ctx.createScriptProcessor(bufferSize, 1, 1);
    node.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Gain compensation
      }
    };
    node.connect(this.masterGain);
    this.noiseNode = node;
  }

  private playBinauralBeats() {
    if (!this.ctx || !this.masterGain) return;
    // Beta/Gamma 14Hz difference: Base 210Hz left, 224Hz right
    const merger = this.ctx.createChannelMerger(2);

    const oscLeft = this.ctx.createOscillator();
    const oscRight = this.ctx.createOscillator();
    oscLeft.type = 'sine';
    oscRight.type = 'sine';
    oscLeft.frequency.value = 210; // Left ear
    oscRight.frequency.value = 224; // Right ear (14Hz focus beat)

    const gainL = this.ctx.createGain();
    const gainR = this.ctx.createGain();
    gainL.gain.value = 0.2;
    gainR.gain.value = 0.2;

    oscLeft.connect(gainL);
    oscRight.connect(gainR);

    gainL.connect(merger, 0, 0); // Left channel
    gainR.connect(merger, 0, 1); // Right channel

    merger.connect(this.masterGain);

    oscLeft.start();
    oscRight.start();

    this.binauralLeftOsc = oscLeft;
    this.binauralRightOsc = oscRight;
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public stop() {
    if (this.noiseNode) {
      this.noiseNode.disconnect();
      this.noiseNode = null;
    }
    if (this.binauralLeftOsc) {
      try { this.binauralLeftOsc.stop(); } catch {}
      this.binauralLeftOsc.disconnect();
      this.binauralLeftOsc = null;
    }
    if (this.binauralRightOsc) {
      try { this.binauralRightOsc.stop(); } catch {}
      this.binauralRightOsc.disconnect();
      this.binauralRightOsc = null;
    }
    if (this.masterGain) {
      this.masterGain.disconnect();
      this.masterGain = null;
    }
    this.isPlaying = false;
    this.currentType = null;
  }
}

export const ambientAudio = new AmbientAudioEngine();
