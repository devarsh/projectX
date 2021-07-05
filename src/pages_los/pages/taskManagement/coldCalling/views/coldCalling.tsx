import { ActionTypes } from "components/dataTable";
import { ColdCalling } from "../coldCalling";

export const ColdCallingView = () => {
  const actions: ActionTypes[] = [
    {
      actionName: "AddColdCalling",
      actionLabel: "Add Cold Calling",
      multiple: undefined,
      rowDoubleClick: false,
      alwaysAvailable: true,
    },
    {
      actionName: "moveToInquiry",
      actionLabel: "Move to Inquiry",
      multiple: false,
      rowDoubleClick: false,
    },
    {
      actionName: "viewDetails",
      actionLabel: "View Details",
      multiple: false,
      rowDoubleClick: true,
    },
    {
      actionName: "delete",
      actionLabel: "Delete",
      multiple: false,
      rowDoubleClick: false,
    },
  ];

  return <ColdCalling gridCode="TRN/015" actions={actions} />;
};
