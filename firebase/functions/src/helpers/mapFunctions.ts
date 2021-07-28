import { WordMap,ExcludedWords } from "../interfaces";

export const createWordMap = (
  headings: string[],
  excludedWords: ExcludedWords
) => {
  const wordMap: WordMap = {};
  let wordCount = 0
  for (let i in headings) {
    const arrayOfWords = headings[i].split(" ");
    wordCount+=arrayOfWords.length
    // removes special characters
    arrayOfWords.map((word) => {
      return word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    });
    for (let j in arrayOfWords) {
      arrayOfWords[j] = arrayOfWords[j]
        // i may consider adding more to this regex
        // removes symbols such as / - etc
        .replace(/[^\p{L}\p{N}\-\+]/gu, "")
        .toLowerCase();
      let word = arrayOfWords[j];
      if (excludedWords[word] === undefined && word !== "") {
        if (wordMap.hasOwnProperty(word)) {
          wordMap[word] = wordMap[word] + 1;
        } else {
          wordMap[word] = 1;
        }
      }
    }
  }
  return {
    wordMap,
    wordCount
  };
};

export const combineWordMaps = (data: WordMap[]) => {
  const result: WordMap = {}; 
  console.log(data)
  data.forEach((basket) => {
    if(basket){

    for (let [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value; 
      } else {
        result[key] = value;
      }
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
