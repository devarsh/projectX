import { createContext, FC } from "react";
import * as API from "./api";

export interface PriorityAPIProviderType {
  context: any;
  getGridData: CRUDFNType;
  getCurrentPriority: CRUDFNType;
  updateCurrentPriority: CRUDFNType;
}

export const PriorityAPIContext = createContext<PriorityAPIProviderType>(
  {} as PriorityAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const PriorityAPIProvider: FC<PriorityAPIProviderType> = ({
  children,
  getGridData,
  getCurrentPriority,
  updateCurrentPriority,
  context,
}) => {
  return (
    <PriorityAPIContext.Provider
      value={{
        context,
        getGridData,
        getCurrentPriority,
        updateCurrentPriority,
      }}
    >
      {children}
    </PriorityAPIContext.Provider>
  );
};

export const generatePriorityAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getGridData: {
      fn: API.getPriorityGridData,
      args: { refID, moduleType },
    },
    getCurrentPriority: {
      fn: API.getCurrentPriorityData,
      args: { refID, moduleType },
    },
    updateCurrentPriority: {
      fn: API.updateCurrentPriorityData,
      args: { refID, moduleType },
    },
  };
};
