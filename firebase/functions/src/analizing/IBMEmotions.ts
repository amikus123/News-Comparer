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

export const getTextEmotions = async (headers: string[]) => {
  // find out why the map version dosent work

  const a = [];
  for (let i = 0; i < headers.length; i++) {
    a.push(removeInternalStopSymbols(headers[i]));
  }
  let text = a.join(" ");

  const toneParams = {
    toneInput: { text: text },
    contentType: "application/json",
  };
  const rawData = await toneAnalyzer.tone(toneParams);
  // console.log(rawData.result);
  if (rawData.result.sentences_tone !== undefined) {
    return rawData.result.sentences_tone;
  } else {
    return null;
  }
};
