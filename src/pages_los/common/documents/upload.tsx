import { useContext, useEffect } from "react";
import { FileUploadControl } from "components/fileUpload";
import { useQuery } from "react-query";
import { DOCCRUDContext } from "./context";
import { ClearCacheContext } from "cache";
import loaderGif from "assets/images/loader.gif";
import { useSnackbar } from "notistack";

export const UploadDocumentsApiWrapper = ({
  onClose,
  editableFileName,
  dataChangedRef,
  currentAction,
}) => {
  const {
    uploadDocuments,
    getDocumentUploadAddtionalFieldsMetaData,
    context,
  } = useContext(DOCCRUDContext);
  const currentDoc = context.docCategory.filter(
    (one) => one.type === currentAction
  )[0];
  const docType = currentDoc.type;
  const categoryCD = currentDoc.categoryCD;
  const primaryDocType = context.docCategory.filter(
    (one) => one.primary === true
  )[0].type;
  const removeCache = useContext(ClearCacheContext);
  const { enqueueSnackbar } = useSnackbar();
  const closeWrapper = () => {
    if (dataChangedRef.current === true) {
      enqueueSnackbar("Documents Successfully uploaded", {
        variant: "success",
      });
    }
    onClose();
  };

  useEffect(() => {
    removeCache?.addEntry([
      "getDocumentUploadAddtionalFieldsMetaData",
      context.moduleType,
      context.productType,
      docType,
    ]);
  }, [context, removeCache]);
  const query = useQuery(
    [
      "getDocumentUploadAddtionalFieldsMetaData",
      context.moduleType,
      context.productType,
      docType,
    ],
    () =>
      getDocumentUploadAddtionalFieldsMetaData.fn(
        getDocumentUploadAddtionalFieldsMetaData.args
      )(docType)
  );
  //@ts-ignore
  let error = `${query.error?.error_msg ?? "unknown error occured"}`;
  const renderResult = query.isLoading ? (
    <img src={loaderGif} alt="loader" width="50px" height="50px" />
  ) : query.isError === true ? (
    <span>{error}</span>
  ) : (
    <FileUploadControl
      onClose={closeWrapper}
      additionalColumns={query.data}
      editableFileName={editableFileName}
      dataChangedRef={dataChangedRef}
      onUpload={uploadDocuments.fn({
        ...uploadDocuments.args,
        docCategory: primaryDocType,
        categoryCD: categoryCD,
      })}
      gridProps={{ ...context, docCategory: docType }}
      maxAllowedSize={1024 * 1204 * 10} //10Mb file
      allowedExtensions={["pdf"]}
    />
  );
  return renderResult;
};
