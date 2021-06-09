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
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "DeleteTask",
      actionLabel: "Delete Task",
      multiple: true,
      rowDoubleClick: false,
    },
    {
      actionName: "EditTask",
      actionLabel: "Edit Task",
      multiple: false,
      rowDoubleClick: false,
    },
  ];

  return <Task gridCode="TRN/009" actions={actions} />;
};
