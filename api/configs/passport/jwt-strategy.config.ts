import passport from "passport";
import {
  Strategy as JWTStrategy,
  ExtractJwt,
  StrategyOptionsWithoutRequest,
  VerifyCallback,
} from "passport-jwt";
import { findById as findByUserId } from "../../models/user.model";
import assertAuthTokenKey from "../../libs/asserts/auth-token-key.assert";

const AUTH_TOKE_KEY = assertAuthTokenKey();

const jwtOptions: StrategyOptionsWithoutRequest = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer <token>
  secretOrKey: AUTH_TOKE_KEY,
};

// runs after validating jwt
// double check if user still exists in our record
const jwtVerifyCallback: VerifyCallback = async (payload, done) => {
  try {
    const userId = payload.id;

    if (!userId || typeof userId !== "string") {
      return done(null, false, { message: "Invalid user id." });
    }

    const user = await findByUserId(userId);

    if (!user) {
      return done(null, false, { message: "User does not exist anymore." });
    }

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new JWTStrategy(jwtOptions, jwtVerifyCallback));
