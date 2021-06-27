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
  const ddd = await toneAnalyzer.tone(toneParams);
  return JSON.stringify(ddd, null, 2);
};

const x = async () => {
  const b = await getTextEmotions([
    "How Russian threats in the 2000s turned this country into the go-to expert on cyber defense",
    "Mysterious ancient 'dragon man' joins the human family tree",
  ]);
  console.log(b);
};
x();
