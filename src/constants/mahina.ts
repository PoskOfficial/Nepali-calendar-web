const mahina = (index: number) => {
  const months = {
    0: "वैशाख",
    1: "जेठ",
    2: "असार",
    3: "श्रावण",
    4: "भदौ",
    5: "आश्विन",
    6: "कार्तिक",
    7: "मंसिर",
    8: "पुष",
    9: "माघ",
    10: "फाल्गुन",
    11: "चैत्र",
  };
  // @ts-ignore
  return months[index];
};

export default mahina;
