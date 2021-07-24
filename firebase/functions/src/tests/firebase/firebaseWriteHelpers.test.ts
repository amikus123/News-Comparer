import {
  getUnit8OFCompressed,
  dowloadFileAndStoreIt,
  createDirs,
  removeFile,
} from "../../firebase/firebaseWriteHelpers";
import { ScreenshotToUpload } from "../../interfaces";

const URLFromInternet = [
  "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
  "https://lh3.googleusercontent.com/ogw/ADea4I7Bu2z-QAmmvqiLauaOSNt-FTj7KfbTcLiGXKP5=s32-c-mo",
];

describe("aasa", () => {
  test("asdasdas", async () => {
    await createDirs();
    // for(let index in URLFromInternet){
    //   const newFileName = `${index}.jpg`
    //   const x = await dowloadFileAndStoreIt(URLFromInternet[index], newFileName);
    //   expect(x).toBe(
    //     `C:\\Users\\Amadeusz\\AppData\\Local\\Temp\\uncompressed\\${newFileName}`
    //     );
    //     // may need check if last action was done
    //     const c  :ScreenshotToUpload[]= await getUnit8OFCompressed([x]);
    //     expect(c[0].imageUintData).not.toHaveLength(0);
    //     console.log(c[0].imageUintData.length)
    //     const pog = await removeFile(x)
    //     expect(pog).toBe(true)

    //   }
        
    // add removal of tmp dirs
  });
});
