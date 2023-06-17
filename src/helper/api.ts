export async function fetchYearlyData(year: string) {
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
