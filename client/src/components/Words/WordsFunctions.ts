
import {
  TotalGraphData,
  AnyMap,
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
      // console.log(totalData[key], "BUM");
      if (totalData[key].frequencyOfWords[word] !== undefined) {
        count = totalData[key].frequencyOfWords[word];
      }
      tempObj[key] = count;
    });
    res.push({
      ...tempObj,
    });
  });
  // console.log(res, "RES");
  return res;
};



export const getNamesFromGraphData = (data: NameToWordMap): string[] => {
  const names = Object.keys(data);
  return names.filter((item) => {
    return  item !== "word";
  });
};

