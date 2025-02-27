import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`p-6 sm:p-8 w-full max-w-lg mx-auto border border-gray-300 dark:border-gray-700 
      rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg 
      hover:shadow-2xl transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
