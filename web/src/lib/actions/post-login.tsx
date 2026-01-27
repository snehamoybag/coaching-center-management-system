import { redirect, type ActionFunction } from "react-router";
import { CustomError, getApiUrl, setApiToken } from "../utils";
import type { ResponseShapeType } from "@/types/ResponseShapeType";

const postLogin: ActionFunction = async ({ request }) => {
  const url = `${getApiUrl()}/auth/login`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const formData = await request.formData();
  const formEntries = Object.fromEntries(formData.entries());

  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers,
    body: JSON.stringify(formEntries),
  });

  const result = (await response.json()) as ResponseShapeType;
  const { statusCode, status, data } = result;

  // on failed authentication
  if (statusCode === 401) {
    return { error: "Incorrect email address or password." };
  }

  // on successful authentication
  if (status === "success" && typeof data?.token === "string") {
    setApiToken(data.token);
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/");
  }

  throw new CustomError(500, "Login failed.");
};

export default postLogin;
