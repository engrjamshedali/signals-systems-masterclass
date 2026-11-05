interface NavbarProps {
  activeTab: 'curriculum' | 'even_odd' | 'periodicity' | 'worked_problems' | 'notes_companion' | 'quiz';
  setActiveTab: (tab: 'curriculum' | 'even_odd' | 'periodicity' | 'worked_problems' | 'notes_companion' | 'quiz') => void;
}

export function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={() => setActiveTab('curriculum')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
            Signals & Systems Masterclass
          </span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'curriculum'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400'
            }`}
          >
            Curriculum
          </button>
          <button
            onClick={() => setActiveTab('even_odd')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'even_odd'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400'
            }`}
          >
            Even & Odd Lab
          </button>
          <button
            onClick={() => setActiveTab('periodicity')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'periodicity'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400'
            }`}
          >
            Periodicity Lab
          </button>
          <button
            onClick={() => setActiveTab('worked_problems')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'worked_problems'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400'
            }`}
          >
            All 10 Solved Problems
          </button>
          <button
            onClick={() => setActiveTab('notes_companion')}
            className={`cursor-pointer whitespace-nowrap shrink-0 transition-colors py-1 hover:text-white ${
              activeTab === 'notes_companion'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400'
            }`}
          >
            PDF Page Guide (1–14)
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('quiz')}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-cyan-950"
          >
            Test Knowledge (Quiz)
          </button>
        </div>
      </div>
    </header>
  );
}
