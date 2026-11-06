import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ArrowLeft, Skull, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GUIDE_STEP_SLOTS, PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';

interface GuidePageProps {
  onNavigate: (page: PageId) => void;
  onCrimsonShiftChange?: (isCrimson: boolean) => void;
}

type ScenePhase = 'idle' | 'confrontation' | 'strike' | 'outline' | 'cleanup';

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigate, onCrimsonShiftChange }) => {
  // Scroll-linked color shift ratio (0 = pure black #050505 + neon green, 1 = deep red #3a0b10 + crimson)
  const [scrollRatio, setScrollRatio] = useState(0);

  // Interactive Shadow-Silhouette Animation States
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenePhase, setScenePhase] = useState<ScenePhase>('idle');
  const [activeCaptionIndex, setActiveCaptionIndex] = useState<number>(-1);
  const [typedText, setTypedText] = useState<string>(
    'AWAITING INPUT // PRESS "PLAY SHADOW SCENE" TO INITIALIZE CRIME-SCENE RECONSTRUCTION...'
  );
  const [sceneCompleted, setSceneCompleted] = useState(false);

  const timersRef = useRef<number[]>([]);

  // Clear all active timers on unmount or reset
  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Scroll listener to shift palette smoothly from #050505 to #3a0b10
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 500);
      const ratio = Math.min(1, Math.max(0, scrollTop / (maxScroll * 0.65)));
      setScrollRatio(ratio);
      if (onCrimsonShiftChange) {
        onCrimsonShiftChange(ratio > 0.35);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (onCrimsonShiftChange) onCrimsonShiftChange(false);
    };
  }, [onCrimsonShiftChange]);

  // Typewriter effect whenever activeCaptionIndex changes
  useEffect(() => {
    if (activeCaptionIndex < 0 || activeCaptionIndex >= GUIDE_STEP_SLOTS.length) return;

    const fullLine = GUIDE_STEP_SLOTS[activeCaptionIndex].captionLine;
    setTypedText('');
    let charIdx = 0;

    const intervalId = window.setInterval(() => {
      charIdx += 1;
      setTypedText(fullLine.slice(0, charIdx));
      if (charIdx % 4 === 0) {
        soundFX.playHoverTick(720);
      }
      if (charIdx >= fullLine.length) {
        window.clearInterval(intervalId);
      }
    }, 24);

    return () => window.clearInterval(intervalId);
  }, [activeCaptionIndex]);

  // Start the Shadow-Silhouette Animation + Synced Typewriter Captions
  const handlePlayShadowScene = () => {
    clearAllTimers();
    soundFX.playDramaticPulse();
    setIsPlaying(true);
    setSceneCompleted(false);

    // Phase 1: Confrontation (Two shadow figures face to face) + Step 1 caption
    setScenePhase('confrontation');
    setActiveCaptionIndex(0);

    // Phase 2: Abstract Knife Motion + Step 2 caption
    const t1 = window.setTimeout(() => {
      soundFX.playDramaticPulse();
      setScenePhase('strike');
      setActiveCaptionIndex(1);
    }, 2800);

    // Phase 3: Body Chalk Outline on Floor + Step 3 caption
    const t2 = window.setTimeout(() => {
      soundFX.playGlitchSwitch();
      setScenePhase('outline');
      setActiveCaptionIndex(2);
    }, 5600);

    // Phase 4: Cleanup & Disposal + Step 4 caption
    const t3 = window.setTimeout(() => {
      setScenePhase('cleanup');
      setActiveCaptionIndex(3);
    }, 8400);

    // Phase 5: Final Bleach-down & Guide Unlock + Step 5 caption
    const t4 = window.setTimeout(() => {
      soundFX.playHoverTick(880);
      setActiveCaptionIndex(4);
      setIsPlaying(false);
      setSceneCompleted(true);
    }, 11200);

    timersRef.current.push(t1, t2, t3, t4);
  };

  // Reset Button Handler
  const handleResetScene = () => {
    clearAllTimers();
    soundFX.playHoverTick(420);
    setIsPlaying(false);
    setScenePhase('idle');
    setActiveCaptionIndex(-1);
    setSceneCompleted(false);
    setTypedText(
      'SCENE RESET // PRESS "PLAY SHADOW SCENE" TO REPLAY CRIME-SCENE RECONSTRUCTION...'
    );
  };

  // Interpolate background color from Pure Black (#050505) to Deep Blood Red (#3a0b10)
  const r = Math.round(5 + (58 - 5) * scrollRatio);
  const g = Math.round(5 + (11 - 5) * scrollRatio);
  const b = Math.round(5 + (16 - 5) * scrollRatio);
  const dynamicBg = `rgb(${r}, ${g}, ${b})`;

  return (
    <div
      style={{ backgroundColor: dynamicBg }}
      className="min-h-screen w-full pt-24 pb-24 px-4 sm:px-8 transition-colors duration-300 relative"
    >
      {/* Dynamic Atmospheric Vignette Overlay */}
      <div
        style={{ opacity: scrollRatio * 0.65 }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#3a0b10_100%)] z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Top Sub-navigation & Scroll Atmosphere Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00ff00]/30 pb-4">
          <button
            onClick={() => {
              soundFX.playHoverTick(500);
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 font-mono text-xs text-[#f1efe6]/80 hover:text-[#00ff00] uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#00ff00]" />
            <span>BACK TO LANDING</span>
          </button>

          {/* Live Scroll Color-Shift Meter */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#f1efe6]/60 uppercase">CRIME-SCENE ATMOSPHERE SHIFT:</span>
            <div className="w-28 h-2.5 border border-[#00ff00]/50 bg-[#050505] overflow-hidden p-0.5">
              <div
                style={{
                  width: `${Math.max(8, Math.round(scrollRatio * 100))}%`,
                  backgroundColor: scrollRatio > 0.4 ? '#c0392b' : '#00ff00',
                }}
                className="h-full transition-all duration-150"
              />
            </div>
            <span className={scrollRatio > 0.4 ? 'text-[#c0392b] font-bold' : 'text-[#00ff00]'}>
              {scrollRatio > 0.4 ? '#3A0B10 BLOOD' : '#050505 NOIR'}
            </span>
          </div>
        </div>

        {/* Page Title Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00ff00]/50 bg-[#050505]/80 text-[#00ff00] font-mono text-xs uppercase tracking-widest">
            <Skull className="w-3.5 h-3.5" />
            <span>MODULE 01 // KOREDE’S CLEANUP PROTOCOL</span>
          </div>
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-wide text-[#f1efe6] leading-none">
            THE <span className="text-[#00ff00] neon-text-glow">CRIME-SCENE</span> GUIDE
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#f1efe6]/75 max-w-2xl">
            Scroll down to shift the environment into crime-scene crimson (`#3a0b10`), or trigger the shadow-silhouette reconstruction below to sync Korede’s 5-step cleanup captions.
          </p>
        </div>

        {/* INTERACTIVE SHADOW-SILHOUETTE STAGE */}
        <div className="border-2 border-[#00ff00] bg-[#050505]/95 neon-glow overflow-hidden">
          {/* Stage Top Bar */}
          <div className="px-6 py-3 bg-[#00ff00]/10 border-b border-[#00ff00]/30 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00ff00]">
              <span className="w-2 h-2 rounded-full bg-[#00ff00] animate-ping" />
              <span>SHADOW THEATRE // AYOOLA & FEMI RECONSTRUCTION (ABSTRACT SILHOUETTE)</span>
            </div>
            <div className="text-[#f1efe6]/60 uppercase">
              PHASE: <span className="text-[#00ff00] font-bold">{scenePhase.toUpperCase()}</span>
            </div>
          </div>

          {/* Animated SVG Shadow Silhouette Viewport */}
          <div className="relative h-80 sm:h-96 w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#141414_0%,#050505_75%)]">
            {/* Subtle Spotlight Cone */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                scenePhase === 'strike'
                  ? 'bg-[radial-gradient(circle_at_center,rgba(192,57,43,0.32)_0%,transparent_70%)]'
                  : 'bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.12)_0%,transparent_65%)]'
              }`}
            />

            {/* Abstract Non-Graphic Shadow Silhouette SVG */}
            <svg viewBox="0 0 600 300" className="w-full h-full max-w-2xl px-6">
              {/* Floor Line */}
              <line x1="40" y1="255" x2="560" y2="255" stroke="#00ff00" strokeWidth="1.5" strokeOpacity="0.4" />

              {/* Figure 1: Ayoola Shadow Silhouette (Left) */}
              <g
                style={{
                  transform:
                    scenePhase === 'idle'
                      ? 'translate(150px, 55px)'
                      : scenePhase === 'confrontation'
                      ? 'translate(195px, 55px)'
                      : scenePhase === 'strike'
                      ? 'translate(230px, 55px)'
                      : 'translate(140px, 55px)',
                  transition: 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                {/* Head */}
                <circle cx="40" cy="40" r="20" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                {/* Body Silhouette */}
                <path d="M15 200 L26 68 L54 68 L65 200 Z" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                {/* Raised Arm & Abstract Knife Silhouette */}
                <g
                  style={{
                    transformOrigin: '52px 82px',
                    transform:
                      scenePhase === 'strike'
                        ? 'rotate(48deg)'
                        : scenePhase === 'confrontation'
                        ? 'rotate(-35deg)'
                        : 'rotate(10deg)',
                    transition: 'transform 0.45s ease-in-out',
                  }}
                >
                  <line x1="52" y1="82" x2="92" y2="48" stroke="#00ff00" strokeWidth="5" strokeLinecap="round" />
                  {/* Abstract Knife Blade */}
                  <polygon
                    points="90,50 124,26 114,56"
                    fill={scenePhase === 'strike' ? '#c0392b' : '#00ff00'}
                  />
                </g>
                <text x="40" y="222" textAnchor="middle" fill="#00ff00" fontSize="10" fontFamily="monospace">
                  [AYOOLA]
                </text>
              </g>

              {/* Figure 2: Femi Shadow Silhouette (Right -> Transitions to Floor Body Outline) */}
              <g
                style={{
                  opacity: scenePhase === 'outline' || scenePhase === 'cleanup' ? 0 : 1,
                  transform:
                    scenePhase === 'strike'
                      ? 'translate(335px, 75px) rotate(18deg)'
                      : 'translate(320px, 55px) rotate(0deg)',
                  transition: 'all 0.7s ease-in-out',
                }}
              >
                <circle cx="40" cy="40" r="20" fill="#050505" stroke="#f1efe6" strokeWidth="2" strokeOpacity="0.8" />
                <path d="M16 200 L24 68 L56 68 L64 200 Z" fill="#050505" stroke="#f1efe6" strokeWidth="2" strokeOpacity="0.8" />
                <text x="40" y="222" textAnchor="middle" fill="#f1efe6" fontSize="10" fontFamily="monospace" opacity="0.7">
                  [FEMI]
                </text>
              </g>

              {/* Abstract Crime-Scene Chalk Body Outline on Floor (Appears in 'outline' & 'cleanup' phases) */}
              <g
                style={{
                  opacity: scenePhase === 'outline' || scenePhase === 'cleanup' ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              >
                {/* Glowing Chalk Outline on the floor */}
                <ellipse
                  cx="330"
                  cy="242"
                  rx="18"
                  ry="10"
                  fill="none"
                  stroke="#00ff00"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                />
                <path
                  d="M350 242 L475 236 L490 248 L350 250 Z"
                  fill="rgba(192, 57, 43, 0.25)"
                  stroke="#00ff00"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                <text x="415" y="220" textAnchor="middle" fill="#00ff00" fontSize="11" fontFamily="monospace">
                  {scenePhase === 'cleanup'
                    ? ' KOREDE CLEANUP PROTOCOL ACTIVE //'
                    : ' EVIDENCE OUTLINE // BODY ON BATHROOM FLOOR //'}
                </text>
              </g>
            </svg>

            {/* Step Progress Badge Overlay */}
            {activeCaptionIndex >= 0 && (
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#050505]/90 border border-[#00ff00] font-mono text-xs text-[#00ff00]">
                SYNCED STEP 0{activeCaptionIndex + 1} / 05
              </div>
            )}
          </div>

          {/* Synced Typewriter Text Caption Box */}
          <div className="px-6 py-4 bg-[#050505] border-t border-[#00ff00]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="font-mono text-sm sm:text-base text-[#00ff00] min-h-[28px] flex items-center">
              <span className="text-[#f1efe6]/50 mr-2">&gt;</span>
              <span>{typedText}</span>
              <span className="inline-block w-2.5 h-4 bg-[#00ff00] ml-1 cursor-blink" />
            </div>

            {/* Play Shadow Scene & Reset Action Buttons */}
            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={handlePlayShadowScene}
                disabled={isPlaying}
                className={`flex-1 sm:flex-initial px-5 py-2.5 font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border-2 transition-all ${
                  isPlaying
                    ? 'border-[#00ff00]/40 bg-[#00ff00]/20 text-[#00ff00] cursor-wait'
                    : 'border-[#00ff00] bg-[#00ff00] text-[#050505] hover:bg-[#f1efe6] hover:border-[#f1efe6] neon-glow'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlaying ? 'Playing Scene...' : 'Play shadow scene'}</span>
              </button>

              <button
                onClick={handleResetScene}
                className="px-4 py-2.5 font-mono text-xs uppercase tracking-widest border-2 border-[#f1efe6]/40 text-[#f1efe6] hover:border-[#00ff00] hover:text-[#00ff00] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP "HOW TO GET AWAY WITH MURDER" GUIDE REVEAL */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#00ff00]/30 pb-4">
            <div>
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-[#f1efe6]">
                HOW TO GET AWAY WITH MURDER — <span className="text-[#00ff00]">STEP-BY-STEP</span>
              </h3>
              <p className="font-mono text-xs text-[#f1efe6]/65">
                Numbered cleanup protocol with neon-green step markers &amp; &lt;content&gt; slots ready for your PBL breakdown.
              </p>
            </div>

            <div className="font-mono text-xs flex items-center gap-2 px-3 py-1.5 border border-[#00ff00]/40 bg-[#050505]/80">
              {sceneCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#00ff00]" />
                  <span className="text-[#00ff00]">SCENE COMPLETED // ALL STEPS UNLOCKED</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#00ff00]" />
                  <span className="text-[#f1efe6]/80">CLICK ANY STEP OR PLAY SCENE ABOVE</span>
                </>
              )}
            </div>
          </div>

          {/* Numbered List of Steps with Neon-Green Step Markers */}
          <div className="grid grid-cols-1 gap-6">
            {GUIDE_STEP_SLOTS.map((step, index) => {
              const isCurrentStep = activeCaptionIndex === index;
              const isRevealed = sceneCompleted || activeCaptionIndex >= index || activeCaptionIndex === -1;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => {
                    soundFX.playHoverTick(600);
                    setActiveCaptionIndex(index);
                  }}
                  className={`cursor-pointer border-2 transition-all duration-500 p-6 sm:p-8 bg-[#050505]/90 backdrop-blur-sm ${
                    isCurrentStep
                      ? 'border-[#00ff00] neon-glow-strong scale-[1.01]'
                      : isRevealed
                      ? 'border-[#00ff00]/50 hover:border-[#00ff00] neon-glow'
                      : 'border-[#f1efe6]/15 opacity-50'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#00ff00]/20">
                    <div className="flex items-center gap-4">
                      {/* Neon-Green Step Marker */}
                      <span className="w-12 h-12 shrink-0 bg-[#00ff00] text-[#050505] font-display text-3xl flex items-center justify-center font-bold neon-glow">
                        {step.stepNumber}
                      </span>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[#00ff00]">
                          {step.itemsTag}
                        </span>
                        <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#f1efe6]">
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    <span className="font-mono text-xs text-[#00ff00]/80 bg-[#00ff00]/10 px-3 py-1 border border-[#00ff00]/30 self-start md:self-center">
                      STEP {step.stepNumber} // &lt;content&gt; SLOT
                    </span>
                  </div>

                  {/* Synced Caption Reference */}
                  <p className="mt-4 font-mono text-xs sm:text-sm text-[#00ff00]/90 italic">
                    "{step.captionLine}"
                  </p>

                  {/* `<content>` Placeholder Slot */}
                  <div className="mt-4 p-4 bg-[#00ff00]/5 border-l-4 border-[#00ff00] font-mono text-sm sm:text-base text-[#f1efe6] flex items-center justify-between">
                    <span>{step.content}</span>
                    <span className="text-[11px] text-[#f1efe6]/40 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#00ff00]" />
                      Edit in src/data/contentSlots.ts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
