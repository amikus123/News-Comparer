import React, { useEffect,useState } from "react";
import { HeadingsByDate, FringeDates, } from "../../interfaces";
import HeadingsRow from "./HeadingsRow"
import {HeadingRow, getSelectedHeadings } from "./HeadingsFunctions";
const Headings = ({
  names,
  chosenDates,
  headingMap,
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
}) => {
  const [columnHeadingData,setColumnHeadingData] = useState<HeadingRow[]>([])
  useEffect(() => {
    const res = getSelectedHeadings(names, chosenDates, headingMap);
    console.log(res, "headins");
    setColumnHeadingData(res)
  }, [names, chosenDates, headingMap]);

  return <div>
    {columnHeadingData.map((row,index)=>{
      return <HeadingsRow headingsRow={row} key={index}  names={names}/>
    })}
  </div>;
};

export default Headings;
