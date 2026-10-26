import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Recipe } from '../types';
import {
  Utensils,
  Clock,
  Flame,
  DollarSign,
  CheckCircle2,
  Plus,
  Trash2,
  Calendar,
  ShoppingCart,
  Sparkles,
  Info,
  Filter,
  ArrowRight,
  Printer,
  Copy,
  Check,
  X,
  AlertCircle
} from 'lucide-react';

export const MealPlannerView: React.FC = () => {
  const {
    recipes,
    mealSchedule,
    assignMeal,
    removeMeal,
    shoppingList,
    toggleShoppingItem,
    addCustomShoppingItem,
    clearCheckedShoppingItems,
    language,
    lowDataMode,
    userProfile,
    toUrduDigits,
    formatMealSlot
  } = useApp();

  const isUr = language === 'ur';

  const [activeMealType, setActiveMealType] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snack'>('all');
  const [filterPakistani, setFilterPakistani] = useState<boolean>(true);
  const [filterVegetarian, setFilterVegetarian] = useState<boolean>(false);
  const [filterBudget, setFilterBudget] = useState<boolean>(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [viewTab, setViewTab] = useState<'recipes' | 'schedule' | 'shopping'>('recipes');
  const [customItemName, setCustomItemName] = useState('');
  const [customItemQty, setCustomItemQty] = useState('');
  const [copiedList, setCopiedList] = useState(false);

  // Filtered recipes
  const filteredRecipes = recipes.filter(r => {
    if (activeMealType !== 'all' && r.mealType !== activeMealType) return false;
    if (filterPakistani && !r.isPakistani) return false;
    if (filterVegetarian && !r.isVegetarian) return false;
    if (filterBudget && !r.isBudgetFriendly) return false;
    return true;
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const urduDays: Record<string, string> = {
    Monday: 'پیر',
    Tuesday: 'منگل',
    Wednesday: 'بدھ',
    Thursday: 'جمعرات',
    Friday: 'جمعہ',
    Saturday: 'ہفتہ',
    Sunday: 'اتوار'
  };

  const handleCopyShoppingList = () => {
    const text = shoppingList
      .map(item => `[${item.checked ? 'X' : ' '}] ${item.name} (${item.amount})`)
      .join('\n');
    navigator.clipboard.writeText(`FitLife Grocery List:\n${text}`);
    setCopiedList(true);
    setTimeout(() => setCopiedList(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Header Banner with image */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-blue-950 text-white p-6 sm:p-10 shadow-xl border border-white/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <Utensils className="w-3.5 h-3.5" />
            <span>{isUr ? 'غذا اور کھانے کا منصوبہ — صفحہ ۴' : 'Page 4 — Diet & Meal Planner'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            {isUr ? 'سادہ، لذیذ اور کم خرچ متوازن خوراک' : 'Wholesome, Budget-Friendly Meal Planning'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isUr
              ? 'کھانے کو غیر ضروری طور پر پیچیدہ بنائے بغیر، روزمرہ کی دالیں، چنے، گندم کی روٹی اور تازہ کچومر سلاد سے اپنی غذائی ضروریات پوری کریں۔'
              : 'Plan balanced meals without making food unnecessarily complicated. Featuring high-protein Pakistani staples, clear cost estimates, and an automated shopping list.'}
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => setViewTab('recipes')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewTab === 'recipes'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Utensils className="w-4 h-4" />
              <span>{isUr ? 'ترکیبیں اور آئیڈیاز' : 'Recipes & Meal Ideas'}</span>
            </button>

            <button
              onClick={() => setViewTab('schedule')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewTab === 'schedule'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{isUr ? 'ہفتہ وار پلان' : 'Weekly Schedule'}</span>
            </button>

            <button
              onClick={() => setViewTab('shopping')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                viewTab === 'shopping'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isUr ? 'خریداری فہرست' : 'Grocery Shopping List'}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
                {shoppingList.length}
              </span>
            </button>
          </div>
        </div>

        {/* Background Visual Card */}
        {!lowDataMode && (
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-80 overflow-hidden opacity-40">
            <img
              src="/assets/aistudio/image_39f26ab9.png"
              alt="Meal Prep Jars and Budget notepad"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>

      {/* Main Content Area based on viewTab */}

      {/* 1. RECIPES VIEW */}
      {viewTab === 'recipes' && (
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
            
            {/* Meal Type Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: isUr ? 'تمام کھانے' : 'All Meals' },
                { id: 'breakfast', label: isUr ? 'ناشتہ' : 'Breakfast' },
                { id: 'lunch', label: isUr ? 'دوپہر کا کھانا' : 'Lunch' },
                { id: 'dinner', label: isUr ? 'رات کا کھانا' : 'Dinner' },
                { id: 'snack', label: isUr ? 'ہلکا اسنیک' : 'Healthy Snacks' },
              ].map(slot => (
                <button
                  key={slot.id}
                  onClick={() => setActiveMealType(slot.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeMealType === slot.id
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>

            {/* Quick Filter Badges */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterPakistani(!filterPakistani)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterPakistani
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                🇵🇰 {isUr ? 'پاکستانی و دیسی' : 'Pakistani Staples'}
              </button>

              <button
                onClick={() => setFilterVegetarian(!filterVegetarian)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterVegetarian
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                🌱 {isUr ? 'سبزی خور' : 'Vegetarian'}
              </button>

              <button
                onClick={() => setFilterBudget(!filterBudget)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  filterBudget
                    ? 'bg-amber-50 border-amber-300 text-amber-800'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}
              >
                💰 {isUr ? 'کم خرچ ($)' : 'Budget Hero'}
              </button>
            </div>

          </div>

          {/* Recipes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Recipe Image or Placeholder */}
                  {!lowDataMode && (
                    <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100 relative">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex gap-1.5">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider">
                          {recipe.mealType}
                        </span>
                        {recipe.isPakistani && (
                          <span className="px-2 py-1 rounded-md bg-blue-900/90 text-white text-[11px] font-bold">
                            🇵🇰 Desi
                          </span>
                        )}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-slate-950/80 text-amber-300 text-xs font-extrabold">
                        {isUr ? `~${toUrduDigits(recipe.costPKR)} روپے (${toUrduDigits(recipe.costUSD.toFixed(2))}$)` : `~${recipe.costPKR} PKR ($${recipe.costUSD.toFixed(2)})`}
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {isUr ? recipe.urduTitle : recipe.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {isUr ? recipe.urduDescription : recipe.description}
                    </p>

                    {/* Macro Nutrition Pills */}
                    <div className="grid grid-cols-4 gap-1.5 mt-4 text-center">
                      <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-semibold">{isUr ? 'کیلوریز' : 'Calories'}</span>
                        <span className="text-xs font-bold text-slate-800">{isUr ? toUrduDigits(recipe.calories) : recipe.calories}</span>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-1.5 border border-blue-100">
                        <span className="text-[10px] text-blue-700 block font-semibold">{isUr ? 'پروٹین' : 'Protein'}</span>
                        <span className="text-xs font-bold text-blue-900">{isUr ? `${toUrduDigits(recipe.proteinGrams)} گرام` : `${recipe.proteinGrams}g`}</span>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-1.5 border border-slate-100">
                        <span className="text-[10px] text-slate-500 block font-semibold">{isUr ? 'کاربس' : 'Carbs'}</span>
                        <span className="text-xs font-bold text-slate-800">{isUr ? `${toUrduDigits(recipe.carbsGrams)} گرام` : `${recipe.carbsGrams}g`}</span>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-1.5 border border-amber-100">
                        <span className="text-[10px] text-amber-600 block font-semibold">{isUr ? 'چکنائی' : 'Fats'}</span>
                        <span className="text-xs font-bold text-amber-800">{isUr ? `${toUrduDigits(recipe.fatGrams)} گرام` : `${recipe.fatGrams}g`}</span>
                      </div>
                    </div>

                    {/* Time & Ingredients Count */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {isUr ? `${toUrduDigits(recipe.prepTimeMinutes)} منٹ تیاری` : `${recipe.prepTimeMinutes} mins prep`}
                      </span>
                      <span className="font-semibold text-slate-600">
                        {isUr ? `${toUrduDigits(recipe.ingredients.length)} اجزاء` : `${recipe.ingredients.length} ingredients`}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-5 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-600" />
                    <span>{isUr ? 'ترکیب اور متبادل' : 'Recipe & Subs'}</span>
                  </button>

                  <button
                    onClick={() => {
                      assignMeal('Monday', recipe.mealType, recipe.id);
                      setViewTab('schedule');
                    }}
                    className="py-2 px-3 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs transition-colors flex items-center gap-1"
                    title="Add to weekly meal schedule"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isUr ? 'شیڈول کریں' : 'Schedule'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

      {/* 2. WEEKLY MEAL SCHEDULE VIEW */}
      {viewTab === 'schedule' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {isUr ? 'آپ کا ۷ روزہ کھانے کا شیڈول' : 'Your 7-Day Personalized Meal Board'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {isUr
                  ? 'ہر دن کے ناشتہ، دوپہر اور رات کے کھانے کا جائزہ لیں اور سودا سلف حاصل کریں۔'
                  : 'Assign, remove, or swap balanced meals. All ingredients automatically sync to your grocery list.'}
              </p>
            </div>

            <button
              onClick={() => setViewTab('shopping')}
              className="px-4 py-2.5 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isUr ? 'خریداری کی فہرست دیکھیں' : 'Generate Shopping List'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {daysOfWeek.map((day) => {
              const assigned = mealSchedule[day] || {};
              const slots: Array<'breakfast' | 'lunch' | 'dinner' | 'snack'> = ['breakfast', 'lunch', 'dinner', 'snack'];
              
              return (
                <div key={day} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-sm text-slate-900">
                      {isUr ? urduDays[day] : day}
                    </h3>
                    <span className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full">
                      {isUr ? 'متوازن' : 'Planned'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {slots.map(slot => {
                      const recipeId = assigned[slot];
                      const recipe = recipes.find(r => r.id === recipeId);

                      return (
                        <div key={slot} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-center justify-between">
                          <div className="truncate mr-2">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              {formatMealSlot(slot)}
                            </span>
                            {recipe ? (
                              <button
                                onClick={() => setSelectedRecipe(recipe)}
                                className="font-semibold text-slate-800 hover:text-blue-800 truncate text-left block"
                              >
                                {isUr ? recipe.urduTitle : recipe.title}
                              </button>
                            ) : (
                              <span className="text-slate-400 italic">
                                {isUr ? 'کوئی انتخاب نہیں' : 'Tap recipes to assign'}
                              </span>
                            )}
                          </div>

                          {recipe && (
                            <button
                              onClick={() => removeMeal(day, slot)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                              title="Remove from day"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. SMART SHOPPING LIST VIEW */}
      {viewTab === 'shopping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  {isUr ? 'ہفتہ وار سودا سلف فہرست' : 'Weekly Smart Grocery Shopping List'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
                  {toUrduDigits(shoppingList.length)} {isUr ? 'اشیاء' : 'items'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {isUr
                  ? 'آپ کے منتخب کردہ کھانوں کے اجزاء خودکار طریقے سے یہاں جمع ہو چکے ہیں۔ مارکیٹ جاتے وقت نشان لگائیں۔'
                  : 'Aggregated automatically from your planned recipes. Check off ingredients as you shop.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShoppingList}
                className="px-3 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
              >
                {copiedList ? <Check className="w-3.5 h-3.5 text-blue-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedList ? (isUr ? 'کاپی ہو گیا' : 'Copied!') : (isUr ? 'لسٹ کاپی کریں' : 'Copy List')}</span>
              </button>

              <button
                onClick={clearCheckedShoppingItems}
                className="px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isUr ? 'مکمل اشیاء ہٹائیں' : 'Clear Checked'}</span>
              </button>
            </div>
          </div>

          {/* Quick Add Custom Item */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold text-blue-950 shrink-0">
              {isUr ? 'اضافی سودا شامل کریں:' : 'Add Custom Item:'}
            </span>
            <input
              type="text"
              placeholder={isUr ? 'جیسے: پودینہ، لیموں، دودھ' : 'e.g. Lemons, Green Tea, Dahi'}
              value={customItemName}
              onChange={(e) => setCustomItemName(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-blue-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="text"
              placeholder={isUr ? 'مقدار (1 کلو / 1 پیکٹ)' : 'Qty (e.g. 1 kg)'}
              value={customItemQty}
              onChange={(e) => setCustomItemQty(e.target.value)}
              className="w-32 px-3 py-2 rounded-xl bg-white border border-blue-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              onClick={() => {
                addCustomShoppingItem(customItemName, customItemQty);
                setCustomItemName('');
                setCustomItemQty('');
              }}
              className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
            >
              {isUr ? '+ شامل کریں' : '+ Add Item'}
            </button>
          </div>

          {/* Categorized List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['produce', 'pantry', 'protein', 'dairy', 'spices'] as const).map(cat => {
              const items = shoppingList.filter(i => i.category === cat);
              if (items.length === 0) return null;

              const categoryTitles: Record<string, { en: string; ur: string }> = {
                produce: { en: 'Fresh Produce & Vegetables', ur: 'تازہ سبزیاں اور پھل' },
                pantry: { en: 'Grains & Pantry Staples (Daal, Rice)', ur: 'دالیں، چاول اور آٹا' },
                protein: { en: 'Proteins & Eggs', ur: 'انڈے اور چکن' },
                dairy: { en: 'Dairy & Alternatives', ur: 'دودھ اور دہی' },
                spices: { en: 'Spices & Seasoning', ur: 'دیسی مصالحہ جات' }
              };

              return (
                <div key={cat} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                  <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                      {isUr ? categoryTitles[cat].ur : categoryTitles[cat].en}
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {isUr ? toUrduDigits(items.length) : items.length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        onClick={() => toggleShoppingItem(item.id)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          item.checked
                            ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                            : 'bg-white border-slate-200 hover:border-blue-300 text-slate-800 shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => {}} // handled by wrapper
                            className="w-4 h-4 rounded text-blue-800 focus:ring-blue-600 cursor-pointer"
                          />
                          <span className="font-medium">
                            {isUr && item.urduName ? item.urduName : item.name}
                          </span>
                        </div>
                        <span className="text-slate-400 text-[11px] font-semibold shrink-0">
                          {isUr ? toUrduDigits(item.amount).replace(/cups/gi, 'کپ').replace(/cup/gi, 'کپ').replace(/tsp/gi, 'چائے کا چمچ').replace(/tbsp/gi, 'کھانے کا چمچ').replace(/pieces/gi, 'عدد').replace(/piece/gi, 'عدد').replace(/kg/gi, 'کلو').replace(/items/gi, 'اشیاء').replace(/item/gi, 'شے') : item.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
              aria-label="Close recipe modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider">
                  {formatMealSlot(selectedRecipe.mealType)}
                </span>
                {selectedRecipe.isPakistani && (
                  <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                    🇵🇰 {isUr ? 'روایتی دیسی' : 'Pakistani Staple'}
                  </span>
                )}
                <span className="text-xs font-extrabold text-slate-700 ml-auto mr-8">
                  {isUr ? `~${toUrduDigits(selectedRecipe.costPKR)} روپے (${toUrduDigits(selectedRecipe.costUSD.toFixed(2))}$)` : `~${selectedRecipe.costPKR} PKR ($${selectedRecipe.costUSD.toFixed(2)})`}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {isUr ? selectedRecipe.urduTitle : selectedRecipe.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {isUr ? selectedRecipe.urduDescription : selectedRecipe.description}
              </p>
            </div>

            {/* Macro Breakdown */}
            <div className="grid grid-cols-4 gap-2 mb-6 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">{isUr ? 'کیلوریز' : 'Calories'}</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900">{isUr ? toUrduDigits(selectedRecipe.calories) : selectedRecipe.calories}</span>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5">
                <span className="text-[10px] text-blue-700 uppercase font-bold block">{isUr ? 'پروٹین' : 'Protein'}</span>
                <span className="text-sm sm:text-base font-extrabold text-blue-900">{isUr ? `${toUrduDigits(selectedRecipe.proteinGrams)} گرام` : `${selectedRecipe.proteinGrams}g`}</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5">
                <span className="text-[10px] text-slate-500 uppercase font-bold block">{isUr ? 'کاربوہائیڈریٹ' : 'Carbs'}</span>
                <span className="text-sm sm:text-base font-extrabold text-slate-900">{isUr ? `${toUrduDigits(selectedRecipe.carbsGrams)} گرام` : `${selectedRecipe.carbsGrams}g`}</span>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5">
                <span className="text-[10px] text-amber-700 uppercase font-bold block">{isUr ? 'چکنائی' : 'Fats'}</span>
                <span className="text-sm sm:text-base font-extrabold text-amber-900">{isUr ? `${toUrduDigits(selectedRecipe.fatGrams)} گرام` : `${selectedRecipe.fatGrams}g`}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                {isUr ? 'اجزاء کی فہرست (Ingredients)' : 'Ingredients'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedRecipe.ingredients.map((ing, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      {isUr && ing.urduName ? ing.urduName : ing.name}
                    </span>
                    <span className="text-slate-500 font-medium">
                      {isUr ? toUrduDigits(ing.amount).replace(/cups/gi, 'کپ').replace(/cup/gi, 'کپ').replace(/tsp/gi, 'چائے کا چمچ').replace(/tbsp/gi, 'کھانے کا چمچ').replace(/pieces/gi, 'عدد').replace(/piece/gi, 'عدد').replace(/kg/gi, 'کلو') : ing.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Steps */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                {isUr ? 'تیاری کا طریقہ (Step-by-Step)' : 'Preparation Instructions'}
              </h3>
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                {(isUr && selectedRecipe.urduInstructions ? selectedRecipe.urduInstructions : selectedRecipe.instructions).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <span className="w-5 h-5 rounded-full bg-blue-800 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {isUr ? toUrduDigits(idx + 1) : idx + 1}
                    </span>
                    <span className="leading-relaxed">{isUr ? toUrduDigits(step) : step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Substitutions & Allergies Box (Slide 6 requirement) */}
            {selectedRecipe.substitutions.length > 0 && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
                <h4 className="text-xs font-bold uppercase tracking-wide text-amber-900 flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>{isUr ? 'آسان متبادل اور الرجیز کے حل' : 'Healthy Ingredient Substitutions'}</span>
                </h4>
                <div className="space-y-1.5 text-xs">
                  {selectedRecipe.substitutions.map((sub, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700 bg-white/70 p-2 rounded-lg border border-amber-100">
                      <div>
                        <span className="line-through text-slate-400 mr-2">{sub.original}</span>
                        <span className="font-bold text-blue-800">➔ {sub.substitute}</span>
                      </div>
                      <span className="text-[11px] text-slate-500 italic">{sub.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Tip */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-start gap-2.5 mb-6">
              <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">{isUr ? 'غذائی فائدہ: ' : 'Nutrition Takeaway: '}</span>
                <span>{selectedRecipe.healthTip}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 justify-end pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                {isUr ? 'بند کریں' : 'Close'}
              </button>
              <button
                onClick={() => {
                  assignMeal('Monday', selectedRecipe.mealType, selectedRecipe.id);
                  setSelectedRecipe(null);
                  setViewTab('schedule');
                }}
                className="px-5 py-2 rounded-xl bg-blue-800 hover:bg-blue-900 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isUr ? 'ہفتہ وار شیڈول میں شامل کریں' : 'Add to Schedule'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Medical & Allergy Guidance Note (Slide 6 requirement) */}
      <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs flex items-center gap-3">
        <AlertCircle className="w-4 h-4 text-slate-500 shrink-0" />
        <p>
          {isUr
            ? 'نوٹ: فٹ لائف اس بات کا دعویٰ نہیں کرتا کہ ایک ہی خوراک ہر فرد کے لیے موزوں ہے۔ کسی بھی مخصوص الرجی یا طبی عارضے کی صورت میں مستند ڈاکٹر یا ماہر غذائیت سے مشورہ لازمی لیں۔'
            : 'FitLife does not promise that one diet works for everyone. Medical conditions, allergies, and specialized nutrition needs require appropriate professional guidance.'}
        </p>
      </div>

    </div>
  );
};
