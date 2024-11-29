// /types/index.ts

export interface PassengerInfo {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  gender: string;
  birthDate: string;
  errors: Partial<Record<keyof Omit<PassengerInfo, "id" | "errors">, string>>;
}

export interface UserData {
  id: number;
  name: string;
}
