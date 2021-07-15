import { createFileNames } from "../helpers/dataCreation";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

// return src of image from firebase storage
export const getImgSrcFronName = async (fileName: string): Promise<string> => {
  const x = getDownloadURL(ref(storage, fileName))
    .then((url) => {
      console.log(url, "success");
      return url;
    })
    .catch((error) => {
      console.error("failed fetching", error);
      return "";
      // Handle any errors
    });
  return x;
};
export const fetchAllScreenshotsURLFromName = async (
  names: string[]
): Promise<string[]> => {
  const ret: string[] = [];
// change to dynamic
for( let name of names){
  const url = await getImgSrcFronName(`10-6-2021-${name}.jpg`);
  ret.push(url);
}
  return ret;
  // check
};
export const fetchScreenshotsFromNDays =async (name:string,n:number) => {
  const names = createFileNames(name,n)
  console.log(names)
  const res =  await fetchAllScreenshotsURLFromName(names)
  return res
}
