import { useState, FC } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD: FC<{
  isProductEditedRef: any;
  dataAlwaysExists: any;
  formState?: any;
  closeDialog?: any;
}> = ({ isProductEditedRef, closeDialog, dataAlwaysExists, formState }) => {
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  return dataExist ? (
    <FormViewEdit
      isProductEditedRef={isProductEditedRef}
      closeDialog={closeDialog} //view Mode
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
