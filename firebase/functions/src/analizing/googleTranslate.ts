const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({
  projectId: "newscomparer",
  keyFilename: "../../../../../secret.json",
});

async function translateText(text: string | string[]) {
  let [translations] = await translate.translate(text, "en");
  translations = Array.isArray(translations) ? translations : [translations];
  if (translations.length == 1) {
    return translations[0];
  }
  return translations;
}
