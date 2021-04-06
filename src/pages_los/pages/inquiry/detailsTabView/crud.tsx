import { lazy, FC } from "react";
import { CRUDContextProvider, crudAPIContextGenerator } from "pages_los/common";

const SimpleCRUD = lazy(() =>
  import("pages_los/common/crud2").then((module) => ({
    default: module.SimpleCRUD,
  }))
);

interface CRUDTYPE {
  moduleType: string;
  productType: string;
  refID: string;
  isDataChangedRef: any;
  dataAlwaysExists: boolean;
  readOnly?: boolean;
}

export const CRUD: FC<CRUDTYPE> = ({
  moduleType,
  productType,
  refID,
  isDataChangedRef,
  dataAlwaysExists,
  readOnly,
}) => (
  <CRUDContextProvider
    {...crudAPIContextGenerator(moduleType, productType, refID)}
  >
    <SimpleCRUD
      isDataChangedRef={isDataChangedRef}
      dataAlwaysExists={dataAlwaysExists}
      readOnly={readOnly}
    />
  </CRUDContextProvider>
);
