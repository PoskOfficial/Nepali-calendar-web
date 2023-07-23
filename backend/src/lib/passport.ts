import passport, { DoneCallback, Profile } from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from "./envset";
import db, { addUser } from "./db";

passport.serializeUser((user: any, done) => {
  // console.log({ user });
  done(null, user.key);
});

passport.deserializeUser(async (id: string, done) => {
  const USER = await db.get(id);
  done(null, USER);
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
      callbackURL: GOOGLE_CALLBACK_URL || "/auth/google/callback",
      // accessType: "offline",

      passReqToCallback: true,

      authorizationURL: "https://accounts.google.com/o/oauth2/v2/auth",
      tokenURL: "https://oauth2.googleapis.com/token",

      // accessType: "offline",
      scope: [
        "profile",
        "https://www.googleapis.com/auth/calendar",
        "https://www.googleapis.com/auth/calendar.events",
      ],
    },
    async (
      req: any,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: DoneCallback
    ) => {
      try {
        const user = await db.get(profile.id);
        if (!user) {
          const newUser = await addUser({
            key: profile.id,
            user: {
              ...profile,
              accessToken,
              refreshToken,
            },
          });
          return done(null, newUser);
        }
        console.log({ user });
        await db.update(
          {
            user: {
              ...profile,
              accessToken,
              refreshToken: refreshToken || (user?.refreshToken as string),
            },
          },
          profile.id
        );
        return done(null, user);
      } catch (err) {
        console.log({ err });
        return done(err);
      }
    }
  )
);

export default passport;
