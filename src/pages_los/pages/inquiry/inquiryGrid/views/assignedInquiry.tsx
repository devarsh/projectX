import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "ViewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
  {
    actionName: "Priority",
    actionLabel: "Priority",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "Move",
    actionLabel: "Move To Lead",
    multiple: false,
    rowDoubleClick: false,
  },
];

export const AssignedInquiry = () => {
  return <Inquiry gridCode="TRN/006" actions={actions} />;
};
