import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AnyMap, NameToWordMap, WebsiteJointDataMap } from "../../interfaces";
import {
  getNamesFromGraphData,
} from "./WordsFunctions";

const Graph = ({
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

    console.log(names, data, "XD");
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
      {graphData.length > 0 ? (
        <ResponsiveContainer height={500}>
          <BarChart
            data={graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            {graphData.length > 0
              ? getNamesFromGraphData(data).map((name, index) => {
                  return (
                    <Bar
                      dataKey={name.charAt(0).toUpperCase() + name.slice(1)}
                      fill={`#${
                        webisteJointDataMap[name]
                          ? webisteJointDataMap[name].color
                          : "38AE1A"
                      }`}
                      key={index}
                    />
                  );
                })
              : null}
          </BarChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
};

export default Graph;
