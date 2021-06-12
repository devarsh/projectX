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
import Collapse from "@material-ui/core/Collapse";
import Link from "@material-ui/core/Link";

const computeTemplateForOTP = (length: number) => {
  return Array(Number(length)).fill(0).join(" ");
};

const mask = (mobileNo) => {
  let mob = `${mobileNo}`.slice(6);
  return `******${mob}`;
};

interface verifyOTPType {
  tokenID: any;
  transactionID: any;
  otp: any;
  consent: string;
  mobileNo: string;
}

interface requestOTPType {
  tokenID: any;
  mobileNo: any;
}

const verifyOTPFn = (verfiyOTPAPI) => async ({
  tokenID,
  transactionID,
  otp,
  consent,
  mobileNo,
}: verifyOTPType) => {
  return verfiyOTPAPI(tokenID, transactionID, otp, consent, mobileNo);
};

const requestOTP = (requestOTPAPI) => async ({
  tokenID,
  mobileNo,
}: requestOTPType) => {
  return requestOTPAPI(tokenID, mobileNo);
};

export const Alternate = ({
  token,
  otpLength = 5,
  maxResendCount = 3,
  otpResendInterval = 30,
  flow,
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
  const [expanded, setExpanded] = useState(false);

  const verifyOTPMutation = useMutation(
    verifyOTPFn(API.alternateNumberVerifyOTP),
    {
      onMutate: () => {
        setOtpVerificationError("");
      },
      onError: (error: any) => {
        setOtpVerificationError(error?.error_msg ?? "Uknown error occured");
      },
      onSuccess: (data) => {
        setSuccess(true);
      },
    }
  );

  const requestOTPMutation = useMutation(
    requestOTP(API.requestOTPForAlternateMobile),
    {
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
    }
  );

  const resendtOTPMutation = useMutation(
    requestOTP(API.requestOTPForAlternateMobile),
    {
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
    }
  );

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
      setOtpVerificationError(`OPT must be ${otpLength} digits long`);
    } else if (consent !== true) {
      setConsentError("This is required");
    } else {
      verifyOTPMutation.mutate({
        otp: OTP,
        transactionID: transactionID,
        tokenID: token,
        consent: consent ? "Y" : "N",
        mobileNo: flow?.data,
      });
    }
  };
  const resendOTPHandler = () => {
    if (resendCount <= maxResendCount) {
      resendtOTPMutation.mutate({ tokenID: token, mobileNo: flow?.data });
    } else {
      setMaxLimitReached(true);
    }
  };

  useEffect(() => {
    requestOTPMutation.mutate({ tokenID: token, mobileNo: flow?.data });
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
            Dear customer, Enter OTP sent to your alternate mobile Number ending
            with {mask(flow?.data)}
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
            type="tel"
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
              label={
                <Typography paragraph>
                  I hereby appoint <b>Ratnaafin</b> as my authorized
                  representative to receive my credit information from Equifax
                  (Bureau).
                </Typography>
              }
            />
            {Boolean(consentError) ? (
              <FormHelperText error={true}>{consentError}</FormHelperText>
            ) : null}
          </FormControl>
          {!expanded ? (
            <Link
              color="primary"
              onClick={(e) => {
                e.preventDefault();
                setExpanded(true);
              }}
              style={{ alignSelf: "flex-end" }}
            >
              More+
            </Link>
          ) : null}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography paragraph>
              I hereby unconditionally consent to and instruct the bureau to
              provide my credit information to me and <b>Ratnaafin</b>.
            </Typography>
            <Typography paragraph>
              By submitting this form, I hereby authorize Ratnaafin to do the
              following:
            </Typography>
            <ul>
              <li>
                <Typography paragraph>
                  Verify my identity and share with Equifax required personal
                  identifiable information about me;
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Request and receive my credit report, and credit score from
                  Equifax, including but not limited to a copy of my
                  consumer/commercial credit report and score;
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  Share my details with banking partners in order to assist me
                  to rectify and remove negative observations from my credit
                  information report and increase my chances of loan approval in
                  future;
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  To provide me with customized recommendations and personalized
                  offers of the products and services of Ratnaafin and/or its
                  business partners/ affiliates;
                </Typography>
              </li>
              <li>
                <Typography paragraph>
                  To send my information / personalized offers via email, text,
                  call or online display or other means of delivery in
                  Ratnaafin’s reasonable sole discretion.
                </Typography>
              </li>
            </ul>
          </Collapse>
          {expanded ? (
            <Link
              onClick={(e) => {
                e.preventDefault();
                setExpanded(false);
              }}
              style={{ alignSelf: "flex-end" }}
            >
              Less-
            </Link>
          ) : null}
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
