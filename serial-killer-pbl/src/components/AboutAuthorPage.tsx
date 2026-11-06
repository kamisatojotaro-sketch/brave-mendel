import React from 'react';
import { ArrowLeft, BookOpen, MapPin, Award, Sparkles, FileText } from 'lucide-react';
import { AUTHOR_SLOT, PageId } from '../data/contentSlots';
import {
  CrimsonSunglassesProp,
  BloodyClothProp,
  HuntingKnifeProp,
  BleachBottleProp,
  PaintSplatterBadge,
  BotanicalLagoonFooter,
} from './BotanicalCrimeArt';
import { soundFX } from '../utils/soundFX';

interface AboutAuthorPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutAuthorPage: React.FC<AboutAuthorPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full pt-24 pb-16 px-4 sm:px-8 relative">
      {/* Floating Decorative Murder Props */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="hidden md:block absolute right-8 top-32 opacity-80 animate-float-slow">
          <BloodyClothProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
        <div
          style={{ animationDelay: '1.4s' }}
          className="hidden md:block absolute left-6 bottom-32 opacity-80 animate-float-slow"
        >
          <HuntingKnifeProp className="w-20 h-20 lg:w-24 lg:h-24" />
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        {/* Top Sub-bar */}
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

          <div className="font-mono text-xs text-[#00ff33] uppercase tracking-widest font-bold">
            MODULE 03 // LITERARY &amp; AUTHOR DOSSIER
          </div>
        </div>

        {/* Hero Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stylized Book Cover Collector Card (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl glass-dropdown-bar p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#00ff33]">
              <span>AUTHOR_FILE // 03</span>
              <span className="px-2 py-0.5 rounded bg-[#ff007f] text-[#f3efe4] font-bold">DEBUT NOVEL</span>
            </div>

            {/* Book Cover Inspired Neon Green + Crimson Sunglasses Emblem */}
            <div className="my-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-44 h-56 rounded-xl border-2 border-[#00ff33] hardcover-surface flex flex-col justify-between p-4 shadow-[0_12px_30px_rgba(0,0,0,0.8)] relative">
                <span className="font-geometric font-semibold text-[9px] uppercase tracking-[0.25em] text-[#f3efe4]/90">
                  BOOKER PRIZE LONGLIST
                </span>
                <div className="font-display text-2xl leading-none text-[#00ff33] uppercase neon-text-glow">
                  MY SISTER,
                  <span className="block">THE SERIAL</span>
                  KILLER
                </div>
                <div className="flex justify-center">
                  <CrimsonSunglassesProp className="w-28 h-12" />
                </div>
                <span className="font-geometric font-bold text-xs tracking-[0.2em] text-[#f3efe4]">
                  {AUTHOR_SLOT.authorName}
                </span>
              </div>
              <p className="font-editorial italic text-base sm:text-lg text-[#ff007f]">
                “A wickedly funny Lagos noir thriller”
              </p>
            </div>

            <div className="space-y-2 border-t border-[#f3efe4]/20 pt-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#f3efe4]/90">
                <MapPin className="w-3.5 h-3.5 text-[#ff007f]" />
                <span>SETTING: {AUTHOR_SLOT.setting}</span>
              </div>
              <div className="flex items-center gap-2 text-[#f3efe4]/90">
                <Award className="w-3.5 h-3.5 text-[#00ff33]" />
                <span>{AUTHOR_SLOT.accolade}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Author Bio & Context `<content>` Slots (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6 relative">
            <PaintSplatterBadge
              color="#00ff33"
              className="w-20 h-20 absolute -top-6 right-8 opacity-75"
            />
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ff007f] text-[#f3efe4] font-mono font-bold text-xs uppercase tracking-widest mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>ABOUT THE AUTHOR &amp; NOVEL CONTEXT</span>
                </div>
                <h2 className="font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-wide text-[#00ff33] leading-none neon-text-glow">
                  {AUTHOR_SLOT.authorName}
                </h2>
              </div>
              <BleachBottleProp className="hidden sm:block w-16 h-16 shrink-0" />
            </div>

            {/* Slot 1: Oyinkan Braithwaite Biography */}
            <div className="rounded-2xl glass-dropdown-bar p-6 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#00ff33] border-b border-[#f3efe4]/15 pb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ff007f]" />
                  <span>01 // AUTHOR BIOGRAPHY SLOT</span>
                </span>
                <span className="text-[#ff007f] font-bold">src/data/contentSlots.ts</span>
              </div>
              <div className="p-4 rounded-xl bg-[#040705]/70 border-l-4 border-[#00ff33] font-mono text-base text-[#f3efe4]">
                {AUTHOR_SLOT.authorBioContent}
              </div>
            </div>

            {/* Slot 2: Book Context & Lagos Setting */}
            <div className="rounded-2xl glass-dropdown-bar p-6 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#00ff33] border-b border-[#f3efe4]/15 pb-2">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#ff007f]" />
                  <span>02 // BOOK CONTEXT &amp; THEMES SLOT (LAGOS, PATRIARCHY, BEAUTY &amp; SISTERHOOD)</span>
                </span>
                <span className="text-[#ff007f] font-bold">src/data/contentSlots.ts</span>
              </div>
              <div className="p-4 rounded-xl bg-[#040705]/70 border-l-4 border-[#ff007f] font-mono text-base text-[#f3efe4]">
                {AUTHOR_SLOT.bookContextContent}
              </div>
            </div>

            {/* Slot 3: PBL Project Notes / Literary Analysis */}
            <div className="rounded-2xl glass-dropdown-bar p-6 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#00ff33] border-b border-[#f3efe4]/15 pb-2">
                <span>03 // ADDITIONAL PBL ANALYSIS SLOT</span>
                <span className="text-[#ff007f] font-bold">src/data/contentSlots.ts</span>
              </div>
              <div className="p-4 rounded-xl bg-[#040705]/70 border-l-4 border-[#00ff33] font-mono text-base text-[#f3efe4]">
                {AUTHOR_SLOT.pblNotesContent}
              </div>
            </div>
          </div>
        </div>

        <BotanicalLagoonFooter className="h-24 sm:h-32 pt-4" />
      </div>
    </div>
  );
};
