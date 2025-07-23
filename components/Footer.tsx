
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-center p-4 mt-8 transition-colors duration-300">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Japonês Essencial. Criado com ❤️ para aprendizes da língua japonesa.</p>
      </div>
    </footer>
  );
};

export default Footer;
