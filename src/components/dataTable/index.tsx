import { useState } from "react";
import { GridWrapper } from "./gridWrapper";
import { ActionTypes } from "./types";

const actions: ActionTypes[] = [
  {
    actionLabel: "Edit",
    actionName: "edit",
    multiple: false,
  },
  {
    actionName: "view",
    actionLabel: "View",
    multiple: false,
  },
  {
    actionName: "Delete",
    actionLabel: "delete",
    multiple: true,
  },
];

const App = () => {
  const [action, setAction] = useState();
  console.log(action);
  return (
    <GridWrapper gridCode="trn/001" actions={actions} setAction={setAction} />
  );
};

export default App;
