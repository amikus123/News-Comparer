const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  projectId: "newscomparer",
  keyFilename: "./secret.json",
});

export async function translateText(text: string[]): Promise<string[]> {
  // splitting in half beacuse of google api limit
  const middle = Math.floor(text.length / 2);
  const left = text.slice(0, middle);
  const right = text.slice(middle);
  let firstHalf = await translate.translate(left, "en");
  let secondHalf = await translate.translate(right, "en");
  return [...firstHalf[0],...secondHalf[0]];
}
