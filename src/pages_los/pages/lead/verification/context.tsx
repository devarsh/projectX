import { createContext, FC } from "react";
import * as API from "./api";

export interface VerificationAPIProviderType {
  context: any;
  getVerificationAPIGridStatusData: CRUDFNType;
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
  getVerificationAPIGridStatusData,
  context,
}) => {
  return (
    <VerificationAPIContext.Provider
      value={{
        context,
        getVerificationAPIGridStatusData,
      }}
    >
      {children}
    </VerificationAPIContext.Provider>
  );
};

export const generateVerificationAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getVerificationAPIGridStatusData: {
      fn: API.getVerificationAPIGridStatusData,
      args: { refID, moduleType },
    },
  };
};
