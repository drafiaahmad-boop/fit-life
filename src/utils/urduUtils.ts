// Utilities for 100% complete Urdu localization including numbers and units

export const URDU_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Converts any ASCII digits in a string or number into Eastern Arabic-Indic (Urdu) numerals.
 * Also replaces '%' with '٪' and English commas in numbers with Urdu comma '،'.
 */
export function toUrduDigits(val: string | number | null | undefined): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  return str
    .replace(/[0-9]/g, (digit) => URDU_DIGITS[parseInt(digit, 10)])
    .replace(/%/g, '٪');
}

/**
 * Formats a number depending on the active language.
 */
export function formatNumber(val: string | number | null | undefined, lang: 'en' | 'ur'): string {
  if (lang === 'ur') {
    return toUrduDigits(val);
  }
  return val === null || val === undefined ? '' : String(val);
}

/**
 * Converts common fitness / nutrition / time units into Urdu.
 */
export function formatUnit(val: string | number | null | undefined, unit: string, lang: 'en' | 'ur'): string {
  const numStr = formatNumber(val, lang);
  if (lang !== 'ur') {
    return `${numStr} ${unit}`.trim();
  }

  const u = unit.toLowerCase().trim();
  let urduUnit = unit;

  if (u === 'kcal' || u === 'calories' || u === 'cal') {
    urduUnit = 'کیلوریز';
  } else if (u === 'g' || u === 'grams' || u === 'gram') {
    urduUnit = 'گرام';
  } else if (u === 'mg') {
    urduUnit = 'ملی گرام';
  } else if (u === 'min' || u === 'mins' || u === 'minutes' || u === 'm') {
    urduUnit = 'منٹ';
  } else if (u === 'sec' || u === 'secs' || u === 'seconds' || u === 's') {
    urduUnit = 'سیکنڈ';
  } else if (u === 'kg' || u === 'kgs') {
    urduUnit = 'کلوگرام';
  } else if (u === 'cm') {
    urduUnit = 'سینٹی میٹر';
  } else if (u === 'glasses' || u === 'glass') {
    urduUnit = 'گلاس';
  } else if (u === 'hours' || u === 'hrs' || u === 'hr') {
    urduUnit = 'گھنٹے';
  } else if (u === 'times' || u === 'time') {
    urduUnit = 'بار';
  } else if (u === 'reps' || u === 'rep') {
    urduUnit = 'مرتبہ';
  } else if (u === 'sets' || u === 'set') {
    urduUnit = 'سیٹس';
  } else if (u === 'items' || u === 'item') {
    urduUnit = 'اشیاء';
  } else if (u === 'days' || u === 'day') {
    urduUnit = 'دن';
  } else if (u === 'weeks' || u === 'week') {
    urduUnit = 'ہفتے';
  } else if (u === 'meals' || u === 'meal') {
    urduUnit = 'کھانے';
  } else if (u === 'pkr' || u === 'rs' || u === 'rs.') {
    urduUnit = 'روپے';
  } else if (u === 'usd' || u === '$') {
    urduUnit = '$';
  } else if (u === '%') {
    urduUnit = '٪';
  } else if (u === 'cups' || u === 'cup') {
    urduUnit = 'کپ';
  } else if (u === 'tbsp') {
    urduUnit = 'کھانے کا چمچ';
  } else if (u === 'tsp') {
    urduUnit = 'چائے کا چمچ';
  }

  return `${numStr} ${urduUnit}`.trim();
}

/**
 * Maps day of week to Urdu name.
 */
export const URDU_DAYS_MAP: Record<string, string> = {
  Monday: 'پیر',
  Tuesday: 'منگل',
  Wednesday: 'بدھ',
  Thursday: 'جمعرات',
  Friday: 'جمعہ',
  Saturday: 'ہفتہ',
  Sunday: 'اتوار',
  Mon: 'پیر',
  Tue: 'منگل',
  Wed: 'بدھ',
  Thu: 'جمعرات',
  Fri: 'جمعہ',
  Sat: 'ہفتہ',
  Sun: 'اتوار'
};

export function formatDayName(day: string, lang: 'en' | 'ur'): string {
  if (lang === 'ur') {
    return URDU_DAYS_MAP[day] || day;
  }
  return day;
}

/**
 * Maps meal slot names to Urdu.
 */
export const URDU_MEAL_SLOTS: Record<string, string> = {
  breakfast: 'ناشتہ',
  lunch: 'دوپہر کا کھانا',
  dinner: 'رات کا کھانا',
  snack: 'ہلکا پھلکا اسنیک'
};

export function formatMealSlot(slot: string, lang: 'en' | 'ur'): string {
  if (lang === 'ur') {
    return URDU_MEAL_SLOTS[slot.toLowerCase()] || slot;
  }
  return slot.charAt(0).toUpperCase() + slot.slice(1);
}

/**
 * Formats a Gregorian date string (e.g. 2026-10-18) into localized Urdu with Urdu numerals.
 */
export function formatDateUrdu(dateInput?: string | Date): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  if (isNaN(d.getTime())) return '';
  
  const urduMonths = [
    'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
    'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر'
  ];
  const urduDays = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];

  const dayName = urduDays[d.getDay()];
  const dayNum = toUrduDigits(d.getDate());
  const monthName = urduMonths[d.getMonth()];
  const yearNum = toUrduDigits(d.getFullYear());

  return `${dayName}، ${dayNum} ${monthName} ${yearNum}`;
}

/**
 * Replaces any ASCII digits inside Urdu text with Urdu numerals.
 */
export function localizeUrduString(str: string): string {
  return toUrduDigits(str);
}
