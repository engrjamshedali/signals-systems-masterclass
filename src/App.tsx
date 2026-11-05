/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EvenOddVisualizer } from './components/EvenOddVisualizer';
import { PeriodicityLab } from './components/PeriodicityLab';
import { WorkedProblemsWorkshop } from './components/WorkedProblemsWorkshop';
import { PdfPagesCompanion } from './components/PdfPagesCompanion';
import { InteractiveQuiz } from './components/InteractiveQuiz';
import { Footer } from './components/Footer';

export type TabKey = 'curriculum' | 'even_odd' | 'periodicity' | 'worked_problems' | 'notes_companion' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('curriculum');
  const [targetProblemId, setTargetProblemId] = useState<string | undefined>(undefined);

  // Scroll to top on tab switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenProblem = (problemId: string) => {
    setTargetProblemId(problemId);
    setActiveTab('worked_problems');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {activeTab === 'curriculum' && (
          <HeroSection
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenProblem={handleOpenProblem}
          />
        )}

        {activeTab === 'even_odd' && <EvenOddVisualizer />}

        {activeTab === 'periodicity' && <PeriodicityLab />}

        {activeTab === 'worked_problems' && (
          <WorkedProblemsWorkshop
            onOpenLab={(lab) => setActiveTab(lab)}
            selectedProblemId={targetProblemId}
          />
        )}

        {activeTab === 'notes_companion' && (
          <PdfPagesCompanion
            onNavigateToTopic={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'quiz' && (
          <InteractiveQuiz
            onOpenTopic={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <Footer onNavigate={(tab) => setActiveTab(tab)} />
    </div>
  );
}
