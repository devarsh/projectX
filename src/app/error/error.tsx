import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import SuccessImg from "assets/images/success.svg";
import { useNavigate } from "react-router";
import { useStyles } from "./style";

export const ErrorPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const returnToHomePage = () => {
    navigate("/crm");
  };
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
      <Button onClick={returnToHomePage}>Return to Home Page</Button>
    </Box>
  );
};
