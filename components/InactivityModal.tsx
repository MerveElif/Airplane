// /components/InactivityModal.tsx

import React from "react";

interface InactivityModalProps {
  countdown: number;
  onContinue: () => void;
}

const InactivityModal: React.FC<InactivityModalProps> = ({
  countdown,
  onContinue,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md text-center max-w-sm mx-auto">
        <p className="text-lg mb-4">
          Eğer {countdown} saniye içinde "Devam" butonuna basmazsanız, seçiminiz
          sıfırlanacaktır.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          onClick={onContinue}
        >
          Devam
        </button>
      </div>
    </div>
  );
};

export default InactivityModal;
