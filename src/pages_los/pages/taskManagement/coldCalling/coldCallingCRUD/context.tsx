import { createContext, FC } from "react";
import * as API from "./api";

export interface ColdCallingAPIProviderType {
  context: any;
  getTaskFormData: CRUDFNType;
}

export const ColdCallingAPIContext = createContext<ColdCallingAPIProviderType>(
  {} as ColdCallingAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const ColdCallingAPIProvider: FC<ColdCallingAPIProviderType> = ({
  children,
  context,
  getTaskFormData,
}) => {
  return (
    <ColdCallingAPIContext.Provider
      value={{
        context,
        getTaskFormData,
      }}
    >
      {children}
    </ColdCallingAPIContext.Provider>
  );
};

export const generateColdCallingAPIContext = ({ moduleType }) => {
  return {
    context: { moduleType },
    getTaskFormData: {
      fn: API.getColdCallingFormData,
      args: { moduleType },
    },
  };
};
