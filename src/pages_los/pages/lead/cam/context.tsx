import { createContext, FC } from "react";
import * as API from "./api";

export interface CAMProviderType {
  context: any;
  generateCAM: CRUDFNType;
  viewCAM: CRUDFNType;
  downloadCAM: CRUDFNType;
  getGridCAMData: CRUDFNType;
}

export const CAMContext = createContext<CAMProviderType>({} as CAMProviderType);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const CAMContextProvider: FC<CAMProviderType> = ({
  children,
  generateCAM,
  viewCAM,
  downloadCAM,
  getGridCAMData,
  context,
}) => {
  return (
    <CAMContext.Provider
      value={{
        context,
        generateCAM,
        viewCAM,
        downloadCAM,
        getGridCAMData,
      }}
    >
      {children}
    </CAMContext.Provider>
  );
};

export const generateCAMAPIContext = ({ refID }): CAMProviderType => ({
  context: { refID },
  generateCAM: { fn: API.generateCAM, args: { refID } },
  viewCAM: { fn: API.generateCAM_URL, args: { refID, download: false } },
  downloadCAM: { fn: API.generateCAM_URL, args: { refID, download: true } },
  getGridCAMData: { fn: API.getCAMGridData, args: { refID } },
});
