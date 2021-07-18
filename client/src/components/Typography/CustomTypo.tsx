import { Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const DateTypo = ({children,margin=false}:{children: React.ReactNode,margin:boolean}) =>{
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    base:{
      fontSize:"2rem",
      margin:"1.2rem"
    },
    bigMargin:{
      margin:"2.5rem"
      
    }
  })
);
const classes = useStyles();

  return (
    <Typography  className={`${classes.base} ${margin?classes.bigMargin:""}`}> 
      {children}
 </Typography>
  )
}
