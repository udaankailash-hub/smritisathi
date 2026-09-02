import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  subtext?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
  subtext = 'AI-Based Cognitive Care',
}) => {
  const sizeMap = {
    xs: 'w-6 h-6 rounded-lg',
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
    xl: 'w-20 h-20 rounded-3xl',
  };

  const textSizeMap = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative flex-shrink-0 overflow-hidden shadow-lg border border-[#19C3B1]/40 bg-[#07111F] p-0.5 group ${sizeMap[size]}`}>
        <img
          src="/logo.png"
          alt="MindCare NER / MementoCare AI Logo"
          className="w-full h-full object-cover rounded-inherit transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#19C3B1]/10 to-transparent pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-black tracking-tight text-[#F4F8FC] flex items-center gap-1.5 ${textSizeMap[size]}`}>
            <span>MementoCare</span>
            <span className="text-[#38D9C5]">AI</span>
          </span>
          {subtext && (
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7F91A6]">
              {subtext}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
