export async function fetchYearlyData(year: string) {
  const res = await fetch(`/data/${year}-calendar.json`);
  const data = await res.json();
  return data;
}
