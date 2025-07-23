
import React from 'react';
import { Word } from '../types';
import { useLanguage } from '../App';
import { usePronunciation } from '../usePronunciation';
import { SpeakerIcon } from './icons';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  const { language } = useLanguage();
  const { speak, isReady } = usePronunciation();
  
  const handleSpeak = (e: React.MouseEvent) => {
      e.stopPropagation(); // Evita que o clique se propague para outros elementos
      speak(word.japanese);
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-5 flex flex-col justify-between h-full border-t-4 border-indigo-500 dark:border-indigo-400 hover:shadow-lg transition-all duration-300">
      <div>
        <div className="flex justify-between items-start mb-2">
            <p className="text-3xl font-semibold text-slate-800 dark:text-slate-100 break-words">{word.japanese}</p>
            <button 
                onClick={handleSpeak} 
                disabled={!isReady}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Ouvir pronúncia"
            >
                <SpeakerIcon />
            </button>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">{word.romaji}</p>
      </div>
      <p className="text-md font-medium text-indigo-700 dark:text-indigo-400">{language === 'pt' ? word.portuguese : word.english}</p>
    </div>
  );
};

export default WordCard;
