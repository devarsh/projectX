import { AuthSDK } from "registry/fns/auth";

export const veirfyUsername = async (username: any, loginType: string) => {
  const { data, status } = await AuthSDK.internalFetcher(
    `./los/${loginType}/verify`,
    {
      body: JSON.stringify({
        request_data: {
          userId: username,
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

export const verifyPasswordAndLogin = async (
  transactionId,
  username,
  password,
  loginType
) => {
  const { data, status } = await AuthSDK.internalFetcher(
    `./los/${loginType}/login`,
    {
      body: JSON.stringify({
        request_data: {
          transactionId: transactionId,
          password: password,
          userId: username,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return {
      status,
      data: {
        token: data?.response_data?.token?.access_token,
        tokenType: data?.response_data?.token?.token_type,
        user: {
          branch: data?.response_data?.user?.baseBranchName,
          branchCode: data?.response_data?.user?.baseBranchCode,
          lastLogin: data?.response_data?.user?.lastLoginDate,
          type: data?.response_data?.user?.flag,
          firstName: data?.response_data?.user?.firstName,
          lastName: data?.response_data?.user?.lastName,
        },
      },
    };
  } else {
    return { status, data: data?.error_data };
  }
};

export const verifyToken = async (loginType, token) => {
  const { data, status } = await AuthSDK.internalFetcher(
    `./los/${loginType}/token/verify`,
    {
      body: JSON.stringify({
        request_data: {
          tokenID: token,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data instanceof Error ? data : data?.error_data };
  }
};
