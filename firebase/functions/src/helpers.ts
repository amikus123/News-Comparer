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
  const wordMap: Map<string, number> = new Map();
  for (let heading in headings) {
    const arrayOfWords = heading.split(" ");
    for (let word in arrayOfWords) {
      if (excludedWords.indexOf(word) == -1) {
        if (wordMap.has(word)) {
          wordMap.set(word, wordMap.get(word)! + 1);
        } else {
          wordMap.set(word, 1);
        }
      }
    }
  }
  return wordMap;
};

export const combineWordMaps = (listOfMaps: Map<string, number>[]) => {
  const mapToReturn = listOfMaps[0];
  for (let i = 1; i < listOfMaps.length; i++) {
    for (let [key, value] of listOfMaps[i]) {
      if (mapToReturn.has(key)) {
        mapToReturn.set(key, mapToReturn.get(key)! + value);
      } else {
        mapToReturn.set(key, value);
      }
    }
  }
  return mapToReturn;
};
export const sumOfMapValues = (map: Map<string, number>) => {
  let number = 0;
  for (let value of map.values()) {
    number += value;
  }
  return number;
};
