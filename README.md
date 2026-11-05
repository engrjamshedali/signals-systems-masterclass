# Signals & Systems: Interactive Lecture Masterclass

An interactive educational platform and digital study companion that breaks down 14 pages of handwritten **Signals & Systems** lecture notes with step-by-step explanations, live waveform simulations, mathematical proofs, and exam preparation tools.

---

## Overview

This application transforms classical Electrical Engineering lecture notes on **Signal Classification**, **Even & Odd Symmetry Decomposition**, and **Continuous/Discrete-Time Periodicity** into a hands-on learning workspace. Students can manipulate signals in real time, verify mathematical identities, step through algebraic derivations, and practice every problem from the syllabus.

---

## Core Modules & Features

### 1. Master Signal Taxonomy (Lecture Notes Page 1)
- **Even vs. Odd Signals**: Horizontal mirror symmetry ($x(-t) = x(t)$) vs. origin anti-symmetry ($x(-t) = -x(t)$).
- **Periodic vs. Non-Periodic Signals**: Continuous-time repetition ($x(t) = x(t + T_0)$) and discrete-time sample periodicity ($x[n] = x[n + N]$).
- **Deterministic vs. Random Signals**: Exact mathematical models vs. stochastic processes.
- **Energy vs. Power Signals**: Finite total energy transients vs. infinite-duration periodic power signals.

### 2. Interactive Even & Odd Signal Laboratory (Pages 1–7)
- **Live Oscilloscope Canvas**: Plot and inspect presets directly from the lecture notes (`5 sin(t)`, `4 cos(t)`, `e^(-0.4t) cos(t)`, `sin(t) + cos(t) + sin(t)cos(t)`, polynomials, and piecewise triangle pulses).
- **Layer Toggles**: Independently show or hide the original signal $x(t)$, time-reversed signal $x(-t)$, even component $x_e(t)$, odd component $x_o(t)$, and reconstructed sum $x_e(t) + x_o(t)$.
- **Real-Time Cursor Verification**: Drag the inspection cursor $t_0$ to see live numerical evaluation of:
  $$x_e(t) = \frac{1}{2}\big[x(t) + x(-t)\big], \quad x_o(t) = \frac{1}{2}\big[x(t) - x(-t)\big]$$
- **Step-by-Step Blackboard Derivation**: Interactive 4-stage proof showing how Equations (1)–(4) are derived.
- **Engineering Significance**: Explains how signal symmetry halves Fourier Series/Transform computation and enables linear-phase FIR filter design.

### 3. Periodicity Laboratory & The Famous $\pi$-Trap (Pages 8–14)
- **Discrete-Time $\pi$-Trap Visualizer**: Side-by-side discrete stem plots comparing periodic $x_1[n] = \cos(0.2\pi n)$ ($N = 10$ samples) with non-periodic $x_2[n] = \cos(0.2n)$, illustrating why $f_0 = \frac{k}{N}$ must be rational.
- **Composite Signal & LCM Period Solver**: Interactive calculator that tests the rationality condition $\frac{T_1}{T_2} = \frac{n}{m} \in \mathbb{Q}$ and computes the overall fundamental period $T = \text{LCM}(T_1, T_2)$.
- **Power Reduction Explorer**: Demonstrates why squaring a sinusoid ($\cos^2(2\pi t) = \frac{1}{2} + \frac{1}{2}\cos(4\pi t)$) doubles its frequency and halves its fundamental period.

### 4. Step-by-Step Problem Solving Workshop (All 10 PDF Problems)
Interactive progressive step reveals, final answers, key takeaways, and common exam pitfalls for every problem and homework exercise in the notes:
1. **Problem 1 (Page 5)**: $x(t) = 5\sin(t)$
2. **Problem 2 (Page 6)**: $x(t) = \sin(t) + \cos(t) + \sin(t)\cos(t)$
3. **Problem 3 (Pages 6–7)**: $x(t) = e^{-2t}\cos(t) \implies x_e(t) = \cos(t)\cosh(2t),\; x_o(t) = -\cos(t)\sinh(2t)$
4. **Problem 4 (Page 7 HW)**: $x(t) = 1 + t + 3t^2 + 5t^3 + 9t^4$
5. **Problem 5 (Page 7 HW)**: $x(t) = 1 + t\cos(t) + t^2\sin(t) + t^3\sin(t)\cos(t)$
6. **Problem 6 (Page 12)**: $x(t) = 5\cos(200\pi t) \implies f_0 = 100\text{ Hz},\; T_0 = 10\text{ ms}$
7. **Problem 7 (Page 12)**: $x[n] = 12\sin(25\pi n) \implies N = 2\text{ samples}$
8. **Problem 8 (Page 13)**: $x[n] = 9\cos(25n) \implies \text{Non-Periodic (Aperiodic)}$
9. **Problem 9 (Page 13)**: $x(t) = \cos^2(2\pi t) \implies f_0 = 2\text{ Hz},\; T_0 = 0.5\text{ s}$
10. **Problem 10 (Page 14)**: $x(t) = 4\cos\left(\frac{\pi}{100}t\right) + 2\cos\left(\frac{2\pi}{180}t\right) \implies T = 1800\text{ s}$

### 5. Page-by-Page PDF Notes Companion (Pages 1–14)
- Direct digital index mapped to each of the 14 handwritten notebook pages with transcribed equations, summaries, teacher insights, and exam trap warnings.

### 6. Self-Assessment Quiz Arena
- 6 interactive conceptual and calculation questions with optional hints, immediate grading, and detailed professor explanations.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, custom academic typography (`Plus Jakarta Sans`, `DM Sans`, `STIX Two Text`, `JetBrains Mono`)
- **Icons**: Lucide React
- **Visualizations**: Custom responsive SVG oscilloscope & discrete-time stem plot engines

---

## Getting Started Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start the development server on port 3000
npm run dev
```

### Build & Typecheck

```bash
# Run TypeScript type validation
npm run lint

# Build for production
npm run build
```

---

## Project Structure

```text
├── index.html                           # Entry HTML & academic font imports
├── metadata.json                        # Application metadata
├── package.json                         # Dependencies and scripts
├── README.md                            # Project documentation
└── src/
    ├── App.tsx                          # Main layout & tab navigation controller
    ├── index.css                        # Tailwind CSS & custom font/scrollbar rules
    ├── main.tsx                         # React DOM root
    ├── data/
    │   └── lectureNotesData.ts          # Structured syllabus, 14 pages, 10 problems, and quiz bank
    └── components/
        ├── Navbar.tsx                   # Top navigation bar
        ├── HeroSection.tsx              # Curriculum overview & 4-axis signal taxonomy
        ├── EvenOddVisualizer.tsx        # Interactive even/odd oscilloscope & derivation proof
        ├── PeriodicityLab.tsx           # Discrete pi-trap stem plots & LCM period calculator
        ├── WorkedProblemsWorkshop.tsx   # Step-by-step interactive solver for all 10 problems
        ├── PdfPagesCompanion.tsx        # Page-by-page (1-14) transcription & guide
        ├── InteractiveQuiz.tsx          # Self-assessment quiz with hints & explanations
        └── Footer.tsx                   # Quick navigation footer
```
