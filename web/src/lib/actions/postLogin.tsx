import type { ActionFunction } from "react-router";
import { CustomError, getApiUrl } from "../utils";
import type { ResponseShapeType } from "@/types/ResponseShapeType";

const postLogin: ActionFunction = async ({ request }) => {
  const url = `${getApiUrl()}/auth/login`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify(formEntries),
    });

    const result = (await response.json()) as ResponseShapeType;
    const { statusCode, status, message, data } = result;

    // don't throw on error failed authentication
    if (statusCode === 401) {
      return { error: "Incorrect email or password." };
    }

    if (statusCode >= 400 || status !== "success") {
      throw new CustomError(statusCode, message);
    }

    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError(500, "Log in failed.");
  }
};

export default postLogin;
