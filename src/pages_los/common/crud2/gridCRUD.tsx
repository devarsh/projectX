import { useState, Fragment, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { FormNew } from "./formNew";
import { FormViewEdit } from "./formViewEdit";
import { DeleteAction } from "./delete";
import { MyGridWrapper } from "./gridWrapper";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View Details",
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
    actionLabel: "Add Detail",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const GridCRUD = ({
  refID,
  moduleType,
  productType,
  isProductEditedRef,
  formMetaData,
  gridMetaData,
}) => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChanged = useRef(false);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (dataChanged.current === true) {
      isProductEditedRef.current = true;
      gridRef.current?.refetch?.();
      dataChanged.current = false;
    }
  };
  return (
    <Fragment>
      <MyGridWrapper
        key="grid"
        ref={gridRef}
        metaData={gridMetaData}
        refID={refID}
        moduleType={moduleType}
        productType={productType}
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog
        open={Boolean(currentAction)}
        maxWidth="xl"
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        {(currentAction?.name ?? "") === "Add" ? (
          <FormNew
            refID={refID}
            moduleType={moduleType}
            productType={productType}
            metaData={formMetaData}
            successAction={closeMyDialog}
            cancelAction={closeMyDialog}
            isProductEditedRef={dataChanged}
          />
        ) : (currentAction?.name ?? "") === "View" ? (
          <FormViewEdit
            refID={refID}
            moduleType={moduleType}
            productType={productType}
            metaData={formMetaData}
            isProductEditedRef={dataChanged}
            closeDialog={closeMyDialog}
            serialNo={currentAction?.rows[0]?.id}
          />
        ) : (currentAction?.name ?? "") === "Delete" ? (
          <DeleteAction
            refID={refID}
            moduleType={moduleType}
            productType={productType}
            serialNo={currentAction?.rows.map((one) => one.id)}
            closeDialog={closeMyDialog}
            isProductEditedRef={dataChanged}
          />
        ) : null}
      </Dialog>
    </Fragment>
  );
};
