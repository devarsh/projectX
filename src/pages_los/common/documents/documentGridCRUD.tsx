import { useState, Fragment, useRef, useContext, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "./gridWrapper";
import { FileUploadControl } from "components/fileUpload";
import { DOCCRUDContext } from "./context";
import { cacheWrapperKeyGen } from "cache";
import { DeleteAction } from "./delete";
import { VerifyDocumentAction } from "./verify";
import { UpdateDocumentData } from "./update";

const actions: ActionTypes[] = [
  {
    actionName: "Add",
    actionLabel: "Add Documents",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "Verify",
    actionLabel: "Verify",
    multiple: true,
    shouldExclude: (rows) => {
      let exclude = false;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].data?.status !== "Pending") {
          exclude = true;
          break;
        }
      }
      return exclude;
    },
  },
  {
    actionName: "View",
    actionLabel: "View",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
  },
  {
    actionName: "Update",
    actionLabel: "Update",
    multiple: false,
  },
];

export const DocumentGridCRUD = ({
  gridMetaData,
  gridEditMetaData,
  uploadColumnsMetaData,
  gridProps,
}) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChangedRef = useRef(false);
  const wrapperKey = useRef<any>(null);
  const { uploadDocuments, getDocumentsGridData } = useContext(DOCCRUDContext);
  if (wrapperKey.current === null) {
    wrapperKey.current = cacheWrapperKeyGen(
      Object.values(getDocumentsGridData.args)
    );
  }
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (dataChangedRef.current === true) {
      gridRef.current?.refetch?.();
      dataChangedRef.current = false;
    }
  };

  return (
    <Fragment>
      <MyGridWrapper
        ref={gridRef}
        key="grid"
        metaData={gridMetaData}
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={{
          style:
            currentAction?.name === "Add"
              ? { width: "100%", height: "100%" }
              : currentAction?.name === "Verify"
              ? { width: "40%" }
              : {},
        }}
      >
        {(currentAction?.name ?? "") === "Add" ? (
          <FileUploadControl
            onClose={closeMyDialog}
            additionalColumns={uploadColumnsMetaData}
            editableFileName={false}
            dataChangedRef={dataChangedRef}
            onUpload={uploadDocuments.fn(uploadDocuments.args)}
            gridProps={gridProps}
          />
        ) : (currentAction?.name ?? "") === "Delete" ? (
          <DeleteAction
            docUUID={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            isProductEditedRef={dataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Verify" ? (
          <VerifyDocumentAction
            docUUID={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            isProductEditedRef={dataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Update" ? (
          <UpdateDocumentData
            metaData={gridEditMetaData}
            row={currentAction?.rows[0]}
            closeDialog={closeMyDialog}
            isProductEditedRef={dataChangedRef}
            gridProps={gridProps}
          />
        ) : (
          <InvalidAction closeDialog={closeMyDialog} />
        )}
      </Dialog>
    </Fragment>
  );
};

const InvalidAction = ({ closeDialog }) => {
  useEffect(() => {
    closeDialog();
  }, []);
  return null;
};
