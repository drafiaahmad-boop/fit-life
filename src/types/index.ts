export type Language = 'en' | 'ur';

export type GoalType = 'fitness' | 'strength' | 'stamina' | 'habits';
export type LocationType = 'home' | 'gym';
export type ExperienceLevel = 'beginner' | 'intermediate';
export type FoodPreference = 'pakistani' | 'continental' | 'vegetarian' | 'high-protein' | 'all';
export type BudgetLevel = 'budget' | 'moderate' | 'flexible';

export interface UserProfile {
  name: string;
  age: number;
  goal: GoalType;
  location: LocationType;
  level: ExperienceLevel;
  foodPreference: FoodPreference;
  budget: BudgetLevel;
  timePerDayMinutes: number;
  dietaryRestrictions: string[];
  allergies: string[];
  dislikedFoods: string[];
  selectedWorkoutDays?: string[];
  workoutTimePeriod?: string;
  goalNotes?: string;
  locationNotes?: string;
  levelNotes?: string;
  foodNotes?: string;
  budgetNotes?: string;
  timeNotes?: string;
  dietaryNotes?: string;
  workoutDaysNotes?: string;
  workoutTimeNotes?: string;
  isCustomized: boolean;
  difficultyAdjustment: number;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  password?: string;
  provider: 'password' | 'google';
  createdAt: string;
  hasCompletedPlanSetup: boolean;
  planProfile: UserProfile;
  mealSchedule: Record<string, { breakfast?: string; lunch?: string; dinner?: string; snack?: string }>;
  completedWorkoutIds: string[];
  habits: HabitItem[];
  dailyLogs: DailyLog[];
}

export interface Ingredient {
  name: string;
  urduName?: string;
  amount: string;
  category: 'produce' | 'pantry' | 'protein' | 'dairy' | 'spices';
  alternative?: string;
}

export interface Recipe {
  id: string;
  title: string;
  urduTitle: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  prepTimeMinutes: number;
  costPKR: number; // in Pakistani Rupees (e.g. 150 - 350 PKR)
  costUSD: number;
  isPakistani: boolean;
  isVegetarian: boolean;
  isBudgetFriendly: boolean;
  description: string;
  urduDescription: string;
  ingredients: Ingredient[];
  instructions: string[];
  urduInstructions?: string[];
  substitutions: { original: string; substitute: string; reason: string }[];
  healthTip: string;
  image: string;
}

export interface ExerciseItem {
  id: string;
  name: string;
  urduName: string;
  targetMuscles: string;
  equipment: 'none' | 'dumbbells' | 'resistance-band' | 'gym-machines';
  sets: number;
  repsOrSeconds: string;
  restSeconds: number;
  instructions: string[];
  beginnerAlternative: string;
  safetyTip: string;
  iconName?: string;
}

export interface WorkoutSession {
  id: string;
  dayNumber: number;
  dayName: string;
  title: string;
  urduTitle: string;
  focus: string;
  location: LocationType;
  durationMinutes: number;
  level: ExperienceLevel;
  warmUpMinutes: number;
  coolDownMinutes: number;
  isRestDay: boolean;
  restDayTip?: string;
  exercises: ExerciseItem[];
}

export interface HabitItem {
  id: string;
  title: string;
  urduTitle: string;
  category: 'water' | 'movement' | 'sleep' | 'nutrition' | 'mind';
  target: number;
  unit: string;
  current: number;
  completed: boolean;
  icon: string;
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  energyLevel: number; // 1-5
  mood: 'energized' | 'good' | 'tired' | 'stressed' | 'recovering';
  workoutCompleted: boolean;
  completedWorkoutId?: string;
  habits: { [habitId: string]: boolean };
  journalNote: string;
  waterGlasses: number;
}

export interface EducationArticle {
  id: string;
  title: string;
  urduTitle: string;
  category: 'recovery' | 'strength' | 'nutrition' | 'hydration' | 'myths';
  readTimeMinutes: number;
  summary: string;
  urduSummary: string;
  keyPoints: string[];
  practicalTakeaway: string;
  icon: string;
}

export interface FitnessMyth {
  id: string;
  myth: string;
  urduMyth: string;
  fact: string;
  urduFact: string;
  explanation: string;
  practicalRule: string;
}
