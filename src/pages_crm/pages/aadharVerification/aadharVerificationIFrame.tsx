import { Fragment, useEffect, useRef, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { reducer } from "./reducer";
import { APISDK } from "registry/fns/sdk";
import { navigationFlowDecisionMaker } from "../utils/navHelpers";

const timeoutDuration = 5 * 60 * 1000;
const poolingInterval = 10 * 1000;

export default function EmployeeDashboard() {
  let timeout, interval;
  const [state, dispatch] = useReducer(reducer, {
    currentScreen: "inititateAadharValidation",
    loading: false,
    apiResult: "",
    apiResultStatus: "",
    aadharTransactionID: "",
    aadharAuthenticationURL: "",
  });
  const fetchRequestID = useRef(0);
  useEffect(() => {
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const { state: navigationState } = location;
  //@ts-ignore
  const { refID, prevSeq = -1, flow } = navigationState ?? {};
  //@ts-ignore
  const currentSeq = prevSeq + 1;

  const handleAadharInitiation = async () => {
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

  const startPooling = (data) => {
    interval = setInterval(() => {
      const currentFetchRequestID = fetchRequestID.current++;
      APISDK.fetchAadharRequestStatus(data.aadharTransactionID).then((resp) => {
        if (currentFetchRequestID === fetchRequestID.current) {
          if (resp.status === "success") {
            if (resp.data.requestStatus === "failed") {
              dispatch({
                type: "endAadharValidation",
                apiResult: resp.status,
                apiResultStatus: resp.data.requestStatus,
              });
            }
            if (resp.data.requestStatus === "success") {
              dispatch({
                type: "endAadharValidation",
                apiResult: resp.status,
                apiResultStatus: resp.data.requestStatus,
              });
              clearInterval(interval);
              clearTimeout(timeout);
              let nextFlow = navigationFlowDecisionMaker(flow, currentSeq);
              navigate(nextFlow.url, {
                state: {
                  ...navigationState,
                  prevSeq: currentSeq,
                },
              });
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

  return (
    <Fragment>
      {state.currentScreen === "inititateAadharValidation" ? (
        <div>
          <span>Do you want to go for aadhar verification ??</span>
          <button
            disabled={state.loading ? true : false}
            onClick={() => {
              handleAadharInitiation();
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
