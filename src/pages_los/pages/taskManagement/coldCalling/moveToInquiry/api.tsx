import { LOSSDK } from "registry/fns/los";
import { moveToInquiryMetaData } from "./metadata";

export const moveToInquiry = ({ moduleType, refID }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/moveToLead`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          ...formData,
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

export const getMetadata = () => moveToInquiryMetaData;

export const submitColdCallingToMoveToInquiry = (refID?: any) => async (
  formData?: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./inquiry/main/data/post",
    {
      body: JSON.stringify({
        request_data: { refID: refID, ...formData },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.response_data };
  }
};
