import { SingleWebisteConstData } from "./interfaces";

export const getWebsitesInfo = async (db: FirebaseFirestore.Firestore) => {
  const docRef = db.collection("Websites").doc("WebsiteData");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const list: SingleWebisteConstData[] = doc.data()!.listOfWebsites;
        return list;
      }
      console.log("No such document!");
      return null;
    })
    .catch((e) => {
      console.error("Error getting website info ", e);
      return null;
    });
  console.log(data);
  return data;
};
export const getExcludedWords = async (
  db: FirebaseFirestore.Firestore
): Promise<string[]> => {
  const docRef = db.collection("MetaData").doc("ExcludedWords");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const listOfWords: string[] = doc.data()!.Words;
        return listOfWords;
      }
      console.log("No such document!");
    })
    .catch((e) => {
      console.error("Error getting excluded words ", e);
    });
  console.log(data);
  return data || [];
};
export const createFormatedDate = () => {
  // creates string in format DD-MM-YYYY
  const time = new Date();
  return `${time.getDay()}-${time.getMonth()}-${time.getFullYear()}`;
};
export const createWordMap = (headings: string[], excludedWords: string[]) => {
  const wordMap: any = {};
  for (let x in headings) {
    const arrayOfWords = headings[x].split(" ");
    // console.log(arrayOfWords);
    for (let x in arrayOfWords) {
      // console.log(arrayOfWords[word]);
      let word = arrayOfWords[x];
      if (excludedWords.indexOf(word) !== -1) {
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

export const combineWordMaps = (listOfMaps: any[]) => {
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
export const sumOfMapValues = (map: any) => {
  let number = 0;
  const keys = Object.keys(map);
  for (let value of keys) {
    number += map[value];
  }
  return number;
};
