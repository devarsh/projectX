import { useContext } from "react";
import GridWrapper from "components/dataTableStatic";
import { DOCCRUDContext } from "./context";

export const UpdateDocumentData = ({
  metaData,
  data,
  closeDialog,
  isProductEditedRef,
}) => {
  const { updateDocument } = useContext(DOCCRUDContext);

  return (
    <GridWrapper
      key={`listingDocumentsForUpdate`}
      data={data ?? []}
      finalMetaData={metaData}
      setData={() => null}
    />
  );
};
