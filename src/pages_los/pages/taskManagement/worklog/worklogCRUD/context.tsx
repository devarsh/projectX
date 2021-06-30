import { createContext, FC } from "react";
import * as API from "./api";

export interface WorklogAPIProviderType {
  context: any;
  getWorklogFormData: CRUDFNType;
  updateWorklogFormData: CRUDFNType;
}

export const WorklogAPIContext = createContext<WorklogAPIProviderType>(
  {} as WorklogAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const WorklogAPIProvider: FC<WorklogAPIProviderType> = ({
  children,
  context,
  getWorklogFormData,
  updateWorklogFormData,
}) => {
  return (
    <WorklogAPIContext.Provider
      value={{
        context,
        getWorklogFormData,
        updateWorklogFormData,
      }}
    >
      {children}
    </WorklogAPIContext.Provider>
  );
};

export const generateWorklogAPIContext = ({ moduleType }) => {
  return {
    context: { moduleType },
    getWorklogFormData: {
      fn: API.getWorkLogData,
      args: { moduleType },
    },
    updateWorklogFormData: {
      fn: API.updateWorkLogData,
      args: { moduleType },
    },
  };
};
