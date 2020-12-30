import { useEffect, useReducer } from "react";
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

const initialState = {
  currentScreen: "welcomeOTPVerification",
  otp: "",
  loading: false,
  error: "",
  transactionID: "",
  verificationSuccessful: false,
  maskedMobileNo: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "fields":
      return {
        ...state,
        [action.fieldName]: action?.payload,
      };
    case "startOTPVerification":
      return {
        ...state,
        currentScreen: "welcomeOTPVerification",
        error: "",
        loading: true,
      };
    case "endOTPSendAndVerificationFailure": {
      return {
        ...state,
        currentScreen: "welcomeOTPVerification",
        loading: false,
        error: action?.payload?.error,
      };
    }
    case "endOTPSendSuccess":
      return {
        ...state,
        currentScreen: "welcomeOTPVerification",
        loading: false,
        maskedMobileNo: action?.payload?.mobileNo,
        transactionID: action?.payload?.transactionId,
        error: action?.payload?.error,
      };
    default:
      return state;
  }
};

export const OtpVerificationPage = ({}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const [
    flowExist,
    refID,
    nextURL,
    nextFlowNavigationProps,
    fallbackURL,
  ] = useNavigationFlow(location, "/thankyou");
  const trimmedOTP = state.otp.trim();
  const trimmedOTPLengthValid = trimmedOTP.length === 6;
  const trimmedOTPLengthMsg = "Otp must be of 6 characters long";

  useEffect(() => {
    if (flowExist) {
      APISDK.requestOTP(refID).then((result) => {
        if (result.status === "success") {
          const { mobileNo, transactionId } = result.data;
          dispatch({
            type: "endOTPSendSuccess",
            payload: {
              mobileNo,
              transactionId,
            },
          });
        } else {
          dispatch({
            type: "endOTPSendAndVerificationFailure",
            payload: {
              error: "An unknown error occured, kindly reach raatnafin team",
            },
          });
        }
      });
    } else {
      navigate(fallbackURL);
    }
  }, []);

  const verifyOTP = () => {
    if (!Boolean(trimmedOTP)) {
      dispatch({
        type: "endOTPSendAndVerificationFailure",
        payload: {
          error: "This is a required Field",
        },
      });
      return;
    }
    if (!trimmedOTPLengthValid) {
      dispatch({
        type: "endOTPSendAndVerificationFailure",
        payload: {
          error: trimmedOTPLengthMsg,
        },
      });
      return;
    }
    APISDK.verifyOTP(refID, state.transactionID, trimmedOTP).then((result) => {
      if (result.status === "success") {
        dispatch({
          type: "endOTPVerificationSuccess",
          payload: {
            error: "",
          },
        });
        navigate(nextURL, nextFlowNavigationProps);
      } else {
        const { message } = result.data;
        dispatch({
          type: "endOTPSendAndVerificationFailure",
          payload: {
            error: message ?? "An Unknown error occured",
          },
        });
      }
    });
  };

  let result = (
    <>
      <Typography>Verify OTP </Typography>
      {state.currentScreen === "welcomeOTPVerification" ? (
        <>
          <Typography>
            OTP has been sent to your mobile number ending with:
            {state.maskedMobileNo}
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="email"
            name="otp"
            fullWidth
            value={state.otp}
            error={Boolean(state.error)}
            helperText={Boolean(state.error) ? state.error : null}
            onChange={(e) =>
              dispatch({
                type: "fields",
                fieldName: "otp",
                payload: e.target.value,
              })
            }
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
            endIcon={state.loading ? <CircularProgress size={20} /> : null}
          >
            Verify
          </Button>
        </>
      ) : state.loading === false && Boolean(state.error) ? (
        <Typography>{state.error}</Typography>
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
