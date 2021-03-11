import { lazy } from "react";
import { CRUDContextProvider, crudAPIContextGenerator } from "pages_los/common";

const SimpleCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.SimpleCRUD,
  }))
);

export const CRUD = ({
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  dataAlwaysExists,
}) => (
  <CRUDContextProvider
    {...crudAPIContextGenerator(moduleType, productType, refID)}
  >
    <SimpleCRUD
      isDataChangedRef={isDataChangedRef}
      dataAlwaysExists={dataAlwaysExists}
    />
  </CRUDContextProvider>
);
