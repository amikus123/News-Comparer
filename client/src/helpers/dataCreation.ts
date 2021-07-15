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
// human readable
export const dateToFormatedMonth = (d: Date) => {
  return `${d.getDate()}-${d.getMonth()+1}`;
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
export const checkIfSameDay = (d1:Date,d2:Date)=>{
  const a1 = d1.getDate()
  const b1 = d1.getMonth()
  const c1 = d1.getFullYear()
  const a2= d2.getDate()
  const b2 = d2.getMonth()
  const c2 = d2.getFullYear()
  if(a1===a2 && b1===b2 && c1 === c2 ){
    return true
  }
  return false

}