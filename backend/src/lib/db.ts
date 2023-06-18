import { Deta } from "deta";
import session from "express-session";
import { Profile } from "passport";

// Initialize
const deta = Deta();

// This how to connect to or create a database.
const db = deta.Base("users");
const sessionStore = deta.Base("sessions");

interface userDetails extends Profile {
  accessToken: string;
  refreshToken: string;
}

export const addUser = async ({
  key,
  user,
}: {
  key: string;
  user: userDetails;
}) => {
  const newUser = await db.put({ ...user }, key);
  return newUser;
};

export const getUser = async (email: string) => {
  const user = await db.fetch({ email });
  return user;
};

export default db;

export class DetaSessionStore extends session.Store {
  get = async (
    sid: string,
    callback: (err?: any, session?: session.SessionData | null) => void
  ) => {
    try {
      const sessionData = await sessionStore.get(sid);
      if (!sessionData) {
        return callback(null, null);
      }
      console.log(sessionData.value);
      callback(
        null,
        JSON.parse(
          sessionData.value as unknown as string
        ) as unknown as session.SessionData
      );
    } catch (error) {
      callback(error);
    }
  };

  set = async (
    sid: string,
    session: session.SessionData,
    callback?: (err?: any) => void
  ) => {
    try {
      await sessionStore.put(JSON.stringify(session), sid);
      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  };

  destroy = async (sid: string, callback?: (err?: any) => void) => {
    try {
      console.log("destroying session", sid);
      const del = await sessionStore.delete(sid);
      console.log({ del });
      if (callback) {
        callback();
      }
    } catch (error) {
      if (callback) {
        callback(error);
      }
    }
  };
}
