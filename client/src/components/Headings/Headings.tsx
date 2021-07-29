import React, { useEffect,useState,Dispatch,SetStateAction } from "react";
import { HeadingsByDate, FringeDates, WordToWordMap} from "../../interfaces";
import HeadingsRow from "./HeadingsRow"
import {HeadingRow, getSelectedHeadings } from "./HeadingsFunctions";
const Headings = ({
  names,
  chosenDates,
  headingMap,
  downloadedHeadingImages,
  setDowloadedHeadingImages
}: {
  names: string[];
  chosenDates: FringeDates;
  headingMap: HeadingsByDate;
  downloadedHeadingImages:WordToWordMap;
  setDowloadedHeadingImages:Dispatch<SetStateAction<WordToWordMap>>;
}) => {
  const [columnHeadingData,setColumnHeadingData] = useState<HeadingRow[]>([])
  useEffect(() => {
    const res = getSelectedHeadings(names, chosenDates, headingMap);
    console.log(res, "headins");
    setColumnHeadingData(res)
  }, [names, chosenDates, headingMap]);

  return <div className="reverse">
    {columnHeadingData.map((row,index)=>{
      return <HeadingsRow headingsRow={row} key={index}  names={names}  downloadedHeadingImages={downloadedHeadingImages}
      setDowloadedHeadingImages={setDowloadedHeadingImages}/>
    })}
  </div>;
};

export default Headings;
