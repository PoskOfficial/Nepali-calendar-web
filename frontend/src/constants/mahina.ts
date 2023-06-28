export const np_nepaliMonths = [
  "बैशाख",
  "जेठ",
  "असार",
  "श्रावण",
  "भदौ",
  "आश्विन",
  "कार्तिक",
  "मंसिर",
  "पुष",
  "माघ",
  "फाल्गुन",
  "चैत्र",
];
export const en_nepaliMonths = [
  "Baisakh",
  "Jestha",
  "Ashad",
  "Shrawn",
  "Bhadra",
  "Ashoj",
  "Kartik",
  "Mangshir",
  "Paush",
  "Magh",
  "Falgun",
  "Chaitra",
];

const mahina = (index: number): string => {
  return np_nepaliMonths[index];
};
export const englishMonth = (index: number): string => {
  return en_nepaliMonths[index];
};

export default mahina;
