const nepaliDayOfWeek = (dayIndex: number) => {
  const days = {
    "0": "आइतवार",
    "1": "सोमवार",
    "2": "मंगलवार",
    "3": "बुधवार",
    "4": "बिहिवार",
    "5": "शुक्रवार",
    "6": "शनिवार",
  };
  //@ts-expect-error String may be undefined
  return days[dayIndex];
};
export default nepaliDayOfWeek;
