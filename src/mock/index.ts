import fetchIntercept from "fetch-intercept";
import metaData from "./retailsLoan";

if (process.env.REACT_APP_MOCK_API === "true") {
  fetchIntercept.register({
    request: function (url, config) {
      return [url, config];
    },
    requestError: function (error) {
      return Promise.reject(error);
    },
    response: function (response) {
      if (response.url.indexOf("getMetaData") > -1) {
        const resp = {
          status: "0",
          response_data: metaData,
        };
        const blobResponse = new Blob([JSON.stringify(resp, null, 2)], {
          type: "application/json",
        });
        return new Response(blobResponse, {
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
        });
      }
      return response;
    },
    responseError: function (error) {
      return Promise.reject(error);
    },
  });
}
