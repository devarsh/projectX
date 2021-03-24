import { LOSSDK } from "registry/fns/los";

export const moveInquiryToLead = async (refID: string, formData: any) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./inquiry/moveToLead`,
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
