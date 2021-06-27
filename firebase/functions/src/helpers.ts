import { SingleWebisteConstData, WordMap } from "./interfaces";

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
  return data || [];
};
export const createFormatedDate = () => {
  // creates string in format DD-MM-YYYY
  const time = new Date();
  return `${time.getDate()}-${time.getMonth()}-${time.getFullYear()}`;
};

// MAP FUNCTIONS
export const createWordMap = (
  headings: string[],
  excludedWords: string[] = []
) => {
  const wordMap: WordMap = {};
  for (let x in headings) {
    const arrayOfWords = headings[x].split(" ");
    // console.log(arrayOfWords);
    for (let x in arrayOfWords) {
      // console.log(arrayOfWords[word]);
      let word = arrayOfWords[x];
      if (excludedWords.indexOf(word) === -1) {
        if (wordMap.hasOwnProperty(word)) {
          wordMap[word] = wordMap[word] + 1;
        } else {
          wordMap[word] = 1;
        }
      }
    }
  }
  return wordMap;
};

export const combineWordMaps = (listOfMaps: WordMap[]) => {
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
export const sumOfMapValues = (maps: WordMap[]) => {
  let number = 0;
  for (let i = 0; i < maps.length; i++) {
    const keys = Object.keys(maps[i]);
    for (let key of keys) {
      number += maps[i][key];
    }
  }
  return number;
};
