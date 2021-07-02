import { LOSSDK } from "registry/fns/los";

export const showTaskManagementFieldForLeadID = async (_, dependentFields) => {
  if (dependentFields["taskFor"].value === "lead") {
    return false;
  }
  return true;
};

export const showTaskManagementFieldForInquiryID = async (
  _,
  dependentFields
) => {
  if (dependentFields["taskFor"].value === "inquiry") {
    return false;
  }
  return true;
};

export const postValidationSetRefID = async (fieldData) => {
  const refID = fieldData.incomingMessage?.refID;
  return {
    refID: { value: refID },
  };
};

export const getWorkerListForTaskManag = async (dependentField) => {
  if (
    !Boolean(dependentField?.taskFor?.value) &&
    dependentField?.taskFor?.value !== "00"
  ) {
    return [];
  }
  const { status, data } = await LOSSDK.internalFetcher(
    `./${dependentField?.taskFor?.value}/options/workers`,
    {
      body: JSON.stringify({
        request_data: {
          refID: dependentField?.refID?.value ?? "",
        },
      }),
    }
  );
  if (status === "success" && Array.isArray(data.response_data)) {
    const newArray = data.response_data.map((one) => ({
      value: one?.userID,
      label: one?.userName,
    }));
    return newArray;
  } else {
    throw data?.error_data;
  }
};
