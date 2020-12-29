import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import loaderGif from "assets/images/loader.gif";
import { TextField } from "components/styledComponent/textfield";
import { InputMaskCustom } from "components/derived/inputMask";
import { APISDK } from "registry/fns/sdk";
import { useStyles } from "./style";
import { useNavigationFlow } from "../utils/navHelpers";

export const OtpVerificationPage = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [maskedMobileNo, setMaskedMobileNo] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const classes = useStyles();
  const [
    flowExist,
    refID,
    nextURL,
    nextFlowNavigationProps,
    fallbackURL,
  ] = useNavigationFlow(location, "/thankyou");
  const trimmedOTP = otp.trim();
  const trimmedOTPLengthValid = trimmedOTP.length === 6;
  const trimmedOTPLengthMsg = "Otp must be of 6 characters long";

  useEffect(() => {
    if (flowExist) {
      APISDK.requestOTP(refID).then((result) => {
        if (result.status === "success") {
          const { mobileNo, transactionId } = result.data;
          setMaskedMobileNo(mobileNo ?? "");
          setTransactionID(transactionId ?? "");
        } else {
          setError("An unknown error occured, kindly reach raatnafin team");
          setLoading(false);
        }
      });
    } else {
      navigate(fallbackURL);
    }
  }, []);

  const verifyOTP = () => {
    if (!Boolean(trimmedOTP)) {
      setError("This is a required Field");
      return;
    }
    if (!trimmedOTPLengthValid) {
      setError(trimmedOTPLengthMsg);
      return;
    }
    setLoading(true);
    APISDK.verifyOTP(refID, transactionID, trimmedOTP).then((result) => {
      if (result.status === "success") {
        setError("");
        setLoading(false);
        navigate(nextURL, nextFlowNavigationProps);
      } else {
        const { message } = result.data;
        setError(message ?? "An Unknown error occured");
        setLoading(false);
      }
    });
  };

  let result = (
    <>
      <Typography>Verify OTP </Typography>
      {maskedMobileNo.trim() !== "" ? (
        <>
          <Typography>
            OTP has been sent to your mobile number ending with:{maskedMobileNo}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            value={otp}
            error={Boolean(error)}
            helperText={error}
            onChange={(e) => setOtp(e.target.value)}
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
            endIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Verify
          </Button>
        </>
      ) : loading === false && Boolean(error) ? (
        <Typography>{error}</Typography>
      ) : (
        <img
          src={loaderGif}
          style={{ justifyContent: "center", margin: "auto" }}
          alt="loader"
        />
      )}
    </>
  );

  return (
    <div className={classes.paper}>
      <div className={classes.paper2}>{result}</div>
    </div>
  );
};
