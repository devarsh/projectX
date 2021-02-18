import { createContext, FC } from "react";

interface DOCCRUDProviderType {
  uploadDocuments: CRUDFNType;
  deleteDocuments: CRUDFNType;
  updateDocument: CRUDFNType;
  getDocumentsGridData: CRUDFNType;
}

export const DOCCRUDContext = createContext<DOCCRUDProviderType>(
  {} as DOCCRUDProviderType
);

interface CRUDFNType {
  fn: any;
  args: any;
}

export const DOCCRUDContextProvider: FC<DOCCRUDProviderType> = ({
  children,
  uploadDocuments,
  deleteDocuments,
  updateDocument,
  getDocumentsGridData,
}) => {
  return (
    <DOCCRUDContext.Provider
      value={{
        uploadDocuments,
        deleteDocuments,
        updateDocument,
        getDocumentsGridData,
      }}
    >
      {children}
    </DOCCRUDContext.Provider>
  );
};
