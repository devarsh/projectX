import { createContext, FC } from "react";

interface CRUDProviderType {
  insertFormData: CRUDFNType;
  checkFormDataExist: CRUDFNType;
  deleteFormData: CRUDFNType;
  updateFormData: CRUDFNType;
  getFormData: CRUDFNType;
  getStaticGridData: CRUDFNType;
  getFormMetaData: CRUDFNType;
  getGridFormMetaData: CRUDFNType;
}

export const CRUDContext = createContext<CRUDProviderType>(
  {} as CRUDProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const CRUDContextProvider: FC<CRUDProviderType> = ({
  children,
  insertFormData,
  checkFormDataExist,
  deleteFormData,
  updateFormData,
  getFormData,
  getStaticGridData,
  getFormMetaData,
  getGridFormMetaData,
}) => {
  return (
    <CRUDContext.Provider
      value={{
        insertFormData,
        checkFormDataExist,
        deleteFormData,
        updateFormData,
        getFormData,
        getStaticGridData,
        getFormMetaData,
        getGridFormMetaData,
      }}
    >
      {children}
    </CRUDContext.Provider>
  );
};
