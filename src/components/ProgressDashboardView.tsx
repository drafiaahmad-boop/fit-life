import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  Droplets,
  Moon,
  Utensils,
  Footprints,
  Heart,
  Smile,
  Sparkles,
  Plus,
  Minus,
  PenSquare,
  History,
  ShieldCheck,
  Star,
  Dumbbell
} from 'lucide-react';
import { DailyLog } from '../types';

export const ProgressDashboardView: React.FC = () => {
  const {
    habits,
    toggleHabit,
    incrementWater,
    decrementWater,
    completedWorkoutIds,
    workoutSessions,
    todayLog,
    saveJournalEntry,
    dailyLogs,
    language,
    userProfile
  } = useApp();

  const isUr = language === 'ur';

  // Journal form state
  const [energyRating, setEnergyRating] = useState<number>(todayLog.energyLevel || 4);
  const [mood, setMood] = useState<DailyLog['mood']>(todayLog.mood || 'good');
  const [journalNote, setJournalNote] = useState<string>(todayLog.journalNote || '');
  const [savedJournalSuccess, setSavedJournalSuccess] = useState<boolean>(false);
  const [workoutOnRestReason, setWorkoutOnRestReason] = useState<string>('');
  const [workoutButtonOn, setWorkoutButtonOn] = useState<boolean>(false);
  const [skipReason, setSkipReason] = useState<string>('');

  // Determine if tomorrow is a rest day
  const todayDayOfWeek = new Date().getDay();
  const dayNumMap: Record<number, number> = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 0: 7 };
  const currentDayNum = dayNumMap[todayDayOfWeek] || 1;
  const todaySession = workoutSessions.find(s => s.dayNumber === currentDayNum) || workoutSessions[0];
  const isTodayRest = todaySession.isRestDay;
  const tomorrowDayNum = currentDayNum === 7 ? 1 : currentDayNum + 1;
  const tomorrowSession = workoutSessions.find(s => s.dayNumber === tomorrowDayNum) || workoutSessions[0];
  const isNextDayRest = tomorrowSession.isRestDay;

  const [bufferButtonOn, setBufferButtonOn] = useState<boolean>(!isNextDayRest);

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    saveJournalEntry(energyRating, mood, journalNote);
    setSavedJournalSuccess(true);
    setTimeout(() => setSavedJournalSuccess(false), 2000);
  };

  // Metrics calculation
  const completedHabitsCount = habits.filter(h => h.completed).length;
  const habitsPercentage = Math.round((completedHabitsCount / habits.length) * 100);
  const completedWorkoutsCount = completedWorkoutIds.length;
  const activeMinutesTotal = completedWorkoutsCount * (userProfile.timePerDayMinutes || 25);
  const wellnessScore = Math.min(100, Math.round(55 + (completedHabitsCount * 6) + (completedWorkoutsCount * 6)));

  const waterHabit = habits.find(h => h.category === 'water');

  const activityDays = [
    { day: 'Mon', ur: 'پیر', mins: 25, active: true },
    { day: 'Tue', ur: 'منگل', mins: 20, active: true },
    { day: 'Wed', ur: 'بدھ', mins: 25, active: true },
    { day: 'Thu', ur: 'جمعرات', mins: 0, active: false, rest: true },
    { day: 'Fri', ur: 'جمعہ', mins: 25, active: true },
    { day: 'Sat', ur: 'ہفتہ', mins: 20, active: false },
    { day: 'Sun', ur: 'اتوار', mins: 0, active: false, rest: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">
            {isUr ? 'پیش رفت ڈیش بورڈ — صفحہ 5' : 'Page 5 — Progress & Wellness Dashboard'}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {isUr ? `خوش آمدید، ${userProfile.name}!` : `Welcome back, ${userProfile.name}!`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {isUr
              ? 'آپ کی مستقل مزاجی آپ کی کامیابی ہے۔ ظاہری شکل پر تبصرے کے بغیر، آپ کی محنت کو سراہا جاتا ہے۔'
              : 'Tracking habits and stamina over time. Celebrating your consistency without judging appearance.'}
          </p>
        </div>

        {/* Date Badge */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-bold text-slate-700 self-start sm:self-auto">
          <Calendar className="w-4 h-4 text-blue-700" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      {/* Custom Setup Notes Highlights (if user entered any in Plan Setup) */}
      {(userProfile.goalNotes || userProfile.foodNotes || userProfile.locationNotes || userProfile.levelNotes || userProfile.timeNotes || userProfile.budgetNotes || userProfile.dietaryNotes) && (
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-1.5 text-blue-900">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>{isUr ? 'آپ کے درج کردہ ذاتی نوٹس اور ترجیحات:' : 'Your Custom Notes & Stored Setup Preferences:'}</span>
            </span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {userProfile.goalNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'ہدف:' : 'Goal Note:'}</strong> {userProfile.goalNotes}
              </span>
            )}
            {userProfile.locationNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'سامان/جگہ:' : 'Equipment/Space:'}</strong> {userProfile.locationNotes}
              </span>
            )}
            {userProfile.levelNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'حساسیت:' : 'Sensitivity/Level:'}</strong> {userProfile.levelNotes}
              </span>
            )}
            {userProfile.foodNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'پسندیدہ کھانے:' : 'Food Wish:'}</strong> {userProfile.foodNotes}
              </span>
            )}
            {userProfile.budgetNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'بجٹ تفصیل:' : 'Budget Detail:'}</strong> {userProfile.budgetNotes}
              </span>
            )}
            {userProfile.timeNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'شیڈول:' : 'Routine:'}</strong> {userProfile.timeNotes}
              </span>
            )}
            {userProfile.dietaryNotes && (
              <span className="px-2.5 py-1 rounded-lg bg-white border border-blue-200 shadow-2xs">
                <strong className="text-blue-900">{isUr ? 'پرہیز:' : 'Dietary Note:'}</strong> {userProfile.dietaryNotes}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Top Metrics Row: Wellness Score + 7-Day Progress + Weekly Momentum (As shown in Slide 8) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Wellness Score */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md border border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              {isUr ? 'ویلنیس سکور' : 'Wellness Score'}
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              +14% vs last week
            </span>
          </div>

          <div className="flex items-center gap-5 my-6">
            <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-slate-800 border-4 border-blue-600 shadow-inner">
              <div className="text-center">
                <span className="text-3xl font-extrabold text-white">{wellnessScore}</span>
                <span className="text-[10px] text-slate-400 block -mt-1">/100</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-blue-300">
                {isUr ? 'شاندار پیش رفت!' : 'Great Momentum!'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {isUr
                  ? 'آپ نے اس ہفتے پانی اور چہل قدمی کے اہداف عمدگی سے حاصل کیے۔'
                  : 'You hit 4 out of 5 daily habits on target today.'}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>{isUr ? 'مستقل مزاجی اور توانائی پر مرکوز' : 'Focuses on sustainable vitality & consistency'}</span>
          </div>
        </div>

        {/* Card 2: 7-Day Progress Breakdown */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900">
              {isUr ? '7 روزہ پیش رفت کا خلاصہ' : '7-Day Progress'}
            </h3>
            <span className="text-xs text-slate-400 font-semibold">Weekly Target</span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Habits progress */}
            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-600">{isUr ? 'عادات کی تکمیل' : 'Habits Completed'}</span>
                <span className="text-slate-900 font-bold">28 / 35</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            {/* Nutrition */}
            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-600">{isUr ? 'متوازن دیسی خوراک' : 'Balanced Meals'}</span>
                <span className="text-slate-900 font-bold">6 / 7 days</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Active Minutes */}
            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-600">{isUr ? 'ورزش کے منٹ' : 'Active Minutes'}</span>
                <span className="text-slate-900 font-bold">{activeMinutesTotal} / 150 min</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (activeMinutesTotal / 150) * 100)}%` }} />
              </div>
            </div>

            {/* Hydration */}
            <div>
              <div className="flex justify-between mb-1 font-semibold">
                <span className="text-slate-600">{isUr ? 'پانی کا ہدف' : 'Hydration Consistency'}</span>
                <span className="text-slate-900 font-bold">5 / 7 days</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>
          </div>

          <span className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 block">
            {isUr ? 'ہفتہ وار ہدف: 150 منٹ ہلکی ورزش' : 'Target: 150 min moderate activity/week'}
          </span>
        </div>

        {/* Card 3: Weekly Momentum */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-slate-900">
              {isUr ? 'ہفتہ وار تسلسل (Momentum)' : 'Weekly Momentum'}
            </h3>
            <Flame className="w-5 h-5 text-amber-500" />
          </div>

          <div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-slate-900">5</span>
              <span className="text-sm font-semibold text-slate-500">{isUr ? 'از 7 ایام' : 'of 7 days'}</span>
            </div>
            <p className="text-xs text-slate-600 mb-6">
              {isUr
                ? 'آپ نے اس ہفتے 5 دنوں میں اپنے کم از کم 4 عادات کے اہداف مکمل کیے۔'
                : 'You completed at least 4 of 5 habits on 5 days this week. Excellent consistency!'}
            </p>

            {/* Days indicator dots */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
                const active = i < 5;
                return (
                  <div key={i} className="space-y-1">
                    <div className={`h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                      active ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {active ? '✓' : ''}
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold">{d}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-blue-800 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUr ? '5 دن کا اسٹریک جاری ہے!' : '5-day active habit streak!'}</span>
          </div>
        </div>

      </div>

      {/* Slide 8 Example Highlight Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Award className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-sm text-blue-950">
              {isUr ? 'تسلسل کا جشن — بغیر کسی ظاہری تبصرے کے' : 'Celebrating Real Consistency'}
            </h4>
            <p className="text-xs sm:text-sm text-blue-900 mt-0.5">
              {isUr
                ? 'مثال: آپ نے گزشتہ ہفتے کے 1 سیشن کے مقابلے میں اس ہفتے 3 سیشن مکمل کیے۔ یہ پیش رفت آپ کے مستقل مزاج ہونے کا ثبوت ہے۔'
                : 'You completed three activity sessions this week compared with one the previous week! This celebrates your consistency without judging your physical appearance.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly Habit Completion Checklist + Activity Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Habit Completion (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isUr ? 'آج کی صحت مند عادات' : 'Daily Habits Checklist'}
              </h2>
              <p className="text-xs text-slate-500">
                {isUr ? 'نشان لگا کر اپنی روزمرہ کی عادات مکمل کریں' : 'Tap to toggle daily healthy micro-actions'}
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-900">
              {completedHabitsCount} / {habits.length} {isUr ? 'مکمل' : 'Done'}
            </span>
          </div>

          {/* Quick Water Tracker Card */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-blue-950">
                  {isUr ? 'پانی کا ہدف (2.5 لیٹر)' : 'Daily Hydration (2.5L Water)'}
                </h4>
                <p className="text-xs text-blue-800/80">
                  {waterHabit?.current || 5} / {waterHabit?.target || 8} {isUr ? 'گلاس پی لیے' : 'glasses logged'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={decrementWater}
                className="w-8 h-8 rounded-lg bg-white border border-blue-200 text-blue-800 font-bold hover:bg-blue-100 flex items-center justify-center transition-colors"
                title="Decrease 1 glass"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={incrementWater}
                className="w-8 h-8 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 flex items-center justify-center shadow-xs transition-colors"
                title="Add 1 glass"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Other Habits List */}
          <div className="space-y-3">
            {habits.map((habit) => {
              const iconsMap: Record<string, any> = {
                Flame: Flame,
                Moon: Moon,
                Utensils: Utensils,
                Footprints: Footprints,
                Droplets: Droplets
              };
              const IconComp = iconsMap[habit.icon] || Heart;

              return (
                <div
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between cursor-pointer transition-all ${
                    habit.completed
                      ? 'bg-blue-50/70 border-blue-300 text-blue-950'
                      : 'bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      habit.completed ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className={`font-bold block ${habit.completed ? 'line-through text-blue-900' : ''}`}>
                        {isUr ? habit.urduTitle : habit.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {habit.target} {habit.unit}
                      </span>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center ${
                    habit.completed
                      ? 'border-blue-800 bg-blue-800 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {habit.completed && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Weekly Activity Bar Chart & Completed Workouts (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Activity Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {isUr ? 'ہفتہ وار سرگرمی کا چارٹ' : 'Weekly Activity Minutes'}
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                {activeMinutesTotal} mins total
              </span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="pt-4">
              <div className="h-40 flex items-end justify-between gap-2 border-b border-slate-100 pb-2">
                {activityDays.map((d, idx) => {
                  const maxMins = 30;
                  const heightPercent = Math.max(10, (d.mins / maxMins) * 100);

                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[10px] font-bold text-slate-600">
                        {d.mins > 0 ? `${d.mins}m` : '-'}
                      </span>
                      <div
                        style={{ height: d.mins > 0 ? `${heightPercent}%` : '8%' }}
                        className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                          d.mins > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-slate-200'
                        }`}
                      />
                      <span className="text-[11px] font-bold text-slate-500">
                        {isUr ? d.ur : d.day}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
              <span>Goal: 20-25m / session</span>
              <span className="font-bold text-blue-700">On Track ✓</span>
            </div>
          </div>



          {/* Flexible Rest Day / Missed Workout Option Card (Only visible on workout days) */}
          {!isTodayRest && (
            <div className="bg-blue-50/80 rounded-3xl p-6 border border-blue-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                  <span>{isUr ? 'ورزش چھوٹ گئی؟ لچکدار ریسٹ ڈے' : 'Missed a Workout? Flexible Rest Day'}</span>
                </h3>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                {isUr
                  ? 'اگر آپ آج ورزش نہ کر سکیں تو فٹ لائف آپ کو بغیر جرمانے کے ایک آرام دہ "ریسٹ ڈے یا ریکوری بفر" دیتا ہے۔ اب وجہ درج کریں اور شیڈول جاری رکھیں۔'
                  : 'If you are not able to workout today, FitLife gives you a guilt-free Rest Day / Make-up buffer option to keep your momentum steady. Now give a reason and start workout'}
              </p>

              {/* Purpose / Reason for skipping workout */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-blue-950">
                  {isUr ? 'ورزش چھوڑنے کی وجہ / مقصد:' : 'Purpose / Reason for skipping workout:'}
                </label>
                <textarea
                  rows={2}
                  value={skipReason}
                  onChange={(e) => setSkipReason(e.target.value)}
                  placeholder={isUr ? 'یہاں وجہ لکھیں کہ آج ورزش کیوں چھوٹی...' : 'Write the purpose of why you want to skip workout...'}
                  className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setBufferButtonOn(prev => !prev);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors ${
                    bufferButtonOn
                      ? 'bg-slate-600 hover:bg-slate-700 text-white'
                      : 'bg-blue-800 hover:bg-blue-900 text-white'
                  }`}
                >
                  {bufferButtonOn ? (isUr ? 'آج آرام کا دن ہے' : 'Today is a Rest Day') : (isUr ? 'آرام کا دن کلیم کریں' : 'Claim Rest')}
                </button>
              </div>
            </div>
          )}

          {/* Rest Day Workout Override Card (Only visible on rest days) */}
          {isTodayRest && (
            <div className="bg-blue-50/80 rounded-3xl p-6 border border-blue-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-blue-700" />
                  <span>{isUr ? 'آرام کا دن ہے مگر ورزش کرنا چاہتے ہیں؟' : "Today's a Rest Day? Want to Workout?"}</span>
                </h3>
              </div>
              <p className="text-xs text-blue-900 leading-relaxed">
                {isUr
                  ? 'اگر آج آرام کا دن ہے لیکن آپ میں توانائی ہے اور آپ ورزش کرنا چاہتے ہیں، تو یہاں مقصد لکھ کر ایکٹو سیشن شروع کریں۔'
                  : 'If today is a scheduled rest day but you have extra energy and want to do an active session anyway, write your purpose below and start your workout.'}
              </p>

              {/* Purpose / Reason for wanting to workout on rest day */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-blue-950">
                  {isUr ? 'آرام کے دن ورزش کرنے کا مقصد:' : 'Purpose / Reason for working out today:'}
                </label>
                <textarea
                  rows={2}
                  value={workoutOnRestReason}
                  onChange={(e) => setWorkoutOnRestReason(e.target.value)}
                  placeholder={isUr ? 'یہاں وجہ لکھیں کہ آج آرام کے دن کیوں ورزش کرنا چاہتے ہیں...' : 'Write the purpose of why you want to workout on a rest day...'}
                  className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setWorkoutButtonOn(prev => !prev);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors ${
                    workoutButtonOn
                      ? 'bg-slate-600 hover:bg-slate-700 text-white'
                      : 'bg-blue-800 hover:bg-blue-900 text-white'
                  }`}
                >
                  {workoutButtonOn ? (isUr ? 'آج ورزش کا دن ہے' : 'Today is a Workout Day') : (isUr ? 'آرام کے دن ورزش کریں' : 'Workout on Rest Day')}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Energy & Activity Reflection Journal (Slide 8 Requirement) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <PenSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {isUr ? 'توانائی اور احساس کا روزنامچہ (Journal)' : 'Energy Levels & Activity Journal'}
            </h3>
            <p className="text-xs text-slate-500">
              {isUr
                ? 'ریکارڈ کریں کہ آج ورزش اور کھانوں کے بعد آپ کیسا محسوس کر رہے ہیں۔'
                : 'Log how activities feel, fatigue vs vitality, and note your body sensations.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSaveJournal} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Energy Rating (1-5 stars) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isUr ? 'آج توانائی کی سطح (1 سے 5)' : "Today's Energy Rating"}
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setEnergyRating(star)}
                    className="p-1.5 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 transition-transform hover:scale-110 ${
                        star <= energyRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-bold text-slate-600 ml-2">
                  {energyRating}/5
                </span>
              </div>
            </div>

            {/* Mood selector */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isUr ? 'طبیعت / موڈ' : 'Overall Mood & Feeling'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'energized', label: isUr ? 'توانا (Energized)' : 'Energized' },
                  { id: 'good', label: isUr ? 'عمدہ (Good)' : 'Good' },
                  { id: 'tired', label: isUr ? 'تھکن (Tired)' : 'Tired' },
                  { id: 'recovering', label: isUr ? 'بحال ہو رہا ہے' : 'Recovering' }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      mood === m.id
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Notes textarea */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              {isUr ? 'ذاتی تاثرات (ورزش کے بعد کیسا لگا؟)' : 'Personal Notes: How did your movement or meals feel?'}
            </label>
            <textarea
              rows={3}
              value={journalNote}
              onChange={(e) => setJournalNote(e.target.value)}
              placeholder={isUr ? 'جیسے: دال چاول کے بعد دن بھر چستی رہی، واک سے کمر کی سختی دور ہوئی۔' : 'e.g. Light walk helped relieve desk stiffness. Daal and salad lunch gave steady energy without mid-day crash.'}
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              {savedJournalSuccess && (isUr ? '✓ روزنامچہ محفوظ ہو گیا!' : '✓ Reflection saved to your device!')}
            </span>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              {isUr ? 'تاثرات محفوظ کریں' : 'Save Today\'s Entry'}
            </button>
          </div>

        </form>

        {/* Previous logs history */}
        {dailyLogs.length > 0 && (
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              {isUr ? 'گزشتہ تاثرات' : 'Recent Journal Entries'}
            </span>
            <div className="space-y-2">
              {dailyLogs.slice(0, 3).map((log, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{log.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-semibold capitalize text-[10px]">
                      {log.mood}
                    </span>
                    <span className="text-amber-500 font-bold">★ {log.energyLevel}/5</span>
                  </div>
                  <p className="text-slate-600 italic truncate max-w-md">
                    "{log.journalNote || 'Active day logged'}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
