import { useRef, useState, Fragment, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import { ActionTypes } from "components/dataTable";
import { FormNew } from "pages_los/common/crud2/formNew";
import { FormViewEdit } from "pages_los/common/crud2/formViewEdit";
import { MyGridWrapper } from "pages_los/common/crud2/gridWrapper";
import { InvalidAction } from "pages_los/common/invalidAction";
import { TeamAssignment } from "../teamAssignment";
import { YearlyTargetGrid } from "../targetManagement";
import { queryClient } from "cache";

const actions: ActionTypes[] = [
  {
    actionName: "View",
    actionLabel: "Edit User Role",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Add",
    actionLabel: "Add User",
    multiple: undefined,
    alwaysAvailable: true,
  },
  {
    actionName: "Team",
    actionLabel: "Team Management",
    multiple: false,
  },
  {
    actionName: "Target",
    actionLabel: "Target Management",
    multiple: false,
  },
];

export const RoleAssignment = () => {
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
        PaperProps={{ style: { width: "100%", height: "100%" } }}
      >
        <ComponentPicker
          currentAction={currentAction}
          closeMyDialog={closeMyDialog}
          isMyDataChangedRef={isMyDataChangedRef}
        />
      </Dialog>
    </Fragment>
  );
};

const ComponentPicker = ({
  currentAction,
  closeMyDialog,
  isMyDataChangedRef,
}) => {
  useEffect(() => {
    return () => {
      queryClient.removeQueries("getAllUnRegisteredUsersList", {
        exact: false,
      });
    };
  }, []);

  return (currentAction?.name ?? "") === "Add" ? (
    <FormNew
      successAction={closeMyDialog}
      cancelAction={closeMyDialog}
      isDataChangedRef={isMyDataChangedRef}
    />
  ) : (currentAction?.name ?? "") === "View" ? (
    <FormViewEdit
      isDataChangedRef={isMyDataChangedRef}
      closeDialog={closeMyDialog}
      serialNo={currentAction?.rows[0]?.id}
      setEditFormStateFromInitValues={(initialValues) => {
        const { userID } = initialValues;
        return { userID };
      }}
    />
  ) : (currentAction?.name ?? "") === "Team" ? (
    <TeamAssignment
      isDataChangedRef={isMyDataChangedRef}
      closeDialog={closeMyDialog}
      serialNo={currentAction?.rows[0]?.id}
      setEditFormStateFromInitValues={(initialValues) => {
        const { teamDesignationCode, branchCode } = initialValues;
        return { teamDesignationCode, branchCode };
      }}
    />
  ) : (currentAction?.name ?? "") === "Target" ? (
    <YearlyTargetGrid
      isDataChangedRef={isMyDataChangedRef}
      closeDialog={closeMyDialog}
      userID={currentAction?.rows[0]?.id}
      setEditFormStateFromInitValues={(initialValues) => {
        const { userID } = initialValues;
        return { userID };
      }}
    />
  ) : (
    <InvalidAction closeDialog={closeMyDialog} />
  );
};
