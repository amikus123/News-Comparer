import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Get a reference to the storage service, which is used to create references in your storage bucket

// const firebaseConfig = {
//   apiKey: "AIzaSyDQoHVRwE1UXiAuIbU5YU3fJL3iDzmSx_I",
//   authDomain: "newscomparer.firebaseapp.com",
//   projectId: "newscomparer",
//   storageBucket: "newscomparer.appspot.com",
// };
// const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage();

// Create a storage reference from our storage service
export const getImgSrcFronName = async (fileName = "4-6-2021-TVP_info.jpg") => {
  console.log(fileName);
  getDownloadURL(ref(storage, fileName))
    .then((url) => {
      // const xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   const blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();
      console.log(url);
      return url;
    })
    .catch((error) => {
      console.error("failed fetching", error);
      return ""
      // Handle any errors
    });
};
