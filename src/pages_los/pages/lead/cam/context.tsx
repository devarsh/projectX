import { createContext, FC } from "react";

export interface CAMProviderType {
  context: any;
  generateCAM: CRUDFNType;
  previewCAM: CRUDFNType;
  getGridCAMMetaData: CRUDFNType;
  getGridCAMData: CRUDFNType;
  getCAMData: CRUDFNType;
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
  getCAMData,
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
        getCAMData,
      }}
    >
      {children}
    </CAMContext.Provider>
  );
};
