import { useState } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD = ({
  refID,
  productType,
  isProductEditedRef,
  closeDialog,
  formMetaData,
  dataAlwaysExists,
}) => {
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  return dataExist ? (
    <FormViewEdit
      refID={refID}
      productType={productType}
      isProductEditedRef={isProductEditedRef}
      metaData={formMetaData}
      closeDialog={closeDialog}
    />
  ) : (
    <FormNewExistsIfNotCreate
      refID={refID}
      productType={productType}
      isProductEditedRef={isProductEditedRef}
      successAction={() => setDataExist(true)}
      metaData={formMetaData}
    />
  );
};
