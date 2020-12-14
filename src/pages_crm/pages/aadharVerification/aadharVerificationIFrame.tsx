import { useState, Fragment, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { APISDK } from "registry/fns/sdk";

export default function AadharVerificationIFrame() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state: naviationState } = location;
  const [IFrameVisible, setIFrameVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aadharParams, setAadharParams] = useState({
    transactionID: "",
    URL: "",
  });
  const timeoutDuration = 5 * 60 * 1000;
  const poolingInterval = 5 * 1000;
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
        startPooling({ transactionID: transactionId, URL: url });
        //waitForRequestStatus({ transactionID: transactionId, URL: url })
        return aadharParams;
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const fetchRequestID = useRef(0);
  // const waitForRequestStatus = (data) => {
  //   var urlEndPoint = `http://10.55.6.63:8081/users/subscribe?transactionId=${data.transactionID}`;
  //   var eventSource = new EventSource(urlEndPoint);
  //   eventSource.addEventListener("transactionDtl", function (event) {
  //     console.log(event.data);
  //     eventSource.close();
  //   });
  // };
  const startPooling = (data) => {
    interval = setInterval(() => {
      const currentFetchRequestID = fetchRequestID.current++;
      APISDK.fetchAadharRequestStatus(data.transactionID).then((data) => {
        if (currentFetchRequestID === fetchRequestID.current) {
          console.log(currentFetchRequestID, data);
        }
      });
    }, poolingInterval);
    timeout = setTimeout(() => {
      clearInterval(interval);
      console.log("aadhar request timedout");
    }, timeoutDuration);
  };

  useEffect(() => {
    // console.log("mounted");
    // return () => {
    //   console.log("unmounted");
    clearTimeout(timeout);
    clearInterval(interval);
    // };
  }, []);

  return (
    <Fragment>
      {!IFrameVisible ? (
        <div>
          <span>Do you want to go for aadhar verification ??</span>
          <button
            onClick={() => {
              handleAadharInitiation(1001);
            }}
            disabled={loading}
          >
            Yes
          </button>
          <button
            onClick={() => {
              navigate("/thankyou", {
                state: naviationState,
              });
            }}
            disabled={loading}
          >
            No
          </button>
        </div>
      ) : (
        <iframe
          title="AADHAR"
          src={aadharParams.URL}
          width="100%"
          height="700px"
        />
      )}
    </Fragment>
  );
}
