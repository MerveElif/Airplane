// /components/ErrorMessage.tsx

import React from "react";

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
      <span>{message}</span>
      <button
        className="bg-white text-red-500 px-2 py-1 rounded-md"
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
};

export default ErrorMessage;
