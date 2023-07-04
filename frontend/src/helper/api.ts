export async function fetchYearlyData(year: number) {
  const res = await fetch(`/data/${year}-calendar.json`);
  const data = await res.json();
  return data;
}
export async function checkIfUserIsLoggedInOrOffline(): Promise<{
  status: "LOGGED_IN" | "NOT_LOGGED_IN" | "OFFLINE";
  data?: any;
}> {
  const res = await fetch("/api/profile");
  // console.log({ res });
  if (res.status === 200) {
    const data = await res.json();
    return { status: "LOGGED_IN", data };
  }
  if (res.status === 401) {
    return { status: "NOT_LOGGED_IN" };
  }
  return { status: "OFFLINE" };
}

export const fetchUserEvents = async (startDate: string, endDate: string) => {
  const res = await fetch(`/api/events?timeMin=${startDate}&timeMax=${endDate}`);
  const data = await res.json();
  return data;
};

export const getCalendarList = async () => {
  const res = await fetch(`/api/calendars`);
  const data = await res.json();
  // console.log({ data });
  return (
    data.calendars?.items
      ?.filter((calendar: any) => calendar.accessRole === "owner" || calendar.accessRole === "writer")
      .map((calendar: any) => ({ label: calendar.summary, value: calendar.id })) || []
  );
};
