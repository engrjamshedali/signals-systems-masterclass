interface FooterProps {
  onNavigate: (tab: 'curriculum' | 'even_odd' | 'periodicity' | 'worked_problems' | 'notes_companion' | 'quiz') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-slate-400">
            Signals & Systems: Interactive Lecture Masterclass
          </p>
          <p>
            Complete step-by-step digital study companion for Continuous & Discrete-Time signal classification.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400">
          <button
            onClick={() => onNavigate('curriculum')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Curriculum
          </button>
          <button
            onClick={() => onNavigate('even_odd')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Even & Odd Lab
          </button>
          <button
            onClick={() => onNavigate('periodicity')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Periodicity Lab
          </button>
          <button
            onClick={() => onNavigate('worked_problems')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            All 10 Problems
          </button>
          <button
            onClick={() => onNavigate('notes_companion')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Page Guide (1–14)
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            Quiz
          </button>
        </div>
      </div>
    </footer>
  );
}
