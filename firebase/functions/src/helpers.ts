import { WebsiteDatabaseEntry } from "./interfaces";

const getWebsitesInfo = async (db: FirebaseFirestore.Firestore) => {
  const docRef = db.collection("Websites").doc("WebisteData");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      console.log("No such document!");
    })
    .catch((e) => {
      console.error("Error getting website info ", e);
    });
  console.log(data);
};
const getExcludedWords = async (db: FirebaseFirestore.Firestore) => {
  const docRef = db.collection("MetaData").doc("ExcludedWords");
  const data = await docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      }
      console.log("No such document!");
    })
    .catch((e) => {
      console.error("Error getting excluded words ", e);
    });
  console.log(data);
};
