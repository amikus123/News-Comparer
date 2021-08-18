import React, { useState } from "react";
import Button from "@material-ui/core/Button";

const ShowMoreButton = ({
  state,
  setState,
  className,
  max,
}: {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  className: string;
  max: number;
}) => {
  const [multipliers, setMultipliers] = useState(1);
  const handleClick = () => {
    const newState = state + 3 * multipliers;
    if (newState <= max) {
      setState(newState);
    } else {
      setState(max);
    }
    setMultipliers(multipliers + 1);
  };
  return (
    <>
      {state < max ? (
        <Button
          className={`${className} show-more-button`}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          Show More
        </Button>
      ) : null}
    </>
  );
};

export default ShowMoreButton;
