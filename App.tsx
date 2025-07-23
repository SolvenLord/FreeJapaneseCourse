
import React, { useState, useMemo, useEffect, createContext, useContext } from 'react';
import { Category, Word } from './types';
import { japaneseWords } from './constants/words';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoryCard from './components/CategoryCard';
import LessonView from './components/LessonView';
import SearchBar from './components/SearchBar';
import QuizView from './components/QuizView';

// --- Contextos ---
type Theme = 'light' | 'dark';
type Language = 'pt' | 'en';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);
export const LanguageContext = createContext<LanguageContextType | null>(null);

// --- Hooks de Contexto ---
export const useTheme = () => useContext(ThemeContext)!;
export const useLanguage = () => useContext(LanguageContext)!;

type ViewState = 
  | { type: 'categories' }
  | { type: 'lesson'; category: Category }
  | { type: 'quiz'; category: Category };

const App: React.FC = () => {
  // --- State de Contexto ---
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as Theme || 'light';
    }
    return 'light';
  });
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  const toggleLanguage = () => setLanguage(prevLang => (prevLang === 'pt' ? 'en' : 'pt'));

  // --- State da Aplicação ---
  const [view, setView] = useState<ViewState>({ type: 'categories' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectCategory = (category: Category) => {
    setView({ type: 'lesson', category });
    setSearchTerm(''); 
  };
  
  const handleStartQuiz = (category: Category) => {
    setView({ type: 'quiz', category });
  };

  const handleBackToCategories = () => {
    setView({ type: 'categories' });
  };
  
  const handleBackToLesson = (category: Category) => {
      setView({ type: 'lesson', category });
  }

  const filteredCategories = useMemo(() => {
    if (!searchTerm) return japaneseWords;
    const lowercasedFilter = searchTerm.toLowerCase();
    
    return japaneseWords.filter(category =>
      category.name.toLowerCase().includes(lowercasedFilter) ||
      category.words.some(word =>
          word.japanese.toLowerCase().includes(lowercasedFilter) ||
          word.romaji.toLowerCase().includes(lowercasedFilter) ||
          word.portuguese.toLowerCase().includes(lowercasedFilter) ||
          word.english.toLowerCase().includes(lowercasedFilter)
      )
    );
  }, [searchTerm]);

  const wordsInSearch = useMemo(() => {
    if (!searchTerm) return [];
    const lowercasedFilter = searchTerm.toLowerCase();
    return japaneseWords.flatMap(category => category.words).filter(word => 
        word.japanese.toLowerCase().includes(lowercasedFilter) ||
        word.romaji.toLowerCase().includes(lowercasedFilter) ||
        word.portuguese.toLowerCase().includes(lowercasedFilter) ||
        word.english.toLowerCase().includes(lowercasedFilter)
    );
  }, [searchTerm, language]);

  const searchCategory: Category = {
    name: `Resultados da busca por "${searchTerm}"`,
    icon: '🔍',
    words: wordsInSearch
  };

  const renderContent = () => {
    switch (view.type) {
      case 'lesson':
        return <LessonView category={view.category} onBack={handleBackToCategories} onStartQuiz={handleStartQuiz} />;
      case 'quiz':
        return <QuizView category={view.category} onBack={() => handleBackToLesson(view.category)} />;
      case 'categories':
      default:
        return (
          <>
            <div className="mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-200 mb-2">Explore as Categorias</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                Navegue por tópicos ou use a busca para encontrar palavras específicas em japonês, romaji, português ou inglês.
              </p>
              <div className="mt-6 max-w-lg mx-auto">
                <SearchBar 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar em mais de 600 palavras e frases..."
                />
              </div>
            </div>

            {searchTerm && (
              <div className="mb-8">
                <LessonView category={searchCategory} onBack={() => setSearchTerm('')} isSearchResult={true} onStartQuiz={() => alert("Quiz não disponível para resultados de busca.")} />
              </div>
            )}

            {!searchTerm && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCategories.map(category => (
                  <CategoryCard key={category.name} category={category} onSelect={handleSelectCategory} />
                ))}
              </div>
            )}
          </>
        );
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, toggleLanguage }}>
        <div className="min-h-screen flex flex-col font-sans">
          <Header />
          <main className="flex-grow container mx-auto p-4 md:p-8">
            {renderContent()}
          </main>
          <Footer />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
