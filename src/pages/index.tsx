// /pages/index.tsx
import React, { useEffect, useRef, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage";
import SuccessMessage from "../../components/SuccessMessage";
import InactivityModal from "../../components/InactivityModal";
import SeatMap from "../../components/SeatMap";
import PassengerForm from "../../components/PassengerForm";
import ReservationSummary from "../../components/ReservationSummary";
import { PassengerInfo, UserData } from "../../types";
import { fetchUserData } from "../../services/api";
const HomePage: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [openPassengerForms, setOpenPassengerForms] = useState<number[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  const [passengers, setPassengers] = useState<PassengerInfo[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState<number>(20);
  const [isReservationSuccess, setIsReservationSuccess] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const modalJustOpenedRef = useRef(false);

  const takenSeats = Array.from({ length: 10 }, (_, index) => index);

  useEffect(() => {
    const storedSeats = localStorage.getItem("selectedSeats");
    if (storedSeats) {
      const seats: number[] = JSON.parse(storedSeats);
      setSelectedSeats(seats);
      const initialPassengers: PassengerInfo[] = seats.map((seat) => ({
        id: seat,
        name: "",
        surname: "",
        phone: "",
        email: "",
        gender: "",
        birthDate: "",
        errors: {},
      }));
      setPassengers(initialPassengers);
    }
  }, []);

  useEffect(() => {
    const getUserData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };

    getUserData();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
  }, [selectedSeats]);

  useEffect(() => {
    const handleUserActivity = () => {
      if (modalJustOpenedRef.current) {
        modalJustOpenedRef.current = false;
        return;
      }

      if (isModalOpen) {
        return;
      }

      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }

      if (selectedSeats.length === 0) {
        return;
      }
      inactivityTimeoutRef.current = setTimeout(() => {
        modalJustOpenedRef.current = true;
        setIsModalOpen(true);
        setCountdown(20);
      }, 30000);
    };

    const events = ["click", "mousemove", "keydown", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, handleUserActivity)
    );

    handleUserActivity();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, handleUserActivity)
      );
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [isModalOpen, selectedSeats]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isModalOpen) {
      setCountdown(20);
      interval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(interval);
            setIsModalOpen(false);
            setSelectedSeats([]);
            setPassengers([]);
            localStorage.removeItem("selectedSeats");
            window.location.reload();
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleContinue = () => {
    setIsModalOpen(false);
    setCountdown(20);
  };

  const handleSeatClick = (seat: number) => {
    if (takenSeats.includes(seat)) {
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      setOpenPassengerForms(openPassengerForms.filter((f) => f !== seat));
      setPassengers(passengers.filter((p) => p.id !== seat));
    } else if (selectedSeats.length < 3) {
      setSelectedSeats([...selectedSeats, seat]);
      setOpenPassengerForms([...openPassengerForms, seat]);
      setPassengers([
        ...passengers,
        {
          id: seat,
          name: "",
          surname: "",
          phone: "",
          email: "",
          gender: "",
          birthDate: "",
          errors: {},
        },
      ]);
    } else {
      setErrorMessage("3'ten fazla koltuk seçilemez");
    }
  };

  const handlePassengerChange = (
    seatId: number,
    field: keyof Omit<PassengerInfo, "id" | "errors">,
    value: string
  ) => {
    setPassengers((prevPassengers) =>
      prevPassengers.map((passenger) =>
        passenger.id === seatId
          ? {
              ...passenger,
              [field]: value,
              errors: { ...passenger.errors, [field]: "" },
            }
          : passenger
      )
    );
  };

  const handleCompleteReservation = () => {
    if (!selectedSeats || selectedSeats.length <= 0) {
      setErrorMessage("Lütfen koltuk seçiniz");
      return;
    }

    let isValid = true;

    const updatedPassengers = passengers.map((passenger) => {
      const errors: Partial<
        Record<keyof Omit<PassengerInfo, "id" | "errors">, string>
      > = {};

      if (!passenger.name.trim()) {
        errors.name = "İsim boş bırakılamaz.";
        isValid = false;
      }

      if (!passenger.surname.trim()) {
        errors.surname = "Soyisim boş bırakılamaz.";
        isValid = false;
      }

      if (!passenger.phone.trim()) {
        errors.phone = "Telefon boş bırakılamaz.";
        isValid = false;
      } else {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(passenger.phone)) {
          errors.phone = "Geçerli bir telefon numarası girin.";
          isValid = false;
        }
      }

      if (!passenger.email.trim()) {
        errors.email = "E-Posta boş bırakılamaz.";
        isValid = false;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(passenger.email)) {
          errors.email = "Geçerli bir e-posta girin.";
          isValid = false;
        }
      }

      if (!passenger.gender.trim()) {
        errors.gender = "Cinsiyet boş bırakılamaz.";
        isValid = false;
      }

      if (!passenger.birthDate.trim()) {
        errors.birthDate = "Doğum tarihi boş bırakılamaz.";
        isValid = false;
      }

      return { ...passenger, errors };
    });

    setPassengers(updatedPassengers);

    if (!isValid) {
      setErrorMessage("Lütfen boş alanları doldurunuz");
      return;
    }

    setIsReservationSuccess(true);
    setSelectedSeats([]);
    setOpenPassengerForms([]);
    setPassengers([]);
    localStorage.removeItem("selectedSeats");
  };

  return (
    <div className="flex flex-col md:flex-row justify-center p-8 gap-4">
      {isReservationSuccess && (
        <SuccessMessage onClose={() => setIsReservationSuccess(false)} />
      )}

      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}

      {isModalOpen && (
        <InactivityModal countdown={countdown} onContinue={handleContinue} />
      )}

      <div className="w-full md:w-2/4 flex flex-col items-center">
        <SeatMap
          selectedSeats={selectedSeats}
          onSeatClick={handleSeatClick}
          takenSeats={takenSeats}
          userData={userData}
        />
      </div>

      <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg flex flex-col justify-between min-h-[300px]">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center">
            Yolcu Bilgileri
          </h2>
          {selectedSeats && selectedSeats.length > 0 ? (
            selectedSeats.map((seat, index) => {
              const passenger = passengers.find((p) => p.id === seat)!;
              const open = openPassengerForms.includes(seat);

              return (
                <PassengerForm
                  key={seat}
                  seat={seat}
                  index={index}
                  passenger={passenger}
                  open={open}
                  onToggle={() => {
                    const openForms = [...openPassengerForms];
                    const formIndex = openForms.indexOf(seat);
                    if (formIndex !== -1) {
                      openForms.splice(formIndex, 1);
                    } else {
                      openForms.push(seat);
                    }
                    setOpenPassengerForms(openForms);
                  }}
                  onChange={(field, value) =>
                    handlePassengerChange(seat, field, value)
                  }
                />
              );
            })
          ) : (
            <div className="text-gray-500 text-center mt-4">
              Lütfen koltuk seçiniz.
            </div>
          )}
        </div>

        <ReservationSummary
          selectedSeats={selectedSeats}
          onCompleteReservation={handleCompleteReservation}
        />
      </div>
    </div>
  );
};

export default HomePage;
