import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Grid, Sparkles } from 'lucide-react';
import { CHARACTER_SLOTS, PageId } from '../data/contentSlots';
import {
  BloodyClothProp,
  HuntingKnifeProp,
  BleachBottleProp,
  PaintSplatterBadge,
  BotanicalLagoonFooter,
} from './BotanicalCrimeArt';
import { soundFX } from '../utils/soundFX';

interface CharactersPageProps {
  onNavigate: (page: PageId) => void;
}

const CHARACTER_IMAGES: Record<string, string> = {
  korede: '/assets/char_korede.jpg',
  ayoola: '/assets/char_ayoola.jpg',
  tade: '/assets/char_tade.jpg',
  femi: '/assets/char_femi.jpg',
  mother: '/assets/char_mother.jpg',
};

const LINEUP_SUBTITLES: Record<string, string> = {
  ayoola: 'Younger Sister & Killer',
  korede: 'Elder Sister & Nurse',
  tade: 'Kind Doctor',
  mother: 'Widow in Denial',
  femi: 'Poet // Victim #03',
};

// Story-authentic handwritten notes from Korede's perspective
const KOREDE_HANDWRITTEN_NOTES: Record<string, string> = {
  korede: '"I know the exact ratio of lemon to bleach for bathroom tiles..."',
  ayoola: '"She posted a Snapchat right after Femi stopped breathing."',
  tade: '"Why does he look at her like that when I’m standing right here?"',
  femi: '"Wrapped like a mummy and dropped off the Third Mainland Bridge."',
  mother: '"As long as a rich suitor calls, she never asks where the last one went."',
};

// Display order for the Full-Screen Lineup Stage (Ayoola, Korede, Tade, Mother, Femi)
const LINEUP_ORDER = [1, 0, 2, 4, 3];

export const CharactersPage: React.FC<CharactersPageProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleSelectCharacter = useCallback((idx: number) => {
    soundFX.playDramaticPulse();
    setIsGlitching(true);
    setSelectedIndex(idx);
    window.setTimeout(() => {
      setIsGlitching(false);
    }, 340);
  }, []);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    soundFX.playGlitchSwitch();
    setIsGlitching(true);
    setSelectedIndex((prev) => ((prev ?? 0) + 1) % CHARACTER_SLOTS.length);
    window.setTimeout(() => setIsGlitching(false), 320);
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    soundFX.playGlitchSwitch();
    setIsGlitching(true);
    setSelectedIndex((prev) => ((prev ?? 0) - 1 + CHARACTER_SLOTS.length) % CHARACTER_SLOTS.length);
    window.setTimeout(() => setIsGlitching(false), 320);
  }, [selectedIndex]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'Escape') {
        soundFX.playHoverTick(460);
        setSelectedIndex(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const dist = touchStartX.current - touchEndX.current;
    if (dist > 45) handleNext();
    else if (dist < -45) handlePrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const activeCharacter = selectedIndex !== null ? CHARACTER_SLOTS[selectedIndex] : null;

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full overflow-x-hidden select-none flex flex-col justify-between pb-8"
    >
      {/* Floating Decorative Murder Props in Background Corners */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="hidden xl:block absolute left-8 bottom-24 opacity-70 animate-float-slow">
          <BloodyClothProp className="w-24 h-24" />
        </div>
        <div
          style={{ animationDelay: '1.5s' }}
          className="hidden xl:block absolute right-10 bottom-28 opacity-75 animate-float-slow"
        >
          <HuntingKnifeProp className="w-24 h-24" />
        </div>
      </div>

      {/* Top Navigation Bar */}
      <div className="relative z-30 w-full px-6 sm:px-10 pt-24 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedIndex !== null ? (
            <button
              onClick={() => {
                soundFX.playHoverTick(520);
                setSelectedIndex(null);
              }}
              className="px-4 py-1.5 rounded-full bg-[#ff007f] text-[#f3efe4] hover:bg-[#00ff33] hover:text-[#040705] font-mono text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 magenta-glow"
            >
              <Grid className="w-3.5 h-3.5" />
              <span>BACK TO ALL CHARACTERS</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFX.playHoverTick(500);
                onNavigate('home');
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041d0e]/85 border border-[#f3efe4]/25 font-mono text-xs text-[#f3efe4] hover:border-[#ff007f] hover:text-[#ff007f] transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4 text-[#00ff33]" />
              <span>BACK TO HARDCOVER</span>
            </button>
          )}
        </div>

        {/* Right Header Status */}
        {selectedIndex !== null && (
          <div className="flex items-center gap-5 font-display text-xl tracking-wider">
            <span className="text-[#00ff33] underline underline-offset-4">SELECT</span>
            <span className="text-[#ff007f]">STATS</span>
            <span className="text-[#f3efe4]/80">STORY</span>
          </div>
        )}
      </div>

      {/* =====================================================================
          STATE 1: FULL-SCREEN 5-CHARACTER LINEUP STAGE
          - No "CLICK TO ZOOM IN" text anywhere
          - Subtle, refined hover outline (`border-[#f3efe4]/40` + gentle lift)
          - Ayoola's white border artifact completely cropped & vignette-masked
         ===================================================================== */}
      {selectedIndex === null && (
        <div className="relative z-20 flex-1 w-full flex flex-col justify-end pt-2">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-end px-4 sm:px-8 pb-4 gap-4">
            {LINEUP_ORDER.map((slotIdx) => {
              const char = CHARACTER_SLOTS[slotIdx];
              const isHovered = hoveredIndex === slotIdx;
              const isSomeoneElseHovered = hoveredIndex !== null && hoveredIndex !== slotIdx;
              const isAyoola = char.id === 'ayoola';

              return (
                <div
                  key={char.id}
                  onMouseEnter={() => {
                    soundFX.playHoverTick(540 + slotIdx * 45);
                    setHoveredIndex(slotIdx);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleSelectCharacter(slotIdx)}
                  className={`group relative cursor-pointer h-[68vh] min-h-[420px] sm:h-[75vh] flex flex-col justify-end items-center transition-all duration-500 ease-out rounded-2xl ${
                    isHovered
                      ? '-translate-y-3 scale-[1.03] z-30 character-subtle-outline'
                      : isSomeoneElseHovered
                      ? 'opacity-65 scale-[0.985] z-10'
                      : 'z-10'
                  }`}
                >
                  {/* Character Card with Subtle Outline on Hover & Edge Masking */}
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 bg-[#040705] ${
                      isHovered
                        ? 'border border-[#f3efe4]/55'
                        : 'border border-[#258e47]/35'
                    }`}
                  >
                    {/* Portrait Image: Ayoola gets extra inset scale (scale-[1.12]) + dark inner vignette so any white edge on her source JPG is 100% clipped out */}
                    <img
                      src={CHARACTER_IMAGES[char.id]}
                      alt={char.name}
                      className={`w-full h-full object-cover object-top transition-transform duration-700 select-none pointer-events-none ${
                        isAyoola
                          ? isHovered
                            ? 'scale-[1.16] brightness-105'
                            : 'scale-[1.12] brightness-95'
                          : isHovered
                          ? 'scale-[1.06] brightness-105'
                          : 'scale-[1.02] brightness-95'
                      }`}
                    />

                    {/* Inner Edge Vignette Mask (prevents any light edge bleeding on cards) */}
                    <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_24px_12px_#040705]" />

                    {/* Bottom DarkEmerald & Noir Gradient for Name Readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#040705] via-[#041d0e]/80 to-transparent pointer-events-none" />

                    {/* Stylized Slanted Character Name & Subtitle */}
                    <div className="absolute inset-x-3 bottom-6 text-center pointer-events-none transition-transform duration-500 group-hover:-translate-y-1.5">
                      <h3
                        className={`font-display text-5xl sm:text-6xl uppercase tracking-wider leading-none -rotate-3 transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#00ff33] neon-text-glow'
                            : 'text-[#f3efe4] drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]'
                        }`}
                      >
                        {char.name}
                      </h3>
                      <p
                        className={`mt-1.5 font-sans text-xs sm:text-sm font-bold tracking-wide -rotate-3 transition-colors ${
                          isHovered ? 'text-[#ff007f]' : 'text-[#f3efe4]/80'
                        }`}
                      >
                        {LINEUP_SUBTITLES[char.id]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botanical Lagoon Cutout Footer */}
          <BotanicalLagoonFooter className="h-20 sm:h-24 -mb-6 opacity-90" />
        </div>
      )}

      {/* =====================================================================
          STATE 2: ZOOMED-IN CHARACTER + COLORFUL SIDE INFO POP-UP
         ===================================================================== */}
      {selectedIndex !== null && activeCharacter && (
        <div
          className={`relative z-20 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-10 flex flex-col justify-between pb-4 ${
            isGlitching ? 'animate-glitch' : ''
          }`}
        >
          {/* Left Hexagonal Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Previous Character"
            className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 items-center justify-center bg-[#ff007f] text-[#f3efe4] hover:bg-[#00ff33] hover:text-[#040705] transition-all magenta-glow"
            style={{
              clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
            }}
          >
            <ChevronLeft className="w-8 h-8 stroke-[3]" />
          </button>

          {/* Right Hexagonal Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Next Character"
            className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 items-center justify-center bg-[#ff007f] text-[#f3efe4] hover:bg-[#00ff33] hover:text-[#040705] transition-all magenta-glow"
            style={{
              clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
            }}
          >
            <ChevronRight className="w-8 h-8 stroke-[3]" />
          </button>

          {/* 3-Column GTA + Book-Cover Pop-Art Character Stage */}
          <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT SIDE POP-UP: Splattered Name, Role Title, Handwritten Korede Note & Prop (4 cols) */}
            <div className="lg:col-span-4 text-left space-y-4 z-20 animate-[fadeSlideRight_0.45s_ease-out] relative">
              <PaintSplatterBadge
                color="#ff007f"
                className="w-20 h-20 absolute -top-6 -left-6 opacity-65"
              />

              <div className="relative z-10 inline-block px-3 py-1 rounded bg-[#ff007f] text-[#f3efe4] font-mono font-bold text-[11px] uppercase tracking-widest shadow-md">
                {activeCharacter.status}
              </div>

              <div className="relative z-10 -rotate-6 origin-bottom-left py-2">
                <h2 className="font-display text-7xl sm:text-8xl xl:text-[110px] uppercase tracking-wide text-[#00ff33] leading-[0.85] neon-text-glow">
                  {activeCharacter.name}
                </h2>
                <p className="mt-2 font-display text-2xl sm:text-3xl xl:text-4xl uppercase tracking-wider text-[#f3efe4] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
                  {activeCharacter.roleTitle}
                </p>
              </div>

              {/* Korede's Room 313 Editorial Note */}
              <div className="p-3.5 rounded-xl bg-[#041d0e]/90 border-l-4 border-[#ff007f] shadow-md">
                <span className="block font-geometric text-[9px] uppercase tracking-[0.24em] text-[#ff007f] font-bold mb-1">
                  KOREDE’S CONFESSION // ROOM 313
                </span>
                <p className="font-editorial italic text-base sm:text-lg text-[#f3efe4] leading-snug">
                  {KOREDE_HANDWRITTEN_NOTES[activeCharacter.id]}
                </p>
              </div>

              {/* Signature Evidence Prop */}
              <div className="pt-1 flex items-center gap-3 font-mono text-xs text-[#f3efe4]/85">
                {activeCharacter.id === 'korede' && <BleachBottleProp className="w-12 h-12 shrink-0" />}
                {activeCharacter.id === 'ayoola' && <HuntingKnifeProp className="w-12 h-12 shrink-0" />}
                {activeCharacter.id !== 'korede' && activeCharacter.id !== 'ayoola' && (
                  <BloodyClothProp className="w-12 h-12 shrink-0" />
                )}
                <div>
                  <span className="block text-[10px] text-[#00ff33] uppercase">SIGNATURE EVIDENCE:</span>
                  <span className="font-semibold">{activeCharacter.signatureItem}</span>
                </div>
              </div>
            </div>

            {/* CENTER ZOOMED CHARACTER PORTRAIT (4 cols) */}
            <div className="lg:col-span-4 flex items-center justify-center relative z-10">
              <div className="relative w-72 sm:w-80 md:w-[340px] h-[54vh] sm:h-[62vh] rounded-2xl overflow-hidden border border-[#f3efe4]/45 character-subtle-outline bg-[#040705] transition-all duration-500">
                <img
                  src={CHARACTER_IMAGES[activeCharacter.id]}
                  alt={activeCharacter.name}
                  className={`w-full h-full object-cover object-top transition-transform duration-700 select-none pointer-events-none ${
                    activeCharacter.id === 'ayoola' ? 'scale-[1.12]' : 'scale-105'
                  }`}
                />
                {/* Inner Vignette to keep edges clean */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_26px_12px_#040705]" />
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#040705] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* RIGHT SIDE POP-UP: Colorful Pink & Neon Stat Bars + Bio Box (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-6 z-20 animate-[fadeSlideLeft_0.45s_ease-out]">
              {/* 3 Bold Gouache Stat Bars (Alternating Neon Green & Hot Pink) */}
              <div className="space-y-4">
                {activeCharacter.stats.map((stat, sIdx) => {
                  const isPinkBar = sIdx === 1;
                  return (
                    <div key={stat.label} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-display text-xl sm:text-2xl tracking-wider uppercase text-[#f3efe4]">
                          {stat.label}
                        </span>
                        <span
                          className={`font-mono text-xs font-bold ${
                            isPinkBar ? 'text-[#ff007f]' : 'text-[#00ff33]'
                          }`}
                        >
                          {stat.value}%
                        </span>
                      </div>
                      <div className="w-full h-3.5 rounded-full bg-[#041d0e] border border-[#f3efe4]/25 p-0.5 overflow-hidden">
                        <div
                          style={{ width: `${stat.value}%` }}
                          className={`h-full rounded-full transition-all duration-700 ${
                            isPinkBar
                              ? 'bg-[#ff007f] shadow-[0_0_12px_#ff007f]'
                              : 'bg-[#00ff33] shadow-[0_0_12px_#00ff33]'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Botanical Forest & Hot-Pink Bio Card (`<main character intros>`) */}
              <div className="rounded-2xl bg-[#041d0e]/95 backdrop-blur-md border-2 border-[#f3efe4]/30 p-5 sm:p-6 shadow-[0_14px_32px_rgba(0,0,0,0.85)] space-y-3 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff007f] via-[#00ff33] to-[#ff007f]" />
                <div className="flex items-center justify-between font-mono text-[10px] text-[#00ff33] border-b border-[#f3efe4]/15 pb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#ff007f]" />
                    <span>CHARACTER BIO // src/data/contentSlots.ts</span>
                  </span>
                  <span className="text-[#ff007f] font-bold">[DOSSIER 0{selectedIndex + 1}]</span>
                </div>
                <p className="font-mono text-sm sm:text-base text-[#f3efe4] leading-relaxed">
                  {activeCharacter.bio}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnail Strip Carousel */}
          <div className="relative z-20 max-w-4xl mx-auto w-full pt-4 flex items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-lg bg-[#041d0e] border border-[#f3efe4]/25 text-[#f3efe4] hover:text-[#ff007f] hover:border-[#ff007f] transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 overflow-x-auto py-1 px-2">
              {CHARACTER_SLOTS.map((item, idx) => {
                const active = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectCharacter(idx)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border transition-all shrink-0 ${
                      active
                        ? 'border-[#ff007f] scale-110 magenta-glow'
                        : 'border-[#f3efe4]/25 opacity-65 hover:opacity-100 hover:border-[#f3efe4]/60'
                    }`}
                  >
                    <img
                      src={CHARACTER_IMAGES[item.id]}
                      alt={item.name}
                      className={`w-full h-full object-cover object-top ${
                        item.id === 'ayoola' ? 'scale-110' : ''
                      }`}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/80 font-mono text-[8px] text-center text-[#f3efe4] py-0.5 truncate">
                      {item.name}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-lg bg-[#041d0e] border border-[#f3efe4]/25 text-[#f3efe4] hover:text-[#ff007f] hover:border-[#ff007f] transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
