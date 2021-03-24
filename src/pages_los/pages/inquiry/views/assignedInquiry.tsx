import { ActionTypes } from "components/dataTable";
import { Inquiry } from "./inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "AssignInquiryVH",
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

export const AssignedInquiry = () => {
  return <Inquiry gridCode="TRN/001" actions={actions} />;
};
