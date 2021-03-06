import { Emotions, Heading } from "../interfaces";
const fsPromises = require("fs").promises;

export const createFormatedDate = () => {
  // creates string in format DD-MM-YYYY
  const time = new Date();
  return `${time.getDate()}-${time.getMonth() +1}-${time.getFullYear()}`;
};


export const mergeEmotionCount = (first: Emotions, second: Emotions) => {
  for (let key in second) {
    if (first[key] == undefined) {
      first[key] = second[key];
    } else {
      first[key] += second[key];
    }
  }
  return first;
};
export const createEmotions = (): Emotions => {
  return {
    anger: 0,
    sadness: 0,
    fear: 0,
    joy: 0,
    analytical: 0,
    confident: 0,
    tentative: 0,
  };
};
export const getEmotionsFromHeading = (headings: Heading[]) => {
  const newEmotions = createEmotions();
  for (let heading of headings) {
    if (heading.emotions) {
      for (let emotion in heading.emotions) {
        // newEmotions[emotion] += heading.emotions[emotion];
        newEmotions[emotion] += 1;
      }
    }
  }
  return newEmotions;
};
export const createEmotionsFromIBM = (tones: any) => {
  const obj = {};
  for (let tone of tones) {
    obj[tone["tone_id"]] = tone["score"];
  }
  return obj;
};