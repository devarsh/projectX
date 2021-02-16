import { useRef, Fragment } from "react";
import { GridCRUD } from "pages_los/common/crud2";
import { BankMasterSMEDetailsMetaData } from "registry/metaData";
import { BankMasterGridMetaData } from "registry/metaData/grid";

export const LeadConfig = () => {
  let refID = 89;
  const isProductEditedRef = useRef(false);

  return (
    <Fragment>
      <GridCRUD
        refID={refID}
        productType={"config"}
        isProductEditedRef={isProductEditedRef}
        formMetaData={BankMasterSMEDetailsMetaData}
        gridMetaData={BankMasterGridMetaData}
      />
    </Fragment>
  );
};
