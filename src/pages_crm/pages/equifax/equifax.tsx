import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigationFlow } from "../utils/navHelpers";
import { useStyles } from "./style";
import ReactSpeedometer from "react-d3-speedometer";

export const Equifax = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [
    flowExist,
    refID,
    nextURL,
    nextFlowNavigationProps,
  ] = useNavigationFlow(location, "/thankyou");

  let score = 750;
  return (
    <Box
      className={classes.wrapper}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Box className={classes.center} mt={3} mb={3}>
        <h3 className="theme-color2">
          <b>Your Current EQUIFAX Score is</b>
        </h3>
        <ReactSpeedometer
          value={score}
          minValue={300}
          maxValue={900}
          segments={4}
          currentValueText={`${score}`}
          customSegmentLabels={[
            {
              text: "Poor",
              color: "#e53834",
            },
            {
              text: "Average",
              color: "#ef6c00",
            },
            {
              text: "Good",
              color: "#cddc39",
            },
            {
              text: "Excellent",
              color: "#8cc24a",
            },
          ]}
        />
      </Box>
      <Box
        className="links"
        display="flex"
        justifyContent="center"
        flexDirection="row"
        mb={3}
      >
        <Button
          className={classes.continueBtn}
          onClick={(e) => {
            e.preventDefault();
            navigate(nextURL, nextFlowNavigationProps);
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};
