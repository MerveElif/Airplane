// /components/PassengerForm.tsx

import React from "react";
import { PassengerInfo } from "../types";

interface PassengerFormProps {
  seat: number;
  index: number;
  passenger: PassengerInfo;
  open: boolean;
  onToggle: () => void;
  onChange: (
    field: keyof Omit<PassengerInfo, "id" | "errors">,
    value: string
  ) => void;
}

const PassengerForm: React.FC<PassengerFormProps> = ({
  seat,
  index,
  passenger,
  open,
  onToggle,
  onChange,
}) => {
  return (
    <div className="border-b pb-4 mb-4">
      <button
        className="w-full flex justify-between items-center bg-gray-300 p-4 rounded-md"
        onClick={onToggle}
      >
        <span>
          {index + 1}. Yolcu (Koltuk: {seat + 1})
        </span>
        <span>{open ? "▼" : "▶"}</span>
      </button>
      {open && (
        <form className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              İsim
            </label>
            <input
              type="text"
              placeholder="İsim"
              value={passenger.name}
              onChange={(e) => onChange("name", e.target.value)}
              className={`mt-1 block w-full border ${
                passenger.errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            />
            {passenger.errors.name && (
              <p className="mt-1 text-xs text-red-500">
                {passenger.errors.name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Soyisim
            </label>
            <input
              type="text"
              placeholder="Soyisim"
              value={passenger.surname}
              onChange={(e) => onChange("surname", e.target.value)}
              className={`mt-1 block w-full border ${
                passenger.errors.surname ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            />
            {passenger.errors.surname && (
              <p className="mt-1 text-xs text-red-500">
                {passenger.errors.surname}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefon
            </label>
            <input
              type="tel"
              placeholder="Telefon"
              value={passenger.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className={`mt-1 block w-full border ${
                passenger.errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            />
            {passenger.errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {passenger.errors.phone}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-Posta
            </label>
            <input
              type="email"
              placeholder="E-Posta"
              value={passenger.email}
              onChange={(e) => onChange("email", e.target.value)}
              className={`mt-1 block w-full border ${
                passenger.errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            />
            {passenger.errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {passenger.errors.email}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Cinsiyet
            </label>
            <input
              type="text"
              placeholder="Cinsiyet"
              value={passenger.gender}
              onChange={(e) => onChange("gender", e.target.value)}
              className={`mt-1 block w-full border ${
                passenger.errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            />
            {passenger.errors.gender && (
              <p className="mt-1 text-xs text-red-500">
                {passenger.errors.gender}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Doğum Tarihi
            </label>
            <input
              type="date"
              placeholder="Doğum Tarihi"
              value={passenger.birthDate}
              onChange={(e) => onChange("birthDate", e.target.value)}
              className={`mt-1 block w-full border ${
                passenger.errors.birthDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm p-2`}
            />
            {passenger.errors.birthDate && (
              <p className="mt-1 text-xs text-red-500">
                {passenger.errors.birthDate}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default PassengerForm;
