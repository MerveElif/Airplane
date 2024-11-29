// /components/SeatMap.tsx

import React from "react";
import { UserData } from "../types";
import Image from "next/image";

interface SeatMapProps {
  selectedSeats: number[];
  onSeatClick: (seat: number) => void;
  takenSeats: number[];
  userData: UserData[];
}

const SeatMap: React.FC<SeatMapProps> = ({
  selectedSeats,
  onSeatClick,
  takenSeats,
  userData,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Uçak Koltuk Haritası</h2>
      <div className="relative">
        {/* Uçak Resmi */}
        <div className="relative">
          <Image src="/airplane.png" alt="Uçak" width={450} height={600} />
          <div
            className="absolute inset-0 flex flex-col justify-center items-center"
            style={{ bottom: "50px" }}
          >
            {Array.from({ length: 13 }).map((_, rowIndex) => {
              return (
                <div key={rowIndex} className="flex items-center mb-2">
                  <div className="flex">
                    {Array.from({ length: 2 }).map((_, seatIndex) => {
                      const seatNumber = rowIndex * 4 + seatIndex;
                      const isTaken = takenSeats.includes(seatNumber);
                      const user = isTaken ? userData[seatNumber] : null;

                      return (
                        <div key={seatNumber} className="relative group">
                          <button
                            className={`p-1 py-2 rounded-md border text-xs flex items-center justify-center ${
                              isTaken
                                ? "bg-gray-400 cursor-not-allowed"
                                : selectedSeats.includes(seatNumber)
                                ? "bg-yellow-300"
                                : "bg-white"
                            }`}
                            onClick={() => onSeatClick(seatNumber)}
                            disabled={isTaken}
                          ></button>
                          {isTaken && user && (
                            <div
                              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user.name}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-1 sm:px-2"></div>
                  <div className="flex">
                    {Array.from({ length: 2 }).map((_, seatIndex) => {
                      const seatNumber = rowIndex * 4 + 2 + seatIndex;
                      const isTaken = takenSeats.includes(seatNumber);
                      const user = isTaken ? userData[seatNumber] : null;

                      return (
                        <div key={seatNumber} className="relative group">
                          <button
                            className={`p-1 py-2 rounded-md border text-xs flex items-center justify-center ${
                              isTaken
                                ? "bg-gray-400 cursor-not-allowed"
                                : selectedSeats.includes(seatNumber)
                                ? "bg-yellow-300"
                                : "bg-white"
                            }`}
                            onClick={() => onSeatClick(seatNumber)}
                            disabled={isTaken}
                          ></button>
                          {/* Tooltip */}
                          {isTaken && user && (
                            <div
                              className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {user.name}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-around mt-4">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-gray-400 block"></span>
            <span>Dolu</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-300 block"></span>
            <span>Seçili</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-white border block"></span>
            <span>Boş</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
