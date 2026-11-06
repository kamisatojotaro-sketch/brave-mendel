import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { NAV_DROPDOWN_SLOTS, PageId } from '../data/contentSlots';
import {
  BloodyClothProp,
  HuntingKnifeProp,
  BleachBottleProp,
  CrimsonSunglassesProp,
  BotanicalLagoonFooter,
  PaintSplatterBadge,
} from './BotanicalCrimeArt';
import { soundFX } from '../utils/soundFX';

interface LandingNavProps {
  visible: boolean;
  onSelectPage: (page: PageId) => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ visible, onSelectPage }) => {
  const [isBookOpened, setIsBookOpened] = useState(false);
  const [hoveredBar, setHoveredBar] = useState<Exclude<PageId, 'home'> | null>(null);

  const handleBookClick = () => {
    soundFX.playGlitchSwitch();
    setIsBookOpened((prev) => !prev);
  };

  // Custom Pop-Art Murder Prop Illustration for each of the 3 Dropdown Cards
  const getCardPropIllustration = (id: Exclude<PageId, 'home'>) => {
    switch (id) {
      case 'guide':
        return <BloodyClothProp className="w-16 h-16 shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />;
      case 'characters':
        return <HuntingKnifeProp className="w-16 h-16 shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />;
      case 'author':
        return <BleachBottleProp className="w-16 h-16 shrink-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />;
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between pt-24 pb-10 px-6 max-w-6xl mx-auto select-none">
      {/* =====================================================================
          FLOATING POP-ART MURDER PROPS AROUND THE STAGE
          (Knives, Blood-Stained Cloths, and Bleach Bottle scattered tastefully)
         ===================================================================== */}
      <div
        className={`pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Top-Left Floating Hunting Knife with Pink/Crimson Drips */}
        <div className="hidden lg:block absolute left-10 top-28 animate-float-slow opacity-85">
          <HuntingKnifeProp className="w-28 h-28" />
          <span className="block font-geometric text-[10px] uppercase tracking-[0.25em] text-[#ff007f] font-bold -mt-1 ml-2">
            FATHER'S 9-INCH BLADE
          </span>
        </div>

        {/* Top-Right Floating Blood-Soaked Bathroom Cloth */}
        <div
          style={{ animationDelay: '1.2s' }}
          className="hidden lg:block absolute right-12 top-32 animate-float-slow opacity-90"
        >
          <BloodyClothProp className="w-28 h-28" />
          <span className="block font-geometric text-[10px] uppercase tracking-[0.22em] text-[#f3efe4]/80 -mt-1 mr-2 text-right">
            EVIDENCE // STAINED CLOTH
          </span>
        </div>

        {/* Mid-Left Floating Bleach Bottle */}
        <div
          style={{ animationDelay: '2.4s' }}
          className="hidden xl:block absolute left-20 bottom-44 animate-float-slow opacity-85"
        >
          <BleachBottleProp className="w-24 h-24" />
          <span className="block font-geometric text-[10px] uppercase tracking-[0.25em] text-[#00ff33] font-bold">
            LEMON &amp; BLEACH
          </span>
        </div>
      </div>

      {/* =====================================================================
          CENTER STAGE: GOUACHE BOTANICAL & SPLATTER HARDCOVER BOOK
          Fuses the "How to Kill Your Family" emerald/magenta water-ripple cover
          with the "My Sister, The Serial Killer" neon splatter & crimson sunglasses!
         ===================================================================== */}
      <div
        className={`relative z-20 my-auto w-full flex flex-col items-center transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <div
          onClick={handleBookClick}
          onMouseEnter={() => soundFX.playHoverTick(520)}
          className={`group relative cursor-pointer w-72 sm:w-80 md:w-[355px] aspect-[3/4.25] transition-all duration-500 ease-out ${
            isBookOpened
              ? '-translate-y-3 scale-[1.02] book-custom-glow-active'
              : 'hover:-translate-y-4 hover:scale-[1.04] book-custom-glow'
          }`}
        >
          {/* Ambient Hot-Pink & Emerald Aura Behind Book */}
          <div
            className={`absolute -inset-6 rounded-3xl bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.35)_0%,rgba(0,255,51,0.28)_45%,transparent_75%)] blur-2xl transition-opacity duration-500 pointer-events-none ${
              isBookOpened ? 'opacity-100' : 'opacity-40 group-hover:opacity-95'
            }`}
          />

          {/* 3D Page Stack Fore-Edge (Right & Bottom Cream Paper Thickness) */}
          <div className="absolute top-1.5 -right-3 bottom-1.5 w-3.5 rounded-r-sm bg-gradient-to-r from-[#f3efe4] via-[#d8d2c5] to-[#b5afa0] border-y border-r border-[#040705] shadow-xl pointer-events-none" />
          <div className="absolute -bottom-2.5 left-3 -right-2.5 h-3 rounded-b-sm bg-gradient-to-b from-[#e5dfd3] to-[#9c9688] border-x border-b border-[#040705] pointer-events-none" />

          {/* Main Hardcover Jacket */}
          <div
            className={`relative z-10 w-full h-full rounded-r-xl rounded-l-[4px] overflow-hidden hardcover-surface border-2 transition-colors duration-500 flex ${
              isBookOpened
                ? 'border-[#ff007f] shadow-[inset_0_0_30px_rgba(255,0,127,0.25)]'
                : 'border-[#f3efe4]/45 group-hover:border-[#00ff33]'
            }`}
          >
            {/* Left Book Spine Hinge */}
            <div className="w-7 sm:w-8 h-full shrink-0 bg-gradient-to-r from-[#03170b] via-[#0b4723] to-[#042110] border-r-2 border-[#040705] relative flex flex-col items-center justify-between py-6">
              <div className="inset-y-0 left-1.5 w-[1px] bg-[#f3efe4]/20 absolute" />
              <span className="font-sans font-bold text-[8px] tracking-[0.28em] text-[#f3efe4]/75 -rotate-90 whitespace-nowrap my-auto uppercase">
                OYINKAN BRAITHWAITE
              </span>
            </div>

            {/* Front Cover Illustration & Typography */}
            <div className="flex-1 h-full p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Swirling Cream Water Ripples on Top of Book Cover (From Cover 1) */}
              <svg
                viewBox="0 0 260 120"
                fill="none"
                className="absolute top-0 inset-x-0 w-full h-28 pointer-events-none opacity-65"
              >
                <path
                  d="M-10 22 C45 65, 95 -5, 155 42 C205 80, 235 20, 275 45"
                  stroke="#f3efe4"
                  strokeWidth="1.5"
                />
                <path
                  d="M-10 55 C55 15, 115 95, 185 48 C220 25, 245 60, 270 40"
                  stroke="#f3efe4"
                  strokeWidth="1.1"
                />
                <circle cx="52" cy="64" r="9" fill="#f3efe4" />
                <path d="M44 68 A 9 9 0 0 0 60 68 Z" fill="#ff007f" />
              </svg>

              {/* Bottom Cream Reeds & Hot-Pink Lily/Frog Accents on Book Cover (From Cover 1) */}
              <svg
                viewBox="0 0 260 110"
                fill="none"
                className="absolute bottom-0 inset-x-0 w-full h-24 pointer-events-none"
              >
                <path d="M0 78 Q70 52 135 76 T260 68 L260 110 L0 110 Z" fill="#040705" />
                <path d="M35 85 Q45 40 28 15 Q52 45 48 85 Z" fill="#f3efe4" opacity="0.9" />
                <path d="M55 88 Q70 35 82 12 Q74 50 66 88 Z" fill="#ff007f" />
                <path d="M195 88 Q185 42 172 18 Q195 45 206 88 Z" fill="#f3efe4" opacity="0.9" />
                <path d="M212 90 Q228 45 242 22 Q232 55 222 90 Z" fill="#ff007f" />
                <ellipse cx="75" cy="96" rx="52" ry="14" fill="#0d5c2e" stroke="#258e47" strokeWidth="1.5" />
                <ellipse cx="195" cy="98" rx="48" ry="13" fill="#0d5c2e" stroke="#258e47" strokeWidth="1.5" />
              </svg>

              {/* Top Geometric Editorial Header (Matching "How to Kill Your Family" wide-spaced caps) */}
              <div className="relative z-10 text-center pt-1">
                <p className="font-geometric font-semibold text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#f3efe4]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  BOOKER PRIZE LONGLIST
                </p>
              </div>

              {/* Center Splattered Neon-Green Title + Round Crimson Sunglasses */}
              <div className="relative z-10 my-auto text-center space-y-3">
                {/* Neon Paint Splatter Drops Behind Title */}
                <PaintSplatterBadge
                  color="#00ff33"
                  className="w-12 h-12 absolute -top-4 -right-2 opacity-80"
                />
                <PaintSplatterBadge
                  color="#ff007f"
                  className="w-10 h-10 absolute bottom-6 -left-2 opacity-85"
                />

                <h2 className="font-display font-bold text-5xl sm:text-[54px] uppercase tracking-tight leading-[0.9] text-[#00ff33] neon-text-glow">
                  <span className="block">MY SISTER, THE</span>
                  <span className="block text-[#00ff33]">SERIAL KILLER</span>
                </h2>

                {/* Round Crimson-Tinted Sunglasses Reflecting the Knife (From Cover 2) */}
                <div className="py-1 flex justify-center">
                  <CrimsonSunglassesProp className="w-40 h-16 drop-shadow-[0_8px_14px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300" />
                </div>

                {/* Author Name in Wide-Spaced Geometric Caps + Editorial Serif Quote */}
                <div className="space-y-1">
                  <p className="font-geometric font-bold text-base sm:text-lg tracking-[0.22em] text-[#00ff33] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    OYINKAN BRAITHWAITE
                  </p>
                  <p className="font-editorial italic text-xs sm:text-sm text-[#f3efe4]/90 tracking-wide">
                    “A wickedly funny Lagos noir”
                  </p>
                </div>
              </div>

              {/* Bottom Publisher Stamp (Matching "BOROUGH EDITIONS" placement on Cover 1) */}
              <div className="relative z-10 flex items-center justify-between pt-2 font-geometric font-bold text-[9px] tracking-[0.25em] text-[#f3efe4]/85 uppercase">
                <span>LAGOS EDITIONS</span>
                <span className="px-2.5 py-0.5 rounded bg-[#ff007f] text-[#f3efe4]">
                  {isBookOpened ? 'CLOSE BOOK' : 'OPEN BOOK'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3 POP-ART BOTANICAL & CRIME-SCENE DROPDOWN CARDS
            (Drop down when the hardcover book is clicked)
           =================================================================== */}
        <div
          className={`w-full max-w-5xl transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1) ${
            isBookOpened
              ? 'max-h-[1200px] opacity-100 translate-y-0 mt-10 pb-8'
              : 'max-h-0 opacity-0 -translate-y-10 mt-0 overflow-hidden pointer-events-none'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 py-2">
            {NAV_DROPDOWN_SLOTS.map((bar, idx) => {
              const isHovered = hoveredBar === bar.id;
              return (
                <div
                  key={bar.id}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  onMouseEnter={() => {
                    soundFX.playHoverTick(540 + idx * 70);
                    setHoveredBar(bar.id);
                  }}
                  onMouseLeave={() => setHoveredBar(null)}
                  onClick={() => {
                    soundFX.playGlitchSwitch();
                    onSelectPage(bar.id);
                  }}
                  className={`group cursor-pointer rounded-2xl p-6 sm:p-7 transition-all duration-400 glass-dropdown-bar flex flex-col justify-between relative overflow-hidden ${
                    isHovered
                      ? 'scale-[1.03] -translate-y-1.5 border-[#ff007f] magenta-glow'
                      : 'hover:scale-[1.02] hover:border-[#00ff33]'
                  }`}
                >
                  {/* Top Hot-Pink & Neon-Green Ribbon Bar */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#00ff33] via-[#ff007f] to-[#00ff33]" />

                  {/* Top Row: Module Badge + Custom Murder Prop Illustration (Bloody Cloth / Knife / Bleach) */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className="inline-block font-geometric text-[10px] font-bold tracking-[0.24em] uppercase px-2.5 py-1 rounded bg-[#ff007f] text-[#f3efe4] shadow-sm">
                        {bar.number} // CASE FILE
                      </span>
                      <p className="mt-2.5 font-editorial italic text-sm text-[#00ff33]">
                        {bar.id === 'guide' && '“Bleach masks the smell of blood...”'}
                        {bar.id === 'characters' && '“Three boyfriends. One loyal sister.”'}
                        {bar.id === 'author' && '“Set in the heart of Lagos, Nigeria”'}
                      </p>
                    </div>
                    <div className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {getCardPropIllustration(bar.id)}
                    </div>
                  </div>

                  {/* Main Heading Title (Guide / Characters / About Author) */}
                  <div className="text-left">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#f3efe4]/65 mb-1">
                      {bar.subtitle}
                    </p>
                    <h3 className="font-display text-5xl uppercase tracking-wider text-[#f3efe4] group-hover:text-[#00ff33] transition-colors leading-none">
                      {bar.title}
                    </h3>
                  </div>

                  {/* Expandable Description on Hover/Tap */}
                  <div
                    className={`transition-all duration-400 overflow-hidden text-left ${
                      isHovered
                        ? 'max-h-48 opacity-100 mt-4 pt-3.5 border-t border-[#f3efe4]/20'
                        : 'max-h-0 opacity-0 mt-0 pt-0'
                    }`}
                  >
                    <p className="font-mono text-xs text-[#f3efe4]/90 leading-relaxed mb-3">
                      {bar.dropdownDescription}
                    </p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#00ff33] text-[#040705] font-mono text-[11px] font-bold uppercase tracking-widest">
                      <span>OPEN {bar.title.toUpperCase()}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Collapsed Footer */}
                  {!isHovered && (
                    <div className="mt-4 pt-3 border-t border-[#f3efe4]/15 flex items-center justify-between font-mono text-[10px] text-[#f3efe4]/60">
                      <span>{bar.tag}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#ff007f]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Botanical Lily Pads, Reeds, Lotus & Poison Frog Cutout Footer (From Reference Cover 1) */}
      <div className="w-full mt-6 relative z-10">
        <BotanicalLagoonFooter className="h-28 sm:h-36 -mb-6" />
        <footer className="w-full border-t border-[#f3efe4]/20 pt-3 flex items-center justify-center font-geometric font-semibold text-[11px] tracking-[0.22em] text-[#f3efe4]/70 uppercase">
          <div>BOROUGH &amp; LAGOS NOIR EDITIONS // MY SISTER, THE SERIAL KILLER</div>
        </footer>
      </div>
    </section>
  );
};
