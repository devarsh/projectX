import { useState } from "react";
import DataGrid, { ActionTypes } from "components/dataTable";

const actions: ActionTypes[] = [
  {
    actionName: "completeView",
    actionLabel: "360 View",
    multiple: false,
  },
  {
    actionName: "Delete",
    actionLabel: "delete",
    multiple: true,
  },
];

export const Inquiry = () => {
  const [action, setAction] = useState();
  return (
    <DataGrid gridCode="trn/001" actions={actions} setAction={setAction} />
  );
};
