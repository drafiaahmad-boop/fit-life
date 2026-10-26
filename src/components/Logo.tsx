import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  src?: string;
  showQuoteOnMobile?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-slate-900',
  subtextColor = 'text-slate-500',
  src,
  showQuoteOnMobile = false
}) => {
  const [imageError, setImageError] = useState(false);

  const effectiveSrc = src || '/assets/aistudio/image_031cc279.png';

  // Size configurations
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-base', subtext: 'text-[10px]', icon: 'w-4 h-4' },
    md: { box: 'w-10 h-10', text: 'text-xl', subtext: 'text-[11px]', icon: 'w-5 h-5' },
    lg: { box: 'w-14 h-14', text: 'text-2xl', subtext: 'text-xs', icon: 'w-7 h-7' }
  };

  const currentSize = sizeMap[size];

  const { language } = useApp();
  const isUr = language === 'ur';

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Dynamic Runner Logo Emblem */}
      <div
        className={`${currentSize.box} relative rounded-full overflow-hidden bg-blue-950 flex items-center justify-center shadow-md shadow-blue-950/25 border-2 border-blue-900 shrink-0 transition-transform hover:scale-105`}
      >
        {!imageError ? (
          <img
            src={effectiveSrc}
            alt="FitLife Logo"
            className="w-full h-full select-none object-cover object-[55%_35%]"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-blue-950 text-white font-extrabold rounded-full">
            <Heart className={`${currentSize.icon} fill-white text-blue-300`} />
          </div>
        )}
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`${currentSize.text} font-extrabold tracking-tight ${textColor}`}>
              {isUr ? 'فٹ لائف' : 'FitLife'}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
              {isUr ? 'صحت' : 'Health'}
            </span>
          </div>
          <p className={`${currentSize.subtext} italic ${subtextColor} ${showQuoteOnMobile ? 'block' : 'hidden sm:block'} leading-tight mt-0.5`}>
            {isUr ? (
              <>
                صرف بیٹھے نہ رہیں؛<br />
                اٹھیں اور فٹ بنیں۔
              </>
            ) : (
              <>
                Don't just sit;<br />
                Rise Up and get Fit.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
