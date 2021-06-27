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
  console.log(a, "po");
  let text = a.join(" ");
  console.log(text, "XD");
  // text =
  //   "Team, I know that times are tough! Product " +
  //   "sales have been disappointing for the past three " +
  //   "quarters. We have a competitive product, but we " +
  //   "need to do a better job of selling it!";

  const toneParams = {
    toneInput: { text: text },
    contentType: "application/json",
  };

  toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => {
      console.log(JSON.stringify(toneAnalysis, null, 2));
      return JSON.stringify(toneAnalysis, null, 2);
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
getTextEmotions([
  "How Russian threats in the 2000s turned this country into the go-to expert on cyber defense",
  "Mysterious ancient 'dragon man' joins the human family tree",
]);
