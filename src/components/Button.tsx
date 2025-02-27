import React from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300 ease-in-out
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600 active:scale-95"
        }
        ${className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
