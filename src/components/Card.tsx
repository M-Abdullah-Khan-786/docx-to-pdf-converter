import React from "react";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="p-6 max-w-lg mx-auto border border-gray-200 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out mt-10">
      {children}
    </div>
  );
};

export default Card;
