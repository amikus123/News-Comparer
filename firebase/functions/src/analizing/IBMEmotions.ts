const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
import { removeInternalStopSymbols } from "../helpers/generalHelpers";
import { watsonKet } from "./watsonKey";

const toneAnalyzer = new ToneAnalyzerV3({
  version: "2017-09-21",
  authenticator: new IamAuthenticator({
    apikey: watsonKet,
  }),
  serviceUrl: "https://api.eu-de.tone-analyzer.watson.cloud.ibm.com",
});

export const getTextEmotions = async (translatedHeadings: string[]) => {
  const arr = [];
  // ibm accepts a long string in english
  for (let word in translatedHeadings) {
    // removes symbols thaht would incorrectly divide the string
    arr.push(removeInternalStopSymbols(word));
  }
  let text = arr.join(" ");

  const toneParams = {
    toneInput: { text: text },
    contentType: "application/json",
  };
  const rawData = await toneAnalyzer.tone(toneParams);
  // console.log(rawData.result);
  return rawData.result.sentences_tone;
};
