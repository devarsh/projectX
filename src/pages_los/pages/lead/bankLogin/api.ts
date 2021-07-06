import { LOSSDK } from "registry/fns/los";

export const getBankLoginData = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/data/get`,
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

export const updateBankCategory = async ({
  refID,
  branchID,
  statusCode,
  remarks,
}) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          branchID: branchID,
          statusCode: statusCode,
          remarks: remarks,
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

export const getBankSelection = async ({ refID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/options/bankList`,
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

export const addNewBanksToSelection = async ({ refID, branchID, remarks }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./lead/bankLogin/addBanks`,
    {
      body: JSON.stringify({
        request_data: {
          refID: refID,
          branchID: branchID,
          remarks: remarks,
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
