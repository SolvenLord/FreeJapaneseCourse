
import React, { useState, useEffect, useMemo } from 'react';
import { Category, Word } from '../types';
import { BackArrowIcon } from './icons';
import { useLanguage } from '../App';

interface QuizViewProps {
  category: Category;
  onBack: () => void;
}

interface Question {
    word: Word;
    options: string[];
    correctAnswer: string;
}

const QuizView: React.FC<QuizViewProps> = ({ category, onBack }) => {
    const { language } = useLanguage();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    
    const shuffleArray = <T,>(array: T[]): T[] => {
        return [...array].sort(() => Math.random() - 0.5);
    }

    useEffect(() => {
        const generateQuestions = () => {
            const shuffledWords = shuffleArray(category.words);
            
            const generated = shuffledWords.map(correctWord => {
                const correctAnswer = language === 'pt' ? correctWord.portuguese : correctWord.english;
                
                const otherWords = category.words.filter(w => w.japanese !== correctWord.japanese);
                const wrongAnswers = shuffleArray(otherWords)
                    .slice(0, 3)
                    .map(w => language === 'pt' ? w.portuguese : w.english);

                const options = shuffleArray([correctAnswer, ...wrongAnswers]);
                
                return { word: correctWord, options, correctAnswer };
            });
            setQuestions(generated);
        }
        generateQuestions();
    }, [category, language]);

    const handleAnswerSelect = (answer: string) => {
        if (isAnswered) return;
        setSelectedAnswer(answer);
        setIsAnswered(true);
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const restartQuiz = () => {
        setQuestions(shuffleArray(questions));
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
    }

    if (questions.length === 0) {
        return (
            <div className="text-center text-slate-500 dark:text-slate-400">
                {language === 'pt' ? 'Carregando quiz...' : 'Loading quiz...'}
            </div>
        );
    }

    const isFinished = currentQuestionIndex >= questions.length;

    if (isFinished) {
        const percentage = Math.round((score / questions.length) * 100);
        return (
            <div className="animate-fade-in text-center max-w-md mx-auto bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {language === 'pt' ? 'Quiz Concluído!' : 'Quiz Complete!'}
                </h2>
                <p className="text-5xl my-4">{percentage >= 80 ? '🎉' : percentage >= 50 ? '👍' : '🤔'}</p>
                <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                    {language === 'pt' ? 'Sua pontuação final é:' : 'Your final score is:'}
                    <span className="font-bold text-2xl block mt-2 text-indigo-600 dark:text-indigo-400">{score} / {questions.length} ({percentage}%)</span>
                </p>
                <div className="flex justify-center space-x-4">
                    <button onClick={restartQuiz} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-transform hover:scale-105">
                        {language === 'pt' ? 'Tentar Novamente' : 'Try Again'}
                    </button>
                    <button onClick={onBack} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-2 px-6 rounded-full transition-colors">
                        {language === 'pt' ? 'Voltar' : 'Back'}
                    </button>
                </div>
            </div>
        )
    }

    const currentQuestion = questions[currentQuestionIndex];

    const getButtonClass = (option: string) => {
        if (!isAnswered) {
            return 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
        }
        if (option === currentQuestion.correctAnswer) {
            return 'bg-green-500 text-white';
        }
        if (option === selectedAnswer) {
            return 'bg-red-500 text-white';
        }
        return 'bg-white dark:bg-slate-700 opacity-60';
    }
    
    return (
        <div className="animate-fade-in max-w-2xl mx-auto">
             <div className="flex items-center justify-between mb-6">
                <button
                onClick={onBack}
                className="flex items-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors duration-200 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                    <BackArrowIcon />
                    <span className="ml-2">{language === 'pt' ? 'Sair do Quiz' : 'Exit Quiz'}</span>
                </button>
                <div className="text-lg font-bold text-slate-600 dark:text-slate-300">
                    {currentQuestionIndex + 1} / {questions.length}
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg">
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-2">
                    {language === 'pt' ? 'Qual é o significado de:' : 'What is the meaning of:'}
                </p>
                <h2 className="text-5xl font-bold text-center text-slate-800 dark:text-slate-100 mb-8">{currentQuestion.word.japanese}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.options.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={isAnswered}
                            className={`w-full p-4 rounded-lg text-lg font-semibold text-slate-800 dark:text-slate-200 text-center transition-all duration-300 transform hover:scale-105 ${getButtonClass(option)}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                
                {isAnswered && (
                    <div className="mt-8 text-center">
                        <button 
                            onClick={handleNextQuestion} 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105"
                        >
                            {language === 'pt' ? 'Próximo' : 'Next'} →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizView;
