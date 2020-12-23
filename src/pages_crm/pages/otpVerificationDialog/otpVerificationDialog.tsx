import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField } from "components/styledComponent/textfield";
import { InputMaskCustom } from "components/derived/inputMask";
import Typography from "@material-ui/core/Typography";
//import { APISDK } from "registry/fns/sdk";
import { navigationFlowDecisionMaker } from "../utils/navHelpers";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(3, 3, 0, 3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem 0rem",
    backgroundColor: "#fff",
    boxShadow: "0 0 20px rgba(0,0,0,0.06)",
    borderRadius: 8,
    width: "100%",
    minHeight: "30vh",
    [theme.breakpoints.down("md")]: {
      margin: theme.spacing(3, 2, 0, 2),
    },
  },
  paper2: {
    padding: "24px",
    borderRadius: 8,
    width: "30%",
    //backgroundColor: "#fff",
    //boxShadow: "0 0 20px rgba(0,0,0,0.06)",
  },
}));

export const OtpVerificationPage = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otpText, setOtpText] = useState("");
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state: navigationState } = location;
  const classes = useStyles();
  //@ts-ignore
  const { refID, prevSeq = -1, flow } = navigationState ?? {};
  //@ts-ignore
  const currentSeq = prevSeq + 1;
  const verifyOTP = () => {
    const trimmedOTPText = otpText.trim();
    if (!Boolean(trimmedOTPText)) {
      setOtpError("This is a required Field");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      if (trimmedOTPText !== "000000") {
        setOtpError("Invalid Otp");
        setLoading(false);
        return;
      } else {
        setOtpError("");
        setLoading(false);
        let nextFlow = navigationFlowDecisionMaker(flow, currentSeq);
        navigate(nextFlow.url, {
          state: {
            ...navigationState,
            prevSeq: currentSeq,
          },
        });
      }
    }, 2000);
  };

  if (!Array.isArray(flow) && refID === undefined && currentSeq <= 0) {
    navigate("/thankyou");
    return null;
  }
  return (
    <div className={classes.paper}>
      <div className={classes.paper2}>
        <Typography>Verify OTP</Typography>
        <Typography>
          OTP has been sent to your registered mobile number:
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="OTP"
          type="email"
          fullWidth
          value={otpText}
          error={Boolean(otpError)}
          helperText={Boolean(otpError) ? otpError : null}
          onChange={(e) => setOtpText(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            inputComponent: InputMaskCustom,
            inputProps: {
              MaskProps: {
                mask: "0 0 0 0 0 0",
              },
            },
          }}
        />
        <Button
          onClick={verifyOTP}
          color="primary"
          disabled={loading || otpText.length !== 6 ? true : false}
          endIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};
