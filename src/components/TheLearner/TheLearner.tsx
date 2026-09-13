import React, { useState } from 'react';
import { learnerTopics } from '../../data/learnerData';
import { LearnerDepth, LearnerTopic } from '../../types';
import { generateUniversalLearnerTopic } from '../../utils/aiGenerator';
import { DepthSlider } from './DepthSlider';
import { ConceptTree } from './ConceptTree';
import { BionicText } from '../BionicText';
import { KaTeXRenderer } from '../KaTeXRenderer';
import { Compass, Sparkles, Search, Cpu, Code2, HelpCircle, Flame, PlusCircle, CheckCircle2 } from 'lucide-react';

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

  const currentTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const depthData = currentTopic.depthContent[depth] || currentTopic.depthContent[1];

  const handleCustomSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSearchQuery.trim()) return;

    setIsSearching(true);
    setStatusMessage(`Synthesizing deep dive on "${customSearchQuery}"...`);

    try {
      const newTopic = await generateUniversalLearnerTopic(customSearchQuery, geminiApiKey);
      
      // Add or update topic in list
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
      setDepth(1); // Start at Tier 1 (ELI5)
      setCustomSearchQuery('');
      setStatusMessage(`Unlocked 5-Tier Deep Dive for "${newTopic.title}"!`);
      setTimeout(() => setStatusMessage(null), 3500);
    } catch (err) {
      console.error('Error generating topic:', err);
      setStatusMessage('Error synthesizing topic. Please try again.');
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Topic Selector */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#120f26] to-[#0c1220] border border-purple-500/30 shadow-2xl shadow-purple-950/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2 text-purple-400">
            <Compass className="w-6 h-6 animate-pulse" />
            <div>
              <h2 className="text-base font-extrabold text-white tracking-wide">
                THE LEARNER // Universal Hyperfixation & Research Deep Diver
              </h2>
              <p className="text-xs text-purple-300/80">
                Explore ANY topic under the sun — AI, History, Quantum Physics, Philosophy, Neuroscience, or obscure niche domains.
              </p>
            </div>
          </div>

          <div className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/40">
            {geminiApiKey ? '✨ Gemini Live AI Active' : '⚡ High-Speed Procedural Engine'}
          </div>
        </div>

        {/* Universal Curiosity Search Bar */}
        <form onSubmit={handleCustomSearch} className="relative">
          <input
            type="text"
            placeholder="Type ANY obsession: e.g. Roman Empire, Black Holes, Game Theory, Synthesizers, Neuroscience, Quantum Computing..."
            value={customSearchQuery}
            onChange={e => setCustomSearchQuery(e.target.value)}
            disabled={isSearching}
            className="w-full pl-10 pr-32 py-3 rounded-xl bg-[#080d17] border border-purple-500/30 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400"
          />
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
          <button
            type="submit"
            disabled={isSearching || !customSearchQuery.trim()}
            className="absolute right-1.5 top-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white text-xs font-semibold transition flex items-center gap-1.5 shadow-md"
          >
            {isSearching ? (
              <span className="flex items-center gap-1 animate-pulse">
                <Compass className="w-3.5 h-3.5 animate-spin" /> Synthesizing...
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Deep Dive
              </span>
            )}
          </button>
        </form>

        {statusMessage && (
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" /> {statusMessage}
          </div>
        )}

        {/* Topic Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">Active Hyperfixations:</span>
          {topics.map(top => (
            <button
              key={top.id}
              onClick={() => setSelectedTopicId(top.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-1.5 ${
                selectedTopicId === top.id
                  ? 'bg-purple-600/30 border-purple-500 text-purple-200 shadow-md shadow-purple-950/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{top.title}</span>
              <span className="text-[10px] text-purple-400/70 font-mono">[{top.domain}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5-Tier Depth Slider */}
      <DepthSlider depth={depth} onChange={setDepth} />

      {/* Interactive Concept Tree */}
      <ConceptTree
        nodes={currentTopic.conceptGraph}
        onSelectTier={(t) => setDepth(t as LearnerDepth)}
      />

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
          <span className="text-xs font-mono text-slate-500">
            Topic: <strong className="text-slate-300">{currentTopic.title}</strong>
          </span>
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
              Core Mathematical & Formal Formulations
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
              Seminal Literature & Frontier Breakthroughs
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
                    <strong>Authors / Source:</strong> {paper.authors}
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
              Paradoxes, Open Mysteries & Thought Experiments
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
