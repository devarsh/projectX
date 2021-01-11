import { Fragment, useEffect, useRef, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { APISDK } from "registry/fns/sdk";
import { useNavigationFlow } from "../utils/navHelpers";

const initialState = {
  currentScreen: "welcomeView",
  loading: false,
  error: "",
  verificationSuccessful: false,
  aadharTransactionID: "",
  aadharAuthenticationURL: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "startAadharRequest":
      return {
        ...state,
        currentScreen: "welcomeView",
        error: "",
        loading: true,
      };
    case "endAadharRequestFailure": {
      return {
        ...state,
        currentScreen: "welcomeView",
        loading: false,
        error: action?.payload?.error,
      };
    }
    case "endAadharRequestSuccess": {
      return {
        ...state,
        currentScreen: "addharIFrameView",
        aadharTransactionID: action?.payload?.transactionId,
        aadharAuthenticationURL: action?.payload?.url,
        loading: false,
        error: "",
      };
    }
    case "aadharValidationSuccess": {
      return {
        ...state,
        currentScreen: "resultView",
        verificationSuccessful: true,
        error: action?.payload?.error,
      };
    }
    case "aadharValidationFailure": {
      return {
        ...state,
        currentScreen: "resultView",
        verificationSuccessful: false,
        error: action?.payload?.error,
      };
    }
    default:
      return state;
  }
};

const timeoutDuration = 5 * 60 * 1000;
const poolingInterval = 10 * 1000;

export const AadharVerification = () => {
  //if needed move this variables to REf state (needs investigation)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const [_, refID, nextURL, nextFlowNavigationProps] = useNavigationFlow(
    location,
    "./thankyou"
  );

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, []);

  const handleStartAadharRequest = async () => {
    dispatch({
      type: "startAadharRequest",
    });
    try {
      const result = await APISDK.initiateAadharValidation(refID);
      if (result.status === "success") {
        const { transactionId, url } = result.data;
        dispatch({
          type: "endAadharRequestSuccess",
          payload: {
            transactionId,
            url,
          },
        });
        startPooling(transactionId);
      } else {
        dispatch({
          type: "endAadharRequestFailure",
          payload: {
            error: "Couldnt Initiate Aadhar Request an internal error occured",
          },
        });
      }
    } catch (err) {
      dispatch({
        type: "endAadharRequestFailure",
        payload: {
          error:
            err?.message?.() ??
            "Couldnt Initiate Aadhar Request an internal error occured ",
        },
      });
    }
  };

  const startPooling = (aadharTransactionID) => {
    intervalRef.current = setInterval(() => {
      APISDK.fetchAadharRequestStatus(aadharTransactionID).then((resp) => {
        if (resp.status === "success") {
          if (resp.data.requestStatus === "failed") {
            dispatch({
              type: "aadharValidationFailure",
              payload: {
                error: "Failed to validate aadhar",
              },
            });
          } else if (resp.data.requestStatus === "success") {
            dispatch({
              type: "aadharValidationSuccess",
              payload: {
                error:
                  "Congratulations youve successfully verified your aadhar",
              },
            });
            clearInterval(intervalRef.current as NodeJS.Timeout);
            clearTimeout(timeoutRef.current as NodeJS.Timeout);
            navigate(nextURL, nextFlowNavigationProps);
          }
        }
      });
    }, poolingInterval);
    timeoutRef.current = setTimeout(() => {
      dispatch({
        type: "aadharValidationFailure",
        payload: {
          error: "Validation timed out",
        },
      });
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }, timeoutDuration);
  };

  return (
    <Fragment>
      {state.currentScreen === "welcomeView" ? (
        <div>
          <span>Do you want to go for aadhar verification ?</span>
          <button
            disabled={state.loading ? true : false}
            onClick={() => {
              handleStartAadharRequest();
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              navigate(nextURL, nextFlowNavigationProps);
            }}
          >
            No
          </button>
          {Boolean(state.error) ? (
            <Alert severity={"error"}>{state.error}</Alert>
          ) : null}
        </div>
      ) : state.currentScreen === "addharIFrameView" ? (
        <iframe
          title="AADHAR"
          src={state.aadharAuthenticationURL}
          width="100%"
          height="500px"
        />
      ) : state.currentScreen === "resultView" ? (
        <Alert severity={state.verificationSuccessful ? "success" : "error"}>
          {state.error}
        </Alert>
      ) : null}
    </Fragment>
  );
};
