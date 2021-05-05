import { VerificationSDK } from "registry/fns/verification";

export const requestOTP = (apiType: string) => async (
  tokenID: number | string
) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    `./otp/${apiType}/send`,
    {
      body: JSON.stringify({
        request_data: {
          tokenID: tokenID,
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

export const verifyOTP = (apiType) => async (
  tokenID: number | string,
  transactionID: string,
  otp: string
) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    `./otp/${apiType}/verify`,
    {
      body: JSON.stringify({
        request_data: {
          tokenID: tokenID,
          otp: otp,
          transactionID: transactionID,
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

export const verifyToken = (apiType) => async (tokenID: number | string) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    `./otp/${apiType}-token/verify`,
    {
      body: JSON.stringify({
        request_data: {
          tokenID: tokenID,
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
