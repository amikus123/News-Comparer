import {
  formatedYearsFromDates,
  getAllDatesBetween,
} from "../../helpers/dataCreation";
import { FringeDates, HeadingsByDate, Heading } from "../../interfaces";
export interface HeadingRow {
  [name: string]:  string |Heading[];
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
        const name = names[index]
        console.log(name,siteData,"PRZED")
        const data = siteData[name];
        tempObj[name] = data.headings;
      }
      
      res.push({ ...tempObj });
    }
  });
  console.log(res,"kkoniec")
  return res;
};
