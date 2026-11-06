import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Sparkles, BookOpen, Users, Skull } from 'lucide-react';
import { NAV_DROPDOWN_SLOTS, PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';

interface LandingNavProps {
  visible: boolean;
  onSelectPage: (page: PageId) => void;
}

export const LandingNav: React.FC<LandingNavProps> = ({ visible, onSelectPage }) => {
  // Track which dropdown card is expanded (default first one open on desktop or toggle on click/hover)
  const [expandedId, setExpandedId] = useState<Exclude<PageId, 'home'> | null>('guide');

  const getIcon = (id: Exclude<PageId, 'home'>) => {
    switch (id) {
      case 'guide':
        return <Skull className="w-6 h-6 text-[#00ff00]" />;
      case 'characters':
        return <Users className="w-6 h-6 text-[#00ff00]" />;
      case 'author':
        return <BookOpen className="w-6 h-6 text-[#00ff00]" />;
    }
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 max-w-7xl mx-auto">
      {/* Editorial Top Context Banner (appears after headline docks) */}
      <div
        className={`transition-all duration-1000 delay-150 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-[#00ff00]/20 pb-8">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#00ff00]/40 bg-[#00ff00]/5 text-[#00ff00] font-mono text-xs uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LAGOS CRIME DOSSIER // PBL INTERACTIVE PROTOTYPE</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#f1efe6] leading-[1.05]">
              My Sister, <span className="text-[#00ff00] neon-text-glow">The Serial Killer</span>
            </h2>
          </div>
          <div className="lg:col-span-4 font-mono text-xs sm:text-sm text-[#f1efe6]/70 space-y-1 border-l-2 border-[#00ff00] pl-4">
            <p className="text-[#00ff00] font-semibold">SELECT CASE FILE BELOW</p>
            <p>Hover or click any module below to expand its dossier brief, then enter the interactive experience.</p>
          </div>
        </div>
      </div>

      {/* Three Large Neon-Green-Outlined Dropdown Cards sliding up from bottom */}
      <div
        className={`my-auto py-8 transition-all duration-1000 ease-out ${
          visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-32 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {NAV_DROPDOWN_SLOTS.map((card, idx) => {
            const isExpanded = expandedId === card.id;
            return (
              <div
                key={card.id}
                style={{ transitionDelay: `${idx * 120}ms` }}
                onMouseEnter={() => {
                  soundFX.playHoverTick(540 + idx * 80);
                  setExpandedId(card.id);
                }}
                onClick={() => {
                  soundFX.playHoverTick(620);
                  if (expandedId === card.id) {
                    onSelectPage(card.id);
                  } else {
                    setExpandedId(card.id);
                  }
                }}
                className={`group relative cursor-pointer border-2 transition-all duration-500 flex flex-col justify-between p-6 sm:p-8 bg-[#050505]/90 backdrop-blur-sm ${
                  isExpanded
                    ? 'border-[#00ff00] neon-glow-strong -translate-y-2 scale-[1.015]'
                    : 'border-[#00ff00]/40 hover:border-[#00ff00] neon-glow hover:-translate-y-1'
                }`}
              >
                {/* Corner Decorative Markers */}
                <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#00ff00]" />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#00ff00]" />
                <span className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#00ff00]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#00ff00]" />

                {/* Top Header of Card */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs tracking-[0.25em] px-2.5 py-1 bg-[#00ff00]/10 border border-[#00ff00]/40 text-[#00ff00]">
                      {card.number} // MODULE
                    </span>
                    <div className="flex items-center gap-2">
                      {getIcon(card.id)}
                      <ChevronDown
                        className={`w-5 h-5 text-[#00ff00] transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                  </div>

                  <p className="font-mono text-[11px] tracking-[0.2em] text-[#00ff00]/80 uppercase mb-1">
                    {card.subtitle}
                  </p>
                  <h3 className="font-display text-5xl sm:text-6xl uppercase tracking-wide text-[#f1efe6] group-hover:text-[#00ff00] transition-colors">
                    {card.title}
                  </h3>
                </div>

                {/* Expandable Dropdown Body */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-72 opacity-100 mt-6 pt-6 border-t border-[#00ff00]/30' : 'max-h-0 opacity-0 mt-0 pt-0 border-t-0'
                  }`}
                >
                  <div className="mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#00ff00] bg-[#00ff00]/10 px-2 py-0.5">
                      {card.tag}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#f1efe6]/85 font-mono leading-relaxed mb-6">
                    {card.dropdownDescription}
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundFX.playGlitchSwitch();
                      onSelectPage(card.id);
                    }}
                    className="w-full py-3 px-4 bg-[#00ff00] text-[#050505] font-mono font-bold text-xs sm:text-sm uppercase tracking-widest flex items-center justify-between hover:bg-[#f1efe6] transition-colors"
                  >
                    <span>OPEN {card.title.toUpperCase()}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Collapsed Hint Footer */}
                {!isExpanded && (
                  <div className="mt-6 pt-4 border-t border-[#00ff00]/15 flex items-center justify-between font-mono text-xs text-[#f1efe6]/50">
                    <span>CLICK OR HOVER TO EXPAND</span>
                    <span className="text-[#00ff00]">+</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <footer
        className={`border-t border-[#00ff00]/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-[#f1efe6]/50 transition-opacity duration-1000 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div>THEME: #050505 NOIR // #00FF00 NEON GREEN // #3A0B10 CRIME-SCENE SHIFT</div>
        <div className="text-[#00ff00]/80">CONTENT SLOTS: READY IN src/data/contentSlots.ts</div>
      </footer>
    </section>
  );
};
