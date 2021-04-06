import { CRMSDK } from "registry/fns/crm";
import { CommonFetcherResponse } from "registry/fns";

export const initiateAadharValidation = async (refID) => {
  const { data, status } = await CRMSDK.internalFetcher(
    "./inquiry/external/aadhar/initiate",
    {
      body: JSON.stringify({
        request_data: { refID: refID, sms: "0" },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.error_data };
  }
};

export const getAadharRequestStatus = async (aadharRequestID) => {
  const { data, status } = await CRMSDK.internalFetcher(
    "./inquiry/external/aadhar/status",
    {
      body: JSON.stringify({
        request_data: {
          transactionID: aadharRequestID,
          updateStatus: "",
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.error_data };
  }
};

//Extra API

export const getAadharRequestStatusEventSource = async (
  aadharRequestID
): Promise<CommonFetcherResponse> => {
  var urlEndPoint = new URL(
    `./inquiry/external/aadhar/statusSSE?transactionId=${aadharRequestID}`,
    //@ts-ignore
    CRMSDK.baseURL as URL
  ).href;
  var eventSource = new EventSource(urlEndPoint);
  return new Promise((res) => {
    //@ts-ignore
    eventSource.addEventListener("transactionId", ({ data: eventData }) => {
      eventData = JSON.parse(eventData);
      console.log(eventData);
      let response: CommonFetcherResponse = { status: "failure", data: "" };
      if (eventData.status === "0") {
        response.status = "success";
        response.data = eventData?.response_data ?? {};
        res(response);
      } else {
        response.status = "failure";
        response.data = eventData?.response_data ?? {};
        res(response);
      }
      eventSource.close();
    });
  });
};
