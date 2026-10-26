import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { WorkoutSession } from '../types';
import {
  Dumbbell,
  Play,
  CheckCircle2,
  Clock,
  Flame,
  ShieldAlert,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Pause,
  AlertTriangle,
  Heart,
  X,
  Sliders,
  Smile
} from 'lucide-react';
import { RunningTimer } from './RunningTimer';
import confetti from 'canvas-confetti';

export const WorkoutPlannerView: React.FC = () => {
  const {
    workoutSessions,
    completedWorkoutIds,
    markWorkoutComplete,
    applyWorkoutFeedback,
    language,
    lowDataMode,
    userProfile
  } = useApp();

  const isUr = language === 'ur';

  // Filters
  const [filterLocation, setFilterLocation] = useState<'all' | 'home' | 'gym'>(userProfile.location || 'home');
  const [filterDuration, setFilterDuration] = useState<'all' | 'short' | 'medium' | 'longer'>('all');
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(1);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  // Live Workout Player state
  const [playerOpen, setPlayerOpen] = useState(false);

  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showAlternative, setShowAlternative] = useState<Record<string, boolean>>({});
  const [busyDayAdapted, setBusyDayAdapted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackStep, setFeedbackStep] = useState<'prompt' | 'confirmation'>('prompt');
  const [selectedFeedback, setSelectedFeedback] = useState<'easy' | 'moderate' | 'hard' | null>(null);

  // Filter workouts
  const filteredSessions = workoutSessions.filter(s => {
    if (filterLocation !== 'all' && s.location !== filterLocation) return false;
    if (filterDuration === 'short' && s.durationMinutes > 20) return false;
    if (filterDuration === 'medium' && (s.durationMinutes < 20 || s.durationMinutes > 35)) return false;
    if (filterDuration === 'longer' && s.durationMinutes < 35) return false;
    return true;
  });

  const selectedSession = workoutSessions.find(s => s.dayNumber === selectedDayNumber) || workoutSessions[0];

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const startPlayer = (session: WorkoutSession) => {
    setActiveSession(session);
    if (session.warmUpMinutes > 0) {
      setCurrentExIndex(-1);
      setTimerSeconds(session.warmUpMinutes * 60);
    } else {
      setCurrentExIndex(0);
      setTimerSeconds(session.exercises[0]?.restSeconds || 45);
    }
    setIsTimerRunning(false);
    setPlayerOpen(true);
  };

  const toggleAlternative = (exerciseId: string) => {
    setShowAlternative(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const isCompleted = (id: string) => completedWorkoutIds.includes(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      



      {/* Selected Day Workout Deep-Dive Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Header of selected day */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                {selectedSession.dayName}
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                {selectedSession.focus}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              {isUr ? selectedSession.urduTitle : selectedSession.title}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {selectedSession.exercises.length > 0 && (
              <button
                onClick={() => startPlayer(selectedSession)}
                className="px-5 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-sm shadow-md shadow-blue-900/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>{isUr ? 'ورزش شروع کریں (Live Timer)' : 'Start Guided Workout'}</span>
              </button>
            )}

            <button
              onClick={() => markWorkoutComplete(selectedSession.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center gap-2 ${
                isCompleted(selectedSession.id)
                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
              <span>{isCompleted(selectedSession.id) ? (isUr ? 'مکمل ہو گئی!' : 'Completed!') : (isUr ? 'مکمل درج کریں' : 'Mark Done')}</span>
            </button>
          </div>
        </div>

        {/* Warm-up & Cool-down Accordions (Slide 7 requirement) */}
        {!selectedSession.isRestDay && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Warm-Up Guidance */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-amber-900 mb-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>{isUr ? 'وارم اپ رہنمائی (4 منٹ)' : 'Pre-Workout Warm-Up (4 Mins)'}</span>
              </div>
              <p className="text-xs text-amber-900/80 leading-relaxed">
                {isUr
                  ? 'آہستہ چہل قدمی، بازوؤں کی گول گردش، اور کولہوں کی نرم حرکت تاکہ خون کی گردش بڑھے اور پٹھے تیار ہوں۔'
                  : 'Shoulder rolls, gentle arm swings, hip openers, and light in-place marching. Prepares synovial fluid in joints to prevent strain.'}
              </p>
            </div>

            {/* Cool-Down Guidance */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide text-blue-900 mb-1.5">
                <Smile className="w-4 h-4 text-blue-600" />
                <span>{isUr ? 'کول ڈاؤن اور اسٹریچ (3 منٹ)' : 'Post-Workout Cool-Down (3 Mins)'}</span>
              </div>
              <p className="text-xs text-blue-900/80 leading-relaxed">
                {isUr
                  ? 'گہری سانسیں، پنڈلیوں اور سینے کا نرم اسٹریچ۔ دل کی دھڑکن کو معمول پر لائیں اور پانی کا گھونٹ لیں۔'
                  : 'Deep belly breathing, hamstring stretches, and standing chest stretch. Normalizes heart rate and reduces next-day stiffness.'}
              </p>
            </div>

          </div>
        )}

        {/* Rest Day Highlight */}
        {selectedSession.isRestDay && (
          <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-950 space-y-3">
            <div className="flex items-center gap-2.5">
              <Heart className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-lg text-blue-900">
                {isUr ? 'آرام اور بافتوں کی بحالی کا دن' : 'Scheduled Rest & Recovery Day'}
              </h3>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              {selectedSession.restDayTip}
            </p>
            <div className="text-xs text-blue-700 bg-white/70 p-3 rounded-xl border border-blue-100 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{isUr ? 'آج پانی پینے کے ہدف (8 گلاس) اور وقت پر سونے پر توجہ دیں۔' : 'Key habit today: Ensure you reach your 2.5L water goal and get 7-8 hours of sleep.'}</span>
            </div>
          </div>
        )}

        {/* Exercises List */}
        {selectedSession.exercises.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {isUr ? 'ورزشوں کی تفصیل اور متبادل' : 'Session Exercises & Form Cues'}
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  {selectedSession.exercises.length} {isUr ? 'ورزشیں' : 'movements'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {selectedSession.exercises.map((ex, idx) => {
                const isAltOn = showAlternative[ex.id];

                return (
                  <div
                    key={ex.id}
                    className="p-5 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors bg-slate-50/50 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900">
                            {isUr ? ex.urduName : ex.name}
                          </h4>
                          <span className="text-xs text-blue-700 font-medium">
                            {isUr ? 'ہدف مسلز:' : 'Target:'} {ex.targetMuscles}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200">
                          {ex.sets} Sets
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200">
                          {ex.repsOrSeconds}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-500">
                          {ex.restSeconds}s rest
                        </span>
                      </div>
                    </div>

                    {/* Step Instructions */}
                    <div className="text-xs text-slate-600 space-y-1 pl-1 sm:pl-10">
                      {ex.instructions.map((step, sIdx) => (
                        <p key={sIdx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-bold">•</span>
                          <span>{step}</span>
                        </p>
                      ))}
                    </div>

                    {/* Beginner Alternative Toggle (Slide 7 requirement) */}
                    <div className="pl-1 sm:pl-10 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => toggleAlternative(ex.id)}
                        className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>{isAltOn ? (isUr ? 'اصل ورزش دیکھیں' : 'Show Standard Movement') : (isUr ? 'مبتدی آسان متبادل دیکھیں' : 'Beginner Friendly Alternative')}</span>
                      </button>

                      {/* Safety reminder */}
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-blue-600" />
                        <span>{ex.safetyTip}</span>
                      </span>
                    </div>

                    {/* Show Alternative Box */}
                    {isAltOn && (
                      <div className="ml-1 sm:ml-10 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-in fade-in">
                        <span className="font-bold block mb-0.5">
                          {isUr ? 'آسان متبادل:' : 'Easier Alternative:'}
                        </span>
                        <p>{ex.beginnerAlternative}</p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Safety Reminder About Technique & Discomfort (Slide 7 requirement) */}
      <div className="p-6 rounded-2xl bg-slate-900 text-slate-200 border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>{isUr ? 'حفاظتی یاددہانی: تکلیف اور درد میں فرق' : 'Safety First: Discomfort vs. Joint Pain'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {isUr
            ? 'ورزش کے دوران ہلکی مسلز کی گرمائش اور تھکن قدرتی ہے۔ تاہم تیز، چبھنے والا جوڑوں کا درد (گھٹنے یا کمر میں) یہ اشارہ ہے کہ فوراً رک جائیں۔ وزن یا تیز رفتاری کے بجائے ہمیشہ درست انداز (Technique) کو ترجیح دیں۔'
            : 'Mild muscular burning and fatigue during exercise is a normal adaptation. However, sharp, stabbing joint pain in knees or lower back is an indicator to STOP immediately. Always choose proper posture and controlled tempo over heavy resistance.'}
        </p>
      </div>

      <RunningTimer />

      {/* Live Guided Workout Player Modal */}
      {playerOpen && activeSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-slate-900">
            
            <button
              onClick={() => setPlayerOpen(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                {isUr ? 'لائیو گائیڈڈ ورزش' : 'Live Guided Workout'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {isUr ? activeSession.urduTitle : activeSession.title}
              </h2>
              {currentExIndex >= 0 && currentExIndex < activeSession.exercises.length && (
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>Exercise {currentExIndex + 1} of {activeSession.exercises.length}</span>
                </div>
              )}
            </div>
            
            {/* Warm-Up / Exercise / Cool-Down Content */}
            <div className="flex-1 overflow-y-auto">
              {currentExIndex === -1 ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                    <h3 className="text-lg font-bold text-amber-950">
                      {isUr ? 'وارم اپ (Warm-Up)' : 'Warm-Up'}
                    </h3>
                    <p className="text-sm text-amber-900 mt-1">
                      {isUr 
                        ? 'آہستہ چہل قدمی، بازوؤں کی گول گردش، اور کولہوں کی نرم حرکت تاکہ خون کی گردش بڑھے۔' 
                        : 'Shoulder rolls, gentle arm swings, hip openers, and light in-place marching.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                     {isUr ? 'تیاری کا وقت: ' : 'Prep Time: '} {activeSession.warmUpMinutes} {isUr ? 'منٹ' : 'minutes'}
                  </div>
                </div>
              ) : currentExIndex === activeSession.exercises.length ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-950">
                      {isUr ? 'کول ڈاؤن (Cool-Down)' : 'Cool-Down'}
                    </h3>
                    <p className="text-sm text-blue-900 mt-1">
                      {isUr 
                        ? 'گہری سانسیں، پنڈلیوں اور سینے کا نرم اسٹریچ۔ دل کی دھڑکن کو معمول پر لائیں۔' 
                        : 'Deep belly breathing, hamstring stretches, and standing chest stretch.'}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                     {isUr ? 'ریکوری کا وقت: ' : 'Recovery Time: '} {activeSession.coolDownMinutes} {isUr ? 'منٹ' : 'minutes'}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Current Exercise */}
                  <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                        {isUr ? 'موجودہ ورزش' : 'Current Exercise'}
                      </span>
                      <span className="text-xs font-extrabold text-blue-950">
                        {activeSession.exercises[currentExIndex].sets} Sets × {activeSession.exercises[currentExIndex].repsOrSeconds}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-blue-950">
                      {isUr 
                        ? activeSession.exercises[currentExIndex].urduName 
                        : activeSession.exercises[currentExIndex].name}
                    </h3>

                    <p className="text-xs text-blue-800/90 mt-1">
                      {activeSession.exercises[currentExIndex].targetMuscles}
                    </p>
                  </div>

                  {/* Form Cues */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {isUr ? 'درست انداز کے اشارے:' : 'Form Technique Cues:'}
                    </span>
                    {activeSession.exercises[currentExIndex].instructions.map((ins, i) => (
                      <p key={i}>• {ins}</p>
                    ))}
                  </div>

                  {/* Beginner Friendly Alternative in Modal */}
                  {(() => {
                    const currentEx = activeSession.exercises[currentExIndex];
                    const isAltOn = showAlternative[currentEx.id];
                    return (
                      <div className="space-y-3 pt-1">
                        <div className="flex items-center justify-between text-xs">
                          <button
                            type="button"
                            onClick={() => toggleAlternative(currentEx.id)}
                            className="font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            <span>{isAltOn ? (isUr ? 'اصل ورزش دیکھیں' : 'Show Standard Movement') : (isUr ? 'مبتدی آسان متبادل دیکھیں' : 'Beginner Friendly Alternative')}</span>
                          </button>
                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-blue-600" />
                            <span>{currentEx.safetyTip}</span>
                          </span>
                        </div>

                        {isAltOn && (
                          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 animate-in fade-in">
                            <span className="font-bold block mb-0.5">
                              {isUr ? 'آسان متبادل:' : 'Easier Alternative:'}
                            </span>
                            <p>{currentEx.beginnerAlternative}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            {/* Rest Interval Timer */}
            {(currentExIndex >= 0 && currentExIndex < activeSession.exercises.length) && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between mt-4">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    {isUr ? 'ورزش ٹائمر (Workout Timer)' : 'Workout Timer'}
                  </span>
                  <span className="text-2xl font-mono font-bold text-blue-400">
                    {timerSeconds}s
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                    <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(activeSession.exercises[currentExIndex].restSeconds);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
              <button
                disabled={currentExIndex === -1}
                onClick={() => {
                  if (currentExIndex === 0) {
                    setCurrentExIndex(-1);
                    setTimerSeconds(activeSession.warmUpMinutes * 60);
                  } else if (currentExIndex === activeSession.exercises.length) {
                    setCurrentExIndex(activeSession.exercises.length - 1);
                    setTimerSeconds(activeSession.exercises[activeSession.exercises.length - 1].restSeconds);
                  } else {
                    setCurrentExIndex(prev => Math.max(0, prev - 1));
                    setTimerSeconds(activeSession.exercises[currentExIndex - 1]?.restSeconds || 45);
                  }
                  setIsTimerRunning(false);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-50"
              >
                Previous
              </button>

              {currentExIndex < activeSession.exercises.length ? (
                <button
                  onClick={() => {
                    if (currentExIndex === -1) {
                      setCurrentExIndex(0);
                      setTimerSeconds(activeSession.exercises[0]?.restSeconds || 45);
                    } else {
                      setCurrentExIndex(prev => prev + 1);
                      if (currentExIndex + 1 < activeSession.exercises.length) {
                        setTimerSeconds(activeSession.exercises[currentExIndex + 1]?.restSeconds || 45);
                      } else {
                        setTimerSeconds(activeSession.coolDownMinutes * 60);
                      }
                    }
                    setIsTimerRunning(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <span>{currentExIndex === -1 ? 'Start Workout' : (currentExIndex === activeSession.exercises.length - 1 ? 'Finish and now Cool-Down' : 'Next Exercise')}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowFeedback(true)}
                  className="px-6 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isUr ? 'آرام کرنے کے لیے مکمل کریں' : 'Finish to Relax'}</span>
                </button>
              )}
            </div>

            {showFeedback && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl">
                  {feedbackStep === 'prompt' ? (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">How was your workout today?</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => { setSelectedFeedback('easy'); applyWorkoutFeedback('easy'); setFeedbackStep('confirmation'); }} className="px-3 py-2 rounded-lg bg-green-100 text-green-800 font-bold text-xs hover:bg-green-200">Easy</button>
                        <button onClick={() => { setSelectedFeedback('moderate'); applyWorkoutFeedback('medium'); setFeedbackStep('confirmation'); }} className="px-3 py-2 rounded-lg bg-blue-100 text-blue-800 font-bold text-xs hover:bg-blue-200">Moderate</button>
                        <button onClick={() => { setSelectedFeedback('hard'); applyWorkoutFeedback('hard'); setFeedbackStep('confirmation'); }} className="px-3 py-2 rounded-lg bg-rose-100 text-rose-800 font-bold text-xs hover:bg-rose-200">Hard</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {selectedFeedback === 'easy' ? "Great! Let's Level Up!" : selectedFeedback === 'hard' ? "Let's Take It Easier!" : "Perfectly Balanced!"}
                      </h3>
                      <p className="text-sm text-slate-600 mb-6">
                        {selectedFeedback === 'easy' ? "Your next workout will be slightly harder." : selectedFeedback === 'hard' ? "Your next workout will be slightly easier." : "Your next workout will maintain the same difficulty level."}
                      </p>
                      <button onClick={() => { markWorkoutComplete(activeSession.id); setPlayerOpen(false); setShowFeedback(false); setFeedbackStep('prompt'); }} className="w-full px-4 py-2 rounded-lg bg-blue-800 text-white font-bold text-xs">Done</button>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
