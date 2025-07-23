
import React from 'react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(category)}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-b-4 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400"
    >
      <div className="text-5xl mb-4">{category.icon}</div>
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{category.name}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">{category.words.length} palavras</p>
    </div>
  );
};

export default CategoryCard;
