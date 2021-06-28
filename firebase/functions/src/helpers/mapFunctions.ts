import { WordMap } from "../interfaces";

export const createWordMap = (
  headings: string[],
  excludedWords: string[] = []
) => {
  const wordMap: WordMap = {};
  for (let i in headings) {
    const arrayOfWords = headings[i].split(" ");
    // removes special characters
    arrayOfWords.map((word) => {
      return word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    });
    for (let j in arrayOfWords) {
      arrayOfWords[j] = arrayOfWords[j]
        .replace(/[^a-zA-Z0-9]/g, "")
        .toLowerCase();
      let word = arrayOfWords[j];
      if (excludedWords.indexOf(word) === -1) {
        if (wordMap.hasOwnProperty(word)) {
          wordMap[word] = wordMap[word] + 1;
        } else {
          wordMap[word] = 1;
        }
      }
    }
  }
  return wordMap;
};

export const combineWordMaps = (listOfMaps: WordMap[]) => {
  const mapToReturn: WordMap = {};
  for (let i = 0; i < listOfMaps.length; i++) {
    const keys = Object.keys(listOfMaps[i]);
    for (let x in keys) {
      if (mapToReturn.hasOwnProperty(keys[x])) {
        mapToReturn[keys[x]] += listOfMaps[i][keys[x]];
      } else {
        mapToReturn[keys[x]] = listOfMaps[i][keys[x]];
      }
    }
  }
  return mapToReturn;
};
export const sumOfMapValues = (maps: WordMap[]) => {
  let number = 0;
  for (let i = 0; i < maps.length; i++) {
    const keys = Object.keys(maps[i]);
    for (let index in keys) {
      number += maps[i][keys[index]];
    }
  }
  return number;
};
