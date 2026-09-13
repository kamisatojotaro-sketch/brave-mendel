import React, { useState, useEffect } from 'react';
import { ScheduledTask, SubjectType } from '../../types';
import { syllabusData } from '../../data/syllabusData';
import {
  getPrepperTasks,
  savePrepperTasks,
  togglePrepperTask,
  addPrepperTask,
  deletePrepperTask,
  generateAutoPlan,
  getTodayDateString
} from '../../utils/storage';
import { Calendar, Plus, Trash2, CheckCircle2, Circle, Sparkles, RefreshCw, Layers, Clock, ArrowRight } from 'lucide-react';

interface ThePrepperProps {
  bionicEnabled: boolean;
  onNavigateToWing: (wing: 'hub' | 'neet' | 'board' | 'learner' | 'prepper') => void;
}

export const ThePrepper: React.FC<ThePrepperProps> = ({ bionicEnabled, onNavigateToWing }) => {
  const [tasks, setTasks] = useState<ScheduledTask[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [newSubject, setNewSubject] = useState<SubjectType>('biology');
  const [newChapterId, setNewChapterId] = useState<string>(syllabusData[0].id);
  const [newMode, setNewMode] = useState<'study' | 'skim' | 'test'>('study');
  const [newTime, setNewTime] = useState<number>(45);

  useEffect(() => {
    setTasks(getPrepperTasks());
  }, []);

  const handleGeneratePlan = (days: 7 | 30) => {
    const generated = generateAutoPlan(days, 'both');
    setTasks(generated);
  };

  const handleToggle = (id: string) => {
    const updated = togglePrepperTask(id);
    setTasks([...updated]);
  };

  const handleDelete = (id: string) => {
    deletePrepperTask(id);
    setTasks(getPrepperTasks());
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    const chapter = syllabusData.find(c => c.id === newChapterId) || syllabusData[0];
    const created = addPrepperTask({
      dateStr: selectedDate,
      subject: newSubject,
      chapterId: chapter.id,
      chapterName: chapter.name,
      subtopicName: chapter.topics[0]?.name || 'Core Fundamentals',
      targetMode: newMode,
      timeEstimateMins: newTime
    });
    setTasks([...tasks, created]);
  };

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter(t => t.dateStr === selectedDate);
  const availableChapters = syllabusData.filter(c => c.subject === newSubject);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#10190f] to-[#071109] border border-emerald-500/30 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Calendar className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-serif font-bold text-[#f0ede6] uppercase tracking-wider">
                THE PREPPER // Cognitive Study Scheduler
              </h2>
              <p className="text-xs text-text-muted">
                Auto-generate 1-week or 1-month interleaved PCB plans, or manually craft daily study missions that sync with your Main Hub.
              </p>
            </div>
          </div>

          {/* 1-Click Auto Plan Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleGeneratePlan(7)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-semibold transition flex items-center gap-1.5 shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Auto-Fill 7-Day Sprint</span>
            </button>
            <button
              onClick={() => handleGeneratePlan(30)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-300 text-xs font-mono font-semibold transition flex items-center gap-1.5 shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-Fill 30-Day Master Goal</span>
            </button>
          </div>
        </div>

        {/* Date Selector Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Target Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-[#040806] border border-emerald-500/30 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSelectedDate(getTodayDateString())}
              className={`px-3 py-1 rounded-lg text-xs font-mono border transition ${
                selectedDate === getTodayDateString()
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              Today
            </button>
            {/* Quick offset buttons */}
            {[1, 2, 3].map(offset => {
              const d = new Date();
              d.setDate(d.getDate() + offset);
              const dStr = d.toISOString().split('T')[0];
              return (
                <button
                  key={offset}
                  onClick={() => setSelectedDate(dStr)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition ${
                    selectedDate === dStr
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  +{offset}d
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Scheduled Missions on Selected Date + Add New Mission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Missions Scheduled on Date */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="telemetry-badge">
              // MISSIONS ON {selectedDate} ({tasksForSelectedDate.length} TOTAL)
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {tasksForSelectedDate.filter(t => t.completed).length} OF {tasksForSelectedDate.length} COMPLETED
            </span>
          </div>

          <div className="space-y-3">
            {tasksForSelectedDate.length === 0 ? (
              <div className="tactical-card p-12 rounded-2xl text-center space-y-3 text-slate-500 font-mono text-xs">
                <Calendar className="w-8 h-8 mx-auto opacity-40 text-emerald-400" />
                <div>No study missions scheduled for this date.</div>
                <p className="text-[11px] text-slate-600 max-w-sm mx-auto">
                  Use the mission assigner on the right to add specific chapters, or auto-fill with the sprint buttons above!
                </p>
              </div>
            ) : (
              tasksForSelectedDate.map(task => (
                <div
                  key={task.id}
                  className={`tactical-card p-4 rounded-xl border transition flex items-center justify-between gap-3 ${
                    task.completed ? 'opacity-60 bg-[#061009]' : 'hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggle(task.id)}
                      className="text-emerald-400 hover:scale-110 transition shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-emerald-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                          task.subject === 'biology' ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-300' :
                          task.subject === 'physics' ? 'bg-indigo-950/60 border-indigo-700/50 text-indigo-300' :
                          'bg-amber-950/60 border-amber-700/50 text-amber-300'
                        }`}>
                          {task.subject} • {task.targetMode.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          ⏱ {task.timeEstimateMins} mins
                        </span>
                      </div>
                      <div className={`text-xs font-bold mt-1 ${task.completed ? 'line-through text-slate-500' : 'text-slate-100'}`}>
                        {task.chapterName}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {task.subtopicName}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateToWing(task.targetMode === 'test' ? 'neet' : 'board')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono transition flex items-center gap-1"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Col: Add New Task Form */}
        <div className="tactical-card p-6 rounded-2xl space-y-4 h-fit">
          <div className="flex items-center gap-2 text-emerald-400 border-b border-emerald-500/20 pb-3">
            <Plus className="w-4 h-4" />
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              Assign Mission to {selectedDate}
            </h3>
          </div>

          <form onSubmit={handleAddTask} className="space-y-4">
            {/* Subject selector */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase mb-1 block">Subject</label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['biology', 'physics', 'chemistry'] as SubjectType[]).map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setNewSubject(s);
                      const chaps = syllabusData.filter(c => c.subject === s);
                      if (chaps.length > 0) setNewChapterId(chaps[0].id);
                    }}
                    className={`py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition border ${
                      newSubject === s
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {s.slice(0, 4)}
                  </button>
                ))}
              </div>
            </div>

            {/* Chapter Picker */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase mb-1 block">Target Chapter</label>
              <select
                value={newChapterId}
                onChange={e => setNewChapterId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#040806] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {availableChapters.map(chap => (
                  <option key={chap.id} value={chap.id}>
                    {chap.name} (Class {chap.classLevel})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Mode */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase mb-1 block">Target Mode</label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'study', label: 'Deep Study' },
                  { id: 'skim', label: '2-Min Skim' },
                  { id: 'test', label: 'Test Drill' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setNewMode(m.id as any)}
                    className={`py-1.5 rounded-lg text-[11px] font-mono font-medium transition border ${
                      newMode === m.id
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Duration */}
            <div>
              <label className="text-[10px] font-mono text-slate-400 uppercase mb-1 block">Duration (Minutes)</label>
              <select
                value={newTime}
                onChange={e => setNewTime(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl bg-[#040806] border border-slate-700 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value={15}>15 Mins (Micro-Sprint)</option>
                <option value={30}>30 Mins (Standard Focus)</option>
                <option value={45}>45 Mins (In-Depth Block)</option>
                <option value={60}>60 Mins (Mastery Session)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl btn-emerald-pill text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Schedule</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
