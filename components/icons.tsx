
import React from 'react';

const iconClass = "h-6 w-6";

export const SearchIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

export const BackArrowIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={iconClass}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}>
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M10 19l-7-7m0 0l7-7m-7 7h18" 
        />
    </svg>
);

export const SunIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={iconClass} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}>
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
        />
    </svg>
);

export const MoonIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={iconClass} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}>
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
        />
    </svg>
);

export const SpeakerIcon: React.FC = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={iconClass}
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}>
        <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
        />
    </svg>
);
