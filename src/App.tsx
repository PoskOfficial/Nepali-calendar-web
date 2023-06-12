import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import { fetchYearlyData } from "./helper/api";
import { getCurrentYear } from "./helper/dates";
import { Day } from "./types";

function App() {
  const [yearData, setYearData] = useState<{ [key: string]: Day[] } | {}>({});
  const [currentYear, setCurrentYear] = useState<number>(() =>
    getCurrentYear()
  );
  console.log(currentYear);
  async function fetchCalendarData() {
    const data = await fetchYearlyData(currentYear.toString());
    // console.log(data);
    setYearData(data);
  }

  useEffect(() => {
    fetchCalendarData();
  }, [currentYear]);

  return (
    <>
      <Calendar yearData={yearData} setCurrentYear={setCurrentYear} />
    </>
  );
}

export default App;
