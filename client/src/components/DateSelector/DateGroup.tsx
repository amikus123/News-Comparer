import DateSlider from "./DateSlider"
import DateSelector from "./DateSelector"

const DateGroup = () => {
  return (
    <div className="date-group--container">
      <DateSelector/>
      <DateSlider/>
    </div>
  )
}

export default DateGroup
