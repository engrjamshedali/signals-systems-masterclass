export interface PDFPageReference {
  pageNumber: number;
  title: string;
  topic: 'taxonomy' | 'even_odd' | 'periodicity';
  summary: string;
  keyEquations: string[];
  teacherInsight: string;
  examTrap: string;
}

export interface SolvedProblem {
  id: string;
  number: number;
  pdfPage: number;
  title: string;
  signalType: 'Continuous-Time (CT)' | 'Discrete-Time (DT)';
  category: 'even_odd' | 'periodicity' | 'sum_periodicity';
  givenExpression: string;
  teacherGoal: string;
  steps: {
    stepNumber: number;
    title: string;
    explanation: string;
    math: string;
  }[];
  finalAnswer: string;
  keyTakeaway: string;
  examTrap: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
}

export const PDF_PAGES: PDFPageReference[] = [
  {
    pageNumber: 1,
    title: 'Classification of Signals & Even/Odd Foundations',
    topic: 'taxonomy',
    summary: 'Introduces the 4 core classifications: (1) Even/Odd, (2) Deterministic/Random, (3) Periodic/Non-Periodic, (4) Energy/Power. Establishes the Continuous-Time definition of Even signals: x(-t) = x(t).',
    keyEquations: ['x(-t) = x(t) \\quad \\text{(Even)}', 'x(-t) = -x(t) \\quad \\text{(Odd)}'],
    teacherInsight: 'Even signals have mirror symmetry about the vertical axis (y-axis). Odd signals have rotational/anti-symmetry about the origin.',
    examTrap: 'For any continuous odd signal, x(0) MUST equal 0 because x(0) = -x(0) implies 2x(0) = 0!'
  },
  {
    pageNumber: 2,
    title: 'Odd Signal Definition & Discrete-Time Formulations',
    topic: 'even_odd',
    summary: 'Explains odd signals for Continuous Time and Discrete Time. Begins the formal derivation for decomposing any arbitrary signal into even and odd components.',
    keyEquations: [
      'x[-n] = x[n] \\quad \\text{(DT Even)}',
      'x[-n] = -x[n] \\quad \\text{(DT Odd)}',
      'x(t) = x_e(t) + x_o(t) \\quad \\text{--- Eq. (1)}'
    ],
    teacherInsight: 'Discrete signals follow the exact same symmetry principles, but n can only take integer values (..., -2, -1, 0, 1, 2, ...).',
    examTrap: 'Do not confuse time reflection x[-n] with amplitude inversion -x[n]. Time reflection flips left-to-right; amplitude inversion flips upside-down.'
  },
  {
    pageNumber: 3,
    title: 'Algebraic Proof: Universal Even & Odd Decomposition',
    topic: 'even_odd',
    summary: 'Rigorous derivation proving every signal can be uniquely split into an even part and an odd part by adding and subtracting time-reversed equations.',
    keyEquations: [
      'x_e(t) = \\frac{1}{2}\\big[x(t) + x(-t)\\big]',
      'x_o(t) = \\frac{1}{2}\\big[x(t) - x(-t)\\big]',
      'x_e[n] = \\frac{1}{2}\\big[x[n] + x[-n]\\big]',
      'x_o[n] = \\frac{1}{2}\\big[x[n] - x[-n]\\big]'
    ],
    teacherInsight: 'Notice how the 1/2 factor comes from adding Eq (1) and Eq (2), where the odd components cancel out leaving 2 x_e(t).',
    examTrap: 'Forgetting the 1/2 factor in front is the #1 algebraic mistake students make in midterms.'
  },
  {
    pageNumber: 4,
    title: 'Algebraic Properties & Real-World Engineering Significance',
    topic: 'even_odd',
    summary: 'Covers addition and multiplication rules for symmetry, plus practical applications in Fourier analysis and FIR filter design.',
    keyEquations: [
      '\\text{Even} \\times \\text{Even} = \\text{Even}',
      '\\text{Odd} \\times \\text{Odd} = \\text{Even}',
      '\\text{Even} \\times \\text{Odd} = \\text{Odd}'
    ],
    teacherInsight: 'Multiplication behaves exactly like sign arithmetic: (+) × (+) = (+), (-) × (-) = (+), and (+) × (-) = (-).',
    examTrap: 'Even + Odd is NEITHER even nor odd (unless one of them is zero). Students often mistakenly guess it is odd.'
  },
  {
    pageNumber: 5,
    title: 'Worked Example 1: Decomposing 5 sin(t)',
    topic: 'even_odd',
    summary: 'Applies decomposition formulas to x(t) = 5 sin(t). Verifies sin(t) is pure odd, yielding xe(t) = 0 and xo(t) = 5 sin(t).',
    keyEquations: [
      '\\sin(-t) = -\\sin(t)',
      'x_e(t) = \\frac{1}{2}[5\\sin(t) - 5\\sin(t)] = 0',
      'x_o(t) = 5\\sin(t)'
    ],
    teacherInsight: 'Standard rule: sin(t) is standard odd, and cos(t) is standard even.',
    examTrap: 'Remember that sin(0) = 0, which satisfies the fundamental condition for odd signals.'
  },
  {
    pageNumber: 6,
    title: 'Worked Examples 2 & 3: Multi-Term Signals & Exponential Decays',
    topic: 'even_odd',
    summary: 'Solves x(t) = sin(t) + cos(t) + sin(t)cos(t) and begins x(t) = e^(-2t) cos(t), showing how product terms behave.',
    keyEquations: [
      'x(t) = \\sin(t) + \\cos(t) + \\sin(t)\\cos(t)',
      'x_e(t) = \\cos(t)',
      'x_o(t) = \\sin(t) + \\sin(t)\\cos(t)',
      'x_e(t) = \\cos(t)\\cosh(2t)'
    ],
    teacherInsight: 'In Example 2, sin(t)cos(t) is odd because odd × even = odd. So it groups entirely with the odd component xo(t).',
    examTrap: 'When substituting t -> -t in e^(-2t), it becomes e^(-2(-t)) = e^(2t). Watch out for double negative errors!'
  },
  {
    pageNumber: 7,
    title: 'Hyperbolic Trigonometry Connection & Homework Problems',
    topic: 'even_odd',
    summary: 'Finishes Example 3 connecting to sinh(2t), then assigns Homework (4) polynomial x(t) = 1+t+3t²+5t³+9t⁴ and Homework (5) mixed trigonometric terms.',
    keyEquations: [
      '\\sinh(\\theta) = \\frac{e^\\theta - e^{-\\theta}}{2}',
      'x_o(t) = -\\cos(t)\\sinh(2t)',
      'x(t) = 1 + t + 3t^2 + 5t^3 + 9t^4',
      'x(t) = 1 + t\\cos(t) + t^2\\sin(t) + t^3\\sin(t)\\cos(t)'
    ],
    teacherInsight: 'Hyperbolic functions cosh(θ) and sinh(θ) are literally defined by the even and odd combinations of exponential powers e^θ!',
    examTrap: 'Do not forget the negative sign: (e^(-2t) - e^(2t))/2 = - (e^(2t) - e^(-2t))/2 = -sinh(2t).'
  },
  {
    pageNumber: 8,
    title: 'Continuous-Time Periodicity & Fundamental Frequency',
    topic: 'periodicity',
    summary: 'Defines periodic signals: x(t) = x(t + T0). Contrasts periodic waveforms (sinusoids) with non-periodic transients (exponential decays).',
    keyEquations: [
      'x(t) = x(t + T_0)',
      'f_0 = \\frac{1}{T_0} \\quad \\text{(Hz)}',
      '\\omega_0 = 2\\pi f_0 = \\frac{2\\pi}{T_0} \\quad \\text{(rad/s)}'
    ],
    teacherInsight: 'T0 is the SMALLEST positive time duration after which the entire waveform repeats identically.',
    examTrap: 'While 2T0, 3T0, 4T0 are all periods, only the smallest positive value is the FUNDAMENTAL period.'
  },
  {
    pageNumber: 9,
    title: 'Discrete-Time Periodicity & The Integer Constraint',
    topic: 'periodicity',
    summary: 'Formulates DT periodicity condition x[n] = x[n + N]. Derives the mathematical requirement for sinusoidal DT periodicity.',
    keyEquations: [
      'x[n] = x[n + N]',
      'x[n] = \\cos(2\\pi f_0 n)',
      'x[n + N] = \\cos(2\\pi f_0 n + 2\\pi f_0 N)'
    ],
    teacherInsight: 'Unlike Continuous-Time where any sinusoidal signal is ALWAYS periodic, a Discrete-Time sinusoidal signal is NOT guaranteed to be periodic!',
    examTrap: 'Never assume a DT sinusoid is periodic simply because it contains a cos or sin term. You must test if f0 is rational.'
  },
  {
    pageNumber: 10,
    title: 'The Golden Rationality Condition & Sum of CT Signals',
    topic: 'periodicity',
    summary: 'Proves DT sinusoid periodicity requires f0 = k/N (rational number). Establishes condition for sum of CT periodic signals x(t) = x1(t) + x2(t).',
    keyEquations: [
      'f_0 = \\frac{k}{N} \\quad (k, N \\in \\mathbb{Z})',
      '\\frac{T_1}{T_2} = \\frac{n}{m} \\in \\mathbb{Q} \\quad \\text{(Rationality Condition)}'
    ],
    teacherInsight: 'A sum of two CT periodic signals is periodic IF AND ONLY IF their period ratio T1/T2 is a rational number.',
    examTrap: 'If T1 = 2 seconds and T2 = π seconds, T1/T2 = 2/π (irrational). The sum is completely APERIODIC (non-periodic)!'
  },
  {
    pageNumber: 11,
    title: 'LCM Method for Fundamental Period & DT Signal Sums',
    topic: 'periodicity',
    summary: 'Calculates overall fundamental period using LCM(T1, T2). Shows that the sum of two periodic DT signals is ALWAYS periodic.',
    keyEquations: [
      'T = \\text{LCM}(T_1, T_2)',
      'N = \\text{LCM}(N_1, N_2)'
    ],
    teacherInsight: 'In Discrete-Time, N1 and N2 are already positive integers, so N1/N2 is always rational. Thus, sum of periodic DT signals is ALWAYS periodic!',
    examTrap: 'When finding the LCM of fractions a/b and c/d, use LCM(a, c) / GCD(b, d).'
  },
  {
    pageNumber: 12,
    title: 'Worked Periodicity Examples 1 & 2',
    topic: 'periodicity',
    summary: 'Evaluates CT signal x(t) = 5 cos(200π t) and DT signal x[n] = 12 sin(25π n).',
    keyEquations: [
      '2\\pi f_0 = 200\\pi \\implies f_0 = 100\\text{ Hz}, \\; T_0 = 10\\text{ ms}',
      '2\\pi f_0 = 25\\pi \\implies f_0 = \\frac{25}{2} = \\frac{k}{N}'
    ],
    teacherInsight: 'For x(t) = 5 cos(200π t), the angular frequency ω = 200π rad/s. Dividing by 2π yields f0 = 100 Hz, so T0 = 1/100 s = 10 ms.',
    examTrap: 'Do not confuse angular frequency ω (in rad/s) with cyclic frequency f (in Hz). Always divide ω by 2π.'
  },
  {
    pageNumber: 13,
    title: 'The Famous "π Trap" (Ex 3) & Power Reduction Identity (Ex 4)',
    topic: 'periodicity',
    summary: 'Analyzes x[n] = 9 cos(25n) showing it is NON-PERIODIC because 25/(2π) is irrational. Solves x(t) = cos²(2π t) via half-angle identity.',
    keyEquations: [
      'f_0 = \\frac{25}{2\\pi} \\neq \\frac{k}{N} \\implies \\text{Non-Periodic!}',
      '\\cos^2(\\theta) = \\frac{1 + \\cos(2\\theta)}{2}',
      'x(t) = \\frac{1}{2} + \\frac{1}{2}\\cos(4\\pi t) \\implies T_0 = 0.5\\text{ s}'
    ],
    teacherInsight: 'In Example 3, because there is no π inside the argument (25n), the frequency f0 = 25/(2π) has π in denominator, which is irrational. It NEVER repeats!',
    examTrap: 'For Example 4: Many students forget that squaring a cosine DOUBLES its frequency! Fundamental period halves from 1s to 0.5s.'
  },
  {
    pageNumber: 14,
    title: 'Composite Signal Periodicity: LCM Calculation (Ex 5)',
    topic: 'periodicity',
    summary: 'Full solution for x(t) = 4 cos((π/100)t) + 2 cos((2π/180)t). Computes T1=200s, T2=180s, tests ratio 10/9, and finds T=1800s.',
    keyEquations: [
      'T_1 = 200\\text{ s}, \\quad T_2 = 180\\text{ s}',
      '\\frac{T_1}{T_2} = \\frac{200}{180} = \\frac{10}{9} \\in \\mathbb{Q}',
      'T = 9 \\times T_1 = 10 \\times T_2 = 1800\\text{ seconds}'
    ],
    teacherInsight: 'To find the LCM when T1/T2 = p/q (in lowest terms), simply cross-multiply: T = q × T1 = p × T2 = 9 × 200 = 1800 s (30 minutes!).',
    examTrap: 'Students often forget to reduce the fraction T1/T2 to its lowest coprime terms before cross-multiplying.'
  }
];

export const SOLVED_PROBLEMS: SolvedProblem[] = [
  {
    id: 'prob-1',
    number: 1,
    pdfPage: 5,
    title: 'Even & Odd Components of 5 sin(t)',
    signalType: 'Continuous-Time (CT)',
    category: 'even_odd',
    givenExpression: 'x(t) = 5 \\sin(t)',
    teacherGoal: 'Determine the even component xe(t) and odd component xo(t) using standard definitions.',
    steps: [
      {
        stepNumber: 1,
        title: 'Compute the time-reversed signal x(-t)',
        explanation: 'Substitute t with -t into the expression. Recall that sine is an odd function, so sin(-t) = -sin(t).',
        math: 'x(-t) = 5 \\sin(-t) = -5 \\sin(t)'
      },
      {
        stepNumber: 2,
        title: 'Apply the Even Component formula',
        explanation: 'The even component is defined as the arithmetic mean of x(t) and x(-t).',
        math: 'x_e(t) = \\frac{1}{2}\\big[x(t) + x(-t)\\big] = \\frac{1}{2}\\big[5\\sin(t) + (-5\\sin(t))\\big] = \\frac{1}{2}[0] = 0'
      },
      {
        stepNumber: 3,
        title: 'Apply the Odd Component formula',
        explanation: 'The odd component is defined as half the difference between x(t) and x(-t).',
        math: 'x_o(t) = \\frac{1}{2}\\big[x(t) - x(-t)\\big] = \\frac{1}{2}\\big[5\\sin(t) - (-5\\sin(t))\\big] = \\frac{1}{2}[10\\sin(t)] = 5\\sin(t)'
      },
      {
        stepNumber: 4,
        title: 'Verification Check',
        explanation: 'Check that xe(t) + xo(t) reconstructs original x(t).',
        math: 'x_e(t) + x_o(t) = 0 + 5\\sin(t) = 5\\sin(t) = x(t) \\quad \\checkmark'
      }
    ],
    finalAnswer: 'x_e(t) = 0, \\quad x_o(t) = 5 \\sin(t)',
    keyTakeaway: 'Any pure odd function has a zero even component and is identical to its own odd component.',
    examTrap: 'Writing sin(-t) = sin(t). Remember: sine is odd (sine mirrors across origin), cosine is even (cosine mirrors across y-axis).'
  },
  {
    id: 'prob-2',
    number: 2,
    pdfPage: 6,
    title: 'Decomposition of Mixed Trigonometric Terms',
    signalType: 'Continuous-Time (CT)',
    category: 'even_odd',
    givenExpression: 'x(t) = \\sin(t) + \\cos(t) + \\sin(t)\\cos(t)',
    teacherGoal: 'Decompose a multi-term trigonometric signal containing linear and product terms.',
    steps: [
      {
        stepNumber: 1,
        title: 'Determine time-reversed version x(-t)',
        explanation: 'Substitute t with -t in each individual term.',
        math: 'x(-t) = \\sin(-t) + \\cos(-t) + \\sin(-t)\\cos(-t) = -\\sin(t) + \\cos(t) - \\sin(t)\\cos(t)'
      },
      {
        stepNumber: 2,
        title: 'Add x(t) and x(-t) to find xe(t)',
        explanation: 'Notice that sin(t) and -sin(t) cancel out, as do sin(t)cos(t) and -sin(t)cos(t). Only cos(t) remains doubled.',
        math: 'x_e(t) = \\frac{1}{2}\\big[x(t) + x(-t)\\big] = \\frac{1}{2}\\big[2\\cos(t)\\big] = \\cos(t)'
      },
      {
        stepNumber: 3,
        title: 'Subtract x(-t) from x(t) to find xo(t)',
        explanation: 'The cos(t) terms cancel out, while the odd terms double.',
        math: 'x_o(t) = \\frac{1}{2}\\big[x(t) - x(-t)\\big] = \\frac{1}{2}\\big[2\\sin(t) + 2\\sin(t)\\cos(t)\\big] = \\sin(t) + \\sin(t)\\cos(t)'
      }
    ],
    finalAnswer: 'x_e(t) = \\cos(t), \\quad x_o(t) = \\sin(t) + \\sin(t)\\cos(t)',
    keyTakeaway: 'Product of Odd × Even is always Odd. Therefore, sin(t)cos(t) is purely odd and joins xo(t). Alternatively, note sin(t)cos(t) = (1/2)sin(2t), which is pure sine (odd).',
    examTrap: 'Assuming product terms must be split. Inspecting the symmetry of individual terms can solve this in seconds!'
  },
  {
    id: 'prob-3',
    number: 3,
    pdfPage: 6,
    title: 'Damped Oscillation: Exponential & Hyperbolic Functions',
    signalType: 'Continuous-Time (CT)',
    category: 'even_odd',
    givenExpression: 'x(t) = e^{-2t} \\cos(t)',
    teacherGoal: 'Find the even and odd components and express the final result in terms of standard hyperbolic functions cosh(2t) and sinh(2t).',
    steps: [
      {
        stepNumber: 1,
        title: 'Evaluate x(-t)',
        explanation: 'Replace t with -t: e^(-2(-t)) = e^(2t), and cos(-t) = cos(t).',
        math: 'x(-t) = e^{-2(-t)} \\cos(-t) = e^{2t} \\cos(t)'
      },
      {
        stepNumber: 2,
        title: 'Calculate Even Component xe(t)',
        explanation: 'Factor out the common cos(t) term, revealing the definition of hyperbolic cosine cosh(2t).',
        math: 'x_e(t) = \\frac{1}{2}\\big[e^{-2t}\\cos(t) + e^{2t}\\cos(t)\\big] = \\cos(t) \\cdot \\left[\\frac{e^{2t} + e^{-2t}}{2}\\right] = \\cos(t)\\cosh(2t)'
      },
      {
        stepNumber: 3,
        title: 'Calculate Odd Component xo(t)',
        explanation: 'Factor out -cos(t) to match the standard hyperbolic sine definition: sinh(θ) = (e^θ - e^(-θ))/2.',
        math: 'x_o(t) = \\frac{1}{2}\\big[e^{-2t}\\cos(t) - e^{2t}\\cos(t)\\big] = -\\cos(t) \\cdot \\left[\\frac{e^{2t} - e^{-2t}}{2}\\right] = -\\cos(t)\\sinh(2t)'
      }
    ],
    finalAnswer: 'x_e(t) = \\cos(t)\\cosh(2t), \\quad x_o(t) = -\\cos(t)\\sinh(2t)',
    keyTakeaway: 'Euler formulas and hyperbolic functions are the fundamental language of even and odd exponential analysis.',
    examTrap: 'Missing the negative sign in the sinh term: (e^(-2t) - e^(2t))/2 is negative sinh(2t), not positive.'
  },
  {
    id: 'prob-4',
    number: 4,
    pdfPage: 7,
    title: 'Homework 1: 4th-Degree Polynomial Decomposition',
    signalType: 'Continuous-Time (CT)',
    category: 'even_odd',
    givenExpression: 'x(t) = 1 + t + 3t^2 + 5t^3 + 9t^4',
    teacherGoal: 'Decompose a polynomial into its even and odd parts without algebraic slog using power parity.',
    steps: [
      {
        stepNumber: 1,
        title: 'Inspect powers of t under time reflection t -> -t',
        explanation: 'Even powers satisfy (-t)^(2k) = t^(2k). Odd powers satisfy (-t)^(2k+1) = -t^(2k+1). Constant term 1 is 1 · t^0 (even).',
        math: 'x(-t) = 1 + (-t) + 3(-t)^2 + 5(-t)^3 + 9(-t)^4 = 1 - t + 3t^2 - 5t^3 + 9t^4'
      },
      {
        stepNumber: 2,
        title: 'Group even powers for xe(t)',
        explanation: 'Adding x(t) and x(-t) eliminates all odd powers (t, 5t³), leaving the even powers.',
        math: 'x_e(t) = \\frac{1}{2}\\big[(1+1) + (3+3)t^2 + (9+9)t^4\\big] = 1 + 3t^2 + 9t^4'
      },
      {
        stepNumber: 3,
        title: 'Group odd powers for xo(t)',
        explanation: 'Subtracting x(-t) from x(t) eliminates all even powers (1, 3t², 9t⁴), leaving the odd powers.',
        math: 'x_o(t) = \\frac{1}{2}\\big[(1-(-1))t + (5-(-5))t^3\\big] = t + 5t^3'
      }
    ],
    finalAnswer: 'x_e(t) = 1 + 3t^2 + 9t^4, \\quad x_o(t) = t + 5t^3',
    keyTakeaway: 'For any polynomial, the even part consists solely of even power terms (including constants), and the odd part consists solely of odd power terms.',
    examTrap: 'Thinking constant 1 is neutral or zero. A constant is symmetric: f(t) = 1 and f(-t) = 1, so it is strictly EVEN!'
  },
  {
    id: 'prob-5',
    number: 5,
    pdfPage: 7,
    title: 'Homework 2: Mixed Polynomial-Trigonometric Terms',
    signalType: 'Continuous-Time (CT)',
    category: 'even_odd',
    givenExpression: 'x(t) = 1 + t\\cos(t) + t^2\\sin(t) + t^3\\sin(t)\\cos(t)',
    teacherGoal: 'Classify each term by test of parity under t -> -t.',
    steps: [
      {
        stepNumber: 1,
        title: 'Test Term 1: 1',
        explanation: 'Constant term does not change with t.',
        math: '1 \\longrightarrow 1 \\quad \\implies \\text{EVEN}'
      },
      {
        stepNumber: 2,
        title: 'Test Term 2: t cos(t)',
        explanation: '(-t) cos(-t) = (-t) cos(t) = -t cos(t). Sign inverted!',
        math: 't\\cos(t) \\longrightarrow -t\\cos(t) \\quad \\implies \\text{ODD}'
      },
      {
        stepNumber: 3,
        title: 'Test Term 3: t² sin(t)',
        explanation: '(-t)² sin(-t) = t² (-sin(t)) = -t² sin(t). Sign inverted!',
        math: 't^2\\sin(t) \\longrightarrow -t^2\\sin(t) \\quad \\implies \\text{ODD}'
      },
      {
        stepNumber: 4,
        title: 'Test Term 4: t³ sin(t) cos(t)',
        explanation: '(-t)³ sin(-t) cos(-t) = (-t³) (-sin(t)) cos(t) = +t³ sin(t) cos(t). Double negative makes positive!',
        math: 't^3\\sin(t)\\cos(t) \\longrightarrow +t^3\\sin(t)\\cos(t) \\quad \\implies \\text{EVEN}'
      }
    ],
    finalAnswer: 'x_e(t) = 1 + t^3\\sin(t)\\cos(t), \\quad x_o(t) = t\\cos(t) + t^2\\sin(t)',
    keyTakeaway: 'In Term 4: t³ is odd, sin(t) is odd, cos(t) is even. Odd × Odd × Even = Even! Thus it belongs to xe(t).',
    examTrap: 'Assuming t³ makes the fourth term odd. Always multiply the parities of ALL constituent factors!'
  },
  {
    id: 'prob-6',
    number: 6,
    pdfPage: 12,
    title: 'Periodicity of Continuous-Time Cosine: 5 cos(200π t)',
    signalType: 'Continuous-Time (CT)',
    category: 'periodicity',
    givenExpression: 'x(t) = 5 \\cos(200\\pi t)',
    teacherGoal: 'Find the fundamental cyclic frequency f0 and fundamental period T0.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identify general form',
        explanation: 'Compare with standard Continuous-Time sinusoid x(t) = A cos(2π f0 t) = A cos(ω0 t).',
        math: '\\omega_0 = 200\\pi \\text{ rad/s}'
      },
      {
        stepNumber: 2,
        title: 'Calculate fundamental frequency f0',
        explanation: 'Equate 2π f0 = 200π and solve for f0 in Hertz (Hz).',
        math: '2\\pi f_0 = 200\\pi \\implies f_0 = \\frac{200\\pi}{2\\pi} = 100\\text{ Hz}'
      },
      {
        stepNumber: 3,
        title: 'Calculate fundamental period T0',
        explanation: 'Fundamental period is the reciprocal of cyclic frequency f0.',
        math: 'T_0 = \\frac{1}{f_0} = \\frac{1}{100} = 0.01\\text{ s} = 10\\text{ ms}'
      }
    ],
    finalAnswer: 'f_0 = 100\\text{ Hz}, \\quad T_0 = 0.01\\text{ s} = 10\\text{ ms}',
    keyTakeaway: 'All continuous-time pure sinusoids with non-zero real frequency are strictly periodic.',
    examTrap: 'Giving T0 = 200π. Remember ω is in radians/second, not period in seconds!'
  },
  {
    id: 'prob-7',
    number: 7,
    pdfPage: 12,
    title: 'Periodicity of Discrete-Time Sinusoid: 12 sin(25π n)',
    signalType: 'Discrete-Time (DT)',
    category: 'periodicity',
    givenExpression: 'x[n] = 12 \\sin(25\\pi n)',
    teacherGoal: 'Determine if the discrete-time signal is periodic, and if so, find the fundamental period N in samples.',
    steps: [
      {
        stepNumber: 1,
        title: 'Compare with DT standard form',
        explanation: 'General discrete sinusoid is x[n] = A sin(2π f0 n). Find digital frequency f0 in cycles/sample.',
        math: '2\\pi f_0 = 25\\pi \\implies f_0 = \\frac{25\\pi}{2\\pi} = \\frac{25}{2}'
      },
      {
        stepNumber: 2,
        title: 'Test the DT Periodicity Condition',
        explanation: 'A discrete sinusoid is periodic IF AND ONLY IF f0 is a ratio of integers: f0 = k/N.',
        math: 'f_0 = \\frac{25}{2} = \\frac{k}{N} \\quad (k = 25 \\in \\mathbb{Z}, \\; N = 2 \\in \\mathbb{Z})'
      },
      {
        stepNumber: 3,
        title: 'Find fundamental period N',
        explanation: 'Since 25 and 2 share no common factors (coprime), the denominator represents the fundamental period N.',
        math: 'N = 2\\text{ samples / cycle}'
      }
    ],
    finalAnswer: '\\text{Periodic with fundamental period } N = 2 \\text{ samples}',
    keyTakeaway: 'Because f0 is rational (25/2), the sequence repeats every N = 2 samples! In fact, x[n] = 12 sin(25π n) = 0 for all integer n.',
    examTrap: 'Thinking N must be 25. The period N is the reduced denominator, not the numerator!'
  },
  {
    id: 'prob-8',
    number: 8,
    pdfPage: 13,
    title: 'The Famous "Missing π" Trap: 9 cos(25 n)',
    signalType: 'Discrete-Time (DT)',
    category: 'periodicity',
    givenExpression: 'x[n] = 9 \\cos(25 n)',
    teacherGoal: 'Determine periodicity when angular frequency lacks π.',
    steps: [
      {
        stepNumber: 1,
        title: 'Extract digital frequency f0',
        explanation: 'Set 2π f0 = 25 (the coefficient of n in radians/sample).',
        math: '2\\pi f_0 = 25 \\implies f_0 = \\frac{25}{2\\pi}'
      },
      {
        stepNumber: 2,
        title: 'Test rationality of f0',
        explanation: 'Because π is an irrational number, 25 / (2π) can NEVER be expressed as a ratio of two integers k/N.',
        math: 'f_0 = \\frac{25}{2\\pi} \\notin \\mathbb{Q} \\implies \\frac{25}{2\\pi} \\neq \\frac{k}{N}'
      },
      {
        stepNumber: 3,
        title: 'Conclusion',
        explanation: 'Since f0 is irrational, the signal NEVER repeats identically at any integer sample index.',
        math: 'x[n] \\text{ is strictly NON-PERIODIC (Aperiodic)}'
      }
    ],
    finalAnswer: '\\text{Non-Periodic (Aperiodic)}',
    keyTakeaway: 'This is the classic electrical engineering exam trap! In continuous time, 9 cos(25t) is periodic. In discrete time, 9 cos(25n) is NON-PERIODIC because samples fall on different fractional phases of the cycle forever!',
    examTrap: 'Assuming all discrete sinusoids are periodic. Without a factor of π to cancel 2π, DT sinusoids are ALWAYS aperiodic!'
  },
  {
    id: 'prob-9',
    number: 9,
    pdfPage: 13,
    title: 'Trigonometric Power Reduction: cos²(2π t)',
    signalType: 'Continuous-Time (CT)',
    category: 'periodicity',
    givenExpression: 'x(t) = \\cos^2(2\\pi t)',
    teacherGoal: 'Find the period of a squared sinusoidal signal using trigonometric identities.',
    steps: [
      {
        stepNumber: 1,
        title: 'Apply the Half-Angle Power Reduction Identity',
        explanation: 'Use cos²(θ) = (1 + cos(2θ)) / 2 with θ = 2π t.',
        math: 'x(t) = \\frac{1 + \\cos(2(2\\pi t))}{2} = \\frac{1}{2} + \\frac{1}{2}\\cos(4\\pi t)'
      },
      {
        stepNumber: 2,
        title: 'Analyze components',
        explanation: 'The DC offset 1/2 is constant (invariant under any shift). The AC oscillatory term has angular frequency ω = 4π rad/s.',
        math: '\\omega_0 = 4\\pi \\text{ rad/s} \\implies 2\\pi f_0 = 4\\pi \\implies f_0 = 2\\text{ Hz}'
      },
      {
        stepNumber: 3,
        title: 'Compute fundamental period T0',
        explanation: 'Take the reciprocal of cyclic frequency f0.',
        math: 'T_0 = \\frac{1}{f_0} = \\frac{1}{2} = 0.5\\text{ s}'
      }
    ],
    finalAnswer: 'f_0 = 2\\text{ Hz}, \\quad T_0 = 0.5\\text{ s}',
    keyTakeaway: 'Squaring a cosine doubles its frequency from 1 Hz to 2 Hz, which halves the period from 1s to 0.5s.',
    examTrap: 'Stating T0 = 1 s by looking at the inner 2π t without expanding the square.'
  },
  {
    id: 'prob-10',
    number: 10,
    pdfPage: 14,
    title: 'Sum of Two Periodic Signals: LCM Period Calculation',
    signalType: 'Continuous-Time (CT)',
    category: 'sum_periodicity',
    givenExpression: 'x(t) = 4\\cos\\left(\\frac{\\pi}{100}t\\right) + 2\\cos\\left(\\frac{2\\pi}{180}t\\right)',
    teacherGoal: 'Test if the sum is periodic, and calculate the overall fundamental period T using LCM.',
    steps: [
      {
        stepNumber: 1,
        title: 'Find period T1 of first component x1(t)',
        explanation: 'Equate 2π f1 = π/100 to find f1 and T1.',
        math: '2\\pi f_1 = \\frac{\\pi}{100} \\implies f_1 = \\frac{1}{200}\\text{ Hz} \\implies T_1 = 200\\text{ s}'
      },
      {
        stepNumber: 2,
        title: 'Find period T2 of second component x2(t)',
        explanation: 'Equate 2π f2 = 2π/180 to find f2 and T2.',
        math: '2\\pi f_2 = \\frac{2\\pi}{180} \\implies f_2 = \\frac{1}{180}\\text{ Hz} \\implies T_2 = 180\\text{ s}'
      },
      {
        stepNumber: 3,
        title: 'Test Periodicity Condition (Rational Ratio)',
        explanation: 'Check whether the ratio T1 / T2 is a rational number (fraction of integers).',
        math: '\\frac{T_1}{T_2} = \\frac{200}{180} = \\frac{10}{9} \\in \\mathbb{Q} \\quad \\implies \\text{Signal is PERIODIC!}'
      },
      {
        stepNumber: 4,
        title: 'Compute overall period T via LCM',
        explanation: 'Since T1/T2 = 10/9 in lowest coprime terms, T = 9 × T1 = 10 × T2.',
        math: 'T = \\text{LCM}(200, 180) = 9 \\times 200 = 10 \\times 180 = 1800\\text{ s}'
      }
    ],
    finalAnswer: 'T = 1800\\text{ seconds} \\; (30\\text{ minutes})',
    keyTakeaway: 'The overall period of combined signals is the Least Common Multiple (LCM) of individual periods, ensuring both sub-oscillations complete an integer number of full cycles.',
    examTrap: 'Simply adding T1 + T2 = 380s. Never add periods together; take their least common multiple!'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'If x(t) is a Continuous-Time odd signal, what must be the value of x(0)?',
    options: ['x(0) = 1', 'x(0) = 0', 'x(0) can be any real number', 'x(0) is undefined'],
    correctIndex: 1,
    hint: 'Recall the odd condition x(-t) = -x(t) and plug in t = 0.',
    explanation: 'For any odd signal, x(-0) = -x(0), which gives x(0) = -x(0). Adding x(0) to both sides yields 2 x(0) = 0, hence x(0) must equal 0!'
  },
  {
    id: 'q2',
    question: 'What is the symmetry of the product of two odd signals: x1(t) · x2(t)?',
    options: ['Odd signal', 'Even signal', 'Neither even nor odd', 'Zero signal'],
    correctIndex: 1,
    hint: 'Think of sign multiplication: (-) × (-) = ?',
    explanation: 'Let y(t) = x1(t) · x2(t). Then y(-t) = x1(-t) · x2(-t) = (-x1(t)) · (-x2(t)) = x1(t) · x2(t) = y(t). The product is strictly EVEN!'
  },
  {
    id: 'q3',
    question: 'Why is the discrete-time signal x[n] = cos(0.3 n) non-periodic (aperiodic)?',
    options: [
      'Because amplitude is less than 1',
      'Because n only takes integer values',
      'Because frequency f0 = 0.3 / (2π) is irrational',
      'Because cosine is always an odd function'
    ],
    correctIndex: 2,
    hint: 'Recall the golden condition: f0 = k/N must be a ratio of integers.',
    explanation: 'For a DT sinusoidal signal to be periodic, f0 = ω0/(2π) must be a rational number k/N. Here, f0 = 0.3/(2π) contains π in denominator, which is irrational. Hence it never repeats!'
  },
  {
    id: 'q4',
    question: 'Given x(t) = 3 cos(40π t) + sin(60π t), what is the fundamental period T?',
    options: ['T = 0.1 s', 'T = 0.05 s', 'T = 0.2 s', 'The signal is non-periodic'],
    correctIndex: 0,
    hint: 'Find T1 for 40π and T2 for 60π, test T1/T2, then find LCM.',
    explanation: 'For 40π: f1 = 20 Hz, T1 = 1/20 s = 0.05 s. For 60π: f2 = 30 Hz, T2 = 1/30 s. The ratio T1/T2 = (1/20)/(1/30) = 3/2 (rational!). Fundamental period T = 2 × T1 = 3 × T2 = 2 × (1/20) = 0.10 s.'
  },
  {
    id: 'q5',
    question: 'What is the even component xe(t) of the signal x(t) = e^(-3t)?',
    options: ['xe(t) = e^(-3t)', 'xe(t) = cosh(3t)', 'xe(t) = sinh(3t)', 'xe(t) = 0'],
    correctIndex: 1,
    hint: 'xe(t) = [x(t) + x(-t)] / 2. Recall the definition of cosh(θ).',
    explanation: 'xe(t) = [e^(-3t) + e^(3t)] / 2 = cosh(3t). The even component of an exponential is hyperbolic cosine!'
  },
  {
    id: 'q6',
    question: 'In engineering filter design and Fourier series, why is knowing even or odd symmetry valuable?',
    options: [
      'It reduces required Fourier computation by 50% and simplifies linear-phase FIR design',
      'It makes all signals amplify without noise',
      'It eliminates the need for power supplies',
      'It allows analog signals to be transmitted with zero bandwidth'
    ],
    correctIndex: 0,
    hint: 'Review Page 4 of the notes on the real-world significance of symmetry.',
    explanation: 'Even signals only contain cosine harmonics (zero sine coefficients), while odd signals only contain sine harmonics! This cuts Fourier transform and DSP computation in half and guarantees exact linear phase in FIR filters.'
  }
];
