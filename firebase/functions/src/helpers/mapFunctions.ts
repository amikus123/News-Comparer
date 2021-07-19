import { WordMap } from "../interfaces";

export const createWordMap = (
  headings: string[],
  excludedWords: string[] = []
) => {
  const wordMap: WordMap = {};
  for (let i in headings) {
    const arrayOfWords = headings[i].split(" ");
    // removes special characters
    // arrayOfWords.map((word) => {
    //   return word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    // });
    for (let j in arrayOfWords) {
      arrayOfWords[j] = arrayOfWords[j]
        // i may consider adding more to this regex
        .replace(/[^\p{L}\p{N}\-\+]/gu, "")
        .toLowerCase();
      let word = arrayOfWords[j];
      if (excludedWords.indexOf(word) === -1 && word !== "") {
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

export const combineWordMaps = (data: WordMap[]) => {
  const result: WordMap = {}; 
  data.forEach((basket) => {
    for (let [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value; 
      } else {
        result[key] = value;
      }
    }
  });
  return result;
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
