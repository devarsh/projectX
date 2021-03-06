import { lazy } from "react";
import { CRUDContextProvider } from "pages_los/common/crud2";
import { LOSSDK } from "registry/fns/los";

const GridCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.GridCRUD,
  }))
);
const SimpleCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.SimpleCRUD,
  }))
);
const DocumentGridCRUD = lazy(() =>
  import("pages_los/common/documents").then((module) => ({
    default: module.DocumentGridCRUD,
  }))
);
const crudAPIArgs = (moduleType, productType, refID) => ({
  context: { moduleType, productType, refID },
  // call to save form data
  insertFormData: {
    fn: LOSSDK.insertFormData,
    args: { moduleType, productType, refID },
  },
  // to check if form data exist or not
  checkFormDataExist: {
    fn: LOSSDK.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  // delete record from the grid for a particular form record
  deleteFormData: {
    fn: LOSSDK.deleteFormData,
    args: { moduleType, productType, refID },
  },
  // update form data
  updateFormData: {
    fn: LOSSDK.updateFormData,
    args: { moduleType, productType, refID },
  },
  // get form data for (View and Edit)
  getFormData: {
    fn: LOSSDK.getFormData,
    args: { moduleType, productType, refID },
  },
  // get grid listing data
  getGridFormData: {
    fn: LOSSDK.getGridFormData,
    args: { moduleType, productType, refID },
  },
  // get form metaData for (new/view/edit)
  getFormMetaData: {
    fn: LOSSDK.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  // get grid metaData
  getGridFormMetaData: {
    fn: LOSSDK.getGridFormMetaData,
    args: { moduleType, productType, refID },
  },
});

export const CRUDComponentPicker = ({
  componentType,
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  dataAlwaysExists,
  showDocuments,
}) => {
  return componentType === "simple" ? (
    <CRUDContextProvider {...crudAPIArgs(moduleType, productType, refID)}>
      <SimpleCRUD
        isDataChangedRef={isDataChangedRef}
        dataAlwaysExists={Boolean(dataAlwaysExists)}
      />
    </CRUDContextProvider>
  ) : componentType === "grid" ? (
    <CRUDContextProvider {...crudAPIArgs(moduleType, productType, refID)}>
      <GridCRUD
        isDataChangedRef={isDataChangedRef}
        showDocuments={showDocuments}
      />
    </CRUDContextProvider>
  ) : componentType === "document" ? (
    <DocumentGridCRUD refID={refID} moduleType={moduleType} />
  ) : null;
};
