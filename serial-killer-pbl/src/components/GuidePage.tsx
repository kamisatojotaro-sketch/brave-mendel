import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  Skull,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Eye,
  Droplets,
} from 'lucide-react';
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

type ScenePhase = 'idle' | 'step1_strike' | 'step2_soak' | 'step3_wrap' | 'step4_bridge' | 'step5_bleach';

const PHASE_ORDER: ScenePhase[] = [
  'step1_strike',
  'step2_soak',
  'step3_wrap',
  'step4_bridge',
  'step5_bleach',
];

const PHASE_META: Record<
  ScenePhase,
  {
    badge: string;
    shortTitle: string;
    location: string;
    forensicStatus: string;
    accent: string;
  }
> = {
  idle: {
    badge: 'STANDBY // CALL RECEIVED',
    shortTitle: 'Awaiting Reconstruction',
    location: 'FEMI’S APARTMENT // BATHROOM',
    forensicStatus: 'UNCONTAINED CRIME SCENE',
    accent: '#00ff00',
  },
  step1_strike: {
    badge: 'ACT 01 // THE STRIKE & KIT',
    shortTitle: '01. Strike & Supplies',
    location: 'BATHROOM FLOOR // 11:42 PM',
    forensicStatus: 'WEAPON: 9-INCH HUNTING KNIFE',
    accent: '#c0392b',
  },
  step2_soak: {
    badge: 'ACT 02 // CONTAINMENT',
    shortTitle: '02. Soak Up the Blood',
    location: 'TILE GROUT PERIMETER',
    forensicStatus: 'CLOTH ABSORPTION IN PROGRESS',
    accent: '#c0392b',
  },
  step3_wrap: {
    badge: 'ACT 03 // CONCEALMENT',
    shortTitle: '03. Wrap Like a Mummy',
    location: 'APARTMENT CORRIDOR -> TRUNK',
    forensicStatus: 'SHROUDED IN WHITE BEDSHEETS',
    accent: '#c0392b',
  },
  step4_bridge: {
    badge: 'ACT 04 // LAGOON DISPOSAL',
    shortTitle: '04. Third Mainland Bridge',
    location: 'THIRD MAINLAND BRIDGE // LAGOS LAGOON',
    forensicStatus: 'SUBMERGED BENEATH WATER HYACINTHS',
    accent: '#00ff00',
  },
  step5_bleach: {
    badge: 'ACT 05 // SANITIZATION',
    shortTitle: '05. Lemon & Bleach Scrub',
    location: 'BATHROOM // SPOTLESS',
    forensicStatus: '0.00% FORENSIC TRACE REMAINING',
    accent: '#00ff00',
  },
};

// Story-authentic clinical notes & forensic details for each step
const STEP_FORENSIC_DETAILS = [
  {
    propLabel: 'Industrial Bleach & Surgical Gloves',
    clinicalNote: 'Never use cold water first on porcelain; assemble bleach, lemon, sponges, and heavy cotton cloths before stepping inside.',
    dangerLevel: 'CRITICAL // FRESH SCENE',
    timeWindow: '00:05 MINS POST-CALL',
  },
  {
    propLabel: 'Blood-Stained Bathroom Cloths',
    clinicalNote: 'Contain the arterial pool immediately with thick folded cloths before hemoglobin seeps into the porous white tile grout.',
    dangerLevel: 'HIGH // STAIN RISK',
    timeWindow: '00:18 MINS POST-CALL',
  },
  {
    propLabel: 'Father’s 9-Inch Blade & Bedsheet Shroud',
    clinicalNote: 'Bind the limbs tightly in layered cotton sheets ("like an Egyptian mummy") so weight shifts predictably when lifting.',
    dangerLevel: 'HIGH // TRANSPORT PREP',
    timeWindow: '00:45 MINS POST-CALL',
  },
  {
    propLabel: 'Car Trunk & Third Mainland Bridge',
    clinicalNote: 'Wait for a gap in midnight traffic across the Third Mainland Bridge; let the dark Lagos Lagoon currents carry the evidence away.',
    dangerLevel: 'EXTREME // PUBLIC TRANSIT',
    timeWindow: '01:30 MINS POST-CALL',
  },
  {
    propLabel: 'Pure Bleach & Fresh Lemon Rinse',
    clinicalNote: 'Scrub every tile twice with undiluted bleach, then cut the harsh chemical fumes with fresh lemon so no visitor suspects a thing.',
    dangerLevel: 'CLEARED // SANITIZED',
    timeWindow: '02:15 MINS POST-CALL',
  },
];

export const GuidePage: React.FC<GuidePageProps> = ({ onNavigate, onCrimsonShiftChange }) => {
  const [scrollRatio, setScrollRatio] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [scenePhase, setScenePhase] = useState<ScenePhase>('idle');
  const [activeCaptionIndex, setActiveCaptionIndex] = useState<number>(-1);
  const [typedText, setTypedText] = useState<string>(
    '“Korede, I killed him. Come and help me.” — Press PLAY SHADOW SCENE or select any Act below...'
  );
  const [sceneCompleted, setSceneCompleted] = useState(false);
  const [sanitizedSteps, setSanitizedSteps] = useState<Record<number, boolean>>({});
  const [selectedPropIndex, setSelectedPropIndex] = useState<number>(0);

  const timersRef = useRef<number[]>([]);
  const stepCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearAllTimers();
  }, []);

  // Scroll listener to shift palette smoothly from Botanical Emerald (#083a1c) to Deep Crime-Scene Crimson (#3a0b10)
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 500);
      const ratio = Math.min(1, Math.max(0, scrollTop / (maxScroll * 0.62)));
      setScrollRatio(ratio);
      if (onCrimsonShiftChange) {
        onCrimsonShiftChange(ratio > 0.32);
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
    }, 22);

    return () => window.clearInterval(intervalId);
  }, [activeCaptionIndex]);

  const handleJumpToStep = (stepIdx: number, scrollToCard = false) => {
    clearAllTimers();
    setIsPlaying(false);
    soundFX.playGlitchSwitch();
    setActiveCaptionIndex(stepIdx);
    setSelectedPropIndex(stepIdx);
    setScenePhase(PHASE_ORDER[stepIdx] ?? 'step1_strike');
    if (scrollToCard && stepCardRefs.current[stepIdx]) {
      stepCardRefs.current[stepIdx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePlayShadowScene = () => {
    if (isPlaying) {
      clearAllTimers();
      setIsPlaying(false);
      return;
    }

    clearAllTimers();
    soundFX.playDramaticPulse();
    setIsPlaying(true);
    setSceneCompleted(false);

    // Act 1 (0ms)
    setScenePhase('step1_strike');
    setActiveCaptionIndex(0);
    setSelectedPropIndex(0);

    // Act 2 (3100ms)
    const t1 = window.setTimeout(() => {
      soundFX.playDramaticPulse();
      setScenePhase('step2_soak');
      setActiveCaptionIndex(1);
      setSelectedPropIndex(1);
    }, 3100);

    // Act 3 (6200ms)
    const t2 = window.setTimeout(() => {
      soundFX.playGlitchSwitch();
      setScenePhase('step3_wrap');
      setActiveCaptionIndex(2);
      setSelectedPropIndex(2);
    }, 6200);

    // Act 4 (9300ms)
    const t3 = window.setTimeout(() => {
      soundFX.playDramaticPulse();
      setScenePhase('step4_bridge');
      setActiveCaptionIndex(3);
      setSelectedPropIndex(3);
    }, 9300);

    // Act 5 (12400ms)
    const t4 = window.setTimeout(() => {
      soundFX.playHoverTick(880);
      setScenePhase('step5_bleach');
      setActiveCaptionIndex(4);
      setSelectedPropIndex(4);
    }, 12400);

    // Complete (15500ms)
    const t5 = window.setTimeout(() => {
      soundFX.playHoverTick(960);
      setIsPlaying(false);
      setSceneCompleted(true);
      setSanitizedSteps({ 0: true, 1: true, 2: true, 3: true, 4: true });
    }, 15500);

    timersRef.current.push(t1, t2, t3, t4, t5);
  };

  const handleResetScene = () => {
    clearAllTimers();
    soundFX.playHoverTick(420);
    setIsPlaying(false);
    setScenePhase('idle');
    setActiveCaptionIndex(-1);
    setSceneCompleted(false);
    setSanitizedSteps({});
    setTypedText(
      'SCENE RESET // PRESS "PLAY SHADOW SCENE" OR SELECT ANY ACT TO RECONSTRUCT...'
    );
  };

  const toggleStepSanitized = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFX.playHoverTick(780);
    setSanitizedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Interpolate background from Pure Noir Black (#050505) to Deep Crime-Scene Crimson (#3a0b10)
  const r = Math.round(5 + (58 - 5) * scrollRatio);
  const g = Math.round(5 + (11 - 5) * scrollRatio);
  const b = Math.round(5 + (16 - 5) * scrollRatio);
  const dynamicBg = `rgb(${r}, ${g}, ${b})`;

  // Distinct Pop-Art Murder Prop Icon per Cleanup Step
  const getStepIllustration = (index: number, sizeClass = 'w-16 h-16') => {
    switch (index) {
      case 0:
        return <BleachBottleProp className={`${sizeClass} shrink-0`} />;
      case 1:
        return <BloodyClothProp className={`${sizeClass} shrink-0`} />;
      case 2:
        return <HuntingKnifeProp className={`${sizeClass} shrink-0`} />;
      case 3:
        return <RubberGlovesProp className={`${sizeClass} shrink-0`} />;
      default:
        return <CrimsonSunglassesProp className="w-24 h-12 shrink-0" />;
    }
  };

  const currentMeta = PHASE_META[scenePhase];
  const sanitizedCount = Object.values(sanitizedSteps).filter(Boolean).length;

  return (
    <div
      style={{ backgroundColor: dynamicBg }}
      className="min-h-screen w-full pt-16 sm:pt-24 pb-20 px-3.5 sm:px-8 transition-colors duration-300 relative"
    >
      {/* Dynamic Atmospheric Crime-Scene Vignette Overlay */}
      <div
        style={{ opacity: scrollRatio * 0.78 }}
        className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_15%,#3a0b10_100%)] z-0"
      />

      {/* Floating Decorative Murder Props in Margins */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="hidden md:block absolute left-5 top-32 opacity-85 animate-float-slow">
          <BloodyClothProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
        <div
          style={{ animationDelay: '1.6s' }}
          className="hidden md:block absolute right-6 top-40 opacity-85 animate-float-slow"
        >
          <HuntingKnifeProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
        <div
          style={{ animationDelay: '2.8s' }}
          className="hidden lg:block absolute left-8 bottom-28 opacity-80 animate-float-slow"
        >
          <RubberGlovesProp className="w-20 h-20" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        {/* Top Sub-navigation & Live Scroll Atmosphere Meter */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1efe6]/25 pb-4">
          <button
            onClick={() => {
              soundFX.playHoverTick(500);
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a120c]/85 border border-[#f1efe6]/25 font-mono text-xs text-[#f1efe6] hover:border-[#c0392b] hover:text-[#c0392b] uppercase tracking-widest transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#00ff00]" />
            <span>BACK TO HARDCOVER</span>
          </button>

          {/* Live Scroll Color-Shift Meter */}
          <div className="flex items-center gap-3 font-mono text-xs bg-[#050505]/70 px-3.5 py-1.5 rounded-full border border-[#f1efe6]/20">
            <Droplets className={`w-3.5 h-3.5 ${scrollRatio > 0.35 ? 'text-[#c0392b]' : 'text-[#00ff00]'}`} />
            <span className="text-[#f1efe6]/75 uppercase hidden sm:inline">ATMOSPHERE:</span>
            <div className="w-24 sm:w-28 h-2.5 rounded-full border border-[#f1efe6]/35 bg-[#050505] overflow-hidden p-0.5">
              <div
                style={{
                  width: `${Math.max(12, Math.round(scrollRatio * 100))}%`,
                  backgroundColor: scrollRatio > 0.35 ? '#c0392b' : '#00ff00',
                }}
                className="h-full rounded-full transition-all duration-150"
              />
            </div>
            <span className={scrollRatio > 0.35 ? 'text-[#c0392b] font-bold' : 'text-[#00ff00] font-bold'}>
              {scrollRatio > 0.35 ? 'CRIMSON SCENE' : 'NOIR STANDBY'}
            </span>
          </div>
        </div>

        {/* Page Hero Header with Paint Splatters & Literary Pull-Quote */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end relative">
          <div className="lg:col-span-8 space-y-3 relative">
            <PaintSplatterBadge
              color="#c0392b"
              className="w-20 h-20 absolute -top-6 left-60 opacity-75"
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c0392b] text-[#f1efe6] font-mono font-bold text-xs uppercase tracking-widest shadow-md">
              <Skull className="w-3.5 h-3.5" />
              <span>MODULE 01 // KOREDE’S 5-STEP CLEANUP MANUAL</span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-8xl uppercase tracking-wide text-[#f1efe6] leading-[0.92]">
              THE <span className="text-[#00ff00] neon-text-glow">CRIME-SCENE</span> GUIDE
            </h2>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#c0392b]">
              “Korede, I killed him. Come and help me.”
            </p>
            <p className="font-sans text-sm sm:text-base text-[#f1efe6]/85 max-w-2xl leading-relaxed">
              When Ayoola plunges their late father’s 9-inch hunting knife into her third boyfriend, Korede doesn’t call the Lagos police—she reaches for the bleach. Explore the 5-act shadow theatre reconstruction and forensic protocol below.
            </p>
          </div>

          {/* Right Quick-Stats Dossier Box */}
          <div className="lg:col-span-4 glass-dropdown-bar rounded-2xl p-4 sm:p-5 space-y-2.5 border-l-4 border-l-[#00ff00]">
            <div className="flex items-center justify-between font-mono text-[11px] text-[#00ff00]">
              <span>INCIDENT LOG // CASE #03</span>
              <span className="text-[#c0392b] font-bold">VICTIM: FEMI</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <div className="p-2 rounded-lg bg-[#050505]/70 border border-[#f1efe6]/15">
                <span className="block text-[9px] text-[#f1efe6]/60">CAUSE OF DEATH</span>
                <span className="text-[#c0392b] font-bold">3 KNIFE WOUNDS</span>
              </div>
              <div className="p-2 rounded-lg bg-[#050505]/70 border border-[#f1efe6]/15">
                <span className="block text-[9px] text-[#f1efe6]/60">DISPOSAL SITE</span>
                <span className="text-[#00ff00] font-bold">LAGOS LAGOON</span>
              </div>
            </div>
            <div className="pt-1 flex items-center justify-between font-mono text-[11px]">
              <span className="text-[#f1efe6]/75">SANITIZATION PROGRESS:</span>
              <span className="text-[#00ff00] font-bold">{sanitizedCount} / 5 STEPS CLEANED</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            5-ACT CINEMATIC SHADOW-SILHOUETTE THEATRE
           ===================================================================== */}
        <div className="rounded-2xl border-2 border-[#f1efe6]/40 bg-[#050505]/95 shadow-[0_24px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Stage Header Bar */}
          <div className="px-5 sm:px-6 py-3.5 bg-gradient-to-r from-[#063318] via-[#0a120c] to-[#3a0b10] border-b border-[#f1efe6]/20 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex items-center gap-2.5 text-[#00ff00]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c0392b] animate-ping" />
              <span className="font-bold tracking-wider">SHADOW THEATRE // {currentMeta.badge}</span>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#f1efe6]/75 hidden sm:inline">
                LOCATION: <strong className="text-[#f1efe6]">{currentMeta.location}</strong>
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#c0392b]/20 border border-[#c0392b] text-[#c0392b] font-bold">
                {currentMeta.forensicStatus}
              </span>
            </div>
          </div>

          {/* Interactive 5-Act Scrubber Tabs (Horizontal Touch Strip on Mobile, 5-Col Grid on Desktop) */}
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-5 bg-[#041209] border-b border-[#f1efe6]/15">
            {PHASE_ORDER.map((phaseKey, idx) => {
              const active = scenePhase === phaseKey;
              const meta = PHASE_META[phaseKey];
              return (
                <button
                  key={phaseKey}
                  onClick={() => handleJumpToStep(idx)}
                  className={`shrink-0 min-w-[140px] sm:min-w-0 px-3 py-2.5 font-mono text-[11px] text-left transition-all border-r border-[#f1efe6]/10 flex items-center justify-between gap-1.5 ${
                    active
                      ? 'bg-[#c0392b] text-[#f1efe6] font-bold shadow-inner'
                      : 'text-[#f1efe6]/70 hover:bg-[#083018] hover:text-[#00ff00]'
                  }`}
                >
                  <span className="truncate">{meta.shortTitle}</span>
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      active ? 'bg-[#00ff00]' : 'bg-[#f1efe6]/25'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Animated SVG 5-Act Shadow Silhouette Viewport */}
          <div className="relative h-56 sm:h-80 md:h-[400px] w-full flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#0d3d20_0%,#050505_78%)]">
            {/* Dynamic Phase Lighting Backdrop */}
            <div
              className={`absolute inset-0 transition-all duration-700 pointer-events-none ${
                scenePhase === 'step1_strike' || scenePhase === 'step2_soak'
                  ? 'bg-[radial-gradient(circle_at_center,rgba(192, 57, 43,0.38)_0%,rgba(217,4,41,0.2)_45%,transparent_72%)]'
                  : scenePhase === 'step4_bridge'
                  ? 'bg-[radial-gradient(circle_at_50%_25%,rgba(243,239,228,0.18)_0%,rgba(13,92,46,0.35)_55%,#050505_90%)]'
                  : 'bg-[radial-gradient(circle_at_center,rgba(0, 255, 0,0.18)_0%,transparent_70%)]'
              }`}
            />

            {/* Multi-Act Noir & Gouache Cutout SVG Stage */}
            <svg viewBox="0 0 720 340" className="w-full h-full max-w-4xl px-4 select-none">
              {/* =============================================================
                  BACKGROUND ENVIRONMENT LAYER (Bathroom Tiles vs. Third Mainland Bridge)
                 ============================================================= */}
              {scenePhase !== 'step4_bridge' ? (
                <g opacity="0.35">
                  {/* Bathroom Tile Grid & Mirror Silhouette */}
                  <line x1="60" y1="40" x2="60" y2="280" stroke="#258e47" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="660" y1="40" x2="660" y2="280" stroke="#258e47" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="60" y1="100" x2="660" y2="100" stroke="#258e47" strokeWidth="0.8" strokeOpacity="0.5" />
                  <line x1="60" y1="180" x2="660" y2="180" stroke="#258e47" strokeWidth="0.8" strokeOpacity="0.5" />
                  {/* Bathroom Mirror & Sink Frame */}
                  <rect x="295" y="28" width="130" height="82" rx="8" fill="#0a120c" stroke="#f1efe6" strokeWidth="1.5" />
                  <path d="M315 95 L375 40" stroke="#f1efe6" strokeWidth="1.5" strokeOpacity="0.4" />
                  {/* Louver Window Moonbeams (Top Left) */}
                  <rect x="95" y="32" width="75" height="65" fill="none" stroke="#f1efe6" strokeWidth="1.2" />
                  <line x1="95" y1="48" x2="170" y2="48" stroke="#f1efe6" strokeWidth="1.2" />
                  <line x1="95" y1="64" x2="170" y2="64" stroke="#f1efe6" strokeWidth="1.2" />
                  <line x1="95" y1="80" x2="170" y2="80" stroke="#f1efe6" strokeWidth="1.2" />
                </g>
              ) : (
                /* ACT 04: THIRD MAINLAND BRIDGE & LAGOS LAGOON MOONLIGHT */
                <g>
                  {/* Lagoon Full Moon with Hot-Pink Rim */}
                  <circle cx="560" cy="68" r="28" fill="#f1efe6" fillOpacity="0.9" />
                  <path d="M535 76 A 28 28 0 0 0 584 82 Z" fill="#c0392b" />
                  {/* Third Mainland Bridge Deck & Concrete Piers */}
                  <line x1="20" y1="155" x2="700" y2="155" stroke="#f1efe6" strokeWidth="4" />
                  <line x1="20" y1="145" x2="700" y2="145" stroke="#00ff00" strokeWidth="1.5" strokeDasharray="10 6" />
                  <rect x="130" y="155" width="18" height="125" fill="#050505" stroke="#f1efe6" strokeWidth="1.5" />
                  <rect x="350" y="155" width="18" height="125" fill="#050505" stroke="#f1efe6" strokeWidth="1.5" />
                  <rect x="570" y="155" width="18" height="125" fill="#050505" stroke="#f1efe6" strokeWidth="1.5" />
                  {/* Korede's Sedan Silhouette Parked on Bridge */}
                  <path
                    d="M205 152 L222 128 L278 128 L295 142 L315 144 L315 154 L205 154 Z"
                    fill="#050505"
                    stroke="#00ff00"
                    strokeWidth="2"
                  />
                  {/* Open Car Trunk Lid */}
                  <line x1="205" y1="138" x2="188" y2="118" stroke="#c0392b" strokeWidth="2.5" />
                  {/* Falling Mummy-Wrapped Package Plunging into the Lagoon */}
                  <g className="animate-bounce">
                    <rect
                      x="235"
                      y="185"
                      width="70"
                      height="20"
                      rx="10"
                      transform="rotate(28 270 195)"
                      fill="#f1efe6"
                      stroke="#c0392b"
                      strokeWidth="2"
                    />
                    <line x1="252" y1="180" x2="245" y2="202" stroke="#050505" strokeWidth="2" />
                    <line x1="272" y1="186" x2="265" y2="208" stroke="#050505" strokeWidth="2" />
                    <line x1="290" y1="192" x2="283" y2="212" stroke="#050505" strokeWidth="2" />
                  </g>
                  {/* Lagoon Water Caustic Swirls & Splash Below Bridge */}
                  <path
                    d="M 40 265 C 160 245, 280 285, 410 260 C 530 240, 620 275, 690 255"
                    stroke="#f1efe6"
                    strokeWidth="2"
                  />
                  <path
                    d="M 80 290 C 210 270, 340 305, 480 282 C 580 265, 640 295, 700 280"
                    stroke="#00ff00"
                    strokeWidth="1.5"
                    strokeOpacity="0.65"
                  />
                  <circle cx="265" cy="248" r="5" fill="#c0392b" />
                  <circle cx="295" cy="242" r="4" fill="#00ff00" />
                  <text x="360" y="318" textAnchor="middle" fill="#00ff00" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    // THIRD MAINLAND BRIDGE // MIDNIGHT LAGOON DROP //
                  </text>
                </g>
              )}

              {/* Botanical Reeds Framing Stage Corners */}
              <path d="M28 280 Q40 215 20 172 Q48 220 42 280 Z" fill="#f1efe6" opacity="0.45" />
              <path d="M46 280 Q62 225 78 188 Q64 235 56 280 Z" fill="#c0392b" opacity="0.55" />
              <path d="M692 280 Q680 215 700 172 Q672 220 678 280 Z" fill="#f1efe6" opacity="0.45" />
              <path d="M674 280 Q658 225 642 188 Q656 235 664 280 Z" fill="#00ff00" opacity="0.45" />

              {/* Main Floor Baseline (For Bathroom Scenes) */}
              {scenePhase !== 'step4_bridge' && (
                <line x1="25" y1="280" x2="695" y2="280" stroke="#f1efe6" strokeWidth="2" strokeOpacity="0.5" />
              )}

              {/* =============================================================
                  ACT 01 & IDLE: AYOOLA vs. FEMI + KOREDE ARRIVING WITH SUPPLIES
                 ============================================================= */}
              {(scenePhase === 'idle' || scenePhase === 'step1_strike') && (
                <g>
                  {/* Ayoola Silhouette (Left-Center) */}
                  <g
                    style={{
                      transform:
                        scenePhase === 'step1_strike'
                          ? 'translate(225px, 68px)'
                          : 'translate(175px, 68px)',
                      transition: 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  >
                    {/* Headwrap & Head Silhouette */}
                    <circle cx="44" cy="40" r="22" fill="#050505" stroke="#c0392b" strokeWidth="2.8" />
                    <path d="M24 34 Q44 12 66 30" stroke="#00ff00" strokeWidth="2.5" fill="none" />
                    {/* Dress Torso Silhouette */}
                    <path d="M16 212 L28 68 L60 68 L74 212 Z" fill="#050505" stroke="#c0392b" strokeWidth="2.8" />
                    {/* Raised Arm Brandishing Father's 9-Inch Curved Hunting Knife */}
                    <g
                      style={{
                        transformOrigin: '58px 80px',
                        transform: scenePhase === 'step1_strike' ? 'rotate(42deg)' : 'rotate(-22deg)',
                        transition: 'transform 0.45s ease-in-out',
                      }}
                    >
                      <line x1="58" y1="80" x2="102" y2="44" stroke="#f1efe6" strokeWidth="6" strokeLinecap="round" />
                      <path
                        d="M98 46 L142 14 C144 26, 132 42, 114 54 Z"
                        fill={scenePhase === 'step1_strike' ? '#c0392b' : '#00ff00'}
                      />
                    </g>
                    <text x="45" y="234" textAnchor="middle" fill="#c0392b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      [AYOOLA]
                    </text>
                  </g>

                  {/* Strike Slash Arc & Crimson Splatter Burst */}
                  {scenePhase === 'step1_strike' && (
                    <g>
                      <path
                        d="M 320 75 Q 395 115 365 195"
                        stroke="#c0392b"
                        strokeWidth="4"
                        fill="none"
                        strokeLinecap="round"
                      />
                      <circle cx="372" cy="122" r="9" fill="#c0392b" />
                      <circle cx="395" cy="104" r="6" fill="#c0392b" />
                      <circle cx="408" cy="138" r="7" fill="#c0392b" />
                      <circle cx="354" cy="148" r="5" fill="#00ff00" />
                    </g>
                  )}

                  {/* Femi Silhouette (Right-Center) */}
                  <g
                    style={{
                      transform:
                        scenePhase === 'step1_strike'
                          ? 'translate(390px, 86px) rotate(18deg)'
                          : 'translate(370px, 68px) rotate(0deg)',
                      transition: 'all 0.65s ease-in-out',
                    }}
                  >
                    <circle cx="44" cy="40" r="21" fill="#050505" stroke="#f1efe6" strokeWidth="2.4" />
                    <path d="M18 212 L28 68 L60 68 L70 212 Z" fill="#050505" stroke="#f1efe6" strokeWidth="2.4" />
                    <text x="44" y="234" textAnchor="middle" fill="#f1efe6" fontSize="11" fontFamily="monospace">
                      [FEMI // VICTIM #03]
                    </text>
                  </g>

                  {/* Korede Silhouette Entering Left with Bleach & Bucket during Step 1 */}
                  {scenePhase === 'step1_strike' && (
                    <g transform="translate(72, 78)">
                      <circle cx="32" cy="34" r="18" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                      <path d="M12 202 L20 58 L44 58 L52 202 Z" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                      {/* Bleach Jug in Korede's Hand */}
                      <rect x="52" y="112" width="20" height="28" rx="3" fill="#f1efe6" stroke="#c0392b" strokeWidth="2" />
                      <text x="32" y="224" textAnchor="middle" fill="#00ff00" fontSize="10" fontFamily="monospace" fontWeight="bold">
                        [KOREDE + KIT]
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* =============================================================
                  ACT 02: SOAK UP THE BLOOD BEFORE IT STAINS THE GROUT
                 ============================================================= */}
              {scenePhase === 'step2_soak' && (
                <g>
                  {/*Expanding Crimson & Hot-Pink Blood Pool on Bathroom Tiles */}
                  <ellipse cx="420" cy="266" rx="135" ry="18" fill="#c0392b" fillOpacity="0.85" />
                  <ellipse cx="410" cy="266" rx="95" ry="12" fill="#c0392b" />

                  {/* Chalk Body Outline on Floor */}
                  <ellipse cx="330" cy="264" rx="20" ry="11" fill="none" stroke="#f1efe6" strokeWidth="2.2" strokeDasharray="5 3" />
                  <path
                    d="M352 258 L505 252 L520 272 L352 274 Z"
                    fill="rgba(4, 7, 5, 0.75)"
                    stroke="#f1efe6"
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                  />

                  {/* Korede Kneeling with Cream Bathroom Cloths Pressing the Spill */}
                  <g transform="translate(210, 125)">
                    <circle cx="45" cy="32" r="19" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                    <path d="M18 155 L25 56 L62 56 L78 135 L45 155 Z" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                    {/* Extended Arms Pressing Cream Cloth Onto the Pool */}
                    <line x1="58" y1="82" x2="112" y2="132" stroke="#c0392b" strokeWidth="6" strokeLinecap="round" />
                    <path d="M98 126 L148 122 L156 142 L92 142 Z" fill="#f1efe6" stroke="#c0392b" strokeWidth="2" />
                    <text x="48" y="178" textAnchor="middle" fill="#00ff00" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      [KOREDE // SOAKING GROUT SPILL]
                    </text>
                  </g>
                </g>
              )}

              {/* =============================================================
                  ACT 03: WRAP THE BODY "LIKE A MUMMY" IN WHITE BEDSHEETS
                 ============================================================= */}
              {scenePhase === 'step3_wrap' && (
                <g>
                  {/* Mummy-Wrapped Body Silhouette on the Bathroom Floor */}
                  <g transform="translate(250, 228)">
                    <rect x="0" y="12" width="230" height="36" rx="18" fill="#f1efe6" stroke="#050505" strokeWidth="3" />
                    <circle cx="28" cy="30" r="16" fill="#f1efe6" stroke="#050505" strokeWidth="2.5" />
                    {/* Mummy Binding Straps Across Shroud */}
                    <line x1="55" y1="12" x2="45" y2="48" stroke="#050505" strokeWidth="3" />
                    <line x1="90" y1="12" x2="80" y2="48" stroke="#c0392b" strokeWidth="3" />
                    <line x1="125" y1="12" x2="115" y2="48" stroke="#050505" strokeWidth="3" />
                    <line x1="160" y1="12" x2="150" y2="48" stroke="#00ff00" strokeWidth="3" />
                    <line x1="195" y1="12" x2="185" y2="48" stroke="#050505" strokeWidth="3" />
                    <text x="115" y="72" textAnchor="middle" fill="#00ff00" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      // WRAPPED TIGHTLY IN SHEETS “LIKE A MUMMY” //
                    </text>
                  </g>

                  {/* Korede Tying the Shroud (Left) */}
                  <g transform="translate(145, 95)">
                    <circle cx="38" cy="34" r="19" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                    <path d="M16 185 L24 58 L54 58 L64 185 Z" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
                    <text x="38" y="205" textAnchor="middle" fill="#00ff00" fontSize="10" fontFamily="monospace">
                      [KOREDE]
                    </text>
                  </g>

                  {/* Ayoola Sitting Unbothered Checking Her Phone (Right) */}
                  <g transform="translate(525, 95)">
                    <circle cx="38" cy="34" r="19" fill="#050505" stroke="#c0392b" strokeWidth="2.5" />
                    <path d="M16 185 L24 58 L54 58 L64 185 Z" fill="#050505" stroke="#c0392b" strokeWidth="2.5" />
                    {/* Glowing Phone Screen in Ayoola's Hand */}
                    <rect x="2" y="72" width="12" height="20" rx="2" fill="#00ff00" />
                    <text x="38" y="205" textAnchor="middle" fill="#c0392b" fontSize="10" fontFamily="monospace">
                      [AYOOLA // SNAPCHAT]
                    </text>
                  </g>
                </g>
              )}

              {/* =============================================================
                  ACT 05: FINAL LEMON & BLEACH SCRUB-DOWN (ZERO TRACE)
                 ============================================================= */}
              {scenePhase === 'step5_bleach' && (
                <g>
                  {/* Sparkling Neon-Green & Hot-Pink Chemical Foam Covering Floor */}
                  <ellipse cx="360" cy="268" rx="190" ry="16" fill="#00ff00" fillOpacity="0.32" />
                  <circle cx="230" cy="252" r="10" fill="#00ff00" />
                  <circle cx="255" cy="242" r="7" fill="#c0392b" />
                  <circle cx="310" cy="248" r="12" fill="#f1efe6" />
                  <circle cx="365" cy="240" r="9" fill="#00ff00" />
                  <circle cx="420" cy="246" r="11" fill="#c0392b" />
                  <circle cx="475" cy="238" r="8" fill="#00ff00" />
                  <circle cx="515" cy="252" r="6" fill="#f1efe6" />

                  {/* Korede Standing Victorious with Bleach Bottle & Lemon */}
                  <g transform="translate(318, 68)">
                    <circle cx="42" cy="38" r="20" fill="#050505" stroke="#00ff00" strokeWidth="2.8" />
                    <path d="M16 212 L26 64 L58 64 L68 212 Z" fill="#050505" stroke="#00ff00" strokeWidth="2.8" />
                    <rect x="70" y="96" width="24" height="34" rx="4" fill="#f1efe6" stroke="#00ff00" strokeWidth="2.2" />
                    <text x="42" y="236" textAnchor="middle" fill="#00ff00" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      // LEMON &amp; BLEACH SANITIZATION COMPLETE //
                    </text>
                  </g>
                </g>
              )}
            </svg>

            {/* Top-Right Active Step Indicator Pill */}
            {activeCaptionIndex >= 0 && (
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-[#c0392b] font-mono font-bold text-xs text-[#f1efe6] shadow-lg flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                <span>SYNCED ACT 0{activeCaptionIndex + 1} / 05</span>
              </div>
            )}
          </div>

          {/* Synced Typewriter Caption & Playback Controls Bar */}
          <div className="px-4 sm:px-6 py-4 bg-[#050505] border-t border-[#f1efe6]/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="font-mono text-xs sm:text-base text-[#00ff00] min-h-[60px] sm:min-h-[28px] flex items-center leading-relaxed">
              <span className="text-[#c0392b] mr-2 font-bold shrink-0">&gt;</span>
              <span>
                {typedText}
                <span className="inline-block w-2.5 h-4 bg-[#c0392b] ml-1 align-middle cursor-blink" />
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto">
              <button
                onClick={handlePlayShadowScene}
                className={`flex-1 lg:flex-initial px-5 py-2.5 rounded-xl font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                  isPlaying
                    ? 'bg-[#00ff00] text-[#050505] neon-glow'
                    : 'bg-[#c0392b] text-[#f1efe6] hover:bg-[#00ff00] hover:text-[#050505] magenta-glow'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Pause Reconstruction' : 'Play shadow scene'}</span>
              </button>

              <button
                onClick={handleResetScene}
                className="px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-widest border border-[#f1efe6]/35 text-[#f1efe6] hover:border-[#00ff00] hover:text-[#00ff00] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            INTERACTIVE "KOREDE'S FORENSIC CLEANUP KIT" PROP INSPECTOR
            Lets the user click the illustrated knives, bloody cloths, bleach,
            and rubber gloves to inspect their role in the novel!
           ===================================================================== */}
        <div className="glass-dropdown-bar rounded-2xl p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f1efe6]/20 pb-3">
            <div>
              <span className="font-geometric text-[10px] uppercase tracking-[0.26em] text-[#c0392b] font-bold">
                INTERACTIVE EVIDENCE LOCKER // CLICK ANY ITEM TO INSPECT
              </span>
              <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#f1efe6]">
                KOREDE’S <span className="text-[#00ff00]">CLEANUP &amp; EVIDENCE</span> KIT
              </h3>
            </div>
            <span className="font-mono text-xs text-[#00ff00] bg-[#050505]/70 px-3 py-1 rounded-full border border-[#00ff00]/35">
              5 STORY ARTIFACTS
            </span>
          </div>

          {/* 5 Interactive Prop Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {GUIDE_STEP_SLOTS.map((step, idx) => {
              const isSelected = selectedPropIndex === idx;
              const detail = STEP_FORENSIC_DETAILS[idx];
              return (
                <button
                  key={step.stepNumber}
                  onClick={() => handleJumpToStep(idx)}
                  className={`group text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-300 flex flex-col items-center text-center gap-2 ${
                    idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    isSelected
                      ? 'bg-[#083d1e]/90 border-[#c0392b] magenta-glow -translate-y-1'
                      : 'bg-[#050505]/60 border-[#f1efe6]/20 hover:border-[#00ff00]'
                  }`}
                >
                  <div className="h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getStepIllustration(idx, 'w-14 h-14')}
                  </div>
                  <span className="font-mono text-[10px] text-[#00ff00] uppercase tracking-wider font-bold">
                    ARTIFACT 0{idx + 1}
                  </span>
                  <span className="font-sans text-xs font-bold text-[#f1efe6] line-clamp-2">
                    {detail.propLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Artifact Clinical Callout */}
          <div className="p-4 rounded-xl bg-[#050505]/80 border-l-4 border-[#00ff00] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#c0392b] font-bold">
                <span>{STEP_FORENSIC_DETAILS[selectedPropIndex].propLabel}</span>
                <span>//</span>
                <span className="text-[#00ff00]">{STEP_FORENSIC_DETAILS[selectedPropIndex].timeWindow}</span>
              </div>
              <p className="font-editorial italic text-base sm:text-lg text-[#f1efe6]">
                “{STEP_FORENSIC_DETAILS[selectedPropIndex].clinicalNote}”
              </p>
            </div>
            <button
              onClick={() => handleJumpToStep(selectedPropIndex, true)}
              className="shrink-0 px-3.5 py-2 rounded-lg bg-[#c0392b] text-[#f1efe6] hover:bg-[#00ff00] hover:text-[#050505] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Jump to Step 0{selectedPropIndex + 1} &darr;
            </button>
          </div>
        </div>

        {/* =====================================================================
            STEP-BY-STEP "HOW TO GET AWAY WITH MURDER" PROTOCOL CARDS
           ===================================================================== */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#f1efe6]/25 pb-4">
            <div>
              <h3 className="font-display text-4xl sm:text-5xl uppercase tracking-wide text-[#f1efe6]">
                HOW TO GET AWAY WITH MURDER — <span className="text-[#00ff00]">STEP-BY-STEP</span>
              </h3>
              <p className="font-mono text-xs text-[#f1efe6]/75">
                Click any protocol card to sync the Shadow Theatre above, toggle sanitization status, or populate your &lt;content&gt; slots.
              </p>
            </div>

            <div className="font-mono text-xs flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#f1efe6]/30 bg-[#0a120c]/90">
              {sceneCompleted || sanitizedCount === 5 ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#00ff00]" />
                  <span className="text-[#00ff00] font-bold">SCENE SANITIZED // ZERO EVIDENCE LEFT</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-4 h-4 text-[#c0392b]" />
                  <span className="text-[#f1efe6]/85">CLICK ANY STEP TO RECONSTRUCT</span>
                </>
              )}
            </div>
          </div>

          {/* Numbered List of 5 Steps */}
          <div className="grid grid-cols-1 gap-6">
            {GUIDE_STEP_SLOTS.map((step, index) => {
              const isCurrentStep = activeCaptionIndex === index;
              const isSanitized = !!sanitizedSteps[index];
              const forensic = STEP_FORENSIC_DETAILS[index];

              return (
                <div
                  key={step.stepNumber}
                  ref={(el) => {
                    stepCardRefs.current[index] = el;
                  }}
                  onClick={() => handleJumpToStep(index)}
                  className={`cursor-pointer rounded-2xl transition-all duration-500 p-4 sm:p-8 glass-dropdown-bar relative overflow-hidden ${
                    isCurrentStep
                      ? 'border-[#c0392b] magenta-glow scale-[1.01]'
                      : 'hover:border-[#00ff00] neon-glow'
                  }`}
                >
                  {/* Top Accent Strip */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 ${
                      index % 2 === 1
                        ? 'bg-gradient-to-r from-[#c0392b] via-[#00ff00] to-[#c0392b]'
                        : 'bg-gradient-to-r from-[#00ff00] via-[#c0392b] to-[#00ff00]'
                    }`}
                  />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#f1efe6]/15">
                    <div className="flex items-center gap-4">
                      {/* Neon-Green & Hot-Pink Step Number Badge */}
                      <span
                        className={`w-14 h-14 shrink-0 rounded-xl font-display text-3xl flex items-center justify-center font-bold shadow-md ${
                          index % 2 === 1
                            ? 'bg-[#c0392b] text-[#f1efe6]'
                            : 'bg-[#00ff00] text-[#050505]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-[#00ff00] font-bold">
                            {step.itemsTag}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#050505]/80 text-[#c0392b] border border-[#c0392b]/40">
                            {forensic.timeWindow}
                          </span>
                        </div>
                        <h4 className="font-editorial text-2xl sm:text-3xl font-bold text-[#f1efe6] mt-0.5">
                          {step.title}
                        </h4>
                      </div>
                    </div>

                    {/* Right Side: Illustrated Murder Prop + Sanitize Toggle Button */}
                    <div className="flex items-center gap-3 self-start md:self-center">
                      {getStepIllustration(index)}
                      <button
                        onClick={(e) => toggleStepSanitized(index, e)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                          isSanitized
                            ? 'bg-[#00ff00] text-[#050505] border-[#00ff00]'
                            : 'bg-[#050505]/70 text-[#f1efe6] border-[#f1efe6]/30 hover:border-[#c0392b] hover:text-[#c0392b]'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{isSanitized ? 'SANITIZED' : 'MARK CLEANED'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Synced Caption Quote & Korede Clinical Note */}
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-7">
                      <p className="font-editorial italic text-lg sm:text-xl text-[#00ff00]">
                        “{step.captionLine}”
                      </p>
                    </div>
                    <div className="lg:col-span-5 p-3 rounded-xl bg-[#050505]/55 border border-[#f1efe6]/15 font-sans text-xs text-[#f1efe6]/85">
                      <strong className="text-[#c0392b] font-mono uppercase block text-[10px] mb-0.5">
                        KOREDE’S CLINICAL NOTE:
                      </strong>
                      {forensic.clinicalNote}
                    </div>
                  </div>

                  {/* `<content>` Placeholder Slot */}
                  <div className="mt-4 p-4 rounded-xl bg-[#050505]/75 border-l-4 border-[#c0392b] font-mono text-sm sm:text-base text-[#f1efe6] flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#c0392b]/20 text-[#c0392b] text-xs font-bold">
                        STEP {step.stepNumber} SLOT
                      </span>
                      <span>{step.content}</span>
                    </div>
                    <span className="text-[11px] text-[#f1efe6]/55 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#c0392b]" />
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
