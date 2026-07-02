// 和风禅意合成器 — 增强版 BGM
export class Synth {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  musicGain: GainNode | null = null;
  musicTimer: number | null = null;
  musicStep = 0;
  musicOn = false;
  // BGM 各层
  private bassGain: GainNode | null = null;
  private chordGain: GainNode | null = null;
  private melodyGain: GainNode | null = null;
  private percGain: GainNode | null = null;

  ensure() {
    if (this.ctx) return;
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.5;
      this.master.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.18;
      this.musicGain.connect(this.master);

      // 分层
      this.bassGain = this.ctx.createGain();
      this.bassGain.gain.value = 0.6;
      this.bassGain.connect(this.musicGain);

      this.chordGain = this.ctx.createGain();
      this.chordGain.gain.value = 0.5;
      this.chordGain.connect(this.musicGain);

      this.melodyGain = this.ctx.createGain();
      this.melodyGain.gain.value = 0.55;
      this.melodyGain.connect(this.musicGain);

      this.percGain = this.ctx.createGain();
      this.percGain.gain.value = 0.35;
      this.percGain.connect(this.musicGain);
    } catch {
      this.ctx = null;
    }
  }

  resume() {
    this.ensure();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  setMaster(v: number) {
    if (this.master) this.master.gain.value = v;
  }

  setMusicOn(on: boolean) {
    this.musicOn = on;
    if (this.musicGain) this.musicGain.gain.value = on ? 0.18 : 0;
  }

  // === 音效 ===
  flap() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(1200, t);
    o.frequency.exponentialRampToValueAtTime(600, t + 0.08);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.35, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.12);
  }

  score() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const freqs = [1568, 2093]; // G6, C7
    freqs.forEach((f, i) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * 0.04);
      g.gain.linearRampToValueAtTime(0.25, t + i * 0.04 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.04 + 0.18);
      o.connect(g).connect(this.master!);
      o.start(t + i * 0.04);
      o.stop(t + i * 0.04 + 0.2);
    });
  }

  pickup() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const notes = [523, 659, 784]; // C5, E5, G5
    notes.forEach((f, i) => {
      const o = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();
      o.type = "triangle";
      o.frequency.value = f;
      g.gain.setValueAtTime(0, t + i * 0.05);
      g.gain.linearRampToValueAtTime(0.3, t + i * 0.05 + 0.005);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.05 + 0.2);
      o.connect(g).connect(this.master!);
      o.start(t + i * 0.05);
      o.stop(t + i * 0.05 + 0.22);
    });
  }

  die() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    // 白噪声 + 低通
    const bufSize = this.ctx.sampleRate * 0.5;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufSize);
    }
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, t);
    filter.frequency.exponentialRampToValueAtTime(200, t + 0.5);
    const g = this.ctx.createGain();
    g.gain.value = 0.4;
    src.connect(filter).connect(g).connect(this.master);
    src.start(t);
    src.stop(t + 0.5);
  }

  shield() {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(400, t);
    o.frequency.linearRampToValueAtTime(900, t + 0.15);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.3, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.22);
  }

  // === 增强 BGM：和风禅意音乐 ===
  // 日本 Yo 音阶：D F G A C (re fa so la do)
  private yoScale = [293.66, 349.23, 392.0, 440.0, 523.25]; // D4 F4 G4 A4 C5
  private yoScaleHigh = [587.33, 698.46, 784.0, 880.0, 1046.5]; // 高八度
  private chords = [
    [293.66, 440.0, 523.25],   // Dm (D F A)
    [349.23, 523.25, 659.25],  // F (F A C) - 近似
    [392.0, 523.25, 659.25],   // C (C E G) - 用 C5 代替
    [440.0, 554.37, 659.25],   // Am (A C E)
  ];

  private playNote(
    freq: number,
    startTime: number,
    dur: number,
    type: OscillatorType,
    gain: GainNode,
    vol: number,
    rampDown = true,
  ) {
    if (!this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    // 微调音高模拟自然感
    o.detune.setValueAtTime((Math.random() - 0.5) * 8, startTime);
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.02);
    if (rampDown) {
      g.gain.exponentialRampToValueAtTime(0.001, startTime + dur);
    }
    o.connect(g).connect(gain);
    o.start(startTime);
    o.stop(startTime + dur + 0.05);
  }

  // 木鱼/竹板打击乐
  private playPerc(startTime: number, freq: number, vol: number) {
    if (!this.ctx || !this.percGain) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0, startTime);
    g.gain.linearRampToValueAtTime(vol, startTime + 0.002);
    g.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
    o.connect(g).connect(this.percGain);
    o.start(startTime);
    o.stop(startTime + 0.15);
  }

  startMusic() {
    this.setMusicOn(true);
    if (this.musicTimer !== null) return;
    this.ensure();
    if (!this.ctx) return;

    const bpm = 72;
    const beatDur = 60 / bpm; // 一拍时长
    const barDur = beatDur * 4; // 一小节 4/4

    // 旋律模式（16 小节循环）
    const melodyPattern = [
      // 小节 1-2: Dm
      { note: 2, beat: 0 }, { note: 4, beat: 1.5 }, { note: 3, beat: 2.5 },
      { note: 2, beat: 4 }, { note: 1, beat: 5.5 }, { note: 0, beat: 6.5 },
      // 小节 3-4: F
      { note: 1, beat: 8 }, { note: 3, beat: 9.5 }, { note: 4, beat: 10.5 },
      { note: 3, beat: 12 }, { note: 2, beat: 13 }, { note: 1, beat: 14 },
      // 小节 5-6: C
      { note: 0, beat: 16 }, { note: 2, beat: 17.5 }, { note: 3, beat: 18.5 },
      { note: 4, beat: 20 }, { note: 3, beat: 21 }, { note: 2, beat: 22 },
      // 小节 7-8: Am
      { note: 3, beat: 24 }, { note: 1, beat: 25.5 }, { note: 0, beat: 26.5 },
      { note: 1, beat: 28 }, { note: 2, beat: 29 }, { note: 3, beat: 30 },
    ];

    const tick = () => {
      if (!this.musicOn || !this.ctx || !this.musicGain) return;
      const t = this.ctx.currentTime;
      const bar = this.musicStep % 8; // 8 小节循环
      const barStart = t;

      // 和弦层（每小节一个和弦，持续全小节）
      const chordIdx = bar % 4;
      const chord = this.chords[chordIdx];
      for (const f of chord) {
        this.playNote(f, barStart, barDur * 0.9, "sine", this.chordGain!, 0.15);
      }

      // 低音层（根音，Koto 感）
      const bassNote = this.yoScale[chordIdx === 3 ? 3 : chordIdx];
      this.playNote(bassNote / 2, barStart, barDur * 0.85, "triangle", this.bassGain!, 0.25);

      // 旋律（当前小节及后续 3 小节的音符）
      const melodyNotes = melodyPattern.filter((n) => {
        const relBeat = n.beat - bar * 4;
        return relBeat >= 0 && relBeat < 16;
      });

      for (const mn of melodyNotes) {
        const relBeat = mn.beat - bar * 4;
        if (relBeat < 0 || relBeat >= 4) continue;
        // 偶尔八度跳跃
        const useHigh = Math.random() < 0.25;
        const scale = useHigh ? this.yoScaleHigh : this.yoScale;
        const freq = scale[mn.note % scale.length];
        this.playNote(freq, barStart + relBeat * beatDur, beatDur * 0.5, "sine", this.melodyGain!, 0.12);
      }

      // 打击乐层
      // 第 1,3 拍：木鱼 (高音)
      this.playPerc(barStart, 800, 0.3);
      this.playPerc(barStart + beatDur * 2, 800, 0.3);
      // 第 2,4 拍：竹板 (低音)
      this.playPerc(barStart + beatDur, 400, 0.25);
      this.playPerc(barStart + beatDur * 3, 400, 0.25);
      // 八分音符装饰
      if (bar % 2 === 0) {
        for (let i = 0; i < 4; i++) {
          this.playPerc(barStart + beatDur * i + beatDur * 0.5, 600, 0.12);
        }
      }

      this.musicStep = (this.musicStep + 1) % 8;
    };

    this.musicTimer = window.setInterval(tick, barDur * 1000);
  }

  stopMusic() {
    if (this.musicTimer !== null) {
      clearInterval(this.musicTimer);
      this.musicTimer = null;
    }
    this.setMusicOn(false);
  }
}

let _synth: Synth | null = null;
export const getSynth = (): Synth => {
  if (!_synth) _synth = new Synth();
  return _synth;
};