import { createContext, FC } from "react";

export interface CAMProviderType {
  context: any;
  generateCAM: CRUDFNType;
  viewCAM: CRUDFNType;
  downloadCAM: CRUDFNType;
  getGridCAMMetaData: CRUDFNType;
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
  getGridCAMMetaData,
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
        getGridCAMMetaData,
        getGridCAMData,
      }}
    >
      {children}
    </CAMContext.Provider>
  );
};
