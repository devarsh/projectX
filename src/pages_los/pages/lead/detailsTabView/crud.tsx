import { lazy } from "react";
import {
  CRUDContextProvider,
  crudAPIContextGenerator,
} from "pages_los/common/crud2";

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

export const CRUDComponentPicker = ({
  componentType,
  moduleType,
  productType,
  secondaryProduct,
  refID,
  isDataChangedRef,
  dataAlwaysExists,
  showDocuments,
  disableCache,
  forRetail,
}) => {
  return componentType === "simple" ? (
    <CRUDContextProvider
      {...crudAPIContextGenerator(moduleType, productType, refID)}
    >
      <SimpleCRUD
        isDataChangedRef={isDataChangedRef}
        dataAlwaysExists={Boolean(dataAlwaysExists)}
        disableCache={Boolean(disableCache)}
      />
    </CRUDContextProvider>
  ) : componentType === "grid" ? (
    <CRUDContextProvider
      {...crudAPIContextGenerator(moduleType, productType, refID)}
    >
      <GridCRUD
        isDataChangedRef={isDataChangedRef}
        showDocuments={showDocuments}
        secondaryProduct={secondaryProduct}
        secondaryProductDataExist={Boolean(dataAlwaysExists)}
        secondaryProductDisableCache={Boolean(disableCache)}
      />
    </CRUDContextProvider>
  ) : //this is a specific change to accomdate management document at lead level only for retail types
  componentType === "document" && forRetail === true ? (
    <DocumentGridCRUD
      refID={refID}
      moduleType={moduleType}
      productType={productType}
      serialNo="1"
    />
  ) : (
    <DocumentGridCRUD refID={refID} moduleType={moduleType} />
  );
};
