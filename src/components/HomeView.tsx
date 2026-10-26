import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  Utensils,
  Dumbbell,
  CheckCircle2,
  BookOpen,
  LayoutDashboard,
  ShieldAlert,
  Flame,
  Award,
  Users,
  Compass,
  DollarSign,
  Heart,
  Globe,
  Wifi,
  Clock,
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActiveTab, language, t, loadAhmedDemo, lowDataMode, setIsAIChatModalOpen } = useApp();

  const isUr = language === 'ur';

  const problems = [
    {
      title: isUr ? 'غیر واضح ڈائٹ پلان' : 'No proper diet plan',
      desc: isUr 
        ? 'لوگ نہیں جانتے کہ روزمرہ کے بجٹ میں متوازن کھانا کیسے بنائیں اور روزمرہ کے معمولات میں کیسے شامل کریں۔'
        : "People don't know what balanced meals to eat or how to plan meals around their daily routine.",
      icon: Utensils
    },
    {
      title: isUr ? 'ورزش کی الجھن' : 'Confusion about workouts',
      desc: isUr
        ? 'مبتدی نہیں جانتے کہ کون سی ورزش کریں، درست تکنیک کیا ہے، اور کتنی دیر ورزش کرنی چاہیے۔'
        : "Beginners don't know which exercises to perform, how to do them safely, or how often to train.",
      icon: Dumbbell
    },
    {
      title: isUr ? 'غیر مصدقہ انٹرنیٹ مشورے' : 'Unreliable online advice',
      desc: isUr
        ? 'سوشل میڈیا پر غیر حقیقت پسندانہ اور متضاد مشورے لوگوں کو الجھا دیتے ہیں۔'
        : 'Conflicting advice on social media promotes extreme fad diets and unsafe routines.',
      icon: HelpCircle
    },
    {
      title: isUr ? 'تسلسل کی کمی' : 'Lack of consistency',
      desc: isUr
        ? 'لوگ جوش میں شروع کرتے ہیں مگر سخت قواعد کی وجہ سے چند ہی دنوں میں ہمت ہار جاتے ہیں۔'
        : 'People start exercising but struggle to maintain a regular schedule without gentle tracking.',
      icon: Clock
    },
    {
      title: isUr ? 'مہنگی فیسیں اور رہنمائی' : 'Expensive guidance',
      desc: isUr
        ? 'ذاتی ٹرینر اور ماہرینِ غذائیت کی فیسیں عام افراد کے بجٹ سے باہر ہوتی ہیں۔'
        : 'Personal trainers and nutrition consultations are unaffordable for many families.',
      icon: DollarSign
    },
    {
      title: isUr ? 'بے ترتیب ریکارڈ' : 'No organized progress tracking',
      desc: isUr
        ? 'یہ معلوم نہیں ہو پاتا کہ طاقت، سٹیمنا یا عادات میں بہتری آ رہی ہے یا نہیں۔'
        : 'Difficult to see whether your strength, stamina, or everyday consistency is improving.',
      icon: TrendingUp
    }
  ];

  const features = [
    {
      id: 'workouts',
      tab: 'workouts',
      title: isUr ? 'گھریلو اور جِم ورزش کا شیڈول' : 'Manageable Workout Planner',
      subtitle: isUr ? 'گھر پر بغیر سامان کے آسان ورزشیں' : 'Home & Gym with Live Timer',
      desc: isUr
        ? 'مبتدی حضرات کے لیے کرسی کے سہارے اسکواٹس، وال پش اپس، محفوظ وقت اور وارم اپ و کول ڈاؤن ہدایات۔'
        : 'Select home or gym. Step-by-step beginner instructions, alternative movements, and rest days.',
      badge: isUr ? 'خصوصیت ۱' : 'Feature 1',
      icon: Dumbbell,
      color: 'from-blue-700 to-indigo-800'
    },
    {
      id: 'meals',
      tab: 'meals',
      title: isUr ? 'ذاتی میل پلانر (پاکستانی اور کم خرچ)' : 'Personalized Meal Planner',
      subtitle: isUr ? 'دالیں، روٹی، چنے اور کم بجٹ متوازن کھانے' : 'Budget-Friendly & Pakistani Cuisine',
      desc: isUr
        ? 'اپنی پسند، بجٹ اور الرجیز کا انتخاب کریں۔ آسان ترکیبیں اور ایک کلک پر سودا سلف (Grocery List) حاصل کریں۔'
        : 'Choose your food preferences, budget, and daily routine. Get balanced recipes and auto-generated shopping lists.',
      badge: isUr ? 'خصوصیت ۲' : 'Feature 2',
      icon: Utensils,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'habits',
      tab: 'progress',
      title: isUr ? 'صحت مند عادات کا ٹریکر' : 'Healthy Habit Tracker',
      subtitle: isUr ? 'پانی، نیند اور روزانہ حرکت' : 'Daily Movement & Hydration',
      desc: isUr
        ? 'انتہائی سختی کے بجائے مستقل مزاجی کو فروغ دیتا ہے۔ پانی کے گلاس، نیند کے گھنٹے اور واک ریکارڈ کریں۔'
        : 'Track movement, sleep routines, and hydration. Celebrates steady consistency over extreme routines.',
      badge: isUr ? 'خصوصیت ۳' : 'Feature 3',
      icon: Flame,
      color: 'from-blue-800 to-indigo-900'
    },
    {
      id: 'education',
      tab: 'education',
      title: isUr ? 'سائنس ایکسٹرا اور ثبوت پر مبنی رہنمائی' : 'Science Extra: Practical Guides',
      subtitle: isUr ? 'عام فہم زبان میں فٹنس کے اصول' : 'Bilingual Guides & Real Facts',
      desc: isUr
        ? 'نیند کی اہمیت، مسلز کیسے بنتے ہیں، اور یہ حقیقت کہ پاکستانی کھانا صحت بخش کیوں ہے۔'
        : 'Learn how strength builds, why Pakistani meals are nutritious, and spot misleading fitness advice.',
      badge: isUr ? 'خصوصیت ۴' : 'Feature 4',
      icon: BookOpen,
      color: 'from-purple-700 to-indigo-900'
    },
    {
      id: 'dashboard',
      tab: 'progress',
      title: isUr ? 'پیش رفت اور ویلنیس ڈیش بورڈ' : 'Progress & Wellness Dashboard',
      subtitle: isUr ? 'ویلنیس سکور اور موڈ جرنل' : 'Weekly Momentum & Energy Log',
      desc: isUr
        ? 'ہفتہ وار کیلنڈر، مکمل شدہ سیشنز اور توانائی کا جائزہ—بغیر ظاہری شکل پر تبصرہ کیے۔'
        : 'Review completed workouts, habits, momentum streaks, and an energy journal celebrating your effort.',
      badge: isUr ? 'خصوصیت ۵' : 'Feature 5',
      icon: LayoutDashboard,
      color: 'from-blue-900 to-slate-900'
    }
  ];

  const uniquePoints = [
    {
      title: isUr ? 'پاکستانی اور دیسی کھانوں کی ترجیح' : 'Authentic Pakistani Meal Options',
      desc: isUr
        ? 'دال تڑکا، گندم کی روٹی، چنے کا سالن، کچومر سلاد اور بھنے چنے—کوئی مہنگی نامانوس خوراک نہیں۔'
        : 'Includes familiar staples like daal, whole-wheat roti, chana, seasonal sabzi, and affordable produce.',
      icon: Utensils
    },
    {
      title: isUr ? 'کم خرچ اور بجٹ فرینڈلی ترکیبیں' : 'Budget-Friendly Grocery Focus',
      desc: isUr
        ? 'کم بجٹ میں بھرپور پروٹین اور غذائیت فراہم کرنے والی ترکیبیں جن پر فی میل خرچ واضح ہے۔'
        : 'Suggests high-nutrition meals that fit everyday household budgets with transparent per-meal cost estimates.',
      icon: DollarSign
    },
    {
      title: isUr ? 'گھریلو ورزش موڈ (زیرو سامان)' : 'Zero-Equipment Home Workout Mode',
      desc: isUr
        ? 'بغیر جِم فیس کے، گھر کے کمرے میں محفوظ طریقے سے جسمانی طاقت اور لچک بڑھائیں۔'
        : 'Helps anyone exercise comfortably in their living room with furniture-assisted beginner variations.',
      icon: Dumbbell
    },
    {
      title: isUr ? 'اردو اور آسان انگریزی (Bilingual)' : 'Simple English & Urdu Language',
      desc: isUr
        ? 'ہر ہدایت اور ترکیب اردو اور انگریزی دونوں میں دستیاب ہے تاکہ سب کے لیے آسانی ہو۔'
        : 'Toggle between clear English and Urdu so instructions are accessible to everyone.',
      icon: Globe
    },
    {
      title: isUr ? 'کم انٹرنیٹ ڈیٹا موڈ (Low-Data)' : 'Low-Data & Offline-Ready Mode',
      desc: isUr
        ? 'سست انٹرنیٹ کنکشن پر بھی تیز رفتاری سے کھلنے والا ہلکا پھلکا ڈیزائن۔'
        : 'Optimized clean layouts and minimized bandwidth for smooth performance on any connection.',
      icon: Wifi
    },
    {
      title: isUr ? 'لچکدار شیڈول اور پرائیویسی' : 'Flexible Scheduling & Privacy-First',
      desc: isUr
        ? 'اگر کسی دن سیشن چھوٹ جائے تو کوئی جرمانہ نہیں۔ آپ کا ڈیٹا آپ کی ڈیوائس پر محفوظ ہے۔'
        : 'Easily adapt missed sessions without guilt. All personal data is securely stored on your own device.',
      icon: ShieldAlert
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-6 p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>{isUr ? 'مکمل فٹنس اور صحت مند طرزِ زندگی' : 'Complete Fitness & Healthy Living Platform'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {isUr ? (
                <>آپ کی صحت، <span className="text-blue-400">آپ کا سفر۔</span></>
              ) : (
                <>Your Health, <span className="text-blue-400">Your Journey.</span></>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {isUr
                ? 'فٹ لائف آپ کے بجٹ اور روزمرہ کے مطابق دیسی متوازن کھانے، گھر پر بغیر کسی سامان کے ورزشیں اور عادات کی نگرانی ایک آسان جگہ پر فراہم کرتا ہے۔'
                : 'Create personalized meal plans with familiar Pakistani & budget staples, start beginner-friendly home workouts, and build steady habits without extreme diets or expensive gyms.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('plan-setup')}
                className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/30 flex items-center gap-2.5 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>{t('createMyPlan')}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={loadAhmedDemo}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-base transition-all flex items-center gap-2"
              >
                <Users className="w-5 h-5 text-amber-400" />
                <span>{isUr ? 'احمد کا لائیو نمونہ دیکھیں' : "Explore Ahmed's Story"}</span>
              </button>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-1.5 font-bold text-blue-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>{isUr ? '۵۰،۰۰۰+' : '50,000+'}</span>
              </div>
              <span className="text-slate-400">
                {isUr ? 'صارفین کی اعتماد سازی' : 'Individuals building healthier routines worldwide'}
              </span>
            </div>

          </div>

          {/* Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-slate-800/80 shadow-2xl p-4 sm:p-5">
              {!lowDataMode && (
                <div className="mb-4 rounded-xl overflow-hidden aspect-video relative group">
                  <img
                    src="/assets/aistudio/image_39f26ab9.png"
                    alt="Healthy balanced Pakistani meal prep containers"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-blue-200 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-500/30">
                      {isUr ? 'بجٹ فرینڈلی متوازن دیسی خوراک' : 'Real, Affordable Meal Prep'}
                    </span>
                  </div>
                </div>
              )}

              {/* Quick Feature Checklist inside Hero Card */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700/60 pb-2">
                  <span className="font-semibold text-slate-200">
                    {isUr ? 'شامل خصوصیات' : "What's Included in Your Plan"}
                  </span>
                  <span className="text-blue-400 font-bold">{isUr ? '۱۰۰٪ مفت' : '100% Free'}</span>
                </div>
                
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{isUr ? 'دال، چنا اور روٹی پر مبنی پروٹین چارٹس' : 'Daal, Chana & Roti macro-balanced meals'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{isUr ? 'گھر پر ۲۰ منٹ کی محفوظ مبتدی ورزشیں' : '20-min beginner home workouts with form tips'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{isUr ? 'خودکار خریداری فہرست (Shopping List)' : 'Instant smart grocery list generator'}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{isUr ? 'روزانہ پانی، نیند اور موڈ ٹریکر' : 'Habit streaks, energy journal & sleep logs'}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Slide 2: Real-Life Problem Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            {isUr ? 'مسئلہ اور حل' : 'The Challenge & The Solution'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            {isUr ? '۱. حقیقی زندگی میں ہمیں کیا مشکلات درپیش ہیں؟' : '1. What is the Real-Life Problem?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {isUr
              ? 'بہت سے لوگ اپنی صحت کو بہتر بنانا چاہتے ہیں لیکن متضاد مشوروں، مہنگی رہنمائی اور پیچیدگی کے باعث مایوس ہو جاتے ہیں۔'
              : 'Nowadays, many people genuinely want to improve their fitness and feel healthier, but face steep barriers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* The Main Problem Summary Callout */}
        <div className="mt-8 p-6 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <Compass className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base text-amber-900">
                {isUr ? 'بنیادی خلاصہ' : 'The Main Problem'}
              </h4>
              <p className="text-sm text-amber-800/90 mt-0.5">
                {isUr
                  ? 'لوگوں کو ایک ایسا قابل اعتماد اور آسان پلیٹ فارم چاہیے جہاں انہیں مناسب ورزش کی رہنمائی، متوازن دیسی کھانوں کے خیالات اور صحت مند عادات بنانے میں مدد ملے۔'
                  : 'People need one reliable, convenient place where they can get suitable exercise guidance, balanced meal ideas, and help building healthy habits.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('plan-setup')}
            className="shrink-0 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-xs transition-colors"
          >
            {isUr ? 'ابھی حل شروع کریں' : 'Start With FitLife'}
          </button>
        </div>
      </section>

      {/* Slide 3: How FitLife Solves This Problem (5 Core Features) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100/80 border border-blue-300 px-3 py-1 rounded-full">
              {isUr ? 'جامع نظام' : 'Integrated Ecosystem'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              {isUr ? '۲. فٹ لائف اس مسئلے کو کیسے حل کرتا ہے؟' : '2. How Will FitLife Solve This Problem?'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              {isUr
                ? 'فٹ لائف ان تمام ضروری خدمات کو ایک جگہ اکٹھا کرتا ہے۔ آپ اپنی ترجیحات بتائیں، اور حقیقت پسندانہ پلان حاصل کریں۔'
                : 'FitLife brings these services together in one website. Enter your preferences and goals, and receive suitable resources and a realistic plan.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveTab(f.tab)}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${f.color} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {f.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {f.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-700 mb-3">
                      {f.subtitle}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {f.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-800 group">
                    <span>{isUr ? 'صفحہ دیکھیں' : 'Open Feature'}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}

            {/* Ahmed Real-Life Showcase Card as 6th Card */}
            <div
              onClick={loadAhmedDemo}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-amber-300 shadow-xs hover:shadow-lg hover:border-amber-400 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md">
                    <Users className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    {isUr ? 'کامیاب کہانی' : 'Real-Life Story'}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {isUr ? 'احمد کا ۷ روزہ سفر' : "Ahmed's 7-Day Journey"}
                </h3>
                <p className="text-xs font-semibold text-amber-700 mb-3">
                  {isUr ? 'مبتدی کے لیے عملی مثال' : 'Step-by-step beginner walkthrough'}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {isUr
                    ? 'دیکھیں کہ احمد نے کس طرح بغیر جم ممبرشپ کے دال، چاول اور گھر پر ۲۰ منٹ کی واک سے اپنی عادت بنائی۔'
                    : 'See how user Ahmed chose home workouts, affordable food, followed the schedule, and reviewed consistency without feeling overwhelmed.'}
                </p>
              </div>

              <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
                <span>{isUr ? 'مکمل واقعہ پڑھیں' : 'Read Full Walkthrough'}</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* Slide 8 / 11: What Makes FitLife Different (The USP Matrix) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
            {isUr ? 'ہماری انفرادی خصوصیات' : 'Why FitLife Stands Out'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            {isUr ? 'فٹ لائف دیگر ایپس سے مختلف کیوں ہے؟' : 'What Makes FitLife Different From Other Apps?'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {isUr
              ? 'ہم نے عام لوگوں کی حقیقی ضروریات کو مدنظر رکھ کر یہ پلیٹ فارم بنایا ہے۔'
              : 'Our strongest focus is: Affordable Pakistani meal planning + beginner home workouts + a personalized habit tracker.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniquePoints.map((u, idx) => {
            const Icon = u.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {u.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {u.desc}
                </p>
              </div>
            );
          })}
        </div>

      </section>

      {/* Safety & Medical Disclaimers Section (As strictly instructed in Slide 4, 6 & 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-6 sm:p-8 bg-slate-900 text-slate-200 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isUr ? 'حفاظتی رہنمائی اور طبی اصول' : 'Safety Guidance & Healthy Development First'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {isUr
                  ? 'فٹ لائف کسی ایک سخت ڈائٹ کا وعدہ نہیں کرتا۔ نوجوان صارفین کے لیے ہم سخت فاقہ کشی کے بجائے صحت مند نشوونما، مناسب غذائیت اور خوشگوار ورزش کو ترجیح دیتے ہیں۔ طبی عوارض یا الرجیز کی صورت میں معالج سے مشورہ لیں۔'
                  : 'FitLife never promises that one diet fits everyone. For young and developing individuals, we strictly prioritize adequate nutrition and enjoyable movement over restrictive dieting or rapid weight-loss targets.'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('education')}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold border border-slate-700 transition-colors"
          >
            {isUr ? 'مکمل رہنمائی پڑھیں' : 'Read Health Guidelines'}
          </button>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="text-center max-w-3xl mx-auto px-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          {isUr ? 'آج ہی اپنے صحت کے سفر کا آغاز کریں' : 'Ready to start your realistic fitness journey?'}
        </h3>
        <p className="text-slate-600 text-sm sm:text-base mt-2 mb-6">
          {isUr
            ? 'صرف ۲ منٹ کا سوالنامہ پُر کریں اور اپنے لیے مخصوص ورزش اور کھانوں کا پلان حاصل کریں۔'
            : 'Answer 5 simple questions to get your tailored Pakistani meal plan, home workout schedule, and habit tracker.'}
        </p>
        <button
          onClick={() => setActiveTab('plan-setup')}
          className="px-8 py-4 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-base shadow-lg shadow-blue-900/30 inline-flex items-center gap-2.5 transition-all hover:scale-105"
        >
          <Sparkles className="w-5 h-5" />
          <span>{t('createMyPlan')}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

    </div>
  );
};
