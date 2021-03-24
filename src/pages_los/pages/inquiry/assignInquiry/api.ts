import { LOSSDK } from "registry/fns/los";

export const inquiryAssignToLead = async (
  refID: any,
  empIDToAssignLead: any,
  inquiryStatus: string
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/inquiryAssign",
    {
      body: JSON.stringify({
        action: "inquiryAssign",
        request_data: {
          refID: refID,
          assignID: empIDToAssignLead,
          inquiryStatus: inquiryStatus,
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

export const getEmployeeListToAssignLead = async (branchCode) => {
  const { data, status } = await LOSSDK.internalFetcher(
    "./users/getEmployeeList",
    {
      body: JSON.stringify({
        action: "get_employee_list",
        request_data: {
          branch_code: branchCode,
        },
      }),
    }
  );
  if (status === "success") {
    return data?.response_data;
  } else {
    throw data?.error_data;
  }
};
