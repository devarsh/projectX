import { ActionTypes } from "components/dataTable";
import { ColdCalling } from "../coldCalling";

export const ColdCallingView = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "AddColdCalling",
      actionLabel: "Add",
      multiple: undefined,
      rowDoubleClick: false,
      alwaysAvailable: true,
    },
  ];

  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
