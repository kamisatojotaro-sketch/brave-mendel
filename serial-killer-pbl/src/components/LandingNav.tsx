import React, { useState, useRef } from 'react';
import { ChevronDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { NAV_DROPDOWN_SLOTS, PageId } from '../data/contentSlots';
import {
  BloodyClothProp,
  HuntingKnifeProp,
  BleachBottleProp,
  RubberGlovesProp,
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
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isBookHovered, setIsBookHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleBookClick = () => {
    soundFX.playDramaticPulse();
    setIsBookOpen((prev) => {
      const next = !prev;
      if (next) {
        window.setTimeout(() => {
          dropdownRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 140);
      }
      return next;
    });
  };

  // Custom Pop-Art Murder Prop Illustration per Dropdown Card
  const getBarCrimeProp = (id: PageId) => {
    switch (id) {
      case 'guide':
        return <BleachBottleProp className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)]" />;
      case 'characters':
        return <HuntingKnifeProp className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)]" />;
      case 'author':
        return <BloodyClothProp className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)]" />;
      default:
        return <BleachBottleProp className="w-14 h-14 sm:w-16 sm:h-16 shrink-0" />;
    }
  };

  return (
    <section
      className={`relative min-h-screen w-full flex flex-col items-center justify-between pt-16 sm:pt-20 pb-6 sm:pb-8 px-3 sm:px-8 transition-all duration-1000 overflow-hidden ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
      }`}
    >
      {/* =====================================================================
          FLOATING CRIME-SCENE & STORY MOTIFS AROUND THE LAGOON CANVAS
          Visible on both mobile (compact corner props) and desktop!
         ===================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {/* Top-Left Floating Hunting Knife with Crimson Drips */}
        <div className="absolute left-1 sm:left-6 lg:left-12 top-16 sm:top-24 animate-float-slow opacity-75 sm:opacity-90">
          <HuntingKnifeProp className="w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          <span className="hidden sm:block font-geometric text-[10px] uppercase tracking-[0.25em] text-[#c0392b] font-bold -mt-1 ml-2">
            FATHER'S 9-INCH BLADE
          </span>
        </div>

        {/* Top-Right Floating Blood-Soaked Bathroom Cloth */}
        <div
          style={{ animationDelay: '1.2s' }}
          className="absolute right-1 sm:right-6 lg:right-12 top-16 sm:top-28 animate-float-slow opacity-75 sm:opacity-90"
        >
          <BloodyClothProp className="w-14 h-14 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
          <span className="hidden sm:block font-geometric text-[10px] uppercase tracking-[0.22em] text-[#f1efe6]/85 -mt-1 mr-2 text-right">
            EVIDENCE // STAINED CLOTH
          </span>
        </div>

        {/* Bottom-Left Floating Bleach Bottle */}
        <div
          style={{ animationDelay: '2.4s' }}
          className="hidden sm:block absolute left-8 lg:left-14 bottom-40 animate-float-slow opacity-90"
        >
          <BleachBottleProp className="w-20 h-20 lg:w-24 lg:h-24" />
          <span className="block font-geometric text-[10px] uppercase tracking-[0.25em] text-[#00ff00] font-bold">
            LEMON &amp; BLEACH
          </span>
        </div>

        {/* Bottom-Right Floating Rubber Scrubbing Gloves */}
        <div
          style={{ animationDelay: '3.1s' }}
          className="hidden sm:block absolute right-8 lg:right-14 bottom-40 animate-float-slow opacity-90"
        >
          <RubberGlovesProp className="w-20 h-20 lg:w-24 lg:h-24" />
          <span className="block font-geometric text-[10px] uppercase tracking-[0.24em] text-[#c0392b] font-bold text-right">
            CLEANUP GLOVES
          </span>
        </div>
      </div>

      {/* Main Center Stage: Collector's Botanical & Pop-Art Hardcover Book */}
      <div className="my-auto w-full max-w-5xl flex flex-col items-center z-10 pt-2">
        {/* Interactive Custom-Crafted Green Hardcover Book */}
        <div
          onClick={handleBookClick}
          onMouseEnter={() => {
            soundFX.playHoverTick(640);
            setIsBookHovered(true);
          }}
          onMouseLeave={() => setIsBookHovered(false)}
          role="button"
          tabIndex={0}
          aria-expanded={isBookOpen}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBookClick();
            }
          }}
          className={`group relative cursor-pointer select-none transition-all duration-500 ease-out active:scale-95 ${
            isBookOpen
              ? '-translate-y-1 sm:-translate-y-2 scale-[0.96] book-custom-glow-active'
              : 'hover:-translate-y-3 hover:scale-[1.03] book-custom-glow'
          }`}
        >
          {/* Ambient Lagoon & Crimson Halo Behind Book */}
          <div
            className={`pointer-events-none absolute -inset-6 sm:-inset-8 rounded-full blur-3xl transition-opacity duration-500 ${
              isBookOpen || isBookHovered
                ? 'opacity-90 bg-[radial-gradient(circle,rgba(192,57,43,0.34)_0%,rgba(0,255,0,0.28)_50%,transparent_75%)]'
                : 'opacity-45 bg-[radial-gradient(circle,rgba(0,255,0,0.22)_0%,transparent_70%)]'
            }`}
          />

          {/* 3D Hardcover Book Frame — Scaled nicely for mobile & desktop */}
          <div className="relative w-[262px] sm:w-80 h-[365px] sm:h-[435px] rounded-r-2xl rounded-l-md hardcover-surface border-2 border-[#f1efe6]/45 shadow-[0_28px_60px_rgba(0,0,0,0.92)] flex overflow-hidden">
            {/* Book Left Spine Binding */}
            <div className="w-6 sm:w-7 h-full bg-gradient-to-r from-[#020f07] via-[#07361b] to-[#0a120c] border-r-2 border-[#f1efe6]/30 flex flex-col items-center justify-between py-4 sm:py-5 shrink-0">
              <div className="w-2 h-1.5 rounded-full bg-[#c0392b]" />
              <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.26em] text-[#f1efe6]/70 uppercase [writing-mode:vertical-rl] rotate-180">
                BRAITHWAITE // LAGOS NOIR
              </span>
              <div className="w-2 h-1.5 rounded-full bg-[#00ff00]" />
            </div>

            {/* Book Front Cover Artwork */}
            <div className="relative flex-1 h-full p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
              {/* Top Swirling Water Ripples on Book Cover */}
              <svg
                viewBox="0 0 300 120"
                fill="none"
                className="pointer-events-none absolute top-0 left-0 w-full opacity-50"
              >
                <path
                  d="M-10 25 C 60 65, 130 -5, 210 40 C 260 68, 290 20, 320 35"
                  stroke="#f1efe6"
                  strokeWidth="1.5"
                />
                <path
                  d="M-10 55 C 80 15, 150 85, 240 45 C 275 30, 295 55, 320 45"
                  stroke="#f1efe6"
                  strokeWidth="1.1"
                />
                <circle cx="235" cy="26" r="10" fill="#f1efe6" fillOpacity="0.85" />
                <path d="M226 30 A 10 10 0 0 0 244 32 Z" fill="#c0392b" />
              </svg>

              {/* Bottom Reeds + Lily Pad Silhouette on Book Cover */}
              <svg
                viewBox="0 0 300 110"
                fill="none"
                className="pointer-events-none absolute bottom-0 left-0 w-full opacity-75"
              >
                <path d="M0 95 Q 80 65 150 85 T 300 75 L 300 110 L 0 110 Z" fill="#050505" />
                <path d="M35 110 Q 45 65 28 32 Q 52 68 46 110 Z" fill="#f1efe6" />
                <path d="M52 110 Q 65 70 78 42 Q 66 78 58 110 Z" fill="#c0392b" />
                <path d="M245 110 Q 235 65 252 35 Q 228 70 236 110 Z" fill="#f1efe6" />
                <path d="M262 110 Q 272 75 285 48 Q 272 82 266 110 Z" fill="#c0392b" />
              </svg>

              {/* Top Geometric Editorial Header */}
              <div className="relative z-10 text-center pt-0.5">
                <p className="font-geometric font-semibold text-[9px] sm:text-[11px] uppercase tracking-[0.26em] text-[#f1efe6]/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  BOOKER PRIZE LONGLIST
                </p>
              </div>

              {/* Center Splattered Neon-Green Title + Round Crimson Sunglasses */}
              <div className="relative z-10 my-auto text-center space-y-2 sm:space-y-2.5">
                <PaintSplatterBadge
                  color="#00ff00"
                  className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-3 -right-2 opacity-80"
                />
                <PaintSplatterBadge
                  color="#c0392b"
                  className="w-9 h-9 sm:w-10 sm:h-10 absolute bottom-6 -left-2 opacity-85"
                />

                <h2 className="font-display font-bold text-4xl sm:text-[52px] uppercase tracking-tight leading-[0.88] text-[#00ff00] neon-text-glow">
                  <span className="block">MY SISTER, THE</span>
                  <span className="block text-[#00ff00]">SERIAL KILLER</span>
                </h2>

                {/* Round Crimson-Tinted Sunglasses Reflecting the Knife */}
                <div className="py-0.5 sm:py-1 flex justify-center">
                  <CrimsonSunglassesProp className="w-32 h-12 sm:w-40 sm:h-16 drop-shadow-[0_8px_14px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-300" />
                </div>

                {/* Author Name + Editorial Quote */}
                <div className="space-y-0.5">
                  <p className="font-geometric font-bold text-xs sm:text-base tracking-[0.2em] text-[#00ff00] uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                    OYINKAN BRAITHWAITE
                  </p>
                  <p className="font-editorial italic text-[11px] sm:text-sm text-[#f1efe6]/95">
                    “A wickedly funny Lagos noir”
                  </p>
                </div>
              </div>

              {/* Bottom Bar on Book Cover */}
              <div className="relative z-10 flex items-center justify-between border-t border-[#f1efe6]/30 pt-2">
                <span className="font-geometric font-semibold text-[8px] sm:text-[9px] text-[#f1efe6]/85 uppercase tracking-[0.2em]">
                  LAGOS EDITIONS
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#c0392b] font-mono text-[9px] text-[#f1efe6] uppercase tracking-wider font-bold shadow-sm">
                  <span>{isBookOpen ? 'CLOSE BOOK' : 'OPEN BOOK'}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-500 ${
                      isBookOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>
              </div>
            </div>

            {/* Right Fore-Edge Cream Page Stack Effect */}
            <div className="w-2.5 sm:w-3 h-full bg-[repeating-linear-gradient(90deg,#f1efe6_0px,#f1efe6_1px,#c8c2b0_1px,#c8c2b0_2px)] opacity-90 shrink-0" />
          </div>
        </div>

        {/* ===================================================================
            3 TRANSLUCENT FROSTED-GLASS DROPDOWN BARS
            Uses max-h-[2200px] so all 3 stacked cards fit 100% on mobile!
           =================================================================== */}
        <div
          ref={dropdownRef}
          className={`w-full max-w-5xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
            isBookOpen
              ? 'max-h-[2200px] opacity-100 mt-5 sm:mt-7 translate-y-0'
              : 'max-h-0 opacity-0 mt-0 -translate-y-6 pointer-events-none'
          }`}
        >
          {/* Connecting Stem Lines from Book to the 3 Translucent Bars (Desktop) */}
          <div className="hidden md:flex justify-around items-center px-24 -mb-1">
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#00ff00] to-[#c0392b]" />
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#c0392b] to-[#00ff00]" />
            <div className="w-0.5 h-6 bg-gradient-to-b from-[#00ff00] to-[#c0392b]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 px-1 sm:px-2 pb-4">
            {NAV_DROPDOWN_SLOTS.map((bar, idx) => {
              const isMiddle = idx === 1;
              return (
                <button
                  key={bar.id}
                  onClick={() => {
                    soundFX.playGlitchSwitch();
                    onSelectPage(bar.id);
                  }}
                  onMouseEnter={() => soundFX.playHoverTick(540 + idx * 90)}
                  style={{ transitionDelay: `${idx * 75}ms` }}
                  className={`glass-dropdown-bar group relative text-left rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-2 active:scale-[0.98] flex flex-col justify-between overflow-hidden ${
                    isMiddle
                      ? 'hover:border-[#c0392b] magenta-glow'
                      : 'hover:border-[#00ff00] neon-glow'
                  }`}
                >
                  {/* Top Specular Highlight Bar */}
                  <div
                    className={`pointer-events-none absolute inset-x-0 top-0 h-1 transition-opacity duration-300 opacity-75 group-hover:opacity-100 ${
                      isMiddle
                        ? 'bg-gradient-to-r from-transparent via-[#c0392b] to-transparent'
                        : 'bg-gradient-to-r from-transparent via-[#00ff00] to-transparent'
                    }`}
                  />

                  {/* Top Row: Module Badge + Custom Murder Prop Illustration */}
                  <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                    <div>
                      <span className="inline-block font-geometric text-[10px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 rounded bg-[#c0392b] text-[#f1efe6] shadow-sm">
                        {bar.number} // CASE FILE
                      </span>
                      <p className="mt-2 font-editorial italic text-xs sm:text-sm text-[#00ff00]">
                        {bar.id === 'guide' && '“Bleach masks the smell of blood...”'}
                        {bar.id === 'characters' && '“Three boyfriends. One loyal sister.”'}
                        {bar.id === 'author' && '“Set in the heart of Lagos, Nigeria”'}
                      </p>
                    </div>

                    {/* Illustrated Murder Prop */}
                    <div className="group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                      {getBarCrimeProp(bar.id)}
                    </div>
                  </div>

                  {/* Bar Title & Description */}
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-[#f1efe6] group-hover:text-[#00ff00] transition-colors">
                        {bar.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-[#f1efe6]/70 group-hover:text-[#c0392b] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="mt-1 font-sans text-xs text-[#f1efe6]/85 font-medium">
                      {bar.subtitle}
                    </p>
                    <p className="mt-1.5 sm:mt-2 font-mono text-[11px] text-[#f1efe6]/75 leading-relaxed">
                      {bar.dropdownDescription}
                    </p>
                  </div>

                  {/* `<content>` Placeholder Preview Box */}
                  <div className="mt-4 sm:mt-5 pt-3 border-t border-[#f1efe6]/20 flex items-center justify-between font-mono text-xs">
                    <span className="text-[#00ff00] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c0392b]" />
                      <span>{bar.tag}</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#f1efe6] group-hover:text-[#c0392b] font-bold">
                      OPEN &rarr;
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Botanical Lily Pads, Reeds, Lotus & Poison Frogs Cutout Footer */}
      <div className="w-full mt-4 relative z-10">
        <BotanicalLagoonFooter className="h-20 sm:h-36 -mb-5 sm:-mb-6" />
        <footer className="w-full border-t border-[#f1efe6]/20 pt-3 flex items-center justify-center font-geometric font-semibold text-[9px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.22em] text-[#f1efe6]/70 uppercase text-center">
          <div>BOROUGH &amp; LAGOS NOIR EDITIONS // MY SISTER, THE SERIAL KILLER</div>
        </footer>
      </div>
    </section>
  );
};
