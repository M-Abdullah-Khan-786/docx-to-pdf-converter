import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600"}`}
    >
      {children}
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 bg-white/10 rounded-lg group-hover:opacity-100"></span>
    </button>
  );
};

export default Button;
