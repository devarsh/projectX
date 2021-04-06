import { CRMSDK } from "registry/fns/crm";

export const requestOTP = async (refID: number | string) => {
  const { data, status } = await CRMSDK.internalFetcher(
    "./inquiry/external/otp/request",
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
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.error_data };
  }
};

export const verifyOTP = async (
  refID: string,
  transactionID: string,
  otp: string
) => {
  const { data, status } = await CRMSDK.internalFetcher(
    "./inquiry/external/otp/verify",
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          transactionId: transactionID,
          otp: otp,
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
