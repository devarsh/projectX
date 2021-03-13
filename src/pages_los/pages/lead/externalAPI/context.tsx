import { createContext, FC } from "react";
import * as API from "./api";

export interface ExternalAPIProviderType {
  context: any;
  getAPIGridStatusData: CRUDFNType;
}

export const ExternalAPIContext = createContext<ExternalAPIProviderType>(
  {} as ExternalAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const ExternalAPIProvider: FC<ExternalAPIProviderType> = ({
  children,
  getAPIGridStatusData,
  context,
}) => {
  return (
    <ExternalAPIContext.Provider
      value={{
        context,
        getAPIGridStatusData,
      }}
    >
      {children}
    </ExternalAPIContext.Provider>
  );
};

export const generateExternalAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getAPIGridStatusData: {
      fn: API.getAPIStatusGridData,
      args: { refID, moduleType },
    },
  };
};
