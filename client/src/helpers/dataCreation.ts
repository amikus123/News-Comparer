import { AnyMap, FringeDates } from "../interfaces";

export const getNPreviousDates = (
  n: number = 0,
  passedDate: Date = new Date()
) => {
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
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};

export const formatedYearsFromDates = (dates: Date[]) => {
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(formatedYearFromDate(date));
  });
  return arr;
};

// human readable format
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

export const getCleanNewDate = () => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};
const dateFromFormatedDate = (str: string) => {
  const dateSplit: string[] = str.split("");
  // array with day month and year string
  const arr: number[] = [];
  let tempStr = "";
  while (dateSplit.length !== 0) {
    let nextSymbol = dateSplit.shift();
    if (nextSymbol === "-") {
      arr.push(Number(tempStr));
      tempStr = "";
    } else {
      tempStr += nextSymbol;
    }
  }
  // pushes year to arr
  arr.push(Number(tempStr));
  const date = new Date();
  date.setDate(arr[0]);
  // month decremented beacuse of js date
  date.setMonth(arr[1] - 1);

  date.setFullYear(arr[2]);
  return date;
};
export const returnMaxAndMinDateFromKeys = (
  headings: AnyMap,
  now: Date = getCleanNewDate()
): FringeDates => {
  let max = now;
  let maxStr = formatedYearFromDate(max);
  const keys = Object.keys(headings);

  if (keys.indexOf(maxStr) !== -1) {
  } else {
    max = getPreviousDay(max);
  }
  let lowestDate = new Date(16275140724101);

  for (const index in keys) {
    const date = dateFromFormatedDate(keys[index]);
    const milisecods = date.getTime();

    if (milisecods < lowestDate.getTime()) {
      lowestDate = date;
    }
  }
  return {
    max: max,
    min: lowestDate,
  };
};

export const getAllDatesBetween = (
  d1: Date | FringeDates,
  d2: Date = new Date()
): Date[] => {
  // d1 is smaller
  if (d1 instanceof Date) {
    let d1Time = d1.getTime();
    let d2Time = d2.getTime();
    if (d1Time > d2Time) {
      d2 = new Date(d1Time);
      d1 = new Date(d2Time);
    }
  } else {
    d2 = d1.max;
    d1 = d1.min;
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
