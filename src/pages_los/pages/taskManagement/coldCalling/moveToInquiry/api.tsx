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
    const { status, ...others } = data?.response_data;
    return { ...others, status: status };
  } else {
    throw data?.error_data;
  }
};

export const getMetadata = () => moveToInquiryMetaData;

export const moveColdCallingToInquiry = ({ moduleType, tranCD }: any) => async (
  formData?: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/inquiry/data/moved`,
    {
      body: JSON.stringify({
        request_data: { tranCD: tranCD, ...formData },
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
