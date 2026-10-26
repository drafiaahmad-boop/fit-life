import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  Heart,
  Dumbbell,
  Clock,
  DollarSign,
  Utensils,
  ShieldCheck,
  ArrowRight,
  User,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { GoalType, LocationType, ExperienceLevel, FoodPreference, BudgetLevel } from '../types';
import { AHMED_DEFAULT_PROFILE } from '../data/mockData';

export const PlanSetupWizard: React.FC = () => {
  const { userProfile, updateUserProfile, setActiveTab, language, loadAhmedDemo, currentUser } = useApp();
  const isUr = language === 'ur';

  // Form states initialized from userProfile or currentUser
  const [name, setName] = useState(currentUser?.name || userProfile.name);
  const [age, setAge] = useState(userProfile.age || 25);
  const [goal, setGoal] = useState<GoalType>(userProfile.goal);
  const [goalNotes, setGoalNotes] = useState<string>(userProfile.goalNotes || '');
  const [location, setLocation] = useState<LocationType>(userProfile.location);
  const [locationNotes, setLocationNotes] = useState<string>(userProfile.locationNotes || '');
  const [level, setLevel] = useState<ExperienceLevel>(userProfile.level);
  const [levelNotes, setLevelNotes] = useState<string>(userProfile.levelNotes || '');
  const [foodPref, setFoodPref] = useState<FoodPreference>(userProfile.foodPreference);
  const [foodNotes, setFoodNotes] = useState<string>(userProfile.foodNotes || '');
  const [budget, setBudget] = useState<BudgetLevel>(userProfile.budget);
  const [budgetNotes, setBudgetNotes] = useState<string>(userProfile.budgetNotes || '');
  const [timeAvailable, setTimeAvailable] = useState<number>(userProfile.timePerDayMinutes || 25);
  const [timeNotes, setTimeNotes] = useState<string>(userProfile.timeNotes || '');
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>(userProfile.allergies || []);
  const [dietaryNotes, setDietaryNotes] = useState<string>(userProfile.dietaryNotes || '');
  const [dislikedFoodInput, setDislikedFoodInput] = useState('');
  const [dislikedList, setDislikedList] = useState<string[]>(userProfile.dislikedFoods || []);
  const [selectedWorkoutDays, setSelectedWorkoutDays] = useState<string[]>(
    userProfile.selectedWorkoutDays || ['Monday', 'Wednesday', 'Friday', 'Saturday']
  );
  const [workoutDaysNotes, setWorkoutDaysNotes] = useState<string>(userProfile.workoutDaysNotes || '');
  const [workoutTimePeriod, setWorkoutTimePeriod] = useState<string>(
    userProfile.workoutTimePeriod || 'Morning (7:00 AM - 8:00 AM)'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isYoungUser = age < 19;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: name.trim() || 'Champion',
      age,
      goal,
      goalNotes: goalNotes.trim(),
      location,
      locationNotes: locationNotes.trim(),
      level,
      levelNotes: levelNotes.trim(),
      foodPreference: foodPref,
      foodNotes: foodNotes.trim(),
      budget,
      budgetNotes: budgetNotes.trim(),
      timePerDayMinutes: timeAvailable,
      timeNotes: timeNotes.trim(),
      selectedWorkoutDays,
      workoutTimePeriod,
      workoutDaysNotes: workoutDaysNotes.trim(),
      allergies: selectedAllergies,
      dietaryNotes: dietaryNotes.trim(),
      dislikedFoods: dislikedList,
      isCustomized: true
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setActiveTab('workouts');
    }, 1200);
  };

  const allDaysOfWeek = [
    { id: 'Monday', label: isUr ? 'پیر (Monday)' : 'Monday' },
    { id: 'Tuesday', label: isUr ? 'منگل (Tuesday)' : 'Tuesday' },
    { id: 'Wednesday', label: isUr ? 'بدھ (Wednesday)' : 'Wednesday' },
    { id: 'Thursday', label: isUr ? 'جمعرات (Thursday)' : 'Thursday' },
    { id: 'Friday', label: isUr ? 'جمعہ (Friday)' : 'Friday' },
    { id: 'Saturday', label: isUr ? 'ہفتہ (Saturday)' : 'Saturday' },
    { id: 'Sunday', label: isUr ? 'اتوار (Sunday)' : 'Sunday' }
  ];

  const toggleWorkoutDay = (day: string) => {
    setSelectedWorkoutDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const allergyOptions = ['Lactose/Milk', 'Gluten', 'Peanuts', 'Shellfish', 'Soy', 'Eggs'];

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev =>
      prev.includes(allergy) ? prev.filter(a => a !== allergy) : [...prev, allergy]
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 border border-blue-300 px-3 py-1 rounded-full">
          {isUr ? 'ذاتی پلان سیٹ اپ — صفحہ 2' : 'Page 2 — Personal Plan Setup'}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
          {isUr ? 'اپنا ذاتی لائحہ عمل مرتب کریں' : 'Build Your Personalized Routine'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          {isUr
            ? 'چند سادہ سوالات کے جوابات دیں تاکہ ہم آپ کے بجٹ اور زندگی کے مطابق حقیقت پسندانہ رہنمائی تجویز کر سکیں۔'
            : 'Answer a few practical questions so FitLife can calibrate meal ideas, home exercises, and realistic session times for you.'}
        </p>

        {/* Quick Ahmed Demo Preset */}
        <div className="mt-4 inline-flex items-center gap-2 p-1.5 px-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
          <span>{isUr ? 'جلدی میں ہیں؟ احمد کا پہلے سے تیار شدہ پلان دیکھیں:' : 'Want a quick start? Check Ahmed\'s preset:'}</span>
          <button
            type="button"
            onClick={loadAhmedDemo}
            className="font-bold underline text-amber-700 hover:text-amber-900"
          >
            {isUr ? 'احمد کا نمونہ لوڈ کریں' : "Load Ahmed's Plan"}
          </button>
        </div>
      </div>

      {/* New Account Setup Banner */}
      {currentUser && (
        <div className="mb-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            {currentUser.name ? currentUser.name[0].toUpperCase() : '✓'}
          </div>
          <div>
            <span className="font-bold block text-sm text-blue-950">
              {isUr ? `خوش آمدید، ${currentUser.name}! (اکاؤنٹ: ${currentUser.email})` : `Welcome, ${currentUser.name}! (Account: ${currentUser.email})`}
            </span>
            <p className="text-xs text-blue-800 mt-0.5">
              {isUr
                ? 'اب براہِ کرم نیچے دیے گئے سوالات اور ٹیکسٹ باکسز میں اپنی ترجیحات درج کریں تاکہ آپ کا پلان تیار ہو سکے۔'
                : 'Please complete your personalized setup questions and notes below. Your custom plan will be permanently saved to your account.'}
            </p>
          </div>
        </div>
      )}

      {/* Youth Safety Notice */}
      {isYoungUser && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">
              {isUr ? 'نوجوانوں کی صحت مند نشوونما کے لیے رہنمائی:' : 'Youth Healthy Development Mode:'}
            </span>
            <p className="mt-0.5 text-blue-800">
              {isUr
                ? 'فٹ لائف 19 سال سے کم عمر افراد کے لیے سخت ڈائٹنگ یا وزن گھٹانے کے سخت اہداف کے بجائے مناسب غذائیت، قدرتی نشوونما اور کھیل کود و چستی کو ترجیح دیتا ہے۔'
                : 'For young individuals, FitLife automatically prioritizes healthy growth, adequate nutrient intake, and enjoyable activity rather than restrictive diets or aggressive weight-loss targets.'}
            </p>
          </div>
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Name and Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {isUr ? 'آپ کا نام' : 'Your Name or Nickname'}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ahmed, Fatima"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
              {isUr ? 'عمر (سال)' : 'Age (Years)'}
            </label>
            <input
              type="number"
              min={12}
              max={95}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Question 1: Main Goal (formerly Q3) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '1. آپ کا بنیادی مقصد کیا ہے؟' : '1. What is your main fitness goal?'}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            {isUr ? 'ایک مقصد منتخب کریں تاکہ شیڈول اس کے مطابق ڈھل سکے' : 'Select your primary focus area for the upcoming 4 weeks'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {[
              { id: 'fitness', title: isUr ? 'عمومی فٹنس اور توانائی' : 'Improve Overall Fitness', desc: isUr ? 'جسم کو چست رکھنا اور دن بھر فعال رہنا' : 'Feel energized, agile, and healthy everyday' },
              { id: 'strength', title: isUr ? 'جسمانی طاقت اور مسلز' : 'Build Strength & Posture', desc: isUr ? 'ہڈیوں اور جوڑوں کو مضبوط بنانا' : 'Strengthen core, back, and functional power' },
              { id: 'stamina', title: isUr ? 'سٹیمنا اور دل کی صحت' : 'Improve Stamina & Endurance', desc: isUr ? 'پھیپھڑوں کی صلاحیت اور دیرپا توانائی' : 'Brisk walking, cardio capacity & stair climbing' },
              { id: 'habits', title: isUr ? 'صحت مند پائیدار عادات' : 'Establish Healthy Habits', desc: isUr ? 'پانی، نیند اور وقت پر کھانا' : 'Focus on water, consistent sleep & daily steps' }
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setGoal(item.id as GoalType)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  goal === item.id
                    ? 'border-blue-700 bg-blue-50/60 text-blue-950 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold">{item.title}</h4>
                  {goal === item.id && <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />}
                </div>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'مقصد کی مزید تفصیل یا کوئی خاص ہدف (اختیاری):' : 'Additional goal details or specific milestone (optional):'}
            </label>
            <input
              type="text"
              value={goalNotes}
              onChange={(e) => setGoalNotes(e.target.value)}
              placeholder={isUr ? 'مثال: سیڑھیاں چڑھتے ہوئے سانس نہ پھولے، 2 کلو وزن گھٹانا، کمر کا درد دور کرنا...' : 'e.g., Want to climb 3 flights of stairs without breathless fatigue, tone core...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 2: Experience Level (formerly Q5) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '2. آپ کا تجربہ کتنا ہے؟' : '2. Are you a beginner or experienced?'}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div
              onClick={() => setLevel('beginner')}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                level === 'beginner'
                  ? 'border-blue-700 bg-blue-50/60 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {isUr ? 'ابتدائی / بگنر (Beginner)' : 'Beginner (Safe & Gentle)'}
                </span>
                {level === 'beginner' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isUr ? 'آسان متبادل، جوڑوں پر کم بوجھ اور واضح ویڈیوز' : 'Focus on technique, low joint strain and easy variations'}
              </p>
            </div>

            <div
              onClick={() => setLevel('intermediate')}
              className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                level === 'intermediate'
                  ? 'border-blue-700 bg-blue-50/60 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {isUr ? 'درمیانہ یا باقاعدہ (Experienced)' : 'Intermediate / Active'}
                </span>
                {level === 'intermediate' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {isUr ? 'تھوڑا زیادہ وقت اور پٹھوں کی زیادہ آزمائش' : 'Higher volume, slightly longer holds and circuits'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'سابقہ تجربہ، جوڑوں کی حساسیت یا چوٹ کی تفصیل (اختیاری):' : 'Joint sensitivities, past injuries or fitness background (optional):'}
            </label>
            <input
              type="text"
              value={levelNotes}
              onChange={(e) => setLevelNotes(e.target.value)}
              placeholder={isUr ? 'مثال: بیٹھنے سے کمر میں تناؤ رہتا ہے، دائیں گھٹنے میں کھچاؤ، دو سال سے ورزش نہیں کی...' : 'e.g., Desk worker with tight lower back, knee discomfort on stairs, new to routines...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 3: Workout Location (formerly Q4) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '3. آپ ورزش کہاں کرنا پسند کرتے ہیں؟' : '3. Do you exercise at home or at a gym?'}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            {isUr ? 'گھر پر ورزش کے لیے کسی سامان کی ضرورت نہیں' : 'Home routines use furniture and bodyweight; gym uses basic stations'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div
              onClick={() => setLocation('home')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                location === 'home'
                  ? 'border-blue-700 bg-blue-50/60 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {isUr ? 'گھر پر ورزش (Home - No Equipment)' : 'Home Workouts (Zero Cost)'}
                </span>
                {location === 'home' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isUr ? 'کرسی، دیوار اور چٹائی کے ساتھ آسان باڈی ویٹ ورزشیں' : 'Living room friendly, carpet/mat bodyweight movements'}
              </p>
            </div>

            <div
              onClick={() => setLocation('gym')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                location === 'gym'
                  ? 'border-blue-700 bg-blue-50/60 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">
                  {isUr ? 'جم میں ورزش (Gym Workouts)' : 'Gym Workouts (With Equipment)'}
                </span>
                {location === 'gym' && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isUr ? 'ڈمبلز، کیبلز اور بنیادی مشینوں کے ساتھ روٹین' : 'Dumbbells, resistance machines and basic bench setups'}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'دستیاب جگہ یا سامان کے بارے میں تفصیل (اختیاری):' : 'Available workout space or equipment at hand (optional):'}
            </label>
            <input
              type="text"
              value={locationNotes}
              onChange={(e) => setLocationNotes(e.target.value)}
              placeholder={isUr ? 'مثال: کمرے میں یوگا میٹ ہے، 2 کلو کے ڈمبلز، یا چھت پر واک کی جگہ...' : 'e.g., Living room mat, 2kg light dumbbells, sturdy dining chair, roof terrace...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 4: Select Workout Days (formerly Q1) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '4. ہفتے کے کون سے دنوں میں آپ ورزش کرنا چاہتے ہیں؟' : '4. Select the days in a week you want to workout:'}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            {isUr ? 'ہر ہفتے کے دن موجود ہیں، آپ ایک یا ایک سے زیادہ دن منتخب کر سکتے ہیں' : 'Select one or more days of the week when you would like to exercise'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {allDaysOfWeek.map(day => {
              const isSelected = selectedWorkoutDays.includes(day.id);
              return (
                <button
                  type="button"
                  key={day.id}
                  onClick={() => toggleWorkoutDay(day.id)}
                  className={`p-3 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                    isSelected
                      ? 'border-blue-700 bg-blue-50 text-blue-950 font-extrabold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{day.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0 ml-1" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'منتخب ایام یا اوقات کے متعلق کوئی خاص بات (ٹیکسٹ باکس):' : 'Additional notes for your selected workout days (Text box):'}
            </label>
            <input
              type="text"
              value={workoutDaysNotes}
              onChange={(e) => setWorkoutDaysNotes(e.target.value)}
              placeholder={isUr ? 'مثال: پیر اور بدھ کو شام کو، ہفتے کو صبح کے وقت...' : 'e.g. Prefer mornings on weekdays, evening on weekends...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 5: Workout Time Period (formerly Q2) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '5. دن کے کس وقت میں آپ خاص طور پر فارغ ہیں اور ورزش کرنا چاہتے ہیں؟' : '5. In which time period in a day do you specifically are free and want to workout?'}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            {isUr ? 'براہ کرم نیچے دیے گئے ٹیکسٹ باکس میں یا فوری آپشن سے درج کریں' : 'Specify your preferred time slot or daily routine window'}
          </p>

          <div className="flex flex-wrap gap-2 mb-3">
            {[
              isUr ? 'صبح فجر کے بعد (Early Morning)' : 'Early Morning (6 AM - 8 AM)',
              isUr ? 'دوپہر کے وقت (Afternoon)' : 'Afternoon (1 PM - 3 PM)',
              isUr ? 'شام کو کام کے بعد (Evening)' : 'Evening (5 PM - 7 PM)',
              isUr ? 'رات کو سونے سے پہلے (Night)' : 'Night (8 PM - 9 PM)'
            ].map(slot => (
              <button
                type="button"
                key={slot}
                onClick={() => setWorkoutTimePeriod(slot)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                  workoutTimePeriod === slot
                    ? 'border-blue-700 bg-blue-50 text-blue-950 font-extrabold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'فراغت کے وقت کی تفصیل (ٹیکسٹ باکس):' : 'Free time period text box description:'}
            </label>
            <input
              type="text"
              value={workoutTimePeriod}
              onChange={(e) => setWorkoutTimePeriod(e.target.value)}
              placeholder={isUr ? 'مثال: روزانہ شام 6:30 بجے جب دفتری کام ختم ہو جائے...' : 'e.g. Specifically free between 6:30 PM and 7:30 PM every evening...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 6: Food Preference (formerly Q6) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '6. کھانے کی ترجیح (پاکستانی اور دیسی کھانوں پر زور)' : '6. Which cuisine do you prefer?'}
          </label>
          <p className="text-xs text-slate-500 mb-3">
            {isUr ? 'ہم دیسی کھانوں میں تیل کم کر کے ان کی اصل غذائیت کو برقرار رکھتے ہیں' : 'We calibrate classic staples with balanced oil and high protein'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
            {[
              { id: 'pakistani', label: isUr ? 'پاکستانی و دیسی' : 'Pakistani Staples (Daal/Roti)' },
              { id: 'vegetarian', label: isUr ? 'سبزی خور (Veg)' : 'Vegetarian & Lentils' },
              { id: 'high-protein', label: isUr ? 'ہائی پروٹین' : 'High Protein (Eggs/Chicken)' },
              { id: 'continental', label: isUr ? 'متنوع / مکس' : 'Continental & Salads' }
            ].map(f => (
              <button
                type="button"
                key={f.id}
                onClick={() => setFoodPref(f.id as FoodPreference)}
                className={`py-3 px-3 rounded-xl border-2 text-xs font-bold text-center transition-all ${
                  foodPref === f.id
                    ? 'border-blue-700 bg-blue-50 text-blue-950 font-extrabold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'پسندیدہ دیسی کھانے یا پکوان جو آپ شامل کرنا چاہیں (اختیاری):' : 'Favorite dishes or meals you would love included in your plan (optional):'}
            </label>
            <input
              type="text"
              value={foodNotes}
              onChange={(e) => setFoodNotes(e.target.value)}
              placeholder={isUr ? 'مثال: دال ماش اور روٹی، اتوار کو چکن پلاؤ، ناشتے میں انڈا بھورجی...' : 'e.g., Daal tadka, chicken boti, oats porridge, scrambled eggs, seasonal sabzi...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 7: Allergies & Dietary Restrictions (formerly Q9) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '7. الرجیز یا پرہیز (اگر کوئی ہوں)' : '7. Allergies or foods you avoid:'}
          </label>
          <p className="text-xs text-slate-500 mb-2.5">
            {isUr ? 'کلک کر کے منتخب کریں:' : 'Select any that apply:'}
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {allergyOptions.map(alg => (
              <button
                type="button"
                key={alg}
                onClick={() => toggleAllergy(alg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedAllergies.includes(alg)
                    ? 'bg-rose-50 border-rose-300 text-rose-700'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {alg} {selectedAllergies.includes(alg) ? '✓' : '+'}
              </button>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'ناپسندیدہ کھانے، بدہضمی یا خصوصی پرہیز کی تفصیل (اختیاری):' : 'Specific food dislikes, digestive notes, or dietary avoidances (optional):'}
            </label>
            <input
              type="text"
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              placeholder={isUr ? 'مثال: تیز لال مرچ سے جلن، کریلے یا بینگن پسند نہیں، چائے میں چینی بند کرنی ہے...' : 'e.g., Sensitive to heavy chili spices, dislike eggplant/karela, avoiding added sugar...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Question 8: Food Budget (formerly Q7) */}
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            {isUr ? '8. خوراک کا تخمینہ بجٹ کتنا ہے؟' : '8. What is your approximate food budget?'}
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
            {[
              { id: 'budget', title: isUr ? 'بجٹ فرینڈلی (کم خرچ)' : 'Budget-Friendly (Staples)', desc: isUr ? 'دالیں، چنے، موسمی سبزیاں اور انڈے' : 'Daal, chickpeas, seasonal sabzi, whole wheat & eggs' },
              { id: 'moderate', title: isUr ? 'معتدل بجٹ' : 'Moderate', desc: isUr ? 'مرغی، دہی، اور گھریلو دسترخوان' : 'Includes chicken breast, yogurt, seasonal fruit and nuts' },
              { id: 'flexible', title: isUr ? 'کھلا بجٹ' : 'Flexible', desc: isUr ? 'مچھلی، زیتون کا تیل اور ڈرائی فروٹ' : 'Includes olive oil, mixed nuts, fish and varied proteins' }
            ].map(b => (
              <div
                key={b.id}
                onClick={() => setBudget(b.id as BudgetLevel)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  budget === b.id
                    ? 'border-blue-700 bg-blue-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{b.title}</span>
                  {budget === b.id && <CheckCircle2 className="w-4 h-4 text-blue-700" />}
                </div>
                <p className="text-xs text-slate-500 mt-1">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/90">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {isUr ? 'بجٹ یا خریداری کے متعلق اضافی وضاحت (اختیاری):' : 'Specific grocery budget notes or shopping preferences (optional):'}
            </label>
            <input
              type="text"
              value={budgetNotes}
              onChange={(e) => setBudgetNotes(e.target.value)}
              placeholder={isUr ? 'مثال: لوکل سبزی منڈی سے خریداری، ماہانہ خرچ 10,000 تا 15,000 روپے کے اندر...' : 'e.g., Shop from local mandi, budget around 300 PKR per day, bulk grains...'}
              className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            />
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>{isUr ? 'آپ کا ڈیٹا آپ کی ڈیوائس پر محفوظ رہے گا' : 'Privacy-first: Stored securely on your device'}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setName(AHMED_DEFAULT_PROFILE.name);
                setAge(AHMED_DEFAULT_PROFILE.age);
                setGoal(AHMED_DEFAULT_PROFILE.goal);
                setGoalNotes('');
                setLocation(AHMED_DEFAULT_PROFILE.location);
                setLocationNotes('');
                setLevel(AHMED_DEFAULT_PROFILE.level);
                setLevelNotes('');
                setFoodPref(AHMED_DEFAULT_PROFILE.foodPreference);
                setFoodNotes('');
                setBudget(AHMED_DEFAULT_PROFILE.budget);
                setBudgetNotes('');
                setTimeAvailable(AHMED_DEFAULT_PROFILE.timePerDayMinutes);
                setTimeNotes('');
                setSelectedAllergies([]);
                setDietaryNotes('');
              }}
              className="px-4 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isUr ? 'دوبارہ ترتیب دیں' : 'Reset'}</span>
            </button>

            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>{savedSuccess ? (isUr ? 'پلان تیار ہے! ری ڈائریکٹ...' : 'Plan Generated! Redirecting...') : (isUr ? 'میرا ذاتی پلان بنائیں' : 'Generate & Save My Plan')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </form>

    </div>
  );
};
