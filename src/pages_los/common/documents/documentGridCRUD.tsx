import { useState, Fragment, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "./gridWrapper";
import { FileUploadControl } from "components/fileUpload";
import { gridMetaData, columnsMetaData } from "./meta";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View Document",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "Add",
    actionLabel: "Add Documents",
    multiple: undefined,
    alwaysAvailable: true,
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
  const onUpload = (files) => {
    console.log(files);
    return true;
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
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {(currentAction?.name ?? "") === "Add" ? (
          <FileUploadControl
            onClose={closeMyDialog}
            additionalColumns={columnsMetaData}
            editableFileName={false}
            dataChangedRef={dataChangedRef}
            onUpload={onUpload}
          />
        ) : null}
      </Dialog>
    </Fragment>
  );
};
