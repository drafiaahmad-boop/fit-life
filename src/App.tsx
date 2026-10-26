import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PlanSetupWizard } from './components/PlanSetupWizard';
import { MealPlannerView } from './components/MealPlannerView';
import { WorkoutPlannerView } from './components/WorkoutPlannerView';
import { ProgressDashboardView } from './components/ProgressDashboardView';
import { EducationView } from './components/EducationView';
import { AhmedStoryModal } from './components/AhmedStoryModal';
import { AIChatModal } from './components/AIChatModal';
import { AuthScreen } from './components/AuthScreen';
import { Footer } from './components/Footer';

const MainLayout: React.FC = () => {
  const { activeTab, lowDataMode, currentUser, isAuthScreenOpen, setIsAuthScreenOpen, language } = useApp();

  // If user is not logged in and either has requested auth or is visiting for the first time
  const hasVisited = typeof window !== 'undefined' ? localStorage.getItem('fitlife_app_v2_has_visited') : null;
  const showInitialAuth = !currentUser && (!hasVisited || isAuthScreenOpen);

  if (showInitialAuth) {
    return (
      <div dir={language === 'ur' ? 'rtl' : 'ltr'} lang={language} className={`min-h-screen ${lowDataMode ? 'low-data-mode' : ''} ${language === 'ur' ? 'font-urdu' : ''}`}>
        <AuthScreen
          onClose={() => {
            localStorage.setItem('fitlife_app_v2_has_visited', 'true');
            setIsAuthScreenOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div dir={language === 'ur' ? 'rtl' : 'ltr'} lang={language} className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors ${lowDataMode ? 'low-data-mode' : ''} ${language === 'ur' ? 'font-urdu' : ''}`}>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'plan-setup' && <PlanSetupWizard />}
        {activeTab === 'workouts' && <WorkoutPlannerView />}
        {activeTab === 'meals' && <MealPlannerView />}
        {activeTab === 'progress' && <ProgressDashboardView />}
        {activeTab === 'education' && <EducationView />}
      </main>

      {/* Modals */}
      <AhmedStoryModal />
      <AIChatModal />
      {isAuthScreenOpen && (
        <AuthScreen
          isModal={true}
          onClose={() => setIsAuthScreenOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
