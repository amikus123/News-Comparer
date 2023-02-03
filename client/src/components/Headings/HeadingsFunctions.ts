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
  formatedDates.forEach((date) => {
    let tempObj: HeadingRow = { date };
    if (totalData[date]) {
      const siteData = totalData[date].totalDailySiteData;

      for (let index in names) {
        const name = names[index];
        const data = siteData[name];
        tempObj[name] = data.headings;
      }

      res.push({ ...tempObj });
    }
  });
  return res;
};

export const checkIfContainsWords = (headingText: string, words: string[]) => {
  if (!words.length || words.length === 0) {
    return true;
  }

  const splitHeading = headingText.split(" ").map((item) => item.toLowerCase());
  for (const word of splitHeading) {
    for (const searchedWord of words) {
      if (word === searchedWord) {
        return true;
      }
    }
  }

  return false;
};
