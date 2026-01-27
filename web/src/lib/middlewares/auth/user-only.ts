import UserContext from "@/contexts/user-context";
import { redirect, type MiddlewareFunction } from "react-router";

const userOnly: MiddlewareFunction = ({ context }, next) => {
  const user = context.get(UserContext);

  if (!user) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect("/login");
  }

  return next();
};

export default userOnly;
