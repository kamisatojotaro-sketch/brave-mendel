import React from 'react';
import { KaTeXRenderer } from './KaTeXRenderer';

interface BionicTextProps {
  text: string;
  enabled?: boolean;
  className?: string;
}

export const BionicText: React.FC<BionicTextProps> = ({ text, enabled = false, className = '' }) => {
  if (!text) return null;

  // Split by LaTeX math blocks ($...$ or $$...$$) first to avoid mangling equations
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+?\$)/g);

  return (
    <span className={className}>
      {parts.map((part, pIdx) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const formula = part.slice(2, -2).trim();
          return <KaTeXRenderer key={pIdx} math={formula} block={true} />;
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const formula = part.slice(1, -1).trim();
          return <KaTeXRenderer key={pIdx} math={formula} block={false} />;
        }

        if (!enabled) {
          return <span key={pIdx}>{part}</span>;
        }

        // Apply Bionic Reading on plain text parts
        const words = part.split(/(\s+)/);
        return (
          <span key={pIdx}>
            {words.map((word, wIdx) => {
              if (/^\s+$/.test(word) || word.length <= 1) {
                return <span key={wIdx}>{word}</span>;
              }

              // Bold the first ~45% of characters
              const midpoint = Math.ceil(word.length * 0.45);
              const boldPart = word.slice(0, midpoint);
              const restPart = word.slice(midpoint);

              return (
                <span key={wIdx}>
                  <strong className="font-semibold text-white tracking-normal">{boldPart}</strong>
                  <span className="opacity-90">{restPart}</span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
};
