import { useState } from "react";
import { NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import Graph from "./Graph";
import MobileGraphs from "./MobileGraphs";

import WordSlider from "./WordSlider";

const GraphsByPopularity = ({
  wordDataOfAll,
  wordDataOfSelected,
  webisteJointDataMap,
  sortedSelectedWordsByCount,
  sortedAllWordsByCount,
}: {
  wordDataOfAll: NameToWordMap;
  wordDataOfSelected: NameToWordMap;
  webisteJointDataMap: WebsiteJointDataMap;
  sortedSelectedWordsByCount: string[];
  sortedAllWordsByCount: string[];
}) => {
  const [value, setValue] = useState<number>(1);

  return (
    <div className="words--popularity-container">
      <WordSlider value={value} setValue={setValue} />
      {Object.keys(wordDataOfAll).length > 0 &&
      sortedSelectedWordsByCount.length > 0 ? (
        <>
          <Graph
            data={wordDataOfSelected}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={sortedSelectedWordsByCount}
            wordCount={value}
          />

          <Graph
            data={wordDataOfAll}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={sortedAllWordsByCount}
            wordCount={value}
          />

          <MobileGraphs
            data={wordDataOfSelected}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={sortedSelectedWordsByCount}
            wordCount={value}
          />
          <MobileGraphs
            data={wordDataOfAll}
            webisteJointDataMap={webisteJointDataMap}
            wordOrder={sortedAllWordsByCount}
            wordCount={value}
          />
        </>
      ) : null}
    </div>
  );
};

export default GraphsByPopularity;
