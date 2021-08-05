import {
  formatedYearsFromDates,
  getAllDatesBetween,
} from "../../helpers/dataCreation";
import {
  FringeDates,
  HeadingsByDate,
  Heading,
  WordMap,
} from "../../interfaces";
export interface HeadingRow {
  [name: string]: string | Heading[];
  date: string;
}

export const getSelectedHeadings = (
  names: string[],
  dates: FringeDates,
  totalData: HeadingsByDate
) => {
  const res: HeadingRow[] = [];
  const formatedDates = formatedYearsFromDates(getAllDatesBetween(dates));
  console.log(formatedDates, "dates");
  formatedDates.forEach((date) => {
    let tempObj: HeadingRow = { date };
    if (totalData[date]) {
      const siteData = totalData[date].totalDailySiteData;

      // not optimal
      console.log(siteData, "XD");
      for (let index in names) {
        const name = names[index];
        console.log(name, siteData, "PRZED");
        const data = siteData[name];
        tempObj[name] = data.headings;
      }

      res.push({ ...tempObj });
    }
  });
  console.log(res, "kkoniec");
  return res;
};

export const checkIfContainsWords = (headingText: string, words: string[]) => {
  // changin to map
  if (!words.length || words.length === 0) {
    return true;
  }

  const splitHeading = headingText.split(" ").map((item) => item.toLowerCase());
  // console.log(splitHeading);
  for (const word of splitHeading) {
    for (const searchedWord of words) {
      // if (word.indexOf(searchedWord) >= 0) {
      //   return true;
      // }
      if (word === searchedWord) {
        return true;
      }
    }
  }

  return false;
};
