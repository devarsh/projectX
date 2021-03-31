import { createContext, FC } from "react";
import * as API from "./api";

export interface AssignInquiryAPIProviderType {
  context: any;
  getCurrentInquiry: CRUDFNType;
}

export const AssignInquiryAPIContext = createContext<AssignInquiryAPIProviderType>(
  {} as AssignInquiryAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const AssignInquiryAPIProvider: FC<AssignInquiryAPIProviderType> = ({
  children,
  getCurrentInquiry,
  context,
}) => {
  return (
    <AssignInquiryAPIContext.Provider
      value={{
        context,
        getCurrentInquiry,
      }}
    >
      {children}
    </AssignInquiryAPIContext.Provider>
  );
};

export const generateAssignInquiryAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getCurrentInquiry: {
      fn: API.getCurrentInquiry,
      args: { refID, moduleType },
    },
  };
};
