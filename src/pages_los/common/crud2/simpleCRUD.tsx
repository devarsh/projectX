import { useState } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD = ({
  refID,
  moduleType,
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
      moduleType={moduleType}
      productType={productType}
      isProductEditedRef={isProductEditedRef}
      metaData={formMetaData}
      closeDialog={closeDialog}
    />
  ) : (
    <FormNewExistsIfNotCreate
      refID={refID}
      moduleType={moduleType}
      productType={productType}
      isProductEditedRef={isProductEditedRef}
      successAction={() => setDataExist(true)}
      metaData={formMetaData}
    />
  );
};
