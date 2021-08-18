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

const MobileGraph = ({
  data,
  webisteJointDataMap,
  passedData,
}: {
  data: NameToWordMap;
  webisteJointDataMap: WebsiteJointDataMap;
  passedData: AnyMap[];
}) => {
  return (
    <>
      {passedData.length > 0 ? (
        <ResponsiveContainer
          height={250}
          width="100%"
          className="words--mobile-graph"
        >
          <BarChart
            data={passedData}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="word" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {passedData.length > 0
              ? getNamesFromGraphData(data).map((name, index) => {
                  return (
                    <Bar
                      dataKey={name}
                      fill={`#${
                        webisteJointDataMap[name.replace(" ", "_")]
                          ? webisteJointDataMap[name.replace(" ", "_")].color
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

export default MobileGraph;
