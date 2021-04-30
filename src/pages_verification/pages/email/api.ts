import { VerificationSDK } from "registry/fns/verification";

export const requestOTP = async (tokenID: number | string) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./otp/email/send",
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

export const verifyOTP = async (
  tokenID: number | string,
  transactionID: string,
  otp: string
) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./otp/email/verify",
    {
      body: JSON.stringify({
        request_data: {
          tokenID: tokenID,
          transactionID: transactionID,
          otp: otp,
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

export const verifyToken = async (tokenID: number | string) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./otp/token/verify",
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
