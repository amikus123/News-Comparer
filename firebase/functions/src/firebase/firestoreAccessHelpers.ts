import { TotalWebsiteStaticDataMap, TotalWebisteWordData, AnyMap } from "../interfaces";
export const getTotalWebsiteStaticData = async (
  db: FirebaseFirestore.Firestore
): Promise<TotalWebsiteStaticDataMap | null> => {
  const docRef = db.collection("Websites").doc("StaticWebisteData");
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("successful fetching of StaticWebisteData");
      const constData: TotalWebsiteStaticDataMap = doc.data();
      return constData;
    }
  } catch (error: any) {
    console.error("Error while fetching StaticWebisteData");
    return null;
  }
};

export const getExcludedWords = async (
  db: FirebaseFirestore.Firestore
): Promise<AnyMap | null> => {
  const docRef = db.collection("MetaData").doc("ExcludedWords");
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("successful fetching of ExcludedWords");
      const listOfWords: AnyMap = doc.data()!.ExcludedWords;
      return listOfWords;
    }
  } catch (error: any) {
    console.error("Error while fetching ExcludedWords");
    return null;
  }
};

export const getTotalWebisteWordData = async (
  db: FirebaseFirestore.Firestore
): Promise<TotalWebisteWordData> | null => {
  const docRef = db.collection("Websites").doc("WebsiteWordData");
  try {
    const doc = await docRef.get();
    if (doc.exists) {
      console.log("successful fetching of WebsiteWordData");
      const data: TotalWebisteWordData = doc.data();
      return data;
    }
  } catch (error: any) {
    console.error("Error while fetching WebsiteWordData");
    return null;
  }
};
