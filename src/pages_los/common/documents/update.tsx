import { useContext } from "react";
import GridWrapper from "components/dataTableStatic";
import { DOCCRUDContext } from "./context";

export const UpdateDocumentData = ({
  metaData,
  row,
  closeDialog,
  isProductEditedRef,
}) => {
  const { updateDocument } = useContext(DOCCRUDContext);
  let { data, id } = row;
  data = Array.isArray(data) ? data : [data];
  return (
    <GridWrapper
      key={`listingDocumentsForUpdate`}
      data={data ?? []}
      finalMetaData={metaData}
      setData={() => null}
    />
  );
};
