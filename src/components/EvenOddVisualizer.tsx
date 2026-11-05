import { useState, useMemo } from 'react';
import { Eye, EyeOff, Sliders, CheckCircle2, AlertTriangle, Cpu, Lightbulb, Play, RotateCcw, ShieldCheck } from 'lucide-react';

type SignalPresetId = 'sine_odd' | 'cosine_even' | 'damped_exp' | 'mixed_trig' | 'polynomial' | 'piecewise_ramp';

interface SignalPreset {
  id: SignalPresetId;
  name: string;
  pdfReference: string;
  mathFormula: string;
  description: string;
  fn: (t: number) => number;
  expectedEven: string;
  expectedOdd: string;
}

const PRESETS: SignalPreset[] = [
  {
    id: 'sine_odd',
    name: '5 sin(t) (Pure Odd)',
    pdfReference: 'Notes Page 5, Example 1',
    mathFormula: 'x(t) = 5\\sin(t)',
    description: 'Pure odd signal. Notice how x(-t) = -x(t). The even component is identically zero, and xo(t) matches x(t) completely.',
    fn: (t: number) => 5 * Math.sin(t),
    expectedEven: 'x_e(t) = 0',
    expectedOdd: 'x_o(t) = 5\\sin(t)'
  },
  {
    id: 'cosine_even',
    name: '4 cos(t) (Pure Even)',
    pdfReference: 'Notes Page 5, Standard Rule',
    mathFormula: 'x(t) = 4\\cos(t)',
    description: 'Pure even signal. Mirrored horizontally across the y-axis: x(-t) = x(t). The odd component is identically zero.',
    fn: (t: number) => 4 * Math.cos(t),
    expectedEven: 'x_e(t) = 4\\cos(t)',
    expectedOdd: 'x_o(t) = 0'
  },
  {
    id: 'damped_exp',
    name: 'e^(-0.4t) cos(t) (Asymmetric Damped)',
    pdfReference: 'Notes Page 6, Example 3',
    mathFormula: 'x(t) = e^{-0.4t}\\cos(t)',
    description: 'Asymmetric signal decaying for t > 0 and growing for t < 0. Breaks into cos(t)cosh(0.4t) [even] and -cos(t)sinh(0.4t) [odd].',
    fn: (t: number) => Math.exp(-0.4 * t) * Math.cos(t),
    expectedEven: 'x_e(t) = \\cos(t)\\cosh(0.4t)',
    expectedOdd: 'x_o(t) = -\\cos(t)\\sinh(0.4t)'
  },
  {
    id: 'mixed_trig',
    name: 'sin(t) + cos(t) + sin(t)cos(t)',
    pdfReference: 'Notes Page 6, Example 2',
    mathFormula: 'x(t) = \\sin(t) + \\cos(t) + \\sin(t)\\cos(t)',
    description: 'Composite signal. cos(t) is even; sin(t) is odd; sin(t)cos(t) is odd because odd × even = odd!',
    fn: (t: number) => Math.sin(t) + Math.cos(t) + Math.sin(t) * Math.cos(t),
    expectedEven: 'x_e(t) = \\cos(t)',
    expectedOdd: 'x_o(t) = \\sin(t) + \\sin(t)\\cos(t)'
  },
  {
    id: 'polynomial',
    name: '1 - 1.2t + 0.4t² (Polynomial)',
    pdfReference: 'Notes Page 7, Homework 4',
    mathFormula: 'x(t) = 1 - 1.2t + 0.4t^2',
    description: 'Powers of t directly segregate: even powers (1 + 0.4t²) form xe(t); odd power (-1.2t) forms xo(t).',
    fn: (t: number) => 1 - 1.2 * t + 0.4 * t * t,
    expectedEven: 'x_e(t) = 1 + 0.4t^2',
    expectedOdd: 'x_o(t) = -1.2t'
  },
  {
    id: 'piecewise_ramp',
    name: 'Asymmetric Triangle Pulse',
    pdfReference: 'Notes Page 1, Notebook Diagram',
    mathFormula: 'x(t) = \\text{Triangle Ramp from class diagram}',
    description: 'Directly replicates the handwritten sketch from Page 1: a triangle ramp that differs between positive and negative time.',
    fn: (t: number) => {
      if (t >= 0 && t <= 2) return 2 - t;
      if (t < 0 && t >= -2) return 0.5 * (t + 2);
      return 0;
    },
    expectedEven: 'x_e(t) = 0.5[x(t) + x(-t)]',
    expectedOdd: 'x_o(t) = 0.5[x(t) - x(-t)]'
  }
];

export function EvenOddVisualizer() {
  const [selectedPresetId, setSelectedPresetId] = useState<SignalPresetId>('damped_exp');
  const [testTime, setTestTime] = useState<number>(1.5);
  
  // Layer visibility toggles
  const [showOriginal, setShowOriginal] = useState<boolean>(true);
  const [showReversed, setShowReversed] = useState<boolean>(false);
  const [showEven, setShowEven] = useState<boolean>(true);
  const [showOdd, setShowOdd] = useState<boolean>(true);
  const [showSumReconstructed, setShowSumReconstructed] = useState<boolean>(false);

  // Derivation disclosure step
  const [derivationStep, setDerivationStep] = useState<number>(4);

  const activePreset = useMemo(
    () => PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0],
    [selectedPresetId]
  );

  // Canvas bounds & sampling
  const tMin = -6;
  const tMax = 6;
  const numPoints = 240;
  const step = (tMax - tMin) / (numPoints - 1);

  const plotData = useMemo(() => {
    const points: { t: number; x: number; xRev: number; xe: number; xo: number; xSum: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      const t = tMin + i * step;
      const x = activePreset.fn(t);
      const xRev = activePreset.fn(-t);
      const xe = 0.5 * (x + xRev);
      const xo = 0.5 * (x - xRev);
      const xSum = xe + xo;
      points.push({ t, x, xRev, xe, xo, xSum });
    }
    return points;
  }, [activePreset]);

  // Dynamic Y scale
  const yExtent = useMemo(() => {
    let minY = -1;
    let maxY = 1;
    plotData.forEach((p) => {
      if (Number.isFinite(p.x)) {
        minY = Math.min(minY, p.x, p.xe, p.xo);
        maxY = Math.max(maxY, p.x, p.xe, p.xo);
      }
    });
    const padding = Math.max(0.8, (maxY - minY) * 0.15);
    return { min: minY - padding, max: maxY + padding };
  }, [plotData]);

  // SVG coordinate transformation
  const svgWidth = 840;
  const svgHeight = 360;
  const pad = { top: 24, right: 30, bottom: 32, left: 45 };
  const graphWidth = svgWidth - pad.left - pad.right;
  const graphHeight = svgHeight - pad.top - pad.bottom;

  const toSvgX = (t: number) => pad.left + ((t - tMin) / (tMax - tMin)) * graphWidth;
  const toSvgY = (y: number) =>
    pad.top + (1 - (y - yExtent.min) / (yExtent.max - yExtent.min)) * graphHeight;

  // Generate SVG path strings
  const originalPath = useMemo(
    () =>
      plotData
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.t).toFixed(1)} ${toSvgY(p.x).toFixed(1)}`)
        .join(' '),
    [plotData, yExtent]
  );

  const reversedPath = useMemo(
    () =>
      plotData
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.t).toFixed(1)} ${toSvgY(p.xRev).toFixed(1)}`)
        .join(' '),
    [plotData, yExtent]
  );

  const evenPath = useMemo(
    () =>
      plotData
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.t).toFixed(1)} ${toSvgY(p.xe).toFixed(1)}`)
        .join(' '),
    [plotData, yExtent]
  );

  const oddPath = useMemo(
    () =>
      plotData
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.t).toFixed(1)} ${toSvgY(p.xo).toFixed(1)}`)
        .join(' '),
    [plotData, yExtent]
  );

  const sumPath = useMemo(
    () =>
      plotData
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(p.t).toFixed(1)} ${toSvgY(p.xSum).toFixed(1)}`)
        .join(' '),
    [plotData, yExtent]
  );

  // Live evaluated values at test cursor t0
  const valAtT0 = activePreset.fn(testTime);
  const valAtNegT0 = activePreset.fn(-testTime);
  const xeAtT0 = 0.5 * (valAtT0 + valAtNegT0);
  const xoAtT0 = 0.5 * (valAtT0 - valAtNegT0);
  const sumAtT0 = xeAtT0 + xoAtT0;

  return (
    <div className="space-y-10">
      {/* Header and Teacher's Introduction */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>MODULE 01</span>
          <span aria-hidden="true">·</span>
          <span>LECTURE NOTES PAGES 1 TO 7</span>
          <span aria-hidden="true">·</span>
          <span>SYMMETRY & DECOMPOSITION</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Even & Odd Signal Decomposer
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed text-sm sm:text-base">
          As your professor notes on Page 2: <strong className="text-white font-semibold">Every signal in the universe</strong>—no matter how irregular or complicated—can be broken down into exactly two complementary components: an <span className="text-emerald-400 font-semibold">Even component</span> (mirror symmetric across y-axis) and an <span className="text-amber-400 font-semibold">Odd component</span> (rotational point symmetric through origin).
        </p>
      </section>

      {/* Preset Selector Bar */}
      <section className="space-y-3">
        <label className="text-xs font-semibold text-slate-400">
          CHOOSE SIGNAL PRESET FROM LECTURE NOTES:
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer text-left whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 flex items-center gap-2">
          <span className="font-semibold text-cyan-400">{activePreset.pdfReference}:</span>
          <span>{activePreset.description}</span>
        </p>
      </section>

      {/* Two-Zone Interactive Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: Live SVG Oscilloscope Canvas (7 cols) */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400">STAGE 01</span>
              <span className="text-sm font-bold text-white">Waveform Inspection</span>
              <span className="text-xs text-slate-400 font-mono">({activePreset.mathFormula})</span>
            </div>
            
            {/* Quick reset cursor button */}
            <button
              onClick={() => setTestTime(1.5)}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Reset time cursor to 1.5s"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset t₀</span>
            </button>
          </div>

          {/* SVG Plot */}
          <div className="relative w-full overflow-hidden rounded-lg bg-slate-950 border border-slate-900">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto block select-none"
              style={{ maxHeight: '420px' }}
            >
              <defs>
                {/* Grid pattern */}
                <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
                  <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#1e293b" strokeWidth="0.75" />
                </pattern>
              </defs>

              <rect width={svgWidth} height={svgHeight} fill="#090d16" />
              <rect x={pad.left} y={pad.top} width={graphWidth} height={graphHeight} fill="url(#grid)" opacity="0.6" />

              {/* Coordinate Axes */}
              {/* Horizontal axis (y=0) */}
              <line
                x1={pad.left}
                y1={toSvgY(0)}
                x2={pad.left + graphWidth}
                y2={toSvgY(0)}
                stroke="#475569"
                strokeWidth="1.5"
              />
              {/* Vertical axis (t=0) */}
              <line
                x1={toSvgX(0)}
                y1={pad.top}
                x2={toSvgX(0)}
                y2={pad.top + graphHeight}
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Axis Labels */}
              <text x={pad.left + graphWidth - 10} y={toSvgY(0) - 8} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                t (time)
              </text>
              <text x={toSvgX(0) + 8} y={pad.top + 14} fill="#94a3b8" fontSize="11" fontFamily="sans-serif">
                x(t)
              </text>

              {/* Time tick marks */}
              {[-4, -2, 2, 4].map((tick) => (
                <g key={tick}>
                  <line
                    x1={toSvgX(tick)}
                    y1={toSvgY(0) - 4}
                    x2={toSvgX(tick)}
                    y2={toSvgY(0) + 4}
                    stroke="#64748b"
                    strokeWidth="1"
                  />
                  <text
                    x={toSvgX(tick)}
                    y={toSvgY(0) + 16}
                    fill="#64748b"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {tick}
                  </text>
                </g>
              ))}

              {/* 1. Time-Reversed Signal x(-t) */}
              {showReversed && (
                <path
                  d={reversedPath}
                  fill="none"
                  stroke="#818cf8"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  opacity="0.8"
                />
              )}

              {/* 2. Original Signal x(t) */}
              {showOriginal && (
                <path
                  d={originalPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
              )}

              {/* 3. Even Component xe(t) */}
              {showEven && (
                <path
                  d={evenPath}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                />
              )}

              {/* 4. Odd Component xo(t) */}
              {showOdd && (
                <path
                  d={oddPath}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                />
              )}

              {/* 5. Sum Reconstructed (xe + xo) */}
              {showSumReconstructed && (
                <path
                  d={sumPath}
                  fill="none"
                  stroke="#f43f5e"
                  strokeWidth="2"
                  strokeDasharray="2 3"
                />
              )}

              {/* Interactive Inspection Cursor Lines */}
              {/* Positive t0 */}
              <line
                x1={toSvgX(testTime)}
                y1={pad.top}
                x2={toSvgX(testTime)}
                y2={pad.top + graphHeight}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.7"
              />
              {/* Negative -t0 */}
              <line
                x1={toSvgX(-testTime)}
                y1={pad.top}
                x2={toSvgX(-testTime)}
                y2={pad.top + graphHeight}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.7"
              />

              {/* Points at t0 and -t0 */}
              {showOriginal && (
                <>
                  <circle
                    cx={toSvgX(testTime)}
                    cy={toSvgY(valAtT0)}
                    r="4"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx={toSvgX(-testTime)}
                    cy={toSvgY(valAtNegT0)}
                    r="4"
                    fill="#818cf8"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </>
              )}

              {showEven && (
                <circle
                  cx={toSvgX(testTime)}
                  cy={toSvgY(xeAtT0)}
                  r="4"
                  fill="#34d399"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              )}

              {showOdd && (
                <circle
                  cx={toSvgX(testTime)}
                  cy={toSvgY(xoAtT0)}
                  r="4"
                  fill="#fbbf24"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </div>

          {/* Interactive Layer Visibility Toggles */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-semibold text-slate-400">TOGGLE COMPONENT LAYERS:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  showOriginal
                    ? 'bg-sky-950/60 border-sky-600 text-sky-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="truncate">x(t) Original</span>
                {showOriginal ? <Eye className="w-3.5 h-3.5 ml-1 shrink-0" /> : <EyeOff className="w-3.5 h-3.5 ml-1 shrink-0" />}
              </button>

              <button
                onClick={() => setShowReversed(!showReversed)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  showReversed
                    ? 'bg-indigo-950/60 border-indigo-600 text-indigo-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="truncate">x(-t) Flipped</span>
                {showReversed ? <Eye className="w-3.5 h-3.5 ml-1 shrink-0" /> : <EyeOff className="w-3.5 h-3.5 ml-1 shrink-0" />}
              </button>

              <button
                onClick={() => setShowEven(!showEven)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  showEven
                    ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="truncate">x_e(t) Even Part</span>
                {showEven ? <Eye className="w-3.5 h-3.5 ml-1 shrink-0" /> : <EyeOff className="w-3.5 h-3.5 ml-1 shrink-0" />}
              </button>

              <button
                onClick={() => setShowOdd(!showOdd)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  showOdd
                    ? 'bg-amber-950/60 border-amber-600 text-amber-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="truncate">x_o(t) Odd Part</span>
                {showOdd ? <Eye className="w-3.5 h-3.5 ml-1 shrink-0" /> : <EyeOff className="w-3.5 h-3.5 ml-1 shrink-0" />}
              </button>

              <button
                onClick={() => setShowSumReconstructed(!showSumReconstructed)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  showSumReconstructed
                    ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                    : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="truncate">x_e + x_o Check</span>
                {showSumReconstructed ? <Eye className="w-3.5 h-3.5 ml-1 shrink-0" /> : <EyeOff className="w-3.5 h-3.5 ml-1 shrink-0" />}
              </button>
            </div>
          </div>

          {/* Interactive Slider for Time Cursor t0 */}
          <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inspect Time Point:</span>
                <span className="font-mono text-cyan-400 font-semibold">t₀ = {testTime.toFixed(2)}s</span>
                <span className="text-slate-500 font-mono">(and -t₀ = {(-testTime).toFixed(2)}s)</span>
              </span>
              <span className="text-xs text-slate-400">Drag to observe mirror cancellation</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={5.0}
              step={0.05}
              value={testTime}
              aria-label="Inspection time point t0"
              onChange={(e) => setTestTime(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>

        {/* Right Zone: Real-Time Mathematical Telemetry & Step Proof (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Real-Time Values at Cursor Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-cyan-400">STAGE 02 · REAL-TIME PROOF</span>
              <h3 className="text-sm font-bold text-white mt-0.5">Live Algebraic Verification</h3>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>x(t₀ = {testTime.toFixed(2)})</span>
                  <span className="text-sky-300 font-semibold">{valAtT0.toFixed(3)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>x(-t₀ = {(-testTime).toFixed(2)})</span>
                  <span className="text-indigo-300 font-semibold">{valAtNegT0.toFixed(3)}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/40 space-y-1">
                <span className="text-emerald-400 font-semibold block">Even Component:</span>
                <div className="text-slate-300">
                  x_e({testTime.toFixed(2)}) = ½ · ({valAtT0.toFixed(3)} + {valAtNegT0.toFixed(3)})
                </div>
                <div className="text-emerald-300 font-bold text-sm">
                  = {xeAtT0.toFixed(3)}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 space-y-1">
                <span className="text-amber-400 font-semibold block">Odd Component:</span>
                <div className="text-slate-300">
                  x_o({testTime.toFixed(2)}) = ½ · ({valAtT0.toFixed(3)} - ({valAtNegT0.toFixed(3)}))
                </div>
                <div className="text-amber-300 font-bold text-sm">
                  = {xoAtT0.toFixed(3)}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Sum: x_e + x_o</span>
                  <span className="text-cyan-300 font-bold">
                    {sumAtT0.toFixed(3)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Matches Original x(t₀)?</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> EXACT MATCH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Teacher Advice */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Lightbulb className="w-4 h-4 shrink-0" />
              <span>PROFESSOR'S GOLDEN RULE:</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              If an exam asks for the value of an odd signal at <span className="font-mono text-cyan-300">t = 0</span>, the answer is always <strong className="text-white">0</strong>! If <span className="font-mono">x(0) ≠ 0</span>, the signal CANNOT be odd because <span className="font-mono">x(0) = -x(0)</span> implies <span className="font-mono">2x(0) = 0</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Professor's Blackboard: Step-by-Step Algebraic Derivation (Pages 2 & 3) */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono text-cyan-400">DERIVATION · LECTURE NOTES PAGES 2 & 3</span>
            <h3 className="text-xl font-bold text-white mt-1">
              How the Universal Decomposition Formulas Were Born
            </h3>
          </div>
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800">
            {[1, 2, 3, 4].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => setDerivationStep(stepNum)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  derivationStep === stepNum
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Step {stepNum}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {derivationStep >= 1 && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">STEP 1 · State the Hypothesis (Page 2)</span>
              <p className="text-sm text-slate-300">
                Assume that any arbitrary continuous signal <span className="font-math italic">x(t)</span> can be written as the sum of an unknown even part <span className="font-math italic">x_e(t)</span> and an unknown odd part <span className="font-math italic">x_o(t)</span>:
              </p>
              <div className="font-mono text-sm text-white bg-slate-900 p-3 rounded border border-slate-800">
                x(t) = x_e(t) + x_o(t) &nbsp;&nbsp;&nbsp;&nbsp; ── Equation (1)
              </div>
            </div>
          )}

          {derivationStep >= 2 && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">STEP 2 · Replace t with -t (Page 2 & 3)</span>
              <p className="text-sm text-slate-300">
                Now time-reverse the equation. By the definitions of even and odd symmetry, <span className="font-math italic">x_e(-t) = x_e(t)</span> and <span className="font-math italic">x_o(-t) = -x_o(t)</span>:
              </p>
              <div className="font-mono text-sm text-white bg-slate-900 p-3 rounded border border-slate-800">
                x(-t) = x_e(-t) + x_o(-t) = x_e(t) - x_o(t) &nbsp;&nbsp;&nbsp;&nbsp; ── Equation (2)
              </div>
            </div>
          )}

          {derivationStep >= 3 && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">STEP 3 · Add Equations (1) & (2) to Isolate x_e(t) (Page 3)</span>
              <p className="text-sm text-slate-300">
                Adding the two equations cancels the odd terms <span className="font-math italic">+x_o(t)</span> and <span className="font-math italic">-x_o(t)</span>:
              </p>
              <div className="font-mono text-sm text-emerald-300 bg-slate-900 p-3 rounded border border-emerald-900/50">
                x(t) + x(-t) = 2 x_e(t) &nbsp;&implies;&nbsp; <strong className="text-white">x_e(t) = ½ [x(t) + x(-t)]</strong>
              </div>
            </div>
          )}

          {derivationStep >= 4 && (
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-semibold text-cyan-400">STEP 4 · Subtract Equation (2) from (1) to Isolate x_o(t) (Page 3)</span>
              <p className="text-sm text-slate-300">
                Subtracting eliminates the even terms <span className="font-math italic">x_e(t) - x_e(t) = 0</span>, doubling the odd component:
              </p>
              <div className="font-mono text-sm text-amber-300 bg-slate-900 p-3 rounded border border-amber-900/50">
                x(t) - x(-t) = 2 x_o(t) &nbsp;&implies;&nbsp; <strong className="text-white">x_o(t) = ½ [x(t) - x(-t)]</strong>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Real-World Engineering Significance & Properties Strip (Page 4) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Arithmetic Properties of Symmetry (Page 4)
            </h3>
          </div>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300">Addition Rules:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                <li>Even + Even = <strong>Even</strong></li>
                <li>Odd + Odd = <strong>Odd</strong></li>
                <li>Even + Odd = <strong>Neither Even nor Odd</strong> (generic composite)</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-cyan-300">Multiplication Rules:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                <li>Even × Even = <strong>Even</strong> (like + × + = +)</li>
                <li>Odd × Odd = <strong>Even</strong> (like - × - = +)</li>
                <li>Even × Odd = <strong>Odd</strong> (like + × - = -)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              Why Real Engineers Care (Page 4)
            </h3>
          </div>
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-1">1. 50% Faster Fourier Computations:</strong>
              When computing Fourier Series or Fourier Transforms of an even signal, all sine integral coefficients automatically vanish (<span className="font-mono text-cyan-300">b_n = 0</span>). For odd signals, all cosine coefficients vanish (<span className="font-mono text-cyan-300">a_n = 0</span>). This cuts DSP math in half!
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <strong className="text-white block mb-1">2. Linear-Phase FIR Filter Design:</strong>
              In modern telecommunications, audio recording, and radar, filters must not distort phase. Enforcing symmetric or anti-symmetric filter taps guarantees exact linear phase with constant group delay.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
