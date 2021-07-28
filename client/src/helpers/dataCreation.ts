import { AnyMap, FringeDates } from "../interfaces";
// why so long? TODO
export const getNPreviousDates = (
  n: number = 0,
  passedDate: Date = new Date()
) => {
  // makes function pure
  const copy = new Date(passedDate);
  const res: Date[] = [new Date(copy)];
  for (let i = 0; i < n; i++) {
    copy.setDate(copy.getDate() - 1);
    res.push(new Date(copy));
  }
  return res;
};

export const getPreviousDay = (d: Date) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() - 1);
  return new Date(copy);
};

const getNextDay = (d: Date) => {
  const copy = new Date(d);
  copy.setDate(copy.getDate() + 1);
  return new Date(copy);
};

export const createFileNames = (
  name: string,
  n: number,
  passedDate: Date = new Date()
) => {
  const res: string[] = [];
  const dates = getNPreviousDates(n, passedDate);
  const dateStrings = formatedYearsFromDates(dates);
  dateStrings.forEach((dateString) => {
    res.push(`${dateString}-${name}.jpg`);
  });
  return res;
};

export const formatedYearFromDate = (d: Date) => {
  return `${d.getDate()}-${d.getMonth() +1}-${d.getFullYear()}`;
};

export const formatedYearsFromDates = (dates: Date[]) => {
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(formatedYearFromDate(date));
  });
  return arr;
};

// human readable
export const dateToFormatedMonth = (d: Date) => {
  return `${d.getDate()}-${d.getMonth() + 1}`;
};

export const datesToFormatedMonths = (dates: Date[]) => {
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(dateToFormatedMonth(date));
  });
  return arr;
};

export const returnMaxAndMinDateFromKeys = (
  headings: AnyMap,
  now: Date = new Date()
): FringeDates => {
  let max = now;
  let min = now;
  let maxStr = formatedYearFromDate(max);
  const keys = Object.keys(headings);
  if (keys.indexOf(maxStr) !== -1) {
  } else {
    max = getPreviousDay(max);
  }
  while (true) {
    let nextIteration = formatedYearFromDate(getPreviousDay(min));
    if (keys.indexOf(nextIteration) === -1) {
      break;
    }
    min = getPreviousDay(min);
  }
  return {
    max: max,
    min: min,
  };
};

export const getAllDatesBetween = (
  d1: Date | FringeDates,
  d2: Date = new Date()
): Date[] => {
  console.log(d1);
  // d1 is smaller
  if (d1 instanceof Date) {
    console.log("date");

    let d1Time = d1.getTime();
    let d2Time = d2.getTime();
    if (d1Time > d2Time) {
      d2 = new Date(d1Time);
      d1 = new Date(d2Time);
    }
  } else {
    console.log("fringe");
    d2 = d1.max;
    d1 = d1.min;
    console.log(d2, d1);
  }

  const res: Date[] = [];
  let temp = new Date(d1);
  while (!checkIfSameDay(temp, d2)) {
    res.push(temp);
    temp = getNextDay(temp);
  }
  res.push(temp);
  return res;
};

export const checkIfSameDay = (d1: Date, d2: Date) => {
  const a1 = d1.getDate();
  const b1 = d1.getMonth();
  const c1 = d1.getFullYear();
  const a2 = d2.getDate();
  const b2 = d2.getMonth();
  const c2 = d2.getFullYear();
  if (a1 === a2 && b1 === b2 && c1 === c2) {
    return true;
  }
  return false;
};
