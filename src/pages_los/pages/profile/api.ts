import { LOSSDK } from "registry/fns/los";

export const getEmployeeProfile = async ({ userID }) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/profile/get`,
    {
      body: JSON.stringify({
        request_data: {
          userId: userID,
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

export const changeEmployeePassword = async ({
  userID,
  currentPassword,
  password,
}) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./users/employee/password/put`,
    {
      body: JSON.stringify({
        request_data: {
          userId: userID,
          currentPassword: currentPassword,
          password: password,
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
