import { useState, useRef, useContext, Fragment, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  ServerGrid,
  ServerGridContextProvider,
} from "pages_los/common/serverGrid";
import { ClearCacheProvider, ClearCacheContext, queryClient } from "cache";
import { serverGridContextGenerator } from "../context";
import { AssignTask, TaskViewEdit } from "./taskCRUD";
import { HistoryGrid } from "pages_los/pages/taskManagement/task/history";
import { InvalidAction } from "pages_los/common/invalidAction";

export const Task = ({ gridCode, actions }: any) => {
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
      <ClearCacheProvider>
        <Dialog
          open={Boolean(currentAction)}
          maxWidth="md"
          fullWidth
          PaperProps={{ style: { height: "80%" } }}
        >
          <TaskActions
            currentAction={currentAction}
            handleDialogClose={handleDialogClose}
            isDataChangedRef={isDataChangedRef}
          />
        </Dialog>
      </ClearCacheProvider>
    </Fragment>
  );
};

const TaskActions = ({
  currentAction,
  handleDialogClose,
  isDataChangedRef,
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

  return (currentAction?.name ?? "") === "AddTask" ? (
    <Fragment>
      <AssignTask
        moduleType="task"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "ViewDetails" ? (
    <Fragment>
      <TaskViewEdit
        taskID={currentAction?.rows[0].id}
        inquiryFor={currentAction?.rows[0]?.data?.flag.toLocaleLowerCase()}
        refID={currentAction?.rows[0].data?.ref_id}
        moduleType="task"
        isDataChangedRef={isDataChangedRef}
        closeDialog={handleDialogClose}
        readOnly={false}
        disableCache={false}
      />
    </Fragment>
  ) : (currentAction?.name ?? "") === "TaskHistory" ? (
    <Fragment>
      <HistoryGrid
        taskID={currentAction?.rows[0].id}
        moduleType="task"
        closeDialog={handleDialogClose}
        rowData={currentAction?.rows[0].data}
      />
    </Fragment>
  ) : (
    <InvalidAction closeDialog={handleDialogClose} />
  );
};
