import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SuccessImg from "assets/images/success.svg";

import {
  notFoundPageStyle,
  NotFoundPageNameProps,
  NotFoundPageStyleProps,
} from "./style";

const useStyles = makeStyles<Theme, NotFoundPageStyleProps>(notFoundPageStyle);

export const NotFoundPage = () => {
  const classes: NotFoundPageNameProps = useStyles(
    {} as NotFoundPageStyleProps
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
        <Button className={classes.continueBtn}>Return to Home Page</Button>
      </Box>
    </Box>
  );
};
