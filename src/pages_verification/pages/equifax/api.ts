import { VerificationSDK } from "registry/fns/verification";

export const requestEquifaxScore = async (
  tokenID: number | string,
  consent: string
) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./equifax/request/send",
    {
      body: JSON.stringify({
        request_data: {
          tokenID: tokenID,
          consent: consent,
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

export const requestOTP = async (tokenID: number | string) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./equifax-otp/mobile/send",
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

export const requestOTPForAlternateMobile = async (
  tokenID: number | string,
  mobileNo: string
) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./equifax-otp/mobile/resend",
    {
      body: JSON.stringify({
        request_data: {
          mobileNo: mobileNo,
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
  otp: string,
  consent: string
) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./equifax-otp/mobile/verify",
    {
      body: JSON.stringify({
        request_data: {
          tokenID: tokenID,
          otp: otp,
          transactionID: transactionID,
          consent: consent,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    if (
      data?.response_data?.Error?.ErrorDesc === "CCRResponse Field found empty"
    ) {
      throw { errorMsg: "CCRResponse Field found empty" };
    } else {
      return data?.response_data;
    }
  } else {
    throw data?.error_data;
  }
};

export const verifyToken = async (tokenID: number | string) => {
  const { data, status } = await VerificationSDK.internalFetcher(
    "./equifax/token/verify",
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
