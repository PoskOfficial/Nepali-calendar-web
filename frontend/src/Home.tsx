import { useEffect, useState } from "react";
import Calendar from "./components/Calendar";
import { fetchYearlyData } from "./helper/api";
import { getCurrentYear } from "./helper/dates";
import { Day } from "./types";
import { fetchYearlyDataHelper } from "./constants/availableYears";
import UseLanguage from "./components/useLanguage";
import nepaliNumber from "./helper/nepaliNumber";
function Home() {
  const { isNepaliLanguage } = UseLanguage();
  const [yearData, setYearData] = useState<{ [key: string]: Day[] } | null>(null);
  const currYear = isNepaliLanguage ? nepaliNumber(getCurrentYear().toString()) : getCurrentYear().toString();
  console.log(currYear);
  const [currentYear, setCurrentYear] = useState<number>(getCurrentYear());
  console.log(currentYear);
  async function fetchCalendarData(currentYear: number) {
    const data = await fetchYearlyData(currentYear.toString());
    setYearData(data);
  }
  useEffect(() => {
    fetchCalendarData(fetchYearlyDataHelper(currentYear.toString()));
    //fetchyeardatahelper function converts year in nepalinumber to english numbers so currentYear can be in any language
  }, [currentYear]);

  return (
    <>
      <Calendar yearData={yearData} setCurrentYear={setCurrentYear} currentYear={currentYear} />
    </>
  );
}

export default Home;
