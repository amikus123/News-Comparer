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
import { AnyMap,WebsiteJointDataMap } from "../../interfaces";
import { getNamesFromGraphData } from "./WordsFunctions";

const Graph = ({data,webisteJointDataMap}:{data:AnyMap[],webisteJointDataMap:WebsiteJointDataMap}) => {
  return (
    <ResponsiveContainer height={500}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.length > 0
            ? getNamesFromGraphData(data[0]).map((name, index) => {
                return (
                  <Bar
                    dataKey={name}
                    fill={`#${webisteJointDataMap[name].color}`}
                    key={index}
                  />
                );
              })
            : null}
          <Bar dataKey="total" fill="#38AE1A" />
        </BarChart>
      </ResponsiveContainer>
  )
}

export default Graph
