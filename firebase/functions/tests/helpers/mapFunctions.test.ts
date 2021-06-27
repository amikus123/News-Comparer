import "jest";

import {
  createWordMap,
  combineWordMaps,
  sumOfMapValues,
} from "../../src/helpers/mapFunctions";
const exampleOfWordArray1 = ["test", "test", "not", "pog", "nah"];
const exampleOfWordArray2 = ["test", "not", "not", "bruh"];
const excludedWords = ["test"];
describe("Testing map functions", () => {
  test("should create a correct word map", () => {
    expect(createWordMap(exampleOfWordArray1)).toStrictEqual({
      test: 2,
      not: 1,
      pog: 1,
      nah: 1,
    });
    expect(createWordMap(exampleOfWordArray2)).toStrictEqual({
      test: 1,
      not: 2,
      bruh: 1,
    });
    expect(createWordMap(exampleOfWordArray1, excludedWords)).toStrictEqual({
      not: 1,
      pog: 1,
      nah: 1,
    });
    expect(createWordMap(exampleOfWordArray2, excludedWords)).toStrictEqual({
      not: 2,
      bruh: 1,
    });
  });
  test("should correctly join two maps", () => {
    const map1 = createWordMap(exampleOfWordArray1);
    const map2 = createWordMap(exampleOfWordArray2);

    expect(combineWordMaps([map1, map2])).toStrictEqual({
      test: 3,
      not: 3,
      bruh: 1,
      pog: 1,
      nah: 1,
    });
    expect(combineWordMaps([map1])).toStrictEqual(map1);
  });
  test("should correctly sum maps", () => {
    const map1 = createWordMap(exampleOfWordArray1);
    const map2 = createWordMap(exampleOfWordArray2);
    const jointMap = combineWordMaps([map1, map2]);
    expect(sumOfMapValues([map1])).toBe(5);
    expect(sumOfMapValues([map2])).toBe(4);
    expect(sumOfMapValues([map2, map1])).toBe(9);
    expect(sumOfMapValues([map2, map2])).toBe(8);
    expect(sumOfMapValues([jointMap])).toBe(9);
  });
});
