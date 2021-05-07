import { createContext, FC } from "react";
import * as API from "./api";

export interface AnalysisAPIProviderType {
  context: any;
  getAnalysisAPIStatusData: CRUDFNType;
}

export const AnalysisAPIContext = createContext<AnalysisAPIProviderType>(
  {} as AnalysisAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const AnalysisAPIProvider: FC<AnalysisAPIProviderType> = ({
  children,
  getAnalysisAPIStatusData,
  context,
}) => {
  return (
    <AnalysisAPIContext.Provider
      value={{
        context,
        getAnalysisAPIStatusData,
      }}
    >
      {children}
    </AnalysisAPIContext.Provider>
  );
};

export const generateAnalysisAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getAnalysisAPIStatusData: {
      fn: API.getAnalysisAPIStatusData,
      args: { refID, moduleType },
    },
  };
};
