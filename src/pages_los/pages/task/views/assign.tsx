import { ActionTypes } from "components/dataTable";
import { Task } from "../task";

export const AssignTask = () => {
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

  return <Task gridCode="TRN/009" actions={actions} />;
};
