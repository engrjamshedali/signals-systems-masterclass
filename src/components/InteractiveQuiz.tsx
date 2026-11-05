import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/lectureNotesData';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';

interface InteractiveQuizProps {
  onOpenTopic: (tab: 'even_odd' | 'periodicity') => void;
}

export function InteractiveQuiz({ onOpenTopic }: InteractiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (index: number) => {
    // Only allow selection if not yet answered for this question
    if (selectedAnswers[currentQ.id] !== undefined) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: index
    }));
  };

  const handleToggleHint = () => {
    setRevealedHints((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setRevealedHints({});
    setIsCompleted(false);
  };

  // Score calculation
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === qId);
    return q && q.correctIndex === ansIdx ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>EXAM SIMULATION</span>
          <span aria-hidden="true">·</span>
          <span>CONCEPTUAL MASTERY QUIZ</span>
          <span aria-hidden="true">·</span>
          <span>6 CRITICAL QUESTIONS</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Signals & Systems Self-Assessment Arena
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed text-sm sm:text-base">
          Test your conceptual understanding of even/odd decomposition, the discrete π-trap, and composite LCM period calculations. Real-time feedback with professor solutions.
        </p>
      </section>

      {!isCompleted ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
          {/* Question Header & Progress Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-bold">
                QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
              </span>
              <span className="text-slate-400">
                Score So Far: {correctCount} / {Object.keys(selectedAnswers).length}
              </span>
            </div>

            {/* Visual progress track */}
            <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Prompt */}
          <div className="space-y-2 pt-2">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>

            {/* Hint toggle */}
            <div className="pt-1">
              <button
                onClick={handleToggleHint}
                className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{revealedHints[currentQ.id] ? 'Hide Professor Hint' : 'Need a Professor Hint?'}</span>
              </button>

              {revealedHints[currentQ.id] && (
                <div className="mt-2 p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200">
                  <strong className="block mb-0.5 font-bold">Hint:</strong>
                  {currentQ.hint}
                </div>
              )}
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const hasAnswered = selectedAnswers[currentQ.id] !== undefined;
              const isSelected = selectedAnswers[currentQ.id] === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let buttonStyles = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700 hover:bg-slate-900';

              if (hasAnswered) {
                if (isCorrect) {
                  buttonStyles = 'bg-emerald-950/40 border-emerald-600 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  buttonStyles = 'bg-rose-950/40 border-rose-600 text-rose-200 font-semibold';
                } else {
                  buttonStyles = 'bg-slate-950 border-slate-850 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer disabled:cursor-default ${buttonStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-400 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-Answer Professor Explanation */}
          {selectedAnswers[currentQ.id] !== undefined && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-400 block font-mono">
                PROFESSOR'S STEP-BY-STEP BREAKDOWN:
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentQ.explanation}
              </p>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'View Final Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-700/60 flex items-center justify-center mx-auto text-cyan-400">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-cyan-400 uppercase">Assessment Complete</span>
            <h3 className="text-3xl font-extrabold text-white">
              Your Mastery Score: {percentage}%
            </h3>
            <p className="text-sm text-slate-300">
              You correctly solved {correctCount} out of {totalQuestions} questions.
            </p>
          </div>

          {/* Teacher Assessment feedback */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            {percentage >= 80 ? (
              <span className="text-emerald-300">
                Outstanding work! You have thoroughly mastered signal symmetry, the universal decomposition proof, the discrete π-condition, and LCM period calculations. You are well-prepared for any Signals & Systems exam!
              </span>
            ) : percentage >= 50 ? (
              <span className="text-cyan-300">
                Good effort! You understand the foundational concepts well, but make sure to review the discrete π-trap (Page 13) and power reduction rules (Page 13) to avoid minor midterm traps.
              </span>
            ) : (
              <span className="text-amber-300">
                Keep practicing! Signals & Systems takes a few passes to build intuition. Review the interactive Even/Odd and Periodicity labs, then try the quiz again.
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>

            <button
              onClick={() => onOpenTopic('even_odd')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Review Even & Odd Lab</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
