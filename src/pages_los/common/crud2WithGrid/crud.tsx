import { useState, Fragment, useRef } from "react";
import { GridDataDisplay } from "./grid";
import gridMetaData from "./gridMetadata";
import { ActionTypes } from "components/dataTable";
import Dialog from "@material-ui/core/Dialog";
import { ManagementInformationMetaData } from "registry/metaData/managementInformationMetaData";
import { FormNew } from "./formNew";
import { FormViewEdit } from "./formViewEdit";

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

export const Grid = () => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const dataChanged = useRef(false);
  const closeDialog = () => {
    setCurrentAction(null);
    if (dataChanged.current === true) {
      gridRef.current?.refetch?.();
      dataChanged.current = false;
    }
  };
  console.log(currentAction);
  const refID = "89";
  const productType = "management";
  return (
    <Fragment>
      <GridDataDisplay
        key="grid"
        ref={gridRef}
        metaData={gridMetaData}
        refID={refID}
        productType={productType}
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog open={Boolean(currentAction)} onClose={closeDialog} maxWidth="md">
        {(currentAction?.name ?? "") === "Add" ? (
          <FormNew
            key="new"
            refID={refID}
            productType={productType}
            metaData={ManagementInformationMetaData}
            closeDialog={closeDialog}
            isProductEditedRef={dataChanged}
          />
        ) : (currentAction?.name ?? "") === "View" ? (
          <FormViewEdit
            key="viewEdit"
            refID={refID}
            productType={productType}
            metaData={ManagementInformationMetaData}
            isProductEditedRef={dataChanged}
            closeDialog={closeDialog}
            serialNo={currentAction?.rows[0]?.id}
          />
        ) : null}
      </Dialog>
    </Fragment>
  );
};
