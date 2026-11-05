import { useState } from 'react';
import { SOLVED_PROBLEMS, SolvedProblem } from '../data/lectureNotesData';
import { CheckCircle2, AlertTriangle, BookOpen, ChevronDown, ChevronUp, Eye, EyeOff, Sparkles, Filter } from 'lucide-react';

interface WorkedProblemsWorkshopProps {
  onOpenLab: (tab: 'even_odd' | 'periodicity') => void;
  selectedProblemId?: string;
}

export function WorkedProblemsWorkshop({ onOpenLab, selectedProblemId }: WorkedProblemsWorkshopProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'even_odd' | 'periodicity'>('all');
  const [expandedProblemIds, setExpandedProblemIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    if (selectedProblemId) {
      initial[selectedProblemId] = true;
    } else {
      // Default expand the first 2 problems
      initial['prob-1'] = true;
      initial['prob-3'] = true;
    }
    return initial;
  });

  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    SOLVED_PROBLEMS.forEach((prob) => {
      // By default reveal step 1 so students can think before revealing
      initial[prob.id] = 1;
    });
    return initial;
  });

  const toggleExpand = (id: string) => {
    setExpandedProblemIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const setStepCount = (id: string, count: number) => {
    setRevealedSteps((prev) => ({
      ...prev,
      [id]: count
    }));
  };

  const revealAllForProblem = (id: string, totalSteps: number) => {
    setRevealedSteps((prev) => ({
      ...prev,
      [id]: totalSteps
    }));
  };

  const filteredProblems = SOLVED_PROBLEMS.filter((prob) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'even_odd') return prob.category === 'even_odd';
    if (filterCategory === 'periodicity') return prob.category === 'periodicity' || prob.category === 'sum_periodicity';
    return true;
  });

  return (
    <div className="space-y-10">
      {/* Workshop Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>WORKSHOP</span>
          <span aria-hidden="true">·</span>
          <span>ALL 10 LECTURE NOTE PROBLEMS</span>
          <span aria-hidden="true">·</span>
          <span>STEP-BY-STEP PROOFS</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Professor's Step-by-Step Problem Solving Workshop
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed text-sm sm:text-base">
          Every single problem and homework assignment written in your 14-page PDF notes has been fully solved below. Use the interactive step reveals to test your thinking before peeking at the professor's solution!
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 p-1 bg-slate-900 border border-slate-800 rounded-lg">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filterCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All 10 Problems
          </button>
          <button
            onClick={() => setFilterCategory('even_odd')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filterCategory === 'even_odd'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Even/Odd Symmetry (Problems 1–5)
          </button>
          <button
            onClick={() => setFilterCategory('periodicity')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filterCategory === 'periodicity'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Periodicity & LCM (Problems 6–10)
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span>Showing {filteredProblems.length} solved problems</span>
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-6">
        {filteredProblems.map((problem) => {
          const isExpanded = !!expandedProblemIds[problem.id];
          const currentStep = revealedSteps[problem.id] || 1;
          const totalSteps = problem.steps.length;

          return (
            <div
              key={problem.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/95 border-slate-700 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Problem Accordion Header */}
              <div
                onClick={() => toggleExpand(problem.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-cyan-400 font-bold">
                      PROBLEM #{problem.number}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400">PDF Page {problem.pdfPage}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-indigo-300 font-medium">{problem.signalType}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{problem.title}</span>
                  </h3>
                  <div className="font-mono text-sm text-cyan-300 bg-slate-950/80 px-3 py-1 rounded inline-block border border-slate-800">
                    {problem.givenExpression}
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(problem.id);
                    }}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Problem Expanded Body */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 sm:pb-8 border-t border-slate-800/80 pt-5 space-y-6">
                  {/* Professor Objective */}
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs sm:text-sm text-slate-300">
                    <strong className="text-cyan-400 block mb-0.5">Professor's Goal:</strong>
                    {problem.teacherGoal}
                  </div>

                  {/* Step Reveal Interactive Controller */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span>Step Progress:</span>
                      <span className="font-mono font-bold text-cyan-400">
                        {currentStep} / {totalSteps}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentStep < totalSteps ? (
                        <button
                          onClick={() => setStepCount(problem.id, currentStep + 1)}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
                        >
                          Reveal Next Step →
                        </button>
                      ) : null}

                      <button
                        onClick={() =>
                          currentStep === totalSteps
                            ? setStepCount(problem.id, 1)
                            : revealAllForProblem(problem.id, totalSteps)
                        }
                        className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      >
                        {currentStep === totalSteps ? 'Hide to Step 1' : 'Reveal All Steps'}
                      </button>
                    </div>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-4">
                    {problem.steps.map((step) => {
                      const isVisible = step.stepNumber <= currentStep;
                      if (!isVisible) return null;

                      return (
                        <div
                          key={step.stepNumber}
                          className="p-4 sm:p-5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-2.5"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono font-bold text-cyan-400">
                              STEP {step.stepNumber}: {step.title}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                            {step.explanation}
                          </p>

                          <div className="p-3 rounded bg-slate-900 border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto">
                            {step.math}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Final Answer Banner (Visible when fully revealed) */}
                  {currentStep === totalSteps && (
                    <div className="p-5 rounded-xl bg-emerald-950/30 border border-emerald-700/50 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                        <CheckCircle2 className="w-4 h-4" />
                        FINAL ANSWER
                      </div>
                      <div className="font-mono text-base font-bold text-white">
                        {problem.finalAnswer}
                      </div>
                    </div>
                  )}

                  {/* Pedagogical Advice Strip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                      <span className="font-semibold text-cyan-300 block">
                        Professor's Key Insight:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {problem.keyTakeaway}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-1">
                      <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Common Exam Pitfall:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {problem.examTrap}
                      </p>
                    </div>
                  </div>

                  {/* Jump to Interactive Visualizer Button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() =>
                        onOpenLab(
                          problem.category === 'even_odd' ? 'even_odd' : 'periodicity'
                        )
                      }
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Simulate Similar Signal in Lab →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
