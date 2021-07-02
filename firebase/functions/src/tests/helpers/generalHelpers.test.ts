import { removeInternalStopSymbols } from "../../helpers/generalHelpers";
// to do
it("should correctly change string", () => {
  let text = "A.a.";
  const x = removeInternalStopSymbols(text);
  expect(x).toBe("A a.")
});
