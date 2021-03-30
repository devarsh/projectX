import { createContext, FC } from "react";
import * as API from "./api";

export interface StagesAPIProviderType {
  context: any;
  getGridData: CRUDFNType;
  getCurrentStage: CRUDFNType;
  updateCurrentStage: CRUDFNType;
}

export const StagesAPIContext = createContext<StagesAPIProviderType>(
  {} as StagesAPIProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const StagesAPIProvider: FC<StagesAPIProviderType> = ({
  children,
  getGridData,
  getCurrentStage,
  updateCurrentStage,
  context,
}) => {
  return (
    <StagesAPIContext.Provider
      value={{
        context,
        getGridData,
        getCurrentStage,
        updateCurrentStage,
      }}
    >
      {children}
    </StagesAPIContext.Provider>
  );
};

export const generateStagesAPIContext = ({ refID, moduleType }) => {
  return {
    context: { refID, moduleType },
    getGridData: {
      fn: API.getStagesGridData,
      args: { refID, moduleType },
    },
    getCurrentStage: {
      fn: API.getCurrentStageData,
      args: { refID, moduleType },
    },
    updateCurrentStage: {
      fn: API.updateCurrentStageData,
      args: { refID, moduleType },
    },
  };
};
