import passport from "passport";
import {
  type IStrategyOptionsWithRequest,
  type VerifyFunctionWithRequest,
  Strategy as LocalStrategy,
} from "passport-local";
import {
  findByEmail as findUserByEmail,
  getIsPasswordMatching,
} from "../../models/user.model";

// setup for local strategy
const customFields: IStrategyOptionsWithRequest = {
  usernameField: "email",
  passwordField: "password",
  session: false,
  passReqToCallback: true,
};

const verifyCallback: VerifyFunctionWithRequest = async (
  req,
  email,
  password,
  done,
) => {
  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return done(null, false, { message: "Email not registered." });
    }

    const isPasswordMatching = await getIsPasswordMatching(user.id, password);

    if (!isPasswordMatching) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, user, { message: "User authenticated successfully." });
  } catch (error) {
    if (error instanceof Error) {
      return done(error, false, { message: error.message });
    }

    return done(error, false, {
      message: "An unknown error occured trying to authencate the user.",
    });
  }
};

passport.use(new LocalStrategy(customFields, verifyCallback));
