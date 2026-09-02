import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import BottomNav from './components/BottomNav';
import LanguageSelectorModal from './components/LanguageSelectorModal';

import SplashScreen from './pages/SplashScreen';
import OnboardingScreen from './pages/OnboardingScreen';
import HomeDashboard from './pages/HomeDashboard';
import TranslateScreen from './pages/TranslateScreen';
import VoiceTranslatorScreen from './pages/VoiceTranslatorScreen';
import LessonsScreen from './pages/LessonsScreen';
import WorksheetsScreen from './pages/WorksheetsScreen';
import FlashcardsScreen from './pages/FlashcardsScreen';
import OfflineCenterScreen from './pages/OfflineCenterScreen';
import FeedbackScreen from './pages/FeedbackScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLang, setSelectedLang] = useState('sat'); // Santhali as default primary target
  const [targetGrade, setTargetGrade] = useState('Grade 1');
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  const handleStartFromSplash = () => {
    setShowSplash(false);
    setShowOnboarding(true);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setActiveTab('home');
  };

  if (showSplash) {
    return <SplashScreen onStart={handleStartFromSplash} />;
  }

  if (showOnboarding) {
    return (
      <OnboardingScreen
        onComplete={handleOnboardingComplete}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        targetGrade={targetGrade}
        setTargetGrade={setTargetGrade}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <HeaderNav
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        openLangModal={() => setIsLangModalOpen(true)}
      />

      {/* Main Content View Container */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeDashboard
            setActiveTab={setActiveTab}
            selectedLang={selectedLang}
            targetGrade={targetGrade}
            openLangModal={() => setIsLangModalOpen(true)}
          />
        )}
        {activeTab === 'translate' && (
          <TranslateScreen selectedLang={selectedLang} targetGrade={targetGrade} />
        )}
        {activeTab === 'voice' && (
          <VoiceTranslatorScreen selectedLang={selectedLang} targetGrade={targetGrade} />
        )}
        {activeTab === 'lessons' && (
          <LessonsScreen selectedLang={selectedLang} targetGrade={targetGrade} />
        )}
        {activeTab === 'worksheets' && (
          <WorksheetsScreen selectedLang={selectedLang} targetGrade={targetGrade} />
        )}
        {activeTab === 'flashcards' && (
          <FlashcardsScreen selectedLang={selectedLang} />
        )}
        {activeTab === 'offline' && (
          <OfflineCenterScreen selectedLang={selectedLang} />
        )}
        {activeTab === 'feedback' && (
          <FeedbackScreen selectedLang={selectedLang} />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Language & Grade Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        selectedLang={selectedLang}
        setSelectedLang={setSelectedLang}
        targetGrade={targetGrade}
        setTargetGrade={setTargetGrade}
      />
    </div>
  );
}
