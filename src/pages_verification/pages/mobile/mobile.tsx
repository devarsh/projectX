import { Fragment, useEffect, useRef, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { useStyles } from "./style";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import loaderGif from "assets/images/loader.gif";
import { useTimer } from "../utils";

interface verifyOTPType {
  tokenID: any;
  transactionID: any;
  otp: any;
}

const verifyOTPFn = (verfiyOTPAPI) => async ({
  tokenID,
  transactionID,
  otp,
}: verifyOTPType) => {
  return verfiyOTPAPI(tokenID, transactionID, otp);
};

export const MobileNumberVerification = ({ token }) => {
  const classes = useStyles();
  const [OTP, setOTP] = useState("");
  const [OTPError, setOTPError] = useState("");
  const [success, setSuccess] = useState(false);
  const { timer, startTimer } = useTimer({ maxTime: 30 });
  const otpRef = useRef<any>(null);
  otpRef.current = OTP;
  const verifyOTPMutation = useMutation(verifyOTPFn(API.verifyOTP), {
    onError: (error: any) => {
      setOTPError(error?.error_msg);
    },
    onSuccess: (data) => {
      setSuccess(true);
    },
  });
  const requestOTP = useQuery<any, any, any>(
    "requestOTP",
    () => API.requestOTP(token),
    {
      cacheTime: 0,
      retry: 0,
    }
  );
  const resendOTP = useQuery<any, any, any>(
    "resendOTP",
    () => API.requestOTP(token),
    { cacheTime: 0, retry: 0, enabled: false }
  );
  const resendOTPHandler = () => {
    startTimer();
    resendOTP.refetch();
  };
  useEffect(() => {
    if (requestOTP.isSuccess) {
      startTimer();
    }
  }, [requestOTP.isSuccess, startTimer]);

  const loading = requestOTP.isLoading || requestOTP.isFetching;
  const result = loading ? (
    <img src={loaderGif} width="50px" height="50px" alt="loader" />
  ) : requestOTP.isError ? (
    <span>{requestOTP.error?.error_msg ?? "unknown Error occured"}</span>
  ) : success === true ? (
    <Fragment>Mobile Verification Successful</Fragment>
  ) : (
    <Fragment>
      {resendOTP.isError ? (
        <span>{resendOTP.error?.error_msg ?? "unknown Error occured"}</span>
      ) : null}
      <Typography variant="h6">Mobile Verification</Typography>
      <br />
      <Typography variant="subtitle2">
        Dear customer, Enter OTP sent to your registered mobile
      </Typography>
      <Typography variant="subtitle2">
        number ending with <b>{requestOTP.data?.mobile}</b>
      </Typography>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        type="email"
        name="otp"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => setOTP(e.target.value)}
        error={Boolean(OTPError)}
        helperText={OTPError}
      />
      <Button
        disabled={
          resendOTP.isFetching ||
          resendOTP.isLoading ||
          verifyOTPMutation.isLoading
        }
        onClick={() => {
          console.log(otpRef);
          verifyOTPMutation.mutate({
            otp: otpRef.current,
            transactionID: "",
            tokenID: token,
          });
        }}
        endIcon={
          verifyOTPMutation.isLoading ? <CircularProgress size={20} /> : null
        }
      >
        Verify
      </Button>
      <br />
      {!resendOTP.isError ? (
        timer > 0 ? (
          <span>Resend OTP In {timer} seconds</span>
        ) : (
          <Button
            onClick={resendOTPHandler}
            disabled={resendOTP.isLoading || resendOTP.isFetching}
            endIcon={
              resendOTP.isLoading || resendOTP.isFetching ? (
                <CircularProgress size={20} />
              ) : null
            }
          >
            Resend OTP
          </Button>
        )
      ) : null}
    </Fragment>
  );
  return (
    <div className={classes.paper}>
      <div className={classes.paper2}>{result}</div>
    </div>
  );
};

export const MobileNumberVerificationWrapper = () => {
  const { token } = useParams();
  const verifyToken = useQuery<any, any, any>(
    "verifyToken",
    () => API.verifyToken(token),
    {
      cacheTime: 0,
      retry: 0,
    }
  );
  return verifyToken.isFetching || verifyToken.isLoading ? (
    <img src={loaderGif} width="50px" height="50px" alt="loader" />
  ) : verifyToken.isError ? (
    <span>{verifyToken.error?.error_msg ?? "unknown Error occured"}</span>
  ) : (
    <MobileNumberVerification token={token} />
  );
};
