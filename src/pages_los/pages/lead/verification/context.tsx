import { createContext, FC } from "react";
import * as API from "./api";

export interface VerificationAPIProviderType {
  context: any;
  getAPIGridStatusData: CRUDFNType;
}

export const VerificationAPIContext = createContext<VerificationAPIProviderType>(
  {} as VerificationAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const ExternalAPIProvider: FC<VerificationAPIProviderType> = ({
  children,
  getAPIGridStatusData,
  context,
}) => {
  return (
    <VerificationAPIContext.Provider
      value={{
        context,
        getAPIGridStatusData,
      }}
    >
      {children}
    </VerificationAPIContext.Provider>
  );
};

export const generateVerificationAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getAPIGridStatusData: {
      fn: API.getAPIStatusGridData,
      args: { refID, moduleType },
    },
  };
};
