import React, { useState } from 'react';
import { learnerTopics } from '../../data/learnerData';
import { LearnerDepth, LearnerTopic } from '../../types';
import { DepthSlider } from './DepthSlider';
import { ConceptTree } from './ConceptTree';
import { BionicText } from '../BionicText';
import { KaTeXRenderer } from '../KaTeXRenderer';
import { Compass, Sparkles, BookOpen, ExternalLink, Code2, HelpCircle, Search, Cpu, ArrowRight } from 'lucide-react';

interface TheLearnerProps {
  bionicEnabled: boolean;
  geminiApiKey?: string;
}

export const TheLearner: React.FC<TheLearnerProps> = ({ bionicEnabled, geminiApiKey }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(learnerTopics[0].id);
  const [depth, setDepth] = useState<LearnerDepth>(1);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const currentTopic = learnerTopics.find(t => t.id === selectedTopicId) || learnerTopics[0];
  const depthData = currentTopic.depthContent[depth];

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearchQuery.trim()) return;

    setIsSearching(true);
    // Simulate smart dynamic synthesizer
    setTimeout(() => {
      setIsSearching(false);
      // If user typed something close to quantum or deep learning, switch to it, or keep exploring
      if (customSearchQuery.toLowerCase().includes('quantum') || customSearchQuery.toLowerCase().includes('biology')) {
        setSelectedTopicId('quantum-biology');
      } else {
        setSelectedTopicId('deep-learning-transformers');
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Topic Selector */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#120f26] to-[#0c1220] border border-purple-500/30 shadow-2xl shadow-purple-950/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Compass className="w-6 h-6 animate-spin-slow" />
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide">
                THE LEARNER // ADHD Hyperfixation & Deep Dive Engine
              </h2>
              <p className="text-xs text-purple-300/80">
                Channel hyperfocus into a superpower: from intuitive ELI5 analogies up to cutting-edge ArXiv frontier papers.
              </p>
            </div>
          </div>
        </div>

        {/* Curiosity Search Bar */}
        <form onSubmit={handleCustomSearch} className="relative">
          <input
            type="text"
            placeholder="Type any niche obsession (e.g., Transformers, NeRFs, Quantum Biology, Spiking Neural Networks)..."
            value={customSearchQuery}
            onChange={e => setCustomSearchQuery(e.target.value)}
            className="w-full pl-10 pr-28 py-2.5 rounded-xl bg-[#080d17] border border-purple-500/30 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3" />
          <button
            type="submit"
            disabled={isSearching}
            className="absolute right-1.5 top-1.5 px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition flex items-center gap-1"
          >
            {isSearching ? <span className="animate-pulse">Exploring...</span> : <span>Deep Dive</span>}
          </button>
        </form>

        {/* Curated Deep Dive Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">Deep Dive Domains:</span>
          {learnerTopics.map(top => (
            <button
              key={top.id}
              onClick={() => setSelectedTopicId(top.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                selectedTopicId === top.id
                  ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {top.title}
            </button>
          ))}
        </div>
      </div>

      {/* 5-Tier Depth Slider */}
      <DepthSlider depth={depth} onChange={setDepth} />

      {/* Interactive Concept Tree */}
      <ConceptTree nodes={currentTopic.conceptGraph} onSelectTier={(t) => setDepth(t as LearnerDepth)} />

      {/* Main Content Pane for Current Depth */}
      <div className="p-6 rounded-2xl bg-[#0c121e] border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300 font-semibold">
              {depthData.depthLabel}
            </span>
            <h3 className="text-sm font-semibold text-slate-300 mt-1">
              {depthData.description}
            </h3>
          </div>
        </div>

        {/* Analogies (if in ELI5 mode) */}
        {depthData.analogies && depthData.analogies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {depthData.analogies.map((analogy, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Intuitive Mental Model #{idx + 1}:
                </div>
                <p><BionicText text={analogy} enabled={bionicEnabled} /></p>
              </div>
            ))}
          </div>
        )}

        {/* Core Markdown / Prose Content */}
        <div className="text-xs text-slate-200 leading-relaxed space-y-4 whitespace-pre-line font-sans">
          <BionicText text={depthData.coreContent} enabled={bionicEnabled} />
        </div>

        {/* KaTeX Equations (if any at this tier) */}
        {depthData.equations && depthData.equations.length > 0 && (
          <div className="space-y-3 pt-2">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-bold block">
              Core Mathematical Formulations
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {depthData.equations.map((eq, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#080d17] border border-slate-800 text-center text-indigo-300 text-xs sm:text-sm overflow-x-auto shadow-inner">
                  <KaTeXRenderer math={eq} block={true} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PyTorch / Python Code Snippet (if available) */}
        {depthData.codeSnippet && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <Code2 className="w-4 h-4" />
              Executable Implementation Architecture
            </div>
            <pre className="p-4 rounded-xl bg-[#080d17] border border-slate-800 font-mono text-xs text-emerald-300/90 overflow-x-auto leading-relaxed shadow-inner">
              <code>{depthData.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* Research Papers (ArXiv) */}
        {depthData.researchPapers && depthData.researchPapers.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <span className="text-xs font-mono text-purple-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <Cpu className="w-4 h-4" />
              Seminal Research Papers & ArXiv Literature
            </span>
            <div className="grid grid-cols-1 gap-3">
              {depthData.researchPapers.map((paper, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs font-bold text-white leading-snug">
                      {paper.title} ({paper.year})
                    </h4>
                    {paper.arxivId && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 border border-purple-700/50 shrink-0">
                        {paper.arxivId}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong>Authors:</strong> {paper.authors}
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Core Breakthrough:</strong> {paper.coreContribution}
                  </p>
                  <div className="p-2.5 rounded-lg bg-[#070b13] border border-slate-800/80 text-[11px] text-purple-300 font-mono">
                    💡 Plain-English Takeaway: {paper.plainEnglishTakeaway}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Obscure Rabbit Hole Questions & Paradoxes */}
        {depthData.rabbitHoleQuestions && depthData.rabbitHoleQuestions.length > 0 && (
          <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-3">
            <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-bold flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Paradoxes & Rabbit Hole Thought Experiments
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
  );
};
