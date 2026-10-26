import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import {
  Heart,
  Calendar,
  Utensils,
  Dumbbell,
  LayoutDashboard,
  BookOpen,
  Wifi,
  Languages,
  Menu,
  X,
  Sparkles,
  UserCheck,
  LogOut,
  LogIn,
  UserCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    language,
    setLanguage,
    lowDataMode,
    setLowDataMode,
    t,
    loadAhmedDemo,
    userProfile,
    currentUser,
    logout,
    setIsAuthScreenOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const initiateSignOut = () => {
    setShowSignOutConfirm(true);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: t('home'), icon: Heart },
    { id: 'plan-setup', label: t('planSetup'), icon: Calendar },
    { id: 'workouts', label: t('workoutPlanner'), icon: Dumbbell },
    { id: 'meals', label: t('mealPlanner'), icon: Utensils },
    { id: 'progress', label: t('progress'), icon: LayoutDashboard },
    { id: 'education', label: t('education'), icon: BookOpen },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-28 py-2">
            
            {/* Logo & Brand using custom Logo component */}
            <div
              onClick={() => setActiveTab('home')}
              className="cursor-pointer group"
            >
              <Logo
                size="lg"
                textColor="text-slate-900 group-hover:text-blue-900 transition-colors"
                subtextColor="text-slate-500"
              />
            </div>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 shadow-xs ring-1 ring-blue-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right Controls: Demo, Low-Data, Language, CTA */}
            <div className="hidden sm:flex items-center gap-2">
              
              {/* Ahmed Preset Demo */}
              <button
                onClick={loadAhmedDemo}
                title="View Ahmed's complete beginner journey & preset plan"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 hover:border-amber-300 transition-colors"
              >
                <span className="hidden xl:inline">{language === 'ur' ? 'احمد کا پلان' : "Ahmed's Plan"}</span>
                <span className="xl:hidden">Demo</span>
              </button>

              {/* Data Saver Mode Toggle */}
              <button
                onClick={() => setLowDataMode(!lowDataMode)}
                title="Toggle Data Saver Mode for slower internet connections"
                className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap shrink-0 ${
                  lowDataMode
                    ? 'bg-blue-900 text-white border-blue-900 shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span className="hidden md:inline">{t('lowDataMode')}</span>
              </button>

              {/* Language Switch */}
              <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs font-bold rounded-md transition-all ${
                    language === 'en'
                      ? 'bg-white text-blue-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ur')}
                  className={`px-2 py-1 text-xs font-bold rounded-md font-urdu transition-all ${
                    language === 'ur'
                      ? 'bg-white text-blue-900 shadow-xs'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  اردو
                </button>
              </div>

              {/* User Account / Auth Button */}
              {currentUser ? (
                <div className="flex items-center gap-2 pl-1 border-l border-slate-200">
                  <div
                    title={`${currentUser.name} (${currentUser.email})`}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-[11px] shadow-2xs">
                      {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="text-left leading-tight hidden xl:block max-w-[110px]">
                      <span className="font-bold truncate block">{currentUser.name}</span>
                      <span className="text-[10px] text-slate-400 truncate block">{currentUser.email}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSignOutConfirm(true)}
                    title="Sign out / Switch account"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors text-xs font-semibold"
                    aria-label="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{language === 'ur' ? 'سائن آؤٹ' : 'Sign Out'}</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthScreenOpen(true)}
                  className="flex items-center gap-1.5 bg-blue-900 hover:bg-blue-950 text-white px-3.5 py-2 rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{language === 'ur' ? 'لاگ اِن / سائن اپ' : 'Log In / Sign Up'}</span>
                </button>
              )}

              {/* CTA: Plan Setup */}
              <button
                onClick={() => setActiveTab('plan-setup')}
                className="flex items-center gap-1.5 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-blue-900/20 hover:shadow transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('createMyPlan')}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="p-2 text-xs font-bold rounded-lg border border-slate-200 bg-slate-100 text-slate-700"
              >
                {language === 'en' ? 'اردو' : 'EN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            
            {/* Mobile User Status Card */}
            {currentUser ? (
              <div className="p-3 mb-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-900 text-white font-bold flex items-center justify-center text-xs">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentUser.name}</h4>
                    <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={initiateSignOut}
                  className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mb-3">
                <button
                  onClick={() => {
                    setIsAuthScreenOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-900 text-white text-xs font-bold flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{language === 'ur' ? 'لاگ اِن یا سائن اپ کریں' : 'Log In or Sign Up'}</span>
                </button>
              </div>
            )}

            <div className="space-y-1 mb-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-semibold ${
                      isActive
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  loadAhmedDemo();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm font-semibold flex items-center justify-center"
              >
                <span>{language === 'ur' ? 'احمد کا پلان دیکھیں' : "View Ahmed's Story & Preset Plan"}</span>
              </button>

              <button
                onClick={() => {
                  setLowDataMode(!lowDataMode);
                }}
                className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2.5 border transition-all ${
                  lowDataMode ? 'bg-blue-900 text-white border-blue-900 shadow-xs' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span>{lowDataMode ? (language === 'ur' ? 'ڈیٹا سیور موڈ آن' : 'Data Saver Mode ON') : (language === 'ur' ? 'ڈیٹا سیور موڈ آن کریں' : 'Enable Data Saver Mode')}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('plan-setup');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 rounded-lg bg-blue-800 text-white text-base font-bold shadow-sm flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>{t('createMyPlan')}</span>
              </button>
            </div>
          </div>
        )}
      </header>
      
      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {language === 'ur' ? 'کیا آپ سائن آؤٹ کرنا چاہتے ہیں؟' : 'Do you want to sign out?'}
            </h3>
            <div className="flex gap-3 justify-end mt-6">
              <button
                onClick={() => setShowSignOutConfirm(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {language === 'ur' ? 'نہیں' : 'No'}
              </button>
              <button
                onClick={() => {
                  logout();
                  setShowSignOutConfirm(false);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors"
              >
                {language === 'ur' ? 'ہاں' : 'Yes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
