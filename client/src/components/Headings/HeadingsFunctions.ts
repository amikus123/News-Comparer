import {
  formatedYearsFromDates,
  getAllDatesBetween,
} from "../../helpers/dataCreation";
import { FringeDates, HeadingsByDate,HeadingData } from "../../interfaces";
export interface HeadingRow {
  [name: string]: string | HeadingData[];
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
    if(totalData[date]){
    const siteData = totalData[date].totalDailySiteData;
    // not optimal
    console.log(siteData, "XD");
    for(let key in siteData){
      const data = siteData[key]
      console.log(names.indexOf(data.imageName), data.imageName);
      if (names.indexOf(data.imageName) !== -1) {
        tempObj[data.imageName] = data.headings;
      }
    
    }
    // siteData.forEach((data) => {
    //   console.log(names.indexOf(data.imageName), data.imageName);
    //   if (names.indexOf(data.imageName) !== -1) {
    //     tempObj[data.imageName] = data.headingsData;
    //   }
    // });

    res.push({ ...tempObj });
  }

  });


  return res;
};
