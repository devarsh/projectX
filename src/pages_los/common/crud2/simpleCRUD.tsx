import { useState, FC } from "react";
import { FormViewEdit } from "./formViewEdit";
import { FormNewExistsIfNotCreate } from "./formNewExistIfNotCreate";

export const SimpleCRUD: FC<{
  isDataChangedRef: any;
  dataAlwaysExists: any;
  closeDialog?: any;
  readOnly?: boolean;
  disableCache?: boolean;
}> = ({
  isDataChangedRef,
  closeDialog,
  dataAlwaysExists,
  readOnly,
  disableCache,
}) => {
  const [dataExist, setDataExist] = useState(Boolean(dataAlwaysExists));

  return dataExist ? (
    <FormViewEdit
      isDataChangedRef={isDataChangedRef}
      closeDialog={closeDialog}
      readOnly={readOnly}
      disableCache={disableCache}
    />
  ) : (
    <FormNewExistsIfNotCreate
      isDataChangedRef={isDataChangedRef}
      successAction={() => setDataExist(true)}
      readOnly={readOnly}
      closeDialog={closeDialog}
    />
  );
};
