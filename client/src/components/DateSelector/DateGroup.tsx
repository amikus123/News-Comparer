import DateSlider from "./DateSlider"
import DateSelector from "./DateSelector"
import { FringeDates } from "../../interfaces"

const DateGroup = ({fringeDates,updateChosenDates,chosenDates}:{chosenDates:FringeDates | null,fringeDates :FringeDates | null,  updateChosenDates: (obj: FringeDates) => void}) => {
  return (
    <div className="date-group--container">
      <DateSelector  fringeDates={fringeDates} updateChosenDates={updateChosenDates} chosenDates = {chosenDates}/>
      <DateSlider  fringeDates={fringeDates} updateChosenDates={updateChosenDates} chosenDates = {chosenDates}/>
    </div>
  )
}

export default DateGroup
