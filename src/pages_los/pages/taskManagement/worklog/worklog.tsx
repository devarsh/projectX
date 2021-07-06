import { useState, useRef, Fragment, useEffect } from "react";
import { ActionTypes } from "components/dataTable";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider } from "cache";
import { Transition } from "pages_los/common";
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
    actionLabel: "Add Worklog",
    multiple: undefined,
    rowDoubleClick: false,
    alwaysAvailable: true,
  },
];

export const Worklog = ({ gridCode, actions }) => {
  const [currentAction, setCurrentAction] = useState<null | any>(null);
  const [minValue, setMinValue] = useState<any>(null);
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

  let myMinValue: any;
  useEffect(() => {
    myMinValue = dateFormat(new Date(), "iii LLL dd yyyy HH:mm:ss xxxx");
    setMinValue(myMinValue);
  }, []);

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
                value: minValue,
                condition: "equal",
                columnName: "Tran Date",
              },
            },
          ]}
        />
      </ServerGridContextProvider>
      <Dialog
        fullScreen={
          ["ViewDetails", "AddWorklog"].indexOf(currentAction?.name) >= 0
            ? true
            : false
        }
        open={currentAction !== null}
        //@ts-ignore
        TransitionComponent={Transition}
        onClose={handleDialogClose}
        maxWidth="md"
      >
        <ClearCacheProvider>
          {(currentAction?.name ?? "") === "AddWorklog" ? (
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
          )}
        </ClearCacheProvider>
      </Dialog>
    </Fragment>
  );
};

export const WorklogWrapper = () => {
  return <Worklog gridCode="TRN/014" actions={actions} />;
};
