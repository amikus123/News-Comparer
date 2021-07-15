import { AnyMap, FringeDates } from "../interfaces";
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
  return  new Date(copy)

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
  return `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
};

export const formatedYearsFromDates = (dates: Date[]) => {
  const arr: string[] = [];
  dates.forEach((date) => {
    arr.push(formatedYearFromDate(date));
  });
  return arr;
};

export const dateToFormatedMonth = (d: Date) => {
  return `${d.getDate()}-${d.getMonth()}`;
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
  console.log(maxStr,"max str")
  if (keys.indexOf(maxStr) !== -1) {
    // console.log("wynosi ",max )
  } else {
    max = getPreviousDay(max);
    // console.log("wynosi  prev",max )

  }
  while (true) {
    let nextIteration = formatedYearFromDate(getPreviousDay(min));
    console.log(nextIteration,keys.indexOf(nextIteration),keys,min)
    if (keys.indexOf(nextIteration) === -1) {
      break;
    }
    min = getPreviousDay(min);
  }
  // console.log(formatedYearFromDate(max),formatedYearFromDate(min),"end")
  return {
    max: max,
    min: min,
  };
};
