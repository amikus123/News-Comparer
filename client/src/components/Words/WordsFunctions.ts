import {
  getAllDatesBetween,
  formatedYearsFromDates,
} from "../../helpers/dataCreation";
import { combineWordMaps } from "../../helpers/mapFunctions";
import {
  TotalGraphData,
  AnyMap,
  FringeDates,
  HeadingsByDate,
  WordMap,
  NameToWordMap,
} from "../../interfaces";

export const getFormatedDataToGraph = (
  totalData: TotalGraphData,
  selected: [string, number][]
) => {
  const keys = Object.keys(totalData);
  const res: AnyMap[] = [];
  selected.forEach((entry) => {
    const word = entry[0];
    const capitalizedWord =
      word.charAt(0).toUpperCase() + word.slice(1, word.length);
    const tempObj: AnyMap = {
      word: capitalizedWord,
    };
    keys.forEach((key) => {
      let count = 0;
      console.log(totalData[key], "BUM");
      if (totalData[key].frequencyOfWords[word] !== undefined) {
        count = totalData[key].frequencyOfWords[word];
      }
      tempObj[key] = count;
    });
    res.push({
      ...tempObj,
    });
  });
  console.log(res, "RES");
  return res;
};

export const passOnlyChosenData = (
  names: string[],
  fringeDates: FringeDates,
  fullHeadings: HeadingsByDate
) => {
  const res: TotalGraphData = {};
  const datesBetween = getAllDatesBetween(fringeDates);
  // webistes and "total"
  names.forEach((name) => {
    res[name] = {
      frequencyOfWords: {},
      totalWordCount: 0,
    };
  });
  res.total = {
    frequencyOfWords: {},
    totalWordCount: 0,
  };

  const formatedDates = formatedYearsFromDates(datesBetween);
  // we get  word data only for dates in range
  formatedDates.forEach((date) => {
    const data = fullHeadings[date].totalDailySiteData;
    names.forEach((name) => {
      const found = data[name];
      console.log(found);
      const newMap = combineWordMaps([
        found.pageDailyFrequencyOfWords,
        res[name].frequencyOfWords,
      ]);
      const newCount = found.pageDailyWordCount + res[name].totalWordCount;
      res[name] = {
        frequencyOfWords: newMap,
        totalWordCount: newCount,
      };
    });
  });

  let totalCount = 0;

  let totalMaps: WordMap[] = [];

  names.forEach((name) => {
    totalCount += res[name].totalWordCount;
    totalMaps.push(res[name].frequencyOfWords);
  });

  res.total = {
    frequencyOfWords: combineWordMaps(totalMaps),
    totalWordCount: totalCount,
  };

  return res;
};

export const getNamesFromGraphData = (data: NameToWordMap): string[] => {
  const names = Object.keys(data);
  console.log(names)
  console.log(
    names.filter((item) => {
      return item !== "word";
    }),
    "RESZZZZZ"
  );
  return names.filter((item) => {
    return  item !== "word";
  });
};

export const returnGraphData = () =>{
  
}