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
  timeMax: string,
  calendarId?: string[]
) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const calendarList = calendarId?.length
      ? calendarId
      : (await getUserCalendarList(accessToken)).items?.map(
          (calendar: any) => calendar.id
        );
    if (!calendarList) return [];
    const events = await Promise.all(
      calendarList.map(async (calendarId) => {
        const response = await calendar.events.list({
          auth: oAuth2Client,
          oauth_token: accessToken,
          calendarId: calendarId,
          timeMin: new Date(timeMin).toISOString(), // Use the current date as the minimum time
          timeMax: new Date(timeMax).toISOString(), // Use the current date as the maximum time
          maxResults: 10, // Set the maximum number of events to retrieve
          singleEvents: true,
          orderBy: "startTime",
        });
        return response.data.items?.map((event) => ({
          ...event,
          calendarId,
          calendarSummary: response.data.summary,
        }));
      })
    );
    return events.flat();
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
    const { calendarId, ...body } = requestBody;
    const response = await calendar.events.insert({
      auth: oAuth2Client,
      oauth_token: accessToken,
      calendarId: calendarId || "primary",
      requestBody: body,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
};

export const deleteCalendarEvent = async (
  accessToken: string,
  eventID: string,
  calendarId?: string
) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const response = await calendar.events.delete({
      oauth_token: accessToken,
      auth: oAuth2Client,
      calendarId: calendarId || "primary",
      eventId: eventID,
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    throw error;
  }
};

export const getUserCalendarList = async (accessToken: string) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const response = await calendar.calendarList.list({
      auth: oAuth2Client,
      oauth_token: accessToken,
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving calendar list:", error);
    throw error;
  }
};

export const getEventsFromAllCalendars = async (
  accessToken: string,
  timeMin: string,
  timeMax: string
) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const response = await calendar.events.list({
      auth: oAuth2Client,
      oauth_token: accessToken,
      timeMin: new Date(timeMin).toISOString(), // Use the current date as the minimum time
      timeMax: new Date(timeMax).toISOString(), // Use the current date as the maximum time
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

export const createMitiCalendar = async (accessToken: string) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  try {
    const response = await calendar.calendars.insert({
      auth: oAuth2Client,
      oauth_token: accessToken,
      requestBody: {
        summary: "Miti",
        etag: "Miti",
        timeZone: "Asia/Kathmandu",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
};
