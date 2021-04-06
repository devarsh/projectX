import { LOSSDK } from "registry/fns/los";

export const leadAssign = ({ moduleType, inquiry }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/assign/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: inquiry,
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

export const getCurrentLeadAssign = ({ refID, moduleType }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/assign/data/get`,
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

export const deleteLeadAssign = ({ refID, moduleType }) => async (
  lineNo: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/assign/usersassigndetails/delete`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          lineNo: lineNo,
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
