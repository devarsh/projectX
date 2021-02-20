import { Fragment } from "react";
import { DocumentGridCRUD as DocGrid } from "./documentGridCRUD";
import { DOCCRUDContextProvider } from "./context";
import { LOSSDK } from "registry/fns/los";
import { gridMetaData, columnsMetaData } from "./meta";

const DocAPICrud = (moduleType, docCategory, refID) => ({
  uploadDocuments: {
    fn: LOSSDK.uploadDocuments,
    args: { moduleType, docCategory, refID },
  },
  getDocumentsGridData: {
    fn: LOSSDK.listingDocuments,
    args: { moduleType, docCategory, refID },
  },
  deleteDocuments: {
    fn: LOSSDK.uploadDocuments,
    args: { moduleType, docCategory, refID },
  },
  updateDocument: {
    fn: LOSSDK.uploadDocuments,
    args: { moduleType, docCategory, refID },
  },
});

export const DocumentGridCRUD = () => {
  return (
    <Fragment>
      <DOCCRUDContextProvider {...DocAPICrud("lead", "bank", "89")}>
        <DocGrid
          gridMetaData={gridMetaData}
          uploadColumnsMetaData={columnsMetaData}
        />
      </DOCCRUDContextProvider>
    </Fragment>
  );
};
