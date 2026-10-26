import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  EDUCATION_ARTICLES
} from '../data/mockData';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Moon,
  Zap,
  Utensils,
  Droplets,
  ShieldCheck,
  Volume2
} from 'lucide-react';

export const EducationView: React.FC = () => {
  const { language } = useApp();
  const isUr = language === 'ur';

  const [activeSection, setActiveSection] = useState<'guides' | 'redflags'>('guides');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>('art-1');
  const [speakingArticleId, setSpeakingArticleId] = useState<string | null>(null);
  const [speakingRedFlagIndex, setSpeakingRedFlagIndex] = useState<number | null>(null);

  // Stop speech when component unmounts or section changes
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingArticleId(null);
      setSpeakingRedFlagIndex(null);
    }
  }, [activeSection]);

  const toggleAiVoice = (article: (typeof EDUCATION_ARTICLES)[0]) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    // If currently speaking this article, toggle OFF
    if (speakingArticleId === article.id) {
      window.speechSynthesis.cancel();
      setSpeakingArticleId(null);
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const title = isUr ? article.urduTitle : article.title;
    const summary = isUr ? article.urduSummary : article.summary;
    const keyPoints = article.keyPoints.join(isUr ? '۔ ' : '. ');
    const takeaway = article.practicalTakeaway;

    const narrationText = isUr
      ? `${title}۔ ${summary}۔ اہم نکات: ${keyPoints}۔ عملی تجویز: ${takeaway}`
      : `${title}. ${summary}. Key Takeaways: ${keyPoints}. Action Item: ${takeaway}`;

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (isUr) {
      const urduVoice = voices.find((v) => v.lang.toLowerCase().includes('ur'));
      if (urduVoice) {
        utterance.voice = urduVoice;
        utterance.lang = urduVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
    } else {
      const enVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Neural') ||
            v.name.includes('Google') ||
            v.name.includes('Premium'))
      );
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.lang = 'en-US';
    }

    utterance.onend = () => {
      setSpeakingArticleId(null);
    };

    utterance.onerror = () => {
      setSpeakingArticleId(null);
    };

    setSpeakingArticleId(article.id);
    window.speechSynthesis.speak(utterance);
  };

  const toggleRedFlagVoice = (index: number, flag: (typeof redFlags)[0]) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    if (speakingRedFlagIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingRedFlagIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    setSpeakingArticleId(null);

    const narrationText = `${flag.title}. ${flag.desc}`;

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (isUr) {
      const urduVoice = voices.find((v) => v.lang.toLowerCase().includes('ur'));
      if (urduVoice) {
        utterance.voice = urduVoice;
        utterance.lang = urduVoice.lang;
      } else {
        utterance.lang = 'en-US';
      }
    } else {
      const enVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Neural') ||
            v.name.includes('Google') ||
            v.name.includes('Premium'))
      );
      if (enVoice) {
        utterance.voice = enVoice;
      }
      utterance.lang = 'en-US';
    }

    utterance.onend = () => {
      setSpeakingRedFlagIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingRedFlagIndex(null);
    };

    setSpeakingRedFlagIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const iconsMap: Record<string, any> = {
    Moon,
    Zap,
    Utensils,
    Droplets
  };

  const redFlags = [
    {
      title: isUr ? '7 دن میں 10 کلو وزن کم کرنے کا دعویٰ' : '"Lose 10kg in 7 Days" Fast Fixes',
      desc: isUr
        ? 'انسانی جسم اتنی تیزی سے صرف پانی اور مسلز کھو سکتا ہے، چربی نہیں۔ ایسا وزن فوری واپس آ جاتا ہے۔'
        : 'Biologically impossible without shedding vital muscle tissue and dehydrating organs. Rapid rebound is guaranteed.',
      danger: 'High'
    },
    {
      title: isUr ? 'جادوئی ڈیٹاکس چائے یا مشروبات' : '"Magic Detox Teas" or Fat-Melting Tonics',
      desc: isUr
        ? 'آپ کا جگر (Liver) اور گردے (Kidneys) پہلے ہی قدرتی طور پر جسم کو صاف کرتے ہیں۔ کسی مشروب کی ضرورت نہیں۔'
        : 'Your liver and kidneys perform 100% of natural detoxification. Detox teas are mostly laxatives and diuretics.',
      danger: 'High'
    },
    {
      title: isUr ? 'پورے کھانے کے گروپ پر پابندی (جیسے روٹی بند)' : 'Banning Entire Natural Food Groups',
      desc: isUr
        ? 'گندم، چاول یا پھلوں کو مکمل طور پر زہر قرار دینا غیر سائنسی ہے۔ اصل چیز مقدار اور اعتدال ہے۔'
        : 'Demonizing wholesome carbs or fruits is unsustainable. Long-term health comes from portion control, not fear.',
      danger: 'Moderate'
    },
    {
      title: isUr ? 'مہنگے سپلیمنٹس کے بغیر ناممکن ہونے کا دعویٰ' : 'Claiming Results are Impossible Without Supplements',
      desc: isUr
        ? 'انڈے، دالیں، چنے، دہی اور گھریلو خوراک آپ کی ضرورت پوری کرنے کے لیے کافی ہیں۔'
        : 'Real food pantry staples provide far superior micronutrients and satiety compared to processed powders.',
      danger: 'Moderate'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isUr ? 'سائنس ایکسٹرا — فٹنس گائیڈز' : 'Science Extra — Fitness Knowledge'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {isUr ? 'سائنسی حقائق اور عملی رہنمائی' : 'Science Extra: Practical Health & Evidence'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isUr
              ? 'یہ جانیں کہ کوئی تجویز کیوں مفید ہے، بجائے اس کے کہ اندھا دھند تقلید کی جائے۔ نیند، طاقت، پانی اور دیسی خوراک کی اصل سائنسی سچائی۔'
              : 'Understand WHY recommendations work instead of blindly following rules. Master sleep biology, gradual strength development, and spot misleading fitness advice.'}
          </p>

          {/* Section Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setActiveSection('guides')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeSection === 'guides'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{isUr ? 'بنیادی سائنسی گائیڈز' : 'Science Guides'}</span>
            </button>

            <button
              onClick={() => setActiveSection('redflags')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeSection === 'redflags'
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-blue-300" />
              <span>{isUr ? 'گمراہ کن دعووں کی پہچان' : 'Spotting Unreliable Claims'}</span>
            </button>
          </div>
        </div>
      </div>



      {/* 2. SCIENCE GUIDES SECTION */}
      {activeSection === 'guides' && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isUr ? 'فٹنس کے بنیادی سائنسی تصورات' : 'Simple-Language Science Guides'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isUr
                ? 'مشکل اصطلاحات کے بغیر، جانیں کہ جسم کس طرح بہتر کارکردگی دکھاتا ہے۔'
                : 'Understand sleep, strength adaptation, hydration, and nutrition balance.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EDUCATION_ARTICLES.map((article) => {
              const IconComp = iconsMap[article.icon] || BookOpen;
              const isExp = expandedArticleId === article.id;

              return (
                <div
                  key={article.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleAiVoice(article)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          speakingArticleId === article.id
                            ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                            : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                        }`}
                        title={
                          speakingArticleId === article.id
                            ? (isUr ? 'اے آئی وائس بند کریں' : 'Turn Off AI Voice')
                            : (isUr ? 'اے آئی وائس چلائیں' : 'Turn On AI Voice')
                        }
                        aria-label={
                          speakingArticleId === article.id
                            ? (isUr ? 'اے آئی وائس بند کریں' : 'Turn Off AI Voice')
                            : (isUr ? 'اے آئی وائس چلائیں' : 'Turn On AI Voice')
                        }
                      >
                        {speakingArticleId === article.id ? (
                          <>
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isUr ? 'اے آئی وائس: آن' : 'AI Voice: ON'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                            <span>{isUr ? 'اے آئی وائس: آف' : 'AI Voice: OFF'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {isUr ? article.urduTitle : article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {isUr ? article.urduSummary : article.summary}
                    </p>

                    {/* Key points bulleted */}
                    <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-700">
                      <span className="font-bold uppercase tracking-wider text-slate-500 block text-[10px]">
                        {isUr ? 'اہم نکات:' : 'Key Takeaways:'}
                      </span>
                      {article.keyPoints.map((kp, i) => (
                        <p key={i} className="flex items-start gap-2">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{kp}</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">{isUr ? 'عملی عمل: ' : 'Action Item: '}</span>
                      <span>{article.practicalTakeaway}</span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. RED FLAGS / SPOTTING UNRELIABLE CLAIMS SECTION */}
      {activeSection === 'redflags' && (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {isUr ? 'سوشل میڈیا کے گمراہ کن دعووں کی پہچان' : 'How to Spot Unreliable Fitness Advice on Social Media'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isUr
                ? 'جب بھی انٹرنیٹ پر یہ خطرے کی گھنٹیاں نظر آئیں، ان سے ہوشیار رہیں۔'
                : 'Protect your health and wallet by identifying these red flags instantly.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {redFlags.map((flag, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Red Flag #{idx + 1}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleRedFlagVoice(idx, flag)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      speakingRedFlagIndex === idx
                        ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-300'
                        : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                    }`}
                    title={
                      speakingRedFlagIndex === idx
                        ? (isUr ? 'اے آئی وائس بند کریں' : 'Turn Off AI Voice')
                        : (isUr ? 'اے آئی وائس چلائیں' : 'Turn On AI Voice')
                    }
                    aria-label={
                      speakingRedFlagIndex === idx
                        ? (isUr ? 'اے آئی وائس بند کریں' : 'Turn Off AI Voice')
                        : (isUr ? 'اے آئی وائس چلائیں' : 'Turn On AI Voice')
                    }
                  >
                    {speakingRedFlagIndex === idx ? (
                      <>
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isUr ? 'آن' : 'ON'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-purple-600" />
                        <span>{isUr ? 'آف' : 'OFF'}</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {flag.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {flag.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Golden Rule Summary */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-bold text-base text-blue-400">
                {isUr ? 'سنہری اصول' : 'FitLife Golden Rule'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                {isUr
                  ? 'اگر کوئی روٹین آپ کو ساری زندگی جاری رکھنے میں ناممکن لگے، تو وہ شروع کرنے کے قابل بھی نہیں ہے۔ پائیدار صحت چھوٹے، روزمرہ کے فیصلوں کا نام ہے۔'
                  : 'If a routine or diet is not something you could comfortably maintain for the next 2 years, it is not worth doing for 2 weeks. Real wellness is built on sustainable, small daily habits.'}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
