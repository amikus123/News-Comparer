import {TotalWebsiteStaticDataMap ,TotalWebisteWordData} from "../interfaces"
export const getTotalWebsiteStaticData = async (db: FirebaseFirestore.Firestore) :Promise<TotalWebsiteStaticDataMap> | null =>  {
  const docRef = db.collection("Websites").doc("StaticWebisteData");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data(),"HAALO")
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

export const getTotalWebisteWordData = async (
  db: FirebaseFirestore.Firestore
): Promise<TotalWebisteWordData> | null => {
  const docRef = db.collection("Websites").doc("WebsiteWordData");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data(),"ASDads")
        const x= doc.data()!;
        return x;
      }
      console.log("No such document!");
    })
    .catch((e) => {
      console.error("Error getting excluded words ", e);
    });
  return data || null;
};
