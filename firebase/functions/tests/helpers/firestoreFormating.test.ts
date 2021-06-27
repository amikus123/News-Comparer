import {
  createSiteDailyEntry,
  createArrayOfDailySiteData,
  createDailyEntry,
} from "../../src/helpers/firestoreFormating";
const siteData = {
  headings: ["test test pog", "test bad a"],
  imageName: "image.jpg",
  analizeEmotions: false,
  nameToDisplay: "TestSite",
};
const excludedWords = ["a"];
describe("testing formating functions of firestore", () => {
  it("should give correct daily site entry", async () => {
    const result = await createSiteDailyEntry(siteData, excludedWords);
    const { nameToDisplay, analizeEmotions, headings, imageName } = siteData;
    expect(result).toStrictEqual({
      websiteName: nameToDisplay,
      imageName,
      wordCount: 5,
      frequencyOfWords: {
        test: 3,
        pog: 1,
        bad: 1,
      },
      headingsData: [{ text: "test test pog" }, { text: "test bad a" }],
    });
  });
});
