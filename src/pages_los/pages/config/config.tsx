import { useRef, Fragment } from "react";
import { GridCRUD } from "pages_los/common/crud2";
import { BankMasterSMEDetailsMetaData } from "registry/metaData";
import { BankMasterGridMetaData } from "registry/metaData/grid";
import { CRUDContextProvider } from "pages_los/common/crud2";
import { LOSSDK } from "registry/fns/los";

export const Config = () => {
  const isProductEditedRef = useRef(false);
  const crudAPIArgs = (moduleType, productType, refID) => ({
    insertFormData: {
      fn: LOSSDK.insertFormData,
      args: { moduleType, productType, refID },
    },
    checkFormDataExist: {
      fn: LOSSDK.checkFormDataExist,
      args: { moduleType, productType, refID },
    },
    deleteFormData: {
      fn: LOSSDK.deleteFormData,
      args: { moduleType, productType, refID },
    },
    updateFormData: {
      fn: LOSSDK.updateFormData,
      args: { moduleType, productType, refID },
    },
    getFormData: {
      fn: LOSSDK.getFormData,
      args: { moduleType, productType, refID },
    },
    getStaticGridData: {
      fn: LOSSDK.getStaticGridData,
      args: { moduleType, productType, refID },
    },
  });

  return (
    <Fragment>
      <CRUDContextProvider {...crudAPIArgs("config/bank", "sme", null)}>
        <GridCRUD
          isProductEditedRef={isProductEditedRef}
          formMetaData={BankMasterSMEDetailsMetaData}
          gridMetaData={BankMasterGridMetaData}
        />
      </CRUDContextProvider>
    </Fragment>
  );
};
