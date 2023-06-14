const nepaliMonth = (monthIndex: string) => {
  const months = {
    "1": "वैशाख",
    "2": "जेठ",
    "3": "असार	  ",
    "4": "श्रावण",
    "5": "भदौ",
    "6": "आश्विन",
    "7": "कार्तिक",
    "8": "मंसिर",
    "9": "पुष",
    "10": "माघ",
    "11": "फाल्गुन",
    "12": "चैत्र",
  };
  const trimmedValue = monthIndex.replace(/^0/, ""); //remove leading 0s
  //@ts-expect-error String may be undefined
  return months[trimmedValue];
};
export default nepaliMonth;
