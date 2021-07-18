import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useEffect, useState } from "react";
import { getFormatedDataToGraph } from "./WordsFunctions";
import {
  HeadingsByDate,
  FringeDates,
  AnyMap,
} from "../../interfaces";
import { passOnlyChosenData } from "../../helpers/stateHelpers";
import { getMaxNValuesFromMap } from "../../helpers/mapFunctions";
const Words = ({
  names,
  chosenDates,
  headingMap,
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
}) => {
  
  const [data, setData] = useState<AnyMap[]>([]);

  useEffect(() => {
    const data = passOnlyChosenData(names, chosenDates, headingMap);
    const selected = getMaxNValuesFromMap(data.total.frequencyOfWords, 6);
    console.log(selected);
    console.log(getFormatedDataToGraph(data, selected), "HALO GALO");
    setData(getFormatedDataToGraph(data, selected));
  }, [chosenDates, names, headingMap]);

  return (
    <>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="word" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.length > 0 ? (
          names.map((name, index) => {
            return <Bar dataKey={name} fill="#8884d8" key={index} />;
          })
        ) : null
       }
        <Bar dataKey="total" fill="#82ca9d" />

      </BarChart>
    </>
  );
};
export default Words;
