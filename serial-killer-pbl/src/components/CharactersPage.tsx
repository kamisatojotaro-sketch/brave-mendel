import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Grid, Sparkles, ShieldAlert, BookOpen, BarChart3 } from 'lucide-react';
import { CHARACTER_SLOTS, PageId } from '../data/contentSlots';
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

// Story-authentic confession notes from Korede's perspective
const KOREDE_HANDWRITTEN_NOTES: Record<string, string> = {
  korede: '“I know the exact ratio of lemon to bleach for bathroom tiles...”',
  ayoola: '“She posted a Snapchat right after Femi stopped breathing.”',
  tade: '“Why does he look at her like that when I’m standing right here?”',
  femi: '“Wrapped like a mummy and dropped off the Third Mainland Bridge.”',
  mother: '“As long as a rich suitor calls, she never asks where the last one went.”',
};

// Extra forensic & psychological breakdown metrics for the dedicated STATS tab
const CHARACTER_EXTRA_STATS: Record<
  string,
  {
    threatRating: string;
    alibiStrength: number;
    crimeSceneRole: string;
    lagosStanding: string;
    psychologicalProfile: string;
  }
> = {
  korede: {
    threatRating: 'CALCULATED ACCOMPLICE',
    alibiStrength: 96,
    crimeSceneRole: 'Forensic Sanitization & Disposal Lead',
    lagosStanding: 'Head Nurse at St. Jude’s Hospital',
    psychologicalProfile:
      'Hyper-methodical, fiercely protective of Ayoola, and haunted by complicity; confides her darkest secrets only to a comatose patient in Room 313.',
  },
  ayoola: {
    threatRating: 'EXTREME // 3 FATALITIES',
    alibiStrength: 88,
    crimeSceneRole: 'Primary Perpetrator (Claims Self-Defense)',
    lagosStanding: 'Fashion Designer & Social Media Darling',
    psychologicalProfile:
      'Weaponizes breathtaking beauty and childlike innocence; rebounds from stabbing boyfriends to eating parfaits and posting selfies within hours.',
  },
  tade: {
    threatRating: 'HIGH RISK OF BECOMING VICTIM #04',
    alibiStrength: 100,
    crimeSceneRole: 'Unwitting Hospital Witness & Suitor',
    lagosStanding: 'Respected Pediatrician at St. Jude’s',
    psychologicalProfile:
      'Gentle and observant with Korede until the instant he meets Ayoola—falling under the exact spell that doomed Femi before him.',
  },
  femi: {
    threatRating: 'DECEASED // CASE #03',
    alibiStrength: 0,
    crimeSceneRole: 'Victim #03 // Disposed off Third Mainland Bridge',
    lagosStanding: 'Lagos Spoken-Word Poet',
    psychologicalProfile:
      'Wrote love poems and ignored every red flag until an argument in his apartment bathroom ended with Father’s 9-inch hunting knife.',
  },
  mother: {
    threatRating: 'WILLFUL BLINDNESS',
    alibiStrength: 94,
    crimeSceneRole: 'Matriarchal Cover & Social Enabler',
    lagosStanding: 'Wealthy Lagos Widow & Society Hostess',
    psychologicalProfile:
      'Measures her daughters strictly by beauty and wealthy suitors, praising Ayoola while relying on Korede to keep the family house in order.',
  },
};

// Key novel story beats for the dedicated STORY tab
const CHARACTER_STORY_BEATS: Record<string, string[]> = {
  korede: [
    'Answers Ayoola’s midnight call (“Korede, I killed him”) and scrubs Femi’s bathroom with lemon and bleach.',
    'Harbors an unspoken love for Dr. Tade at St. Jude’s Hospital—until Ayoola visits the ward and steals his attention.',
    'Confesses the truth of all three murders to Muhtar, the comatose patient in Room 313, who unexpectedly wakes up.',
  ],
  ayoola: [
    'Has now killed three boyfriends in succession—always claiming she had no choice and using their late father’s 9-inch curved hunting knife.',
    'Effortlessly charms Dr. Tade with her radiant beauty while Femi is still listed as a missing person in Lagos.',
    'Forces Korede into an agonizing moral choice between saving the man she loves or protecting her blood sister.',
  ],
  tade: [
    'Treats Korede as his trusted confidante and friend in the hospital corridors of St. Jude’s.',
    'Becomes instantly infatuated with Ayoola, showering her with gifts and ignoring Korede’s subtle warnings.',
    'Discovers the truth in a tense confrontation that mirrors Femi’s final night—prompting Korede to intervene.',
  ],
  femi: [
    'The third boyfriend to fall for Ayoola’s magnetic charm in Lagos.',
    'Killed in his apartment bathroom with three strikes from Father’s carved hunting blade.',
    'Wrapped tightly in white bedsheets “like a mummy” and dropped into the Lagos Lagoon from the Third Mainland Bridge.',
  ],
  mother: [
    'Presides over the family home after the death of their abusive, corrupt patriarch.',
    'Openly favors Ayoola’s beauty and marriage prospects while treating Korede as the dutiful, plain caretaker.',
    'Never questions why Ayoola’s boyfriends vanish without a trace as long as a richer suitor appears next.',
  ],
};

// Display order for the Full-Screen Lineup Stage (Ayoola, Korede, Tade, Mother, Femi)
const LINEUP_ORDER = [1, 0, 2, 4, 3];

export type HudMode = 'select' | 'stats' | 'story';

export const CharactersPage: React.FC<CharactersPageProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lastViewedIndex, setLastViewedIndex] = useState<number>(1); // Default to Ayoola (index 1)
  const [hudMode, setHudMode] = useState<HudMode>('select');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isGlitching, setIsGlitching] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Clicking a character from the lineup zooms into them (defaults to STATS view with full access to STORY)
  const handleSelectCharacter = useCallback((idx: number, targetMode: HudMode = 'stats') => {
    soundFX.playDramaticPulse();
    setIsGlitching(true);
    setSelectedIndex(idx);
    setLastViewedIndex(idx);
    setHudMode(targetMode === 'select' ? 'stats' : targetMode);
    window.setTimeout(() => {
      setIsGlitching(false);
    }, 340);
  }, []);

  // Clicking SELECT / STATS / STORY in the top-right bar switches the entire stage mode
  const handleSwitchHudMode = (mode: HudMode) => {
    soundFX.playGlitchSwitch();
    setIsGlitching(true);
    if (mode === 'select') {
      setHudMode('select');
      setSelectedIndex(null);
    } else {
      setHudMode(mode);
      if (selectedIndex === null) {
        setSelectedIndex(lastViewedIndex);
      }
    }
    window.setTimeout(() => {
      setIsGlitching(false);
    }, 300);
  };

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    soundFX.playGlitchSwitch();
    setIsGlitching(true);
    setSelectedIndex((prev) => {
      const next = ((prev ?? 0) + 1) % CHARACTER_SLOTS.length;
      setLastViewedIndex(next);
      return next;
    });
    window.setTimeout(() => setIsGlitching(false), 320);
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    soundFX.playGlitchSwitch();
    setIsGlitching(true);
    setSelectedIndex((prev) => {
      const next = ((prev ?? 0) - 1 + CHARACTER_SLOTS.length) % CHARACTER_SLOTS.length;
      setLastViewedIndex(next);
      return next;
    });
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
        setHudMode('select');
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

  const getCharacterPropIcon = (id: string) => {
    switch (id) {
      case 'korede':
        return <BleachBottleProp className="w-14 h-14 shrink-0" />;
      case 'ayoola':
        return <HuntingKnifeProp className="w-14 h-14 shrink-0" />;
      case 'tade':
        return <RubberGlovesProp className="w-14 h-14 shrink-0" />;
      case 'mother':
        return <CrimsonSunglassesProp className="w-20 h-10 shrink-0" />;
      default:
        return <BloodyClothProp className="w-14 h-14 shrink-0" />;
    }
  };

  const activeCharacter = selectedIndex !== null ? CHARACTER_SLOTS[selectedIndex] : null;
  const activeExtraStats = activeCharacter ? CHARACTER_EXTRA_STATS[activeCharacter.id] : null;
  const activeStoryBeats = activeCharacter ? CHARACTER_STORY_BEATS[activeCharacter.id] : [];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-screen w-full overflow-x-hidden select-none flex flex-col justify-between pb-8"
    >
      {/* Floating Decorative Murder Props in Background Corners */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="hidden md:block absolute left-6 bottom-24 opacity-75 animate-float-slow">
          <BloodyClothProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
        <div
          style={{ animationDelay: '1.5s' }}
          className="hidden md:block absolute right-8 bottom-28 opacity-80 animate-float-slow"
        >
          <HuntingKnifeProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
      </div>

      {/* Top Navigation Bar + Always-Active SELECT / STATS / STORY Switcher */}
      <div className="relative z-30 w-full px-6 sm:px-10 pt-24 pb-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {selectedIndex !== null ? (
            <button
              onClick={() => handleSwitchHudMode('select')}
              className="px-4 py-1.5 rounded-full bg-[#ff007f] text-[#f3efe4] hover:bg-[#00ff33] hover:text-[#040705] font-sans text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 magenta-glow"
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
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#041d0e]/85 border border-[#f3efe4]/25 font-sans text-xs font-bold text-[#f3efe4] hover:border-[#ff007f] hover:text-[#ff007f] transition-colors uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4 text-[#00ff33]" />
              <span>BACK TO HARDCOVER</span>
            </button>
          )}
        </div>

        {/* Interactive SELECT / STATS / STORY Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#041d0e]/90 border border-[#f3efe4]/25 rounded-full px-3 py-1.5 backdrop-blur-md shadow-lg">
          <button
            onClick={() => handleSwitchHudMode('select')}
            className={`px-3.5 py-1 rounded-full font-marker text-lg sm:text-xl tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              hudMode === 'select'
                ? 'bg-[#00ff33] text-[#040705] shadow-[0_0_14px_rgba(0,255,51,0.6)] scale-105 -rotate-2'
                : 'text-[#f3efe4]/80 hover:text-[#00ff33]'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>SELECT</span>
          </button>

          <button
            onClick={() => handleSwitchHudMode('stats')}
            className={`px-3.5 py-1 rounded-full font-marker text-lg sm:text-xl tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              hudMode === 'stats'
                ? 'bg-[#ff007f] text-[#f3efe4] shadow-[0_0_14px_rgba(255,0,127,0.65)] scale-105 -rotate-2'
                : 'text-[#f3efe4]/80 hover:text-[#ff007f]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>STATS</span>
          </button>

          <button
            onClick={() => handleSwitchHudMode('story')}
            className={`px-3.5 py-1 rounded-full font-marker text-lg sm:text-xl tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              hudMode === 'story'
                ? 'bg-[#00ff33] text-[#040705] shadow-[0_0_14px_rgba(0,255,51,0.6)] scale-105 -rotate-2'
                : 'text-[#f3efe4]/80 hover:text-[#00ff33]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>STORY</span>
          </button>
        </div>
      </div>

      {/* =====================================================================
          MODE 1 (`SELECT`): FULL-SCREEN 5-CHARACTER LINEUP STAGE
          - No "CLICK TO ZOOM IN" text anywhere
          - Subtle, refined hover outline (`border-[#f3efe4]/45` + gentle lift)
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
                  onClick={() => handleSelectCharacter(slotIdx, 'stats')}
                  className={`group relative cursor-pointer h-[68vh] min-h-[420px] sm:h-[75vh] flex flex-col justify-end items-center transition-all duration-500 ease-out rounded-2xl ${
                    isHovered
                      ? '-translate-y-2.5 scale-[1.02] z-30 character-subtle-outline'
                      : isSomeoneElseHovered
                      ? 'opacity-65 scale-[0.985] z-10'
                      : 'z-10'
                  }`}
                >
                  {/* Character Card with Subtle Outline on Hover & All-Edge Dark Masking */}
                  <div
                    className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 bg-[#040705] ${
                      isHovered
                        ? 'border border-[#f3efe4]/45'
                        : 'border border-[#258e47]/30'
                    }`}
                  >
                    <img
                      src={CHARACTER_IMAGES[char.id]}
                      alt={char.name}
                      className={`w-full h-full object-cover transition-transform duration-700 select-none pointer-events-none ${
                        isAyoola
                          ? isHovered
                            ? 'object-center scale-[1.18] brightness-105'
                            : 'object-center scale-[1.14] brightness-95'
                          : isHovered
                          ? 'object-top scale-[1.06] brightness-105'
                          : 'object-top scale-[1.03] brightness-95'
                      }`}
                    />

                    {/* All-Sides Dark Frame + Vignette Mask */}
                    <div className="pointer-events-none absolute inset-0 ring-4 ring-inset ring-[#040705] shadow-[inset_0_0_28px_14px_#040705]" />

                    {/* Bottom Dark Emerald & Noir Gradient for Name Readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#040705] via-[#041d0e]/80 to-transparent pointer-events-none" />

                    {/* Stylized Slanted Character Name & Subtitle */}
                    <div className="absolute inset-x-3 bottom-6 text-center pointer-events-none transition-transform duration-500 group-hover:-translate-y-1.5">
                      <h3
                        className={`font-arcade text-5xl sm:text-6xl uppercase tracking-wider leading-none -rotate-3 transition-colors duration-300 ${
                          isHovered
                            ? 'text-[#00ff33] neon-text-glow'
                            : 'text-[#f3efe4] drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]'
                        }`}
                      >
                        {char.name}
                      </h3>
                      <p
                        className={`mt-1.5 font-marker text-xs sm:text-sm tracking-wide -rotate-3 transition-colors ${
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

          <BotanicalLagoonFooter className="h-20 sm:h-24 -mb-6 opacity-90" />
        </div>
      )}

      {/* =====================================================================
          MODE 2 (`STATS`) & MODE 3 (`STORY`): ZOOMED-IN CHARACTER SHOWCASE
         ===================================================================== */}
      {selectedIndex !== null && activeCharacter && activeExtraStats && (
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
            {/* LEFT SIDE POP-UP: Slanted Name, Role Title, & Mode-Specific Left Card (4 cols) */}
            <div className="lg:col-span-4 text-left space-y-4 z-20 animate-[fadeSlideRight_0.45s_ease-out] relative">
              <PaintSplatterBadge
                color="#ff007f"
                className="w-20 h-20 absolute -top-6 -left-6 opacity-65"
              />

              <div className="relative z-10 inline-block px-3 py-1 rounded bg-[#ff007f] text-[#f3efe4] font-sans font-bold text-[11px] uppercase tracking-widest shadow-md">
                {activeCharacter.status}
              </div>

              <div className="relative z-10 -rotate-6 origin-bottom-left py-2">
                <h2 className="font-arcade text-7xl sm:text-8xl xl:text-[106px] uppercase tracking-wider text-[#00ff33] leading-[0.88] neon-text-glow">
                  {activeCharacter.name}
                </h2>
                <p className="mt-2 font-marker text-xl sm:text-2xl xl:text-3xl tracking-wide text-[#ff007f] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]">
                  {activeCharacter.roleTitle}
                </p>
              </div>

              {hudMode === 'stats' ? (
                /* STATS MODE LEFT CARD: Forensic Role & Threat Classification */
                <div className="p-4 rounded-2xl glass-dropdown-bar border-l-4 border-l-[#00ff33] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-marker text-sm tracking-wider text-[#00ff33]">
                      FORENSIC CLASSIFICATION
                    </span>
                    <ShieldAlert className="w-4 h-4 text-[#ff007f]" />
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 rounded-lg bg-[#040705]/70 border border-[#f3efe4]/15">
                      <span className="block text-[10px] text-[#f3efe4]/60 uppercase">THREAT LEVEL</span>
                      <span className="font-bold text-[#ff007f]">{activeExtraStats.threatRating}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#040705]/70 border border-[#f3efe4]/15">
                      <span className="block text-[10px] text-[#f3efe4]/60 uppercase">CRIME-SCENE ROLE</span>
                      <span className="font-bold text-[#00ff33]">{activeExtraStats.crimeSceneRole}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#040705]/70 border border-[#f3efe4]/15">
                      <span className="block text-[10px] text-[#f3efe4]/60 uppercase">LAGOS STATUS</span>
                      <span className="font-semibold text-[#f3efe4]">{activeExtraStats.lagosStanding}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* STORY MODE LEFT CARD: Korede's Room 313 Confession & Novel Quote */
                <div className="p-4 rounded-2xl glass-dropdown-bar border-l-4 border-l-[#ff007f] space-y-3">
                  <span className="block font-marker text-sm tracking-wider text-[#ff007f]">
                    KOREDE’S CONFESSION // ROOM 313
                  </span>
                  <p className="font-editorial italic text-lg sm:text-xl text-[#f3efe4] leading-snug">
                    {KOREDE_HANDWRITTEN_NOTES[activeCharacter.id]}
                  </p>
                  <p className="font-sans text-xs text-[#00ff33] border-t border-[#f3efe4]/15 pt-2">
                    {activeCharacter.tagline}
                  </p>
                </div>
              )}

              {/* Signature Evidence Prop */}
              <div className="pt-1 flex items-center gap-3 text-xs text-[#f3efe4]/90">
                {getCharacterPropIcon(activeCharacter.id)}
                <div>
                  <span className="block font-marker text-xs text-[#00ff33] uppercase">SIGNATURE EVIDENCE:</span>
                  <span className="font-bold text-sm">{activeCharacter.signatureItem}</span>
                </div>
              </div>
            </div>

            {/* CENTER ZOOMED CHARACTER PORTRAIT (4 cols) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center relative z-10 gap-3">
              <div className="relative w-72 sm:w-80 md:w-[340px] h-[52vh] sm:h-[60vh] rounded-2xl overflow-hidden border border-[#f3efe4]/40 character-subtle-outline bg-[#040705] transition-all duration-500">
                <img
                  src={CHARACTER_IMAGES[activeCharacter.id]}
                  alt={activeCharacter.name}
                  className={`w-full h-full object-cover transition-transform duration-700 select-none pointer-events-none ${
                    activeCharacter.id === 'ayoola' ? 'object-center scale-[1.15]' : 'object-top scale-105'
                  }`}
                />
                {/* Inner Dark Ring & Vignette to keep all 4 edges 100% clean */}
                <div className="pointer-events-none absolute inset-0 ring-4 ring-inset ring-[#040705] shadow-[inset_0_0_28px_14px_#040705]" />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#040705] to-transparent pointer-events-none" />

                {/* Active View Badge at Bottom of Portrait */}
                <div className="absolute bottom-3 inset-x-4 flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#041d0e]/90 border border-[#00ff33]/50 font-marker text-xs text-[#00ff33]">
                    {hudMode === 'stats' ? 'VIEWING: STATS' : 'VIEWING: STORY'}
                  </span>
                  <button
                    onClick={() => handleSwitchHudMode(hudMode === 'stats' ? 'story' : 'stats')}
                    className="px-2.5 py-0.5 rounded-full bg-[#ff007f] text-[#f3efe4] hover:bg-[#00ff33] hover:text-[#040705] font-sans text-[10px] font-bold uppercase tracking-wider transition-colors"
                  >
                    SWITCH TO {hudMode === 'stats' ? 'STORY' : 'STATS'} &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE POP-UP: Dynamically Switches Between STATS View and STORY View (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-5 z-20 animate-[fadeSlideLeft_0.45s_ease-out]">
              {hudMode === 'stats' ? (
                /* =============================================================
                   DEDICATED STATS TAB VIEW
                   ============================================================= */
                <>
                  <div className="rounded-2xl glass-dropdown-bar p-5 sm:p-6 space-y-4 relative overflow-hidden border-t-4 border-t-[#ff007f]">
                    <div className="flex items-center justify-between border-b border-[#f3efe4]/15 pb-2">
                      <span className="font-marker text-lg text-[#ff007f] tracking-wider flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-[#00ff33]" />
                        <span>CHARACTER STATS // ATTRIBUTES</span>
                      </span>
                      <span className="font-sans text-xs font-bold text-[#00ff33]">
                        [0{selectedIndex + 1} / 05]
                      </span>
                    </div>

                    {/* 3 Primary Gouache Stat Bars */}
                    <div className="space-y-4">
                      {activeCharacter.stats.map((stat, sIdx) => {
                        const isPinkBar = sIdx === 1;
                        return (
                          <div key={stat.label} className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-marker text-lg sm:text-xl tracking-wide uppercase text-[#f3efe4]">
                                {stat.label}
                              </span>
                              <span
                                className={`font-arcade text-2xl tracking-wider ${
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

                      {/* 4th Bonus Stat Bar: Alibi / Cover Strength */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="font-marker text-lg sm:text-xl tracking-wide uppercase text-[#f3efe4]">
                            ALIBI / COVER STRENGTH
                          </span>
                          <span className="font-arcade text-2xl tracking-wider text-[#ff007f]">
                            {activeExtraStats.alibiStrength}%
                          </span>
                        </div>
                        <div className="w-full h-3.5 rounded-full bg-[#041d0e] border border-[#f3efe4]/25 p-0.5 overflow-hidden">
                          <div
                            style={{ width: `${activeExtraStats.alibiStrength}%` }}
                            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#ff007f] to-[#00ff33]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Psychological Profile Summary Box */}
                  <div className="rounded-2xl glass-dropdown-bar p-5 space-y-2 border-l-4 border-l-[#00ff33]">
                    <span className="font-marker text-sm tracking-wider text-[#00ff33] block">
                      PSYCHOLOGICAL ASSESSMENT
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-[#f3efe4]/90 leading-relaxed">
                      {activeExtraStats.psychologicalProfile}
                    </p>
                    <button
                      onClick={() => handleSwitchHudMode('story')}
                      className="mt-2 inline-flex items-center gap-1.5 font-marker text-sm text-[#ff007f] hover:text-[#00ff33] transition-colors"
                    >
                      <span>OPEN CHARACTER STORY &amp; BIO SLOT &rarr;</span>
                    </button>
                  </div>
                </>
              ) : (
                /* =============================================================
                   DEDICATED STORY TAB VIEW (`<main character intros>` + Novel Arc)
                   ============================================================= */
                <>
                  {/* `<main character intros>` Bio Card */}
                  <div className="rounded-2xl glass-dropdown-bar p-5 sm:p-6 space-y-3 relative overflow-hidden border-t-4 border-t-[#00ff33]">
                    <div className="flex items-center justify-between text-xs text-[#00ff33] border-b border-[#f3efe4]/15 pb-2">
                      <span className="font-marker text-base flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#ff007f]" />
                        <span>CHARACTER STORY // BIO SLOT</span>
                      </span>
                      <span className="text-[#ff007f] font-bold">[DOSSIER 0{selectedIndex + 1}]</span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#040705]/75 border-l-4 border-[#ff007f] font-sans text-sm sm:text-base text-[#f3efe4] leading-relaxed">
                      {activeCharacter.bio}
                    </div>
                    <span className="block text-[11px] text-[#f3efe4]/60">
                      Editable in <code className="text-[#00ff33]">src/data/contentSlots.ts</code>
                    </span>
                  </div>

                  {/* Key Novel Story Arc Beats */}
                  <div className="rounded-2xl glass-dropdown-bar p-5 space-y-3 border-l-4 border-l-[#ff007f]">
                    <span className="font-marker text-base tracking-wider text-[#ff007f] block">
                      KEY NOVEL MOMENTS // LAGOS ARC
                    </span>
                    <ul className="space-y-2">
                      {activeStoryBeats.map((beat, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-[#f3efe4]/90">
                          <span className="w-5 h-5 rounded-full bg-[#00ff33] text-[#040705] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {bIdx + 1}
                          </span>
                          <span>{beat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
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
                    onClick={() => handleSelectCharacter(idx, hudMode)}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border transition-all shrink-0 bg-[#040705] ${
                      active
                        ? 'border-[#ff007f] scale-110 magenta-glow'
                        : 'border-[#f3efe4]/25 opacity-65 hover:opacity-100 hover:border-[#f3efe4]/55'
                    }`}
                  >
                    <img
                      src={CHARACTER_IMAGES[item.id]}
                      alt={item.name}
                      className={`w-full h-full object-cover ${
                        item.id === 'ayoola' ? 'object-center scale-[1.18]' : 'object-top scale-105'
                      }`}
                    />
                    <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-[#040705]" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/85 font-sans font-bold text-[8px] text-center text-[#f3efe4] py-0.5 truncate">
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
