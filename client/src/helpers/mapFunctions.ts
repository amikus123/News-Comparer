import { WordMap } from "../interfaces";
export const combineWordMaps = (data: WordMap[]) => {
  const result: WordMap = {}; 
  data.forEach((basket) => {
    for (let [key, value] of Object.entries(basket)) {
      if (result[key]) {
        result[key] += value; 
      } else {
        result[key] = value;
      }
    }
  });
  return result;
};
export const sumOfMapValues = (maps: WordMap[]) => {
  let number = 0;
  for (let i = 0; i < maps.length; i++) {
    const keys = Object.keys(maps[i]);
    for (let index in keys) {
      number += maps[i][keys[index]];
    }
  }
  return number;
};
export const sortKeysByCount = (map:WordMap) : string[]=> {
 
  const entries = Object.entries(map)
  var sorted = entries.sort(function(a, b) {
    return b[1] - a[1];
  });
  
  return sorted.map((item)=>item[0])

}

