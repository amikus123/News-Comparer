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
import { getNamesFromGraphData } from "./WordsFunctions";

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
    console.log(res, "graf");
    setGraphData(res);
  }, [data, wordCount, wordOrder]);

  return (
    <>
      {graphData.length > 0 ? (
        <ResponsiveContainer
          height={
            (Object.keys(graphData[0]).length - 1) * graphData.length * 40
          }
          width="100%"
        >
          <BarChart
            data={graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="word" type="category" />
            <XAxis type="number" allowDecimals={false} />
            <Tooltip />
            <Legend />
            {graphData.length > 0
              ? getNamesFromGraphData(data).map((name, index) => {
                  return (
                    <Bar
                      layout="vertical"
                      dataKey={name}
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
