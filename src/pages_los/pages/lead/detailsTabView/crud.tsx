import { lazy } from "react";
import { CRUDContextProvider, API } from "pages_los/common/crud2";

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
    fn: API.insertFormData,
    args: { moduleType, productType, refID },
  },
  // to check if form data exist or not
  checkFormDataExist: {
    fn: API.checkFormDataExist,
    args: { moduleType, productType, refID },
  },
  // delete record from the grid for a particular form record
  deleteFormData: {
    fn: API.deleteFormData,
    args: { moduleType, productType, refID },
  },
  // update form data
  updateFormData: {
    fn: API.updateFormData,
    args: { moduleType, productType, refID },
  },
  // get form data for (View and Edit)
  getFormData: {
    fn: API.getFormData,
    args: { moduleType, productType, refID },
  },
  // get grid listing data
  getGridFormData: {
    fn: API.getGridFormData,
    args: { moduleType, productType, refID },
  },
  // get form metaData for (new/view/edit)
  getFormMetaData: {
    fn: API.getFormMetaData,
    args: { moduleType, productType, refID },
  },
  // get grid metaData
  getGridFormMetaData: {
    fn: API.getGridFormMetaData,
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
