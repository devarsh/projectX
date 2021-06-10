import { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import { useMutation } from "react-query";
import * as API from "./api";
import { useTimer } from "../utils";
import logo from "assets/images/logo.svg";
import { InputMaskCustom } from "components/derived/inputMask";

const computeTemplateForOTP = (length: number) => {
  return Array(Number(length)).fill(0).join(" ");
};

interface verifyOTPType {
  tokenID: any;
  transactionID: any;
  otp: any;
  consent: string;
}

interface requestOTPType {
  tokenID: any;
}

const verifyOTPFn = (verfiyOTPAPI) => async ({
  tokenID,
  transactionID,
  otp,
  consent,
}: verifyOTPType) => {
  return verfiyOTPAPI(tokenID, transactionID, otp, consent);
};

const requestOTP = (requestOTPAPI) => async ({ tokenID }: requestOTPType) => {
  return requestOTPAPI(tokenID);
};

export const Verification = ({
  token,
  otpLength = 6,
  maxResendCount = 3,
  otpResendInterval = 30,
  setFlow,
}) => {
  const [OTP, setOTP] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [otpVerificationError, setOtpVerificationError] = useState("");
  const [otpDeliveryError, setOtpDeliveryError] = useState("");
  const [OTPDelivered, setOTPDelivered] = useState(false);
  const [success, setSuccess] = useState(false);
  const [maxLimitReached, setMaxLimitReached] = useState(false);
  const [resendCount, setResendCount] = useState(1);
  const { timer, startTimer } = useTimer({ maxTime: otpResendInterval });

  const verifyOTPMutation = useMutation(verifyOTPFn(API.verifyOTP), {
    onMutate: () => {
      setOtpVerificationError("");
    },
    onError: (error: any) => {
      setOtpVerificationError(error?.error_msg ?? "Uknown error occured");
    },
    onSuccess: (data) => {
      if (["GSWDOE116", "E0773"].indexOf(data?.Error?.ErrorCode) >= 0) {
        setFlow({
          screen: "Mobile",
          data: data?.Error?.ErrorDesc,
        });
      } else {
        setSuccess(true);
      }
    },
  });

  const requestOTPMutation = useMutation(requestOTP(API.requestOTP), {
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

  const resendtOTPMutation = useMutation(requestOTP(API.requestOTP), {
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
    } else if (consent !== true) {
      setConsentError("This is required");
    } else {
      verifyOTPMutation.mutate({
        otp: OTP,
        transactionID: transactionID,
        tokenID: token,
        consent: consent ? "Y" : "N",
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
        <Alert>Credit Score Consent Recieved Successful</Alert>
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
          <h2>Credit Score</h2>
          <Typography variant="subtitle2">
            Dear customer, Enter OTP sent to your registered mobile Number
            ending with {requestOTPMutation.data?.maskedMobileNo ?? ""}
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
          <FormControl component="fieldset" error={Boolean(consentError)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={consent}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setConsentError("");
                    }
                    setConsent(e.target.checked);
                  }}
                  name="checkedB"
                  color="primary"
                />
              }
              label="I consent to fetch my credit score"
            />
            {Boolean(consentError) ? (
              <FormHelperText error={true}>{consentError}</FormHelperText>
            ) : null}
          </FormControl>
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
