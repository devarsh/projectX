import { Fragment, useEffect, useRef, useReducer } from "react";
import { APISDK } from "registry/fns/sdk";
import Alert from "@material-ui/lab/Alert";

export default function EmployeeDashboard() {
  const timeoutDuration = 5 * 60 * 1000;
  const poolingInterval = 10 * 1000;
  let timeout, interval;

  const initialState = {
    currentScreen: "inititateAadharValidation",
    loading: false,
    apiResult: "",
    apiResultStatus: "",
    aadharTransactionID: "",
    aadharAuthenticationURL: "",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "startInititateAadharValidation":
        return {
          ...state,
          loading: true,
        };
      case "inititateAadharValidation":
        return {
          ...state,
          loading: false,
          currentScreen: "aadharValidation",
          apiResult: action.payload.status,
          apiResultStatus: action.payload.status,
          aadharTransactionID: action.payload.data.transactionId,
          aadharAuthenticationURL: action.payload.data.url,
        };
      case "endAadharValidation":
        return {
          ...state,
          loading: false,
          apiResult: action.apiResult,
          apiResultStatus: action.apiResultStatus,
          currentScreen: "aadharValidationResult",
        };
      default:
        return state;
    }
  };

  const handleAadharInitiation = async (transCode) => {
    dispatch({
      type: "startInititateAadharValidation",
    });
    try {
      const result = await APISDK.initiateAadharValidation(1001);
      if (result.status === "success") {
        const { aadharTransactionID, aadharAuthenticationURL } = result.data;
        dispatch({
          type: "inititateAadharValidation",
          payload: result,
        });
        startPooling({
          aadharTransactionID: aadharTransactionID,
          aadharAuthenticationURL: aadharAuthenticationURL,
        });
      }
    } catch (err) {
      dispatch({
        type: "endAadharValidation",
        apiResult: "error",
        apiResultStatus: err,
      });
      console.log(err);
    }
  };

  const fetchRequestID = useRef(0);

  const startPooling = (data) => {
    interval = setInterval(() => {
      const currentFetchRequestID = fetchRequestID.current++;
      APISDK.fetchAadharRequestStatus(data.aadharTransactionID).then((resp) => {
        if (currentFetchRequestID === fetchRequestID.current) {
          if (resp.status === "success") {
            if (
              resp.data.requestStatus === "success" ||
              resp.data.requestStatus === "failed"
            ) {
              if (resp.data.requestStatus === "failed") {
                dispatch({
                  type: "endAadharValidation",
                  apiResult: resp.status,
                  apiResultStatus: resp.data.requestStatus,
                });
              }
              dispatch({
                type: "endAadharValidation",
                apiResult: resp.status,
                apiResultStatus: resp.data.requestStatus,
              });
              clearInterval(interval);
              clearTimeout(timeout);
            }
          }
        }
      });
    }, poolingInterval);
    timeout = setTimeout(() => {
      dispatch({
        type: "endAadharValidation",
        apiResult: "error",
        apiResultStatus: "Request Time out",
      });
      clearInterval(interval);
    }, timeoutDuration);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Fragment>
      {state.currentScreen === "inititateAadharValidation" ? (
        <div>
          <span>Do you want to go for aadhar verification ??</span>
          <button
            disabled={state.loading ? true : false}
            onClick={() => {
              handleAadharInitiation(1001);
            }}
          >
            Yes
          </button>
          <button>No</button>
        </div>
      ) : state.currentScreen === "aadharValidation" ? (
        <iframe
          title="AADHAR"
          src={state.aadharAuthenticationURL}
          width="100%"
          height="700px"
        />
      ) : state.currentScreen === "aadharValidationResult" ? (
        <Alert severity={state.apiResult ? "error" : "success"}>
          {state.apiResultStatus}
        </Alert>
      ) : null}
    </Fragment>
  );
}
