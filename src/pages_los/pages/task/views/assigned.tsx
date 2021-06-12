import { Task } from "../task";
import { ActionTypes } from "components/dataTable";

export const AssignedTask = ({}) => {
  const actions: ActionTypes[] = [
    {
      actionName: "ViewDetails",
      actionLabel: "View Details",
      multiple: false,
      rowDoubleClick: true,
    },
    {
      actionName: "AddTask",
      actionLabel: "Add Task",
      multiple: undefined,
      rowDoubleClick: false,
      alwaysAvailable: true,
    },
  ];
  return <Task gridCode="TRN/008" actions={actions} />;
};
