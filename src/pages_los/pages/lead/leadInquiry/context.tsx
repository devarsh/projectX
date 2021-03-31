import { createContext, FC } from "react";
import * as API from "./api";

export interface LeadInquiryAPIProviderType {
  context: any;
  getCurrentLeadInquiry: CRUDFNType;
}

export const LeadInquiryAPIContext = createContext<LeadInquiryAPIProviderType>(
  {} as LeadInquiryAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const LeadInquiryAPIProvider: FC<LeadInquiryAPIProviderType> = ({
  children,
  getCurrentLeadInquiry,
  context,
}) => {
  return (
    <LeadInquiryAPIContext.Provider
      value={{
        context,
        getCurrentLeadInquiry,
      }}
    >
      {children}
    </LeadInquiryAPIContext.Provider>
  );
};

export const generateLeadInquiryAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getCurrentLeadInquiry: {
      fn: API.getCurrentLeadInquiry,
      args: { refID, moduleType },
    },
  };
};
