import { useState, Fragment, useRef, useEffect, useContext } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "./gridWrapper";
import { DeleteAction } from "./delete";
import { VerifyDocumentAction } from "./verify";
import { UpdateDocumentData } from "./update";
import { UploadDocumentsApiWrapper } from "./upload";

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

export const DocumentGridCRUD = () => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChangedRef = useRef(false);
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
          <UploadDocumentsApiWrapper
            onClose={closeMyDialog}
            editableFileName={false}
            dataChangedRef={dataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Delete" ? (
          <DeleteAction
            docUUID={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            dataChangedRef={dataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Verify" ? (
          <VerifyDocumentAction
            docUUID={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            dataChangedRef={dataChangedRef}
          />
        ) : (currentAction?.name ?? "") === "Update" ? (
          <UpdateDocumentData
            row={currentAction?.rows[0]}
            closeDialog={closeMyDialog}
            dataChangedRef={dataChangedRef}
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
