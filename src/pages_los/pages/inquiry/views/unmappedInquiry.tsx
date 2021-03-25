import { ActionTypes } from "components/dataTable";
import { Inquiry } from "./inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "AssignBranch",
    actionLabel: "Assign Branch",
    multiple: false,
    rowDoubleClick: false,
  },
  {
    actionName: "ViewDetails",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const UnmappedInqiry = () => {
  return <Inquiry gridCode="TRN/004" actions={actions} />;
};
