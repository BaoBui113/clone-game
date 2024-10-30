export const getDateFormString = (value: string) => {
  if (value !== "") {
    const date = value.split(" ")[0]; // Split by space and take the first part
    return date;
  }
};


export const takeTwoDaysApart = ()=> {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 2); // Subtract 2 days from current date

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  return {
    day,month,year
  }
}