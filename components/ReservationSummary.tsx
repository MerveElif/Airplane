// /components/ReservationSummary.tsx

import React from "react";

interface ReservationSummaryProps {
  selectedSeats: number[];
  onCompleteReservation: () => void;
}

const ReservationSummary: React.FC<ReservationSummaryProps> = ({
  selectedSeats,
  onCompleteReservation,
}) => {
  return (
    <div className="mt-8 flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Seçili Koltuklar:</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedSeats.map((seat) => (
          <div
            key={seat}
            className="w-8 h-8 bg-yellow-300 rounded-md flex items-center justify-center border text-sm"
          >
            {seat + 1}
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-sm text-gray-600">
          {selectedSeats.length} x 1.000 TL
        </div>
        <div className="font-semibold text-lg">
          {selectedSeats.length * 1000} TL
        </div>
      </div>
      <button
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        onClick={onCompleteReservation}
      >
        İşlemleri Tamamla
      </button>
    </div>
  );
};

export default ReservationSummary;
