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
import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { getFormatedDataToGraph } from "./WordsFunctions";
import {
  HeadingsByDate,
  FringeDates,
  AnyMap,
  WebsiteJointDataMap,
} from "../../interfaces";
import { passOnlyChosenData } from "../../helpers/stateHelpers";
import { getMaxNValuesFromMap } from "../../helpers/mapFunctions";
import WordSlider from "./WordSlider";
const Words = ({
  names,
  chosenDates,
  headingMap,
  webisteJointData,
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  webisteJointData: WebsiteJointDataMap;
}) => {
  const [data, setData] = useState<AnyMap[]>([]);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const data = passOnlyChosenData(names, chosenDates, headingMap);
    console.log(data,"data",headingMap)
    const selected = getMaxNValuesFromMap(data.total.frequencyOfWords, value);
    console.log(selected,"selected")
    setData(getFormatedDataToGraph(data, selected));
  }, [chosenDates, names, headingMap, value]);

  return (
    <Grid>
      <ResponsiveContainer width={700} height={500}>
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
            ? names.map((name, index) => {
                return (
                  <Bar
                    dataKey={name}
                    fill={`#${webisteJointData[name].color}`}
                    key={index}
                  />
                );
              })
            : null}
          <Bar dataKey="total" fill="#38AE1A" />
        </BarChart>
      </ResponsiveContainer>
      <WordSlider value={value} setValue={setValue} />
    </Grid>
  );
};
export default Words;
