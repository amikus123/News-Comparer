export const createFormatedDate = (offset: number = 0) => {
  // offset is number of days to change the date object
  const time = new Date();
  const miliseconds = time.getTime();
  const milisecondOffset = offset * 24 * 60 * 60 * 1000;
  const correctTime = new Date(miliseconds - milisecondOffset);
  return `${correctTime.getDate()}-${correctTime.getMonth()}-${correctTime.getFullYear()}`;
};
 // gets list of dates from previous X days
// export const createFormatedDatesF