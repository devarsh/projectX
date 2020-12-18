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
    transactionID: "",
    URL: "",
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
          apiResult: action.apiResult,
          apiResultStatus: action.apiResultStatus,
          transactionID: action.payload.transactionId,
          URL: action.payload.url,
        };
      case "endAadharValidation":
        return {
          ...state,
          apiResult: action.apiResult,
          apiResultStatus: action.apiResultStatus,
          currentScreen: "aadharValidationResult",
        };
      default:
        return state;
    }
  };

  const handleAadharInitiation = async (transCode) => {
    try {
      const result = await APISDK.initiateAadharValidation(1001);
      if (result.status === "success") {
        const { transactionId, url } = result.data;
        dispatch({
          type: "inititateAadharValidation",
          apiResult: result.status,
          apiResultStatus: result.status,
          payload: result.data,
        });
        startPooling({ transactionID: transactionId, URL: url });
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
      APISDK.fetchAadharRequestStatus(data.transactionID).then((resp) => {
        if (currentFetchRequestID === fetchRequestID.current) {
          if (resp.status === "success") {
            if (
              resp.data.requestStatus === "success" ||
              resp.data.requestStatus === "pending"
            ) {
              if (resp.data.requestStatus === "pending") {
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
    clearTimeout(timeout);
    clearInterval(interval);
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Fragment>
      {state.currentScreen === "inititateAadharValidation" ? (
        <div>
          <span>Do you want to go for aadhar verification ??</span>
          <button
            onClick={() => {
              handleAadharInitiation(1001);
            }}
          >
            Yes
          </button>
          <button>No</button>
        </div>
      ) : state.currentScreen === "aadharValidation" ? (
        <iframe title="AADHAR" src={state.URL} width="100%" height="700px" />
      ) : state.currentScreen === "aadharValidationResult" ? (
        <Alert severity={state.apiResult ? "error" : "success"}>
          {state.apiResultStatus}
        </Alert>
      ) : null}
    </Fragment>
  );
}
