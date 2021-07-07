import { useEffect, useState } from "react";
import { getWebisteLogo } from "../../firebase/firebaseAccess";

const WebisteImage = ({name}:{name:string}) => {
  const [src, setSrc] = useState<string>("");
  useEffect(() => {
    const x = async () => {
      const a = await getWebisteLogo(name)
      console.log(a,"TEST")
      setSrc(a)
    };
    x()
  }, []);
  return <img src={src} alt="" />;
};

export default WebisteImage;
``