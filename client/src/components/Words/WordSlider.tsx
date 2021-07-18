import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';



function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSlider({
    value,
    setValue,
  }: {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
  }) {
    const handleChange = (e:ChangeEvent<{}>,val:number|number[])=>{
      if(typeof val ==="number"){
        setValue(val/10)
      }else{
        console.error("it shouldnt print")
      }
    }
  return (
    <div >
      <Typography id="discrete-slider" gutterBottom>
        Temperature
      </Typography>
      <Slider
        defaultValue={10}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        onChange={handleChange}
        marks
        min={10}
        max={110}
      />
    </div>
  );
}