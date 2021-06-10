import { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as API from "./api";
import loaderGif from "assets/images/loader.gif";
import { useTimer } from "../utils";
import { useStyles } from "../style";
import logo from "assets/images/logo.svg";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import { InputMaskCustom } from "components/derived/inputMask";

const computeTemplateForOTP = (length: number) => {
  return Array(Number(length)).fill(0).join(" ");
};

interface verifyOTPType {
  tokenID: any;
  transactionID: any;
  otp: any;
}

interface requestOTPType {
  tokenID: any;
}

const verifyOTPFn = (verfiyOTPAPI) => async ({
  tokenID,
  transactionID,
  otp,
}: verifyOTPType) => {
  return verfiyOTPAPI(tokenID, transactionID, otp);
};

const requestOTP = (requestOTPAPI) => async ({ tokenID }: requestOTPType) => {
  return requestOTPAPI(tokenID);
};

export const Verification = ({
  token,
  apiType,
  otpLength = 6,
  maxResendCount = 3,
  otpResendInterval = 30,
}) => {
  const [OTP, setOTP] = useState("");
  const [otpVerificationError, setOtpVerificationError] = useState("");
  const [otpDeliveryError, setOtpDeliveryError] = useState("");
  const [OTPDelivered, setOTPDelivered] = useState(false);
  const [success, setSuccess] = useState(false);
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [resendCount, setResendCount] = useState(1);
  const { timer, startTimer } = useTimer({ maxTime: otpResendInterval });

  const apiName = `${apiType}`.charAt(0).toUpperCase() + `${apiType}`.slice(1);

  const verifyOTPMutation = useMutation(verifyOTPFn(API.verifyOTP(apiType)), {
    onMutate: () => {
      setOtpVerificationError("");
    },
    onError: (error: any) => {
      setOtpVerificationError(error?.error_msg ?? "Uknown error occured");
    },
    onSuccess: (data) => {
      setSuccess(true);
    },
  });

  const requestOTPMutation = useMutation(requestOTP(API.requestOTP(apiType)), {
    onMutate: () => {
      setOTPDelivered(false);
      setOtpDeliveryError("");
    },
    onError: (error: any) => {
      setOtpDeliveryError(error?.error_msg ?? "Unknown error occured");
    },
    onSuccess: () => {
      startTimer();
      setOTPDelivered(true);
    },
  });

  const resendtOTPMutation = useMutation(requestOTP(API.requestOTP(apiType)), {
    onMutate: () => {
      setOTPDelivered(false);
      setOtpDeliveryError("");
    },
    onError: (error: any) => {
      setOtpDeliveryError(error?.error_msg ?? "Unkown error occured");
    },
    onSuccess: () => {
      startTimer();
      setResendCount((count) => (count = count + 1));
      setOTPDelivered(true);
    },
  });

  const verifyOTPHandler = () => {
    let transactionID = "";
    if (resendtOTPMutation.isIdle && requestOTPMutation.isSuccess) {
      transactionID = requestOTPMutation.data?.transactionID;
    } else if (resendtOTPMutation.isSuccess) {
      transactionID = resendtOTPMutation.data?.transactionID;
    }
    if (!Boolean(OTP)) {
      setOtpVerificationError("OTP cannot be blank");
    } else if (String(OTP).length !== otpLength) {
      setOtpVerificationError(`OTP must be ${otpLength} digits long`);
    } else {
      verifyOTPMutation.mutate({
        otp: OTP,
        transactionID: transactionID,
        tokenID: token,
      });
    }
  };
  const resendOTPHandler = () => {
    if (resendCount <= maxResendCount) {
      resendtOTPMutation.mutate({ tokenID: token });
    } else {
      setMaxLimitReached(true);
    }
  };

  useEffect(() => {
    requestOTPMutation.mutate({ tokenID: token });
  }, []);

  return (
    <Fragment>
      {success ? (
        <Alert>{apiName} Verification Successful</Alert>
      ) : (
        <Fragment>
          <img src={logo} alt="Logo" width="100px" height="100px" />
          {requestOTPMutation.isLoading ||
          resendtOTPMutation.isLoading ||
          requestOTPMutation.isIdle ? null : OTPDelivered ? (
            <Alert>OTP has been Successfully sent</Alert>
          ) : (
            <Alert severity="error">{otpDeliveryError}</Alert>
          )}
          <h2> {apiName} Verification</h2>
          <Typography variant="subtitle2">
            {apiType === "mobile"
              ? `Dear customer, Enter OTP sent to your registered ${apiName} number
            ending with ${requestOTPMutation.data?.maskedMobileNo ?? ""}`
              : apiType === "email"
              ? `Dear customer, Enter OTP sent to your registered ${apiName}
          address ${requestOTPMutation.data?.maskedEmail ?? ""}`
              : ""}
          </Typography>
          {timer > 0 ? (
            <Fragment>
              <br />
              <br />
              <Typography variant="subtitle2">
                Resend OTP In {timer} seconds
              </Typography>
            </Fragment>
          ) : null}
          <TextField
            autoFocus
            id="name"
            type="email"
            name="otp"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setOTP(e.target.value);
            }}
            value={OTP}
            error={Boolean(otpVerificationError)}
            helperText={otpVerificationError}
            InputProps={{
              style: { fontWeight: "bold" },
              inputComponent: InputMaskCustom,
              inputProps: {
                MaskProps: {
                  mask: computeTemplateForOTP(otpLength),
                },
              },
            }}
          />
          <br />
          <br />
          <div style={{ display: "flex" }}>
            <Button
              onClick={verifyOTPHandler}
              disabled={
                requestOTPMutation.isLoading ||
                resendtOTPMutation.isLoading ||
                verifyOTPMutation.isLoading
              }
              endIcon={
                verifyOTPMutation.isLoading || requestOTPMutation.isLoading ? (
                  <CircularProgress size={20} />
                ) : null
              }
            >
              Verify
            </Button>
            <div style={{ flexGrow: 1 }} />
            {timer > 0 ||
            !requestOTPMutation.isSuccess ||
            maxLimitReached ? null : (
              <Button
                onClick={resendOTPHandler}
                disabled={
                  resendtOTPMutation.isLoading || verifyOTPMutation.isLoading
                }
                endIcon={
                  resendtOTPMutation.isLoading ? (
                    <CircularProgress size={20} />
                  ) : null
                }
              >
                Resend OTP
              </Button>
            )}
          </div>
          {maxLimitReached ? (
            <Fragment>
              <br />
              <Typography variant="subtitle2">
                Sorry, You've exhaused OTP Resend Limit.
              </Typography>
            </Fragment>
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export const OTPVerificationWrapper = ({ apiType }) => {
  const classes = useStyles();
  const { token } = useParams();
  const verifyToken = useQuery<any, any, any>(
    "verifyToken",
    () => API.verifyToken(apiType)(token),
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
    <Box display="flex" width={1} className={classes.wrapper}>
      <Box
        display="flex"
        flexDirection="column"
        width={1 / 2}
        className={classes.loginRight}
      >
        <Verification token={token} apiType={apiType} />
      </Box>
    </Box>
  );
};
