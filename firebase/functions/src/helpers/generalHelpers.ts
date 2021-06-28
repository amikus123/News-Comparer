import { Emotions, headingData } from "../interfaces";

export const createFormatedDate = () => {
  // creates string in format DD-MM-YYYY
  const time = new Date();
  return `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
};

export const removeInternalStopSymbols = (text: string) => {
  // IBM api doesn't work as expected if input has following symbols inside, so we this removes them
  const stopCharacters = ["!", "?", ".", ";"];
  const arrOfChars = text.split("");
  for (let i = 0; i < arrOfChars.length - 1; i++) {
    if (stopCharacters.indexOf(arrOfChars[i]) !== -1) {
      arrOfChars[i] = " ";
    }
  }
  if (stopCharacters.indexOf(arrOfChars[arrOfChars.length - 1]) === -1) {
    arrOfChars.push(".");
  }

  return arrOfChars.join("");
};

export const mergeEmotionCount = (first: Emotions, second: Emotions) => {
  for (let key in second) {
    first[key] += second[key];
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
export const getEmotionsFromHeading = (headings: headingData[]) => {
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
  console.log(obj, "CREATED")
  return obj;
};
