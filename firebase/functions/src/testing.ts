export const createWordMap = (headings: string[]) => {
  const wordMap: any = {};
  for (let x in headings) {
    const arrayOfWords = headings[x].split(" ");
    // console.log(arrayOfWords);
    for (let x in arrayOfWords) {
      // console.log(arrayOfWords[word]);
      let word = arrayOfWords[x];
      if (true) {
        if (wordMap.hasOwnProperty(word)) {
          wordMap[word] = wordMap[word] + 1;
        } else {
          wordMap[word] = 1;
        }
      }
    }
  }
  console.log(wordMap);
  return wordMap;
};

const arr1 = [
  "Górny: Dzisiaj do upadku Rzeczpospolitej mogą Pana Pana doprowadzić jurgieltnicy w pseudo-tęczowych garniturach",
];
const arr2 = ["Jaki do Lapida: h1ańbą jest Pana Pana nieuctwo!"];

const combineWordMaps = (listOfMaps: any[]) => {
  console.log(listOfMaps, "LISTA MAP");
  const mapToReturn = listOfMaps[0];
  for (let i = 1; i < listOfMaps.length; i++) {
    const keys = Object.keys(listOfMaps[i]);
    for (let x in keys) {
      let word = listOfMaps[i][keys[x]];
      if (mapToReturn.hasOwnProperty(keys[x])) {
        mapToReturn[keys[x]] += listOfMaps[i][keys[x]];
      } else {
        mapToReturn[keys[x]] = listOfMaps[i][keys[x]];
      }
    }
  }
  return mapToReturn;
};
const map1 = createWordMap(arr1);

const map2 = createWordMap(arr2);
// console.log(combineWordMaps([map1, map2]), "res");
const sumOfMapValues = (map: any) => {
  let number = 0;
  const keys = Object.keys(map);
  for (let value of keys) {
    number += map[value];
  }
  return number;
};
console.log(sumOfMapValues(combineWordMaps([map1, map2])));
