import type { UserType } from "@/types/UserType";
import { createContext } from "react-router";

const UserContext = createContext<UserType | null>(null);

export default UserContext;
