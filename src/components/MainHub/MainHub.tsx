import React, { useState, useEffect } from 'react';
import { Target, GraduationCap, Compass, Calendar, CheckCircle2, Circle, ArrowRight, Sparkles, Clock, Flame, Zap, Shield, Radar } from 'lucide-react';
import { getTodayTasks, togglePrepperTask, getSubjectProgressPercentage } from '../../utils/storage';
import { ScheduledTask } from '../../types';

interface MainHubProps {
  onNavigate: (wing: 'hub' | 'neet' | 'board' | 'learner' | 'prepper') => void;
  bionicEnabled: boolean;
}

export const MainHub: React.FC<MainHubProps> = ({ onNavigate, bionicEnabled }) => {
  const [todayTasks, setTodayTasks] = useState<ScheduledTask[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [bioProgress, setBioProgress] = useState(0);
  const [phyProgress, setPhyProgress] = useState(0);
  const [chemProgress, setChemProgress] = useState(0);

  useEffect(() => {
    setTodayTasks(getTodayTasks());
    setBioProgress(getSubjectProgressPercentage('neet', 'biology'));
    setPhyProgress(getSubjectProgressPercentage('neet', 'physics'));
    setChemProgress(getSubjectProgressPercentage('neet', 'chemistry'));

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleTask = (id: string) => {
    const updated = togglePrepperTask(id);
    const todayStr = new Date().toISOString().split('T')[0];
    setTodayTasks(updated.filter(t => t.dateStr === todayStr));
  };

  const completedCount = todayTasks.filter(t => t.completed).length;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Telemetry Header Bar matching user's image */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 rounded-lg bg-[#071109] border border-emerald-500/20 text-[11px] font-mono text-emerald-400/90 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>SYSTEM: ONLINE // SYNAPSE.2026.INIT</span>
        </div>
        <div className="hidden sm:block text-slate-400">
          LOC: INDIA // CLASS 12 PCB
        </div>
        <div>
          TIME: <span className="text-emerald-300 font-bold">{currentTime || '19:14:26'}</span>
        </div>
        <div className="hidden md:block text-amber-400">
          NODE_ID: CORTEX_01
        </div>
      </div>

      {/* Hero Section: Classical Grand Serif Title matching user's image */}
      <div className="text-center space-y-3 pt-4">
        <span className="telemetry-badge tracking-widest">
          // COGNITIVE COMMAND // CORTEX MATRIX
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-wider text-[#f0ede6] uppercase">
          SYNAPSE // COMMAND HUB
        </h1>
        <p className="text-xs sm:text-sm text-text-muted max-w-2xl mx-auto leading-relaxed">
          Integrated psychological learning engine engineered for NEET aspirants, NCERT 12th board examiners, and limitless ADHD hyperfocus exploration.
        </p>
      </div>

      {/* Top Stat Matrix Cards & Radar Broadcast Box matching user's uploaded image */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Stat Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="tactical-card p-5 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">[ CHAPTERS // CT ]</span>
            <div className="text-4xl font-serif font-bold text-emerald-400 my-2">12</div>
            <span className="text-[10px] font-mono text-emerald-500/80 uppercase">In Active Focus</span>
          </div>

          <div className="tactical-card p-5 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">[ MISSIONS // DAY ]</span>
            <div className="text-4xl font-serif font-bold text-amber-400 my-2">{todayTasks.length}</div>
            <span className="text-[10px] font-mono text-amber-500/80 uppercase">Scheduled Today</span>
          </div>

          <div className="tactical-card p-5 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">[ FORMULAS // BANK ]</span>
            <div className="text-4xl font-serif font-bold text-cyan-400 my-2">450+</div>
            <span className="text-[10px] font-mono text-cyan-500/80 uppercase">High-Yield NCERT</span>
          </div>

          <div className="tactical-card p-5 rounded-xl flex flex-col justify-between">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider">[ PYQ CARDS // Q ]</span>
            <div className="text-4xl font-serif font-bold text-emerald-300 my-2">1000+</div>
            <span className="text-[10px] font-mono text-emerald-400/80 uppercase">Active Retrieval</span>
          </div>
        </div>

        {/* Right Col: Integrated Radar Matrix Widget */}
        <div className="tactical-card p-5 rounded-xl flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              MATRIX BROADCAST: LIVE
            </span>
            <span className="text-[9px] font-mono text-slate-500">SEC_RADAR</span>
          </div>

          <div className="flex items-center gap-4 py-2">
            {/* Animated Sonar Radar Circle */}
            <div className="relative w-16 h-16 rounded-full border border-emerald-500/40 flex items-center justify-center shrink-0 radar-grid">
              <div className="w-10 h-10 rounded-full border border-emerald-500/20" />
              <div className="w-4 h-4 rounded-full bg-emerald-500/30" />
              {/* Radar sweep hand */}
              <div className="absolute inset-0 rounded-full border-r-2 border-emerald-400/80 animate-radar-sweep origin-center" />
            </div>

            <div className="space-y-1 font-mono text-[10px] text-emerald-300/80 leading-relaxed">
              <div>&gt; ALLOCATION ENGINE: ACTIVE</div>
              <div>&gt; TARGET: NCERT + NEET PYQ</div>
              <div>&gt; BUFFER: 5 DEPTH TIERS LOADED</div>
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>CBSE 12th &amp; NEET UG</span>
            <span className="text-emerald-400">SYNAPSE 100% READY</span>
          </div>
        </div>
      </div>

      {/* 4 Core Wing Dossiers (Clickable gateways) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="telemetry-badge">
            // OPERATIONAL SECTORS // CHOOSE WING
          </span>
          <span className="text-[11px] font-mono text-slate-500">4 ACTIVE HUBS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Wing 1: NEET Arena */}
          <div
            onClick={() => onNavigate('neet')}
            className="tactical-card p-6 rounded-2xl cursor-pointer hover:border-emerald-400/50 group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                +4 / -1 EXAM
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-emerald-300 transition">
                NEET ARENA
              </h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Light &amp; Deep Learner. Active recall, 5 difficulty sliders, NCERT micro-facts, and timer mock tests.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition">
              <span>ENTER SECTOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Wing 2: NCERT Board Lab */}
          <div
            onClick={() => onNavigate('board')}
            className="tactical-card p-6 rounded-2xl cursor-pointer hover:border-teal-400/50 group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-teal-950/40 border border-teal-500/30 text-teal-400 group-hover:scale-105 transition">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-teal-400 px-2 py-0.5 rounded bg-teal-950/60 border border-teal-800/40">
                CBSE 12th
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-teal-300 transition">
                BOARD LAB
              </h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Light &amp; Deep Learner. Interactive derivations, 1/2/3/5 mark rubrics, and Handwritten Photo Upload AI Evaluation.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-teal-400 group-hover:translate-x-1 transition">
              <span>ENTER SECTOR</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Wing 3: The Prepper */}
          <div
            onClick={() => onNavigate('prepper')}
            className="tactical-card p-6 rounded-2xl cursor-pointer hover:border-amber-400/50 group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40">
                PLANNER
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-amber-300 transition">
                THE PREPPER
              </h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Auto-fill 1-week &amp; 1-month balanced study plans. Alter dates, reassign topics, and track daily goals.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:translate-x-1 transition">
              <span>SCHEDULE MISSIONS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Wing 4: The Learner */}
          <div
            onClick={() => onNavigate('learner')}
            className="tactical-card p-6 rounded-2xl cursor-pointer hover:border-purple-400/50 group space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                HYPERFIXATION
              </span>
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white group-hover:text-purple-300 transition">
                THE LEARNER
              </h3>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Learn literally anything. 5 deepening niche tiers, books, Wikipedia, documentaries &amp; rabbit hole concepts.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-purple-400 group-hover:translate-x-1 transition">
              <span>EXPLORE ANYTHING</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* TODAY'S STUDY MISSION // CONFERENCE ITINERARY STYLE from user's image */}
      <div className="tactical-card p-6 sm:p-8 rounded-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="telemetry-badge">
            // SCHEDULE MATRIX // TODAY'S MISSIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#f0ede6] uppercase tracking-wider">
            TODAY'S STUDY ITINERARY
          </h2>
          <p className="text-xs text-text-muted max-w-xl mx-auto">
            Synchronized directly with The Prepper calendar. Check off missions as you conquer them.
          </p>
        </div>

        {/* Date Pill Banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#060e08] border border-emerald-500/30">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
              DAY MISSIONS: {completedCount}/{todayTasks.length} DONE
            </span>
            <span className="text-xs font-mono text-slate-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <button
            onClick={() => onNavigate('prepper')}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Edit in Prepper</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* List of Tasks formatted exactly like the Conference Itinerary from the image */}
        <div className="space-y-3">
          {todayTasks.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              <Calendar className="w-8 h-8 mx-auto mb-2 opacity-40 text-emerald-400" />
              <div>No missions scheduled for today yet.</div>
              <button
                onClick={() => onNavigate('prepper')}
                className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 text-xs font-mono hover:bg-emerald-600/50 transition"
              >
                Auto-Generate 7-Day Plan in Prepper
              </button>
            </div>
          ) : (
            todayTasks.map((task, idx) => {
              const timeLabels = ['08:00 AM - 09:30 AM', '11:00 AM - 12:30 PM', '02:00 PM - 03:30 PM', '05:00 PM - 06:30 PM'];
              const timeStr = timeLabels[idx % timeLabels.length];

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    task.completed
                      ? 'bg-emerald-950/20 border-emerald-500/30 opacity-70'
                      : 'bg-[#0a140d] border-emerald-500/15 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Checkbox trigger */}
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="text-emerald-400 hover:scale-110 transition shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-emerald-400" />
                      )}
                    </button>

                    {/* Time pill matching image */}
                    <span className="px-3 py-1 rounded-full bg-[#051108] border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold shrink-0">
                      ⏱ {timeStr}
                    </span>

                    {/* Subject/Mode tag matching image */}
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border shrink-0 ${
                      task.subject === 'biology' ? 'bg-emerald-950/50 border-emerald-700/50 text-emerald-300' :
                      task.subject === 'physics' ? 'bg-indigo-950/50 border-indigo-700/50 text-indigo-300' :
                      'bg-amber-950/50 border-amber-700/50 text-amber-300'
                    }`}>
                      {task.subject} • {task.targetMode.toUpperCase()}
                    </span>

                    <div>
                      <div className={`text-xs font-bold ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                        {task.chapterName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {task.subtopicName || 'High-Yield Focus'}
                      </div>
                    </div>
                  </div>

                  {/* Launch button */}
                  <button
                    onClick={() => onNavigate(task.targetMode === 'test' ? 'neet' : 'board')}
                    className="px-4 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-mono transition shrink-0 flex items-center gap-1.5"
                  >
                    <span>Launch Mission</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
