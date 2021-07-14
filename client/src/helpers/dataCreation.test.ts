import {
  formatedYearFromDate,
  getNPreviousDates,
  formatedYearsFromDates,
  createFileNames,
} from "./dataCreation";

// 2003 1 13
describe("performing test for functions interacting with dates", () => {
  let baseDate = new Date(),
    monthChange = new Date(),
    yearChange = new Date();
  beforeEach(() => {
    baseDate = new Date(2003, 0, 13);
    monthChange = new Date(2003, 1, 1);
    yearChange = new Date(2004, 0, 1);
  });

  it("should return correct string", () => {
    const formated = formatedYearFromDate(baseDate);
    expect(formated).toBe("13-0-2003");
  });

  it("should return correct previous dates", () => {
    const changedMonth = formatedYearsFromDates(
      getNPreviousDates(2, monthChange)
    );
    expect(changedMonth).toEqual(["1-1-2003", "31-0-2003","30-0-2003"]);
    const changedYear = formatedYearsFromDates(
      getNPreviousDates(1, yearChange)
    );
    expect(changedYear).toEqual(["1-0-2004", "31-11-2003"]);
  });

  it("should return correct file names", () => {
    console.log(baseDate, "baza");
    const res = createFileNames("onet", 2, baseDate);
    const expected = [
      "13-0-2003-onet.jpg",
      "12-0-2003-onet.jpg",
      "11-0-2003-onet.jpg",
    ];
    expect(res).toEqual(expected);
  });

  it("should return correct formated strings", () => {
    const formated = formatedYearsFromDates([baseDate, yearChange]);
    expect(formated).toEqual(["13-0-2003", "1-0-2004"]);
  });
  it("functions should be pure", () => {
    const formated1 = formatedYearFromDate(baseDate);
    const formated2 = formatedYearFromDate(monthChange);
    const formated3 = formatedYearFromDate(yearChange);
    expect(formated1).toBe("13-0-2003");
    expect(formated2).toBe("1-1-2003");
    expect(formated3).toBe("1-0-2004");
  });
});
