import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, ArrowLeft, Skull, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';
import { GUIDE_STEP_SLOTS, PageId } from '../data/contentSlots';
import {
  BloodyClothProp,
  HuntingKnifeProp,
  BleachBottleProp,
  RubberGlovesProp,
  CrimsonSunglassesProp,
  PaintSplatterBadge,
  BotanicalLagoonFooter,
} from './BotanicalCrimeArt';
import { soundFX } from '../utils/soundFX';

interface GuidePageProps {
  onNavigate: (page: PageId) => void;
  onCrimsonShiftChange?: (isCrimson: boolean) => void;
}

type ScenePhase = 'idle' | 'confrontation' | 'strike' | 'outline' | 'cleanup';

const STEP_TO_PHASE: ScenePhase[] = ['confrontation', 'strike', 'outline', 'cleanup', 'cleanup'];

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigate, onCrimsonShiftChange }) => {
  const [scrollRatio, setScrollRatio] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [scenePhase, setScenePhase] = useState<ScenePhase>('idle');
  const [activeCaptionIndex, setActiveCaptionIndex] = useState<number>(-1);
  const [typedText, setTypedText] = useState<string>(
    'AWAITING INPUT // PRESS "PLAY SHADOW SCENE" TO INITIALIZE CRIME-SCENE RECONSTRUCTION...'
  );
  const [sceneCompleted, setSceneCompleted] = useState(false);

  const timersRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Scroll listener to shift palette smoothly from Botanical Emerald (#083a1c) to Deep Crime-Scene Crimson (#3a0b14)
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

  const handlePlayShadowScene = () => {
    clearAllTimers();
    soundFX.playDramaticPulse();
    setIsPlaying(true);
    setSceneCompleted(false);

    setScenePhase('confrontation');
    setActiveCaptionIndex(0);

    const t1 = window.setTimeout(() => {
      soundFX.playDramaticPulse();
      setScenePhase('strike');
      setActiveCaptionIndex(1);
    }, 2800);

    const t2 = window.setTimeout(() => {
      soundFX.playGlitchSwitch();
      setScenePhase('outline');
      setActiveCaptionIndex(2);
    }, 5600);

    const t3 = window.setTimeout(() => {
      setScenePhase('cleanup');
      setActiveCaptionIndex(3);
    }, 8400);

    const t4 = window.setTimeout(() => {
      soundFX.playHoverTick(880);
      setActiveCaptionIndex(4);
      setIsPlaying(false);
      setSceneCompleted(true);
    }, 11200);

    timersRef.current.push(t1, t2, t3, t4);
  };

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

  // Interpolate background from Botanical Emerald (#083a1c) to Deep Crime-Scene Crimson (#3a0b14)
  const r = Math.round(8 + (58 - 8) * scrollRatio);
  const g = Math.round(58 + (11 - 58) * scrollRatio);
  const b = Math.round(28 + (20 - 28) * scrollRatio);
  const dynamicBg = `rgb(${r}, ${g}, ${b})`;

  // Distinct Pop-Art Murder Prop Icon per Cleanup Step
  const getStepIllustration = (index: number) => {
    switch (index) {
      case 0:
        return <BleachBottleProp className="w-16 h-16 shrink-0" />;
      case 1:
        return <BloodyClothProp className="w-16 h-16 shrink-0" />;
      case 2:
        return <HuntingKnifeProp className="w-16 h-16 shrink-0" />;
      case 3:
        return <RubberGlovesProp className="w-16 h-16 shrink-0" />;
      default:
        return <CrimsonSunglassesProp className="w-24 h-12 shrink-0" />;
    }
  };

  return (
    <div
      style={{ backgroundColor: dynamicBg }}
      className="min-h-screen w-full pt-24 pb-20 px-4 sm:px-8 transition-colors duration-300 relative"
    >
      {/* Dynamic Atmospheric Vignette Overlay */}
      <div
        style={{ opacity: scrollRatio * 0.7 }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#3a0b14_100%)] z-0"
      />

      {/* Floating Decorative Murder Props in Margins */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="hidden md:block absolute left-5 top-36 opacity-80 animate-float-slow">
          <BloodyClothProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
        <div
          style={{ animationDelay: '1.8s' }}
          className="hidden md:block absolute right-6 top-44 opacity-80 animate-float-slow"
        >
          <HuntingKnifeProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-12">
        {/* Top Sub-navigation & Scroll Atmosphere Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f3efe4]/25 pb-4">
          <button
            onClick={() => {
              soundFX.playHoverTick(500);
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041d0e]/85 border border-[#f3efe4]/25 font-mono text-xs text-[#f3efe4] hover:border-[#ff007f] hover:text-[#ff007f] uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#00ff33]" />
            <span>BACK TO HARDCOVER</span>
          </button>

          {/* Live Scroll Color-Shift Meter */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#f3efe4]/75 uppercase">CRIME-SCENE ATMOSPHERE SHIFT:</span>
            <div className="w-28 h-3 rounded-full border border-[#f3efe4]/40 bg-[#040705] overflow-hidden p-0.5">
              <div
                style={{
                  width: `${Math.max(10, Math.round(scrollRatio * 100))}%`,
                  backgroundColor: scrollRatio > 0.4 ? '#ff007f' : '#00ff33',
                }}
                className="h-full rounded-full transition-all duration-150"
              />
            </div>
            <span className={scrollRatio > 0.4 ? 'text-[#ff007f] font-bold' : 'text-[#00ff33] font-bold'}>
              {scrollRatio > 0.4 ? 'CRIMSON SCENE' : 'LAGOON EMERALD'}
            </span>
          </div>
        </div>

        {/* Page Title Header with Paint Splatters & Literary Pull-Quote */}
        <div className="space-y-3 relative">
          <PaintSplatterBadge
            color="#ff007f"
            className="w-20 h-20 absolute -top-6 left-64 opacity-75"
          />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff007f] text-[#f3efe4] font-mono font-bold text-xs uppercase tracking-widest shadow-md">
            <Skull className="w-3.5 h-3.5" />
            <span>MODULE 01 // KOREDE’S CLEANUP PROTOCOL</span>
          </div>
          <h2 className="font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-wide text-[#f3efe4] leading-none">
            THE <span className="text-[#00ff33] neon-text-glow">CRIME-SCENE</span> GUIDE
          </h2>
          <p className="font-editorial italic text-xl sm:text-2xl text-[#ff007f]">
            “Korede, I killed him. Come and help me.”
          </p>
          <p className="font-mono text-xs sm:text-sm text-[#f3efe4]/80 max-w-2xl">
            Scroll down to shift the environment into a crime-scene atmosphere, or trigger the shadow-silhouette reconstruction below to sync Korede’s 5-step cleanup captions.
          </p>
        </div>

        {/* INTERACTIVE SHADOW-SILHOUETTE STAGE */}
        <div className="rounded-2xl border-2 border-[#f3efe4]/40 bg-[#040705]/95 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
          {/* Stage Top Bar */}
          <div className="px-6 py-3 bg-gradient-to-r from-[#063318] via-[#041d0e] to-[#3a0b14] border-b border-[#f3efe4]/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
            <div className="flex items-center gap-2 text-[#00ff33]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] animate-ping" />
              <span>SHADOW THEATRE // AYOOLA &amp; FEMI RECONSTRUCTION</span>
            </div>
            <div className="text-[#f3efe4]/75 uppercase">
              PHASE: <span className="text-[#ff007f] font-bold">{scenePhase.toUpperCase()}</span>
            </div>
          </div>

          {/* Animated SVG Shadow Silhouette Viewport */}
          <div className="relative h-80 sm:h-96 w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#0d3d20_0%,#040705_75%)]">
            <div
              className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
                scenePhase === 'strike'
                  ? 'bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.42)_0%,transparent_70%)]'
                  : 'bg-[radial-gradient(circle_at_center,rgba(0,255,51,0.14)_0%,transparent_65%)]'
              }`}
            />

            {/* Abstract Non-Graphic Shadow Silhouette SVG */}
            <svg viewBox="0 0 600 300" className="w-full h-full max-w-2xl px-6">
              {/* Cream & Hot-Pink Reeds in Stage Corners */}
              <path d="M25 255 Q35 200 18 165 Q42 205 38 255 Z" fill="#f3efe4" opacity="0.35" />
              <path d="M42 255 Q55 210 68 180 Q56 220 50 255 Z" fill="#ff007f" opacity="0.45" />
              <path d="M555 255 Q545 200 562 165 Q538 205 542 255 Z" fill="#f3efe4" opacity="0.35" />

              {/* Bathroom Tile Floor Line */}
              <line x1="20" y1="255" x2="580" y2="255" stroke="#f3efe4" strokeWidth="1.5" strokeOpacity="0.4" />

              {/* Strike Blood-Splatter Burst Particles */}
              <g
                style={{
                  opacity: scenePhase === 'strike' ? 1 : 0,
                  transition: 'opacity 0.35s ease-out',
                }}
              >
                <circle cx="325" cy="115" r="8" fill="#ff007f" />
                <circle cx="348" cy="96" r="5" fill="#d90429" />
                <circle cx="362" cy="128" r="6" fill="#ff007f" />
                <circle cx="310" cy="138" r="4" fill="#d90429" />
              </g>

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
                <circle cx="40" cy="40" r="20" fill="#040705" stroke="#ff007f" strokeWidth="2.5" />
                <path d="M15 200 L26 68 L54 68 L65 200 Z" fill="#040705" stroke="#ff007f" strokeWidth="2.5" />
                {/* Raised Arm & Father's Curved Hunting Knife Silhouette */}
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
                  <line x1="52" y1="82" x2="92" y2="48" stroke="#f3efe4" strokeWidth="5" strokeLinecap="round" />
                  <polygon
                    points="90,50 128,22 114,56"
                    fill={scenePhase === 'strike' ? '#ff007f' : '#00ff33'}
                  />
                </g>
                <text x="40" y="222" textAnchor="middle" fill="#ff007f" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  [AYOOLA]
                </text>
              </g>

              {/* Figure 2: Femi Shadow Silhouette (Right) */}
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
                <circle cx="40" cy="40" r="20" fill="#040705" stroke="#f3efe4" strokeWidth="2" strokeOpacity="0.85" />
                <path d="M16 200 L24 68 L56 68 L64 200 Z" fill="#040705" stroke="#f3efe4" strokeWidth="2" strokeOpacity="0.85" />
                <text x="40" y="222" textAnchor="middle" fill="#f3efe4" fontSize="10" fontFamily="monospace" opacity="0.8">
                  [FEMI]
                </text>
              </g>

              {/* Abstract Crime-Scene Chalk Body Outline & Korede Bleach Cleanup Foam */}
              <g
                style={{
                  opacity: scenePhase === 'outline' || scenePhase === 'cleanup' ? 1 : 0,
                  transition: 'opacity 0.8s ease-in-out',
                }}
              >
                <ellipse
                  cx="330"
                  cy="242"
                  rx="18"
                  ry="10"
                  fill="none"
                  stroke="#00ff33"
                  strokeWidth="2.5"
                  strokeDasharray="5 3"
                />
                <path
                  d="M350 242 L475 236 L490 248 L350 250 Z"
                  fill={scenePhase === 'cleanup' ? 'rgba(0, 255, 51, 0.35)' : 'rgba(255, 0, 127, 0.35)'}
                  stroke="#00ff33"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
                {scenePhase === 'cleanup' && (
                  <g>
                    <circle cx="380" cy="232" r="5" fill="#00ff33" />
                    <circle cx="415" cy="228" r="6.5" fill="#ff007f" />
                    <circle cx="450" cy="234" r="4.5" fill="#00ff33" />
                  </g>
                )}
                <text x="415" y="216" textAnchor="middle" fill="#00ff33" fontSize="11" fontFamily="monospace">
                  {scenePhase === 'cleanup'
                    ? '// KOREDE BLEACH & CLOTH CLEANUP ACTIVE //'
                    : '// EVIDENCE OUTLINE // BATHROOM FLOOR //'}
                </text>
              </g>
            </svg>

            {activeCaptionIndex >= 0 && (
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded bg-[#ff007f] font-mono font-bold text-xs text-[#f3efe4] shadow-lg">
                SYNCED STEP 0{activeCaptionIndex + 1} / 05
              </div>
            )}
          </div>

          {/* Synced Typewriter Text Caption Box */}
          <div className="px-6 py-4 bg-[#040705] border-t border-[#f3efe4]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="font-mono text-sm sm:text-base text-[#00ff33] min-h-[28px] flex items-center">
              <span className="text-[#ff007f] mr-2 font-bold">&gt;</span>
              <span>{typedText}</span>
              <span className="inline-block w-2.5 h-4 bg-[#ff007f] ml-1 cursor-blink" />
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={handlePlayShadowScene}
                disabled={isPlaying}
                className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-lg font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-[#00ff33]/20 text-[#00ff33] border border-[#00ff33]/40 cursor-wait'
                    : 'bg-[#ff007f] text-[#f3efe4] hover:bg-[#00ff33] hover:text-[#040705] magenta-glow'
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlaying ? 'Playing Scene...' : 'Play shadow scene'}</span>
              </button>

              <button
                onClick={handleResetScene}
                className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-widest border border-[#f3efe4]/40 text-[#f3efe4] hover:border-[#00ff33] hover:text-[#00ff33] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP "HOW TO GET AWAY WITH MURDER" GUIDE REVEAL */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f3efe4]/25 pb-4">
            <div>
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-[#f3efe4]">
                HOW TO GET AWAY WITH MURDER — <span className="text-[#00ff33]">STEP-BY-STEP</span>
              </h3>
              <p className="font-mono text-xs text-[#f3efe4]/75">
                Numbered cleanup protocol with pop-art murder props &amp; &lt;content&gt; slots ready for your PBL breakdown.
              </p>
            </div>

            <div className="font-mono text-xs flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#f3efe4]/30 bg-[#041d0e]/90">
              {sceneCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#00ff33]" />
                  <span className="text-[#00ff33]">SCENE COMPLETED // ALL STEPS UNLOCKED</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-[#ff007f]" />
                  <span className="text-[#f3efe4]/85">CLICK ANY STEP OR PLAY SCENE ABOVE</span>
                </>
              )}
            </div>
          </div>

          {/* Numbered List of Steps with Pop-Art Murder Prop Illustrations */}
          <div className="grid grid-cols-1 gap-6">
            {GUIDE_STEP_SLOTS.map((step, index) => {
              const isCurrentStep = activeCaptionIndex === index;
              const isRevealed = sceneCompleted || activeCaptionIndex >= index || activeCaptionIndex === -1;

              return (
                <div
                  key={step.stepNumber}
                  onClick={() => {
                    clearAllTimers();
                    setIsPlaying(false);
                    soundFX.playHoverTick(600);
                    setActiveCaptionIndex(index);
                    setScenePhase(STEP_TO_PHASE[index] ?? 'cleanup');
                  }}
                  className={`cursor-pointer rounded-2xl transition-all duration-500 p-6 sm:p-8 glass-dropdown-bar ${
                    isCurrentStep
                      ? 'border-[#ff007f] magenta-glow scale-[1.01]'
                      : isRevealed
                      ? 'hover:border-[#00ff33] neon-glow'
                      : 'opacity-55'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f3efe4]/15">
                    <div className="flex items-center gap-4">
                      {/* Neon-Green & Hot-Pink Step Marker */}
                      <span
                        className={`w-14 h-14 shrink-0 rounded-xl font-display text-3xl flex items-center justify-center font-bold shadow-md ${
                          index % 2 === 1
                            ? 'bg-[#ff007f] text-[#f3efe4]'
                            : 'bg-[#00ff33] text-[#040705]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[#00ff33]">
                          {step.itemsTag}
                        </span>
                        <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#f3efe4]">
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    {/* Step Prop Illustration + Slot Tag */}
                    <div className="flex items-center gap-3 self-start md:self-center">
                      {getStepIllustration(index)}
                      <span className="font-mono text-xs text-[#f3efe4] bg-[#ff007f] px-3 py-1 rounded font-bold">
                        STEP {step.stepNumber} // &lt;content&gt;
                      </span>
                    </div>
                  </div>

                  {/* Synced Caption Reference */}
                  <p className="mt-4 font-editorial italic text-lg sm:text-xl text-[#00ff33]">
                    “{step.captionLine}”
                  </p>

                  {/* `<content>` Placeholder Slot */}
                  <div className="mt-4 p-4 rounded-xl bg-[#040705]/70 border-l-4 border-[#ff007f] font-mono text-sm sm:text-base text-[#f3efe4] flex items-center justify-between">
                    <span>{step.content}</span>
                    <span className="text-[11px] text-[#f3efe4]/55 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#ff007f]" />
                      Edit in src/data/contentSlots.ts
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <BotanicalLagoonFooter className="h-24 sm:h-32 pt-4" />
      </div>
    </div>
  );
};
