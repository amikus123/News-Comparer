import  { ChangeEvent, Dispatch, SetStateAction } from "react";
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
        setValue(val)
      }else{
        console.error("it shouldnt print")
      }
    }
  return (
    <div className="words--slider">
      <Typography id="discrete-slider" gutterBottom align="center">
        Select amount of words to show
      </Typography>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        onChange={handleChange}
        marks
        min={1}
        max={20}
      />
    </div>
  );
}