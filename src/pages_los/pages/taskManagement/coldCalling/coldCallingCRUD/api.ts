import { LOSSDK } from "registry/fns/los";
import { coldCallingMetadata } from "../metadata/form";

export const addColCalling = ({ moduleType }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/inquiry/data/post`,
    {
      body: JSON.stringify({
        request_data: {
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

export const getColdCallingFormData = ({ moduleType }) => async (taskID) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/inquiry/data/get`,
    {
      body: JSON.stringify({
        request_data: {
          tranCD: taskID,
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

export const updateColdCallingFormData = ({
  moduleType,
  tran_cd,
}: any) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/inquiry/data/put`,
    {
      body: JSON.stringify({
        request_data: {
          tranCD: tran_cd,
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

export const deleteColdCalligData = ({ moduleType, tran_cd }) => async () => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${moduleType}/inquiry/data/delete`,
    {
      body: JSON.stringify({
        request_data: {
          tranCD: tran_cd,
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

export const getMetadata = () => coldCallingMetadata;
