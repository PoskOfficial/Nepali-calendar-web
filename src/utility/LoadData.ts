//dynamically imports necessary data and returns it
const LoadData = async (activeYear: number) => {
  const response = await fetch(
    `../public/data/${activeYear.toString()}-calendar.json`
  );
  const data = await response.json();
  return data;
};
export default LoadData;
