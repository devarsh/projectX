import { useRef, useState, Fragment, useEffect, FC } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { MyGridWrapper } from "./gridWrapper";
import { CAMContextProvider, CAMProviderType } from "./context";
import { LOSSDK } from "registry/fns/los";

const CAMAPIArgs = ({ refID }): CAMProviderType => ({
  context: { refID },
  generateCAM: { fn: LOSSDK.generateCAM, args: { refID } },
  previewCAM: { fn: LOSSDK.generateCAM_URL, args: { refID } },
  getGridCAMData: { fn: LOSSDK.getCAMGridData, args: { refID } },
  getGridCAMMetaData: { fn: LOSSDK.getCAMGridMetaData, args: { refID } },
  getCAMData: { fn: LOSSDK.getCAMData, args: { refID } },
});

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "View",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Download",
    actionLabel: "download",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "Preview",
    actionLabel: "Add Detail",
    multiple: undefined,
    alwaysAvailable: true,
  },
];

export const CAM = () => {
  const [currentAction, setCurrentAction] = useState<any>(null);
  const gridRef = useRef<any>(null);
  const isMyDataChangedRef = useRef(false);
  const closeMyDialog = () => {
    setCurrentAction(null);
    if (isMyDataChangedRef.current === true) {
      gridRef.current?.refetch?.();
      isMyDataChangedRef.current = false;
    }
  };
  return (
    <CAMContextProvider {...CAMAPIArgs({ refID: "89" })}>
      <MyGridWrapper
        ref={gridRef}
        key="grid"
        actions={actions}
        setAction={setCurrentAction}
      />
      <Dialog open={Boolean(currentAction)} maxWidth="xl"></Dialog>
    </CAMContextProvider>
  );
};

const InvalidAction = ({ closeDialog }) => {
  useEffect(() => {
    closeDialog();
  }, [closeDialog]);
  return null;
};
