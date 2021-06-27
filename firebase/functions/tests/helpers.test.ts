import "jest";

import {
  createFormatedDate,
  createWordMap,
  combineWordMaps,
} from "../src/helpers";
const exampleOfWordArray1 = ["test", "test", "not", "pog"];
const exampleOfWordArray2 = ["test", "not", "not", "bruh"];

test("should create a correct word map", () => {
  expect(createWordMap(exampleOfWordArray1)).toStrictEqual({
    test: 2,
    not: 1,
    pog: 1,
  });
});
