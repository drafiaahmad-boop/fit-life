import { Recipe, WorkoutSession, HabitItem, EducationArticle, FitnessMyth, UserProfile } from '../types';

export const AHMED_DEFAULT_PROFILE: UserProfile = {
  name: 'Ahmed',
  age: 26,
  goal: 'fitness',
  location: 'home',
  level: 'beginner',
  foodPreference: 'pakistani',
  budget: 'budget',
  timePerDayMinutes: 25,
  dietaryRestrictions: ['Halal'],
  allergies: [],
  dislikedFoods: [],
  selectedWorkoutDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
  workoutTimePeriod: 'Morning (7:00 AM - 8:00 AM)',
  isCustomized: true,
  difficultyAdjustment: 0,
};

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'rec-1',
    title: 'Protein-Packed Daal Tadka with Brown Rice',
    urduTitle: 'پروٹین سے بھرپور دال تڑکا بمعہ براؤن چاول',
    mealType: 'lunch',
    calories: 420,
    proteinGrams: 22,
    carbsGrams: 64,
    fatGrams: 7,
    prepTimeMinutes: 25,
    costPKR: 160,
    costUSD: 0.60,
    isPakistani: true,
    isVegetarian: true,
    isBudgetFriendly: true,
    description: 'Slow-simmered yellow moong and masoor lentils tempered with cumin, garlic, and fresh tomatoes. High in plant protein and dietary fiber.',
    urduDescription: 'مونگ اور مسور کی لذیذ دال، زیرے، لہسن اور ٹماٹر کے تڑکے کے ساتھ۔ پروٹین اور فائبر کا بہترین سستا ذریعہ۔',
    ingredients: [
      { name: 'Yellow Moong & Masoor Daal', urduName: 'مونگ و مسور دال', amount: '1 cup', category: 'pantry' },
      { name: 'Brown Rice or Whole Wheat Roti', urduName: 'براؤن چاول یا گندم کی روٹی', amount: '1 cup cooked or 1 roti', category: 'pantry' },
      { name: 'Garlic & Ginger paste', urduName: 'ادرک لہسن پیسٹ', amount: '1 tbsp', category: 'spices' },
      { name: 'Tomatoes & Onion', urduName: 'ٹماٹر اور پیاز', amount: '1 medium each', category: 'produce' },
      { name: 'Olive or Mustard Oil', urduName: 'سرصوں یا زیتون کا تیل', amount: '1 tsp (controlled)', category: 'pantry' },
      { name: 'Cumin seeds & Turmeric', urduName: 'زیرہ اور ہلدی', amount: '1/2 tsp each', category: 'spices' }
    ],
    instructions: [
      'Wash lentils thoroughly and boil with 3 cups water, turmeric, salt, and half the ginger-garlic paste for 18 minutes until tender.',
      'In a small non-stick pan, heat 1 tsp oil. Sauté cumin seeds, minced garlic, chopped onion, and tomato until aromatic.',
      'Pour the fragrant tadka over the simmered daal, mix well, and garnish with fresh cilantro.',
      'Serve alongside steamed brown rice or 1 warm whole-wheat roti with sliced cucumbers.'
    ],
    urduInstructions: [
      'دال کو اچھی طرح دھو کر پانی، نمک اور ہلدی کے ساتھ 18 منٹ تک ابالیں۔',
      'چھوٹے پین میں 1 چمچ تیل گرم کریں، زیرہ، کٹا ہوا لہسن، پیاز اور ٹماٹر بھونیں۔',
      'تڑکا دال کے اوپر ڈالیں اور تازہ دھنیا سے سجائیں۔',
      'براؤن چاول یا گندم کی روٹی اور کھیرے کے ساتھ پیش کریں۔'
    ],
    substitutions: [
      { original: 'Brown Rice', substitute: '1 Whole Wheat Roti (Chapati)', reason: 'Lower glycemic index and readily available in every household.' },
      { original: 'Ghee', substitute: '1 tsp Mustard or Olive Oil', reason: 'Reduces saturated fats while keeping the signature aroma.' }
    ],
    healthTip: 'Pairing lentils with whole grains (rice or roti) forms a complete amino acid profile for muscle recovery.',
    image: '/assets/aistudio/image_39f26ab9.png'
  },
  {
    id: 'rec-2',
    title: 'Desi Masala Egg Scramble (Anda Bhurji) with Roti',
    urduTitle: 'دیسی انڈا بھرجی بمعہ گرم روٹی',
    mealType: 'breakfast',
    calories: 360,
    proteinGrams: 24,
    carbsGrams: 32,
    fatGrams: 14,
    prepTimeMinutes: 12,
    costPKR: 140,
    costUSD: 0.50,
    isPakistani: true,
    isVegetarian: true,
    isBudgetFriendly: true,
    description: 'Wholesome eggs scrambled with finely chopped onions, green chilies, tomatoes, and fresh coriander. Served with a light whole-grain chapati.',
    urduDescription: 'انڈے، باریک کٹی پیاز، ہری مرچ، ٹماٹر اور ہرے دھنیے سے تیار کردہ طاقت بخش ناشتہ۔',
    ingredients: [
      { name: 'Whole Eggs', urduName: 'انڈے', amount: '2 whole + 1 egg white', category: 'protein' },
      { name: 'Chopped Onion & Tomato', urduName: 'پیاز اور ٹماٹر', amount: '1/2 cup finely diced', category: 'produce' },
      { name: 'Green Chili & Fresh Coriander', urduName: 'ہری مرچ اور دھنیا', amount: '1 chili, 2 tbsp coriander', category: 'produce' },
      { name: 'Whole Wheat Chapati', urduName: 'گندم کی پھلکا روٹی', amount: '1 medium (no extra oil)', category: 'pantry' },
      { name: 'Turmeric, Salt, Black Pepper', urduName: 'ہلدی، نمک، کالی مرچ', amount: 'pinch each', category: 'spices' }
    ],
    instructions: [
      'Whisk 2 whole eggs and 1 egg white in a bowl with a pinch of turmeric and salt.',
      'Sauté onions and green chilies in a light non-stick pan with minimal spray/oil until translucent.',
      'Add tomatoes and stir for 2 minutes. Pour the beaten eggs over the mixture.',
      'Scramble gently on low flame for 3 minutes until soft and fluffy. Garnish with chopped coriander and black pepper.',
      'Serve warm with 1 homemade whole-wheat chapati.'
    ],
    substitutions: [
      { original: 'Whole Wheat Roti', substitute: '2 Slices of Bran / Multigrain Bread', reason: 'Easy quick grab option if you do not have time to make fresh roti.' }
    ],
    healthTip: 'Starting your morning with 24g of protein stabilizes blood sugar and stops mid-day sugary cravings.',
    image: '/assets/aistudio/image_39f26ab9.png'
  },
  {
    id: 'rec-3',
    title: 'Herb & Spiced Grilled Chicken Boti with Kachumber',
    urduTitle: 'گرلڈ چکن بوٹی بمعہ تروتازہ کچومر سلاد',
    mealType: 'dinner',
    calories: 450,
    proteinGrams: 38,
    carbsGrams: 35,
    fatGrams: 12,
    prepTimeMinutes: 30,
    costPKR: 320,
    costUSD: 1.15,
    isPakistani: true,
    isVegetarian: false,
    isBudgetFriendly: true,
    description: 'Juicy, yogurt and tandoori-marinated chicken breast cubes pan-seared or grilled, accompanied by crisp cucumber, onion, and mint kachumber.',
    urduDescription: 'دہی اور مصالحوں میں میرینیٹ شدہ چکن بوٹی، کچومر سلاد اور پودینے کی چٹنی کے ساتھ۔',
    ingredients: [
      { name: 'Skinless Chicken Breast Cubes', urduName: 'چکن بون لیس بوٹی', amount: '180 grams', category: 'protein' },
      { name: 'Low-Fat Yogurt (Dahi)', urduName: 'کم چکنائی دہی', amount: '3 tbsp', category: 'dairy' },
      { name: 'Lemon Juice & Ginger Garlic', urduName: 'لیمو کا رس اور ادرک لہسن', amount: '1 tbsp each', category: 'spices' },
      { name: 'Kachumber Salad (Cucumber, Onion, Tomato)', urduName: 'کچومر سلاد', amount: '1 generous bowl', category: 'produce' },
      { name: 'Whole Wheat Roti', urduName: 'روٹی', amount: '1 medium', category: 'pantry' }
    ],
    instructions: [
      'Marinate chicken cubes with yogurt, lemon juice, ginger-garlic paste, cumin, and red chili powder for 15-20 minutes.',
      'Heat a non-stick grill pan with 1/2 tsp oil. Cook chicken cubes for 5-6 minutes on each side until charred and tender.',
      'Toss cucumbers, diced tomatoes, red onion, and chopped mint with lemon juice and black salt for the fresh kachumber.',
      'Plate with 1 hot chapati or brown basmati rice.'
    ],
    substitutions: [
      { original: 'Chicken Breast', substitute: 'Firm Tofu or Paneer or Boiled Chickpeas', reason: 'High protein vegetarian alternative that absorbs marinades wonderfully.' }
    ],
    healthTip: 'High-protein dinners promote muscle synthesis during nighttime REM sleep cycles.',
    image: '/assets/aistudio/image_39f26ab9.png'
  },
  {
    id: 'rec-4',
    title: 'Budget Chana Masala (Chickpeas) with Steamed Rice',
    urduTitle: 'بجٹ فرینڈلی چنا مصالحہ بمعہ ابلے چاول',
    mealType: 'lunch',
    calories: 430,
    proteinGrams: 18,
    carbsGrams: 68,
    fatGrams: 8,
    prepTimeMinutes: 20,
    costPKR: 150,
    costUSD: 0.55,
    isPakistani: true,
    isVegetarian: true,
    isBudgetFriendly: true,
    description: 'Richly spiced white chickpeas cooked in an onion-tomato gravy with garam masala. Cost-effective, shelf-stable, and extraordinarily satisfying.',
    urduDescription: 'سفید چنے، ٹماٹر اور گرم مصالحے کا لذیذ سالن۔ سستا، غذائیت سے بھرپور اور پیٹ بھرنے والا کھانا۔',
    ingredients: [
      { name: 'Boiled White Chickpeas (Safaid Chana)', urduName: 'ابلے سفید چنے', amount: '1.5 cups', category: 'pantry' },
      { name: 'Tomatoes & Onion gravy', urduName: 'ٹماٹر و پیاز گریوی', amount: '1 cup', category: 'produce' },
      { name: 'Garam Masala, Coriander, Chili Powder', urduName: 'گرم مصالحہ، دھنیا، لال مرچ', amount: '1 tsp total', category: 'spices' },
      { name: 'Steamed Rice', urduName: 'ابلے چاول', amount: '1 cup', category: 'pantry' }
    ],
    instructions: [
      'In a pot, sauté finely sliced onion and ginger-garlic paste until light golden.',
      'Add pureed tomatoes, salt, turmeric, and coriander powder; cook until oil faintly surfaces.',
      'Add boiled chickpeas with 1/2 cup chickpea broth. Simmer for 10 minutes, lightly mashing a few chickpeas for rich gravy.',
      'Sprinkle freshly ground garam masala and fresh coriander leaves before serving with rice.'
    ],
    substitutions: [
      { original: 'White Chickpeas', substitute: 'Black Chickpeas (Kala Chana)', reason: 'Even higher in iron and dietary fiber, traditional budget hero.' }
    ],
    healthTip: 'Chickpeas provide sustained low-GI carbohydrates that keep energy steady all afternoon.',
    image: '/assets/aistudio/image_39f26ab9.png'
  },
  {
    id: 'rec-5',
    title: 'Cardamom & Cinnamon Rolled Oats with Chia & Apple',
    urduTitle: 'دار چینی و الائچی دلیہ بمعہ سیب و چیا بیج',
    mealType: 'breakfast',
    calories: 340,
    proteinGrams: 14,
    carbsGrams: 55,
    fatGrams: 6,
    prepTimeMinutes: 10,
    costPKR: 130,
    costUSD: 0.45,
    isPakistani: true,
    isVegetarian: true,
    isBudgetFriendly: true,
    description: 'Warm cooked rolled oats flavored with crushed green cardamom, cinnamon, local seasonal sliced fruit, and chia seeds for slow-release energy.',
    urduDescription: 'سبز الائچی اور دار چینی کی خوشبو والا اوٹس دلیہ، موسمی پھل اور تخم ملنگا/چیا بیج کے ساتھ۔',
    ingredients: [
      { name: 'Rolled Oats (Daliya)', urduName: 'اوٹس یا جو کا دلیہ', amount: '1/2 cup', category: 'pantry' },
      { name: 'Milk or Water blend', urduName: 'دودھ یا پانی', amount: '1 cup', category: 'dairy' },
      { name: 'Green Cardamom & Cinnamon', urduName: 'سبز الائچی و دار چینی', amount: '1 pod crushed, pinch cinnamon', category: 'spices' },
      { name: 'Sliced Apple or Seasonal Banana', urduName: 'سیب یا کیلا', amount: '1/2 fruit', category: 'produce' },
      { name: 'Chia Seeds / Tukhm-e-Balanga', urduName: 'تخم ملنگا یا چیا بیج', amount: '1 tsp', category: 'pantry' }
    ],
    instructions: [
      'In a small pan, simmer oats with milk/water and crushed cardamom for 5-6 minutes until creamy.',
      'Transfer to bowl. Top with freshly sliced fruit, a dash of cinnamon, and soaked chia seeds.'
    ],
    substitutions: [
      { original: 'Chia Seeds', substitute: 'Tukhm-e-Balanga (Basil Seeds)', reason: 'Local, highly economical, soothing for gut and digestion.' }
    ],
    healthTip: 'Beta-glucan fiber in oats lowers bad LDL cholesterol and provides steady morning focus.',
    image: '/assets/aistudio/image_39f26ab9.png'
  },
  {
    id: 'rec-6',
    title: 'Roasted Chana & Almond Energy Snack',
    urduTitle: 'بھنے چنے اور بادام کا صحت بخش اسنیک',
    mealType: 'snack',
    calories: 190,
    proteinGrams: 10,
    carbsGrams: 22,
    fatGrams: 7,
    prepTimeMinutes: 3,
    costPKR: 80,
    costUSD: 0.30,
    isPakistani: true,
    isVegetarian: true,
    isBudgetFriendly: true,
    description: 'Crunchy dry-roasted chickpeas (bhunay chana) mixed with 6 raw almonds and a pinch of chaat masala. Zero prep, maximum crunch and protein.',
    urduDescription: 'کرکرے بھنے ہوئے چنے، 6 بادام اور چاٹ مصالحہ۔ بغیر پکائے بہترین پروٹین اسنیک۔',
    ingredients: [
      { name: 'Roasted Yellow Gram (Bhunay Chana)', urduName: 'بھنے چنے', amount: '1/2 cup (40g)', category: 'pantry' },
      { name: 'Almonds', urduName: 'بادام', amount: '6 pieces', category: 'pantry' },
      { name: 'Chaat Masala', urduName: 'چاٹ مصالحہ', amount: 'small pinch', category: 'spices' }
    ],
    instructions: [
      'Mix roasted chana and almonds in a small bowl or container.',
      'Dust with a tiny sprinkle of chaat masala for tangy taste. Enjoy with green tea or plain water.'
    ],
    substitutions: [
      { original: 'Almonds', substitute: 'Roasted Peanuts (Mungphali)', reason: 'Super budget-friendly and packed with healthy monounsaturated fats.' }
    ],
    healthTip: 'High-fiber crunch keeps you full between meals without reaching for deep-fried samosas or biscuits.',
    image: '/assets/aistudio/image_39f26ab9.png'
  }
];

export const INITIAL_WORKOUTS: WorkoutSession[] = [
  {
    id: 'wk-1',
    dayNumber: 1,
    dayName: 'Monday',
    title: 'Beginner Full-Body Foundation & Core',
    urduTitle: 'ابتدائی فل باڈی اور کور بنیاد',
    focus: 'Total Body Mobility, Strength & Joint Health',
    location: 'home',
    durationMinutes: 20,
    level: 'beginner',
    warmUpMinutes: 4,
    coolDownMinutes: 3,
    isRestDay: false,
    exercises: [
      {
        id: 'ex-1',
        name: 'Chair Squats (or Bodyweight Squats)',
        urduName: 'کرسی کے سہارے اسکواٹس',
        targetMuscles: 'Quadriceps, Glutes, Hamstrings',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '10-12 reps',
        restSeconds: 60,
        instructions: [
          'Stand in front of a sturdy chair with feet shoulder-width apart.',
          'Hinge hips back and bend knees smoothly until your thighs touch the chair seat.',
          'Press through heels to stand upright, squeezing glutes at the top without locking knees.'
        ],
        beginnerAlternative: 'Use a higher chair or hold a doorway for light balance assistance.',
        safetyTip: 'Keep chest upright and ensure knees track in line with your toes, never caving inward.',
        iconName: 'Footprints'
      },
      {
        id: 'ex-2',
        name: 'Incline Wall or Countertop Push-Ups',
        urduName: 'دیوار کے سہارے پش اپس',
        targetMuscles: 'Chest, Shoulders, Triceps, Core',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '8-10 reps',
        restSeconds: 60,
        instructions: [
          'Place hands shoulder-width apart against a firm wall or sturdy kitchen counter.',
          'Step feet back so your body forms a straight diagonal line from heels to head.',
          'Lower your chest towards the wall slowly with elbows at 45 degrees, then push away firmly.'
        ],
        beginnerAlternative: 'Stand closer to the wall to reduce angle and resistance.',
        safetyTip: 'Keep core engaged like a plank; avoid arching or sagging lower back.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'ex-3',
        name: 'Glute Bridges on Mat',
        urduName: 'فرش پر پل جیسی ورزش (گلوٹ برج)',
        targetMuscles: 'Glutes, Hamstrings, Lower Back stability',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '12 reps',
        restSeconds: 45,
        instructions: [
          'Lie flat on back with knees bent and feet flat on floor, hip-width apart.',
          'Press into your heels and lift hips until shoulders, hips, and knees form a straight line.',
          'Hold at the top for 2 seconds, squeeze glutes, then lower slowly.'
        ],
        beginnerAlternative: 'Keep range of motion smaller if tight in hip flexors.',
        safetyTip: 'Do not hyperextend your lower back at the peak.',
        iconName: 'Activity'
      },
      {
        id: 'ex-4',
        name: 'Standing High Knees & Marching',
        urduName: 'کھڑے ہو کر گھٹنے اوپر اٹھانا',
        targetMuscles: 'Cardiovascular stamina, Hip flexors',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '35 seconds',
        restSeconds: 45,
        instructions: [
          'Stand tall with elbows bent at 90 degrees.',
          'March rhythmically in place, bringing knees up towards waist height.',
          'Maintain a steady breathing pace.'
        ],
        beginnerAlternative: 'Gentle low-impact marching without hopping.',
        safetyTip: 'Land softly on the balls of your feet to protect ankle and knee joints.',
        iconName: 'Flame'
      }
    ]
  },
  {
    id: 'wk-2',
    dayNumber: 2,
    dayName: 'Tuesday',
    title: 'Active Recovery & Gentle Walking',
    urduTitle: 'ہلکی چہل قدمی اور ریکوری',
    focus: 'Low-impact movement, mental reset & circulation',
    location: 'home',
    durationMinutes: 20,
    level: 'beginner',
    warmUpMinutes: 2,
    coolDownMinutes: 2,
    isRestDay: true,
    restDayTip: 'Active rest accelerates recovery! Take a 15-20 min brisk outdoor walk or gentle stretching around the house. Stay well hydrated today.',
    exercises: [
      {
        id: 'ex-rec-1',
        name: 'Brisk Outdoor or Living Room Walk',
        urduName: 'تیز چہل قدمی',
        targetMuscles: 'Cardiovascular heart health, calf pumps',
        equipment: 'none',
        sets: 1,
        repsOrSeconds: '15-20 minutes',
        restSeconds: 0,
        instructions: ['Maintain a comfortable conversational pace, swinging arms gently and breathing through nose.'],
        beginnerAlternative: 'Break into two 10-minute short walks after meals.',
        safetyTip: 'Wear supportive comfortable footwear.',
        iconName: 'Footprints'
      },
      {
        id: 'ex-rec-2',
        name: 'Neck & Shoulder Rolls with Deep Breaths',
        urduName: 'گردن اور کندھوں کا مساج و اسٹریچ',
        targetMuscles: 'Trapezius, Cervical spine mobility',
        equipment: 'none',
        sets: 2,
        repsOrSeconds: '8 rolls each direction',
        restSeconds: 30,
        instructions: ['Slowly roll shoulders backwards and forwards while inhaling deeply through nose.'],
        beginnerAlternative: 'Seated in a comfortable upright chair.',
        safetyTip: 'Never roll neck quickly; move smoothly with breath.',
        iconName: 'Smile'
      }
    ]
  },
  {
    id: 'wk-3',
    dayNumber: 3,
    dayName: 'Wednesday',
    title: 'Upper Body & Posture Alignment',
    urduTitle: 'اوپری جسم کی ورزش اور بہتر انداز',
    focus: 'Back strength, posture correction, arm endurance',
    location: 'home',
    durationMinutes: 25,
    level: 'beginner',
    warmUpMinutes: 4,
    coolDownMinutes: 3,
    isRestDay: false,
    exercises: [
      {
        id: 'ex-5',
        name: 'Doorway Chest & Pec Opener Stretch',
        urduName: 'دروازے کے فریم میں سینے کا اسٹریچ',
        targetMuscles: 'Chest, Anterior Deltoids, Posture',
        equipment: 'none',
        sets: 2,
        repsOrSeconds: '30 seconds hold',
        restSeconds: 30,
        instructions: [
          'Stand in an open doorway with arms on the door frame at 90 degrees.',
          'Gently step forward until you feel a comfortable stretch across chest and shoulders.'
        ],
        beginnerAlternative: 'Hands slightly lower down the doorway.',
        safetyTip: 'Stretch gently; never push to the point of joint pain.',
        iconName: 'ShieldAlert'
      },
      {
        id: 'ex-6',
        name: 'Towel or Water Bottle Rows',
        urduName: 'تولیہ یا پانی کی بوتل سے کمر کی روئنگ',
        targetMuscles: 'Upper back (Rhomboids, Lats), Biceps',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '12 reps',
        restSeconds: 60,
        instructions: [
          'Hinge forward at hips with knees soft and flat back.',
          'Hold two filled water bottles (or pull tension on a towel).',
          'Drive elbows back towards your hips, squeezing shoulder blades together.'
        ],
        beginnerAlternative: 'Sit upright and focus on isometric shoulder-blade squeezes.',
        safetyTip: 'Keep lower back neutral and neck aligned with spine.',
        iconName: 'Dumbbell'
      },
      {
        id: 'ex-7',
        name: 'Modified Knee Plank Hold',
        urduName: 'گھٹنوں پر تختی نما پلانک ہولڈ',
        targetMuscles: 'Transverse Abdominis, Core, Shoulders',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '20-30 seconds',
        restSeconds: 45,
        instructions: [
          'Rest on forearms and knees with hips tucked and abs pulled towards spine.',
          'Breathe continuously without holding your breath.'
        ],
        beginnerAlternative: 'Forearms resting on a couch or sturdy tabletop.',
        safetyTip: 'Avoid sagging lower back or hiking hips too high.',
        iconName: 'Activity'
      }
    ]
  },
  {
    id: 'wk-4',
    dayNumber: 4,
    dayName: 'Thursday',
    title: 'Mindful Rest & Hydration Day',
    urduTitle: 'مکمل آرام اور پانی پینے کا دن',
    focus: 'Cellular recovery, deep sleep, tissue rebuilding',
    location: 'home',
    durationMinutes: 10,
    level: 'beginner',
    warmUpMinutes: 0,
    coolDownMinutes: 0,
    isRestDay: true,
    restDayTip: 'Rest is not wasted time; it is when muscle tissue repairs and stamina solidifies. Focus on drinking 8-10 glasses of water and getting 8 hours of restorative sleep.',
    exercises: []
  },
  {
    id: 'wk-5',
    dayNumber: 5,
    dayName: 'Friday',
    title: 'Lower Body Strength & Balance',
    urduTitle: 'ٹانگوں کی مضبوطی اور توازن',
    focus: 'Leg endurance, balance stabilization, knee protection',
    location: 'home',
    durationMinutes: 25,
    level: 'beginner',
    warmUpMinutes: 4,
    coolDownMinutes: 3,
    isRestDay: false,
    exercises: [
      {
        id: 'ex-8',
        name: 'Step-Ups (Stair or Sturdy Box)',
        urduName: 'سیڑھی پر قدم چڑھنا',
        targetMuscles: 'Quadriceps, Glutes, Calves',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '8 reps per leg',
        restSeconds: 60,
        instructions: [
          'Place whole foot on bottom step of a staircase.',
          'Push through mid-foot and heel to step up, balancing lightly.',
          'Step back down with control.'
        ],
        beginnerAlternative: 'Hold wall handrail for stability.',
        safetyTip: 'Ensure knee does not wobble inward during the ascent.',
        iconName: 'Footprints'
      },
      {
        id: 'ex-9',
        name: 'Standing Calf Raises',
        urduName: 'پنڈلی کی ورزش (کاف ریز)',
        targetMuscles: 'Gastrocnemius, Soleus (Calves)',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '15 reps',
        restSeconds: 45,
        instructions: [
          'Stand near a wall with fingertips touching for balance.',
          'Rise up onto the balls of your feet, pause for 1 second at apex, then lower slowly.'
        ],
        beginnerAlternative: 'Perform seated calf raises while pressing down on thighs.',
        safetyTip: 'Lower with control; do not bounce off Achilles tendon.',
        iconName: 'Activity'
      },
      {
        id: 'ex-10',
        name: 'Bird-Dog Spinal Balance',
        urduName: 'ہاتھ اور پاؤں سیدھا کرنے والی توازن ورزش',
        targetMuscles: 'Erector Spinae, Core, Glutes',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '6 reps per side',
        restSeconds: 45,
        instructions: [
          'Start on hands and knees (tabletop position).',
          'Simultaneously reach right arm forward and left leg backward until level with torso.',
          'Hold 1 second, return with control, and switch sides.'
        ],
        beginnerAlternative: 'Lift only legs first, then introduce arms later.',
        safetyTip: 'Keep hips square to floor without twisting hips.',
        iconName: 'Smile'
      }
    ]
  },
  {
    id: 'wk-6',
    dayNumber: 6,
    dayName: 'Saturday',
    title: 'Energizing Cardio & Rhythm Flow',
    urduTitle: 'توانائی بخش کارڈیو اور جسمانی لچک',
    focus: 'Lung capacity, mood elevation, lymphatic flow',
    location: 'home',
    durationMinutes: 20,
    level: 'beginner',
    warmUpMinutes: 3,
    coolDownMinutes: 3,
    isRestDay: false,
    exercises: [
      {
        id: 'ex-11',
        name: 'Low-Impact Step Jacks',
        urduName: 'ہلکی چھلانگ کے بغیر قدمی جیمز',
        targetMuscles: 'Heart rate, Deltoids, Adductors',
        equipment: 'none',
        sets: 3,
        repsOrSeconds: '40 seconds',
        restSeconds: 45,
        instructions: [
          'Step right foot out while raising arms overhead, step back to center.',
          'Step left foot out while raising arms overhead. Keep knees soft and springy.'
        ],
        beginnerAlternative: 'Move arms only to chest height if shoulders feel fatigued.',
        safetyTip: 'Gentle on joints compared to traditional jumping jacks.',
        iconName: 'Flame'
      },
      {
        id: 'ex-12',
        name: 'Standing Torso Twists & Side Stretches',
        urduName: 'کمر کی نرم گردش اور سائیڈ اسٹریچ',
        targetMuscles: 'Obliques, Thoracic Spine',
        equipment: 'none',
        sets: 2,
        repsOrSeconds: '12 smooth reps per side',
        restSeconds: 30,
        instructions: [
          'With feet shoulder-width, gently rotate upper torso from side to side with relaxed arms.',
          'Finish with reaching one arm overhead for a gentle side bend.'
        ],
        beginnerAlternative: 'Done seated in a chair.',
        safetyTip: 'Move slowly without jerking spine.',
        iconName: 'Smile'
      }
    ]
  },
  {
    id: 'wk-7',
    dayNumber: 7,
    dayName: 'Sunday',
    title: 'Weekly Reflection & Full Body Mobility',
    urduTitle: 'ہفتہ وار جائزہ اور لچکدار اسٹریچنگ',
    focus: 'Total body de-stress, preparation for upcoming week',
    location: 'home',
    durationMinutes: 15,
    level: 'beginner',
    warmUpMinutes: 2,
    coolDownMinutes: 2,
    isRestDay: true,
    restDayTip: 'Congratulations on finishing the week! Today, check your weekly habit consistency on your dashboard and prep healthy groceries for next week.',
    exercises: []
  }
];

export const INITIAL_HABITS: HabitItem[] = [
  {
    id: 'hab-1',
    title: 'Drink 2.5 Liters of Water',
    urduTitle: '2.5 لیٹر پانی پئیں (8 گلاس)',
    category: 'water',
    target: 8,
    unit: 'glasses',
    current: 5,
    completed: false,
    icon: 'Droplets'
  },
  {
    id: 'hab-2',
    title: 'Daily 20-30 Min Movement',
    urduTitle: 'روزانہ 20 سے 30 منٹ ورزش یا چہل قدمی',
    category: 'movement',
    target: 25,
    unit: 'mins',
    current: 20,
    completed: true,
    icon: 'Flame'
  },
  {
    id: 'hab-3',
    title: '7+ Hours Restful Sleep',
    urduTitle: '7 گھنٹے پرسکون نیند',
    category: 'sleep',
    target: 7,
    unit: 'hours',
    current: 7.5,
    completed: true,
    icon: 'Moon'
  },
  {
    id: 'hab-4',
    title: 'Eat 3 Balanced Meals with Protein',
    urduTitle: 'پروٹین سے بھرپور 3 متوازن کھانے',
    category: 'nutrition',
    target: 3,
    unit: 'meals',
    current: 2,
    completed: false,
    icon: 'Utensils'
  },
  {
    id: 'hab-5',
    title: 'Post-Meal 10 Min Stroll',
    urduTitle: 'کھانے کے بعد 10 منٹ چہل قدمی',
    category: 'movement',
    target: 2,
    unit: 'times',
    current: 2,
    completed: true,
    icon: 'Footprints'
  }
];

export const FITNESS_MYTHS: FitnessMyth[] = [
  {
    id: 'myth-1',
    myth: 'Pakistani food is naturally unhealthy and causes weight gain.',
    urduMyth: 'دیسی اور پاکستانی کھانا صحت کے لیے نقصان دہ ہے اور وزن بڑھاتا ہے۔',
    fact: 'Traditional Pakistani staples like lentils (daal), chickpeas, vegetables (sabzi), whole wheat roti, and lean meats are incredible nutritional powerhouses.',
    urduFact: 'دالیں، چنے، تازہ سبزیاں اور دیسی گندم کی روٹی دنیا کے بہترین متوازن کھانوں میں شمار ہوتے ہیں۔',
    explanation: 'The real culprit in commercial dishes is excessive palm oil/ghee (tari) and oversized servings of refined white flour naans. By simply measuring oil (1-2 tsp per portion) and keeping whole-grain roti, Pakistani food is affordable, culturally comforting, and nutritionally elite.',
    practicalRule: 'Control cooking oil with a spoon instead of pouring directly from the can, and always include a fresh kachumber salad.'
  },
  {
    id: 'myth-2',
    myth: 'Cardio is the only way to lose fat; lifting weights makes beginners bulky.',
    urduMyth: 'وزن کم کرنے کا واحد طریقہ صرف کارڈیو یا دوڑنا ہے، وزن اٹھانے سے جسم بھاری ہو جاتا ہے۔',
    fact: 'Strength training burns calories, strengthens bone density, improves joint protection, and boosts metabolic rate 24/7.',
    urduFact: 'طاقت کی ورزش ہڈیوں اور جوڑوں کو مضبوط بناتی ہے اور چربی گھلانے کی رفتار تیز کرتی ہے۔',
    explanation: 'Building large muscle mass requires years of surplus calories and extreme heavy training. For everyday men and women, bodyweight movements and light resistance tone the body and protect against posture-related back pain.',
    practicalRule: 'Combine 2-3 short bodyweight or strength sessions each week with your daily walks.'
  },
  {
    id: 'myth-3',
    myth: 'Skipping breakfast or starving yourself is the fastest route to fitness.',
    urduMyth: 'ناشتہ چھوڑنا یا بھوکا رہنا تیزی سے وزن کم کرنے کا حل ہے۔',
    fact: 'Severe starvation slows down thyroid metabolic rate, causes muscle loss, and leads to uncontrollable evening binge-eating.',
    urduFact: 'زیادہ دیر بھوکا رہنے سے میٹابولزم سست ہو جاتا ہے اور پٹھے کمزور ہوتے ہیں۔',
    explanation: 'Your body needs consistent fuel to sustain energy for workouts, work, and immune defence. Sustainable eating creates steady energy instead of dramatic crashes.',
    practicalRule: 'Focus on balanced meals with protein (eggs, daal, yogurt, chicken) and fiber rather than crash diets.'
  },
  {
    id: 'myth-4',
    myth: '"No Pain, No Gain" — Workouts must leave you sore and exhausted to work.',
    urduMyth: 'جب تک شدید درد نہ ہو، ورزش کا کوئی فائدہ نہیں ہوتا۔',
    fact: 'Productive exercise creates mild muscular challenge, not crippling joint pain or exhaustion.',
    urduFact: 'مفید ورزش سے ہلکی تھکن اور تازگی آنی چاہیے، جوڑوں میں شدید درد نہیں۔',
    explanation: 'Severe soreness often indicates overtraining or compromised form that risks injury. Consistency across months always beats one intense workout that sidelines you for two weeks.',
    practicalRule: 'Aim for a 7/10 effort level where you finish your workout feeling energized, not depleted.'
  },
  {
    id: 'myth-5',
    myth: 'You need expensive imported supplements and pre-workouts to get results.',
    urduMyth: 'ورزش کے نتائج کے لیے مہنگے سپلیمنٹس اور پروٹین پاؤڈر لازمی ہیں۔',
    fact: 'Whole foods like eggs, daal, roasted chana, peanuts, bananas, and home-cooked meals cover 95% of fitness needs.',
    urduFact: 'انڈے، دالیں، بھنے چنے اور دہی کسی بھی مہنگے پاؤڈر سے زیادہ محفوظ اور مفید ہیں۔',
    explanation: 'Supplements are purely convenience products. For beginners and everyday health enthusiasts, spending money on fresh local groceries and seasonal fruits yields vastly superior long-term health.',
    practicalRule: 'Master your real food pantry and sleep first before ever considering supplements.'
  }
];

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'art-1',
    title: 'The Real Science of Sleep & Recovery',
    urduTitle: 'نیند اور ریکوری کی سائنسی اہمیت',
    category: 'recovery',
    readTimeMinutes: 4,
    summary: 'Why your muscles actually rebuild and strengthen during slow-wave sleep, not inside the workout.',
    urduSummary: 'ورزش کے دوران پٹھے ٹوٹتے ہیں، لیکن نیند میں وہ مضبوط ہو کر دوبارہ بنتے ہیں۔',
    keyPoints: [
      'Growth hormone peaks during Stage 3 & 4 non-REM deep sleep.',
      'Lack of sleep increases cortisol (stress hormone) which triggers fat storage and cravings.',
      'Aim for 7 to 8 hours in a cool, quiet room without screens 30 minutes before bed.'
    ],
    practicalTakeaway: 'Prioritize a regular sleep schedule: going to bed and waking up at consistent times resets your circadian rhythm.',
    icon: 'Moon'
  },
  {
    id: 'art-2',
    title: 'How Strength & Stamina Develop Safely',
    urduTitle: 'طاقت اور سٹیمنا بڑھانے کا محفوظ طریقہ',
    category: 'strength',
    readTimeMinutes: 5,
    summary: 'Understand progressive overload without confusing gym jargon or high risks.',
    urduSummary: 'چھوٹے قدم اٹھا کر وقت کے ساتھ سٹیمنا اور طاقت میں بتدریج اضافہ کرنا۔',
    keyPoints: [
      'Your nervous system adapts first: exercises feel smoother and easier before physical size changes.',
      'Progressive overload simply means: doing 1 more rep, resting 5 seconds less, or holding better posture.',
      'Beginners achieve enormous health benefits in just 20 minutes, 3 days a week.'
    ],
    practicalTakeaway: 'Never rush into heavy weights. Master bodyweight movements (squats, wall pushups) with textbook form first.',
    icon: 'Zap'
  },
  {
    id: 'art-3',
    title: 'Balancing Meals Without Restrictive Calorie Obsession',
    urduTitle: 'کیلوریز گنے بغیر متوازن پلیٹ کا اصول',
    category: 'nutrition',
    readTimeMinutes: 4,
    summary: 'The "Healthy Plate Method" that works with any homemade meal or Pakistani handi.',
    urduSummary: 'اپنی پلیٹ کو تین حصوں میں بانٹیں: پروٹین، سلاد/سبزی، اور گندم/چاول۔',
    keyPoints: [
      '1/2 of your plate: Colorful vegetables, fresh kachumber salad, or sabzi.',
      '1/4 of your plate: Protein (daal, boiled chana, eggs, chicken, or fish).',
      '1/4 of your plate: Whole-grain carbs (brown rice, 1 whole-wheat chapati, oats).',
      'Fat: Controlled with a spoon (1 tsp cooking oil or small handful of nuts).'
    ],
    practicalTakeaway: 'Eat until you are 80% full, chew slowly, and drink water before meals.',
    icon: 'Utensils'
  },
  {
    id: 'art-4',
    title: 'Hydration: Why Water is Your Secret Stamina Booster',
    urduTitle: 'پانی پینا: جسمانی چستی اور توانائی کا راز',
    category: 'hydration',
    readTimeMinutes: 3,
    summary: 'Even 2% dehydration impairs focus, increases fatigue, and slows digestion.',
    urduSummary: 'پانی کی معمولی کمی بھی سر درد، سستی اور سست ہاضمے کا باعث بنتی ہے۔',
    keyPoints: [
      'Drink a tall glass of room temperature water right upon waking up.',
      'Thirst is often misinterpreted by the brain as sugar or carb hunger.',
      'Carry a reusable bottle and drink steadily throughout the day.'
    ],
    practicalTakeaway: 'Monitor your hydration easily: pale straw-colored urine indicates optimal hydration.',
    icon: 'Droplets'
  }
];

export const TRANSLATIONS: Record<string, { en: string; ur: string }> = {
  brandName: { en: 'FitLife', ur: 'فٹ لائف' },
  tagline: { en: 'Your Health, Your Journey.', ur: 'آپ کی صحت، آپ کا سفر' },
  home: { en: 'Home', ur: 'مرکزی صفحہ' },
  planSetup: { en: 'Plan Setup', ur: 'پلان بنائیں' },
  mealPlanner: { en: 'Diet & Meals', ur: 'غذا و کھانے' },
  workoutPlanner: { en: 'Workouts', ur: 'ورزش کا شیڈول' },
  progress: { en: 'Dashboard', ur: 'پیش رفت' },
  education: { en: 'Science Extra', ur: 'سائنس ایکسٹرا' },
  createMyPlan: { en: 'Create My Plan', ur: 'اپنا پلان بنائیں' },
  loadAhmed: { en: "Ahmed's Demo Plan", ur: 'احمد کا تیار شدہ پلان' },
  lowDataMode: { en: 'Data Saver Mode', ur: 'ڈیٹا سیور موڈ' },
  english: { en: 'English', ur: 'انگریزی' },
  urdu: { en: 'اردو', ur: 'اردو' }
};
