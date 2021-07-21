import {
  getUnit8OFCompressed,
  dowloadFileAndStoreIt,
  createDirs,
} from "../../firebase/firebaseWriteHelpers";

const URLFromInternet = [
  "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
  "https://lh3.googleusercontent.com/ogw/ADea4I7Bu2z-QAmmvqiLauaOSNt-FTj7KfbTcLiGXKP5=s32-c-mo",
];

describe("aasa", () => {
  test("asdasdas", async () => {
    await createDirs();
    const x = await dowloadFileAndStoreIt(URLFromInternet[0], "halo.jpg");
    expect(x).toBe(
      "C:\\Users\\Amadeusz\\AppData\\Local\\Temp\\uncompressed\\halo.jpg"
    );
    if (x) {
      const c = await getUnit8OFCompressed([x]);
      expect(c).toBe({});
    }

    // add removal of tmp dirs
  });
});
