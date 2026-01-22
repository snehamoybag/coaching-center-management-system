import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL as unknown;

  if (!url) {
    throw new Error("Api url not found in enviroment variables.");
  }

  if (typeof url !== "string") {
    throw new Error("Api url must be of type string.");
  }

  return url;
};

export class CustomError extends Error {
  constructor(statusCode: number, message: string) {
    super(`Status ${statusCode}: ${message}`);
  }
}
