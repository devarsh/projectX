import { useState } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD = ({
  isProductEditedRef,
  closeDialog,
  dataAlwaysExists,
  formState,
}) => {
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  return dataExist ? (
    <FormViewEdit
      isProductEditedRef={isProductEditedRef}
      closeDialog={closeDialog}
      formState={formState}
    />
  ) : (
    <FormNewExistsIfNotCreate
      isProductEditedRef={isProductEditedRef}
      successAction={() => setDataExist(true)}
      formState={formState}
    />
  );
};
