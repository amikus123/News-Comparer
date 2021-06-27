const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const { IamAuthenticator } = require("ibm-watson/auth");
import { watsonKet } from "./watsonKey";

const toneAnalyzer = new ToneAnalyzerV3({
  version: "2017-09-21",
  authenticator: new IamAuthenticator({
    apikey: watsonKet,
  }),
  serviceUrl: "https://api.eu-de.tone-analyzer.watson.cloud.ibm.com",
});

export const getTextEmotions = async (headers: string[]) => {
  //
  // zamień kazdy znak

  let text = "fuck jews! PiS president adamantly: We will not pay";
  const toneParams = {
    toneInput: { text: text },
    contentType: "application/json",
  };

  toneAnalyzer
    .tone(toneParams)
    .then((toneAnalysis) => {
      console.log(JSON.stringify(toneAnalysis, null, 2));
    })
    .catch((err) => {
      console.log("error:", err);
    });
};
getTextEmotions([]);
