import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShieldAlert, Crosshair, Sparkles, ArrowLeft } from 'lucide-react';
import { CHARACTER_SLOTS, CharacterSlot, PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';

interface CharactersPageProps {
  onNavigate: (page: PageId) => void;
}

export const CharactersPage: React.FC<CharactersPageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [neonFlash, setNeonFlash] = useState(false);

  // Touch swipe tracking for mobile responsiveness
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const triggerSlideChange = useCallback((nextIndex: number) => {
    soundFX.playGlitchSwitch();
    setIsGlitching(true);
    setNeonFlash(true);

    setTimeout(() => {
      setCurrentIndex(nextIndex);
    }, 110);

    setTimeout(() => {
      setNeonFlash(false);
    }, 220);

    setTimeout(() => {
      setIsGlitching(false);
    }, 390);
  }, []);

  const handleNext = useCallback(() => {
    const next = (currentIndex + 1) % CHARACTER_SLOTS.length;
    triggerSlideChange(next);
  }, [currentIndex, triggerSlideChange]);

  const handlePrev = useCallback(() => {
    const prev = (currentIndex - 1 + CHARACTER_SLOTS.length) % CHARACTER_SLOTS.length;
    triggerSlideChange(prev);
  }, [currentIndex, triggerSlideChange]);

  // Keyboard Left/Right navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const character = CHARACTER_SLOTS[currentIndex];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full pt-24 pb-12 px-4 sm:px-8 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Brief Neon-Green Glitch Flash Overlay on Slide Transition */}
      <div
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-200 bg-[#00ff00]/20 mix-blend-screen ${
          neonFlash ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Giant Background Watermark Name (GTA Style) */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden opacity-[0.04] z-0">
        <span className="font-display text-[26vw] leading-none uppercase tracking-tighter text-[#00ff00] -rotate-6 whitespace-nowrap">
          {character.name}
        </span>
      </div>

      {/* Top Sub-bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 border-b border-[#00ff00]/25 pb-4">
        <button
          onClick={() => {
            soundFX.playHoverTick(500);
            onNavigate('home');
          }}
          className="inline-flex items-center gap-2 font-mono text-xs text-[#f1efe6]/70 hover:text-[#00ff00] transition-colors uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 text-[#00ff00]" />
          <span>BACK TO LANDING</span>
        </button>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#00ff00] uppercase tracking-widest">
            CHARACTER SELECT // SLIDE 0{currentIndex + 1} OF 0{CHARACTER_SLOTS.length}
          </span>
          <span className="hidden sm:inline text-[#f1efe6]/40">[USE ← → KEYS OR SWIPE]</span>
        </div>
      </div>

      {/* Main GTA-Style Character Intro Carousel Stage */}
      <div
        className={`relative z-10 max-w-7xl mx-auto w-full my-auto py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
          isGlitching ? 'animate-glitch' : ''
        }`}
      >
        {/* Left Column: Stylized Vector Silhouette / Portrait Placeholder (5 cols) */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] border-2 border-[#00ff00] bg-[#050505]/90 neon-glow overflow-hidden flex flex-col justify-between p-6">
            {/* Top HUD tags inside portrait frame */}
            <div className="flex items-center justify-between font-mono text-[11px] text-[#00ff00] z-10">
              <span>FILE // {character.id.toUpperCase()}</span>
              <span className="px-2 py-0.5 bg-[#00ff00]/15 border border-[#00ff00]/40">
                {character.status}
              </span>
            </div>

            {/* Diagonal Neon Accent Stripe */}
            <div className="absolute -right-16 top-12 w-64 h-12 bg-[#00ff00]/10 -rotate-45 border-y border-[#00ff00]/30 pointer-events-none" />

            {/* Stylized Character Silhouette SVG */}
            <div className="my-auto flex items-center justify-center relative z-10">
              <CharacterSilhouette type={character.silhouetteType} />
            </div>

            {/* Bottom Signature Item Bar */}
            <div className="z-10 border-t border-[#00ff00]/30 pt-3 flex items-center justify-between font-mono text-xs">
              <span className="text-[#f1efe6]/60 uppercase">SIGNATURE:</span>
              <span className="text-[#00ff00] font-semibold text-right">{character.signatureItem}</span>
            </div>
          </div>
        </div>

        {/* Right Column: GTA Character Intro Typography, Stats & `<main character intros>` Slot (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff00] text-[#050505] font-mono font-bold text-xs uppercase tracking-widest mb-3 -skew-x-12">
              <Crosshair className="w-3.5 h-3.5" />
              <span>{character.roleTitle}</span>
            </div>

            {/* Huge Slanted GTA-Style Name */}
            <h2 className="font-display text-7xl sm:text-8xl md:text-9xl uppercase tracking-wider text-[#f1efe6] leading-[0.88] -skew-x-6 neon-text-glow">
              {character.name}
            </h2>

            <p className="mt-3 font-mono italic text-sm sm:text-base text-[#00ff00]/90">
              {character.tagline}
            </p>
          </div>

          {/* `<main character intros>` Bio Content Slot */}
          <div className="relative border-2 border-[#00ff00]/60 bg-[#050505]/95 p-6 neon-glow">
            <div className="flex items-center justify-between border-b border-[#00ff00]/25 pb-2 mb-4 font-mono text-xs text-[#00ff00]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CHARACTER BIO SLOT // EDIT IN src/data/contentSlots.ts</span>
              </span>
              <span>[DOSSIER_0{currentIndex + 1}]</span>
            </div>

            <div className="font-mono text-base sm:text-lg text-[#f1efe6] leading-relaxed py-2 px-4 bg-[#00ff00]/5 border-l-4 border-[#00ff00]">
              {character.bio}
            </div>
          </div>

          {/* GTA-Style Character Attribute Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {character.stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-[#00ff00]/30 bg-[#050505]/80 p-3.5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between font-mono text-[11px] mb-2">
                  <span className="text-[#f1efe6]/75 uppercase">{stat.label}</span>
                  <span className="text-[#00ff00] font-bold">{stat.value}%</span>
                </div>
                <div className="w-full h-2 bg-[#f1efe6]/10 overflow-hidden">
                  <div
                    style={{ width: `${stat.value}%` }}
                    className="h-full bg-[#00ff00] shadow-[0_0_10px_#00ff00] transition-all duration-700"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls Bar (Arrows + Character Select Pills) */}
          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[#00ff00]/20">
            {/* Character Roster Selector Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CHARACTER_SLOTS.map((item, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => triggerSlideChange(idx)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider border transition-all ${
                      active
                        ? 'border-[#00ff00] bg-[#00ff00] text-[#050505] font-bold neon-glow'
                        : 'border-[#00ff00]/30 text-[#f1efe6]/70 hover:border-[#00ff00] hover:text-[#00ff00]'
                    }`}
                  >
                    0{idx + 1}. {item.name}
                  </button>
                );
              })}
            </div>

            {/* Left / Right Arrow Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous Character"
                className="p-3 border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#050505] transition-all neon-glow"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Character"
                className="p-3 border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#050505] transition-all neon-glow"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// High-Contrast Stylized Noir/Neon SVG Silhouettes for each Character
const CharacterSilhouette: React.FC<{ type: CharacterSlot['silhouetteType'] }> = ({ type }) => {
  switch (type) {
    case 'korede':
      return (
        <svg viewBox="0 0 240 280" className="w-64 h-64 drop-shadow-[0_0_18px_rgba(0,255,0,0.45)]">
          {/* Glowing Halo Circle */}
          <circle cx="120" cy="115" r="82" fill="none" stroke="#00ff00" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
          {/* Head & Neat Nurse Bun */}
          <circle cx="120" cy="42" r="16" fill="#00ff00" opacity="0.85" />
          <circle cx="120" cy="78" r="28" fill="#111" stroke="#00ff00" strokeWidth="2.5" />
          {/* Clinical Mask / Glasses Highlight */}
          <rect x="102" y="72" width="36" height="8" rx="2" fill="#00ff00" />
          {/* Methodical Shoulders / Nurse Scrubs Silhouette */}
          <path
            d="M65 235 L78 130 C82 115 100 108 120 108 C140 108 158 115 162 130 L175 235 Z"
            fill="#0c0c0c"
            stroke="#00ff00"
            strokeWidth="2.5"
          />
          {/* Bleach Bottle Prop in Hand */}
          <rect x="152" y="162" width="34" height="52" rx="4" fill="#050505" stroke="#00ff00" strokeWidth="2.5" />
          <rect x="162" y="148" width="14" height="14" fill="#00ff00" />
          <text x="169" y="193" textAnchor="middle" fill="#00ff00" fontSize="9" fontFamily="monospace" fontWeight="bold">
            ClO-
          </text>
        </svg>
      );
    case 'ayoola':
      return (
        <svg viewBox="0 0 240 280" className="w-64 h-64 drop-shadow-[0_0_20px_rgba(0,255,0,0.55)]">
          <circle cx="120" cy="115" r="85" fill="none" stroke="#00ff00" strokeWidth="1.5" opacity="0.4" />
          {/* Glamorous Voluminous Hair Silhouette */}
          <path
            d="M75 95 C68 45 95 25 120 25 C145 25 172 45 165 95 C175 120 165 145 150 145 L90 145 C75 145 65 120 75 95 Z"
            fill="#0b0b0b"
            stroke="#00ff00"
            strokeWidth="2.5"
          />
          {/* Head */}
          <circle cx="120" cy="78" r="24" fill="#050505" stroke="#00ff00" strokeWidth="2" />
          {/* Sinister Neon Smile */}
          <path d="M111 86 Q120 94 129 86" fill="none" stroke="#00ff00" strokeWidth="2.5" />
          {/* Dress Silhouette */}
          <path d="M82 240 L96 125 L144 125 L158 240 Z" fill="#0c0c0c" stroke="#00ff00" strokeWidth="2.5" />
          {/* Father's Hunting Knife Silhouette */}
          <path d="M168 125 L198 85 L204 92 L176 135 Z" fill="#00ff00" />
          <rect x="158" y="130" width="18" height="7" transform="rotate(-40 158 130)" fill="#f1efe6" />
        </svg>
      );
    case 'tade':
      return (
        <svg viewBox="0 0 240 280" className="w-64 h-64 drop-shadow-[0_0_16px_rgba(0,255,0,0.4)]">
          <circle cx="120" cy="115" r="80" fill="none" stroke="#00ff00" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
          <circle cx="120" cy="76" r="27" fill="#0c0c0c" stroke="#00ff00" strokeWidth="2.5" />
          {/* Doctor Coat Silhouette */}
          <path d="M62 240 L76 122 L164 122 L178 240 Z" fill="#090909" stroke="#00ff00" strokeWidth="2.5" />
          {/* Stethoscope Neon Line */}
          <path d="M98 122 C98 165 142 165 142 122" fill="none" stroke="#00ff00" strokeWidth="3" />
          <circle cx="120" cy="172" r="8" fill="#00ff00" />
        </svg>
      );
    case 'femi':
      return (
        <svg viewBox="0 0 240 280" className="w-64 h-64 drop-shadow-[0_0_16px_rgba(192,57,43,0.6)]">
          {/* Crosshair Target Overlay */}
          <circle cx="120" cy="130" r="85" fill="none" stroke="#00ff00" strokeWidth="1.5" opacity="0.45" />
          <line x1="120" y1="30" x2="120" y2="230" stroke="#00ff00" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <line x1="25" y1="130" x2="215" y2="130" stroke="#00ff00" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          {/* Silhouette Outline (Chalk-style dashed figure) */}
          <circle cx="120" cy="76" r="26" fill="none" stroke="#00ff00" strokeWidth="2.5" strokeDasharray="6 3" />
          <path
            d="M70 235 L82 122 L158 122 L170 235 Z"
            fill="none"
            stroke="#00ff00"
            strokeWidth="2.5"
            strokeDasharray="8 4"
          />
          <text x="120" y="175" textAnchor="middle" fill="#00ff00" fontSize="12" fontFamily="monospace">
            [CASE #03]
          </text>
        </svg>
      );
    case 'mother':
      return (
        <svg viewBox="0 0 240 280" className="w-64 h-64 drop-shadow-[0_0_16px_rgba(0,255,0,0.4)]">
          {/* Traditional Headtie (Gele) Silhouette */}
          <path
            d="M72 78 C70 40 170 40 168 78 L152 92 L88 92 Z"
            fill="#0e0e0e"
            stroke="#00ff00"
            strokeWidth="2.5"
          />
          <circle cx="120" cy="88" r="24" fill="#070707" stroke="#00ff00" strokeWidth="2.5" />
          <path d="M64 240 L84 128 L156 128 L176 240 Z" fill="#0b0b0b" stroke="#00ff00" strokeWidth="2.5" />
          {/* Necklace Accent */}
          <path d="M98 132 Q120 152 142 132" fill="none" stroke="#00ff00" strokeWidth="3" strokeDasharray="3 3" />
        </svg>
      );
  }
};
