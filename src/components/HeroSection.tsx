import { ArrowRight, BookOpen, Layers, Repeat, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (tab: 'curriculum' | 'even_odd' | 'periodicity' | 'worked_problems' | 'notes_companion' | 'quiz') => void;
  onOpenProblem: (problemId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="space-y-12">
      {/* Editorial Headline & Professor Welcome */}
      <section className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 md:p-12">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
            <span>Engineering Lecture Series</span>
            <span aria-hidden="true">·</span>
            <span>Signals & Systems (CT & DT)</span>
            <span aria-hidden="true">·</span>
            <span>14-Page Complete Syllabus</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white" style={{ textWrap: 'balance' }}>
            Master Signal Classification with Your Personal Professor
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
            Welcome to the digital masterclass for your 14 pages of handwritten lecture notes. Here, intimidating calculus and engineering transforms are broken down into simple intuitive analogies, interactive waveforms, and step-by-step mathematical proofs.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('even_odd')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              <span>Explore Even & Odd Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('periodicity')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              <span>Periodicity & The π-Trap</span>
              <Repeat className="w-4 h-4 text-cyan-400" />
            </button>

            <button
              onClick={() => onNavigate('worked_problems')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>View All 10 PDF Solved Problems</span>
            </button>
          </div>
        </div>
      </section>

      {/* The 4 Foundational Classifications of Signals (from Page 1) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              01. The Master Taxonomy of Signals
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              As written on Page 1 of your class notes, all continuous and discrete signals are classified across four fundamental axes.
            </p>
          </div>
          <span className="text-xs text-slate-500 whitespace-nowrap">Source: Lecture Notes Page 1</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Even or Odd */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-colors group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">AXIS 01 · PAGES 1–7</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fully Solved
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                Even vs. Odd Signals
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Geometric symmetry across time. Even signals mirror horizontally across the vertical axis (<span className="font-math italic text-cyan-200">x(-t) = x(t)</span>); Odd signals invert through origin (<span className="font-math italic text-cyan-200">x(-t) = -x(t)</span>).
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">Universal Decomposition</span>
              <button
                onClick={() => onNavigate('even_odd')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                Launch Lab →
              </button>
            </div>
          </div>

          {/* Card 2: Periodic vs Non-Periodic */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-colors group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">AXIS 02 · PAGES 8–14</span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Fully Solved
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                Periodic vs. Non-Periodic
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Repetition behavior. Signals repeating every interval <span className="font-math italic text-cyan-200">T₀</span> or sample block <span className="font-math italic text-cyan-200">N</span>. Features the continuous vs discrete rationality condition <span className="font-math italic text-cyan-200">f₀ = k/N</span>.
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">LCM & Rationality Test</span>
              <button
                onClick={() => onNavigate('periodicity')}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                Launch Lab →
              </button>
            </div>
          </div>

          {/* Card 3: Deterministic vs Random */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">AXIS 03 · TAXONOMY</span>
                <span className="text-xs text-slate-500">Core Theory</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Deterministic vs. Random
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Certainty of future values. Deterministic signals have exact mathematical formulas (like <span className="font-math italic text-slate-200">5 cos(200πt)</span>); Random signals exhibit statistical uncertainty (e.g. thermal noise, speech waveforms).
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">Probability & Stochastic</span>
              <span className="text-xs text-slate-400">Mathematical Model</span>
            </div>
          </div>

          {/* Card 4: Energy vs Power */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">AXIS 04 · TAXONOMY</span>
                <span className="text-xs text-slate-500">Core Theory</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Energy vs. Power Signals
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Total energy vs average power over infinite time. Transients (pulses, decaying exponentials) are finite energy (<span className="font-math italic text-slate-200">E &lt; ∞, P = 0</span>); infinite periodic sinusoids are power signals (<span className="font-math italic text-slate-200">0 &lt; P &lt; ∞</span>).
              </p>
            </div>
            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500">Integral Boundaries</span>
              <span className="text-xs text-slate-400">Finite Integrals</span>
            </div>
          </div>
        </div>
      </section>

      {/* Professor's Learning Roadmap Strip */}
      <section className="rounded-xl bg-slate-900/60 border border-slate-800 p-8 space-y-6">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">
            Professor's Step-by-Step Study Guide for Your PDF
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2 p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-mono text-cyan-400">STEP 01</span>
            <h3 className="font-semibold text-white">Understand Mirror Symmetry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Learn how every signal is uniquely the sum of a mirror-even part and an inverted-odd part. Master the derivation where the factor of 1/2 emerges naturally.
            </p>
            <button
              onClick={() => onNavigate('even_odd')}
              className="text-xs text-cyan-400 hover:underline pt-1 inline-block cursor-pointer"
            >
              Go to Even/Odd Lab →
            </button>
          </div>

          <div className="space-y-2 p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-mono text-cyan-400">STEP 02</span>
            <h3 className="font-semibold text-white">Crack the Discrete π Mystery</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover why continuous sinusoids are always periodic, but discrete sinusoids fail unless frequency f₀ = k/N is rational. Understand Example 3 (9 cos 25n).
            </p>
            <button
              onClick={() => onNavigate('periodicity')}
              className="text-xs text-cyan-400 hover:underline pt-1 inline-block cursor-pointer"
            >
              Go to Periodicity Lab →
            </button>
          </div>

          <div className="space-y-2 p-4 rounded-lg bg-slate-950/60 border border-slate-800/80">
            <span className="text-xs font-mono text-cyan-400">STEP 03</span>
            <h3 className="font-semibold text-white">Solve Every PDF Problem</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Step through all 10 problems from pages 5, 6, 7, 12, 13, and 14 with interactive reveals, formula checks, and exam trap alerts.
            </p>
            <button
              onClick={() => onNavigate('worked_problems')}
              className="text-xs text-cyan-400 hover:underline pt-1 inline-block cursor-pointer"
            >
              View 10 Solved Problems →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
