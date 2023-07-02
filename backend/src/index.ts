import express, { Request, Response, json } from "express";
// import cookiePar
import session from "express-session";
import passport from "./lib/passport";
import isAuthenticated from "./lib/auth";
import { DetaSessionStore } from "./lib/db";
import {
  createCalendarEvent,
  getAccessToken,
  getCalendarEvents,
  deleteCalendarEvent,
} from "./lib/google";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    },
    store: new DetaSessionStore(),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Expresssss!");
});

// AUTH ROUTES
app.get(
  `/auth/google`,
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    accessType: "offline",
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
app.get(
  `/auth/google/callback`,
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  (req: Request, res: Response) => {
    res.redirect("/");
  }
);
// logout route
app.get("/auth/logout", (req: Request, res: Response) => {
  req.session.destroy((err: Error) => {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

// a test route to check if user is logged in
app.get("/events", isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user as any;
  const refreshToken = user.refreshToken;
  try {
    const accessToken = await getAccessToken(refreshToken);
    // console.log({ accessToken });
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const { timeMin, timeMax, calendarId } = req.query as {
      timeMin: string;
      timeMax: string;
      calendarId?: string[];
    };
    const events = await getCalendarEvents(
      accessToken,
      timeMin,
      timeMax,
      calendarId
    );
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

app.post("/create", isAuthenticated, async (req: Request, res: Response) => {
  const user = req.user as any;
  const refreshToken = user.refreshToken;
  try {
    const accessToken = await getAccessToken(refreshToken);
    // console.log({ accessToken });
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    const event = await createCalendarEvent(accessToken, req.body);
    res.json({ event });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// delete event route
app.delete(
  `/delete/:eventId`,
  isAuthenticated,
  async (req: Request, res: Response) => {
    const user = req.user as any;
    const refreshToken = user.refreshToken;
    const eventId = req.body.eventId || req.params.eventId;
    const { calendarId } = req.query as { calendarId: string };
    if (!eventId) {
      res.status(400).json({ message: "Event ID is required" });
    }
    try {
      const accessToken = await getAccessToken(refreshToken);
      // console.log({ accessToken });
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const event = await deleteCalendarEvent(accessToken, eventId, calendarId);
      res.json({ event });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  }
);

// endpoint to get user profile, return unauthorized if not logged in
app.get("/profile", isAuthenticated, (req: Request, res: Response) => {
  res.json({ user: req.user });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
