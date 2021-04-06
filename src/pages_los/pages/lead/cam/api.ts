import { LOSSDK } from "registry/fns/los";

export const getCAMGridData = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/cam/grid/data`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const getCAMGridMetaData = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/cam/grid/metadata`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const generateCAM = ({ refID }) => async (camJSON) => {
  const { data, status } = await LOSSDK.internalFetcher(`./lead/cam/generate`, {
    body: JSON.stringify({
      request_data: {
        refID: refID,
        CAMJson: camJSON,
      },
      channel: "W",
    }),
  });
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};

export const generateCAM_URL = ({ refID, download }) => ({ serialNo }) => {
  return new URL(
    `./lead/cam/download?refID=${refID}&serialNo=${serialNo}&token=${LOSSDK.getToken()}&download=${
      Boolean(download) ? "Yes" : "No"
    }`,
    LOSSDK.getBaseURL() as URL
  ).href;
};
