import { createContext, FC } from "react";

export interface CAMProviderType {
  context: any;
  generateCAM: CRUDFNType;
  previewCAM: CRUDFNType;
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
  previewCAM,
  getGridCAMMetaData,
  getGridCAMData,
  context,
}) => {
  return (
    <CAMContext.Provider
      value={{
        context,
        generateCAM,
        previewCAM,
        getGridCAMMetaData,
        getGridCAMData,
      }}
    >
      {children}
    </CAMContext.Provider>
  );
};