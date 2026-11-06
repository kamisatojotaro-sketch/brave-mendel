import React from 'react';
import { ArrowLeft, BookOpen, MapPin, Award, Sparkles, FileText } from 'lucide-react';
import { AUTHOR_SLOT, PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';

interface AboutAuthorPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutAuthorPage: React.FC<AboutAuthorPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen w-full pt-24 pb-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Sub-bar */}
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

          <div className="font-mono text-xs text-[#00ff00] uppercase tracking-widest">
            MODULE 03 // LITERARY & AUTHOR DOSSIER
          </div>
        </div>

        {/* Hero Editorial Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Stylized Author / Book Cover Emblem (4 cols) */}
          <div className="lg:col-span-4 border-2 border-[#00ff00] bg-[#050505] p-6 neon-glow flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between font-mono text-xs text-[#00ff00]">
              <span>AUTHOR_FILE // 03</span>
              <span>DEBUT NOVEL</span>
            </div>

            {/* Book Cover Inspired Neon Green Graphic */}
            <div className="my-10 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-36 h-48 border-2 border-[#00ff00] bg-[#00ff00]/10 flex flex-col justify-between p-4 shadow-[0_0_25px_rgba(0,255,0,0.3)] relative">
                <span className="font-mono text-[9px] tracking-widest text-[#00ff00] uppercase">
                  {AUTHOR_SLOT.authorName}
                </span>
                <div className="font-display text-2xl leading-none text-[#f1efe6] uppercase">
                  MY SISTER,
                  <span className="block text-[#00ff00]">THE SERIAL</span>
                  KILLER
                </div>
                <div className="h-1 w-full bg-[#00ff00]" />
              </div>
            </div>

            <div className="space-y-2 border-t border-[#00ff00]/30 pt-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#f1efe6]/80">
                <MapPin className="w-3.5 h-3.5 text-[#00ff00]" />
                <span>SETTING: {AUTHOR_SLOT.setting}</span>
              </div>
              <div className="flex items-center gap-2 text-[#f1efe6]/80">
                <Award className="w-3.5 h-3.5 text-[#00ff00]" />
                <span>{AUTHOR_SLOT.accolade}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Author Bio & Context `<content>` Slots (8 cols) */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00ff00]/10 border border-[#00ff00]/40 text-[#00ff00] font-mono text-xs uppercase tracking-widest mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                <span>ABOUT THE AUTHOR & NOVEL CONTEXT</span>
              </div>
              <h2 className="font-display text-6xl sm:text-7xl md:text-8xl uppercase tracking-wide text-[#f1efe6] leading-none neon-text-glow">
                {AUTHOR_SLOT.authorName}
              </h2>
            </div>

            {/* Slot 1: Oyinkan Braithwaite Biography */}
            <div className="border-2 border-[#00ff00]/60 bg-[#050505]/90 p-6 neon-glow space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#00ff00] border-b border-[#00ff00]/20 pb-2">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>01 // AUTHOR BIOGRAPHY SLOT</span>
                </span>
                <span>src/data/contentSlots.ts</span>
              </div>
              <div className="p-4 bg-[#00ff00]/5 border-l-4 border-[#00ff00] font-mono text-base text-[#f1efe6]">
                {AUTHOR_SLOT.authorBioContent}
              </div>
            </div>

            {/* Slot 2: Book Context & Lagos Setting */}
            <div className="border-2 border-[#00ff00]/60 bg-[#050505]/90 p-6 neon-glow space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#00ff00] border-b border-[#00ff00]/20 pb-2">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>02 // BOOK CONTEXT & THEMES SLOT</span>
                </span>
                <span>src/data/contentSlots.ts</span>
              </div>
              <div className="p-4 bg-[#00ff00]/5 border-l-4 border-[#00ff00] font-mono text-base text-[#f1efe6]">
                {AUTHOR_SLOT.bookContextContent}
              </div>
            </div>

            {/* Slot 3: PBL Project Notes / Literary Analysis */}
            <div className="border-2 border-[#00ff00]/40 bg-[#050505]/90 p-6 space-y-3">
              <div className="flex items-center justify-between font-mono text-xs text-[#00ff00] border-b border-[#00ff00]/20 pb-2">
                <span>03 // ADDITIONAL PBL ANALYSIS SLOT</span>
                <span>src/data/contentSlots.ts</span>
              </div>
              <div className="p-4 bg-[#00ff00]/5 border-l-4 border-[#00ff00] font-mono text-base text-[#f1efe6]">
                {AUTHOR_SLOT.pblNotesContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
