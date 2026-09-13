import React, { useState } from 'react';
import { derivationsData, boardAnswersData } from '../../data/boardExamsData';
import { DerivationViewer } from './DerivationViewer';
import { AnswerFramer } from './AnswerFramer';
import { SubjectType } from '../../types';
import { GitPullRequest, FileText, CheckCircle2, Bookmark, GraduationCap } from 'lucide-react';

interface BoardLabProps {
  bionicEnabled: boolean;
}

export const BoardLab: React.FC<BoardLabProps> = ({ bionicEnabled }) => {
  const [activeTab, setActiveTab] = useState<'derivations' | 'answers'>('derivations');
  const [selectedSubject, setSelectedSubject] = useState<'all' | SubjectType>('all');
  const [selectedDerivationId, setSelectedDerivationId] = useState<string>(derivationsData[0].id);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string>(boardAnswersData[0].id);

  const filteredDerivations = derivationsData.filter(d => {
    if (selectedSubject === 'all') return true;
    return d.subject === selectedSubject;
  });

  const filteredAnswers = boardAnswersData.filter(a => {
    if (selectedSubject === 'all') return true;
    return a.subject === selectedSubject;
  });

  const currentDerivation = derivationsData.find(d => d.id === selectedDerivationId) || derivationsData[0];
  const currentAnswer = boardAnswersData.find(a => a.id === selectedAnswerId) || boardAnswersData[0];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="p-5 rounded-2xl bg-[#0c121e] border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('derivations')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
                activeTab === 'derivations'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-700 text-white border-teal-500 shadow-md shadow-teal-950/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <GitPullRequest className="w-4 h-4" />
              <span>Interactive Derivations (Step Reveal)</span>
            </button>

            <button
              onClick={() => setActiveTab('answers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition border ${
                activeTab === 'answers'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-700 text-white border-teal-500 shadow-md shadow-teal-950/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Structured Answer Framer (1/2/3/5 Marks)</span>
            </button>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
            {(['all', 'physics', 'chemistry', 'biology'] as const).map(s => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                  selectedSubject === s
                    ? 'bg-slate-800 text-white shadow'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Item Selector Dropdown */}
        <div className="pt-2 border-t border-slate-800/80">
          {activeTab === 'derivations' ? (
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase mb-1 block">
                Select CBSE 12th Board Derivation ({filteredDerivations.length} Available)
              </label>
              <select
                value={currentDerivation.id}
                onChange={e => setSelectedDerivationId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#080d17] border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                {filteredDerivations.map(d => (
                  <option key={d.id} value={d.id}>
                    [{d.subject.toUpperCase()}] {d.title} ({d.marksTypical} Marks • {d.cbseFrequency} Frequency)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase mb-1 block">
                Select Model Answer Template ({filteredAnswers.length} Available)
              </label>
              <select
                value={currentAnswer.id}
                onChange={e => setSelectedAnswerId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-[#080d17] border border-slate-700 text-xs font-medium text-slate-200 focus:outline-none focus:border-teal-500 cursor-pointer"
              >
                {filteredAnswers.map(a => (
                  <option key={a.id} value={a.id}>
                    [{a.subject.toUpperCase()}] {a.question.slice(0, 80)}... ({a.marks} Marks)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Main View Area */}
      {activeTab === 'derivations' ? (
        <DerivationViewer
          key={currentDerivation.id}
          derivation={currentDerivation}
          bionicEnabled={bionicEnabled}
        />
      ) : (
        <AnswerFramer
          key={currentAnswer.id}
          template={currentAnswer}
          bionicEnabled={bionicEnabled}
        />
      )}
    </div>
  );
};
