import { LOSSDK } from "registry/fns/los";
import { taskAssignmentMetadata } from "../metadata/form";

export const assignTask = ({ moduleType }) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${formData?.taskFor}/${moduleType}/post`,
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

export const getTaskFormData = ({ moduleType }) => async (
  taskID,
  productType: any
) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${productType}/${moduleType}/get`,
    {
      body: JSON.stringify({
        request_data: {
          refID: "",
          taskID: taskID,
        },
      }),
    }
  );
  if (status === "success") {
    const { taskSource, ...others } = data?.response_data;
    return { ...others, taskFor: taskSource };
  } else {
    throw data?.error_data;
  }
};

export const updateTaskFormData = ({
  moduleType,
  inquiry,
  taskID,
}: any) => async (formData) => {
  const { data, status } = await LOSSDK.internalFetcher(
    `./${formData?.taskFor}/${moduleType}/put`,
    {
      body: JSON.stringify({
        request_data: {
          taskID: taskID,
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

export const getMetadata = () => taskAssignmentMetadata;
