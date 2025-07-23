
import React from 'react';
import { useTheme, useLanguage } from '../App';
import { SunIcon, MoonIcon } from './icons';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { language, toggleLanguage } = useLanguage();

    return (
        <header className="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4 py-3 md:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="text-4xl">🇯🇵</div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">Japonês Essencial</h1>
                            <p className="text-sm text-slate-500 dark:text-slate-300">600+ Palavras e Quizzes</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button 
                            onClick={toggleLanguage}
                            className="font-bold text-sm px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label={`Mudar idioma para ${language === 'pt' ? 'Inglês' : 'Português'}`}
                        >
                            {language === 'pt' ? 'PT 🇧🇷' : 'EN 🇺🇸'}
                        </button>
                        <button 
                            onClick={toggleTheme}
                            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
                        >
                            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
