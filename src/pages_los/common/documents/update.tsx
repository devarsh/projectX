import { useContext } from "react";
import GridWrapper from "components/dataTableStatic";
import { DOCCRUDContext } from "./context";

export const MyUpdateGridWrapper = ({ metaData, data }) => {
  const { updateDocument } = useContext(DOCCRUDContext);

  const renderResult = (
    <GridWrapper
      key={`listingDocumentsForUpdate`}
      data={data ?? []}
      finalMetaData={metaData}
      setData={() => null}
    />
  );

  return renderResult;
};
MyUpdateGridWrapper.displayName = "MyGridUpdateWrapper";
