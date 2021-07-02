import { initializeApp } from "firebase/app";
import { getFirestore,collection,getDocs } from "firebase/firestore";


const firebaseApp = initializeApp({
  apiKey: "AIzaSyDQoHVRwE1UXiAuIbU5YU3fJL3iDzmSx_I",
  authDomain: 'newscomparer.firebaseapp.com',
  projectId: 'newscomparer'
})

const db = getFirestore();

export const getHeadingDailyData = async() =>{
  const querySnapshot = await getDocs(collection(db, "Headings"));
  console.log("click")
  console.log(querySnapshot)
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}

