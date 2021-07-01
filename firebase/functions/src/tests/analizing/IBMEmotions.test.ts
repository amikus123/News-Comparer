import { getTextEmotions } from "../../analizing/IBMEmotions";

const transaltedHeaders = [
  "William and Harry reunite at Diana statue unveiling",
  "Thousands seek refuge from wave of violence in Haiti's capital city",
];
describe("testing watson tone api", () => {
  it("should retturn correct objects", async () => {
    const data = await getTextEmotions(transaltedHeaders);
    expect(data.sentences_tone).toHaveLength(2);
  });
});
