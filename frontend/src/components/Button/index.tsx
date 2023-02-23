import React from "react";
import { Button } from "@mui/material";

interface Props {
  label: string;
  Icon?: React.ElementType;
  handleClick?: () => void;
  nameClass?: string;
}

const ButtonControl = (props: Props) => {
  const { label, Icon, handleClick, nameClass } = props;

  return (
    <Button variant="contained" className={nameClass} onClick={handleClick}>
      {Icon ? <Icon sx={{ paddingRight: "5px" }} /> : ""} {label}
    </Button>
  );
};

export default ButtonControl;
