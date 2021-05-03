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
    <div className={classes.wrapper}>
      <img alt="" src={SuccessImg} className={classes.successImg} />
      <div className={classes.center}>
        <h3 className="theme-color2">Something Unexpected Happend</h3>
      </div>
      <Button onClick={returnToHomePage}>Return to Home Page</Button>
    </div>
  );
};
