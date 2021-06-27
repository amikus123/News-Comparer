import { SingleWebisteConstData, WordMap } from "../interfaces";

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

