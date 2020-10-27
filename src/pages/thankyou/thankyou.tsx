import { useNavigate, useLocation } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SuccessImg from "assets/images/success.svg";

import {
  thankyouPageStyle,
  ThankyouPageStyleProps,
  ThankyouPageNameProps,
} from "./style";

const useStyles = makeStyles<Theme, ThankyouPageStyleProps>(thankyouPageStyle);

export const ThankYou = () => {
  const classes: ThankyouPageNameProps = useStyles(
    {} as ThankyouPageStyleProps
  );
  // const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  // const handleClick = () => {
  //   navigate("/forms");
  // };

  return (
    <Box
      className={classes.wrapper}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <img alt="" src={SuccessImg} className={classes.successImg} />
      <Box className={classes.center} mt={3} mb={3}>
        <h3 className="theme-color2">
          <b>Thank you for contacting us!</b>
        </h3>
        We have received your request.<br></br>
        We will contact you soon!
      </Box>
      <Box
        className="links"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        mb={3}
      >
        <Button className={classes.prevBtn}>Back to Home</Button>
        <Button className={classes.continueBtn}>Continue</Button>
      </Box>
    </Box>
  );
};
