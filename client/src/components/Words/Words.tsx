import { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { getFormatedDataToGraph, passOnlyChosenData } from "./WordsFunctions";
import {
  HeadingsByDate,
  FringeDates,
  AnyMap,
  WebsiteJointDataMap,
} from "../../interfaces";
import { getMaxNValuesFromMap } from "../../helpers/mapFunctions";
import WordSlider from "./WordSlider";
import Graph from "./Graph";
const Words = ({
  names,
  chosenDates,
  headingMap,
  webisteJointDataMap,
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  webisteJointDataMap: WebsiteJointDataMap;
}) => {
  const [selectedGraphData, setSelectedGraphData] = useState<AnyMap[]>([]);
  const [fullGrapghData, setFullGrapghData] = useState<AnyMap[]>([]);

  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const allNames = Object.keys(webisteJointDataMap)
    const selectedGraphDataRaw = passOnlyChosenData(names, chosenDates, headingMap);
    const fullGraphDataRaw = passOnlyChosenData(allNames, chosenDates, headingMap);
    const selected2 = getMaxNValuesFromMap(fullGraphDataRaw.total.frequencyOfWords, value);
    const selected = getMaxNValuesFromMap(selectedGraphDataRaw.total.frequencyOfWords, value);
    console.log(selected, "selected");
    setSelectedGraphData(getFormatedDataToGraph(selectedGraphDataRaw, selected));
    setFullGrapghData(getFormatedDataToGraph(fullGraphDataRaw, selected2))
  }, [chosenDates, names, headingMap, value,webisteJointDataMap]);

  return (
    <Grid className="grid--container">
      <WordSlider value={value} setValue={setValue} />
      <Graph data={selectedGraphData} names={names} webisteJointDataMap={webisteJointDataMap} />
      <Graph data={fullGrapghData} names={Object.keys(webisteJointDataMap)} webisteJointDataMap={webisteJointDataMap} />
    </Grid>
  );
};
export default Words;
