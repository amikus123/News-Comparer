import { WebisteInfo } from "../interfaces";
import {TotalWebsiteStaticDataMap} from "../interfaces"
export const getStaticWebisteData = async (db: FirebaseFirestore.Firestore) :Promise<TotalWebsiteStaticDataMap> | null =>  {
  const docRef = db.collection("Websites").doc("StaticWebisteData");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const constData: TotalWebsiteStaticDataMap = doc.data();
        return constData;
      }
      console.log("No such document!");
      return null;
    })
    .catch((e) => {
      console.error("Error getting while StaticWebisteData ", e);
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

export const getPageMetaData = async (
  db: FirebaseFirestore.Firestore
): Promise<WebisteInfo> => {
  const docRef = db.collection("MetaData").doc("WebsiteInfo");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const x: WebisteInfo = doc.data();
        return x;
      }
      console.log("No such document!");
    })
    .catch((e) => {
      console.error("Error getting excluded words ", e);
    });
  return data || null;
};
