const nepaliNumber = (str: string) => {
  //@ts-expect-error String may be undefined
  const filtered = str.split("-").pop().replace(/^0/, "");
  const nepaliNumbers = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९",
  };
  //@ts-expect-error String may be undefined
  return filtered.replace(/\d/g, (match) => nepaliNumbers?.[match]);
};
export default nepaliNumber;
