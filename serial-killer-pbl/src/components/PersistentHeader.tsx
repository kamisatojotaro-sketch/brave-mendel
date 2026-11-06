import React from 'react';
import { Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { PageId } from '../data/contentSlots';
import { soundFX } from '../utils/soundFX';
import { VinylEasterEgg } from './VinylEasterEgg';

export type HeroStage = 'rising' | 'docking' | 'docked';

interface PersistentHeaderProps {
  heroStage: HeroStage;
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onReplayIntro: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isCrimsonMode?: boolean;
}

export const PersistentHeader: React.FC<PersistentHeaderProps> = ({
  heroStage,
  onNavigate,
  onReplayIntro,
  isMuted,
  onToggleMute,
  isCrimsonMode = false,
}) => {
  const isDocked = heroStage === 'docked';

  const getHeadlinePositionStyle = (): React.CSSProperties => {
    switch (heroStage) {
      case 'rising':
        return {
          top: '106vh',
          left: '50%',
          transform: 'translate(-50%, 0) scale(1.06)',
          opacity: 0,
        };
      case 'docking':
        return {
          top: '46vh',
          left: '50%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
        };
      case 'docked':
        return {
          top: '14px',
          left: '24px',
          transform: 'translate(0, 0) scale(1)',
          opacity: 1,
        };
    }
  };

  return (
    <>
      {/* Top Persistent Navigation Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
          isDocked
            ? isCrimsonMode
              ? 'bg-[#2a060e]/85 backdrop-blur-xl border-b border-[#ff007f]/35 py-3 shadow-lg'
              : 'bg-[#041d0e]/80 backdrop-blur-xl border-b border-[#f3efe4]/20 py-3 shadow-lg'
            : 'bg-transparent border-transparent py-4 pointer-events-none'
        }`}
      >
        <div className="w-full px-6 flex items-center justify-end gap-3 h-11">
          {/* Top-Bar Interactive Vinyl Disc Easter Egg & Controls */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${
              isDocked ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'
            }`}
          >
            <VinylEasterEgg />

            <button
              onClick={onReplayIntro}
              title="Replay title intro animation"
              className="p-2 rounded-full border border-[#f3efe4]/25 bg-[#040705]/60 text-[#f3efe4]/80 hover:text-[#00ff33] hover:border-[#00ff33] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onToggleMute}
              title={isMuted ? 'Unmute UI sound FX' : 'Mute UI sound FX'}
              className={`p-2 rounded-full border transition-colors ${
                !isMuted
                  ? 'border-[#00ff33] bg-[#00ff33]/15 text-[#00ff33]'
                  : 'border-[#f3efe4]/25 bg-[#040705]/60 text-[#f3efe4]/75 hover:text-[#ff007f] hover:border-[#ff007f]'
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Hero Headline: Rises from bottom (~1.5s) -> Docks into Top-Left Corner */}
      <div
        style={getHeadlinePositionStyle()}
        onClick={() => {
          if (isDocked) {
            soundFX.playHoverTick(520);
            onNavigate('home');
          }
        }}
        className={`fixed z-50 transition-all duration-[1150ms] ease-[cubic-bezier(0.22,1,0.36,1)] select-none ${
          isDocked ? 'cursor-pointer group' : 'pointer-events-none w-full px-4 text-center'
        }`}
      >
        <div className={`flex items-center gap-3 ${isDocked ? '' : 'justify-center'}`}>
          {isDocked && (
            <span
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                isCrimsonMode
                  ? 'bg-[#ff007f] shadow-[0_0_10px_#ff007f]'
                  : 'bg-[#00ff33] shadow-[0_0_10px_#00ff33]'
              }`}
            />
          )}
          <h1
            className={`font-display uppercase tracking-wider transition-all duration-[1150ms] ${
              isDocked
                ? 'text-2xl sm:text-3xl text-[#f3efe4] group-hover:text-[#00ff33]'
                : 'text-[clamp(2rem,5.8vw,6.2rem)] leading-none text-[#00ff33] neon-text-glow'
            }`}
          >
            How to get away{' '}
            <span
              className={
                isCrimsonMode
                  ? 'text-[#ff007f]'
                  : isDocked
                  ? 'text-[#00ff33]'
                  : 'text-[#ff007f] magenta-text-shadow'
              }
            >
              with murder
            </span>
          </h1>
        </div>
        {!isDocked && (
          <p className="mt-4 font-editorial italic text-xl sm:text-2xl text-[#f3efe4] text-center animate-pulse">
            “Bleach masks the smell of blood better than anything else...”
          </p>
        )}
      </div>
    </>
  );
};
