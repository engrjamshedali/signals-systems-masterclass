import { useState, useMemo } from 'react';
import { Repeat, AlertTriangle, CheckCircle2, XCircle, Calculator, Compass, Sparkles, HelpCircle } from 'lucide-react';

export function PeriodicityLab() {
  const [activeTab, setActiveTab] = useState<'dt_pi_trap' | 'composite_lcm' | 'power_reduction'>('dt_pi_trap');

  // DT Pi Trap state
  const [dtSamplesCount, setDtSamplesCount] = useState<number>(30);

  // Composite LCM Calculator state
  const [t1Input, setT1Input] = useState<number>(200);
  const [t2Input, setT2Input] = useState<number>(180);
  const [hasPiInRatio, setHasPiInRatio] = useState<boolean>(false);

  // Power reduction state
  const [powerReductionFreq, setPowerReductionFreq] = useState<number>(1); // 1 Hz -> 2pi t

  // Greatest Common Divisor helper
  const gcd = (a: number, b: number): number => {
    a = Math.abs(Math.round(a));
    b = Math.abs(Math.round(b));
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  // LCM computation
  const lcmAnalysis = useMemo(() => {
    if (hasPiInRatio) {
      return {
        isPeriodic: false,
        ratioString: `${t1Input} / (${t2Input}·π)`,
        reducedRatio: 'Irrational',
        lcmPeriod: null,
        explanation: 'Because one term contains the transcendental constant π and the other does not, their period ratio is strictly irrational. The composite wave never completes a synchronized common cycle!'
      };
    }

    if (t1Input <= 0 || t2Input <= 0) {
      return {
        isPeriodic: false,
        ratioString: 'Invalid',
        reducedRatio: 'Invalid',
        lcmPeriod: null,
        explanation: 'Periods must be positive non-zero numbers.'
      };
    }

    const g = gcd(t1Input, t2Input);
    const n = Math.round(t1Input / g);
    const m = Math.round(t2Input / g);

    // Fundamental period T = m * T1 = n * T2
    const T = m * t1Input;

    return {
      isPeriodic: true,
      ratioString: `${t1Input} / ${t2Input}`,
      reducedRatio: `${n} / ${m}`,
      n,
      m,
      lcmPeriod: T,
      explanation: `The period ratio T₁ / T₂ = ${t1Input}/${t2Input} reduces to the coprime rational fraction ${n}/${m}. Therefore, overall fundamental period T = ${m} × T₁ = ${n} × T₂ = ${T} seconds.`
    };
  }, [t1Input, t2Input, hasPiInRatio]);

  // Generate Discrete Pi-Trap comparison stems
  const piTrapData = useMemo(() => {
    const stemsA: { n: number; y: number }[] = [];
    const stemsB: { n: number; y: number }[] = [];

    // Signal A: cos(0.2 * pi * n) -> f0 = 0.1 = 1/10 -> N = 10 samples
    // Signal B: cos(0.2 * n) -> f0 = 0.2 / (2pi) -> irrational
    for (let n = 0; n <= dtSamplesCount; n++) {
      stemsA.push({ n, y: Math.cos(0.2 * Math.PI * n) });
      stemsB.push({ n, y: Math.cos(0.2 * n) });
    }
    return { stemsA, stemsB };
  }, [dtSamplesCount]);

  // SVG dimensions for Stem plot
  const svgWidth = 760;
  const svgHeight = 220;
  const pad = { top: 20, right: 25, bottom: 30, left: 45 };
  const graphW = svgWidth - pad.left - pad.right;
  const graphH = svgHeight - pad.top - pad.bottom;

  const stemSvgX = (n: number) => pad.left + (n / dtSamplesCount) * graphW;
  const stemSvgY = (y: number) => pad.top + (1 - (y + 1.2) / 2.4) * graphH;

  return (
    <div className="space-y-10">
      {/* Module Title */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>MODULE 02</span>
          <span aria-hidden="true">·</span>
          <span>LECTURE NOTES PAGES 8 TO 14</span>
          <span aria-hidden="true">·</span>
          <span>PERIODICITY & FREQUENCY</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Periodicity Laboratory & The Famous π-Trap
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed text-sm sm:text-base">
          Why are continuous-time sinusoids <strong className="text-white">always periodic</strong>, whereas discrete-time sinusoids are <strong className="text-white">often completely aperiodic</strong>? Dive into the integer constraint, the ratio test, and least common multiple periods.
        </p>
      </section>

      {/* Segmented Control Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl max-w-2xl">
        <button
          onClick={() => setActiveTab('dt_pi_trap')}
          className={`flex-1 min-w-[180px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'dt_pi_trap'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          1. Discrete-Time "π-Trap" (Pages 9, 13)
        </button>

        <button
          onClick={() => setActiveTab('composite_lcm')}
          className={`flex-1 min-w-[180px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'composite_lcm'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          2. Composite Signals & LCM (Pages 10, 11, 14)
        </button>

        <button
          onClick={() => setActiveTab('power_reduction')}
          className={`flex-1 min-w-[180px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center ${
            activeTab === 'power_reduction'
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          3. Squaring & Power Reduction (Page 13)
        </button>
      </div>

      {/* TAB 1: The Famous Discrete-Time Pi Trap */}
      {activeTab === 'dt_pi_trap' && (
        <div className="space-y-8">
          {/* Conceptual Teacher Callout */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400">THE EXAM FAVORITE · NOTEBOOK PAGE 13, EX 3</span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Why x[n] = 9 cos(25n) is NOT Periodic!
                </h3>
              </div>
              <span className="px-3 py-1 rounded bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-bold shrink-0">
                ⚠️ Top Midterm Trap
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              In Continuous Time, <span className="font-math italic text-cyan-200">x(t) = 9 cos(25t)</span> repeats smoothly every <span className="font-math italic text-cyan-200">T = 2π / 25 seconds</span>. But in Discrete Time, time <span className="font-math italic text-cyan-200">n</span> can only take <strong className="text-white">integer values</strong> (0, 1, 2, 3...). For samples to land on the exact same points of the cycle, the frequency <span className="font-math italic text-cyan-200">f₀ = k / N</span> must be a rational number!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/40 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  CASE A: Signal WITH π &nbsp;➔&nbsp; x₁[n] = cos(0.2π n)
                </span>
                <div className="font-mono text-xs text-slate-300 space-y-1">
                  <div>2π f₀ = 0.2π &implies; f₀ = 0.2π / 2π = 1/10</div>
                  <div className="text-emerald-300 font-bold">f₀ = 1/10 (Rational fraction k/N!)</div>
                  <div>Fundamental Period: N = 10 samples (Strictly Periodic!)</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-800/40 space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" />
                  CASE B: Signal WITHOUT π &nbsp;➔&nbsp; x₂[n] = cos(0.2 n)
                </span>
                <div className="font-mono text-xs text-slate-300 space-y-1">
                  <div>2π f₀ = 0.2 &implies; f₀ = 0.2 / (2π) = 0.1 / π</div>
                  <div className="text-rose-300 font-bold">f₀ is IRRATIONAL (Cannot equal k/N!)</div>
                  <div>Result: Aperiodic / Non-Periodic (Never repeats!)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Side-by-Side Stem Visualizer */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-bold text-white">
                  Visual Proof: Live Discrete Stem Plots
                </h4>
                <p className="text-xs text-slate-400">
                  Compare how the periodic samples hit identical heights every 10 samples, while the non-periodic samples wander forever.
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-xs">
                <span className="text-slate-400">Samples Shown:</span>
                <span className="font-mono font-bold text-cyan-400">{dtSamplesCount}</span>
                <input
                  type="range"
                  min={15}
                  max={60}
                  step={5}
                  value={dtSamplesCount}
                  onChange={(e) => setDtSamplesCount(parseInt(e.target.value))}
                  aria-label="Number of samples shown in stem plot"
                  className="accent-cyan-400 cursor-pointer w-24 h-1.5 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Plot A: Periodic Stem */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold">SIGNAL A: x₁[n] = cos(0.2π n) ── PERIODIC (N = 10)</span>
                <span className="text-slate-400">Repeats at n = 0, 10, 20, 30...</span>
              </div>

              <div className="bg-slate-950 rounded-lg p-2 border border-slate-800/80 overflow-x-auto">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto block select-none">
                  {/* Axis */}
                  <line
                    x1={pad.left}
                    y1={stemSvgY(0)}
                    x2={pad.left + graphW}
                    y2={stemSvgY(0)}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={stemSvgX(0)}
                    y1={pad.top}
                    x2={stemSvgX(0)}
                    y2={pad.top + graphH}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />

                  {/* Periodic reference cycles every 10 samples */}
                  {[0, 10, 20, 30, 40, 50].map((periodMarker) => {
                    if (periodMarker > dtSamplesCount) return null;
                    return (
                      <g key={periodMarker}>
                        <line
                          x1={stemSvgX(periodMarker)}
                          y1={pad.top}
                          x2={stemSvgX(periodMarker)}
                          y2={pad.top + graphH}
                          stroke="#059669"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          opacity="0.4"
                        />
                        <text
                          x={stemSvgX(periodMarker)}
                          y={stemSvgY(0) + 16}
                          fill="#10b981"
                          fontSize="9"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          n={periodMarker}
                        </text>
                      </g>
                    );
                  })}

                  {/* Stems */}
                  {piTrapData.stemsA.map(({ n, y }) => {
                    const isCycleStart = n % 10 === 0;
                    return (
                      <g key={n}>
                        <line
                          x1={stemSvgX(n)}
                          y1={stemSvgY(0)}
                          x2={stemSvgX(n)}
                          y2={stemSvgY(y)}
                          stroke={isCycleStart ? '#34d399' : '#0ea5e9'}
                          strokeWidth={isCycleStart ? '2.5' : '1.5'}
                        />
                        <circle
                          cx={stemSvgX(n)}
                          cy={stemSvgY(y)}
                          r={isCycleStart ? '4.5' : '3'}
                          fill={isCycleStart ? '#34d399' : '#0ea5e9'}
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Plot B: Non-Periodic Stem */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-semibold">SIGNAL B: x₂[n] = cos(0.2 n) ── NON-PERIODIC (Aperiodic)</span>
                <span className="text-rose-400/80">No integer N can satisfy condition</span>
              </div>

              <div className="bg-slate-950 rounded-lg p-2 border border-slate-800/80 overflow-x-auto">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto block select-none">
                  {/* Axis */}
                  <line
                    x1={pad.left}
                    y1={stemSvgY(0)}
                    x2={pad.left + graphW}
                    y2={stemSvgY(0)}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  <line
                    x1={stemSvgX(0)}
                    y1={pad.top}
                    x2={stemSvgX(0)}
                    y2={pad.top + graphH}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />

                  {/* Stems */}
                  {piTrapData.stemsB.map(({ n, y }) => (
                    <g key={n}>
                      <line
                        x1={stemSvgX(n)}
                        y1={stemSvgY(0)}
                        x2={stemSvgX(n)}
                        y2={stemSvgY(y)}
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={stemSvgX(n)}
                        cy={stemSvgY(y)}
                        r="3"
                        fill="#f43f5e"
                        stroke="#ffffff"
                        strokeWidth="1"
                      />
                    </g>
                  ))}
                </svg>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                Notice how the peaks in Signal B slowly drift in height and never repeat exactly. Because <span className="font-mono">f₀ = 0.1/π</span> is irrational, no two samples ever take the identical value at the same cycle phase!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Composite Signals & LCM Calculator */}
      {activeTab === 'composite_lcm' && (
        <div className="space-y-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <span className="text-xs font-mono text-cyan-400">LECTURE NOTES PAGES 10, 11, 14</span>
            <h3 className="text-xl font-bold text-white">
              The Two-Test Rule for Composite Signals: x(t) = x₁(t) + x₂(t)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When two periodic signals are added together, their sum is <strong className="text-white">NOT automatically periodic</strong>! The professor gives you two strict steps:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">TEST 1: The Rationality Ratio Condition</span>
                <p className="text-slate-300 font-sans">
                  The ratio of fundamental periods must be a rational number (fraction of two integers):
                </p>
                <div className="text-white bg-slate-900 p-2 rounded">
                  T₁ / T₂ = n / m &isin; &Qopf;
                </div>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-cyan-400 font-bold block">TEST 2: The LCM Cross-Multiplication</span>
                <p className="text-slate-300 font-sans">
                  If rational, reduce n/m to lowest terms. The composite fundamental period is:
                </p>
                <div className="text-white bg-slate-900 p-2 rounded">
                  T = LCM(T₁, T₂) = m · T₁ = n · T₂
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Periodicity & LCM Calculator */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-bold text-white">
                Interactive LCM & Periodicity Solver
              </h4>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400">LOAD EXAMPLE FROM NOTES:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setT1Input(200);
                    setT2Input(180);
                    setHasPiInRatio(false);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  Notes Page 14 (T₁=200s, T₂=180s)
                </button>
                <button
                  onClick={() => {
                    setT1Input(20);
                    setT2Input(30);
                    setHasPiInRatio(false);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                >
                  60Hz & 40Hz Audio Wave (T₁=20ms, T₂=30ms)
                </button>
                <button
                  onClick={() => {
                    setT1Input(4);
                    setT2Input(3);
                    setHasPiInRatio(true);
                  }}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-800 transition-colors cursor-pointer"
                >
                  Classic Trap: T₁ = 4s, T₂ = 3π s (Irrational!)
                </button>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">
                  Period of Signal 1 (T₁ in seconds):
                </label>
                <input
                  type="number"
                  min={1}
                  value={t1Input}
                  onChange={(e) => setT1Input(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">
                  Period of Signal 2 (T₂ in seconds):
                </label>
                <input
                  type="number"
                  min={1}
                  value={t2Input}
                  onChange={(e) => setT2Input(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">
                  Irrational Factor (π in ratio):
                </label>
                <button
                  onClick={() => setHasPiInRatio(!hasPiInRatio)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                    hasPiInRatio
                      ? 'bg-rose-950 border-rose-600 text-rose-200'
                      : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {hasPiInRatio ? 'Ratio contains π (Irrational!)' : 'Pure Integers (Rational)'}
                </button>
              </div>
            </div>

            {/* Solver Telemetry Display */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">CALCULATOR RESULT</span>
                {lcmAnalysis.isPeriodic ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> COMPOSITE SIGNAL IS PERIODIC
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> NON-PERIODIC (APERIODIC)
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Period Ratio (T₁ / T₂):</span>
                  <span className="text-base font-bold text-white mt-1 block">
                    {lcmAnalysis.ratioString}
                  </span>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Reduced Fraction (n / m):</span>
                  <span className="text-base font-bold text-cyan-300 mt-1 block">
                    {lcmAnalysis.reducedRatio}
                  </span>
                </div>

                <div className="p-3 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[11px]">Overall Period T:</span>
                  <span className="text-base font-bold text-emerald-400 mt-1 block">
                    {lcmAnalysis.lcmPeriod !== null ? `${lcmAnalysis.lcmPeriod} s` : 'Does Not Exist'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                <strong className="text-white">Professor's Step-by-Step Breakdown: </strong>
                {lcmAnalysis.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Power Reduction Trigonometric Identity */}
      {activeTab === 'power_reduction' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
            <span className="text-xs font-mono text-cyan-400">NOTEBOOK PAGE 13 · EXAMPLE 4</span>
            <h3 className="text-xl font-bold text-white">
              Why Squaring a Cosine Doubles Its Frequency: cos²(2π t)
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              When students see <span className="font-math italic text-cyan-200">x(t) = cos²(2π t)</span>, they often guess the period is 1 second because the inside term has <span className="font-math italic">2π</span>. That is an <strong className="text-rose-400">exam trap</strong>!
            </p>

            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold block">Apply the Half-Angle Power Reduction Identity:</span>
              <div className="text-white bg-slate-900 p-3 rounded border border-slate-800">
                cos²(&theta;) = ½ [1 + cos(2&theta;)]
              </div>
              <p className="text-slate-300 font-sans">
                Substitute &theta; = 2&pi; t:
              </p>
              <div className="text-white bg-slate-900 p-3 rounded border border-slate-800">
                x(t) = ½ + ½ cos(2 · (2&pi; t)) = ½ + ½ cos(4&pi; t)
              </div>
              <p className="text-slate-300 font-sans">
                Notice that the oscillation is now at <strong className="text-emerald-300">&omega; = 4&pi; rad/s</strong>!
              </p>
              <div className="text-emerald-300 bg-slate-900 p-3 rounded border border-emerald-900/40">
                2&pi; f₀ = 4&pi; &implies; f₀ = 2 Hz &implies; <strong className="text-white">T₀ = 1 / f₀ = 0.5 seconds</strong>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-cyan-950/20 border border-cyan-800/40 text-xs text-slate-300">
              <strong className="text-cyan-300 block mb-1">Takeaway for Midterms:</strong>
              Any quadratic power of a sinusoid <span className="font-mono">sin²(ωt)</span> or <span className="font-mono">cos²(ωt)</span> produces an oscillation at double frequency <span className="font-mono">2ω</span> plus a DC constant. The fundamental period always cuts in half!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
