import React from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, User, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AhmedStoryModal: React.FC = () => {
  const { isAhmedModalOpen, setIsAhmedModalOpen, language, setActiveTab } = useApp();

  if (!isAhmedModalOpen) return null;

  const steps = [
    {
      num: '1',
      title: language === 'ur' ? 'پہلا مرحلہ — احمد نے فٹ لائف کا آغاز کیا' : 'Step 1 — Ahmed visits FitLife',
      desc: language === 'ur' 
        ? 'اس نے "Create My Plan" پر کلک کیا اور عمومی صحت اور چستی کو اپنا بنیادی مقصد منتخب کیا۔'
        : 'He opens FitLife and selects "Create My Plan". He chooses improving general fitness and stamina as his main goal.'
    },
    {
      num: '2',
      title: language === 'ur' ? 'دوسرا مرحلہ — ترجیحات کا اندراج' : 'Step 2 — He enters his preferences',
      desc: language === 'ur'
        ? 'احمد نے گھر میں ورزش (نو ایکوئپمنٹ)، ابتدائی درجہ (Beginner)، کم بجٹ والا دیسی کھانا اور روزانہ 20 منٹ منتخب کیے۔'
        : 'He selects home workouts, beginner level, affordable Pakistani staple foods, and a realistic 20-25 minute daily window.'
    },
    {
      num: '3',
      title: language === 'ur' ? 'تیسرا مرحلہ — ویب سائٹ نے پلان تیار کیا' : 'Step 3 — The website creates a customized plan',
      desc: language === 'ur'
        ? 'فٹ لائف نے متوازن دال تڑکا، انڈا بھورجی، گرلڈ چکن بوٹی اور کرسی کے سہارے اسکواٹس پر مبنی محفوظ پلان پیش کیا۔'
        : 'FitLife provides a weekly activity schedule (walking + bodyweight), high-protein budget recipes, and non-restrictive reminders.'
    },
    {
      num: '4',
      title: language === 'ur' ? 'چوتھا مرحلہ — پلان پر آسانی سے عمل' : 'Step 4 — He follows the plan without pressure',
      desc: language === 'ur'
        ? 'احمد نے ورزش کی تکنیک دیکھی، سادہ گھریلو ترکیبوں سے کھانا پکایا اور مکمل ہونے والے ٹاسک پر نشان لگایا۔'
        : 'He reads the exercise technique guides, prepares simple meals from the auto-generated grocery list, and logs his daily water and movement.'
    },
    {
      num: '5',
      title: language === 'ur' ? 'پانچواں مرحلہ — پیش رفت کا جائزہ' : 'Step 5 — He reviews his progress',
      desc: language === 'ur'
        ? 'ہفتے کے اختتام پر ڈیش بورڈ نے ظاہر کیا کہ اس نے تین دن چہل قدمی اور ورزش کی—بغیر کسی منفی تبصرے کے اس کی مستقل مزاجی کو سراہا گیا۔'
        : 'At the end of the week, the dashboard shows he completed 3 activity sessions and logged 5 streak days. This celebrates consistency without judging his appearance.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAhmedModalOpen(false)}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {language === 'ur' ? 'احمد کی حقیقی مثال' : "Ahmed's Real-Life Journey"}
              </h2>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-900">
                {language === 'ur' ? 'کامیاب ماڈل' : 'Active Example'}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {language === 'ur' 
                ? 'دیکھیں کہ کس طرح ایک عام مبتدی صارف نے فٹ لائف سے پائیدار عادات بنائیں'
                : 'How a beginner built sustainable fitness habits with zero gym membership & affordable food'}
            </p>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-4 mb-8">
          {steps.map((st, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 border border-slate-150 hover:bg-blue-50/50 hover:border-blue-200 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-blue-800 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                {st.num}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900 mb-1">{st.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Result Highlight */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-200 mb-6 flex items-start gap-3">
          <HeartHandshake className="w-6 h-6 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-950">
              {language === 'ur' ? 'حقیقی نتیجہ' : 'The Result'}
            </h4>
            <p className="text-xs sm:text-sm text-blue-900 mt-0.5">
              {language === 'ur'
                ? 'احمد کے پاس اب واضح لائحہ عمل ہے، مفید دیسی خوراک کی معلومات ہیں، اور وہ کسی مہنگی ممبرشپ کے بغیر مستقل مزاجی سے آگے بڑھ رہا ہے۔'
                : 'Ahmed has a clear starting point, practical Pakistani meal ideas, and a guilt-free way to maintain daily movement without searching dozens of conflicting websites.'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            onClick={() => {
              setIsAhmedModalOpen(false);
              setActiveTab('progress');
            }}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            {language === 'ur' ? 'احمد کا ڈیش بورڈ دیکھیں' : "Explore Ahmed's Dashboard"}
          </button>
          <button
            onClick={() => {
              setIsAhmedModalOpen(false);
              setActiveTab('plan-setup');
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-sm font-bold shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{language === 'ur' ? 'میرا ذاتی پلان بنائیں' : 'Create My Personal Plan'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
