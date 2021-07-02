import { Worklog } from "../worklog";
import { ActionTypes } from "components/dataTable";

export const WorkLog = ({}) => {
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
  return <Worklog gridCode="TRN/014" actions={actions} />;
};
