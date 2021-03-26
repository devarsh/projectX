import { ActionTypes } from "components/dataTable";
import { Inquiry } from "../inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "AssignInquiry",
    actionLabel: "Assign Inquiry",
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

export const IncomingInquiry = () => {
  return <Inquiry gridCode="TRN/005" actions={actions} />;
};
