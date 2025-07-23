
import React from 'react';
import { Category, Sentence } from '../types';
import WordCard from './WordCard';
import { BackArrowIcon } from './icons';
import { useLanguage } from '../App';

interface LessonViewProps {
  category: Category;
  onBack: () => void;
  onStartQuiz: (category: Category) => void;
  isSearchResult?: boolean;
}

const SentenceCard: React.FC<{ sentence: Sentence }> = ({ sentence }) => {
    const { language } = useLanguage();
    return (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{sentence.japanese}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{sentence.romaji}</p>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">{language === 'pt' ? sentence.portuguese : sentence.english}</p>
        </div>
    )
}

const LessonView: React.FC<LessonViewProps> = ({ category, onBack, onStartQuiz, isSearchResult = false }) => {
  const { language } = useLanguage();
  const title = isSearchResult 
    ? (language === 'pt' ? `Busca por "${category.name.split('"')[1]}"` : `Search for "${category.name.split('"')[1]}"`)
    : category.name;
  
  const wordCountText = category.words.length === 1 
    ? (language === 'pt' ? 'palavra encontrada' : 'word found') 
    : (language === 'pt' ? 'palavras encontradas' : 'words found');

  return (
    <div className="animate-fade-in">
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <button
          onClick={onBack}
          className="flex items-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors duration-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
        >
          <BackArrowIcon />
          <span className="ml-2">{isSearchResult ? (language === 'pt' ? 'Limpar Busca' : 'Clear Search') : (language === 'pt' ? 'Voltar' : 'Back')}</span>
        </button>
        {!isSearchResult && category.words.length > 3 && (
            <button 
                onClick={() => onStartQuiz(category)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-transform duration-200 hover:scale-105"
            >
                {language === 'pt' ? 'Iniciar Quiz' : 'Start Quiz'} 🧠
            </button>
        )}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h2>
        <p className="text-slate-500 dark:text-slate-400">{category.words.length} {wordCountText}</p>
      </div>

      {category.words.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category.words.map((word, index) => (
            <WordCard key={`${word.romaji}-${index}`} word={word} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <p className="text-5xl mb-4">😢</p>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">{language === 'pt' ? 'Nenhum resultado encontrado.' : 'No results found.'}</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{language === 'pt' ? 'Tente buscar por outro termo.' : 'Try searching for another term.'}</p>
        </div>
      )}

      {category.sentences && category.sentences.length > 0 && (
          <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 text-center">{language === 'pt' ? 'Frases de Exemplo' : 'Example Sentences'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.sentences.map((sentence, index) => (
                      <SentenceCard key={index} sentence={sentence} />
                  ))}
              </div>
          </div>
      )}
    </div>
  );
};

export default LessonView;
