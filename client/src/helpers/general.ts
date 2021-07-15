import { ScreenshotsByDate } from "../interfaces";
export const checkIfShouldRequest = (
  names: string[],
  dates: Date[],
  screenshotsByDate: ScreenshotsByDate
) => {
  const keys = Object.keys(screenshotsByDate);
  console.log(keys);
  if (dates.length > keys.length) {
    return true;
  }
  keys.forEach((key) => {
    const dateKeys = Object.keys(screenshotsByDate[key]);
    console.log(key, "HALO");
    if (dateKeys.length !== names.length) {
      console.log("XDDD");
      return true;
    }
  });
  return false;
};
