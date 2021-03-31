import { createContext, FC } from "react";
import * as API from "./api";

export interface LeadAssignAPIProviderType {
  context: any;
  getCurrentLeadAssign: CRUDFNType;
}

export const LeadAssignAPIContext = createContext<LeadAssignAPIProviderType>(
  {} as LeadAssignAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const LeadAssignAPIProvider: FC<LeadAssignAPIProviderType> = ({
  children,
  getCurrentLeadAssign,
  context,
}) => {
  return (
    <LeadAssignAPIContext.Provider
      value={{
        context,
        getCurrentLeadAssign,
      }}
    >
      {children}
    </LeadAssignAPIContext.Provider>
  );
};

export const generateLeadAssignAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getCurrentLeadAssign: {
      fn: API.getCurrentLeadAssign,
      args: { refID, moduleType },
    },
  };
};
