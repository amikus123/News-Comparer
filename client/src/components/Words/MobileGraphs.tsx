import { useState, useEffect } from "react";

import { AnyMap, NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import MobileGraph from "./MobileGraph";
import { getNamesFromGraphData } from "./WordsFunctions";

const MobileGraphs = ({
  data,
  webisteJointDataMap,
  wordOrder,
  wordCount,
}: {
  data: NameToWordMap;
  webisteJointDataMap: WebsiteJointDataMap;
  wordOrder: string[];
  wordCount: number;
}) => {
  const [graphData, setGraphData] = useState<AnyMap[]>([]);
  useEffect(() => {
    const res: AnyMap[] = [];
    const names = getNamesFromGraphData(data);

    for (let i = 0; i < wordCount; i++) {
      const currentWord = wordOrder[i];
      const currentGraphMap: AnyMap = { word: currentWord };
      for (const name of names) {
        const wordCount =
          data[name][currentWord] !== undefined ? data[name][currentWord] : 0;
        currentGraphMap[name] = wordCount;
      }
      res.push(currentGraphMap);
    }
    setGraphData(res);
  }, [data, wordCount, wordOrder]);

  return (
    <>
      {graphData.map((data, index) => {
        return (
          <MobileGraph
            data={data}
            key={index}
            webisteJointDataMap={webisteJointDataMap}
            passedData={[data]}
          />
        );
      })}
    </>
  );
};

export default MobileGraphs;
