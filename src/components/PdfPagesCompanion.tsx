import { useState } from 'react';
import { PDF_PAGES, PDFPageReference } from '../data/lectureNotesData';
import { BookOpen, ExternalLink, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface PdfPagesCompanionProps {
  onNavigateToTopic: (tab: 'curriculum' | 'even_odd' | 'periodicity' | 'worked_problems') => void;
}

export function PdfPagesCompanion({ onNavigateToTopic }: PdfPagesCompanionProps) {
  const [selectedPageNumber, setSelectedPageNumber] = useState<number>(1);

  const selectedPage = PDF_PAGES.find((p) => p.pageNumber === selectedPageNumber) || PDF_PAGES[0];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>NOTEBOOK COMPANION</span>
          <span aria-hidden="true">·</span>
          <span>PAGES 1 THROUGH 14</span>
          <span aria-hidden="true">·</span>
          <span>DIRECT TRANSCRIPTION & COMMENTARY</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">
          Page-by-Page Lecture Notes Companion
        </h2>
        <p className="text-slate-300 max-w-3xl leading-relaxed text-sm sm:text-base">
          Follow along directly with your handwritten PDF pages. Select any page number below to read the professor's clean digital transcription, the intuition behind the chalkboard notes, and the common exam traps.
        </p>
      </section>

      {/* Page Selection Bar */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-slate-400">SELECT PAGE FROM YOUR PDF:</span>
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5">
          {PDF_PAGES.map((page) => {
            const isSelected = page.pageNumber === selectedPageNumber;
            return (
              <button
                key={page.pageNumber}
                onClick={() => setSelectedPageNumber(page.pageNumber)}
                className={`py-2 px-1 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md ring-2 ring-cyan-400'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                p.{page.pageNumber}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Page Content Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>PDF PAGE {selectedPage.pageNumber} OF 14</span>
              <span>·</span>
              <span className="uppercase">{selectedPage.topic}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {selectedPage.title}
            </h3>
          </div>

          <button
            onClick={() => {
              if (selectedPage.topic === 'even_odd') onNavigateToTopic('even_odd');
              else if (selectedPage.topic === 'periodicity') onNavigateToTopic('periodicity');
              else onNavigateToTopic('curriculum');
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Jump to Interactive Lab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400">PAGE SUMMARY:</span>
          <p className="text-sm text-slate-200 leading-relaxed">
            {selectedPage.summary}
          </p>
        </div>

        {/* Transcribed Key Equations from Handwritten Text */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400">TRANSCRIBED HANDWRITTEN EQUATIONS:</span>
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs sm:text-sm text-emerald-300">
            {selectedPage.keyEquations.map((eq, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-900/60 border border-slate-800/80">
                {eq}
              </div>
            ))}
          </div>
        </div>

        {/* Professor Insight & Pitfall Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Teacher's Chalkboard Insight:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedPage.teacherInsight}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40 space-y-1.5">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              Common Exam Trap for Page {selectedPage.pageNumber}:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedPage.examTrap}
            </p>
          </div>
        </div>

        {/* Pagination Prev / Next Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            disabled={selectedPageNumber === 1}
            onClick={() => setSelectedPageNumber((prev) => Math.max(1, prev - 1))}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            ← Previous Page ({selectedPageNumber > 1 ? selectedPageNumber - 1 : 1})
          </button>

          <span className="text-xs font-mono text-slate-400">
            Page {selectedPageNumber} / 14
          </span>

          <button
            disabled={selectedPageNumber === 14}
            onClick={() => setSelectedPageNumber((prev) => Math.min(14, prev + 1))}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Next Page ({selectedPageNumber < 14 ? selectedPageNumber + 1 : 14}) →
          </button>
        </div>
      </div>
    </div>
  );
}
