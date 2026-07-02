import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pause, Play, RotateCcw, Home, Volume2, VolumeX } from "lucide-react";
import { GameEngine, type EngineSnapshot } from "@/game/engine/GameEngine";
import { useGameStore } from "@/store/gameStore";
import { useProfileStore } from "@/store/profileStore";
import { findPowerUp } from "@/data/powerUps";
import { Audio } from "@/game/audio/AudioManager";
import { useI18n } from "@/i18n";

export default function Game() {
  const { t, powerUpName } = useI18n();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const [showPause, setShowPause] = useState(false);
  const phase = useGameStore((s) => s.phase);
  const score = useGameStore((s) => s.score);
  const combo = useGameStore((s) => s.combo);
  const starsEarned = useGameStore((s) => s.starsEarned);
  const activePowerUp = useGameStore((s) => s.activePowerUp);
  const bestScore = useGameStore((s) => s.bestScore);

  const profile = useProfileStore((s) => s.profile);

  // 启动引擎
  useEffect(() => {
    if (!canvasRef.current) return;
    const engine = new GameEngine(canvasRef.current, {
      onDeath: (_snap) => {
        // 跳转到结算页
        navigate("/gameover");
      },
      onScore: () => {},
      onPickPowerUp: () => {},
      onPickStar: () => {},
    });
    engine.setSkin(profile.equippedSkin);
    engine.setTheme(profile.equippedTheme);
    engine.setQuality(profile.settings.quality);
    engine.setAudioOptions({
      musicOn: profile.settings.musicOn,
      soundOn: profile.settings.soundOn,
      texture: profile.settings.paperTexture,
    });
    engine.start();
    engineRef.current = engine;

    // 首次点击 / 按键激活音频
    const activate = () => {
      Audio.resume();
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
    };
    window.addEventListener("pointerdown", activate);
    window.addEventListener("keydown", activate);

    return () => {
      engine.stop();
      window.removeEventListener("pointerdown", activate);
      window.removeEventListener("keydown", activate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 同步设置变化
  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    e.setSkin(profile.equippedSkin);
    e.setTheme(profile.equippedTheme);
    e.setAudioOptions({
      musicOn: profile.settings.musicOn,
      soundOn: profile.settings.soundOn,
      texture: profile.settings.paperTexture,
    });
  }, [profile.equippedSkin, profile.equippedTheme, profile.settings.musicOn, profile.settings.soundOn, profile.settings.paperTexture]);

  // 暂停 / 恢复
  useEffect(() => {
    if (phase === "paused") {
      engineRef.current?.pause();
      setShowPause(true);
    } else {
      setShowPause(false);
      if (phase === "playing") engineRef.current?.resume();
    }
  }, [phase]);

  const handlePause = () => {
    const e = engineRef.current;
    if (!e) return;
    if (phase === "playing") {
      useGameStore.getState().setPhase("paused");
    } else if (phase === "paused") {
      useGameStore.getState().setPhase("playing");
      e.resume();
    }
  };

  const handleRestart = () => {
    engineRef.current?.restart();
  };

  const handleHome = () => {
    engineRef.current?.stop();
    navigate("/");
  };

  const toggleMute = () => {
    const p = useProfileStore.getState().profile;
    useProfileStore.getState().setSetting("soundOn", !p.settings.soundOn);
    useProfileStore.getState().setSetting("musicOn", !p.settings.musicOn);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-paper-200/40">
      <div
        className="relative bg-paper-100 shadow-paper-lg rounded-sm overflow-hidden border border-paper-300"
        style={{ width: "min(96vw, 480px)", aspectRatio: "9 / 16" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block touch-none"
          aria-label="Paper Flap Game Canvas"
        />

        {/* HUD */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between pointer-events-none">
          <div className="font-mono text-ink-400 text-3xl tracking-tight font-light drop-shadow-sm">
            {score}
          </div>
          <div className="flex flex-col items-end gap-2 pointer-events-auto">
            {activePowerUp && (
              <div className="bg-paper-50/80 backdrop-blur border border-paper-300 rounded-sm px-3 py-1.5 flex items-center gap-2 text-xs font-serif text-ink-200">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: findPowerUp(activePowerUp.kind).color }}
                />
                <span>{powerUpName(activePowerUp.kind)}</span>
                <span className="font-mono text-ink-50">
                  {activePowerUp.remaining.toFixed(1)}s
                </span>
              </div>
            )}
            <div className="flex gap-1.5">
              <button
                onClick={toggleMute}
                className="w-9 h-9 bg-paper-50/70 hover:bg-paper-50 backdrop-blur border border-paper-300 rounded-sm flex items-center justify-center text-ink-100 btn-lift"
                aria-label="toggle audio"
              >
                {profile.settings.soundOn ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handlePause}
                className="w-9 h-9 bg-paper-50/70 hover:bg-paper-50 backdrop-blur border border-paper-300 rounded-sm flex items-center justify-center text-ink-100 btn-lift"
                aria-label="pause"
              >
                {phase === "paused" ? (
                  <Play className="w-4 h-4" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Combo 提示 */}
        {combo > 1 && phase === "playing" && (
          <div className="absolute top-16 left-3 font-serif text-sakura-600 text-xs tracking-widest">
            ×{combo} {t.game.combo}
          </div>
        )}

        {/* 准备态 */}
        {phase === "ready" && (
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 pointer-events-none">
            <div className="font-display text-ink-400 text-3xl tracking-[0.3em] text-emboss mb-3">
              {t.game.ready}
            </div>
            <div className="font-serif italic text-ink-50 text-sm tracking-widest">
              {t.game.readyHint}
            </div>
          </div>
        )}

        {/* 暂停 */}
        {showPause && (
          <div className="absolute inset-0 bg-paper-100/85 backdrop-blur-sm flex flex-col items-center justify-center gap-6 page-enter">
            <div className="font-display text-4xl tracking-[0.4em] text-ink-400 text-emboss">
              {t.game.paused}
            </div>
            <div className="flex flex-col gap-3 w-56">
              <button
                onClick={() => {
                  useGameStore.getState().setPhase("playing");
                  engineRef.current?.resume();
                }}
                className="btn-lift px-6 py-3 border border-ink-100 bg-paper-50 font-serif tracking-widest text-ink-400 rounded-sm flex items-center justify-center gap-2 shadow-paper"
              >
                <Play className="w-4 h-4" /> {t.common.continue}
              </button>
              <button
                onClick={handleRestart}
                className="btn-lift px-6 py-3 border border-paper-300 bg-paper-50 font-serif tracking-widest text-ink-200 rounded-sm flex items-center justify-center gap-2 shadow-paper"
              >
                <RotateCcw className="w-4 h-4" /> {t.game.restart}
              </button>
              <button
                onClick={handleHome}
                className="btn-lift px-6 py-3 border border-transparent text-ink-50 font-serif tracking-widest hover:border-paper-300 rounded-sm flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" /> {t.game.home}
              </button>
            </div>
            <div className="font-mono text-xs text-ink-50 tracking-widest mt-2">
              {t.game.currentScore} {score} · 最高 {bestScore}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}