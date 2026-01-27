import { redirect, type LoaderFunction } from "react-router";
import { getApiToken, getApiUrl } from "../utils";
import type { UserType } from "@/types/UserType";
import type { ResponseShapeType } from "@/types/ResponseShapeType";

const getUser: LoaderFunction<UserType> = async () => {
  const url = getApiUrl();
  const API_TOKEN = getApiToken();

  if (!API_TOKEN) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/login");
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${API_TOKEN}`);

  const response = await fetch(url, { mode: "cors", headers });
  const result = (await response.json()) as ResponseShapeType;
  const { data } = result;

  if (!data || !data.user) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/login");
  }

  return data.user as UserType;
};

export default getUser;
