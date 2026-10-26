import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Heart, ShieldCheck, Download, Trash2, Globe, Users, ExternalLink, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActiveTab,
    resetAllData,
    userProfile,
    mealSchedule,
    habits,
    completedWorkoutIds,
    language,
    loadAhmedDemo,
    currentUser,
    setIsAuthScreenOpen,
    logout,
    setIsAIChatModalOpen
  } = useApp();

  const isUr = language === 'ur';
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      userProfile,
      mealSchedule,
      habits,
      completedWorkoutIds
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitlife-plan-${userProfile.name.toLowerCase() || 'user'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Logo textColor="text-white" subtextColor="text-slate-400" />
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {isUr
                ? 'فٹ لائف ایک مکمل، سستا اور حقیقت پسندانہ فٹنس پلیٹ فارم ہے جس میں پاکستانی کھانوں کی منصوبہ بندی، ابتدائی گھریلو ورزشیں اور عادات کی نرم نگرانی شامل ہے۔'
                : 'A complete, affordable, and sustainable fitness and healthy living platform focusing on budget-friendly Pakistani meal planning, beginner home workouts, and positive habit tracking.'}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>{isUr ? 'پرائیویسی فرسٹ: تمام ڈیٹا آپ کی ڈیوائس پر محفوظ ہے' : 'Privacy-First: Data stays stored on your local browser'}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isUr ? 'نیویگیشن' : 'Explore FitLife'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'مرکزی صفحہ' : 'Home'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('plan-setup')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'پلان بنائیں (Wizard)' : 'Personal Plan Setup'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('workouts')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'گھریلو ورزشیں' : 'Beginner Home Workouts'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('meals')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'غذا و دیسی کھانے' : 'Diet & Pakistani Meals'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('progress')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'ویلنیس ڈیش بورڈ' : 'Progress Dashboard'}
                </button>
              </li>
            </ul>
          </div>

          {/* Guidance & Stories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isUr ? 'رہنمائی و نمونہ' : 'Resources & Stories'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={loadAhmedDemo} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isUr ? 'احمد کا سفر (کامیاب مثال)' : "Ahmed's Real-Life Story"}</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('education')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'نیند اور ریکوری گائیڈ' : 'Sleep & Recovery Guide'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('education')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'سائنس ایکسٹرا' : 'Science Extra'}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('education')} className="hover:text-blue-400 transition-colors">
                  {isUr ? 'سوشل میڈیا کے خطرات' : 'Spotting Red Flags'}
                </button>
              </li>
            </ul>
          </div>

          {/* Data Controls (Privacy-First Feature) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isUr ? 'ڈیٹا اور پرائیویسی' : 'Data & Privacy'}
            </h4>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              {isUr ? 'آپ اپنے تمام پلان کو ڈاؤن لوڈ یا صاف کر سکتے ہیں:' : 'Download or reset your saved profile anytime:'}
            </p>

            <div className="space-y-2 pt-1">
              {currentUser ? (
                <div className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs flex items-center justify-between">
                  <div className="truncate mr-2">
                    <span className="text-[10px] text-blue-400 font-bold block">{isUr ? 'لاگ اِن اکاؤنٹ:' : 'Active Account:'}</span>
                    <span className="font-semibold text-slate-200 truncate block">{currentUser.email}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="px-2 py-1 text-[11px] font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-950/50 rounded shrink-0"
                  >
                    {isUr ? 'لاگ آؤٹ' : 'Sign Out'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthScreenOpen(true)}
                  className="w-full py-2 px-3 rounded-lg bg-blue-800 hover:bg-blue-700 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{isUr ? 'جی میل یا پاس ورڈ سے لاگ اِن کریں' : 'Log In / Sign Up with Gmail'}</span>
                </button>
              )}

              <button
                onClick={handleExportData}
                className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isUr ? 'میرا پلان ڈاؤن لوڈ کریں' : 'Export My Plan (JSON)'}</span>
              </button>

              {!resetConfirm ? (
                <button
                  onClick={() => setResetConfirm(true)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-950/40 border border-rose-900/40 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isUr ? 'ڈیٹا ری سیٹ کریں' : 'Reset All Data'}</span>
                </button>
              ) : (
                <div className="p-2 rounded-lg bg-rose-950 border border-rose-800 text-[11px] text-rose-200 space-y-1.5">
                  <span>{isUr ? 'کیا آپ واقعی تمام ریکارڈ ختم کرنا چاہتے ہیں؟' : 'Are you sure you want to clear your data?'}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        resetAllData();
                        setResetConfirm(false);
                      }}
                      className="px-2 py-1 bg-rose-600 text-white font-bold rounded"
                    >
                      Yes, Clear
                    </button>
                    <button
                      onClick={() => setResetConfirm(false)}
                      className="px-2 py-1 bg-slate-800 text-slate-300 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 pb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-b border-slate-800">
          <p className="text-center md:text-left leading-relaxed max-w-2xl">
            {isUr
              ? 'طبی انتباہ: فٹ لائف صرف معلوماتی اور طرزِ زندگی کی رہنمائی کے مقاصد کے لیے ہے۔ یہ کسی طبی معائنے، تشخیص یا علاج کا متبادل نہیں ہے۔ نئی ورزش یا غذا شروع کرنے سے قبل مستند ڈاکٹر سے مشورہ کریں۔'
              : 'Medical Disclaimer: FitLife is an educational lifestyle and fitness companion. It does not provide medical diagnosis or replace personalized consultation with a physician or registered dietitian.'}
          </p>

          <p className="shrink-0 text-slate-400">
            © {new Date().getFullYear()} FitLife. All rights reserved.
          </p>
        </div>

        {/* Still have questions & AI Assistant Box at the very end */}
        <div className="mt-10 p-8 rounded-3xl bg-slate-800 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl font-extrabold text-white mb-2">
              {isUr ? 'مزید سوالات ہیں؟' : 'Still have questions?'}
            </h3>
            <p className="text-slate-300 text-sm max-w-xl leading-relaxed">
              {isUr 
                ? 'اپنے ورزش، غذائیت یا پیش رفت کے بارے میں کبھی بھی ہمارے AI اسسٹنٹ سے پوچھیں۔ یہ آپ کو ٹریک پر رکھنے میں مدد کرے گا۔'
                : 'Still have questions about your workouts, nutrition, or progress? Ask our AI fitness assistant anytime. It’s here to help you stay on track.'}
            </p>
          </div>
          <button
            onClick={() => setIsAIChatModalOpen(true)}
            className="shrink-0 flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>{isUr ? 'اے آئی اسسٹنٹ سے پوچھیں' : 'Ask AI Assistant'}</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
