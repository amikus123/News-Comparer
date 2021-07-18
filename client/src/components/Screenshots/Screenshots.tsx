import {useState,useEffect} from "react"
import { Grid } from "@material-ui/core";
import ScreenshotRow from "./ScreenshotRow"
import {DateTypo} from "../Typography/CustomTypo"
import { FringeDates } from "../../interfaces";
import {getAllDatesBetween,formatedYearsFromDates} from "../../helpers/dataCreation"
const Screenshots = ({
  setFullScreenImage,
  chosenScreenshots,
  chosenDates
}: {
  setFullScreenImage: (src: string) => void;
  chosenScreenshots: string[][];
  chosenDates:FringeDates
}) => {
  const [formatedDates,setFormatedDates] = useState<string[]>([])
  useEffect(()=>{
    setFormatedDates(formatedYearsFromDates(getAllDatesBetween(chosenDates)));
  },[chosenDates])
  return (  
    <Grid container direction="column-reverse" justify="center">
       { chosenScreenshots[0].map((arr, index) => {
          return (
            <Grid item container justify="center" alignItems="center" direction="column"  key={index} >  
            <DateTypo margin={true} >{formatedDates[index]}</DateTypo>
            <ScreenshotRow key={index}
              setFullScreenImage={setFullScreenImage}
              screenshots={[
                chosenScreenshots[0][index],
                chosenScreenshots[1][index],
                chosenScreenshots[2][index]
              ]}
            />
            </Grid>
          );
        })}
    
    </Grid>
  );
};

export default Screenshots;
