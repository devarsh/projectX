import Box from "@material-ui/core/Box";
import SuccessImg from "assets/images/success.svg";
import { useStyles } from "./style";

export const ErrorPage = () => {
  const classes = useStyles();

  return (
    <Box
      className={classes.wrapper}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <img alt="" src={SuccessImg} className={classes.successImg} />
      <Box className={classes.center} mt={3} mb={3}>
        <h3 className="theme-color2">Something Unexpected Happend</h3>
      </Box>
    </Box>
  );
};
