import { useState, useRef, Fragment, useContext, useEffect } from "react";
import { ActionTypes } from "components/dataTable";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { serverGridContextGenerator } from "../context";
import { WorklogAdd } from "./worklogCRUD";
import { WorklogViewEdit } from "./worklogCRUD/worklogViewEdit";
import { DeleteAction } from "./worklogCRUD/worklogDelete";
import { InvalidAction } from "pages_los/common/invalidAction";
import dateFormat from "date-fns/format";

const actions: ActionTypes[] = [
  {
    actionName: "ViewDetails",
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
    actionName: "AddWorklog",
    actionLabel: "Add New",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const Worklog = ({ gridCode, actions }) => {
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
          defaultSortOrder={[{ id: "tran_date", desc: true }]}
          defaultFilter={[
            {
              id: "tran_date",
              value: {
                type: "date",
                value: dateFormat(new Date(), "iii LLL dd yyyy HH:mm:ss xxxx"),
                condition: "equal",
                columnName: "Tran Date",
              },
            },
          ]}
        />
      </ServerGridContextProvider>
      <Dialog
        open={Boolean(currentAction)}
        //@ts-ignore
        fullWidth
        maxWidth="md"
        PaperProps={{ style: { height: "70%" } }}
      >
        <ClearCacheProvider>
          <WorkLogActionSelector
            currentAction={currentAction}
            isDataChangedRef={isDataChangedRef}
            handleDialogClose={handleDialogClose}
          />
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};

const WorkLogActionSelector = ({
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
  return (currentAction?.name ?? "") === "AddWorklog" ? (
    <Fragment>
      <WorklogAdd
        moduleType="worklog"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "ViewDetails" ? (
    <Fragment>
      <WorklogViewEdit
        serialNo={currentAction?.rows[0]?.id}
        moduleType="worklog"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
        readOnly={false}
        disableCache={false}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "Delete" ? (
    <Fragment>
      <DeleteAction
        worklogID={currentAction?.rows.map((one) => one.id)}
        moduleType="worklog"
        closeDialog={handleDialogClose}
        isDataChangedRef={isDataChangedRef}
      />
    </Fragment>
  ) : (
    <InvalidAction closeDialog={handleDialogClose} />
  );
};

export const WorklogWrapper = () => {
  return <Worklog gridCode="TRN/014" actions={actions} />;
};
