import { useState, Fragment, useEffect, useRef } from "react";
import { APISDK } from "registry/fns/sdk";
import Alert from "@material-ui/lab/Alert";

export default function EmployeeDashboard() {
  const [IFrameVisible, setIFrameVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aadharParams, setAadharParams] = useState({
    transactionID: "",
    URL: "",
  });
  const [userMessage, setUserMessage] = useState("");
  const [failure, setFailure] = useState(false);
  const timeoutDuration = 5 * 60 * 1000;
  const poolingInterval = 10 * 1000;
  let timeout, interval;

  const handleAadharInitiation = async (inquiryCode) => {
    setLoading(true);
    try {
      const result = await APISDK.initiateAadharValidation(inquiryCode);
      setLoading(false);
      if (result.status === "success") {
        const { transactionId, url } = result.data;
        setAadharParams({
          transactionID: transactionId,
          URL: url,
        });
        setIFrameVisible(true);
        //startPooling({ transactionID: transactionId, URL: url });
        waitForRequestStatus({ transactionID: transactionId, URL: url });
        return aadharParams;
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const fetchRequestID = useRef(0);
  const waitForRequestStatus = async (data) => {
    const resp = await APISDK.fetchAadharRequestStatusEventSource(
      data.transactionID
    );
    if (resp.status === "success") {
      if (
        resp.data.requestStatus === "success" ||
        resp.data.requestStatus === "failed"
      ) {
        if (resp.data.requestStatus === "failed") {
          setFailure(true);
        }
        setIFrameVisible(false);
        setUserMessage(resp.data.message);
      }
    } else {
      setIFrameVisible(false);
      //TODO: Set proper error coming from response
      setUserMessage("Unknown error occured");
      setFailure(true);
    }
  };
  const startPooling = (data) => {
    interval = setInterval(() => {
      const currentFetchRequestID = ++fetchRequestID.current;
      APISDK.fetchAadharRequestStatus(data.transactionID).then((resp) => {
        console.log(currentFetchRequestID, fetchRequestID.current);
        if (currentFetchRequestID === fetchRequestID.current) {
          if (resp.status === "success") {
            if (
              resp.data.requestStatus === "success" ||
              resp.data.requestStatus === "failed"
            ) {
              if (resp.data.requestStatus === "failed") {
                setFailure(true);
              }
              setIFrameVisible(false);
              setUserMessage(resp.data.message);
              clearInterval(interval);
              clearTimeout(timeout);
            }
          }
        }
      });
    }, poolingInterval);
    timeout = setTimeout(() => {
      clearInterval(interval);
      setIFrameVisible(false);
      setUserMessage("Request Time out");
      setFailure(true);
    }, timeoutDuration);
  };

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <Fragment>
      {!IFrameVisible ? (
        <button
          onClick={() => {
            handleAadharInitiation(1001);
          }}
          disabled={loading}
        >
          Start Aadhar Verification
        </button>
      ) : (
        <iframe
          title="AADHAR"
          src={aadharParams.URL}
          width="100%"
          height="700px"
        />
      )}
      {!IFrameVisible && Boolean(userMessage) ? (
        <Alert severity={failure ? "error" : "success"}>{userMessage}</Alert>
      ) : null}
    </Fragment>
  );
}
