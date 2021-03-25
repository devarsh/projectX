import { ActionTypes } from "components/dataTable";
import { Inquiry } from "./inquiry";

const actions: ActionTypes[] = [
  {
    actionName: "ViewStatus",
    actionLabel: "View Status",
    multiple: false,
    rowDoubleClick: true,
  },
];

export const CrossInquiry = () => {
  return <Inquiry gridCode="TRN/007" actions={actions} />;
};
