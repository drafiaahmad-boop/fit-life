import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  UserProfile,
  Recipe,
  WorkoutSession,
  HabitItem,
  DailyLog,
  Ingredient,
  UserAccount
} from '../types';
import {
  AHMED_DEFAULT_PROFILE,
  INITIAL_RECIPES,
  INITIAL_WORKOUTS,
  INITIAL_HABITS,
  TRANSLATIONS
} from '../data/mockData';
import {
  toUrduDigits,
  formatNumber,
  formatUnit,
  formatDayName,
  formatMealSlot,
  formatDateUrdu
} from '../utils/urduUtils';

interface ShoppingItem extends Ingredient {
  id: string;
  recipeTitle: string;
  checked: boolean;
}

interface AppContextType {
  currentUser: UserAccount | null;
  signUp: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: (email?: string, name?: string) => Promise<{ success: boolean }>;
  logout: () => void;
  isAuthScreenOpen: boolean;
  setIsAuthScreenOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  lowDataMode: boolean;
  setLowDataMode: (enabled: boolean) => void;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  recipes: Recipe[];
  mealSchedule: Record<string, { breakfast?: string; lunch?: string; dinner?: string; snack?: string }>;
  assignMeal: (day: string, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipeId: string) => void;
  removeMeal: (day: string, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => void;
  shoppingList: ShoppingItem[];
  toggleShoppingItem: (id: string) => void;
  addCustomShoppingItem: (name: string, amount: string) => void;
  clearCheckedShoppingItems: () => void;
  workoutSessions: WorkoutSession[];
  completedWorkoutIds: string[];
  markWorkoutComplete: (workoutId: string) => void;
  habits: HabitItem[];
  toggleHabit: (habitId: string) => void;
  incrementWater: () => void;
  decrementWater: () => void;
  dailyLogs: DailyLog[];
  todayLog: DailyLog;
  saveJournalEntry: (energy: number, mood: DailyLog['mood'], note: string) => void;
  t: (key: string) => string;
  toUrduDigits: (val: string | number | null | undefined) => string;
  formatNumber: (val: string | number | null | undefined) => string;
  formatUnit: (val: string | number | null | undefined, unit: string) => string;
  formatDayName: (day: string) => string;
  formatMealSlot: (slot: string) => string;
  formatDateUrdu: (dateInput?: string | Date) => string;
  loadAhmedDemo: () => void;
  resetAllData: () => void;
  isAhmedModalOpen: boolean;
  setIsAhmedModalOpen: (open: boolean) => void;
  isAIChatModalOpen: boolean;
  setIsAIChatModalOpen: (open: boolean) => void;
  difficultyModifier: number;
  applyWorkoutFeedback: (feedback: 'easy' | 'medium' | 'hard') => void;
  triggerCelebration: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_PREFIX = 'fitlife_app_v2_';

const DEFAULT_SCHEDULE = {
  Monday: { breakfast: 'rec-2', lunch: 'rec-1', dinner: 'rec-3', snack: 'rec-6' },
  Tuesday: { breakfast: 'rec-5', lunch: 'rec-4', dinner: 'rec-3', snack: 'rec-6' },
  Wednesday: { breakfast: 'rec-2', lunch: 'rec-1', dinner: 'rec-4', snack: 'rec-6' },
  Thursday: { breakfast: 'rec-5', lunch: 'rec-4', dinner: 'rec-3', snack: 'rec-6' },
  Friday: { breakfast: 'rec-2', lunch: 'rec-1', dinner: 'rec-3', snack: 'rec-6' },
  Saturday: { breakfast: 'rec-5', lunch: 'rec-4', dinner: 'rec-3', snack: 'rec-6' },
  Sunday: { breakfast: 'rec-2', lunch: 'rec-1', dinner: 'rec-4', snack: 'rec-6' }
};

// Seed demo user Ahmed
const SEED_AHMED_ACCOUNT: UserAccount = {
  id: 'usr-ahmed-demo',
  email: 'ahmed.fitness@gmail.com',
  name: 'Ahmed',
  password: 'password123',
  provider: 'password',
  createdAt: '2026-10-18T10:00:00Z',
  hasCompletedPlanSetup: true,
  planProfile: AHMED_DEFAULT_PROFILE,
  mealSchedule: DEFAULT_SCHEDULE,
  completedWorkoutIds: ['wk-1', 'wk-2', 'wk-3'],
  habits: INITIAL_HABITS,
  dailyLogs: [
    {
      date: '2026-10-19',
      energyLevel: 4,
      mood: 'energized',
      workoutCompleted: true,
      habits: { 'hab-1': true, 'hab-2': true, 'hab-3': true, 'hab-5': true },
      journalNote: 'Felt very clear-headed after drinking water early and doing the beginner bodyweight session.',
      waterGlasses: 8
    },
    {
      date: '2026-10-20',
      energyLevel: 4,
      mood: 'good',
      workoutCompleted: true,
      habits: { 'hab-1': true, 'hab-2': true, 'hab-3': true },
      journalNote: 'Enjoyed the daal and salad lunch. Good steady afternoon energy without a food coma.',
      waterGlasses: 7
    }
  ]
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Modals
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isAhmedModalOpen, setIsAhmedModalOpen] = useState<boolean>(false);
  const [isAIChatModalOpen, setIsAIChatModalOpen] = useState<boolean>(false);
  const [isAuthScreenOpen, setIsAuthScreenOpen] = useState<boolean>(false);

  // Users Database in LocalStorage
  const [usersDb, setUsersDb] = useState<Record<string, UserAccount>>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'users_db');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed['ahmed.fitness@gmail.com']) {
          parsed['ahmed.fitness@gmail.com'] = SEED_AHMED_ACCOUNT;
        }
        return parsed;
      } catch (e) {
        // ignore
      }
    }
    return {
      'ahmed.fitness@gmail.com': SEED_AHMED_ACCOUNT
    };
  });

  // Current Logged In User
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const savedUserEmail = localStorage.getItem(STORAGE_PREFIX + 'active_email');
    if (savedUserEmail) {
      const savedDb = localStorage.getItem(STORAGE_PREFIX + 'users_db');
      if (savedDb) {
        try {
          const db = JSON.parse(savedDb);
          if (db[savedUserEmail]) {
            return db[savedUserEmail];
          }
        } catch (e) { /* ignore */ }
      }
    }
    return null; // by default require login/signup on first start
  });

  // Save usersDb to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_PREFIX + 'users_db', JSON.stringify(usersDb));
  }, [usersDb]);

  // Language & Low-Data
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_PREFIX + 'lang') as Language) || 'en';
  });

  const [lowDataMode, setLowDataModeState] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_PREFIX + 'low_data') === 'true';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_PREFIX + 'lang', lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const setLowDataMode = (enabled: boolean) => {
    setLowDataModeState(enabled);
    localStorage.setItem(STORAGE_PREFIX + 'low_data', String(enabled));
    if (enabled) {
      document.body.classList.add('low-data-mode');
    } else {
      document.body.classList.remove('low-data-mode');
    }
  };

  useEffect(() => {
    if (lowDataMode) {
      document.body.classList.add('low-data-mode');
    }
    document.documentElement.dir = language === 'ur' ? 'rtl' : 'ltr';
  }, [language, lowDataMode]);

  // Active User Profile
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (currentUser?.planProfile) return currentUser.planProfile;
    return AHMED_DEFAULT_PROFILE;
  });

  // Active Meals
  const [recipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [mealSchedule, setMealSchedule] = useState<Record<string, { breakfast?: string; lunch?: string; dinner?: string; snack?: string }>>(() => {
    if (currentUser?.mealSchedule) return currentUser.mealSchedule;
    return DEFAULT_SCHEDULE;
  });

  // Active Workouts
  const [workoutSessions] = useState<WorkoutSession[]>(INITIAL_WORKOUTS);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<string[]>(() => {
    if (currentUser?.completedWorkoutIds) return currentUser.completedWorkoutIds;
    return ['wk-1', 'wk-2', 'wk-3'];
  });

  // Active Habits
  const [habits, setHabits] = useState<HabitItem[]>(() => {
    if (currentUser?.habits) return currentUser.habits;
    return INITIAL_HABITS;
  });

  // Active Daily Logs
  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    if (currentUser?.dailyLogs) return currentUser.dailyLogs;
    return SEED_AHMED_ACCOUNT.dailyLogs;
  });

  // When currentUser changes, sync state to currentUser's data
  useEffect(() => {
    if (currentUser) {
      setUserProfile(currentUser.planProfile);
      setMealSchedule(currentUser.mealSchedule || DEFAULT_SCHEDULE);
      setCompletedWorkoutIds(currentUser.completedWorkoutIds || []);
      setHabits(currentUser.habits || INITIAL_HABITS);
      setDailyLogs(currentUser.dailyLogs || []);
      localStorage.setItem(STORAGE_PREFIX + 'active_email', currentUser.email);
    } else {
      localStorage.removeItem(STORAGE_PREFIX + 'active_email');
    }
  }, [currentUser]);

  // Sync back state changes to active user in usersDb
  const syncCurrentUserToDb = (updatedFields: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedFields };
    setCurrentUser(updatedUser);
    setUsersDb(prev => ({
      ...prev,
      [updatedUser.email]: updatedUser
    }));
  };

  // Auth Methods
  const signUp = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || 'Champion';

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid Gmail or email address.' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (usersDb[cleanEmail]) {
      return { success: false, error: 'An account with this email already exists. Please log in.' };
    }

    const newUserProfile: UserProfile = {
      ...AHMED_DEFAULT_PROFILE,
      name: cleanName,
      isCustomized: false
    };

    const newAccount: UserAccount = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: cleanName,
      password,
      provider: 'password',
      createdAt: new Date().toISOString(),
      hasCompletedPlanSetup: false,
      planProfile: newUserProfile,
      mealSchedule: DEFAULT_SCHEDULE,
      completedWorkoutIds: [],
      habits: INITIAL_HABITS.map(h => ({ ...h, current: 0, completed: false })),
      dailyLogs: []
    };

    setUsersDb(prev => ({
      ...prev,
      [cleanEmail]: newAccount
    }));
    setCurrentUser(newAccount);
    setUserProfile(newUserProfile);
    setCompletedWorkoutIds([]);
    setHabits(INITIAL_HABITS.map(h => ({ ...h, current: 0, completed: false })));
    setMealSchedule(DEFAULT_SCHEDULE);
    setDailyLogs([]);

    // Immediately route to Plan Setup so they fill the questionnaire and text boxes!
    setActiveTab('plan-setup');
    setIsAuthScreenOpen(false);

    return { success: true };
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const account = usersDb[cleanEmail];

    if (!account) {
      return {
        success: false,
        error: 'No account found with this email. Please check your spelling or sign up.'
      };
    }

    if (account.password && account.password !== password) {
      return {
        success: false,
        error: 'Incorrect password. Please try again.'
      };
    }

    setCurrentUser(account);
    setUserProfile(account.planProfile);
    setMealSchedule(account.mealSchedule || DEFAULT_SCHEDULE);
    setCompletedWorkoutIds(account.completedWorkoutIds || []);
    setHabits(account.habits || INITIAL_HABITS);
    setDailyLogs(account.dailyLogs || []);

    setIsAuthScreenOpen(false);
    if (!account.hasCompletedPlanSetup) {
      setActiveTab('plan-setup');
    } else {
      setActiveTab('home');
    }

    return { success: true };
  };

  const loginWithGoogle = async (googleEmail?: string, googleName?: string): Promise<{ success: boolean }> => {
    const cleanEmail = (googleEmail || 'dr.afia.ahmad@gmail.com').trim().toLowerCase();
    const cleanName = googleName || (cleanEmail.split('@')[0] || 'User');

    let account = usersDb[cleanEmail];
    if (!account) {
      account = {
        id: `usr-g-${Date.now()}`,
        email: cleanEmail,
        name: cleanName,
        provider: 'google',
        createdAt: new Date().toISOString(),
        hasCompletedPlanSetup: false,
        planProfile: {
          ...AHMED_DEFAULT_PROFILE,
          name: cleanName,
          isCustomized: false
        },
        mealSchedule: DEFAULT_SCHEDULE,
        completedWorkoutIds: [],
        habits: INITIAL_HABITS.map(h => ({ ...h, current: 0, completed: false })),
        dailyLogs: []
      };

      setUsersDb(prev => ({
        ...prev,
        [cleanEmail]: account
      }));
    }

    setCurrentUser(account);
    setUserProfile(account.planProfile);
    setMealSchedule(account.mealSchedule || DEFAULT_SCHEDULE);
    setCompletedWorkoutIds(account.completedWorkoutIds || []);
    setHabits(account.habits || INITIAL_HABITS);
    setDailyLogs(account.dailyLogs || []);

    setIsAuthScreenOpen(false);
    if (!account.hasCompletedPlanSetup) {
      setActiveTab('plan-setup');
    } else {
      setActiveTab('home');
    }

    return { success: true };
  };

  const logout = () => {
    if (currentUser) {
      // Save latest state to user account
      const updatedUser: UserAccount = {
        ...currentUser,
        planProfile: userProfile,
        mealSchedule,
        completedWorkoutIds,
        habits,
        dailyLogs
      };
      setUsersDb(prev => ({
        ...prev,
        [currentUser.email]: updatedUser
      }));
    }
    setCurrentUser(null);
    localStorage.removeItem(STORAGE_PREFIX + 'active_email');
    setActiveTab('home');
    setIsAuthScreenOpen(true);
  };

  const updateUserProfile = (newVals: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = { ...prev, ...newVals, isCustomized: true };
      if (currentUser) {
        syncCurrentUserToDb({
          hasCompletedPlanSetup: true,
          planProfile: updated
        });
      }
      return updated;
    });
  };

  const applyWorkoutFeedback = (feedback: 'easy' | 'medium' | 'hard') => {
    let adjustment = 0;
    if (feedback === 'easy') adjustment = 1; // Easy -> next harder
    else if (feedback === 'hard') adjustment = -1; // Hard -> next easier
    else adjustment = 0; // Medium -> same

    updateUserProfile({ difficultyAdjustment: (userProfile.difficultyAdjustment || 0) + adjustment });
  };

  const assignMeal = (day: string, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipeId: string) => {
    setMealSchedule(prev => {
      const updated = {
        ...prev,
        [day]: { ...(prev[day] || {}), [slot]: recipeId }
      };
      if (currentUser) {
        syncCurrentUserToDb({ mealSchedule: updated });
      }
      return updated;
    });
  };

  const removeMeal = (day: string, slot: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setMealSchedule(prev => {
      const currentDay = { ...(prev[day] || {}) };
      delete currentDay[slot];
      const updated = { ...prev, [day]: currentDay };
      if (currentUser) {
        syncCurrentUserToDb({ mealSchedule: updated });
      }
      return updated;
    });
  };

  const markWorkoutComplete = (workoutId: string) => {
    setCompletedWorkoutIds(prev => {
      if (prev.includes(workoutId)) return prev;
      const updated = [...prev, workoutId];
      if (currentUser) {
        syncCurrentUserToDb({ completedWorkoutIds: updated });
      }
      return updated;
    });
  };

  const toggleHabit = (habitId: string) => {
    setHabits(prev => {
      const updated = prev.map(h => {
        if (h.id === habitId) {
          const newCompleted = !h.completed;
          return {
            ...h,
            completed: newCompleted,
            current: newCompleted ? h.target : Math.max(0, h.target - 1)
          };
        }
        return h;
      });
      if (currentUser) {
        syncCurrentUserToDb({ habits: updated });
      }
      return updated;
    });
  };

  const incrementWater = () => {
    setHabits(prev => {
      const updated = prev.map(h => {
        if (h.category === 'water') {
          const nextVal = Math.min(12, h.current + 1);
          return { ...h, current: nextVal, completed: nextVal >= h.target };
        }
        return h;
      });
      if (currentUser) {
        syncCurrentUserToDb({ habits: updated });
      }
      return updated;
    });
  };

  const decrementWater = () => {
    setHabits(prev => {
      const updated = prev.map(h => {
        if (h.category === 'water') {
          const nextVal = Math.max(0, h.current - 1);
          return { ...h, current: nextVal, completed: nextVal >= h.target };
        }
        return h;
      });
      if (currentUser) {
        syncCurrentUserToDb({ habits: updated });
      }
      return updated;
    });
  };

  // Custom Shopping List
  const [customShopping, setCustomShopping] = useState<ShoppingItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'custom_shopping');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem(STORAGE_PREFIX + 'checked_shopping');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {};
  });

  const derivedShoppingList: ShoppingItem[] = React.useMemo(() => {
    const itemMap = new Map<string, ShoppingItem>();

    Object.entries(mealSchedule).forEach(([, slots]) => {
      Object.values(slots).forEach(recipeId => {
        if (!recipeId) return;
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ing => {
            const key = ing.name.toLowerCase();
            if (!itemMap.has(key)) {
              itemMap.set(key, {
                ...ing,
                id: `ing-${key.replace(/\s+/g, '-')}`,
                recipeTitle: recipe.title,
                checked: !!checkedItems[`ing-${key.replace(/\s+/g, '-')}`]
              });
            }
          });
        }
      });
    });

    return [...Array.from(itemMap.values()), ...customShopping];
  }, [mealSchedule, recipes, customShopping, checkedItems]);

  const toggleShoppingItem = (id: string) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_PREFIX + 'checked_shopping', JSON.stringify(updated));
      return updated;
    });
    setCustomShopping(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const addCustomShoppingItem = (name: string, amount: string) => {
    if (!name.trim()) return;
    const newItem: ShoppingItem = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      amount: amount.trim() || '1 item',
      category: 'pantry',
      recipeTitle: 'Personal Item',
      checked: false
    };
    setCustomShopping(prev => {
      const updated = [newItem, ...prev];
      localStorage.setItem(STORAGE_PREFIX + 'custom_shopping', JSON.stringify(updated));
      return updated;
    });
  };

  const clearCheckedShoppingItems = () => {
    setCheckedItems({});
    localStorage.removeItem(STORAGE_PREFIX + 'checked_shopping');
    setCustomShopping(prev => {
      const filtered = prev.filter(item => !item.checked);
      localStorage.setItem(STORAGE_PREFIX + 'custom_shopping', JSON.stringify(filtered));
      return filtered;
    });
  };

  // Daily Logs / Journal
  const todayStr = new Date().toISOString().split('T')[0];
  const todayLog = dailyLogs.find(l => l.date === todayStr) || {
    date: todayStr,
    energyLevel: 4,
    mood: 'good' as const,
    workoutCompleted: completedWorkoutIds.length > 0,
    habits: habits.reduce((acc, h) => ({ ...acc, [h.id]: h.completed }), {}),
    journalNote: '',
    waterGlasses: habits.find(h => h.category === 'water')?.current || 6
  };

  const saveJournalEntry = (energy: number, mood: DailyLog['mood'], note: string) => {
    setDailyLogs(prev => {
      const existingIdx = prev.findIndex(l => l.date === todayStr);
      const newEntry: DailyLog = {
        date: todayStr,
        energyLevel: energy,
        mood,
        workoutCompleted: completedWorkoutIds.length > 0,
        habits: habits.reduce((acc, h) => ({ ...acc, [h.id]: h.completed }), {}),
        journalNote: note,
        waterGlasses: habits.find(h => h.category === 'water')?.current || 6
      };

      let updated: DailyLog[];
      if (existingIdx >= 0) {
        updated = [...prev];
        updated[existingIdx] = newEntry;
      } else {
        updated = [newEntry, ...prev];
      }
      if (currentUser) {
        syncCurrentUserToDb({ dailyLogs: updated });
      }
      return updated;
    });
  };

  const triggerCelebration = () => {
    // Celebration poppers disabled across website
  };

  const t = (key: string): string => {
    let text = key;
    if (TRANSLATIONS[key]) {
      text = TRANSLATIONS[key][language] || TRANSLATIONS[key].en;
    }
    return language === 'ur' ? toUrduDigits(text) : text;
  };

  const toUrduDigitsBound = (val: string | number | null | undefined): string => {
    return toUrduDigits(val);
  };

  const formatNumberBound = (val: string | number | null | undefined): string => {
    return formatNumber(val, language);
  };

  const formatUnitBound = (val: string | number | null | undefined, unit: string): string => {
    return formatUnit(val, unit, language);
  };

  const formatDayNameBound = (day: string): string => {
    return formatDayName(day, language);
  };

  const formatMealSlotBound = (slot: string): string => {
    return formatMealSlot(slot, language);
  };

  const formatDateUrduBound = (dateInput?: string | Date): string => {
    return formatDateUrdu(dateInput);
  };

  const loadAhmedDemo = () => {
    login('ahmed.fitness@gmail.com', 'password123');
    setIsAhmedModalOpen(true);
  };

  const resetAllData = () => {
    localStorage.clear();
    setUsersDb({
      'ahmed.fitness@gmail.com': SEED_AHMED_ACCOUNT
    });
    setCurrentUser(null);
    setUserProfile(AHMED_DEFAULT_PROFILE);
    setCompletedWorkoutIds([]);
    setHabits(INITIAL_HABITS);
    setCheckedItems({});
    setCustomShopping([]);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        signUp,
        login,
        loginWithGoogle,
        logout,
        isAuthScreenOpen,
        setIsAuthScreenOpen,
        activeTab,
        setActiveTab,
        language,
        setLanguage,
        lowDataMode,
        setLowDataMode,
        userProfile,
        updateUserProfile,
        recipes,
        mealSchedule,
        assignMeal,
        removeMeal,
        shoppingList: derivedShoppingList,
        toggleShoppingItem,
        addCustomShoppingItem,
        clearCheckedShoppingItems,
        workoutSessions,
        completedWorkoutIds,
        markWorkoutComplete,
        habits,
        toggleHabit,
        incrementWater,
        decrementWater,
        dailyLogs,
        todayLog,
        saveJournalEntry,
        t,
        toUrduDigits: toUrduDigitsBound,
        formatNumber: formatNumberBound,
        formatUnit: formatUnitBound,
        formatDayName: formatDayNameBound,
        formatMealSlot: formatMealSlotBound,
        formatDateUrdu: formatDateUrduBound,
        loadAhmedDemo,
        resetAllData,
        isAhmedModalOpen,
        setIsAhmedModalOpen,
        isAIChatModalOpen,
        setIsAIChatModalOpen,
        difficultyModifier: userProfile.difficultyAdjustment || 0,
        applyWorkoutFeedback,
        triggerCelebration
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
