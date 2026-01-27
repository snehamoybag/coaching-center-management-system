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

const assertApiKey = () => {
  const KEY = import.meta.env.VITE_API_KEY as unknown;

  if (!KEY || typeof KEY !== "string") {
    throw new CustomError(500, "Api key not found in enviroment variables.");
  }

  return KEY;
};

export const getApiToken = () => {
  const KEY = assertApiKey();

  return localStorage.getItem(KEY);
};

export const setApiToken = (token: string) => {
  const KEY = assertApiKey();

  localStorage.setItem(KEY, token);
};

export const removeApiToken = () => {
  const KEY = assertApiKey();

  localStorage.removeItem(KEY);
};
