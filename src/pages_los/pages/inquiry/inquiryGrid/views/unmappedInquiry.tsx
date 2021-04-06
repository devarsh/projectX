import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "AssignBranch",
    actionLabel: "Assign Branch",
    multiple: true,
    rowDoubleClick: false,
  },
  {
    actionName: "ViewDetailsReadOnly",
    actionLabel: "View Details",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const UnmappedInqiry = () => {
  return <Inquiry gridCode="TRN/004" actions={actions} />;
};
