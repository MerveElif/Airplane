// /components/SuccessMessage.tsx

import React from "react";

interface SuccessMessageProps {
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50 flex items-center space-x-2 animate-slide-in">
      <span>Rezervasyonunuz başarıyla tamamlandı!</span>
      <button
        className="bg-white text-green-500 px-2 py-1 rounded-md"
        onClick={onClose}
      >
        X
      </button>
    </div>
  );
};

export default SuccessMessage;
