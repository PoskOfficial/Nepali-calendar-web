const en_availableYears = [2075, 2076, 2077, 2078, 2079, 2080, 2081, 2082];
const np_availableYears = ["२०७५", "२०७६", "२०७७", "२०७८", "२०७९", "२०८०", "२०८१", "२०८२"];
const fetchYearlyDataHelper = (year: string) => {
  const mapping: { [key: string]: number } = {
    "२०७५": 2075,
    "२०७६": 2076,
    "२०७७": 2077,
    "२०७८": 2078,
    "२०७९": 2079,
    "२०८०": 2080,
    "२०८१": 2081,
    "२०८२": 2082,
  };
  if (Object.prototype.hasOwnProperty.call(mapping, year)) {
    return mapping[year];
  } else {
    return Number(year);
  }
};
export { en_availableYears, np_availableYears, fetchYearlyDataHelper };
