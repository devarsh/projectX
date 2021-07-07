import { useState, useRef, Fragment, useContext, useEffect } from "react";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { ActionTypes } from "components/dataTable";
import Dialog from "@material-ui/core/Dialog";
import { InvalidAction } from "pages_los/common/invalidAction";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { serverGridContextGenerator } from "../context";
import {
  AddColdCalling,
  ColdCallingViewEdit,
  ColdCallingDelete,
  Header,
} from "./coldCallingCRUD";
import { MoveToInquiry } from "./moveToInquiry";

const actions: ActionTypes[] = [
  {
    actionName: "AddColdCalling",
    actionLabel: "Add New",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
  {
    actionName: "moveToInquiry",
    actionLabel: "Move to Inquiry",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "viewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "delete",
    actionLabel: "Delete",
    multiple: true,
    rowDoubleClick: false,
  },
];

export const ColdCalling = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const isDataChangedRef = useRef(false);
  const myGridRef = useRef<any>(null);

  const handleDialogClose = () => {
    setCurrentAction(null);
    if (isDataChangedRef.current === true) {
      isDataChangedRef.current = true;
      myGridRef?.current?.fetchData?.();
      isDataChangedRef.current = false;
    }
  };

  return (
    <Fragment>
      <ServerGridContextProvider {...serverGridContextGenerator(gridCode)}>
        <ServerGrid
          gridCode={gridCode}
          actions={actions}
          setAction={setCurrentAction}
          ref={myGridRef}
        />
      </ServerGridContextProvider>
      <Dialog
        fullScreen={
          ["moveToInquiry"].indexOf(currentAction?.name) >= 0 ? true : false
        }
        open={Boolean(currentAction)}
        maxWidth="lg"
      >
        <ClearCacheProvider>
          <ColdCallingActions
            currentAction={currentAction}
            isDataChangedRef={isDataChangedRef}
            handleDialogClose={handleDialogClose}
          />
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};

const ColdCallingActions = ({
  currentAction,
  isDataChangedRef,
  handleDialogClose,
}) => {
  const removeCache = useContext(ClearCacheContext);
  useEffect(() => {
    return () => {
      let entries = removeCache?.getEntries() as any[];
      entries.forEach((one) => {
        queryClient.removeQueries(one);
      });
    };
  }, [removeCache]);
  return (currentAction?.name ?? "") === "AddColdCalling" ? (
    <Fragment>
      <AddColdCalling
        moduleType="cold-calling"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "viewDetails" ? (
    <Fragment>
      <Header
        headerDetail={currentAction?.rows}
        closeDialog={handleDialogClose}
      />

      <ColdCallingViewEdit
        tran_cd={currentAction?.rows[0].id}
        moduleType="cold-calling"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
        readOnly={false}
        disableCache={false}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "delete" ? (
    <Fragment>
      <ColdCallingDelete
        tran_cd={currentAction?.rows.map((one) => one.id)}
        moduleType="cold-calling"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "moveToInquiry" ? (
    <Fragment>
      <Header
        headerDetail={currentAction?.rows}
        closeDialog={handleDialogClose}
      />
      <MoveToInquiry
        defaultView="edit"
        tran_cd={currentAction?.rows[0].id}
        moduleType="cold-calling"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Fragment>
  ) : (
    <InvalidAction closeDialog={handleDialogClose} />
  );
};

export const ColdCollingWrapper = () => {
  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
