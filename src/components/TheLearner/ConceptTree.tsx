import React, { useState } from 'react';
import { ConceptNode } from '../../types';
import { Network, Info, ArrowRight } from 'lucide-react';

interface ConceptTreeProps {
  nodes: ConceptNode[];
  onSelectTier?: (tier: number) => void;
}

export const ConceptTree: React.FC<ConceptTreeProps> = ({ nodes, onSelectTier }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || '');

  const activeNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Group nodes by tier (1 to 5)
  const tiers = [1, 2, 3, 4, 5];

  const tierColors: Record<number, { border: string; bg: string; text: string; glow: string }> = {
    1: { border: 'border-amber-500/50', bg: 'bg-amber-950/30', text: 'text-amber-300', glow: 'shadow-amber-500/20' },
    2: { border: 'border-cyan-500/50', bg: 'bg-cyan-950/30', text: 'text-cyan-300', glow: 'shadow-cyan-500/20' },
    3: { border: 'border-indigo-500/50', bg: 'bg-indigo-950/30', text: 'text-indigo-300', glow: 'shadow-indigo-500/20' },
    4: { border: 'border-purple-500/50', bg: 'bg-purple-950/30', text: 'text-purple-300', glow: 'shadow-purple-500/20' },
    5: { border: 'border-rose-500/50', bg: 'bg-rose-950/30', text: 'text-rose-300', glow: 'shadow-rose-500/20' }
  };

  return (
    <div className="p-6 rounded-2xl bg-[#0c121e] border border-purple-500/30 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-purple-400">
          <Network className="w-5 h-5" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
            Interactive Concept Map (Click Nodes to Explore)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          Tier 1 (ELI5) $\rightarrow$ Tier 5 (Rabbit Hole)
        </span>
      </div>

      {/* Visual Tier Ladder */}
      <div className="space-y-4">
        {tiers.map(tier => {
          const tierNodes = nodes.filter(n => n.tier === tier);
          if (tierNodes.length === 0) return null;
          const style = tierColors[tier];

          return (
            <div key={tier} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-20 shrink-0 text-[10px] font-mono uppercase text-slate-500">
                Tier {tier}
              </div>
              <div className="flex flex-wrap gap-2 flex-1">
                {tierNodes.map(node => {
                  const isSelected = selectedNodeId === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => {
                        setSelectedNodeId(node.id);
                        if (onSelectTier) onSelectTier(node.tier);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center gap-2 ${
                        isSelected
                          ? `${style.bg} ${style.border} ${style.text} shadow-lg ${style.glow} ring-1 ring-purple-400/30`
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-current animate-pulse' : 'bg-slate-700'}`} />
                      <span>{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Node Details Box */}
      {activeNode && (
        <div className="p-4 rounded-xl bg-[#080d17] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold text-white font-mono">
                {activeNode.label} (Tier {activeNode.tier})
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {activeNode.description}
          </p>

          {activeNode.connections.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Connects to:</span>
              {activeNode.connections.map(targetId => {
                const targetNode = nodes.find(n => n.id === targetId);
                return (
                  <button
                    key={targetId}
                    onClick={() => {
                      setSelectedNodeId(targetId);
                      if (targetNode && onSelectTier) onSelectTier(targetNode.tier);
                    }}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono transition"
                  >
                    <span>{targetNode?.label || targetId}</span>
                    <ArrowRight className="w-3 h-3 text-purple-400" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
