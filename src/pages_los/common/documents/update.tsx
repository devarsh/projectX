import { useContext, useRef, useState } from "react";
import { useMutation } from "react-query";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import GridWrapper from "components/dataTableStatic";
import { DOCCRUDContext } from "./context";

interface DeleteFormDataType {
  data?: any;
}

const updateDocumentDataFnWrapper = (updateDocuments) => async ({
  data,
}: DeleteFormDataType) => {
  console.log(data);
  return updateDocuments(data);
};

export const UpdateDocumentData = ({
  metaData,
  row: { data, id },
  closeDialog,
  isProductEditedRef,
  gridProps,
}) => {
  const [gridData, setGridData] = useState(Array.isArray(data) ? data : [data]);
  const { updateDocument } = useContext(DOCCRUDContext);
  const gridRef = useRef<any>(null);

  const mutation = useMutation(
    updateDocumentDataFnWrapper(updateDocument.fn(updateDocument.args)),
    {
      onError: (error: any) => {},
      onSuccess: (data) => {
        isProductEditedRef.current = true;
        closeDialog();
      },
    }
  );

  const sendDataForUpdate = async () => {
    let { hasError, data } = await gridRef?.current?.validate?.();
    if (hasError === true) {
      setGridData(data);
    } else {
      let result = gridRef?.current?.cleanData?.();
      await mutation.mutate({ data: result });
    }
  };

  return (
    <>
      {mutation.isError ? (
        <Alert severity="error">
          {mutation?.error?.error_msg ?? "Unknown Error occured"}
        </Alert>
      ) : null}
      <DialogTitle id="alert-dialog-title">Update Documents</DialogTitle>
      <DialogContent>
        <GridWrapper
          key={`listingDocumentsForUpdate`}
          data={gridData ?? []}
          finalMetaData={metaData}
          setData={setGridData}
          gridProps={gridProps}
          ref={gridRef}
          loading={mutation.isLoading}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={closeDialog}
          color="primary"
          disabled={mutation.isLoading}
        >
          Disagree
        </Button>
        <Button
          color="primary"
          onClick={sendDataForUpdate}
          disabled={mutation.isLoading}
        >
          Agree
        </Button>
      </DialogActions>
    </>
  );
};
