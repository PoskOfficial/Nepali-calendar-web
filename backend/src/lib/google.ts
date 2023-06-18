import { calendar_v3, google } from "googleapis";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from "./envset";

const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
);

export const getAccessToken = async (refreshToken: string) => {
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  try {
    const { token } = await oAuth2Client.getAccessToken();
    return token;
  } catch (error) {
    console.error("Error getting access token:", error);
    throw error;
  }
};

export const getCalendarEvents = async (
  accessToken: string,
  timeMin: string,
  timeMax: string
) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const response = await calendar.events.list({
      auth: oAuth2Client,
      oauth_token: accessToken,
      calendarId: "primary", // Use "primary" for the user's primary calendar
      timeMin: new Date(timeMin).toISOString(), // Use the current date as the minimum time
      timeMax: new Date(timeMax).toISOString(), // Use the current date as the maximum time
      maxResults: 10, // Set the maximum number of events to retrieve
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items;
    return events;
  } catch (error) {
    console.error("Error retrieving calendar events:", error);
    throw error;
  }
};

// create calendar event
export const createCalendarEvent = async (
  accessToken: string,
  requestBody: any
) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const response = await calendar.events.insert({
      auth: oAuth2Client,
      oauth_token: accessToken,
      calendarId: "primary",
      requestBody: requestBody,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
};
