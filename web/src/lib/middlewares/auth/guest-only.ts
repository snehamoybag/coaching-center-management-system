import UserContext from "@/contexts/user-context";
import { CustomError } from "@/lib/utils";
import { type MiddlewareFunction } from "react-router";

const guestOnly: MiddlewareFunction = ({ context }, next) => {
  const user = context.get(UserContext);

  if (user) {
    throw new CustomError(
      403,
      "You're already logged in. Please log out first.",
    );
  }

  return next();
};

export default guestOnly;
