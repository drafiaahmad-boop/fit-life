import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

export const RunningTimer: React.FC = () => {
  const [duration, setDuration] = useState(300); // in seconds
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const h = Math.floor(duration / 3600);
  const m = Math.floor((duration % 3600) / 60);
  const s = duration % 60;

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      alert('Time is up!');
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft]);

  const toggleRunning = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCustomTime = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeLeft(duration);
    setIsEditing(false);
  };

  return (
    <div className="p-8 rounded-3xl bg-blue-50 border border-blue-100 shadow-xl shadow-blue-100/50 space-y-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-3 text-blue-900">
          <TimerIcon className="w-7 h-7" />
          <h3 className="text-2xl font-extrabold tracking-tight">Running & Jogging Timer</h3>
        </div>
        <p className="text-sm text-slate-600 italic max-w-lg text-center">
          After completing the workouts, if you still have enough stamina and want to continue running or jogging, you can open the timer and start your running or jogging session.
        </p>
      </div>
      
      <div className="text-6xl font-mono font-bold text-center py-6 bg-blue-100 text-blue-900 rounded-2xl shadow-inner tracking-widest border border-blue-200">
        {formatTime(timeLeft)}
      </div>

      {isEditing ? (
        <form onSubmit={handleCustomTime} className="flex gap-2 justify-center items-center p-4 rounded-xl bg-yellow-50 border border-yellow-200">
          <select value={h} onChange={(e) => setDuration(Number(e.target.value) * 3600 + m * 60 + s)} className="p-3 border border-yellow-200 bg-white rounded-xl font-semibold text-slate-700">
            {[...Array(101).keys()].map(i => <option key={i} value={i}>{i}h</option>)}
          </select>
          <select value={m} onChange={(e) => setDuration(h * 3600 + Number(e.target.value) * 60 + s)} className="p-3 border border-yellow-200 bg-white rounded-xl font-semibold text-slate-700">
            {[...Array(60).keys()].map(i => <option key={i} value={i}>{i}m</option>)}
          </select>
          <select value={s} onChange={(e) => setDuration(h * 3600 + m * 60 + Number(e.target.value))} className="p-3 border border-yellow-200 bg-white rounded-xl font-semibold text-slate-700">
            {[...Array(60).keys()].map(i => <option key={i} value={i}>{i}s</option>)}
          </select>
          <button type="submit" className="px-6 py-3 bg-yellow-500 text-white rounded-xl font-bold hover:bg-yellow-600 transition-colors">Set</button>
        </form>
      ) : (
        <div className="flex justify-center gap-4">
          <button onClick={toggleRunning} className="p-4 bg-blue-800 text-white rounded-full hover:bg-blue-900 transition-transform hover:scale-105">
            {isRunning ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
          </button>
          <button onClick={resetTimer} className="p-4 bg-slate-200 text-slate-700 rounded-full hover:bg-slate-300 transition-transform hover:scale-105">
            <RotateCcw className="w-8 h-8" />
          </button>
          <button onClick={() => setIsEditing(true)} className="px-6 py-4 bg-slate-100 text-[#324fe2] rounded-full font-bold hover:bg-slate-200 transition-all">
            Edit Time
          </button>
        </div>
      )}
    </div>
  );
};
