import { useRef, Fragment } from "react";
import { GridCRUD } from "pages_los/common/crud2";
import { BankMasterSMEDetailsMetaData } from "registry/metaData";
import { BankMasterGridMetaData } from "registry/metaData/grid";

export const Config = () => {
  let refID = 89;
  const isProductEditedRef = useRef(false);

  return (
    <Fragment>
      <GridCRUD
        refID={refID}
        moduleType={"config/bank"}
        productType={"sme"}
        isProductEditedRef={isProductEditedRef}
        formMetaData={BankMasterSMEDetailsMetaData}
        gridMetaData={BankMasterGridMetaData}
      />
    </Fragment>
  );
};
