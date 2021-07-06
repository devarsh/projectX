import { ActionTypes } from "components/dataTable";
import { Task } from "../task";

export const AssignTask = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "ViewDetails",
      actionLabel: "View Details",
      multiple: false,
      rowDoubleClick: false,
      shouldExclude: (rows) => {
        let exclude = false;
        for (let i = 0; i < rows.length; i++) {
          if (rows[i].data?.status === "Completed") {
            exclude = true;
            break;
          }
        }
        return exclude;
      },
    },
    {
      actionName: "TaskHistory",
      actionLabel: "History",
      multiple: false,
      rowDoubleClick: true,
    },
  ];

  return <Task gridCode="TRN/009" actions={actions} />;
};
