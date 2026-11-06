import React, { useState, useEffect, useCallback } from 'react';
import { PageId } from './data/contentSlots';
import { PersistentHeader, HeroStage } from './components/PersistentHeader';
import { LandingNav } from './components/LandingNav';
import { GuidePage } from './components/GuidePage';
import { CharactersPage } from './components/CharactersPage';
import { AboutAuthorPage } from './components/AboutAuthorPage';
import { soundFX } from './utils/soundFX';

export function App() {
  const [heroStage, setHeroStage] = useState<HeroStage>('rising');
  const [activePage, setActivePage] = useState<PageId>('home');
  const [isTransitioningPage, setIsTransitioningPage] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCrimsonMode, setIsCrimsonMode] = useState(false);

  // Run the ~1.5s Hero Headline rise -> top-left dock sequence
  const runHeroIntroSequence = useCallback(() => {
    setHeroStage('rising');

    // Step 1: Fade in + slide up to center (~120ms kick-off so CSS transition animates smoothly)
    const tRise = window.setTimeout(() => {
      setHeroStage('docking');
    }, 120);

    // Step 2: After ~1.5s in center, travel smoothly to top-left corner and reveal navigation panel
    const tDock = window.setTimeout(() => {
      setHeroStage('docked');
    }, 1650);

    return () => {
      window.clearTimeout(tRise);
      window.clearTimeout(tDock);
    };
  }, []);

  useEffect(() => {
    const cleanup = runHeroIntroSequence();
    return cleanup;
  }, [runHeroIntroSequence]);

  const handleNavigate = (targetPage: PageId) => {
    if (targetPage === activePage) return;
    setIsTransitioningPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.setTimeout(() => {
      setActivePage(targetPage);
      if (targetPage !== 'guide') {
        setIsCrimsonMode(false);
      }
      setIsTransitioningPage(false);
    }, 240);
  };

  const handleReplayIntro = () => {
    setActivePage('home');
    setIsCrimsonMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    runHeroIntroSequence();
  };

  const handleToggleMute = () => {
    const nextMuted = soundFX.toggleMute();
    setIsMuted(nextMuted);
  };

  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#f1efe6] bg-neon-grid relative overflow-x-hidden">
      {/* Subtle CRT Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none scanline-overlay z-40" />

      {/* Persistent Animated Headline ("How to get away with murder") + Top Navigation */}
      <PersistentHeader
        heroStage={heroStage}
        activePage={activePage}
        onNavigate={handleNavigate}
        onReplayIntro={handleReplayIntro}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isCrimsonMode={isCrimsonMode}
      />

      {/* SPA View Container with Smooth Fade/Slide Page Transitions */}
      <main
        className={`relative z-10 transition-all duration-300 ${
          isTransitioningPage ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        {activePage === 'home' && (
          <LandingNav
            visible={heroStage === 'docked'}
            onSelectPage={handleNavigate}
          />
        )}

        {activePage === 'guide' && (
          <GuidePage
            onNavigate={handleNavigate}
            onCrimsonShiftChange={setIsCrimsonMode}
          />
        )}

        {activePage === 'characters' && (
          <CharactersPage onNavigate={handleNavigate} />
        )}

        {activePage === 'author' && (
          <AboutAuthorPage onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  );
}

export default App;
