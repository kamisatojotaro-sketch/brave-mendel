import React, { useState } from 'react';
import { learnerTopics } from '../../data/learnerData';
import { LearnerDepth, LearnerTopic } from '../../types';
import { generateUniversalLearnerTopic } from '../../utils/aiGenerator';
import { DepthSlider } from './DepthSlider';
import { ConceptTree } from './ConceptTree';
import { BionicText } from '../BionicText';
import { KaTeXRenderer } from '../KaTeXRenderer';
import {
  Compass,
  Sparkles,
  Search,
  Book,
  Globe,
  Film,
  Cpu,
  Code2,
  HelpCircle,
  Flame,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  Share2,
  Terminal,
  Bookmark
} from 'lucide-react';

interface TheLearnerProps {
  bionicEnabled: boolean;
  geminiApiKey?: string;
}

export const TheLearner: React.FC<TheLearnerProps> = ({ bionicEnabled, geminiApiKey }) => {
  const [topics, setTopics] = useState<LearnerTopic[]>(learnerTopics);
  const [selectedTopicId, setSelectedTopicId] = useState<string>(learnerTopics[0].id);
  const [depth, setDepth] = useState<LearnerDepth>(1);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [activeResourceTab, setActiveResourceTab] = useState<'content' | 'matrix'>('content');

  const currentTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const depthData = currentTopic.depthContent[depth] || currentTopic.depthContent[1];
  const matrix = currentTopic.resourceMatrix;

  const handlePerformDeepDive = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setStatusMessage(`Scanning frontier knowledge graph for "${query}"...`);

    try {
      const newTopic = await generateUniversalLearnerTopic(query, geminiApiKey);

      setTopics(prev => {
        const existingIdx = prev.findIndex(t => t.id === newTopic.id);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = newTopic;
          return updated;
        }
        return [newTopic, ...prev];
      });

      setSelectedTopicId(newTopic.id);
      setDepth(1);
      setCustomSearchQuery('');
      setStatusMessage(`[TELEMETRY] 5-Tier Deep Dive & Resource Matrix generated for "${newTopic.title}"!`);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err) {
      console.error('Error generating topic:', err);
      setStatusMessage('Synthesis error. Reverted to local model.');
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handlePerformDeepDive(customSearchQuery);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Universal Search Interface matching user request */}
      <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/30 shadow-2xl shadow-emerald-950/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#081a0e] border border-emerald-500/40 text-emerald-400 shadow-inner">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-serif font-bold text-emerald-100 tracking-wide">
                  THE LEARNER // UNIVERSAL RESEARCH & OBSESSION ENGINE
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-600/40">
                  ANY TOPIC
                </span>
              </div>
              <p className="text-xs text-emerald-400/70 font-mono">
                Type literally anything across human knowledge. Unpacks 5 deepening tiers, books, wikis, and rabbit holes.
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-emerald-400 bg-[#030805] px-3 py-1.5 rounded-lg border border-emerald-500/30">
            {geminiApiKey ? '✨ Gemini Live Neural Active' : '⚡ High-Speed Procedural Engine'}
          </div>
        </div>

        {/* Universal Search Bar */}
        <form onSubmit={handleSubmitSearch} className="relative">
          <input
            type="text"
            placeholder="Type ANY topic: e.g. Quantum Computing, Roman Empire Architecture, CRISPR, Black Holes, Game Theory..."
            value={customSearchQuery}
            onChange={e => setCustomSearchQuery(e.target.value)}
            disabled={isSearching}
            className="w-full pl-11 pr-36 py-3.5 rounded-xl bg-[#030704] border border-emerald-500/40 text-xs font-mono text-emerald-100 placeholder-emerald-600/60 focus:outline-none focus:border-emerald-400"
          />
          <Search className="w-4 h-4 text-emerald-400/70 absolute left-3.5 top-4" />
          <button
            type="submit"
            disabled={isSearching || !customSearchQuery.trim()}
            className="absolute right-1.5 top-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-950/60"
          >
            {isSearching ? (
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 animate-spin" /> Deep Diving...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" /> DEEP DIVE
              </span>
            )}
          </button>
        </form>

        {statusMessage && (
          <div className="text-xs font-mono text-emerald-300 flex items-center gap-2 p-3 rounded-lg bg-[#041108] border border-emerald-500/30 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Hyperfixation Quick-Pills */}
        <div className="pt-2 border-t border-emerald-500/15">
          <div className="text-[10px] font-mono text-emerald-400/60 uppercase mb-2">
            [ ACTIVE EXPLORATION ARCHIVE ]:
          </div>
          <div className="flex flex-wrap gap-2">
            {topics.map(top => {
              const isSelected = selectedTopicId === top.id;
              return (
                <button
                  key={top.id}
                  onClick={() => setSelectedTopicId(top.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-sm'
                      : 'bg-[#030704] border-emerald-950/80 text-emerald-400/60 hover:text-emerald-300 hover:border-emerald-800/40'
                  }`}
                >
                  <span>{top.title}</span>
                  <span className="text-[9px] text-emerald-500/70">[{top.domain}]</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* View Switcher: Deep Dive Tiers vs Resource Matrix */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-[#06120a] border border-emerald-500/20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveResourceTab('content')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition border ${
              activeResourceTab === 'content'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60'
                : 'bg-[#040805] border-emerald-900/30 text-emerald-400/60 hover:text-emerald-300'
            }`}
          >
            5-TIER COGNITIVE BREAKDOWN
          </button>
          <button
            onClick={() => setActiveResourceTab('matrix')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition border flex items-center gap-1.5 ${
              activeResourceTab === 'matrix'
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60'
                : 'bg-[#040805] border-emerald-900/30 text-emerald-400/60 hover:text-emerald-300'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>RESOURCE MATRIX (WIKIPEDIA • BOOKS • MEDIA)</span>
          </button>
        </div>

        <div className="hidden sm:block text-xs font-mono text-emerald-400/60">
          Viewing: <strong className="text-emerald-200">{currentTopic.title}</strong>
        </div>
      </div>

      {activeResourceTab === 'content' ? (
        <div className="space-y-6">
          {/* 5-Tier Depth Tabs */}
          <div className="p-4 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-emerald-400/70 uppercase tracking-wider">
                [ UNIVERSAL COGNITIVE DEPTH (1 to 5) ]:
              </span>
              <span className="text-[11px] font-mono text-emerald-300">
                Tier {depth} of 5
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { tier: 1, label: 'T1: Dumb Down (ELI5)' },
                { tier: 2, label: 'T2: Foundations' },
                { tier: 3, label: 'T3: Mechanics & Code' },
                { tier: 4, label: 'T4: ArXiv Research' },
                { tier: 5, label: 'T5: The Rabbit Hole' }
              ].map(t => {
                const isActive = depth === t.tier;
                return (
                  <button
                    key={t.tier}
                    onClick={() => setDepth(t.tier as LearnerDepth)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-mono font-bold transition border ${
                      isActive
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60'
                        : 'bg-[#040805] border-emerald-900/30 text-emerald-400/50 hover:text-emerald-300'
                    }`}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Concept Map */}
          {currentTopic.conceptGraph && currentTopic.conceptGraph.length > 0 && (
            <ConceptTree
              nodes={currentTopic.conceptGraph}
              onSelectTier={(t) => setDepth(t as LearnerDepth)}
            />
          )}

          {/* Main Content Card for Current Depth */}
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                  {depthData.depthLabel}
                </span>
                <h3 className="text-base font-serif font-bold text-emerald-100 mt-1">
                  {depthData.description}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-400/60 bg-[#040805] px-3 py-1 rounded-lg border border-emerald-900/40">
                {currentTopic.domain}
              </span>
            </div>

            {/* Analogies if present */}
            {depthData.analogies && depthData.analogies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {depthData.analogies.map((analogy, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#040905] border border-amber-500/30 text-xs text-amber-200/90 space-y-1">
                    <div className="font-mono font-bold text-amber-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Intuitive Mental Model #{idx + 1}:
                    </div>
                    <p><BionicText text={analogy} enabled={bionicEnabled} /></p>
                  </div>
                ))}
              </div>
            )}

            {/* Core Text */}
            <div className="text-xs text-emerald-100/90 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              <BionicText text={depthData.coreContent} enabled={bionicEnabled} />
            </div>

            {/* Equations */}
            {depthData.equations && depthData.equations.length > 0 && (
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-bold block">
                  [ GOVERNING MATHEMATICAL FORMULATIONS ]:
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {depthData.equations.map((eq, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#030704] border border-emerald-900/40 text-center text-cyan-300 text-xs sm:text-sm overflow-x-auto shadow-inner">
                      <KaTeXRenderer math={eq} block={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippet */}
            {depthData.codeSnippet && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                  <Code2 className="w-4 h-4" />
                  Executable Implementation
                </div>
                <pre className="p-4 rounded-xl bg-[#030604] border border-emerald-900/50 font-mono text-xs text-emerald-300/90 overflow-x-auto leading-relaxed shadow-inner">
                  <code>{depthData.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Research Papers (ArXiv) */}
            {depthData.researchPapers && depthData.researchPapers.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-emerald-500/20">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  Seminal Research Literature & Preprints
                </span>
                <div className="grid grid-cols-1 gap-3">
                  {depthData.researchPapers.map((paper, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-[#040905] border border-emerald-900/40 space-y-2">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-xs font-mono font-bold text-emerald-100">
                          {paper.title} ({paper.year})
                        </h4>
                        {paper.arxivId && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 shrink-0">
                            arXiv:{paper.arxivId}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400/70">
                        <strong>Authors:</strong> {paper.authors}
                      </div>
                      <p className="text-xs text-emerald-200/90">
                        <strong>Contribution:</strong> {paper.coreContribution}
                      </p>
                      <div className="p-2.5 rounded-lg bg-[#020503] border border-emerald-900/50 text-[11px] text-emerald-300 font-mono">
                        💡 Plain-English Takeaway: {paper.plainEnglishTakeaway}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rabbit Hole Questions */}
            {depthData.rabbitHoleQuestions && depthData.rabbitHoleQuestions.length > 0 && (
              <div className="p-5 rounded-xl bg-[#040905] border border-rose-500/30 space-y-3">
                <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4" />
                  Paradoxes & Open Frontiers to Contemplate
                </span>
                <ul className="space-y-2">
                  {depthData.rabbitHoleQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-rose-200/90">
                      <span className="text-rose-400 font-bold shrink-0 mt-0.5">?</span>
                      <span><BionicText text={q} enabled={bionicEnabled} /></span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* RESOURCE MATRIX (WIKIPEDIA • BOOKS • VIDEOS • RABBIT HOLES)               */
        /* ========================================================================= */
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#06120a] border border-emerald-500/20 shadow-xl space-y-6">
            <div className="border-b border-emerald-500/20 pb-4">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-bold">
                RESOURCE TELEMETRY MATRIX
              </span>
              <h2 className="text-base font-serif font-bold text-emerald-100 mt-1">
                Everything Across Reality on {currentTopic.title}
              </h2>
              <p className="text-xs font-mono text-emerald-400/70">
                Direct encyclopedia links, foundational literature, video lectures, and adjacent rabbit holes.
              </p>
            </div>

            {/* Section 1: Wikipedia & Encyclopedias */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
                <Globe className="w-4 h-4" />
                <span>Wikipedia & Direct Encyclopedia Citations</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matrix?.wikipedia?.map((wiki, idx) => (
                  <a
                    key={idx}
                    href={wiki.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-[#040905] border border-emerald-900/40 hover:border-emerald-500/60 transition group space-y-2 block"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-200 group-hover:text-emerald-400">
                      <span>{wiki.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <p className="text-xs text-emerald-400/80 font-sans line-clamp-2">
                      {wiki.snippet}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Section 2: Seminal Books */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
                <Book className="w-4 h-4" />
                <span>Essential Books & Literature</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matrix?.books?.map((book, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#040905] border border-cyan-500/25 space-y-1.5">
                    <div className="text-xs font-mono font-bold text-cyan-200">
                      {book.title}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400/70">
                      By: {book.author}
                    </div>
                    <p className="text-xs text-emerald-300/80 font-sans">
                      {book.takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Documentaries & Videos */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase">
                <Film className="w-4 h-4" />
                <span>Documentaries & Visual Deep Dives</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {matrix?.videos?.map((vid, idx) => (
                  <a
                    key={idx}
                    href={vid.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-xl bg-[#040905] border border-amber-500/25 hover:border-amber-400/60 transition group space-y-1.5 block"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-200 group-hover:text-amber-300">
                      <span>{vid.title}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-[10px] font-mono text-amber-400/60">
                      Platform: {vid.platform}
                    </div>
                    <p className="text-xs text-emerald-300/80 font-sans">
                      {vid.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Section 4: Adjacent Rabbit Holes (Click to instantly deep dive) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold uppercase">
                <Flame className="w-4 h-4" />
                <span>Adjacent Rabbit Holes (Click Any to Explore Next)</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {matrix?.relatedTopics?.map((rel, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePerformDeepDive(rel)}
                    className="px-3.5 py-2 rounded-xl bg-[#040805] border border-rose-500/30 hover:border-rose-400 text-xs font-mono text-rose-300/90 hover:text-white transition flex items-center gap-1.5 group"
                  >
                    <span>{rel}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-rose-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
