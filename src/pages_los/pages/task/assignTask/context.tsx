import { createContext, FC } from "react";
import * as API from "./api";

export interface AssignTaskAPIProviderType {
  context: any;
  getTaskFormData: CRUDFNType;
  updateTaskFormData: CRUDFNType;
}

export const AssignTaskAPIContext = createContext<AssignTaskAPIProviderType>(
  {} as AssignTaskAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const AssignTaskAPIProvider: FC<AssignTaskAPIProviderType> = ({
  children,
  context,
  getTaskFormData,
  updateTaskFormData,
}) => {
  return (
    <AssignTaskAPIContext.Provider
      value={{
        context,
        getTaskFormData,
        updateTaskFormData,
      }}
    >
      {children}
    </AssignTaskAPIContext.Provider>
  );
};

export const generateAssignTaskAPIContext = ({ moduleType }) => {
  return {
    context: { moduleType },
    getTaskFormData: {
      fn: API.getTaskFormData,
      args: { moduleType },
    },
    updateTaskFormData: {
      fn: API.updateTaskFormData,
      args: { moduleType },
    },
  };
};
